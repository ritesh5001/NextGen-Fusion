import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { processOnce } from './cron'

const router = Router()
const PAGE_SIZE = 1000

const CAMPAIGN_FIELDS = [
  'name', 'description', 'status', 'from_name', 'from_email', 'reply_to',
  'subject', 'body_html', 'followup_enabled', 'followup_days', 'followup_subject',
  'followup_body_html', 'max_followups', 'send_interval_seconds', 'daily_send_limit',
] as const

function pickCampaign(body: any): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of CAMPAIGN_FIELDS) if (f in body) out[f] = body[f]
  return out
}

async function fetchAllContacts(
  sb: ReturnType<typeof getSupabaseAdmin>,
  filter?: { company?: string; industry?: string }
): Promise<string[]> {
  const contactIds: string[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    let q = sb.from('contacts').select('id').eq('unsubscribed', false).order('id', { ascending: true }).range(offset, offset + PAGE_SIZE - 1)
    if (filter?.company) q = q.ilike('company', `%${filter.company}%`)
    if (filter?.industry) q = q.ilike('industry', `%${filter.industry}%`)
    const { data, error } = await q
    if (error) throw error
    const ids = (data || []).map((r: { id: string }) => r.id)
    contactIds.push(...ids)
    if (ids.length < PAGE_SIZE) break
  }
  return contactIds
}

async function fetchAllCampaignRecipients(
  sb: ReturnType<typeof getSupabaseAdmin>,
  campaignId: string,
  statuses?: string[]
) {
  const rows: any[] = []
  for (let offset = 0; ; offset += PAGE_SIZE) {
    let q = sb
      .from('campaign_recipients')
      .select('id, status, next_send_at, initial_sent_at, last_sent_at, followup_count, last_error, created_at, contacts(id, email, name, company)')
      .eq('campaign_id', campaignId)
      .order('next_send_at', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1)
    if (statuses && statuses.length) q = q.in('status', statuses)
    const { data, error } = await q
    if (error) throw error
    const chunk = data || []
    rows.push(...chunk)
    if (chunk.length < PAGE_SIZE) break
  }
  return rows
}

// GET /api/admin/campaigns
router.get('/campaigns', requireAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/campaigns
router.post('/campaigns', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const body = req.body
    const required = ['name', 'subject', 'body_html', 'from_name', 'from_email']
    for (const r of required) {
      if (!body?.[r]) { res.status(400).json({ error: `${r} is required` }); return }
    }
    const payload = pickCampaign(body)
    if (payload.send_interval_seconds == null) payload.send_interval_seconds = 60
    if (payload.followup_days == null) payload.followup_days = 3
    if (payload.max_followups == null) payload.max_followups = 1
    if (payload.followup_enabled == null) payload.followup_enabled = true
    if (typeof payload.daily_send_limit === 'number' && payload.daily_send_limit <= 0) {
      payload.daily_send_limit = null
    }
    payload.status = 'draft'
    const { data, error } = await sb.from('campaigns').insert(payload).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// GET /api/admin/campaigns/:id
router.get('/campaigns/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('campaigns').select('*').eq('id', req.params.id).single()
    if (error) { res.status(404).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// PATCH /api/admin/campaigns/:id
router.patch('/campaigns/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const payload = pickCampaign(req.body)
    if (typeof payload.daily_send_limit === 'number' && payload.daily_send_limit <= 0) {
      payload.daily_send_limit = null
    }
    const { data, error } = await sb
      .from('campaigns').update(payload).eq('id', req.params.id).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// DELETE /api/admin/campaigns/:id
router.delete('/campaigns/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { error } = await sb.from('campaigns').delete().eq('id', req.params.id)
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/campaigns/:id/status
router.post('/campaigns/:id/status', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const ALLOWED = new Set(['draft', 'active', 'paused', 'completed'])
    const status = req.body?.status
    if (!ALLOWED.has(status)) { res.status(400).json({ error: 'Invalid status' }); return }
    const update: Record<string, unknown> = { status }
    if (status === 'active') update.started_at = new Date().toISOString()
    if (status === 'completed') update.completed_at = new Date().toISOString()
    const { data, error } = await sb
      .from('campaigns').update(update).eq('id', req.params.id).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    if (status === 'active') {
      try {
        await processOnce()
      } catch {
        // Ignore cron errors here; campaign still activated.
      }
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// GET /api/admin/campaigns/:id/logs
router.get('/campaigns/:id/logs', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('email_logs')
      .select('*')
      .eq('campaign_id', req.params.id)
      .order('created_at', { ascending: false })
      .limit(500)
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// GET /api/admin/campaigns/:id/recipients
router.get('/campaigns/:id/recipients', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const statuses = (req.query.status as string | undefined)?.split(',').filter(Boolean)
    const data = await fetchAllCampaignRecipients(sb, req.params.id, statuses)
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/campaigns/:id/recipients
router.post('/campaigns/:id/recipients', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const campaignId = req.params.id
    const body = req.body
    let contactIds: string[] = []

    if (Array.isArray(body?.contact_ids)) {
      contactIds = body.contact_ids.filter((x: unknown) => typeof x === 'string')
    } else if (body?.all === true || body?.filter) {
      contactIds = await fetchAllContacts(sb, {
        company: body?.filter?.company,
        industry: body?.filter?.industry,
      })
    } else {
      res.status(400).json({ error: 'Provide contact_ids[], all:true, or filter{}' })
      return
    }

    if (contactIds.length === 0) { res.json({ ok: true, added: 0 }); return }

    const { data: campaign, error: cErr } = await sb
      .from('campaigns').select('id, send_interval_seconds, status, started_at').eq('id', campaignId).single()
    if (cErr || !campaign) {
      res.status(404).json({ error: cErr?.message || 'Campaign not found' })
      return
    }

    const { data: lastQueued } = await sb
      .from('campaign_recipients')
      .select('next_send_at')
      .eq('campaign_id', campaignId)
      .order('next_send_at', { ascending: false, nullsFirst: false })
      .limit(1)

    const intervalSeconds = campaign.status === 'active'
      ? 0
      : Math.max(1, campaign.send_interval_seconds || 60)
    const intervalMs = intervalSeconds * 1000
    const baseTimeMs = campaign.status === 'active'
      ? Date.now()
      : Math.max(
        Date.now(),
        lastQueued?.[0]?.next_send_at ? new Date(lastQueued[0].next_send_at).getTime() + intervalMs : 0
      )

    const rows = contactIds.map((cid: string, i: number) => ({
      campaign_id: campaignId,
      contact_id: cid,
      status: 'pending' as const,
      next_send_at: new Date(baseTimeMs + i * intervalMs).toISOString(),
    }))

    for (let i = 0; i < rows.length; i += PAGE_SIZE) {
      const chunk = rows.slice(i, i + PAGE_SIZE)
      const { error: insErr } = await sb
        .from('campaign_recipients')
        .upsert(chunk, { onConflict: 'campaign_id,contact_id', ignoreDuplicates: true })
      if (insErr) { res.status(500).json({ error: insErr.message }); return }
    }
    if (campaign.status === 'active') {
      try {
        await processOnce()
      } catch {
        // Ignore cron errors here; recipients are queued for cron.
      }
    }
    res.json({ ok: true, added: rows.length })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// DELETE /api/admin/campaigns/:id/recipients?recipient_id=...
router.delete('/campaigns/:id/recipients', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const recipientId = req.query.recipient_id as string | undefined
    if (!recipientId) { res.status(400).json({ error: 'recipient_id required' }); return }
    const { error } = await sb
      .from('campaign_recipients')
      .delete()
      .eq('campaign_id', req.params.id)
      .eq('id', recipientId)
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
