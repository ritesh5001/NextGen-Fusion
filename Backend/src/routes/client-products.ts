import { Router } from 'express'
import {
  createFallbackClientProduct,
  deleteFallbackClientProduct,
  findFallbackClientProduct,
  isMissingSupabaseTable,
  listFallbackClientProducts,
  updateFallbackClientProduct,
} from '../lib/crm-fallback-store'
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

    if (error) {
      if (isMissingSupabaseTable(error)) {
        res.json({ data: await listFallbackClientProducts(req.client_id) })
        return
      }
      throw error
    }
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

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const data = await createFallbackClientProduct(req.client_id, buildUpdates(body))
        res.status(201).json({ data })
        return
      }
      throw error
    }
    res.status(201).json({ data })
  } catch (error) {
    logRouteError('client-products:create', error)
    res.status(500).json({ error: 'Failed to create product', details: getErrorMessage(error) })
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

    if (error && isMissingSupabaseTable(error)) {
      const data = await findFallbackClientProduct(req.client_id, req.params.id)
      if (!data) {
        res.status(404).json({ error: 'Product not found' })
        return
      }
      res.json({ data })
      return
    }

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

    if (error && isMissingSupabaseTable(error)) {
      const data = await updateFallbackClientProduct(req.client_id, req.params.id, buildUpdates(req.body as ProductPayload))
      if (!data) {
        res.status(404).json({ error: 'Product not found' })
        return
      }
      res.json({ data })
      return
    }

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

    if (error) {
      if (isMissingSupabaseTable(error)) {
        const deleted = await deleteFallbackClientProduct(req.client_id, req.params.id)
        if (!deleted) {
          res.status(404).json({ error: 'Product not found' })
          return
        }
        res.json({ ok: true })
        return
      }
      throw error
    }
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-products:delete', error)
    res.status(500).json({ error: 'Failed to delete product', details: getErrorMessage(error) })
  }
})

export default router
