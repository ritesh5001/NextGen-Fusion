import { Router } from 'express'
import { SignJWT } from 'jose'
import { COOKIE_NAME } from '../middleware/auth'

const router = Router()
const COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 7 // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  return new TextEncoder().encode(secret)
}

router.post('/login', async (req, res) => {
  try {
    const { password } = req.body
    if (!password || typeof password !== 'string') {
      res.status(400).json({ error: 'Password required' })
      return
    }
    const adminPassword = process.env.ADMIN_PASSWORD
    if (!adminPassword) throw new Error('ADMIN_PASSWORD is not set')
    if (password !== adminPassword) {
      res.status(401).json({ error: 'Invalid password' })
      return
    }
    const token = await new SignJWT({ role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(`${COOKIE_MAX_AGE_SEC}s`)
      .sign(getSecret())

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: COOKIE_MAX_AGE_SEC * 1000,
    })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Login failed' })
  }
})

router.post('/logout', (_req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' })
  res.json({ ok: true })
})

export default router
