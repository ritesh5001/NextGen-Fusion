import type { BlogPost } from "@/lib/api"

/** URL-safe slug for a category name, e.g. "Web Design" -> "web-design". */
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** The real category label a slug resolves to, read off whichever post still has it. */
export function categoryLabelFromSlug(posts: BlogPost[], slug: string): string | undefined {
  return posts.find((post) => post.category && categorySlug(post.category) === slug)?.category ?? undefined
}

/** Distinct category slugs present across active posts, for static params and the sitemap. */
export function activeCategorySlugs(posts: BlogPost[]): string[] {
  const slugs = new Set<string>()
  for (const post of posts) {
    if (post.category) slugs.add(categorySlug(post.category))
  }
  return [...slugs]
}

/**
 * Same-category posts first, then the rest — so "related posts" is an actual
 * topical link instead of whatever three posts happen to sort next.
 */
export function relatedPosts(posts: BlogPost[], current: BlogPost, limit = 3): BlogPost[] {
  const others = posts.filter((post) => post.id !== current.id)
  const sameCategory = current.category
    ? others.filter((post) => post.category === current.category)
    : []
  const rest = others.filter((post) => !sameCategory.includes(post))
  return [...sameCategory, ...rest].slice(0, limit)
}
