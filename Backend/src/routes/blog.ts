import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'

const router = Router()

const COLUMNS =
  'id, title, slug, excerpt, introduction, content, conclution, cover_image, author, category, read_duration, published_at, display_order, is_active, created_at, updated_at'

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function trimString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

/** ~200 wpm over the visible text, so the badge on the card is not a guess. */
function estimateReadMinutes(...htmlParts: (string | null | undefined)[]): number {
  const text = htmlParts.filter(Boolean).join(' ').replace(/<[^>]+>/g, ' ')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function pickPost(body: any) {
  const title = trimString(body?.title)
  const content = trimString(body?.content)
  const introduction = trimString(body?.introduction) || null
  const conclution = trimString(body?.conclution) || null

  return {
    title,
    slug: trimString(body?.slug) || slugify(title),
    excerpt: trimString(body?.excerpt),
    introduction,
    content,
    conclution,
    cover_image: trimString(body?.cover_image) || null,
    author: trimString(body?.author) || 'NextGen Fusion',
    category: trimString(body?.category) || null,
    read_duration:
      Number(body?.read_duration) || estimateReadMinutes(introduction, content, conclution),
    published_at: trimString(body?.published_at) || new Date().toISOString(),
    display_order: Number(body?.display_order) || 0,
    is_active: body?.is_active === undefined ? true : Boolean(body.is_active),
  }
}

// Public list. The website filters to active posts itself, but we only ever
// expose active ones so an unpublished draft can never leak through the API.
router.get('/blog-posts', async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('blog_posts')
      .select(COLUMNS)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('published_at', { ascending: false })

    if (error) {
      if (isMissingTableError(error)) {
        res.json({ data: [] })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data: data || [] })
  } catch (err) {
    logRouteError('blog:list', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.get('/blog-posts/:id', async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { id } = req.params
    // Accept either a numeric id or a slug so links keep working either way.
    const column = /^\d+$/.test(id) ? 'id' : 'slug'
    const { data, error } = await sb
      .from('blog_posts')
      .select(COLUMNS)
      .eq(column, id)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Blog post not found' })
      return
    }
    res.json({ data })
  } catch (err) {
    logRouteError('blog:get', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

// ── Admin ────────────────────────────────────────────────────────────────────

router.get('/admin/blog-posts', requireAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error, count } = await sb
      .from('blog_posts')
      .select(COLUMNS, { count: 'exact' })
      .order('published_at', { ascending: false })

    if (error) {
      if (isMissingTableError(error)) {
        res.json({
          data: [],
          count: 0,
          setupRequired: true,
          message: 'Blog storage is not provisioned yet. Apply the blog_posts table schema first.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data: data || [], count: count || 0 })
  } catch (err) {
    logRouteError('blog:admin-list', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.post('/admin/blog-posts', requireAuth, async (req, res) => {
  try {
    const payload = pickPost(req.body)
    if (!payload.title || !payload.content || !payload.excerpt) {
      res.status(400).json({ error: 'title, excerpt, and content are required' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('blog_posts').insert(payload).select(COLUMNS).single()
    if (error) {
      res.status(error.code === '23505' ? 409 : 500).json({
        error: error.code === '23505' ? 'A post with that slug already exists' : error.message,
      })
      return
    }
    res.status(201).json({ data })
  } catch (err) {
    logRouteError('blog:create', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.patch('/admin/blog-posts/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const updates: Record<string, unknown> = { updated_at: new Date().toISOString() }
    const allowed = [
      'title', 'slug', 'excerpt', 'introduction', 'content', 'conclution',
      'cover_image', 'author', 'category', 'read_duration', 'published_at',
      'display_order', 'is_active',
    ]
    for (const key of allowed) {
      if (req.body?.[key] !== undefined) updates[key] = req.body[key]
    }

    const { data, error } = await sb
      .from('blog_posts')
      .update(updates)
      .eq('id', req.params.id)
      .select(COLUMNS)
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    logRouteError('blog:update', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.delete('/admin/blog-posts/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { error } = await sb.from('blog_posts').delete().eq('id', req.params.id)
    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data: { id: req.params.id } })
  } catch (err) {
    logRouteError('blog:delete', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

export default router
