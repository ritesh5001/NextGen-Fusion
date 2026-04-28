import type { Metadata } from "next"
import SeoServicePage from "@/components/services/SeoServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "SEO Services | NextGen Fusion",
  description: "SEO Services by NextGen Fusion — technical SEO, keyword strategy, on-page optimization, and link building that builds compounding organic traffic and qualified leads.",
  alternates: { canonical: `${siteUrl}/services/seo-services` },
  openGraph: {
    title: "SEO Services | NextGen Fusion",
    description: "Build organic visibility with technical SEO, keyword strategy, content optimization, and authority building.",
    url: `${siteUrl}/services/seo-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "SEO Services | NextGen Fusion", description: "Turn Google into your most reliable lead source with expert SEO services." },
}

export default function Page() {
  return <SeoServicePage />
}
