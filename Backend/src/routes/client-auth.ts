import { Router } from 'express'
import type { Request, Response } from 'express'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { getSupabaseAdmin } from '../lib/supabase'
import { COOKIE_NAME } from '../middleware/auth'
import { DEFAULT_CLIENT_TOOLS } from '../lib/client-subscription'
import { sendPasswordResetEmail } from '../lib/email'

const router = Router()
const RESET_TOKEN_TTL_MS = 60 * 60 * 1000
const DEFAULT_TRIAL_DAYS = 14

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  return new TextEncoder().encode(secret)
}

const isProduction = process.env.NODE_ENV === 'production'

function normalizeEmail(value: unknown): string {
  return typeof value === 'string' ? value.toLowerCase().trim() : ''
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function getPortalBaseUrl(req: Request): string {
  const configured =
    process.env.CLIENT_PORTAL_URL ||
    process.env.FRONTEND_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000'
  const forwardedHost = req.get('x-forwarded-host')
  const forwardedProto = req.get('x-forwarded-proto') || 'https'
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`
  return configured.replace(/\/$/, '')
}

async function createClientSession(res: Response, client: {
  id: string
  name: string | null
  email: string
}) {
  const token = await new SignJWT({
    role: 'client',
    name: client.name || '',
    email: client.email,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(client.id)
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
}

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

    if (error || !client || !client.is_active) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    const valid = await bcrypt.compare(password, client.password_hash)
    if (!valid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    await createClientSession(res, client)

    res.json({ ok: true, name: client.name, email: client.email })
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/signup', async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email)
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
    const company = typeof req.body?.company === 'string' ? req.body.company.trim() : ''
    const password = typeof req.body?.password === 'string' ? req.body.password : ''

    if (!validEmail(email)) {
      res.status(400).json({ error: 'Enter a valid email address' })
      return
    }
    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters' })
      return
    }

    const trialEndsAt = new Date(Date.now() + DEFAULT_TRIAL_DAYS * 24 * 60 * 60 * 1000).toISOString()
    const password_hash = await bcrypt.hash(password, 12)
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_users')
      .insert({
        name,
        company: company || null,
        email,
        password_hash,
        subscription_plan: 'starter',
        subscription_status: 'trialing',
        subscription_current_period_end: trialEndsAt,
        allowed_tools: DEFAULT_CLIENT_TOOLS,
      })
      .select('id, name, email, subscription_status, subscription_plan, subscription_current_period_end, allowed_tools')
      .single()

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ error: 'An account with this email already exists' })
        return
      }
      throw error
    }

    await createClientSession(res, data)
    res.status(201).json({ ok: true, data })
  } catch {
    res.status(500).json({ error: 'Could not create account' })
  }
})

router.post('/forgot-password', async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email)
    if (!validEmail(email)) {
      res.status(400).json({ error: 'Enter a valid email address' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data: client } = await supabase
      .from('client_users')
      .select('id, name, email, is_active')
      .eq('email', email)
      .single()

    if (client?.is_active) {
      const token = crypto.randomBytes(32).toString('base64url')
      const token_hash = crypto.createHash('sha256').update(token).digest('hex')
      const expires_at = new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString()

      const { error: tokenError } = await supabase
        .from('client_password_reset_tokens')
        .insert({ client_id: client.id, token_hash, expires_at })

      if (!tokenError) {
        const resetUrl = `${getPortalBaseUrl(req)}/portal/reset-password?token=${encodeURIComponent(token)}`
        await sendPasswordResetEmail({ to: client.email, name: client.name, resetUrl })
      }
    }

    res.json({ ok: true, message: 'If an account exists, a reset link has been sent.' })
  } catch {
    res.json({ ok: true, message: 'If an account exists, a reset link has been sent.' })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const token = typeof req.body?.token === 'string' ? req.body.token.trim() : ''
    const password = typeof req.body?.password === 'string' ? req.body.password : ''
    if (!token || password.length < 8) {
      res.status(400).json({ error: 'A valid reset token and password of at least 8 characters are required' })
      return
    }

    const token_hash = crypto.createHash('sha256').update(token).digest('hex')
    const supabase = getSupabaseAdmin()
    const { data: resetRow, error } = await supabase
      .from('client_password_reset_tokens')
      .select('id, client_id, expires_at, used_at')
      .eq('token_hash', token_hash)
      .single()

    if (error || !resetRow || resetRow.used_at || new Date(resetRow.expires_at).getTime() < Date.now()) {
      res.status(400).json({ error: 'This reset link is invalid or expired' })
      return
    }

    const password_hash = await bcrypt.hash(password, 12)
    const { error: updateError } = await supabase
      .from('client_users')
      .update({ password_hash })
      .eq('id', resetRow.client_id)

    if (updateError) throw updateError

    await supabase
      .from('client_password_reset_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', resetRow.id)

    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Could not reset password' })
  }
})

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

export default router
