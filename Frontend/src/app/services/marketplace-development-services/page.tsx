import type { Metadata } from "next"
import { GuidePageTemplate } from "@/components/guide-page-template"
import { getGuidePage } from "@/data/guides"
import { buildMetadata } from "@/lib/seo"

const page = getGuidePage("/services/marketplace-development-services")

export const metadata: Metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
})

export default function Page() {
  return <GuidePageTemplate page={page} />
}
