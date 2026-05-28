import { Router } from 'express'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { findFallbackAgencyMemberByEmail, isMissingSupabaseTable } from '../lib/crm-fallback-store'
import { getSupabaseAdmin } from '../lib/supabase'
import { COOKIE_NAME } from '../middleware/auth'

const router = Router()

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  return new TextEncoder().encode(secret)
}

const isProduction = process.env.NODE_ENV === 'production'

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data: member, error } = await supabase
      .from('agency_members')
      .select('id, name, email, password_hash, role, is_active')
      .eq('email', email.toLowerCase().trim())
      .single()

    const resolvedMember = error && isMissingSupabaseTable(error)
      ? await findFallbackAgencyMemberByEmail(email)
      : member

    if ((error && !isMissingSupabaseTable(error)) || !resolvedMember || !resolvedMember.is_active) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const valid = await bcrypt.compare(password, resolvedMember.password_hash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = await new SignJWT({
      role: 'member',
      name: resolvedMember.name,
      email: resolvedMember.email,
      member_role: resolvedMember.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(resolvedMember.id)
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(getSecret())

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    })

    res.json({ ok: true, name: resolvedMember.name, email: resolvedMember.email })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

export default router
