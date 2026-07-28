import { Router } from 'express'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { sendProductDeliveryEmail } from '../lib/email'
import { downloadSecret, buildDownloadUrl } from '../lib/store-download'

const router = Router()

const SELECT_COLUMNS =
  'id, slug, title, summary, description, category, price_inr, price_usd, cover_image, gallery, features, tech_stack, demo_url, r2_key, file_size_bytes, version, is_active, is_featured, display_order, created_at, updated_at'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Accept either an array or a comma / newline separated string → string[].
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean)
  }
  if (typeof value === 'string') {
    return value
      .split(/[\n,]/)
      .map((v) => v.trim())
      .filter(Boolean)
  }
  return []
}

function toIntOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? Math.trunc(n) : null
}

function toNumberOrNull(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null
  const n = Number(value)
  return Number.isFinite(n) ? n : null
}

// Build the writable column set from a request body (shared by create/update).
function buildFields(body: Record<string, unknown>): Record<string, unknown> {
  const fields: Record<string, unknown> = {}
  if (body.slug !== undefined) fields.slug = slugify(String(body.slug))
  if (body.title !== undefined) fields.title = String(body.title).trim()
  if (body.summary !== undefined) fields.summary = body.summary ? String(body.summary).trim() : null
  if (body.description !== undefined) fields.description = body.description ? String(body.description) : null
  if (body.category !== undefined) fields.category = body.category ? String(body.category).trim() : null
  if (body.price_inr !== undefined) fields.price_inr = toIntOrNull(body.price_inr) ?? 0
  if (body.price_usd !== undefined) fields.price_usd = toNumberOrNull(body.price_usd)
  if (body.cover_image !== undefined) fields.cover_image = body.cover_image ? String(body.cover_image).trim() : null
  if (body.gallery !== undefined) fields.gallery = toStringArray(body.gallery)
  if (body.features !== undefined) fields.features = toStringArray(body.features)
  if (body.tech_stack !== undefined) fields.tech_stack = toStringArray(body.tech_stack)
  if (body.demo_url !== undefined) fields.demo_url = body.demo_url ? String(body.demo_url).trim() : null
  if (body.r2_key !== undefined) fields.r2_key = body.r2_key ? String(body.r2_key).trim() : null
  if (body.file_size_bytes !== undefined) fields.file_size_bytes = toIntOrNull(body.file_size_bytes)
  if (body.version !== undefined) fields.version = body.version ? String(body.version).trim() : null
  if (body.is_active !== undefined) fields.is_active = Boolean(body.is_active)
  if (body.is_featured !== undefined) fields.is_featured = Boolean(body.is_featured)
  if (body.display_order !== undefined) fields.display_order = toIntOrNull(body.display_order) ?? 0
  return fields
}

router.get('/store-products', requireInternalAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .select(SELECT_COLUMNS)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('store-products:list', error)
    res.status(500).json({ error: 'Failed to fetch products', details: getErrorMessage(error) })
  }
})

router.get('/store-products/:id', requireInternalAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .select(SELECT_COLUMNS)
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('store-products:get', error)
    res.status(500).json({ error: 'Failed to fetch product', details: getErrorMessage(error) })
  }
})

router.post('/store-products', requireInternalAuth, async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const title = typeof body.title === 'string' ? body.title.trim() : ''
    if (!title) {
      res.status(400).json({ error: 'Title is required' })
      return
    }
    const fields = buildFields(body)
    fields.title = title
    // Default the slug from the title when the admin didn't provide one.
    if (!fields.slug) fields.slug = slugify(title)

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .insert(fields)
      .select(SELECT_COLUMNS)
      .single()

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'A product with this slug already exists' })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('store-products:create', error)
    res.status(500).json({ error: 'Failed to create product', details: getErrorMessage(error) })
  }
})

router.patch('/store-products/:id', requireInternalAuth, async (req, res) => {
  try {
    const fields = buildFields((req.body ?? {}) as Record<string, unknown>)
    if (Object.keys(fields).length === 0) {
      res.status(400).json({ error: 'No fields to update' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .update(fields)
      .eq('id', req.params.id)
      .select(SELECT_COLUMNS)
      .single()

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'A product with this slug already exists' })
        return
      }
      throw error
    }
    res.json({ data })
  } catch (error) {
    logRouteError('store-products:update', error)
    res.status(500).json({ error: 'Failed to update product', details: getErrorMessage(error) })
  }
})

router.delete('/store-products/:id', requireInternalAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    // Soft delete: hide from the storefront but keep purchase history intact.
    const { error } = await supabase
      .from('store_products')
      .update({ is_active: false })
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('store-products:delete', error)
    res.status(500).json({ error: 'Failed to delete product', details: getErrorMessage(error) })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Sales / purchases (admin)
// ─────────────────────────────────────────────────────────────────────────────
router.get('/store-purchases', requireInternalAuth, async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_purchases')
      .select(
        'id, product_id, customer_email, customer_name, amount, currency, status, license_key, download_count, download_limit, razorpay_payment_id, created_at, paid_at, store_products(title, slug)',
      )
      .order('created_at', { ascending: false })
      .limit(500)

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('store-purchases:list', error)
    res.status(500).json({ error: 'Failed to fetch sales', details: getErrorMessage(error) })
  }
})

// Re-send the delivery email (license + download link) for one purchase.
router.post('/store-purchases/:id/resend', requireInternalAuth, async (req, res) => {
  try {
    const secret = downloadSecret()
    if (!secret) {
      res.status(503).json({ error: 'Downloads are not configured (missing STORE_DOWNLOAD_SECRET).' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data: purchase, error } = await supabase
      .from('store_purchases')
      .select('id, status, license_key, customer_email, customer_name, product_id')
      .eq('id', req.params.id)
      .maybeSingle()
    if (error) throw error
    if (!purchase) {
      res.status(404).json({ error: 'Purchase not found' })
      return
    }
    if (purchase.status !== 'paid') {
      res.status(400).json({ error: 'Only paid purchases can be re-sent' })
      return
    }

    const { data: product } = await supabase
      .from('store_products')
      .select('title')
      .eq('id', purchase.product_id)
      .maybeSingle()

    const result = await sendProductDeliveryEmail({
      to: purchase.customer_email,
      name: purchase.customer_name,
      productTitle: product?.title || 'Your purchase',
      licenseKey: purchase.license_key || '—',
      downloadUrl: buildDownloadUrl(purchase.id, secret),
    })
    if (!result.ok) {
      res.status(502).json({ error: result.error || 'Email failed to send' })
      return
    }
    res.json({ ok: true, messageId: result.messageId })
  } catch (error) {
    logRouteError('store-purchases:resend', error)
    res.status(500).json({ error: 'Failed to re-send email', details: getErrorMessage(error) })
  }
})

export default router
