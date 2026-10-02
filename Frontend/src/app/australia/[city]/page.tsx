import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AuCityPage } from "@/components/australia/city-page"
import { auCities, auCityPath, getAuCity } from "@/data/australia"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ city: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return auCities.map((city) => ({ city: city.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const city = getAuCity((await params).city)
  if (!city) return {}
  return buildMetadata({
    title: city.page.metaTitle,
    description: city.page.metaDescription,
    path: auCityPath(city),
  })
}

export default async function Page({ params }: PageProps) {
  const city = getAuCity((await params).city)
  if (!city) notFound()
  return <AuCityPage city={city} />
}
