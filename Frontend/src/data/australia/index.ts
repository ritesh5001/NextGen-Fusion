import { officeHoursAt } from "@/data/offices"
import { siteUrl } from "@/lib/seo"
import type { CityRegion } from "@/data/city-pages/types"
import type { AuCity } from "./types"
import { auHub } from "./hub"
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

export type { AuCity } from "./types"

/** Our working day in the city's local time, both offsets where daylight saving applies. */
function workingHours(city: AuCity): string {
  const { std, dst } = city.zone
  const standard = `${officeHoursAt(std.offset)} ${std.label}`
  return dst ? `${standard}, or ${officeHoursAt(dst.offset)} ${dst.label} in daylight saving` : standard
}

export const australia: CityRegion<AuCity> = {
  name: "Australia",
  path: "/australia",
  countryCode: "AU",
  // Ordered by size: the hub lists them in this order.
  cities: [sydney, melbourne, brisbane, perth, adelaide, goldCoast, canberra, newcastle, sunshineCoast, wollongong, hobart, darwin],
  hub: auHub,
  hours: workingHours,
  presence: () => "Served remotely from Lucknow and Mumbai, India",
  // Served remotely: the provider stays the Indian office, which is true.
  providerId: () => `${siteUrl}/#office-lucknow`,
}
