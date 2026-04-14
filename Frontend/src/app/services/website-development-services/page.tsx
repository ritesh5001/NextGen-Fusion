import type { Metadata } from "next"

import WebsiteDevelopmentServicePage from "@/components/services/WebsiteDevelopmentServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Website Development Services | NextGen Fusion",
  description:
    "Website Development Services by NextGen Fusion for high-performance, SEO-ready, and conversion-focused websites that help businesses generate measurable growth.",
  alternates: {
    canonical: `${siteUrl}/services/website-development-services`,
  },
  openGraph: {
    title: "Website Development Services | NextGen Fusion",
    description:
      "Get conversion-focused Website Development Services with strategy, design, development, and SEO built for growth.",
    url: `${siteUrl}/services/website-development-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Services | NextGen Fusion",
    description:
      "Modern Website Development Services for businesses that want performance, rankings, and higher conversion rates.",
  },
}

export default function Page() {
  return <WebsiteDevelopmentServicePage />
}
