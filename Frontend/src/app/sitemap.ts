import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { staticProjects } from "@/lib/static-projects"
import { apiService } from "@/lib/api"
import { getStoreProducts, isStoreProductIndexable } from "@/lib/store"
import { serviceSlugs } from "@/data/services-nav"
import { locationSlugs } from "@/data/locations"

// Revalidate hourly so newly published blog posts, store products and
// portfolio entries show up without a redeploy.
export const revalidate = 3600


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
  "/": "2026-08-14",
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

const SERVICES_LAST_MODIFIED = "2026-08-14"
const LOCATIONS_LAST_MODIFIED = "2026-09-06"

type Entry = MetadataRoute.Sitemap[number]

// changeFrequency and priority are deliberately omitted: Google has ignored
// both for years, and they only added noise to every entry.
const entry = (path: string, lastModified: Date | string): Entry => ({
  url: absoluteUrl(path),
  lastModified,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    ...Object.entries(STATIC_LAST_MODIFIED).map(([path, date]) => entry(path, date)),
    ...serviceSlugs.map((slug) => entry(`/services/${slug}`, SERVICES_LAST_MODIFIED)),
    // City landing pages — the query shape every page-one competitor ranks with.
    ...locationSlugs.map((slug) => entry(`/${slug}`, LOCATIONS_LAST_MODIFIED)),
    ...staticProjects.map((p) => entry(`/work/${p.slug}`, SERVICES_LAST_MODIFIED)),
  ]

  // Remote content is best-effort: a Backend hiccup must not fail the build or
  // serve an empty sitemap, so each source degrades to "skip this section".
  const [blogEntries, storeEntries] = await Promise.all([
    apiService
      .getActiveBlogPosts()
      .then((posts) =>
        posts.map((post) =>
          entry(`/blog/${post.slug}`, post.updated_at || post.published_at || new Date()),
        ),
      )
      .catch(() => [] as MetadataRoute.Sitemap),
    // 47 product pages that render server-side with full metadata and were
    // absent from the sitemap entirely — the highest commercial-intent URLs
    // on the site had no path in.
    getStoreProducts()
      .then((products) =>
        products
          // Only products that pass the content gate — the rest are noindexed at
          // the page level and have no business in the sitemap either.
          .filter((product) => product.slug && isStoreProductIndexable(product))
          .map((product) => entry(`/store/${product.slug}`, product.created_at || new Date())),
      )
      .catch(() => [] as MetadataRoute.Sitemap),
  ])

  return [...staticEntries, ...blogEntries, ...storeEntries]
}
