import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"
import { SITE_TAGLINE } from "@/lib/seo"

/**
 * Per-page share image (1200×630), linked from every page's og:image by
 * buildMetadata(). Pages used to share one og-default.png, so every link posted
 * to WhatsApp, LinkedIn or X looked the same whatever it pointed to.
 */
export const runtime = "edge"

const MAX_TITLE = 110
const MAX_EYEBROW = 60

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = (searchParams.get("title") || "Websites, stores, apps and SEO").slice(0, MAX_TITLE)
  const eyebrow = (searchParams.get("eyebrow") || "").slice(0, MAX_EYEBROW)
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 78

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #1E2680 0%, #2B35AB 55%, #4A56D6 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700, letterSpacing: 1 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              background: "#FFC94D",
              marginRight: 16,
            }}
          />
          NextGen Fusion
          <div style={{ display: "flex", marginLeft: "auto", fontSize: 24, fontWeight: 500, color: "#D6DAFF" }}>
            www.nextgenfusion.in
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {eyebrow ? (
            <div style={{ fontSize: 30, color: "#FFC94D", marginBottom: 20, fontWeight: 600 }}>{eyebrow}</div>
          ) : null}
          <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 1.12 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#D6DAFF" }}>
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
