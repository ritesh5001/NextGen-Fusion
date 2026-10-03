/**
 * Tells the Frontend to rebuild its cached blog pages (/blog/, the post page
 * and the sitemap) the moment a post is saved, instead of waiting out the
 * pages' hourly revalidate window. See Frontend/src/app/api/revalidate.
 */
const REVALIDATE_URL = 'https://www.nextgenfusion.in/api/revalidate/'

/**
 * Fire-and-forget, like pingIndexNow: a save must never fail because the
 * Frontend is slow or unreachable, so this never throws and callers don't
 * await it.
 */
export function revalidateFrontend(slug?: string): void {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret) {
    console.warn('revalidate: REVALIDATE_SECRET is not set, skipping')
    return
  }

  fetch(REVALIDATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-revalidate-secret': secret },
    body: JSON.stringify(slug ? { slug } : {}),
  })
    .then((res) => {
      if (!res.ok) console.error(`revalidate: frontend responded ${res.status}`)
    })
    .catch((err) => {
      console.error('revalidate: request failed', err instanceof Error ? err.message : err)
    })
}
