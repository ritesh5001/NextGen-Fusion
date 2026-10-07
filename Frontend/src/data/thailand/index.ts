import { officeHoursAt } from "@/data/offices"
import { ORGANIZATION_ID } from "@/lib/seo"
import type { CityRegion } from "@/data/city-pages/types"
import type { ThCity } from "./types"
import { thHub } from "./hub"
import { bangkok } from "./bangkok"
import { chiangMai } from "./chiang-mai"
import { hatYai } from "./hat-yai"
import { huaHin } from "./hua-hin"
import { khonKaen } from "./khon-kaen"
import { kohSamui } from "./koh-samui"
import { krabi } from "./krabi"
import { pattaya } from "./pattaya"
import { phuket } from "./phuket"
import { udonThani } from "./udon-thani"

export type { ThCity } from "./types"

// Thailand (UTC+7) is 90 minutes ahead of India and has no daylight saving.
const THAILAND_FROM_INDIA = 90

export const thailand: CityRegion<ThCity> = {
  name: "Thailand",
  path: "/thailand",
  updated: "2026-10-07",
  countryCode: "TH",
  // Ordered by size of market: the hub lists them in this order.
  cities: [bangkok, phuket, chiangMai, pattaya, huaHin, kohSamui, krabi, khonKaen, hatYai, udonThani],
  hub: thHub,
  cityTitle: (city) => `Web Design & Development in ${city.name}, Thailand`,
  // Same rule as Australia and Oman: no Thai office, so 150 parallel city ×
  // service pages from a remote agency read as doorway pages. They stay live
  // for visitors and pass links (noindex, follow). Indexed are the pages where
  // Google autocomplete for Thailand showed real searches (Oct 2026): "web
  // design company bangkok", "web development bangkok", "seo agency bangkok",
  // "social media agency bangkok", "google ads agency bangkok", "software house
  // bangkok", "shopify agency thailand", "ecommerce website thailand", and
  // "web design" in Phuket, Chiang Mai, Pattaya and Hua Hin.
  indexServicePages: [
    "bangkok/website-development",
    "bangkok/web-design",
    "bangkok/ecommerce-development",
    "bangkok/shopify-development",
    "bangkok/seo",
    "bangkok/google-ads",
    "bangkok/social-media-marketing",
    "bangkok/software-development",
    "phuket/web-design",
    "chiang-mai/web-design",
    "pattaya/web-design",
    "hua-hin/web-design",
  ],
  hours: () => `${officeHoursAt(THAILAND_FROM_INDIA)} Thailand time, Monday to Saturday`,
  presence: () => "Served remotely from Lucknow and Mumbai, India",
  // Served remotely: the organisation is the provider, with no local office claimed.
  providerId: () => ORGANIZATION_ID,
}
