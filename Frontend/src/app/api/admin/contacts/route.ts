import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const sb = getSupabaseAdmin()
  const url = new URL(req.url)
  const search = url.searchParams.get('q')?.trim() || ''
  const limit = Math.min(Number(url.searchParams.get('limit') || 100), 500)
  const offset = Number(url.searchParams.get('offset') || 0)

  let query = sb
    .from('contacts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (search) {
    const safe = search.replace(/[%,]/g, '')
    query = query.or(
      `email.ilike.%${safe}%,name.ilike.%${safe}%,company.ilike.%${safe}%`
    )
  }

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data, count: count || 0 })
}

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

export async function POST(req: NextRequest) {
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))
  if (!body?.email || typeof body.email !== 'string') {
    return NextResponse.json({ error: 'email is required' }, { status: 400 })
  }
  const payload = pick(body)
  payload.email = String(payload.email).trim().toLowerCase()

  const { data, error } = await sb
    .from('contacts')
    .upsert(payload, { onConflict: 'email' })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
