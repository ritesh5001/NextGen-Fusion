import type { Metadata } from "next"
import MaintenanceServicePage from "@/components/services/MaintenanceServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Website Maintenance Services | NextGen Fusion",
  description: "Website Maintenance Services by NextGen Fusion — security updates, uptime monitoring, backup management, performance optimization, and bug resolution on a monthly basis.",
  alternates: { canonical: `${siteUrl}/services/website-maintenance-services` },
  openGraph: {
    title: "Website Maintenance Services | NextGen Fusion",
    description: "Keep your website secure, fast, and reliable with proactive monthly maintenance from NextGen Fusion.",
    url: `${siteUrl}/services/website-maintenance-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Website Maintenance Services | NextGen Fusion", description: "Proactive website maintenance keeping your site secure, fast, and always online." },
}

export default function Page() {
  return <MaintenanceServicePage />
}
