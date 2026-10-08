/**
 * The free SEO checker at /free-seo-checker/: fetches one public page the way a
 * search engine would and reports what is missing, in plain language.
 *
 * Visitors choose the URL, so every request is guarded against reaching our
 * own network (SSRF): only http(s) on ports 80/443, and every resolved address
 * is checked at connect time, which also defeats DNS rebinding. Redirects are
 * followed by hand so each hop goes through the same check.
 */
import dns from 'node:dns'
import http from 'node:http'
import https from 'node:https'
import net from 'node:net'
import zlib from 'node:zlib'

const USER_AGENT = 'Mozilla/5.0 (compatible; NextGenFusionSEOChecker/1.0; +https://www.nextgenfusion.in/free-seo-checker/)'
const TIMEOUT_MS = 12_000
const MAX_BYTES = 3 * 1024 * 1024
const MAX_REDIRECTS = 5

export class SiteCheckError extends Error {}

const blocked = new net.BlockList()
for (const [address, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8], ['169.254.0.0', 16],
  ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.0.2.0', 24], ['192.168.0.0', 16], ['198.18.0.0', 15],
  ['198.51.100.0', 24], ['203.0.113.0', 24], ['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) blocked.addSubnet(address, prefix, 'ipv4')
for (const [address, prefix] of [
  ['::', 128], ['::1', 128], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8], ['64:ff9b::', 96], ['2001:db8::', 32],
] as const) blocked.addSubnet(address, prefix, 'ipv6')

function isPublicAddress(address: string): boolean {
  const mapped = address.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (mapped) return !blocked.check(mapped[1], 'ipv4')
  return !blocked.check(address, net.isIPv6(address) ? 'ipv6' : 'ipv4')
}

type LookupCallback = (err: NodeJS.ErrnoException | null, address: string | dns.LookupAddress[], family?: number) => void

function safeLookup(hostname: string, options: dns.LookupOptions, callback: LookupCallback) {
  dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err) return callback(err, '')
    const list = addresses as dns.LookupAddress[]
    if (list.length === 0 || list.some((entry) => !isPublicAddress(entry.address))) {
      return callback(Object.assign(new Error('blocked address'), { code: 'EBLOCKED' }), '')
    }
    if (options.all) return callback(null, list)
    callback(null, list[0].address, list[0].family)
  })
}

/** Accepts "example.com" as well as a full URL; refuses anything but public http(s). */
export function normaliseUrl(input: string): URL {
  const trimmed = input.trim()
  if (trimmed.length === 0 || trimmed.length > 2048) throw new SiteCheckError('Enter a website address, like example.com.')
  let url: URL
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`)
  } catch {
    throw new SiteCheckError('That does not look like a website address.')
  }
  assertCheckable(url)
  return url
}

function assertCheckable(url: URL) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new SiteCheckError('Only http and https addresses can be checked.')
  if (url.username || url.password) throw new SiteCheckError('Addresses with a username or password cannot be checked.')
  if (url.port && url.port !== '80' && url.port !== '443') throw new SiteCheckError('Only standard web ports can be checked.')
  const host = url.hostname.replace(/^\[|\]$/g, '')
  if (net.isIP(host) && !isPublicAddress(host)) throw new SiteCheckError('Only public websites can be checked.')
  if (!net.isIP(host) && !host.includes('.')) throw new SiteCheckError('Enter a full domain name, like example.com.')
}

export type FetchedPage = {
  url: URL
  status: number
  headers: http.IncomingHttpHeaders
  body: string
  ms: number
}

function requestOnce(url: URL, maxBytes: number): Promise<FetchedPage> {
  const started = Date.now()
  const client = url.protocol === 'https:' ? https : http
  let deadline: NodeJS.Timeout | undefined
  return new Promise<FetchedPage>((resolve, reject) => {
    const req = client.request(
      url,
      {
        method: 'GET',
        lookup: safeLookup as unknown as typeof dns.lookup,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'text/html,application/xhtml+xml,text/plain,application/xml;q=0.9,*/*;q=0.5',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en',
        },
        timeout: TIMEOUT_MS,
      },
      (res) => {
        const encoding = String(res.headers['content-encoding'] || '').toLowerCase()
        const stream =
          encoding === 'br' ? res.pipe(zlib.createBrotliDecompress())
            : encoding === 'gzip' ? res.pipe(zlib.createGunzip())
              : encoding === 'deflate' ? res.pipe(zlib.createInflate())
                : res
        const chunks: Buffer[] = []
        let size = 0
        stream.on('data', (chunk: Buffer) => {
          size += chunk.length
          if (size > maxBytes) {
            req.destroy()
            resolve({ url, status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks).toString('utf8'), ms: Date.now() - started })
            return
          }
          chunks.push(chunk)
        })
        stream.on('end', () => resolve({ url, status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks).toString('utf8'), ms: Date.now() - started }))
        stream.on('error', reject)
      },
    )
    const timedOut = () => req.destroy(Object.assign(new Error('timeout'), { code: 'ETIMEDOUT' }))
    // `timeout` only catches an idle socket; the deadline also stops a site
    // that trickles bytes forever.
    deadline = setTimeout(timedOut, TIMEOUT_MS)
    req.on('timeout', timedOut)
    req.on('error', reject)
    req.end()
  }).finally(() => clearTimeout(deadline))
}

function friendlyError(error: unknown): SiteCheckError {
  const code = (error as NodeJS.ErrnoException)?.code
  if (code === 'EBLOCKED') return new SiteCheckError('Only public websites can be checked.')
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') return new SiteCheckError('That domain could not be found. Check the spelling.')
  if (code === 'ETIMEDOUT') return new SiteCheckError('The website took too long to respond (over 12 seconds).')
  if (code === 'ECONNREFUSED' || code === 'ECONNRESET') return new SiteCheckError('The website refused the connection.')
  if (typeof code === 'string' && (code.startsWith('ERR_TLS') || code.includes('CERT') || code === 'EPROTO')) {
    return new SiteCheckError('The website\'s HTTPS certificate is broken, so browsers will show a security warning.')
  }
  return new SiteCheckError('The website could not be reached.')
}

/** Fetches a URL, following up to five redirects, each checked like the first. */
export async function fetchPage(start: URL, maxBytes = MAX_BYTES): Promise<{ page: FetchedPage; redirects: string[] }> {
  const redirects: string[] = []
  let url = start
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    assertCheckable(url)
    let page: FetchedPage
    try {
      page = await requestOnce(url, maxBytes)
    } catch (error) {
      throw friendlyError(error)
    }
    const location = page.headers.location
    if (page.status >= 300 && page.status < 400 && location) {
      redirects.push(url.toString())
      url = new URL(location, url)
      continue
    }
    return { page, redirects }
  }
  throw new SiteCheckError('The website redirects too many times.')
}
