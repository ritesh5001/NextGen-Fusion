import { officeHoursAt } from "@/data/offices"
import { siteUrl } from "@/lib/seo"
import type { CityRegion } from "@/data/city-pages/types"
import type { OmCity } from "./types"
import { omHub } from "./hub"
import { barka } from "./barka"
import { buraimi } from "./buraimi"
import { duqm } from "./duqm"
import { ibri } from "./ibri"
import { muscat } from "./muscat"
import { nizwa } from "./nizwa"
import { salalah } from "./salalah"
import { seeb } from "./seeb"
import { sohar } from "./sohar"
import { sur } from "./sur"

export type { OmCity } from "./types"

// Oman (UTC+4) is 90 minutes behind India and has no daylight saving.
const OMAN_FROM_INDIA = -90

export const oman: CityRegion<OmCity> = {
  name: "Oman",
  path: "/oman",
  countryCode: "OM",
  // Ordered by size of market: the hub lists them in this order.
  cities: [muscat, seeb, salalah, sohar, nizwa, sur, barka, ibri, buraimi, duqm],
  hub: omHub,
  hours: () => `${officeHoursAt(OMAN_FROM_INDIA)} Oman time, Monday to Saturday`,
  presence: () => "Served remotely from Lucknow and Mumbai, India",
  // Served remotely: the provider stays the Indian office, which is true.
  providerId: () => `${siteUrl}/#office-lucknow`,
}
