import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

router.get('/stats', requireAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    async function safeCount(query: any): Promise<number> {
      const result = await query
      if (result.error && (result.error.code === '42P01' || /schema cache|could not find the table/i.test(result.error.message || ''))) {
        return 0
      }
      return result.count || 0
    }
    const [contacts, campaigns, activeCampaigns, queued, sent, formSubmissions, repliedForms, estimatorSubmissions] = await Promise.all([
      safeCount(sb.from('contacts').select('id', { count: 'exact', head: true })),
      safeCount(sb.from('campaigns').select('id', { count: 'exact', head: true })),
      safeCount(sb.from('campaigns').select('id', { count: 'exact', head: true }).eq('status', 'active')),
      safeCount(sb.from('campaign_recipients').select('id', { count: 'exact', head: true }).in('status', ['pending', 'followup_pending'])),
      safeCount(sb.from('email_logs').select('id', { count: 'exact', head: true }).eq('status', 'sent')),
      safeCount(sb.from('contact_forms').select('id', { count: 'exact', head: true })),
      safeCount(sb.from('contact_forms').select('id', { count: 'exact', head: true }).eq('status', 'replied')),
      safeCount(sb.from('project_estimator_submissions').select('id', { count: 'exact', head: true })),
    ])
    res.json({
      data: {
        contacts,
        campaigns,
        activeCampaigns,
        queued,
        sent,
        formSubmissions,
        repliedForms,
        estimatorSubmissions,
      }
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load stats' })
  }
})

export default router
