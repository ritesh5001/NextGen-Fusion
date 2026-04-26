import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

const FIELDS = [
  'name',
  'description',
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

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('campaigns').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))
  const payload = pick(body)
  const { data, error } = await sb
    .from('campaigns')
    .update(payload)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const { error } = await sb.from('campaigns').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
