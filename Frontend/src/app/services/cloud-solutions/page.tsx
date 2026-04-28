import type { Metadata } from "next"
import CloudServicePage from "@/components/services/CloudServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Cloud Solutions | NextGen Fusion",
  description: "Cloud Solutions by NextGen Fusion — scalable cloud architecture, migration, CI/CD pipelines, CDN setup, and infrastructure-as-code for reliable, cost-optimized deployments.",
  alternates: { canonical: `${siteUrl}/services/cloud-solutions` },
  openGraph: {
    title: "Cloud Solutions | NextGen Fusion",
    description: "Scalable, resilient cloud infrastructure with migration, CI/CD, and cost optimization from NextGen Fusion.",
    url: `${siteUrl}/services/cloud-solutions`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Cloud Solutions | NextGen Fusion", description: "Cloud infrastructure that scales with your business at optimized cost." },
}

export default function Page() {
  return <CloudServicePage />
}
