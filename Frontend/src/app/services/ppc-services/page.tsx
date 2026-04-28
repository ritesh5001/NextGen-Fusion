import type { Metadata } from "next"
import PpcServicePage from "@/components/services/PpcServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "PPC Services | NextGen Fusion",
  description: "PPC Services by NextGen Fusion — ROI-focused Google and Meta Ads campaigns with full conversion tracking, creative testing, and continuous optimization.",
  alternates: { canonical: `${siteUrl}/services/ppc-services` },
  openGraph: {
    title: "PPC Services | NextGen Fusion",
    description: "Maximize return on every rupee spent with strategic Google Ads and Meta Ads campaigns.",
    url: `${siteUrl}/services/ppc-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "PPC Services | NextGen Fusion", description: "High-ROI paid advertising campaigns across Google and Meta." },
}

export default function Page() {
  return <PpcServicePage />
}
