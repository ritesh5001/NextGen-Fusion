import { NextResponse, type NextRequest } from "next/server"
import { PRIMARY_WHATSAPP_NUMBER, WHATSAPP_NUMBERS } from "@/lib/whatsapp"

const MAX_TEXT_LENGTH = 1000

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const to = searchParams.get("to")
  const number = to && WHATSAPP_NUMBERS.has(to) ? to : PRIMARY_WHATSAPP_NUMBER
  const text = searchParams.get("text")?.slice(0, MAX_TEXT_LENGTH)

  // encodeURIComponent rather than URLSearchParams: WhatsApp shows a
  // form-encoded "+" literally instead of as a space.
  const target = `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`

  return NextResponse.redirect(target, {
    status: 302,
    headers: { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" },
  })
}
