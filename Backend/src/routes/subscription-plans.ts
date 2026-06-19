import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

const PERIODS = ['year', 'month'] as const
const COLUMNS = 'id, name, amount, period, tagline, features, highlighted, active, sort_order, created_at, updated_at'

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function slugify(v: string): string {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60)
}

// Validate + normalise an incoming plan payload.
function normalize(body: Record<string, unknown>, requireId: boolean): { value?: Record<string, unknown>; error?: string } {
  const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
  if (!name) return { error: 'Name is required' }

  const amount = Number(body.amount)
  if (!Number.isFinite(amount) || amount < 0 || amount > 10_000_000) return { error: 'Amount must be a valid number' }

  const period = PERIODS.includes(body.period as (typeof PERIODS)[number]) ? (body.period as string) : 'year'

  let features: string[] = []
  if (Array.isArray(body.features)) {
    features = body.features.filter((f): f is string => typeof f === 'string' && f.trim().length > 0).map((f) => f.trim().slice(0, 200))
  } else if (typeof body.features === 'string') {
    features = body.features.split('\n').map((f) => f.trim()).filter(Boolean).slice(0, 20)
  }

  const value: Record<string, unknown> = {
    name,
    amount: Math.round(amount),
    period,
    tagline: typeof body.tagline === 'string' ? body.tagline.trim().slice(0, 200) : null,
    features,
    highlighted: !!body.highlighted,
    active: body.active === undefined ? true : !!body.active,
    sort_order: Number.isFinite(Number(body.sort_order)) ? Math.round(Number(body.sort_order)) : 0,
    updated_at: new Date().toISOString(),
  }

  if (requireId) {
    const id = typeof body.id === 'string' && body.id.trim() ? slugify(body.id) : slugify(name)
    if (!id) return { error: 'Could not derive a valid id' }
    value.id = id
  }

  return { value }
}

// GET /api/admin/subscription-plans
router.get('/subscription-plans', requireAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('subscription_plans').select(COLUMNS).order('sort_order', { ascending: true })
    if (error) {
      if (isMissingTableError(error)) {
        res.json({ data: [], setupRequired: true, message: 'Run subscription_plans_migration.sql in Supabase to manage plans.' })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load plans' })
  }
})

// POST /api/admin/subscription-plans  (create)
router.post('/subscription-plans', requireAuth, async (req, res) => {
  try {
    const { value, error } = normalize(req.body || {}, true)
    if (error || !value) {
      res.status(400).json({ error: error || 'Invalid plan' })
      return
    }
    const sb = getSupabaseAdmin()
    const { data, error: dbError } = await sb.from('subscription_plans').insert(value).select(COLUMNS).single()
    if (dbError) {
      if (isMissingTableError(dbError)) {
        res.status(503).json({ error: 'Run subscription_plans_migration.sql in Supabase first.' })
        return
      }
      res.status(500).json({ error: dbError.message })
      return
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to create plan' })
  }
})

// PUT /api/admin/subscription-plans/:id  (update)
router.put('/subscription-plans/:id', requireAuth, async (req, res) => {
  try {
    const { value, error } = normalize(req.body || {}, false)
    if (error || !value) {
      res.status(400).json({ error: error || 'Invalid plan' })
      return
    }
    const sb = getSupabaseAdmin()
    const { data, error: dbError } = await sb
      .from('subscription_plans')
      .update(value)
      .eq('id', req.params.id)
      .select(COLUMNS)
      .single()
    if (dbError) {
      res.status(500).json({ error: dbError.message })
      return
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to update plan' })
  }
})

// DELETE /api/admin/subscription-plans/:id
router.delete('/subscription-plans/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { error } = await sb.from('subscription_plans').delete().eq('id', req.params.id)
    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data: { deleted: true } })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to delete plan' })
  }
})

export default router
