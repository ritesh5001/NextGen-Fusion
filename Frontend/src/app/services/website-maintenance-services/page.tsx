import type { Metadata } from "next"
import MaintenanceServicePage from "@/components/services/MaintenanceServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/website-maintenance-services"
const NAME = "Website Maintenance Services"

export const metadata: Metadata = buildMetadata({
  title: "Website Maintenance Services",
  description: "Security updates, uptime monitoring, backups, performance optimisation and bug fixes on a monthly plan, with a named developer.",
  path: PATH,
  ogTitle: "Website Maintenance Services | NextGen Fusion",
  ogDescription: "Keep your website secure, fast, and reliable with proactive monthly maintenance from NextGen Fusion.",
  twitterTitle: "Website Maintenance Services | NextGen Fusion",
  twitterDescription: "Proactive website maintenance keeping your site secure, fast, and always online.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Keep your website secure, fast, and reliable with proactive monthly maintenance from NextGen Fusion.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <MaintenanceServicePage />
    </>
  )
}
