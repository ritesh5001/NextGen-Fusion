/**
 * City landing pages by region: /<region>/, /<region>/<city>/ and
 * /<region>/<city>/<service>/. Australia and India share these types and the
 * components in components/city-pages; each region supplies its own copy.
 *
 * Every page's copy is written for that page alone: there is no shared
 * paragraph filled in with a city name. A city has to supply all fifteen
 * services (the Record type enforces it), either as a page of its own or as a
 * pointer to an older page that already targets that city and service.
 */
import type { Office } from "@/data/offices"
import type { CityServiceSlug } from "./services"

export type CityFaq = { question: string; answer: string }

export type CityLink = { label: string; href: string }

export type CitySection = {
  heading: string
  body: string[]
  /** Rendered as a row of links under the paragraphs. */
  links?: CityLink[]
}

export type CityProblem = {
  /** In the customer's words: what they would say is wrong. */
  symptom: string
  cause: string
  /** What we would do first, in order. */
  steps: string[]
}

export type CityIndustry = { name: string; need: string }

export type CityServicePage = {
  metaTitle: string
  metaDescription: string
  h1: string
  /** One line on the city page's list of services. */
  card: string
  intro: string[]
  sections: CitySection[]
  problems: CityProblem[]
  checklist: string[]
  faqs: CityFaq[]
  /** Slugs of published case studies under /work/. */
  caseStudies?: string[]
}

/**
 * A city × service that an older page already targets (e.g.
 * /seo-services-in-lucknow/). The grid links there and no second page is
 * generated, so the two never compete for the same search.
 */
export type CityExistingPage = { existingPath: string; card: string }

export type CityPage = {
  slug: string
  /**
   * Last real content change to this city's pages (YYYY-MM-DD), for the
   * sitemap. Bump it only when this file's copy changes; falls back to the
   * region's date. A sitemap where every page shares one date stops being
   * trusted for the whole domain.
   */
  updated?: string
  name: string
  state: string
  stateCode: string
  /** One line for the region hub's city list. */
  summary: string
  areas: string[]
  nearby: string[]
  page: {
    metaTitle: string
    metaDescription: string
    h1: string
    intro: string[]
    sections: CitySection[]
    industries: CityIndustry[]
    problems: (CityProblem & { service: CityServiceSlug })[]
    faqs: CityFaq[]
  }
  services: Record<CityServiceSlug, CityServicePage | CityExistingPage>
}

export function isExistingPage(page: CityServicePage | CityExistingPage): page is CityExistingPage {
  return "existingPath" in page
}

export type CityHub = {
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  /** Shown in the hero where a single city's presence and hours would go. */
  heroPresence: string
  heroHours: string
  sections: CitySection[]
  essentialsHeading: string
  essentials: { heading: string; body: string }[]
  regionalHeading: string
  regionalIntro: string
  regionalCentres: { state: string; places: string[] }[]
  problems: (CityProblem & { serviceSlug: string; serviceLabel: string })[]
  faqs: CityFaq[]
}

/**
 * Everything the shared components need to know about a region. The callbacks
 * are declared as methods (bivariant) so a CityRegion<AuCity> can be passed
 * where a CityRegion is expected; each region only ever receives its own cities.
 */
export type CityRegion<C extends CityPage = CityPage> = {
  name: string
  /** e.g. "/australia" — no trailing slash. */
  path: string
  /** Last real content change to the hub, and the default for its cities. */
  updated: string
  /**
   * The <title> for a city page: the search phrase first, no tagline (the
   * longer `metaTitle` in the data becomes the social-share title).
   */
  cityTitle(city: C): string
  /**
   * Which generated city × service pages may be indexed: "all", or a list of
   * "<city>/<service>" keys. The rest stay live for visitors and pass links
   * (noindex, follow) but are left out of the sitemap, so a region we serve
   * remotely is not read as hundreds of doorway pages. Add a key once Search
   * Console shows that page earning impressions or links.
   */
  indexServicePages: "all" | readonly string[]
  countryCode: string
  cities: C[]
  hub: CityHub
  /** Our working hours, as the visitor in this city would read them. */
  hours(city: C): string
  /** Hero line saying where the work is done from. */
  presence(city: C): string
  /** schema.org @id of the provider node for this city. */
  providerId(city: C): string
  /** Our office in this city, if we have one; its schema node goes on the city's pages. */
  localOffice?(city: C): Office | undefined
  /** Street address to put on the areaServed node, only where we have an office. */
  localAddress?(city: C): { locality: string; region: string; postalCode?: string } | undefined
}
