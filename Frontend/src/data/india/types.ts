/**
 * Indian city pages: /india/, /india/<city>/ and /india/<city>/<service>/.
 * Shared shapes live in data/city-pages.
 *
 * We have offices in Lucknow and Mumbai only. Those two cities carry `office`
 * and are marked in schema with the office as provider; every other city is
 * served from those offices and says so, with no local address claimed.
 *
 * Lucknow and Mumbai already have older pages for some services
 * (/seo-services-in-lucknow/ and the like). Those services are entered as
 * `{ existingPath }`, so the grid links to the older page and no competing
 * page is generated.
 */
import type { CityPage } from "@/data/city-pages/types"

export type InCity = CityPage & {
  /** Set only where we actually have an office in the city. */
  office?: "Lucknow" | "Mumbai"
}
