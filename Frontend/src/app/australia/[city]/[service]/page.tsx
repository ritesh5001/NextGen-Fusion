import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { AuServicePageView } from "@/components/australia/service-page"
import { auCities, auServicePath, auServiceSlugs, getAuCity, getAuService } from "@/data/australia"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ city: string; service: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return auCities.flatMap((city) => auServiceSlugs.map((service) => ({ city: city.slug, service })))
}

async function resolve(params: PageProps["params"]) {
  const { city: citySlug, service: serviceSlug } = await params
  const city = getAuCity(citySlug)
  const service = getAuService(serviceSlug)
  return city && service ? { city, service } : null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = await resolve(params)
  if (!found) return {}
  const page = found.city.services[found.service.slug]
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: auServicePath(found.city, found.service.slug),
  })
}

export default async function Page({ params }: PageProps) {
  const found = await resolve(params)
  if (!found) notFound()
  return <AuServicePageView city={found.city} service={found.service} />
}
