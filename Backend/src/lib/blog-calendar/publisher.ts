import { getSupabaseAdmin } from '../supabase'
import { pingIndexNow } from '../indexnow'
import { revalidateFrontend } from '../revalidate'
import { calendarPosts } from './index'
import { istDate, scheduledAt } from './schedule'

/**
 * Publishes the blog calendar: once a post's time has come it is inserted into
 * blog_posts, the website's caches are refreshed and search engines are pinged.
 *
 * Posts are inserted only when due, so nothing can appear on the site early.
 * At most one calendar post goes out per Indian calendar day: if the server was
 * down, the backlog catches up a day at a time instead of landing all at once.
 * A post already in the table (same slug) is never overwritten, so edits made
 * after publication are safe.
 */
const AUTHOR = 'Ritesh Kumar Giri'
const INTERVAL_MS = 5 * 60 * 1000

let timer: NodeJS.Timeout | null = null
let running = false

function readMinutes(...parts: string[]): number {
  const words = parts.join(' ').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

type Db = Pick<ReturnType<typeof getSupabaseAdmin>, 'from'>

function announce(slug: string) {
  revalidateFrontend(slug)
  pingIndexNow([`/blog/${slug}/`, '/blog/'])
}

export async function publishDuePosts(
  now = new Date(),
  sb: Db = getSupabaseAdmin(),
  onPublished: (slug: string) => void = announce,
): Promise<string | null> {
  const due = calendarPosts.filter((post) => scheduledAt(post) <= now)
  if (due.length === 0) return null

  const { data, error } = await sb
    .from('blog_posts')
    .select('slug, published_at')
    .in('slug', calendarPosts.map((post) => post.slug))
  if (error) throw new Error(error.message)

  const existing = new Map((data ?? []).map((row) => [row.slug as string, row.published_at as string]))
  const today = istDate(now)
  if ([...existing.values()].some((publishedAt) => publishedAt && istDate(new Date(publishedAt)) === today)) return null

  const next = due.find((post) => !existing.has(post.slug))
  if (!next) return null

  const { error: insertError } = await sb.from('blog_posts').insert({
    title: next.title,
    slug: next.slug,
    excerpt: next.excerpt,
    introduction: next.introduction,
    content: next.content,
    conclution: next.conclution,
    cover_image: next.cover_image,
    author: AUTHOR,
    category: next.category,
    read_duration: readMinutes(next.introduction, next.content, next.conclution),
    published_at: now.toISOString(),
    display_order: 0,
    is_active: true,
  })
  // Another instance got there first.
  if (insertError?.code === '23505') return null
  if (insertError) throw new Error(insertError.message)

  onPublished(next.slug)
  return next.slug
}

async function tick() {
  if (running) return
  running = true
  try {
    const slug = await publishDuePosts()
    if (slug) console.log(`[blog-calendar] published /blog/${slug}/`)
  } catch (err) {
    console.error('[blog-calendar] tick failed', err instanceof Error ? err.message : err)
  } finally {
    running = false
  }
}

export function startBlogCalendarPublisher() {
  if (process.env.BLOG_CALENDAR_ENABLED === 'false' || timer) return
  timer = setInterval(() => void tick(), INTERVAL_MS)
  void tick()
  console.log(`[blog-calendar] ${calendarPosts.length} posts scheduled, checking every ${INTERVAL_MS / 60000} min`)
}
