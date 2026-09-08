import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { apiService } from "@/lib/api"
import { activeCategorySlugs, categoryLabelFromSlug, categorySlug } from "@/lib/blog"
import { BlogPostCard } from "@/components/blog/blog-post-card"
import { JsonLd } from "@/components/json-ld"
import { absoluteUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"

// Same rhythm as the blog listing: static per category, refreshed hourly so a
// newly published post shows up in its category page without a redeploy.
export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const posts = await apiService.getActiveBlogPosts()
    return activeCategorySlugs(posts).map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const posts = await apiService.getActiveBlogPosts()
  const category = categoryLabelFromSlug(posts, slug)
  if (!category) return {}

  return buildMetadata({
    title: `${category} Articles`,
    description: `${category} guides and write-ups from the NextGen Fusion blog — practical posts on building, launching and growing a site, written by the team that ships them.`,
    path: `/blog/category/${slug}`,
  })
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const posts = await apiService.getActiveBlogPosts()
  const category = categoryLabelFromSlug(posts, slug)

  if (!category) notFound()

  const categoryPosts = posts.filter((post) => post.category && categorySlug(post.category) === slug)

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${absoluteUrl(`/blog/category/${slug}`)}#collection`,
      url: absoluteUrl(`/blog/category/${slug}`),
      name: `${category} Articles`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": ORGANIZATION_ID },
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: category, path: `/blog/category/${slug}` },
    ]),
  ]

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <main className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-purple-600 mb-3">
              <Link href="/blog/" className="hover:underline">
                Blog
              </Link>{" "}
              / {category}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {category}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {categoryPosts.length} {categoryPosts.length === 1 ? "article" : "articles"} on {category.toLowerCase()}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
