import type { Metadata } from "next"
import WebsiteDevelopmentServicePage from "@/components/services/WebsiteDevelopmentServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/website-development-services"
const NAME = "Website Development Services"

export const metadata: Metadata = buildMetadata({
  title: "Website Development Services",
  description: "High-performance, SEO-ready, conversion-focused websites built on Next.js, WordPress or Shopify — and supported after launch.",
  path: PATH,
  ogTitle: "Website Development Services | NextGen Fusion",
  ogDescription: "Get conversion-focused Website Development Services with strategy, design, development, and SEO built for growth.",
  twitterTitle: "Website Development Services | NextGen Fusion",
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
