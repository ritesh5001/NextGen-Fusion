import type { Metadata } from "next"
import EcommerceServicePage from "@/components/services/EcommerceServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/ecommerce-web-development-services"
const NAME = "E-commerce Web Development Services"

export const metadata: Metadata = buildMetadata({
  title: "E-commerce Web Development Services",
  description: "E-commerce Web Development Services by NextGen Fusion — high-converting online stores with optimized checkout, payment gateway integration, and SEO-ready architecture.",
  path: PATH,
  ogTitle: "E-commerce Web Development Services | NextGen Fusion",
  ogDescription: "Build a high-converting online store with optimized checkout, multi-gateway payments, and mobile-first shopping experience.",
  twitterTitle: "E-commerce Web Development Services | NextGen Fusion",
  twitterDescription: "Launch a conversion-focused online store with NextGen Fusion.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Build a high-converting online store with optimized checkout, multi-gateway payments, and mobile-first shopping experience.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <EcommerceServicePage />
    </>
  )
}
