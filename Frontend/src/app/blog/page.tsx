import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { apiService, type BlogPost } from "@/lib/api"
import { normalizeImagePath } from "@/lib/utils"
import CTABanner from "@/components/cta-banner"
import { BlogSearch } from "@/components/blog/blog-search"

// Server-rendered so crawlers get the posts themselves, not a loading shell.
// Revalidates hourly, so newly published posts appear without a redeploy.
export const revalidate = 3600

function formatDate(dateString: string) {
  if (!dateString) return ""
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatReadTime(minutes: number | null) {
  return minutes ? `${minutes} min read` : "5 min read"
}

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

  return (
    <div className="min-h-screen bg-white">
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
              <article
                key={post.id}
                data-blog-card
                data-search-text={`${post.title} ${post.excerpt} ${post.author} ${post.category || ""}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100/50"
              >
                <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-purple-50 to-indigo-50">
                  <Image
                    src={normalizeImagePath(post.cover_image)}
                    alt={post.title}
                    width={400}
                    height={240}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-64 object-cover"
                    unoptimized={normalizeImagePath(post.cover_image).startsWith("http")}
                  />

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-purple-600 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      {post.category || "Article"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {formatReadTime(post.read_duration)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                        <p className="text-xs text-gray-500">{formatDate(post.published_at)}</p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-purple-700">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                    aria-label={`Read ${post.title}`}
                  >
                    <span>Read Article</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No blog posts yet</h2>
              <p className="text-gray-600">Check back shortly — we publish twice a month.</p>
            </div>
          )}

          <CTABanner className="mt-16 mb-8 -mx-4 sm:-mx-6 lg:-mx-8" />
        </div>
      </main>
    </div>
  )
}
