import type { Metadata } from "next"
import CloudServicePage from "@/components/services/CloudServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/cloud-solutions"
const NAME = "Cloud Solutions"

export const metadata: Metadata = buildMetadata({
  title: "Cloud Solutions — Architecture, Migration & CI/CD",
  description: "Scalable cloud architecture, migration, CI/CD pipelines, CDN setup and infrastructure-as-code for reliable, cost-optimised deployments.",
  path: PATH,
  ogTitle: "Cloud Solutions | NextGen Fusion",
  ogDescription: "Scalable, resilient cloud infrastructure with migration, CI/CD, and cost optimization from NextGen Fusion.",
  twitterTitle: "Cloud Solutions | NextGen Fusion",
  twitterDescription: "Cloud infrastructure that scales with your business at optimized cost.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Scalable, resilient cloud infrastructure with migration, CI/CD, and cost optimization from NextGen Fusion.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <CloudServicePage />
    </>
  )
}
