/**
 * Thai city pages: /thailand/, /thailand/<city>/ and /thailand/<city>/<service>/.
 * Shared shapes live in data/city-pages.
 *
 * There is no Thai office. Pages say so and the schema names the organisation as the
 * provider, with no Thai address. Proof is limited to
 * case studies already published on /work/.
 *
 * `stateCode` holds the province's short English name rather than its ISO
 * code: it is printed beside the city on the hub ("Pattaya, Chonburi")
 * and used as addressRegion, where a readable name is what search engines match.
 */
import type { CityPage, CityServicePage } from "@/data/city-pages/types"
import type { CityServiceSlug } from "@/data/city-pages/services"

export type ThCity = Omit<CityPage, "services"> & {
  /** No older Thai pages exist, so every service is a page of its own. */
  services: Record<CityServiceSlug, CityServicePage>
}
