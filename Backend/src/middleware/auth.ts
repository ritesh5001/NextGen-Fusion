import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from 'jose'

export const COOKIE_NAME = 'ngf_admin_session'

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  return new TextEncoder().encode(secret)
}

// Session token from the signed cookie (website) OR an Authorization: Bearer
// header (mobile app / API clients). Both carry the same ADMIN_SESSION_SECRET JWT.
function getToken(req: Request): string | undefined {
  const cookieToken = req.cookies?.[COOKIE_NAME]
  if (cookieToken) return cookieToken
  const auth = req.headers.authorization
  if (auth && auth.startsWith('Bearer ')) return auth.slice(7).trim()
  return undefined
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = getToken(req)
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (payload.role !== 'admin' && payload.role !== 'member' && payload.role !== 'client') {
      throw new Error('Unauthorized')
    }
    req.auth_role = payload.role
    if (payload.role === 'member') {
      req.member_id = payload.sub as string
      req.member_role = payload.member_role as 'partner' | 'admin_partner' | undefined
    }
    if (payload.role === 'client') {
      req.client_id = payload.sub as string
    }
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export async function requireInternalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  await requireAuth(req, res, () => {
    if (req.auth_role === 'client') {
      res.status(403).json({ error: 'Forbidden' })
      return
    }
    next()
  })
}

export async function requireClient(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = getToken(req)
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (payload.role !== 'client') throw new Error('Unauthorized')
    req.client_id = payload.sub as string
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
