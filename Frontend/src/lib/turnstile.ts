/** Shared by the form widget (components/turnstile.tsx) and lib/api.ts. */
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""
export const TURNSTILE_ENABLED = TURNSTILE_SITE_KEY !== ""
export const TURNSTILE_HEADER = "x-turnstile-token"

/** Headers to send with a protected form submission. */
export function turnstileHeaders(token: string | null): Record<string, string> {
  return token ? { [TURNSTILE_HEADER]: token } : {}
}
