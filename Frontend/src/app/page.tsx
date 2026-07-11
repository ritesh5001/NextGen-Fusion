import type { Metadata } from "next"
import HomeClient from "@/components/home-client"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Web Development, SEO & Digital Product Agency",
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
    type: "website",
    images: ["/metaicon.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextGen Fusion - Web Development, SEO & Digital Product Agency",
    description:
      "Websites, SEO campaigns, mobile apps, software, and digital products built for measurable business growth.",
    images: ["/metaicon.svg"],
  },
}

export default function Home() {
  return <HomeClient />
}
