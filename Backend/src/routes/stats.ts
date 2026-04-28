import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

router.get('/stats', requireAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const [contacts, campaigns, activeCampaigns, queued, sent] = await Promise.all([
      sb.from('contacts').select('id', { count: 'exact', head: true }),
      sb.from('campaigns').select('id', { count: 'exact', head: true }),
      sb.from('campaigns').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      sb.from('campaign_recipients').select('id', { count: 'exact', head: true }).in('status', ['pending', 'followup_pending']),
      sb.from('email_logs').select('id', { count: 'exact', head: true }).eq('status', 'sent'),
    ])
    res.json({
      data: {
        contacts: contacts.count || 0,
        campaigns: campaigns.count || 0,
        activeCampaigns: activeCampaigns.count || 0,
        queued: queued.count || 0,
        sent: sent.count || 0,
      }
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load stats' })
  }
})

export default router
