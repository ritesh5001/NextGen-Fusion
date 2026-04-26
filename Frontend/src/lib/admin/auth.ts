import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'ngf_admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) {
    throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  }
  return new TextEncoder().encode(secret)
}

export function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) throw new Error('ADMIN_PASSWORD env var is not set')
  return pw
}

export async function createSessionToken(): Promise<string> {
  return await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${COOKIE_MAX_AGE}s`)
    .sign(getSecret())
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function setSessionCookie(token: string) {
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
}

export async function clearSessionCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifySessionToken(token)
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME
