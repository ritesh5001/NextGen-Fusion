import type { Metadata } from "next"
import PpcServicePage from "@/components/services/PpcServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/ppc-services"
const NAME = "PPC Services"

export const metadata: Metadata = buildMetadata({
  title: "PPC & Google Ads Services in India",
  description: "PPC Services by NextGen Fusion — ROI-focused Google and Meta Ads campaigns with full conversion tracking, creative testing, and continuous optimization.",
  path: PATH,
  ogTitle: "PPC Services | NextGen Fusion",
  ogDescription: "Maximize return on every rupee spent with strategic Google Ads and Meta Ads campaigns.",
  twitterTitle: "PPC Services | NextGen Fusion",
  twitterDescription: "High-ROI paid advertising campaigns across Google and Meta.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Maximize return on every rupee spent with strategic Google Ads and Meta Ads campaigns.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <PpcServicePage />
    </>
  )
}
