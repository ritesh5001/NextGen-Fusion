import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { staticProjects } from "@/lib/static-projects"
import { apiService } from "@/lib/api"

// Revalidate hourly so newly published blog posts and portfolio entries show up
// without a redeploy.
export const revalidate = 3600

const SERVICE_SLUGS = [
  "website-development-services",
  "ecommerce-web-development-services",
  "web-design-services",
  "android-app-development-services",
  "seo-services",
  "ppc-services",
  "social-media-marketing-services",
  "ai-automation-development-services",
  "software-development-services",
  "api-integration-services",
  "cloud-solutions",
  "website-maintenance-services",
]

type Entry = MetadataRoute.Sitemap[number]

const entry = (
  path: string,
  changeFrequency: Entry["changeFrequency"],
  priority: number,
  lastModified: Date | string = new Date(),
): Entry => ({
  url: absoluteUrl(path),
  lastModified,
  changeFrequency,
  priority,
})

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    entry("/", "weekly", 1.0),
    entry("/services", "monthly", 0.9),
    entry("/work", "weekly", 0.9),
    entry("/portofolio", "weekly", 0.8),
    entry("/blog", "weekly", 0.8),
    entry("/showcase", "monthly", 0.7),
    entry("/team", "monthly", 0.6),
    entry("/careers", "weekly", 0.6),
    entry("/store", "weekly", 0.7),
    entry("/support", "monthly", 0.4),
    entry("/store/license", "yearly", 0.3),
    entry("/store/refunds", "yearly", 0.3),
    ...SERVICE_SLUGS.map((slug) => entry(`/services/${slug}`, "monthly", 0.8)),
    ...staticProjects.map((p) => entry(`/work/${p.slug}`, "monthly", 0.7)),
  ]

  // Remote content is best-effort: a Backend hiccup must not fail the build or
  // serve an empty sitemap, so each source degrades to "skip this section".
  const [blogEntries, portfolioEntries] = await Promise.all([
    apiService
      .getActiveBlogPosts()
      .then((posts) =>
        posts.map((post) =>
          entry(
            `/blog/${post.slug}`,
            "monthly",
            0.6,
            post.updated_at || post.published_at || new Date(),
          ),
        ),
      )
      .catch(() => [] as MetadataRoute.Sitemap),
    apiService
      .getPortfolios()
      .then((items) =>
        items
          .filter((item) => item.slug)
          .map((item) => entry(`/portofolio/${item.slug}`, "monthly", 0.6)),
      )
      .catch(() => [] as MetadataRoute.Sitemap),
  ])

  return [...staticEntries, ...blogEntries, ...portfolioEntries]
}
