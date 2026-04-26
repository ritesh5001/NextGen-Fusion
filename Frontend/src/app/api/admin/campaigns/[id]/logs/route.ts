import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const sb = getSupabaseAdmin()
  const { data, error } = await sb
    .from('email_logs')
    .select('*')
    .eq('campaign_id', id)
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
