import Link from "next/link"
import { apiService, type BlogPost } from "@/lib/api"
import CTABanner from "@/components/cta-banner"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import { guideLinks } from "@/data/guides"
import { categoryCounts } from "@/lib/blog"

// Server-rendered so crawlers get the posts themselves, not a loading shell.
// Revalidates hourly, so newly published posts appear without a redeploy.
export const revalidate = 3600

async function getPosts(): Promise<BlogPost[]> {
  try {
    return await apiService.getActiveBlogPosts()
  } catch {
    // A backend hiccup must not blank the page or fail the build.
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  const categories = categoryCounts(posts)

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${absoluteUrl("/blog")}#blog`,
      url: absoluteUrl("/blog"),
      name: "NextGen Fusion Blog",
      isPartOf: { "@id": `${siteUrl}/#website` },
      publisher: { "@id": ORGANIZATION_ID },
      blogPost: posts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        ...(post.published_at ? { datePublished: post.published_at } : {}),
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]),
  ]

  return (
    <div className="min-h-screen">
      <JsonLd data={schema} />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-ink mb-6 tracking-tight">
              Web Development, SEO &amp; Digital Growth Insights
            </h1>
            <p className="text-xl text-ink-soft max-w-3xl mx-auto mb-8">
              Practical guides on building websites, ranking them, and turning them into
              revenue — written by the team that ships them.
            </p>
            <BlogSearch total={posts.length} />
            {/* Crawlable links into the category archives — country hubs like
                /blog/category/india/ were otherwise only reachable from a post. */}
            {categories.length > 0 && (
              <nav aria-label="Blog categories" className="mt-8 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}/`}
                    className="rounded-full border border-ink/10 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-gray-900 hover:text-ink"
                  >
                    {cat.label} <span className="text-gray-400">({cat.count})</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Long-form guides live outside /blog so their figures can read the
              content layer directly, but they are the same kind of reading. */}
          <section className="mb-16" aria-labelledby="guides-heading">
            <h2 id="guides-heading" className="text-2xl font-medium text-ink sm:text-3xl tracking-tight">
              Guides
            </h2>
            <p className="mt-2 max-w-3xl text-ink-soft">
              Reference pages built from our own projects and case studies, updated when the
              numbers change.
            </p>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {guideLinks.map((guide) => (
                <li key={guide.path}>
                  <Link
                    href={`${guide.path}/`}
                    className="block h-full rounded-[28px] border border-ink/10 p-6 transition-colors hover:border-gray-900"
                  >
                    <p className="text-lg font-bold text-ink">{guide.h1}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{guide.metaDescription}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {posts.length === 0 && (
            <div className="mx-auto max-w-2xl py-16 text-center">
              <h2 className="mb-3 text-xl font-semibold text-ink">
                Nothing published here yet
              </h2>
              <p className="text-ink-soft">
                We would rather leave this empty than fill it with filler. In the meantime, the{" "}
                <Link href="/work/" className="font-medium text-brand hover:underline">
                  case studies
                </Link>{" "}
                cover the same ground with real projects behind them, and the{" "}
                <Link href="/services/" className="font-medium text-brand hover:underline">
                  service pages
                </Link>{" "}
                answer most of what people write in asking about.
              </p>
            </div>
          )}

          <CTABanner className="mt-16 mb-8 -mx-4 sm:-mx-6 lg:-mx-8" />
        </div>
      </main>
    </div>
  )
}
