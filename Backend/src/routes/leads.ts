import { Router } from 'express'
import multer from 'multer'
import Papa from 'papaparse'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const ALLOWED_FIELDS = [
  'company_name', 'contact_name', 'contact_title', 'email', 'phone', 'website',
  'industry', 'company_size', 'location', 'linkedin_url',
  'target_service', 'pain_point', 'status', 'last_contacted_at', 'next_followup_at',
  'source', 'assigned_to', 'notes', 'custom_fields',
] as const

const VALID_STATUSES = ['new', 'contacted', 'replied', 'meeting_scheduled', 'proposal_sent', 'won', 'lost', 'not_interested']

function pickLead(body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of ALLOWED_FIELDS) {
    if (f in body) out[f] = body[f]
  }
  return out
}

// GET /api/admin/leads
router.get('/leads', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = (req.query.q as string | undefined)?.trim() || ''
    const status = req.query.status as string | undefined
    const service = req.query.service as string | undefined
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)

    let query = sb
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`company_name.ilike.%${safe}%,contact_name.ilike.%${safe}%,email.ilike.%${safe}%,industry.ilike.%${safe}%`)
    }
    if (status) query = query.eq('status', status)
    if (service) query = query.eq('target_service', service)

    const { data, error, count } = await query
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/leads/bulk — CSV upload (must come before /:id)
router.post('/leads/bulk', requireAuth, upload.single('file'), async (req, res) => {
  try {
    let rawText: string | null = null

    if (req.file) {
      rawText = req.file.buffer.toString('utf-8')
    } else if (req.body && typeof req.body === 'object' && 'csv' in req.body) {
      rawText = (req.body as Record<string, unknown>).csv as string
    } else if (typeof req.body === 'string') {
      rawText = req.body
    }

    if (!rawText?.trim()) {
      res.status(400).json({ error: 'No CSV content received' })
      return
    }

    const parsed = Papa.parse<Record<string, string>>(rawText.trim(), {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, '_'),
    })

    if (!parsed.data.length) {
      res.status(400).json({ error: 'CSV has no rows' })
      return
    }

    // company_name is the only required column
    const rows = parsed.data.filter((r) => r.company_name?.trim())
    if (!rows.length) {
      res.status(400).json({ error: 'No rows with a company_name found in CSV' })
      return
    }

    const records = rows.map((r) => {
      const status = VALID_STATUSES.includes(r.status) ? r.status : 'new'
      return {
        company_name: r.company_name.trim(),
        contact_name: r.contact_name?.trim() || null,
        contact_title: r.contact_title?.trim() || null,
        email: r.email?.trim() || null,
        phone: r.phone?.trim() || null,
        website: r.website?.trim() || null,
        industry: r.industry?.trim() || null,
        company_size: r.company_size?.trim() || null,
        location: r.location?.trim() || null,
        linkedin_url: r.linkedin_url?.trim() || null,
        target_service: r.target_service?.trim() || null,
        pain_point: r.pain_point?.trim() || null,
        status,
        source: r.source?.trim() || 'csv_upload',
        notes: r.notes?.trim() || null,
      }
    })

    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('leads').insert(records).select('id')
    if (error) { res.status(500).json({ error: error.message }); return }

    res.json({ inserted: data?.length ?? 0, skipped: parsed.data.length - rows.length })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// GET /api/admin/leads/:id
router.get('/leads/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('leads').select('*').eq('id', req.params.id).single()
    if (error) { res.status(404).json({ error: 'Lead not found' }); return }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/leads
router.post('/leads', requireAuth, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>
    if (!body.company_name) {
      res.status(400).json({ error: 'company_name is required' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('leads').insert(pickLead(body)).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.status(201).json(data)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// PATCH /api/admin/leads/:id
router.patch('/leads/:id', requireAuth, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>
    const updates = pickLead(body)
    if (!Object.keys(updates).length) {
      res.status(400).json({ error: 'No valid fields to update' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('leads').update(updates).eq('id', req.params.id).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// DELETE /api/admin/leads/:id
router.delete('/leads/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { error } = await sb.from('leads').delete().eq('id', req.params.id)
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// --- Interactions ---

// GET /api/admin/leads/:id/interactions
router.get('/leads/:id/interactions', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('lead_interactions')
      .select('*')
      .eq('lead_id', req.params.id)
      .order('created_at', { ascending: false })
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/leads/:id/interactions
router.post('/leads/:id/interactions', requireAuth, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>
    if (!body.interaction_type || !body.summary) {
      res.status(400).json({ error: 'interaction_type and summary are required' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('lead_interactions')
      .insert({
        lead_id: req.params.id,
        interaction_type: body.interaction_type,
        summary: body.summary,
        outcome: body.outcome ?? null,
        next_action: body.next_action ?? null,
        created_by: body.created_by ?? null,
      })
      .select()
      .single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.status(201).json(data)
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
