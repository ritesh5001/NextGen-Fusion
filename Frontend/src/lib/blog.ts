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

type CategoryCopy = { title: string; heading: string; description: string }

/**
 * Hand-written copy for categories that act as landing pages — country hubs in
 * particular, where the category page is what should rank for "<service> in
 * <country>". Categories without an entry fall back to the generic template.
 */
export const categoryCopy: Record<string, CategoryCopy> = {
  india: {
    title: "Website, Software & AI Development in India — City Guides",
    heading: "Website, Software & AI Development in India",
    description:
      "City-by-city guides for Indian businesses: website development, custom software, e-commerce and AI automation in New Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata, Jaipur, Lucknow and more.",
  },
}

/** Category label with post counts, ordered by count, for the browse chips on /blog. */
export function categoryCounts(posts: BlogPost[]): { label: string; slug: string; count: number }[] {
  const counts = new Map<string, { label: string; slug: string; count: number }>()
  for (const post of posts) {
    if (!post.category) continue
    const slug = categorySlug(post.category)
    const existing = counts.get(slug)
    if (existing) existing.count += 1
    else counts.set(slug, { label: post.category, slug, count: 1 })
  }
  return [...counts.values()].sort((a, b) => b.count - a.count)
}
