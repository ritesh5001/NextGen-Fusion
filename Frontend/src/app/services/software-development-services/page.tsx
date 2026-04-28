import type { Metadata } from "next"
import SoftwareServicePage from "@/components/services/SoftwareServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Software Development Services | NextGen Fusion",
  description: "Software Development Services by NextGen Fusion — custom SaaS platforms, internal tools, and business automation systems designed precisely for your operational needs.",
  alternates: { canonical: `${siteUrl}/services/software-development-services` },
  openGraph: {
    title: "Software Development Services | NextGen Fusion",
    description: "Custom software development for complex business workflows, SaaS products, and automation systems.",
    url: `${siteUrl}/services/software-development-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Software Development Services | NextGen Fusion", description: "Custom software that fits exactly how your business operates." },
}

export default function Page() {
  return <SoftwareServicePage />
}
