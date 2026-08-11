import type { Metadata } from "next"
import ApiServicePage from "@/components/services/ApiServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/api-integration-services"
const NAME = "API Integration Services"

export const metadata: Metadata = buildMetadata({
  title: "API Integration Services",
  description: "API Integration Services by NextGen Fusion — reliable REST, GraphQL, and webhook integrations that connect your CRM, payments, and platforms into unified automated workflows.",
  path: PATH,
  ogTitle: "API Integration Services | NextGen Fusion",
  ogDescription: "Connect all your tools and eliminate manual data work with reliable API integrations.",
  twitterTitle: "API Integration Services | NextGen Fusion",
  twitterDescription: "Make all your tools work together with seamless, reliable API integrations.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Connect all your tools and eliminate manual data work with reliable API integrations.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <ApiServicePage />
    </>
  )
}
