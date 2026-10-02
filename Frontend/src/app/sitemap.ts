import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { staticProjects } from "@/lib/static-projects"
import { apiService, BLOG_POSTS_TAG } from "@/lib/api"
import { getStoreProducts, isStoreProductIndexable } from "@/lib/store"
import { serviceSlugs } from "@/data/services-nav"
import { locationPages } from "@/data/locations"
import { activeCategorySlugs, isCategoryIndexable } from "@/lib/blog"
import { team } from "@/data/team"
import { guidePages } from "@/data/guides"
import { australia } from "@/data/australia"
import { india } from "@/data/india"
import {
  cityPath,
  cityServicePath,
  cityUpdated,
  generatedServicePairs,
  isServicePageIndexed,
} from "@/data/city-pages/paths"
import type { CityRegion } from "@/data/city-pages/types"

// Revalidate hourly so newly published blog posts, store products and
// portfolio entries show up without a redeploy.
export const revalidate = 3600

const REMOTE_TIMEOUT_MS = 5000


/**
 * Real edit dates for hand-authored routes.
 *
 * These were previously `new Date()`, which meant every URL claimed it had just
 * changed on every hourly regeneration. Google explicitly discourages that: a
 * sitemap where everything is always fresh carries no information, so lastmod
 * stops being trusted for the whole domain.
 *
 * Update the date here when you meaningfully edit a page. Dynamic sections
 * below derive their dates from real content timestamps instead.
 */
const STATIC_LAST_MODIFIED: Record<string, string> = {
  "/": "2026-09-16",
  "/about": "2026-09-06",
  "/contact": "2026-09-06",
  "/services": "2026-08-14",
  "/work": "2026-08-14",
  "/blog": "2026-08-27",
  "/team": "2026-08-14",
  "/careers": "2026-08-27",
  "/store": "2026-08-14",
  "/support": "2026-08-14",
  "/store/license": "2026-08-14",
  "/store/refunds": "2026-08-14",
}

const SERVICES_LAST_MODIFIED = "2026-09-16"
const LOCATIONS_LAST_MODIFIED = "2026-09-16"
const INTERNATIONAL_LAST_MODIFIED = "2026-09-29"
// Case studies are edited on their own cadence; they were inheriting the
// services date and claiming an edit they had not had.
const WORK_LAST_MODIFIED = "2026-08-14"
const TEAM_LAST_MODIFIED = "2026-08-14"

type Entry = MetadataRoute.Sitemap[number]

// changeFrequency and priority are deliberately omitted: Google has ignored
// both for years, and they only added noise to every entry.
const entry = (path: string, lastModified: Date | string): Entry => ({
  url: absoluteUrl(path),
  lastModified,
})

// Each city carries its own date (see CityPage.updated), so editing one city's
// file moves only that city's URLs. Noindexed city × service pages are left
// out: a sitemap listing pages that ask not to be indexed is a mixed signal.
function regionEntries(region: CityRegion): Entry[] {
  return [
    entry(region.path, region.updated),
    ...region.cities.map((city) => entry(cityPath(region, city), cityUpdated(region, city))),
    ...generatedServicePairs(region)
      .filter(({ city, service }) => isServicePageIndexed(region, city, service))
      .map(({ city, service }) => entry(cityServicePath(region, city, service), cityUpdated(region, city))),
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    ...Object.entries(STATIC_LAST_MODIFIED).map(([path, date]) => entry(path, date)),
    // Guide-built service pages are in serviceSlugs too; skip them there so
    // they carry their own edit date rather than the shared services date.
    ...serviceSlugs
      .filter((slug) => !guidePages.some((page) => page.path === `/services/${slug}`))
      .map((slug) => entry(`/services/${slug}`, SERVICES_LAST_MODIFIED)),
    ...guidePages.map((page) => entry(page.path, page.updated)),
    // City landing pages — the query shape every page-one competitor ranks with.
    // Pages for cities abroad (UAE, Singapore) carry their own, later date.
    ...locationPages.map((page) =>
      entry(`/${page.slug}`, page.areaCountry ? INTERNATIONAL_LAST_MODIFIED : LOCATIONS_LAST_MODIFIED),
    ),
    // City pages by region: hub, one page per city and one per generated
    // city × service (city × service pairs owned by older pages are skipped).
    ...regionEntries(australia),
    ...regionEntries(india),
    ...staticProjects.map((p) => entry(`/work/${p.slug}`, WORK_LAST_MODIFIED)),
    // Team profiles were absent from the sitemap entirely while also declaring
    // /team/ as their canonical — between the two, four pages of real
    // expertise signal were invisible to search and to AI crawlers.
    ...team.map((member) => entry(`/team/${member.slug}`, TEAM_LAST_MODIFIED)),
  ]

  // Remote content is best-effort: a Backend hiccup must not fail the build or
  // serve an empty sitemap, so each source degrades to "skip this section".
  // Both fetches are cached (the blog one was no-store, which made the whole
  // sitemap dynamic: every Googlebot hit waited on the Backend, and a slow one
  // timed the function out with a 500) and give up after REMOTE_TIMEOUT_MS.
  const [blogPosts, storeEntries] = await Promise.all([
    apiService
      .getActiveBlogPosts({ revalidate, tags: [BLOG_POSTS_TAG], timeoutMs: REMOTE_TIMEOUT_MS })
      .catch(() => [] as Awaited<ReturnType<typeof apiService.getActiveBlogPosts>>),
    // 47 product pages that render server-side with full metadata and were
    // absent from the sitemap entirely — the highest commercial-intent URLs
    // on the site had no path in.
    getStoreProducts({ timeoutMs: REMOTE_TIMEOUT_MS })
      .then((products) =>
        products
          // Only products that pass the content gate — the rest are noindexed at
          // the page level and have no business in the sitemap either.
          .filter((product) => product.slug && isStoreProductIndexable(product))
          .map((product) => entry(`/store/${product.slug}`, product.created_at || new Date())),
      )
      .catch(() => [] as MetadataRoute.Sitemap),
  ])

  const blogEntries = blogPosts.map((post) =>
    entry(`/blog/${post.slug}`, post.updated_at || post.published_at || new Date()),
  )
  // Category archives — same freshness signal as /blog itself, since they're
  // just a filtered view of the same posts.
  // Only archives with an introduction and enough posts; the rest are noindexed.
  const blogCategoryEntries = activeCategorySlugs(blogPosts)
    .filter((slug) => isCategoryIndexable(blogPosts, slug))
    .map((slug) => entry(`/blog/category/${slug}`, STATIC_LAST_MODIFIED["/blog"]))

  return [...staticEntries, ...blogEntries, ...blogCategoryEntries, ...storeEntries]
}
