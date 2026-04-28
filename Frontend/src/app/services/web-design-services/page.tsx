import type { Metadata } from "next"
import WebDesignServicePage from "@/components/services/WebDesignServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Web Design Services | NextGen Fusion",
  description: "Web Design Services by NextGen Fusion — conversion-focused, brand-aligned UI/UX design with responsive layouts, high-fidelity prototypes, and design systems.",
  alternates: { canonical: `${siteUrl}/services/web-design-services` },
  openGraph: {
    title: "Web Design Services | NextGen Fusion",
    description: "Modern, conversion-focused web design with responsive layouts and strong brand identity.",
    url: `${siteUrl}/services/web-design-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Web Design Services | NextGen Fusion", description: "Web design that converts visitors through clarity, trust, and visual excellence." },
}

export default function Page() {
  return <WebDesignServicePage />
}
