import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, getAdminPassword, setSessionCookie } from '@/lib/admin/auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const password = typeof body?.password === 'string' ? body.password : ''
    if (!password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }
    if (password !== getAdminPassword()) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }
    const token = await createSessionToken()
    await setSessionCookie(token)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Login failed' },
      { status: 500 }
    )
  }
}
