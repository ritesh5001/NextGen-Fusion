import { offices, PRIMARY_PHONE_E164 } from "@/data/offices"

/**
 * WhatsApp links go through our own /go/whatsapp/ redirect instead of pointing
 * at wa.me directly.
 *
 * wa.me answers every crawler with 429 Too Many Requests, so site audits
 * (Semrush, Ahrefs) reported ~60 "broken external links" — one per page that
 * carries the footer or a CTA. The links work for people; only bots are
 * throttled. /go/ is disallowed in robots.txt, so crawlers stop at our redirect
 * and never reach wa.me, while visitors land in the same chat as before.
 */
export const WHATSAPP_REDIRECT_PATH = "/go/whatsapp/"

const digits = (phoneE164: string) => phoneE164.replace(/\D/g, "")

/** Only our own numbers may be targeted, so the redirect can't be used to open arbitrary chats. */
export const WHATSAPP_NUMBERS = new Set(offices.map((office) => digits(office.contact.phoneE164)))
export const PRIMARY_WHATSAPP_NUMBER = digits(PRIMARY_PHONE_E164)

export function whatsappHref(text?: string, phoneE164: string = PRIMARY_PHONE_E164): string {
  const params = new URLSearchParams()
  const number = digits(phoneE164)
  if (number !== PRIMARY_WHATSAPP_NUMBER) params.set("to", number)
  if (text) params.set("text", text)
  const query = params.toString()
  return query ? `${WHATSAPP_REDIRECT_PATH}?${query}` : WHATSAPP_REDIRECT_PATH
}
