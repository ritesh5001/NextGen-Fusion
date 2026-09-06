import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LocationPageTemplate } from "@/components/location-page-template"
import { buildMetadata } from "@/lib/seo"
import { getLocationPage } from "@/data/locations"

const SLUG = "seo-services-in-lucknow"
const page = getLocationPage(SLUG)

export const metadata: Metadata = page
  ? buildMetadata({
      title: page.metaTitle,
      description: page.metaDescription,
      path: `/${SLUG}`,
    })
  : {}

export default function Page() {
  if (!page) notFound()
  return <LocationPageTemplate page={page} />
}
