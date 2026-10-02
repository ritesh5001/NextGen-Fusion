import type { Metadata } from "next"
import { AuHubPage } from "@/components/australia/hub-page"
import { AUSTRALIA_PATH } from "@/data/australia"
import { auHub } from "@/data/australia/hub"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: auHub.metaTitle,
  description: auHub.metaDescription,
  path: AUSTRALIA_PATH,
})

export default function Page() {
  return <AuHubPage />
}
