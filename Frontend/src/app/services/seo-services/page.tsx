import type { Metadata } from "next"
import SeoServicePage from "@/components/services/SeoServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/seo-services"
const NAME = "SEO Services"

export const metadata: Metadata = buildMetadata({
  title: "SEO Services in Lucknow & Across India",
  description: "Technical SEO, keyword strategy, on-page optimisation and link building that compound into organic traffic and qualified leads.",
  path: PATH,
  ogTitle: "SEO Services | NextGen Fusion",
  ogDescription: "Build organic visibility with technical SEO, keyword strategy, content optimization, and authority building.",
  twitterTitle: "SEO Services | NextGen Fusion",
  twitterDescription: "Turn Google into your most reliable lead source with expert SEO services.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Build organic visibility with technical SEO, keyword strategy, content optimization, and authority building.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <SeoServicePage />
    </>
  )
}
