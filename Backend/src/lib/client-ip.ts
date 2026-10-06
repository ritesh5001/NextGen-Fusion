import type { Request } from 'express'

/**
 * The visitor's IP address.
 *
 * Browser requests reach this server through the website on Vercel, either a
 * rewrite or a Next.js route handler, so the socket address is Vercel's, shared
 * by every visitor. Vercel overwrites X-Forwarded-For with the real client IP,
 * and our route handlers pass it on, so its first entry is the visitor.
 *
 * A request sent straight to this server can fake the header. That only lets it
 * dodge a rate limit; the forms also require a Turnstile token, which can't be
 * faked.
 */
export function clientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for']
  const first = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim()
  return first || req.socket.remoteAddress || 'unknown'
}
