import { OFFICE_HOURS, officeHoursAt } from "@/data/offices"
import type { AuCity } from "./types"
import type { AuServiceSlug } from "./services"
import { sydney } from "./sydney"

export * from "./types"
export * from "./services"

export const auCities: AuCity[] = [sydney]

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
