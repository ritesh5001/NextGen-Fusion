import Link from "next/link"
import { apiService, type BlogPost } from "@/lib/api"
import CTABanner from "@/components/cta-banner"
import { BlogSearch } from "@/components/blog/blog-search"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, ORGANIZATION_ID, siteUrl } from "@/lib/seo"

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
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Web Development, SEO &amp; Digital Growth Insights
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Practical guides on building websites, ranking them, and turning them into
              revenue — written by the team that ships them.
            </p>
            <BlogSearch total={posts.length} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {posts.length === 0 && (
            <div className="mx-auto max-w-2xl py-16 text-center">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                Nothing published here yet
              </h2>
              <p className="text-gray-600">
                We would rather leave this empty than fill it with filler. In the meantime, the{" "}
                <Link href="/work/" className="font-medium text-purple-600 hover:underline">
                  case studies
                </Link>{" "}
                cover the same ground with real projects behind them, and the{" "}
                <Link href="/services/" className="font-medium text-purple-600 hover:underline">
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
