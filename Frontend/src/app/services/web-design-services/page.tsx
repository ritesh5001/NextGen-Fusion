import type { Metadata } from "next"
import WebDesignServicePage from "@/components/services/WebDesignServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/web-design-services"
const NAME = "Web Design Services"

export const metadata: Metadata = buildMetadata({
  title: "Web Design Services — UI/UX for Brands in India",
  description: "Conversion-focused, brand-aligned UI/UX design with responsive layouts, high-fidelity prototypes and a design system you can build on.",
  path: PATH,
  ogTitle: "Web Design Services | NextGen Fusion",
  ogDescription: "Modern, conversion-focused web design with responsive layouts and strong brand identity.",
  twitterTitle: "Web Design Services | NextGen Fusion",
  twitterDescription: "Web design that converts visitors through clarity, trust, and visual excellence.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Modern, conversion-focused web design with responsive layouts and strong brand identity.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <WebDesignServicePage />
    </>
  )
}
