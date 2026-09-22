import type { Metadata } from "next"
import { GuidePageTemplate } from "@/components/guide-page-template"
import { getGuidePage } from "@/data/guides"
import { buildMetadata } from "@/lib/seo"

const page = getGuidePage("/website-development-cost-in-india")

export const metadata: Metadata = buildMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: page.path,
  type: "article",
  modifiedTime: page.updated,
})

export default function Page() {
  return <GuidePageTemplate page={page} />
}
