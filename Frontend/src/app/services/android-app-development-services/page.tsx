import type { Metadata } from "next"
import AndroidServicePage from "@/components/services/AndroidServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "Android App Development Services | NextGen Fusion",
  description: "Android App Development Services by NextGen Fusion — native Kotlin apps with smooth performance, Firebase integration, and Play Store publishing support.",
  alternates: { canonical: `${siteUrl}/services/android-app-development-services` },
  openGraph: {
    title: "Android App Development Services | NextGen Fusion",
    description: "Build robust, high-performance Android apps with native Kotlin, API integration, and push notifications.",
    url: `${siteUrl}/services/android-app-development-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Android App Development Services | NextGen Fusion", description: "Native Android app development built for performance and retention." },
}

export default function Page() {
  return <AndroidServicePage />
}
