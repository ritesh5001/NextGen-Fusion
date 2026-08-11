import type { Metadata } from "next"
import AndroidServicePage from "@/components/services/AndroidServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/android-app-development-services"
const NAME = "Android App Development Services"

export const metadata: Metadata = buildMetadata({
  title: "Android App Development Services",
  description: "Android App Development Services by NextGen Fusion — native Kotlin apps with smooth performance, Firebase integration, and Play Store publishing support.",
  path: PATH,
  ogTitle: "Android App Development Services | NextGen Fusion",
  ogDescription: "Build robust, high-performance Android apps with native Kotlin, API integration, and push notifications.",
  twitterTitle: "Android App Development Services | NextGen Fusion",
  twitterDescription: "Native Android app development built for performance and retention.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Build robust, high-performance Android apps with native Kotlin, API integration, and push notifications.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <AndroidServicePage />
    </>
  )
}
