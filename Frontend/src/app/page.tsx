import type { Metadata } from "next"
import HomeClient from "@/components/home-client"
import { JsonLd } from "@/components/json-ld"
import { homeFaqs } from "@/data/home-faqs"
import { officeSchemas } from "@/lib/office-schema"
import { staticProjects } from "@/lib/static-projects"
import { DEFAULT_OG_IMAGE, OG_IMAGES, ORGANIZATION_ID, SITE_TAGLINE, siteUrl } from "@/lib/seo"


export const metadata: Metadata = {
  // The root layout's `%s | NextGen Fusion` template does not apply to the root
  // segment, so the brand has to be spelled out here.
  title: "Web Development & AI Solutions | NextGen Fusion",
  description:
    "Web development, AI and digital solutions for growing businesses: fast websites, online stores, apps and automation, with SEO and support after launch.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    title: `NextGen Fusion | ${SITE_TAGLINE}`,
    description:
      "Websites, online stores, apps and AI automation for growing businesses, supported after launch.",
    url: `${siteUrl}/`,
    siteName: "NextGen Fusion",
    locale: "en_IN",
    type: "website",
    images: OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `NextGen Fusion | ${SITE_TAGLINE}`,
    description:
      "Websites, online stores, apps and AI automation for growing businesses, supported after launch.",
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
    name: "NextGen Fusion | Web, App & Ecommerce Development, Lucknow & Mumbai",
    description:
      "Websites, online stores, apps and AI automation for growing businesses, supported after launch.",
    inLanguage: "en-IN",
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    mainEntity: { "@id": `${siteUrl}/#faq` },
  },
  ...officeSchemas(),
  // No BreadcrumbList here. A single "Home" item conveys no hierarchy and never
  // renders; the trails on deeper pages are the ones that matter.
]

// Only the fields the homepage renders cross to the client.
const featuredProjects = staticProjects
  .filter((p) => p.featured)
  .map(({ slug, title, category, coverImage, domain, results, shortDescription, tags }) => ({
    slug, title, category, coverImage, domain, results, shortDescription, tags,
  }))

export default function Home() {
  return (
    <>
      <JsonLd data={homeSchema} />
      <HomeClient projectCount={staticProjects.length} featuredProjects={featuredProjects} />
    </>
  )
}
