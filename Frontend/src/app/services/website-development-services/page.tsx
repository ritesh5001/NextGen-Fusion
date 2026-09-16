import type { Metadata } from "next"
import WebsiteDevelopmentServicePage from "@/components/services/WebsiteDevelopmentServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/website-development-services"
const NAME = "Website Development Services in India"

export const metadata: Metadata = buildMetadata({
  title: "Website Development Services in India",
  description: "Website development services in India — high-performance, SEO-ready websites built on Next.js, WordPress or Shopify by our Lucknow team, and supported after launch.",
  path: PATH,
  ogTitle: "Website Development Services in India | NextGen Fusion",
  ogDescription: "Get conversion-focused Website Development Services with strategy, design, development, and SEO built for growth.",
  twitterTitle: "Website Development Services in India | NextGen Fusion",
  twitterDescription: "Modern Website Development Services for businesses that want performance, rankings, and higher conversion rates.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Get conversion-focused Website Development Services with strategy, design, development, and SEO built for growth.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <WebsiteDevelopmentServicePage />
    </>
  )
}
