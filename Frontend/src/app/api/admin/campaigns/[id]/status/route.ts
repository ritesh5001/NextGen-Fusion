import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

const ALLOWED = new Set(['draft', 'active', 'paused', 'completed'])

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const body = await req.json().catch(() => ({}))
  const status = body?.status
  if (!ALLOWED.has(status))
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })

  const update: Record<string, unknown> = { status }
  if (status === 'active') update.started_at = new Date().toISOString()
  if (status === 'completed') update.completed_at = new Date().toISOString()

  const { data, error } = await sb
    .from('campaigns')
    .update(update)
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
