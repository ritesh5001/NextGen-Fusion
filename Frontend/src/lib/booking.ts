import { trackEvent } from "@/lib/analytics"

/** What a caller can pre-fill when opening the booking modal. */
export type BookingRequest = {
  conversationId?: string
  name?: string
  email?: string
  phone?: string
  companyName?: string
  projectSummary?: string
  budget?: string
  timeline?: string
  aiContext?: string
  requestType?: "meeting" | "callback"
}

export const OPEN_BOOKING_MODAL_EVENT = "open-booking-modal"

/**
 * Opens the booking modal from anywhere. Lives apart from the modal component
 * so that a "Book a call" button does not pull the modal — and framer-motion
 * with it — into a page's first-load JavaScript. The modal is loaded lazily
 * by LayoutChrome and listens for this event.
 */
export function openBookingModal(detail: BookingRequest = {}) {
  if (typeof window === "undefined") return
  trackEvent("book_call")
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_MODAL_EVENT, { detail }))
}
