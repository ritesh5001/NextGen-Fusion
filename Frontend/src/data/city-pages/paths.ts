import type { CityServiceSlug } from "./services"
import { isExistingPage, type CityPage, type CityRegion } from "./types"

export function cityPath(region: CityRegion, city: CityPage): string {
  return `${region.path}/${city.slug}/`
}

/** The generated URL for a city × service; ignores older pages. */
export function cityServicePath(region: CityRegion, city: CityPage, service: CityServiceSlug): string {
  return `${region.path}/${city.slug}/${service}/`
}

/** Where a link to this city × service should point: the older page if one exists. */
export function cityServiceHref(region: CityRegion, city: CityPage, service: CityServiceSlug): string {
  const page = city.services[service]
  return isExistingPage(page) ? page.existingPath : cityServicePath(region, city, service)
}

export function findCity<C extends CityPage>(region: CityRegion<C>, slug: string): C | undefined {
  return region.cities.find((city) => city.slug === slug)
}

/** City × service pairs this region generates pages for (older pages excluded). */
export function generatedServicePairs(region: CityRegion): { city: CityPage; service: CityServiceSlug }[] {
  return region.cities.flatMap((city) =>
    (Object.keys(city.services) as CityServiceSlug[])
      .filter((service) => !isExistingPage(city.services[service]))
      .map((service) => ({ city, service })),
  )
}

/** Whether a generated city × service page is indexable (see CityRegion.indexServicePages). */
export function isServicePageIndexed(region: CityRegion, city: CityPage, service: CityServiceSlug): boolean {
  return region.indexServicePages === "all" || region.indexServicePages.includes(`${city.slug}/${service}`)
}

/** The sitemap date for a city and its pages. */
export function cityUpdated(region: CityRegion, city: CityPage): string {
  return city.updated ?? region.updated
}
