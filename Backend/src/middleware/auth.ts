import { Request, Response, NextFunction } from 'express'
import { jwtVerify } from 'jose'

export const COOKIE_NAME = 'ngf_admin_session'

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 16) throw new Error('ADMIN_SESSION_SECRET is missing or too short')
  return new TextEncoder().encode(secret)
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.cookies?.[COOKIE_NAME]
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }
  try {
    const { payload } = await jwtVerify(token, getSecret())
    if (payload.role !== 'admin' && payload.role !== 'member') throw new Error('Unauthorized')
    if (payload.role === 'member') {
      req.member_id = payload.sub as string
      req.member_role = payload.member_role as 'partner' | 'admin_partner' | undefined
    }
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
