import type { Metadata } from "next"
import ApiServicePage from "@/components/services/ApiServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "API Integration Services | NextGen Fusion",
  description: "API Integration Services by NextGen Fusion — reliable REST, GraphQL, and webhook integrations that connect your CRM, payments, and platforms into unified automated workflows.",
  alternates: { canonical: `${siteUrl}/services/api-integration-services` },
  openGraph: {
    title: "API Integration Services | NextGen Fusion",
    description: "Connect all your tools and eliminate manual data work with reliable API integrations.",
    url: `${siteUrl}/services/api-integration-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "API Integration Services | NextGen Fusion", description: "Make all your tools work together with seamless, reliable API integrations." },
}

export default function Page() {
  return <ApiServicePage />
}
