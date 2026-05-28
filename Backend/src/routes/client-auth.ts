import { Router } from 'express'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { findFallbackClientByEmail, isMissingSupabaseTable } from '../lib/crm-fallback-store'
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
    const { data: client, error } = await supabase
      .from('client_users')
      .select('id, name, email, password_hash, is_active')
      .eq('email', email.toLowerCase().trim())
      .single()

    const resolvedClient = error && isMissingSupabaseTable(error)
      ? await findFallbackClientByEmail(email)
      : client

    if ((error && !isMissingSupabaseTable(error)) || !resolvedClient || !resolvedClient.is_active) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const valid = await bcrypt.compare(password, resolvedClient.password_hash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const token = await new SignJWT({
      role: 'client',
      name: resolvedClient.name,
      email: resolvedClient.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setSubject(resolvedClient.id)
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

    res.json({ ok: true, name: resolvedClient.name, email: resolvedClient.email })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

export default router
