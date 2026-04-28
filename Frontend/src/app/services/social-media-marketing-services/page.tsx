import type { Metadata } from "next"
import SocialMediaServicePage from "@/components/services/SocialMediaServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Social Media Marketing Services | NextGen Fusion",
  description: "Social Media Marketing Services by NextGen Fusion — strategic content, community management, and paid amplification that builds brand authority and drives business results.",
  alternates: { canonical: `${siteUrl}/services/social-media-marketing-services` },
  openGraph: {
    title: "Social Media Marketing Services | NextGen Fusion",
    description: "Build brand authority and convert followers into customers with strategic social media marketing.",
    url: `${siteUrl}/services/social-media-marketing-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Social Media Marketing Services | NextGen Fusion", description: "Social media programs that build brand authority and drive real business results." },
}

export default function Page() {
  return <SocialMediaServicePage />
}
