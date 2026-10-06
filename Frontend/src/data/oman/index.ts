import { officeHoursAt } from "@/data/offices"
import { ORGANIZATION_ID } from "@/lib/seo"
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
  updated: "2026-10-06",
  countryCode: "OM",
  // Ordered by size of market: the hub lists them in this order.
  cities: [muscat, seeb, salalah, sohar, nizwa, sur, barka, ibri, buraimi, duqm],
  hub: omHub,
  cityTitle: (city) => `Web Design & Development in ${city.name}, Oman`,
  // Same rule as Australia: no Omani office, so 150 parallel city × service
  // pages from a remote agency read as doorway pages. They stay live for
  // visitors and pass links (noindex, follow). Indexed are only the Muscat
  // services where Google autocomplete for Oman showed real searches
  // (Oct 2026: "website development/designing company in muscat", "digital
  // marketing agency in muscat", "mobile app development company in muscat",
  // "seo company in oman", "software company in oman", "ecommerce website oman").
  // Promote others ("salalah/website-development") once they earn impressions.
  indexServicePages: [
    "muscat/website-development",
    "muscat/web-design",
    "muscat/ecommerce-development",
    "muscat/android-app-development",
    "muscat/seo",
    "muscat/social-media-marketing",
    "muscat/software-development",
  ],
  hours: () => `${officeHoursAt(OMAN_FROM_INDIA)} Oman time, Monday to Saturday`,
  presence: () => "Served remotely from Lucknow and Mumbai, India",
  // Served remotely: the organisation is the provider, with no local office claimed.
  providerId: () => ORGANIZATION_ID,
}
