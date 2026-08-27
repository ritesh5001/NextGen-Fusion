/**
 * Conversion tracking. Sessions are a vanity number — these are the four
 * actions that actually represent a lead, so they are the ones to report on.
 *
 * Safe to call anywhere: no-ops when gtag is absent (analytics not configured,
 * ad-blocker, or server render), so callers never need to guard.
 */

export type ConversionEvent =
  | "whatsapp_click"
  | "estimator_submit"
  | "contact_submit"
  | "book_call"
  | "career_application_submit"
  | "store_product_view"

type GtagFn = (
  command: "event" | "config" | "js",
  targetOrEvent: string | Date,
  params?: Record<string, unknown>,
) => void

export function trackEvent(
  event: ConversionEvent,
  params: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: GtagFn }).gtag
  if (typeof gtag !== "function") return
  gtag("event", event, params)
}
