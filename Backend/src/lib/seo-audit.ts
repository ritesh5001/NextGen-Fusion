/**
 * The checks behind the free SEO checker. Each one reads the fetched page the
 * way a search engine does and, when something is wrong, says what to do in
 * words a business owner can act on. The page at /free-seo-checker/ explains
 * the same checks; keep the two in step.
 */
import { fetchPage, SiteCheckError, type FetchedPage } from './site-check'

export type CheckStatus = 'pass' | 'warn' | 'fail'
export type CheckGroup = 'Search basics' | 'Content' | 'Technical' | 'Sharing'

export type SeoCheck = {
  id: string
  group: CheckGroup
  label: string
  status: CheckStatus
  detail: string
  fix?: string
}

export type SeoReport = {
  url: string
  finalUrl: string
  status: number
  responseMs: number
  redirects: string[]
  score: number
  checks: SeoCheck[]
  checkedAt: string
}

// ─── HTML helpers ───────────────────────────────────────────────────────────
// Regular expressions are enough for the handful of head tags we read, and
// keep this dependency-free. They are not a general HTML parser.

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

function decode(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (match, name: string) => ENTITIES[name.toLowerCase()] ?? match)
    .replace(/\s+/g, ' ')
    .trim()
}

function attributes(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  for (const match of tag.matchAll(/([^\s=/<>"']+)\s*(?:=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g)) {
    const value = match[2] ?? ''
    attrs[match[1].toLowerCase()] = decode(value.replace(/^["']|["']$/g, ''))
  }
  return attrs
}

function tags(html: string, name: string): Record<string, string>[] {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attributes(m[0]))
}

function meta(html: string, key: string): string | undefined {
  const found = tags(html, 'meta').find((attrs) => (attrs.name ?? attrs.property ?? '').toLowerCase() === key)
  return found?.content
}

function visibleText(html: string): string {
  return decode(
    html
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
}

function jsonLdTypes(html: string): string[] {
  const types = new Set<string>()
  const visit = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(visit)
    if (!node || typeof node !== 'object') return
    const record = node as Record<string, unknown>
    const type = record['@type']
    if (typeof type === 'string') types.add(type)
    if (Array.isArray(type)) type.forEach((t) => typeof t === 'string' && types.add(t))
    if (record['@graph']) visit(record['@graph'])
  }
  for (const match of html.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      visit(JSON.parse(match[1]))
    } catch {
      types.add('(invalid JSON-LD)')
    }
  }
  return [...types]
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

// ─── The checks ─────────────────────────────────────────────────────────────

function pageChecks(page: FetchedPage, redirects: string[]): SeoCheck[] {
  const html = page.body
  const checks: SeoCheck[] = []
  const add = (check: SeoCheck) => checks.push(check)

  add(
    page.url.protocol === 'https:'
      ? { id: 'https', group: 'Technical', label: 'Secure connection (HTTPS)', status: 'pass', detail: 'The page loads over HTTPS.' }
      : { id: 'https', group: 'Technical', label: 'Secure connection (HTTPS)', status: 'fail', detail: 'The page loads over plain HTTP, so browsers mark it "Not secure".', fix: 'Install an SSL certificate (most hosts include one free) and redirect every http:// address to https://.' },
  )

  add(
    redirects.length <= 1
      ? { id: 'redirects', group: 'Technical', label: 'Redirects', status: 'pass', detail: redirects.length === 0 ? 'No redirects before the page loads.' : 'One redirect, which is normal (for example http to https).' }
      : { id: 'redirects', group: 'Technical', label: 'Redirects', status: 'warn', detail: `${plural(redirects.length, 'redirect')} before the page loads. Each one adds a delay.`, fix: 'Point links and your main address straight at the final URL, so there is at most one hop.' },
  )

  const seconds = (page.ms / 1000).toFixed(1)
  add(
    page.ms < 800
      ? { id: 'response', group: 'Technical', label: 'Server response time', status: 'pass', detail: `The server answered and sent the page in ${seconds}s.` }
      : page.ms < 2000
        ? { id: 'response', group: 'Technical', label: 'Server response time', status: 'warn', detail: `The server took ${seconds}s to send the page. Under 0.8s is a good target.`, fix: 'Turn on page caching and a CDN, and check the hosting plan is not overloaded.' }
        : { id: 'response', group: 'Technical', label: 'Server response time', status: 'fail', detail: `The server took ${seconds}s to send the page, before anything could be shown.`, fix: 'Page caching, a CDN, or better hosting. Slow servers hold back every other speed fix.' },
  )

  const encoding = String(page.headers['content-encoding'] || '')
  add(
    encoding
      ? { id: 'compression', group: 'Technical', label: 'Compression', status: 'pass', detail: `The page is sent compressed (${encoding}).` }
      : { id: 'compression', group: 'Technical', label: 'Compression', status: 'warn', detail: 'The page is sent uncompressed, so it is several times larger than it needs to be.', fix: 'Turn on gzip or Brotli compression on the server or CDN.' },
  )

  const viewport = meta(html, 'viewport')
  add(
    viewport && /width\s*=\s*device-width/i.test(viewport)
      ? { id: 'viewport', group: 'Technical', label: 'Mobile-friendly setup', status: 'pass', detail: 'The page tells phones to fit it to the screen.' }
      : { id: 'viewport', group: 'Technical', label: 'Mobile-friendly setup', status: 'fail', detail: 'No mobile viewport tag, so phones show a shrunken desktop page. Google ranks the mobile version.', fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to the page head.' },
  )

  const lang = tags(html, 'html')[0]?.lang
  add(
    lang
      ? { id: 'lang', group: 'Technical', label: 'Page language', status: 'pass', detail: `The page declares its language (${lang}).` }
      : { id: 'lang', group: 'Technical', label: 'Page language', status: 'warn', detail: 'The page does not say what language it is in.', fix: 'Add a lang attribute to the <html> tag, for example lang="en".' },
  )

  // Search basics
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleMatch ? decode(titleMatch[1]) : ''
  add(
    !title
      ? { id: 'title', group: 'Search basics', label: 'Page title', status: 'fail', detail: 'The page has no title. It is the blue link people click in Google.', fix: 'Write a title of about 50–60 characters: what you offer, where, and your brand.' }
      : title.length < 25
        ? { id: 'title', group: 'Search basics', label: 'Page title', status: 'warn', detail: `"${title}" is only ${title.length} characters, which wastes the space Google gives you.`, fix: 'Say what you offer and where, then your brand, in about 50–60 characters.' }
        : title.length > 65
          ? { id: 'title', group: 'Search basics', label: 'Page title', status: 'warn', detail: `The title is ${title.length} characters, so Google will cut it off: "${title}"`, fix: 'Keep it under about 60 characters with the most important words first.' }
          : { id: 'title', group: 'Search basics', label: 'Page title', status: 'pass', detail: `"${title}" (${title.length} characters).` },
  )

  const description = meta(html, 'description') ?? ''
  add(
    !description
      ? { id: 'description', group: 'Search basics', label: 'Meta description', status: 'fail', detail: 'No meta description, so Google picks a random snippet from the page.', fix: 'Write 1–2 sentences (120–160 characters) that say what the page offers and why to click.' }
      : description.length < 70 || description.length > 170
        ? { id: 'description', group: 'Search basics', label: 'Meta description', status: 'warn', detail: `The description is ${description.length} characters; 120–160 shows in full without being cut.`, fix: description.length < 70 ? 'Add a reason to click: what is offered, for whom, and what makes it different.' : 'Shorten it so the key message comes first and nothing important is cut off.' }
        : { id: 'description', group: 'Search basics', label: 'Meta description', status: 'pass', detail: `${description.length} characters: "${description}"` },
  )

  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => visibleText(m[1])).filter(Boolean)
  add(
    h1s.length === 1
      ? { id: 'h1', group: 'Search basics', label: 'Main heading (H1)', status: 'pass', detail: `"${h1s[0].slice(0, 120)}"` }
      : h1s.length === 0
        ? { id: 'h1', group: 'Search basics', label: 'Main heading (H1)', status: 'fail', detail: 'The page has no main heading, so search engines have to guess its topic.', fix: 'Give the page one H1 that says what it is about, in the words customers search.' }
        : { id: 'h1', group: 'Search basics', label: 'Main heading (H1)', status: 'warn', detail: `The page has ${h1s.length} main headings, which blurs what it is about.`, fix: 'Keep one H1 for the page topic and turn the others into H2 subheadings.' },
  )

  const canonical = tags(html, 'link').find((attrs) => attrs.rel?.toLowerCase().split(/\s+/).includes('canonical'))?.href
  let canonicalCheck: SeoCheck
  if (!canonical) {
    canonicalCheck = { id: 'canonical', group: 'Search basics', label: 'Canonical URL', status: 'warn', detail: 'No canonical tag, so copies of this page (with tracking codes, www or not) can compete with each other.', fix: 'Add <link rel="canonical"> pointing at the one address you want ranked.' }
  } else {
    let resolved: URL | undefined
    try {
      resolved = new URL(canonical, page.url)
    } catch {
      resolved = undefined
    }
    const same = resolved && resolved.host === page.url.host && resolved.pathname.replace(/\/$/, '') === page.url.pathname.replace(/\/$/, '')
    canonicalCheck = same
      ? { id: 'canonical', group: 'Search basics', label: 'Canonical URL', status: 'pass', detail: `Points at this page: ${resolved}` }
      : { id: 'canonical', group: 'Search basics', label: 'Canonical URL', status: 'warn', detail: `Points at a different address (${canonical}), so Google may rank that one instead of this page.`, fix: 'If this page should rank, make its canonical point at itself.' }
  }
  add(canonicalCheck)

  const robotsMeta = `${meta(html, 'robots') ?? ''} ${meta(html, 'googlebot') ?? ''} ${String(page.headers['x-robots-tag'] ?? '')}`
  add(
    /noindex/i.test(robotsMeta)
      ? { id: 'indexable', group: 'Search basics', label: 'Allowed in Google', status: 'fail', detail: 'The page tells search engines not to index it (noindex). It cannot appear in Google.', fix: 'Remove noindex from the robots meta tag or X-Robots-Tag header. WordPress: Settings › Reading › uncheck "Discourage search engines".' }
      : page.status >= 400
        ? { id: 'indexable', group: 'Search basics', label: 'Allowed in Google', status: 'fail', detail: `The page returns an error (HTTP ${page.status}), so it will not be indexed.`, fix: 'Fix the page or redirect the address to a working one.' }
        : { id: 'indexable', group: 'Search basics', label: 'Allowed in Google', status: 'pass', detail: 'Nothing on the page blocks indexing.' },
  )

  // Content
  const words = visibleText(html).split(' ').filter((w) => /[\p{L}\p{N}]/u.test(w)).length
  add(
    words >= 300
      ? { id: 'words', group: 'Content', label: 'Amount of text', status: 'pass', detail: `About ${words} words of readable text.` }
      : words >= 120
        ? { id: 'words', group: 'Content', label: 'Amount of text', status: 'warn', detail: `About ${words} words. Thin pages rarely rank for competitive searches.`, fix: 'Answer the questions customers ask before they buy: what, for whom, how long, what it includes, proof.' }
        : { id: 'words', group: 'Content', label: 'Amount of text', status: 'fail', detail: `Only about ${words} words are in the page as delivered. If the site draws its content with JavaScript, search engines and AI tools may see this little too.`, fix: 'Add real text, and make sure the server sends it in the HTML (server-side rendering), not only after scripts run.' },
  )

  const images = tags(html, 'img')
  const missingAlt = images.filter((attrs) => !('alt' in attrs)).length
  add(
    images.length === 0
      ? { id: 'alt', group: 'Content', label: 'Image descriptions (alt text)', status: 'pass', detail: 'No images in the page HTML.' }
      : missingAlt === 0
        ? { id: 'alt', group: 'Content', label: 'Image descriptions (alt text)', status: 'pass', detail: `All ${plural(images.length, 'image')} have alt text.` }
        : { id: 'alt', group: 'Content', label: 'Image descriptions (alt text)', status: missingAlt / images.length > 0.3 ? 'fail' : 'warn', detail: `${missingAlt} of ${plural(images.length, 'image')} have no alt text, so Google Images and screen readers cannot tell what they show.`, fix: 'Describe each meaningful image in a few words; use alt="" only for decoration.' },
  )

  const types = jsonLdTypes(html)
  const invalid = types.includes('(invalid JSON-LD)')
  add(
    types.length === 0
      ? { id: 'schema', group: 'Content', label: 'Structured data (schema)', status: 'warn', detail: 'No structured data, so Google and AI assistants have to guess who you are, what you sell and where.', fix: 'Add JSON-LD for your Organization or LocalBusiness, plus Product, Service, FAQ or Article where they fit.' }
      : invalid
        ? { id: 'schema', group: 'Content', label: 'Structured data (schema)', status: 'fail', detail: 'At least one structured-data block is broken JSON, so it is ignored.', fix: 'Run the page through Google\'s Rich Results Test and fix the block it reports.' }
        : { id: 'schema', group: 'Content', label: 'Structured data (schema)', status: 'pass', detail: `Found: ${types.slice(0, 8).join(', ')}${types.length > 8 ? '…' : ''}.` },
  )

  // Sharing
  const ogTitle = meta(html, 'og:title')
  const ogImage = meta(html, 'og:image')
  add(
    ogTitle && ogImage
      ? { id: 'og', group: 'Sharing', label: 'Link preview (Open Graph)', status: 'pass', detail: 'Shared links show a title and image on WhatsApp, LinkedIn and Facebook.' }
      : { id: 'og', group: 'Sharing', label: 'Link preview (Open Graph)', status: 'warn', detail: `Missing ${[!ogTitle && 'og:title', !ogImage && 'og:image'].filter(Boolean).join(' and ')}, so shared links show a plain or random preview.`, fix: 'Add og:title, og:description and a 1200×630 og:image. SEO plugins like Yoast or Rank Math do this for you.' },
  )

  add(
    tags(html, 'link').some((attrs) => /icon/i.test(attrs.rel ?? ''))
      ? { id: 'favicon', group: 'Sharing', label: 'Site icon (favicon)', status: 'pass', detail: 'The site has an icon for browser tabs and Google results.' }
      : { id: 'favicon', group: 'Sharing', label: 'Site icon (favicon)', status: 'warn', detail: 'No site icon is linked. Google shows it next to your result on mobile.', fix: 'Add a square icon (at least 48×48) and link it with <link rel="icon">.' },
  )

  return checks
}

/** True when the "User-agent: *" group disallows the whole site. */
function robotsBlocksEverything(robots: string): boolean {
  let agents: string[] = []
  let inRules = false
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.replace(/#.*/, '').trim()
    const [field, ...rest] = line.split(':')
    const value = rest.join(':').trim()
    const key = field.trim().toLowerCase()
    if (key === 'user-agent') {
      if (inRules) agents = []
      inRules = false
      agents.push(value)
    } else if (key === 'disallow' || key === 'allow') {
      inRules = true
      if (key === 'disallow' && value === '/' && agents.includes('*')) return true
    }
  }
  return false
}

async function crawlChecks(origin: URL): Promise<SeoCheck[]> {
  const checks: SeoCheck[] = []
  let sitemapFromRobots: string | undefined
  try {
    const { page } = await fetchPage(new URL('/robots.txt', origin), 512 * 1024)
    const isText = page.status === 200 && !/<html/i.test(page.body.slice(0, 500))
    if (!isText) {
      checks.push({ id: 'robots', group: 'Technical', label: 'robots.txt', status: 'warn', detail: 'No robots.txt file found.', fix: 'Add a robots.txt that allows crawling and lists your sitemap.' })
    } else {
      sitemapFromRobots = page.body.match(/^\s*sitemap:\s*(\S+)/im)?.[1]
      const blocksAll = robotsBlocksEverything(page.body)
      checks.push(
        blocksAll
          ? { id: 'robots', group: 'Technical', label: 'robots.txt', status: 'fail', detail: 'robots.txt blocks every search engine from the whole site (Disallow: /).', fix: 'Remove "Disallow: /" from the "User-agent: *" group.' }
          : { id: 'robots', group: 'Technical', label: 'robots.txt', status: 'pass', detail: 'robots.txt exists and does not block the whole site.' },
      )
    }
  } catch {
    checks.push({ id: 'robots', group: 'Technical', label: 'robots.txt', status: 'warn', detail: 'robots.txt could not be loaded.', fix: 'Add a robots.txt that allows crawling and lists your sitemap.' })
  }

  let sitemapFound = false
  for (const candidate of [sitemapFromRobots, '/sitemap.xml', '/sitemap_index.xml'].filter((c): c is string => Boolean(c))) {
    try {
      const { page } = await fetchPage(new URL(candidate, origin), 256 * 1024)
      if (page.status === 200 && /<(urlset|sitemapindex)\b/i.test(page.body)) {
        sitemapFound = true
        break
      }
    } catch {
      // try the next candidate
    }
  }
  checks.push(
    sitemapFound
      ? { id: 'sitemap', group: 'Technical', label: 'XML sitemap', status: 'pass', detail: 'An XML sitemap was found, so search engines can find every page.' }
      : { id: 'sitemap', group: 'Technical', label: 'XML sitemap', status: 'warn', detail: 'No XML sitemap was found at the usual addresses or in robots.txt.', fix: 'Create a sitemap.xml (SEO plugins do this), list it in robots.txt and submit it in Google Search Console.' },
  )
  return checks
}

const WEIGHT: Record<string, number> = { indexable: 3, https: 2, title: 2, description: 2, h1: 2, viewport: 2, words: 2, response: 2 }
const POINTS: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 }

export async function auditUrl(url: URL): Promise<SeoReport> {
  const { page, redirects } = await fetchPage(url)
  const type = String(page.headers['content-type'] || '')
  if (type && !/html/i.test(type)) {
    throw new SiteCheckError(`That address is not a web page (it returned ${type.split(';')[0]}).`)
  }
  const checks = [...pageChecks(page, redirects), ...(await crawlChecks(page.url))]
  const total = checks.reduce((sum, c) => sum + (WEIGHT[c.id] ?? 1), 0)
  const earned = checks.reduce((sum, c) => sum + (WEIGHT[c.id] ?? 1) * POINTS[c.status], 0)
  return {
    url: url.toString(),
    finalUrl: page.url.toString(),
    status: page.status,
    responseMs: page.ms,
    redirects,
    score: Math.round((earned / total) * 100),
    checks,
    checkedAt: new Date().toISOString(),
  }
}
