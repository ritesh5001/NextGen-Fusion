import { getProjectBySlug } from "@/lib/static-projects"
import type { CityServiceSlug } from "./services"
import { isExistingPage, type CityPage, type CityRegion, type CityServicePage } from "./types"

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

/**
 * Words of copy written for this page alone (hero, sections, problems,
 * checklist, FAQs); the shared template around it is not counted.
 */
export function servicePageWords(page: CityServicePage): number {
  return [
    page.h1,
    ...page.intro,
    ...page.sections.flatMap((section) => [section.heading, ...section.body]),
    ...page.problems.flatMap((problem) => [problem.symptom, problem.cause, ...problem.steps]),
    ...page.checklist,
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length
}

export const DESTINATION_MIN_WORDS = 250

/**
 * A page that stands on its own: enough copy of its own and a published case
 * study as proof. Google's doorway test is whether a page is a destination or
 * only a way into the site; a thin "<service> in <city>" page with nothing to
 * show is the second kind, however unique its wording.
 */
export function isDestinationPage(page: CityServicePage): boolean {
  const hasProof = (page.caseStudies ?? []).some((slug) => getProjectBySlug(slug) !== undefined)
  return hasProof && servicePageWords(page) >= DESTINATION_MIN_WORDS
}

/**
 * Whether a generated city × service page is indexable. Same rule in every
 * region: where we have an office, where the region lists it for proven
 * demand (see CityRegion.indexServicePages), or where the page is a
 * destination. The rest stay live for visitors (noindex, follow) until their
 * copy grows or a case study fits.
 */
export function isServicePageIndexed(region: CityRegion, city: CityPage, service: CityServiceSlug): boolean {
  const page = city.services[service]
  if (isExistingPage(page)) return false
  if (region.indexServicePages === "all" || region.indexServicePages.includes(`${city.slug}/${service}`)) return true
  if (region.localOffice?.(city)) return true
  return isDestinationPage(page)
}

/** The sitemap date for a city and its pages. */
export function cityUpdated(region: CityRegion, city: CityPage): string {
  return city.updated ?? region.updated
}
