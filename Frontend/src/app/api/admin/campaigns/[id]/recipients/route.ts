import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

export const dynamic = 'force-dynamic'

/**
 * GET — list recipients (joined with contact info) for a campaign.
 * Query: ?status=pending,failed (optional filter)
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const url = new URL(req.url)
  const statuses = url.searchParams.get('status')?.split(',').filter(Boolean)

  let q = sb
    .from('campaign_recipients')
    .select(
      'id, status, next_send_at, initial_sent_at, last_sent_at, followup_count, last_error, created_at, contacts(id, email, name, company)'
    )
    .eq('campaign_id', id)
    .order('next_send_at', { ascending: true, nullsFirst: false })
    .order('created_at', { ascending: true })
    .limit(1000)

  if (statuses && statuses.length) {
    q = q.in('status', statuses)
  }

  const { data, error } = await q
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

/**
 * POST — add recipients to a campaign. Body shapes:
 *   { contact_ids: string[] }
 *   { all: true, exclude_unsubscribed?: boolean }
 *   { filter: { company?: string, industry?: string } }
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id: campaignId } = await ctx.params
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))

  // Resolve contact ids based on body
  let contactIds: string[] = []

  if (Array.isArray(body?.contact_ids)) {
    contactIds = body.contact_ids.filter((x: unknown) => typeof x === 'string')
  } else if (body?.all === true || body?.filter) {
    let q = sb.from('contacts').select('id').eq('unsubscribed', false).limit(50000)
    if (body?.filter?.company) q = q.ilike('company', `%${body.filter.company}%`)
    if (body?.filter?.industry) q = q.ilike('industry', `%${body.filter.industry}%`)
    const { data, error } = await q
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    contactIds = (data || []).map((r) => r.id)
  } else {
    return NextResponse.json(
      { error: 'Provide contact_ids[], all:true, or filter{}' },
      { status: 400 }
    )
  }

  if (contactIds.length === 0) {
    return NextResponse.json({ ok: true, added: 0 })
  }

  // Fetch campaign for pacing
  const { data: campaign, error: cErr } = await sb
    .from('campaigns')
    .select('id, send_interval_seconds, status, started_at')
    .eq('id', campaignId)
    .single()
  if (cErr || !campaign) {
    return NextResponse.json({ error: cErr?.message || 'Campaign not found' }, { status: 404 })
  }

  // Find the latest already-scheduled next_send_at for this campaign so new
  // recipients are queued AFTER existing ones (preserves spacing).
  const { data: lastQueued } = await sb
    .from('campaign_recipients')
    .select('next_send_at')
    .eq('campaign_id', campaignId)
    .order('next_send_at', { ascending: false, nullsFirst: false })
    .limit(1)

  const intervalMs = Math.max(1, campaign.send_interval_seconds || 60) * 1000
  const baseTimeMs = Math.max(
    Date.now(),
    lastQueued?.[0]?.next_send_at ? new Date(lastQueued[0].next_send_at).getTime() + intervalMs : 0
  )

  const rows = contactIds.map((cid, i) => ({
    campaign_id: campaignId,
    contact_id: cid,
    status: 'pending' as const,
    next_send_at: new Date(baseTimeMs + i * intervalMs).toISOString(),
  }))

  // Upsert (ignore conflicts for already-added recipients)
  const { error: insErr } = await sb
    .from('campaign_recipients')
    .upsert(rows, { onConflict: 'campaign_id,contact_id', ignoreDuplicates: true })
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 })

  return NextResponse.json({ ok: true, added: rows.length })
}

/**
 * DELETE — remove a recipient from campaign. Query: ?recipient_id=...
 */
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id: campaignId } = await ctx.params
  const sb = getSupabaseAdmin()
  const url = new URL(req.url)
  const recipientId = url.searchParams.get('recipient_id')
  if (!recipientId)
    return NextResponse.json({ error: 'recipient_id required' }, { status: 400 })
  const { error } = await sb
    .from('campaign_recipients')
    .delete()
    .eq('campaign_id', campaignId)
    .eq('id', recipientId)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
