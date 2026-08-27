import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { DEFAULT_OG_IMAGE, OG_IMAGES, siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  // The root layout's `%s | NextGen Fusion` template does not apply to the root
  // segment, so the brand has to be spelled out here.
  title: "NextGen Fusion — Web Development, SEO & Digital Product Agency",
  description:
    "NextGen Fusion builds websites, SEO campaigns, mobile apps, software, and digital products for businesses that want measurable growth.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    description:
      "Websites, SEO campaigns, mobile apps, software, and digital products built for measurable business growth.",
    url: `${siteUrl}/`,
    siteName: "NextGen Fusion",
    locale: "en_IN",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    description:
      "Websites, SEO campaigns, mobile apps, software, and digital products built for measurable business growth.",
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function Home() {
  return <HomeClient />
}
