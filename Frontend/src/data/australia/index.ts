import { OFFICE_HOURS, officeHoursAt } from "@/data/offices"
import type { AuCity } from "./types"
import type { AuServiceSlug } from "./services"
import { adelaide } from "./adelaide"
import { brisbane } from "./brisbane"
import { canberra } from "./canberra"
import { darwin } from "./darwin"
import { goldCoast } from "./gold-coast"
import { hobart } from "./hobart"
import { melbourne } from "./melbourne"
import { newcastle } from "./newcastle"
import { perth } from "./perth"
import { sunshineCoast } from "./sunshine-coast"
import { sydney } from "./sydney"
import { wollongong } from "./wollongong"

export * from "./types"
export * from "./services"

// Ordered by size: the hub lists them in this order.
export const auCities: AuCity[] = [
  sydney,
  melbourne,
  brisbane,
  perth,
  adelaide,
  goldCoast,
  canberra,
  newcastle,
  sunshineCoast,
  wollongong,
  hobart,
  darwin,
]

/** Regional cities named on the hub page rather than given pages of their own. */
export const auRegionalCentres: { state: string; places: string[] }[] = [
  { state: "New South Wales", places: ["Central Coast", "Albury", "Wagga Wagga", "Coffs Harbour", "Port Macquarie", "Orange", "Dubbo"] },
  { state: "Victoria", places: ["Geelong", "Ballarat", "Bendigo", "Shepparton", "Mildura"] },
  { state: "Queensland", places: ["Townsville", "Cairns", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg"] },
  { state: "Western Australia", places: ["Bunbury", "Geraldton", "Kalgoorlie", "Karratha", "Port Hedland"] },
  { state: "South Australia", places: ["Mount Gambier", "Whyalla", "Port Lincoln"] },
  { state: "Tasmania", places: ["Launceston", "Devonport", "Burnie"] },
  { state: "Northern Territory", places: ["Alice Springs", "Katherine"] },
]

export const AUSTRALIA_PATH = "/australia"

export function getAuCity(slug: string): AuCity | undefined {
  return auCities.find((city) => city.slug === slug)
}

export function auCityPath(city: AuCity): string {
  return `${AUSTRALIA_PATH}/${city.slug}/`
}

export function auServicePath(city: AuCity, service: AuServiceSlug): string {
  return `${AUSTRALIA_PATH}/${city.slug}/${service}/`
}

/** Our working day in the city's local time, both offsets where daylight saving applies. */
export function auWorkingHours(city: AuCity): string {
  const { std, dst } = city.zone
  const standard = `${officeHoursAt(std.offset)} ${std.label}`
  return dst ? `${standard}, or ${officeHoursAt(dst.offset)} ${dst.label} in daylight saving` : standard
}

export const AU_WORKING_DAYS = `${OFFICE_HOURS.days[0]} to ${OFFICE_HOURS.days[OFFICE_HOURS.days.length - 1]}`
