import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { JsonLd } from "@/components/json-ld"
import { homeFaqs } from "@/data/home-faqs"
import { breadcrumbSchema } from "@/lib/seo"
import { DEFAULT_OG_IMAGE, OG_IMAGES, siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  // The root layout's `%s | NextGen Fusion` template does not apply to the root
  // segment, so the brand has to be spelled out here.
  title: "Website Development Company in Lucknow & India | NextGen Fusion",
  description:
    "Website development company in Lucknow building fast Next.js, WordPress and Shopify websites and online stores for businesses across Uttar Pradesh and India, with SEO and support after launch.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: "Website Development Company in Lucknow & India | NextGen Fusion",
    description:
      "Websites and online stores built in Lucknow for businesses across India, and supported after launch.",
    url: `${siteUrl}/`,
    siteName: "NextGen Fusion",
    locale: "en_IN",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Development Company in Lucknow & India | NextGen Fusion",
    description:
      "Websites and online stores built in Lucknow for businesses across India, and supported after launch.",
    images: [DEFAULT_OG_IMAGE],
  },
}

const homeSchema = [
  {
    // The FAQ block has been visible on the homepage all along with no markup
    // behind it. BreadcrumbList anchors the rest of the site's crumb trails.
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  breadcrumbSchema([{ name: "Home", path: "/" }]),
]

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeClient />
    </>
  )
}
