import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

const ALLOWED_FIELDS = [
  'email',
  'name',
  'company',
  'phone',
  'website',
  'industry',
  'notes',
  'custom_fields',
  'unsubscribed',
] as const

function pick(body: any) {
  const out: Record<string, unknown> = {}
  for (const f of ALLOWED_FIELDS) if (f in body) out[f] = body[f]
  return out
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const { data, error } = await sb.from('contacts').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: error.message }, { status: 404 })
  return NextResponse.json({ data })
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))
  const payload = pick(body)
  if (typeof payload.email === 'string') {
    payload.email = (payload.email as string).trim().toLowerCase()
  }
  const { data, error } = await sb
    .from('contacts')
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
  const { error } = await sb.from('contacts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
