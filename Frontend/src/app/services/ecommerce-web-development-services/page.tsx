import type { Metadata } from "next"
import EcommerceServicePage from "@/components/services/EcommerceServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "E-commerce Web Development Services | NextGen Fusion",
  description: "E-commerce Web Development Services by NextGen Fusion — high-converting online stores with optimized checkout, payment gateway integration, and SEO-ready architecture.",
  alternates: { canonical: `${siteUrl}/services/ecommerce-web-development-services` },
  openGraph: {
    title: "E-commerce Web Development Services | NextGen Fusion",
    description: "Build a high-converting online store with optimized checkout, multi-gateway payments, and mobile-first shopping experience.",
    url: `${siteUrl}/services/ecommerce-web-development-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "E-commerce Web Development Services | NextGen Fusion", description: "Launch a conversion-focused online store with NextGen Fusion." },
}

export default function Page() {
  return <EcommerceServicePage />
}
