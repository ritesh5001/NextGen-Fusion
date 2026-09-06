import type { Metadata } from "next"
import SocialMediaServicePage from "@/components/services/SocialMediaServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/social-media-marketing-services"
const NAME = "Social Media Marketing Services"

export const metadata: Metadata = buildMetadata({
  title: "Social Media Marketing Services",
  description: "Strategic content, community management and paid amplification that build brand authority and drive measurable business results.",
  path: PATH,
  ogTitle: "Social Media Marketing Services | NextGen Fusion",
  ogDescription: "Build brand authority and convert followers into customers with strategic social media marketing.",
  twitterTitle: "Social Media Marketing Services | NextGen Fusion",
  twitterDescription: "Social media programs that build brand authority and drive real business results.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Build brand authority and convert followers into customers with strategic social media marketing.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <SocialMediaServicePage />
    </>
  )
}
