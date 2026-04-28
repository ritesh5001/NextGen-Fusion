import { Router, Request } from 'express'
import { getSupabaseAdmin, type Campaign, type Contact } from '../lib/supabase'
import { sendCampaignEmail } from '../lib/email'

const router = Router()
const MAX_PER_RUN = 50

type RecipientRow = {
  id: string
  campaign_id: string
  contact_id: string
  status: 'pending' | 'followup_pending'
  followup_count: number
  contacts: Contact | null
  campaigns: Campaign | null
}

function isAuthorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const auth = req.headers.authorization || ''
  if (auth === `Bearer ${secret}`) return true
  return req.query.secret === secret
}

export async function processOnce() {
  const sb = getSupabaseAdmin()
  const nowIso = new Date().toISOString()

  const { data: due, error } = await sb
    .from('campaign_recipients')
    .select('id, campaign_id, contact_id, status, followup_count, contacts(*), campaigns(*)')
    .lte('next_send_at', nowIso)
    .in('status', ['pending', 'followup_pending'])
    .order('next_send_at', { ascending: true })
    .limit(MAX_PER_RUN)

  if (error) throw new Error(error.message)
  const rows = (due as unknown as RecipientRow[]) || []

  const work = rows.filter(
    (r) => r.campaigns?.status === 'active' && r.contacts && !r.contacts.unsubscribed
  )

  let sent = 0
  let failed = 0
  const skipped = rows.length - work.length

  for (const r of work) {
    const campaign = r.campaigns!
    const contact = r.contacts!
    const isFollowup = r.status === 'followup_pending'
    const followupNumber = r.followup_count + (isFollowup ? 1 : 0)
    const emailType = isFollowup ? `followup_${followupNumber}` : 'initial'

    const result = await sendCampaignEmail({
      campaign,
      contact,
      type: isFollowup ? (`followup_${followupNumber}` as const) : 'initial',
    })

    await sb.from('email_logs').insert({
      campaign_id: campaign.id,
      contact_id: contact.id,
      recipient_id: r.id,
      email_type: emailType,
      resend_message_id: result.ok ? result.messageId : null,
      status: result.ok ? 'sent' : 'failed',
      subject: result.subject,
      to_email: contact.email,
      error: result.ok ? null : result.error,
    })

    if (!result.ok) {
      failed++
      await sb
        .from('campaign_recipients')
        .update({ status: 'failed', last_error: result.error })
        .eq('id', r.id)
      continue
    }

    sent++
    const newFollowupCount = isFollowup ? r.followup_count + 1 : 0
    const sentAtIso = new Date().toISOString()
    const willFollowUp =
      campaign.followup_enabled && newFollowupCount < (campaign.max_followups ?? 0)

    if (willFollowUp) {
      const days = Math.max(0, campaign.followup_days || 0)
      const nextAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
      await sb
        .from('campaign_recipients')
        .update({
          status: 'followup_pending',
          followup_count: newFollowupCount,
          last_sent_at: sentAtIso,
          initial_sent_at: r.status === 'pending' ? sentAtIso : undefined,
          next_send_at: nextAt,
          last_error: null,
        })
        .eq('id', r.id)
    } else {
      await sb
        .from('campaign_recipients')
        .update({
          status: 'completed',
          followup_count: newFollowupCount,
          last_sent_at: sentAtIso,
          initial_sent_at: r.status === 'pending' ? sentAtIso : undefined,
          next_send_at: null,
          last_error: null,
        })
        .eq('id', r.id)
    }
  }

  const campaignIds = Array.from(new Set(work.map((r) => r.campaign_id)))
  for (const cid of campaignIds) {
    const { count } = await sb
      .from('campaign_recipients')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', cid)
      .in('status', ['pending', 'followup_pending'])
    if ((count ?? 0) === 0) {
      await sb
        .from('campaigns')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('id', cid)
        .eq('status', 'active')
    }
  }

  return { processed: rows.length, sent, failed, skipped }
}

async function handleCron(req: Request, res: any) {
  if (!isAuthorized(req)) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const result = await processOnce()
    res.json({ ok: true, ...result })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Cron error' })
  }
}

router.post('/process-campaigns', handleCron)
router.get('/process-campaigns', handleCron)

export default router
