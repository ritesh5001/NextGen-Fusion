import { timingSafeEqual } from "node:crypto"
import { revalidatePath, revalidateTag } from "next/cache"
import { BLOG_POSTS_TAG } from "@/lib/api"
import { NextResponse, type NextRequest } from "next/server"

/**
 * On-demand revalidation, called by the Backend when a blog post is created,
 * updated or published. Without it a new post waited up to an hour (the
 * pages' revalidate window) to appear on /blog/ and in the sitemap.
 *
 *   POST /api/revalidate/
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "slug": "optional-post-slug" }
 */
function isAuthorized(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET
  if (!expected || !provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let slug: string | undefined
  try {
    const body: unknown = await request.json()
    if (body && typeof body === "object" && "slug" in body && typeof body.slug === "string") {
      slug = body.slug.trim().replace(/^\/+|\/+$/g, "") || undefined
    }
  } catch {
    // No body, or not JSON: the slug is optional.
  }

  const paths = ["/blog/", "/sitemap.xml", ...(slug ? [`/blog/${slug}/`] : [])]
  for (const path of paths) revalidatePath(path)
  // The paths alone miss the sitemap (cached as '/sitemap.xml/' under
  // trailingSlash); the tag reaches every page built from the post list.
  revalidateTag(BLOG_POSTS_TAG)

  return NextResponse.json({ revalidated: true, paths, now: Date.now() })
}
