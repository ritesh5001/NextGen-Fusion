import type { Metadata } from "next"
import SoftwareServicePage from "@/components/services/SoftwareServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/software-development-services"
const NAME = "Software Development Services"

export const metadata: Metadata = buildMetadata({
  title: "Software Development Services",
  description: "Custom SaaS platforms, internal tools and business automation systems, designed precisely around how your operations actually run.",
  path: PATH,
  ogTitle: "Software Development Services | NextGen Fusion",
  ogDescription: "Custom software development for complex business workflows, SaaS products, and automation systems.",
  twitterTitle: "Software Development Services | NextGen Fusion",
  twitterDescription: "Custom software that fits exactly how your business operates.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Custom software development for complex business workflows, SaaS products, and automation systems.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <SoftwareServicePage />
    </>
  )
}
