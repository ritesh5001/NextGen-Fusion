import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, type Campaign, type Contact } from '@/lib/admin/supabase'
import { sendCampaignEmail } from '@/lib/admin/email'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

/**
 * Cron processor.
 *
 * Call this every minute from your VPS:
 *   curl -X POST -H "Authorization: Bearer $CRON_SECRET" \
 *     https://YOUR_HOST/api/cron/process-campaigns
 *
 * It:
 *   1. Finds recipients whose next_send_at is due, status in (pending, followup_pending),
 *      and whose campaign is `active`.
 *   2. Sends them via Resend (initial or follow-up).
 *   3. Schedules the next follow-up if applicable, or marks the recipient completed.
 *   4. Marks a campaign `completed` once every recipient has been resolved.
 *
 * Caps at MAX_PER_RUN sends per invocation to stay within Resend rate limits and
 * Next.js function timeouts. Call frequently (every minute) to drain the queue.
 */

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

function isAuthorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const auth = req.headers.get('authorization') || ''
  if (auth === `Bearer ${secret}`) return true
  // Fallback: ?secret=... query param (for cron services that can't set headers)
  const qs = new URL(req.url).searchParams.get('secret')
  return qs === secret
}

async function processOnce() {
  const sb = getSupabaseAdmin()
  const nowIso = new Date().toISOString()

  const { data: due, error } = await sb
    .from('campaign_recipients')
    .select(
      'id, campaign_id, contact_id, status, followup_count, contacts(*), campaigns(*)'
    )
    .lte('next_send_at', nowIso)
    .in('status', ['pending', 'followup_pending'])
    .order('next_send_at', { ascending: true })
    .limit(MAX_PER_RUN)

  if (error) throw new Error(error.message)
  const rows = (due as unknown as RecipientRow[]) || []

  // Filter to active campaigns + valid contact + not unsubscribed
  const work = rows.filter(
    (r) =>
      r.campaigns?.status === 'active' &&
      r.contacts &&
      !r.contacts.unsubscribed
  )

  let sent = 0
  let failed = 0
  let skipped = rows.length - work.length

  for (const r of work) {
    const campaign = r.campaigns!
    const contact = r.contacts!
    const isFollowup = r.status === 'followup_pending'
    const followupNumber = r.followup_count + (isFollowup ? 1 : 0) // 0 for initial
    const emailType = isFollowup ? `followup_${followupNumber}` : 'initial'

    const result = await sendCampaignEmail({
      campaign,
      contact,
      type: isFollowup ? (`followup_${followupNumber}` as const) : 'initial',
    })

    // Log the attempt
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

    // Decide next state
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

  // Auto-complete campaigns that have nothing left to do
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

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const result = await processOnce()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Cron error' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  // Allow GET too — many cron services prefer it
  return POST(req)
}
