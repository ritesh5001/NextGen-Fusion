import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { JsonLd } from "@/components/json-ld"
import { homeFaqs } from "@/data/home-faqs"
import { DEFAULT_OG_IMAGE, OG_IMAGES, ORGANIZATION_ID, siteUrl } from "@/lib/seo"


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
    // behind it.
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    mainEntity: homeFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    url: `${siteUrl}/`,
    name: "Website Development Company in Lucknow & India | NextGen Fusion",
    description:
      "Websites and online stores built in Lucknow for businesses across India, and supported after launch.",
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    mainEntity: { "@id": `${siteUrl}/#faq` },
  },
  // No BreadcrumbList here. A single "Home" item conveys no hierarchy and never
  // renders; the trails on deeper pages are the ones that matter.
]

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeClient />
    </>
  )
}
