/**
 * Australian city pages: /australia/, /australia/<city>/ and
 * /australia/<city>/<service>/. Shared shapes live in data/city-pages.
 *
 * There is no Australian office. Pages say so and the schema marks them as
 * served remotely from the Lucknow office, with no Australian address. Client
 * names are left off at the owner's request; proof is limited to case studies
 * already published on /work/.
 */
import type { CityPage, CityServicePage } from "@/data/city-pages/types"
import type { CityServiceSlug } from "@/data/city-pages/services"

export type AuZone = { label: string; offset: number }

export type AuCity = Omit<CityPage, "stateCode" | "services"> & {
  stateCode: "NSW" | "VIC" | "QLD" | "WA" | "SA" | "TAS" | "ACT" | "NT"
  /** Time zone as minutes ahead of India; `dst` only where it is observed. */
  zone: { std: AuZone; dst?: AuZone }
  /** No older Australian pages exist, so every service is a page of its own. */
  services: Record<CityServiceSlug, CityServicePage>
}
