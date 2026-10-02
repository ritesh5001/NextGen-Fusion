import { officeHoursAt } from "@/data/offices"
import { ORGANIZATION_ID } from "@/lib/seo"
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
  updated: "2026-10-02",
  countryCode: "AU",
  // Ordered by size: the hub lists them in this order.
  cities: [sydney, melbourne, brisbane, perth, adelaide, goldCoast, canberra, newcastle, sunshineCoast, wollongong, hobart, darwin],
  hub: auHub,
  cityTitle: (city) => `Web Design & Development in ${city.name}`,
  // No Australian office, so one indexable page per city. The 180 city ×
  // service pages stay live for visitors and pass links, but are noindexed
  // and out of the sitemap: from a small agency with no local address, that
  // many near-parallel pages is what Google classes as doorway pages. Promote
  // individual pages here ("sydney/seo") once they earn impressions.
  indexServicePages: [],
  hours: workingHours,
  presence: () => "Served remotely from Lucknow and Mumbai, India",
  // Served remotely: the organisation is the provider, with no local office
  // claimed and no office node repeated on 193 Australian pages.
  providerId: () => ORGANIZATION_ID,
}
