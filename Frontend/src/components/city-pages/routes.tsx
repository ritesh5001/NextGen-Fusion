/**
 * Route handlers shared by every region (/australia, /india). Each region's
 * route files re-export these, bound to its own data. `dynamicParams = false`
 * stays as a literal in each route file because Next.js reads it statically.
 */
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { buildMetadata } from "@/lib/seo"
import { getCityService } from "@/data/city-pages/services"
import {
  cityPath,
  cityServicePath,
  findCity,
  generatedServicePairs,
  isServicePageIndexed,
} from "@/data/city-pages/paths"
import { isExistingPage, type CityPage, type CityRegion } from "@/data/city-pages/types"
import { CityHubPage } from "./hub-page"
import { CityPageView } from "./city-page"
import { CityServicePageView } from "./service-page"

type CityParams = { params: Promise<{ city: string }> }
type ServiceParams = { params: Promise<{ city: string; service: string }> }

export function hubRoute<C extends CityPage>(region: CityRegion<C>) {
  return {
    metadata: buildMetadata({
      title: region.hub.metaTitle,
      description: region.hub.metaDescription,
      path: region.path,
      ogEyebrow: region.name,
    }) satisfies Metadata,
    Page: function Page() {
      return <CityHubPage region={region} />
    },
  }
}

export function cityRoute<C extends CityPage>(region: CityRegion<C>) {
  return {
    generateStaticParams: () => region.cities.map((city) => ({ city: city.slug })),
    generateMetadata: async ({ params }: CityParams): Promise<Metadata> => {
      const city = findCity(region, (await params).city)
      if (!city) return {}
      return buildMetadata({
        title: region.cityTitle(city),
        ogTitle: city.page.metaTitle,
        description: city.page.metaDescription,
        path: cityPath(region, city),
        ogEyebrow: `${city.name}, ${city.state}`,
      })
    },
    Page: async function Page({ params }: CityParams) {
      const city = findCity(region, (await params).city)
      if (!city) notFound()
      return <CityPageView region={region} city={city} />
    },
  }
}

export function serviceRoute<C extends CityPage>(region: CityRegion<C>) {
  async function resolve(params: ServiceParams["params"]) {
    const { city: citySlug, service: serviceSlug } = await params
    const city = findCity(region, citySlug)
    const service = getCityService(serviceSlug)
    if (!city || !service) return null
    const page = city.services[service.slug]
    // An older page owns this city × service; there is no generated one.
    if (isExistingPage(page)) return null
    return { city, service, page }
  }

  return {
    generateStaticParams: () =>
      generatedServicePairs(region).map(({ city, service }) => ({ city: city.slug, service })),
    generateMetadata: async ({ params }: ServiceParams): Promise<Metadata> => {
      const found = await resolve(params)
      if (!found) return {}
      const { city, service, page } = found
      return buildMetadata({
        // Keyword and city first; the longer data title, tagline included, is
        // kept for social shares where there is room for it.
        title: `${service.label} in ${city.name}`,
        ogTitle: page.metaTitle,
        description: page.metaDescription,
        path: cityServicePath(region, city, service.slug),
        ogEyebrow: `${service.label} · ${city.name}`,
        noIndex: !isServicePageIndexed(region, city, service.slug),
      })
    },
    Page: async function Page({ params }: ServiceParams) {
      const found = await resolve(params)
      if (!found) notFound()
      return <CityServicePageView region={region} {...found} />
    },
  }
}
