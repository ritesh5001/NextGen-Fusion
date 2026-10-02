import { OFFICE_HOURS, offices } from "@/data/offices"
import { ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import type { CityRegion } from "@/data/city-pages/types"
import type { InCity } from "./types"
import { inHub } from "./hub"
import { ahmedabad } from "./ahmedabad"
import { bengaluru } from "./bengaluru"
import { chandigarh } from "./chandigarh"
import { chennai } from "./chennai"
import { coimbatore } from "./coimbatore"
import { delhi } from "./delhi"
import { gurugram } from "./gurugram"
import { hyderabad } from "./hyderabad"
import { indore } from "./indore"
import { jaipur } from "./jaipur"
import { kanpur } from "./kanpur"
import { kochi } from "./kochi"
import { kolkata } from "./kolkata"
import { lucknow } from "./lucknow"
import { mumbai } from "./mumbai"
import { nagpur } from "./nagpur"
import { noida } from "./noida"
import { pune } from "./pune"
import { surat } from "./surat"
import { varanasi } from "./varanasi"

export type { InCity } from "./types"

function officeOf(city: InCity) {
  return city.office ? offices.find((office) => office.city === city.office) : undefined
}

export const india: CityRegion<InCity> = {
  name: "India",
  path: "/india",
  updated: "2026-10-02",
  countryCode: "IN",
  // Ordered by size of market: the hub lists them in this order.
  cities: [delhi, mumbai, bengaluru, hyderabad, chennai, kolkata, pune, ahmedabad, jaipur, lucknow, surat, chandigarh, noida, gurugram, indore, kochi, coimbatore, nagpur, kanpur, varanasi],
  hub: inHub,
  // Lucknow and Mumbai already have a /website-development-company-in-<city>/
  // page; the office cities' hubs take the "all services" phrase instead so the
  // two never compete for the same search.
  cityTitle: (city) =>
    city.office ? `Digital Agency in ${city.name}: Web, SEO & Apps` : `Website Development Company in ${city.name}`,
  indexServicePages: "all",
  hours: () => OFFICE_HOURS.label,
  presence: (city) => {
    const office = officeOf(city)
    return office
      ? `Our office: ${office.address}`
      : `Working with ${city.name} businesses from our Lucknow and Mumbai offices`
  },
  // The office node where we have one; otherwise the organisation, with no
  // local address claimed.
  providerId: (city) => (city.office ? `${siteUrl}/#office-${city.office.toLowerCase()}` : ORGANIZATION_ID),
  localOffice: officeOf,
  localAddress: (city) => {
    const office = officeOf(city)
    return office
      ? { locality: office.postal.locality, region: office.postal.region, postalCode: office.postal.postalCode }
      : undefined
  },
}
