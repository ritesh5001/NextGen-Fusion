import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireClient } from '../middleware/auth'

const router = Router()

const PRODUCT_COLUMNS =
  'id, title, description, vendor, product_type, category, tags, published, options, variants, images, created_at, updated_at'

type ProductPayload = {
  title?: unknown
  description?: unknown
  vendor?: unknown
  product_type?: unknown
  category?: unknown
  tags?: unknown
  published?: unknown
  options?: unknown
  variants?: unknown
  images?: unknown
}

function buildUpdates(body: ProductPayload): Record<string, unknown> {
  const updates: Record<string, unknown> = {}
  if (body.title !== undefined) updates.title = body.title
  if (body.description !== undefined) updates.description = body.description
  if (body.vendor !== undefined) updates.vendor = body.vendor
  if (body.product_type !== undefined) updates.product_type = body.product_type
  if (body.category !== undefined) updates.category = body.category
  if (body.tags !== undefined) updates.tags = body.tags
  if (body.published !== undefined) updates.published = body.published
  if (body.options !== undefined) updates.options = body.options
  if (body.variants !== undefined) updates.variants = body.variants
  if (body.images !== undefined) updates.images = body.images
  return updates
}

router.get('/products', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_products')
      .select(PRODUCT_COLUMNS)
      .eq('client_id', req.client_id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('client-products:list', error)
    res.status(500).json({ error: 'Failed to fetch products', details: getErrorMessage(error) })
  }
})

router.post('/products', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const body = req.body as ProductPayload
    if (!body.title || typeof body.title !== 'string') {
      res.status(400).json({ error: 'title is required' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_products')
      .insert({ ...buildUpdates(body), client_id: req.client_id })
      .select(PRODUCT_COLUMNS)
      .single()

    if (error) throw error
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('client-products:create', error)
    res.status(500).json({ error: 'Failed to create product', details: getErrorMessage(error) })
  }
})

// Per-client reuse suggestions derived from the client's saved products.
// NOTE: must be declared before "/products/:id" so it isn't matched as an id.
router.get('/products/suggestions', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_products')
      .select('category, options')
      .eq('client_id', req.client_id)

    if (error) throw error

    const rows = (data as Array<{ category: unknown; options: unknown }>) ?? []

    const categoryMap = new Map<string, string>() // lowercase -> original casing
    const optionMap = new Map<string, { name: string; values: Set<string> }>()

    for (const row of rows) {
      if (typeof row.category === 'string') {
        const c = row.category.trim()
        if (c && !categoryMap.has(c.toLowerCase())) categoryMap.set(c.toLowerCase(), c)
      }
      if (Array.isArray(row.options)) {
        for (const opt of row.options) {
          if (!opt || typeof opt !== 'object') continue
          const name = typeof (opt as { name?: unknown }).name === 'string' ? (opt as { name: string }).name.trim() : ''
          if (!name) continue
          const key = name.toLowerCase()
          if (!optionMap.has(key)) optionMap.set(key, { name, values: new Set<string>() })
          const bucket = optionMap.get(key)!
          const values = (opt as { values?: unknown }).values
          if (Array.isArray(values)) {
            for (const v of values) {
              if (typeof v === 'string' && v.trim() && bucket.values.size < 50) bucket.values.add(v.trim())
            }
          }
        }
      }
    }

    const categories = Array.from(categoryMap.values()).sort((a, b) => a.localeCompare(b)).slice(0, 100)
    const optionPresets = Array.from(optionMap.values())
      .map((o) => ({ name: o.name, values: Array.from(o.values) }))
      .sort((a, b) => a.name.localeCompare(b.name))

    res.json({ data: { categories, optionPresets } })
  } catch (error) {
    logRouteError('client-products:suggestions', error)
    // Suggestions are non-critical — degrade to empty rather than erroring the form.
    res.json({ data: { categories: [], optionPresets: [] } })
  }
})

router.get('/products/:id', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_products')
      .select(PRODUCT_COLUMNS)
      .eq('id', req.params.id)
      .eq('client_id', req.client_id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('client-products:detail', error)
    res.status(500).json({ error: 'Failed to fetch product', details: getErrorMessage(error) })
  }
})

router.patch('/products/:id', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_products')
      .update(buildUpdates(req.body as ProductPayload))
      .eq('id', req.params.id)
      .eq('client_id', req.client_id)
      .select(PRODUCT_COLUMNS)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('client-products:update', error)
    res.status(500).json({ error: 'Failed to update product', details: getErrorMessage(error) })
  }
})

router.delete('/products/:id', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { error } = await supabase
      .from('client_products')
      .delete()
      .eq('id', req.params.id)
      .eq('client_id', req.client_id)

    if (error) throw error
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-products:delete', error)
    res.status(500).json({ error: 'Failed to delete product', details: getErrorMessage(error) })
  }
})

export default router
