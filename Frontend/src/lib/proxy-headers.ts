import { TURNSTILE_HEADER } from "@/lib/turnstile"

/**
 * Headers our /api route handlers pass through to the Backend besides
 * content-type and cookies: the visitor's IP, which Vercel puts in
 * X-Forwarded-For and the Backend's rate limits key on, and the Turnstile token.
 * Without the IP, every visitor would look like one Vercel server and share a
 * single rate limit.
 */
export function forwardClientHeaders(from: Headers, to: Headers): void {
  const forwardedFor = from.get("x-forwarded-for") || from.get("x-real-ip")
  if (forwardedFor) to.set("x-forwarded-for", forwardedFor)
  const token = from.get(TURNSTILE_HEADER)
  if (token) to.set(TURNSTILE_HEADER, token)
}
