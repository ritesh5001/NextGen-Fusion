import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

export const dynamic = 'force-dynamic'

const FIELDS = [
  'name',
  'description',
  'status',
  'from_name',
  'from_email',
  'reply_to',
  'subject',
  'body_html',
  'followup_enabled',
  'followup_days',
  'followup_subject',
  'followup_body_html',
  'max_followups',
  'send_interval_seconds',
] as const

function pick(body: any) {
  const out: Record<string, unknown> = {}
  for (const f of FIELDS) if (f in body) out[f] = body[f]
  return out
}

export async function GET() {
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))
  const required = ['name', 'subject', 'body_html', 'from_name', 'from_email']
  for (const r of required) {
    if (!body?.[r]) return NextResponse.json({ error: `${r} is required` }, { status: 400 })
  }
  const payload = pick(body)
  // sane defaults
  if (payload.send_interval_seconds == null) payload.send_interval_seconds = 60
  if (payload.followup_days == null) payload.followup_days = 3
  if (payload.max_followups == null) payload.max_followups = 1
  if (payload.followup_enabled == null) payload.followup_enabled = true
  payload.status = 'draft'
  const { data, error } = await sb.from('campaigns').insert(payload).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
