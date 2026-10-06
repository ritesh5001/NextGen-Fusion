/**
 * Omani city pages: /oman/, /oman/<city>/ and /oman/<city>/<service>/.
 * Shared shapes live in data/city-pages.
 *
 * There is no Omani office. Pages say so and the schema marks them as served
 * remotely from the Lucknow office, with no Omani address. Proof is limited to
 * case studies already published on /work/.
 *
 * `stateCode` holds the governorate's short English name rather than its ISO
 * code: it is printed beside the city on the hub ("Sohar, North Al Batinah")
 * and used as addressRegion, where a readable name is what search engines match.
 */
import type { CityPage, CityServicePage } from "@/data/city-pages/types"
import type { CityServiceSlug } from "@/data/city-pages/services"

export type OmCity = Omit<CityPage, "services"> & {
  /** No older Omani pages exist, so every service is a page of its own. */
  services: Record<CityServiceSlug, CityServicePage>
}
