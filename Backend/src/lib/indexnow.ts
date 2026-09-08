/**
 * IndexNow — pings Bing/Yandex the moment a URL is published or changed,
 * instead of waiting on their next passive crawl. Google does not consume
 * this protocol; GSC's own indexing API covers that side separately.
 *
 * The key is not a secret — it is served as a public file at the site root
 * (Frontend/public/<key>.txt) so the API can confirm we own the domain, the
 * same reasoning src/components/analytics.tsx uses for hardcoding the GA id.
 */
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '37c783f0c8a246b4b43563fa4fde85a4'
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://www.nextgenfusion.in'

function siteHost(): string {
  return new URL(SITE_URL).host
}

/**
 * Fire-and-forget: a publish or update must never fail because IndexNow is
 * slow or unreachable, so this never throws and callers don't await it.
 */
export function pingIndexNow(paths: string[]): void {
  const urlList = paths
    .filter(Boolean)
    .map((path) => new URL(path, SITE_URL).toString())

  if (urlList.length === 0) return

  fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: siteHost(),
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  }).catch((err) => {
    console.error('indexnow: ping failed', err instanceof Error ? err.message : err)
  })
}
