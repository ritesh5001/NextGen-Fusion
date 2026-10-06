import type { NextFunction, Request, Response } from 'express'
import { clientIp } from './client-ip'

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/** The token the website sends with each protected form, in this header. */
export const TURNSTILE_HEADER = 'x-turnstile-token'

let warnedMissingSecret = false

type SiteverifyResult = { success: boolean; 'error-codes'?: string[] }

/**
 * Asks Cloudflare whether a Turnstile token is genuine and unused. Tokens are
 * single-use and expire after five minutes, so the website fetches a fresh one
 * for every submission.
 */
export async function verifyTurnstile(token: string, ip: string): Promise<SiteverifyResult> {
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY || '', response: token, remoteip: ip })
  const response = await fetch(VERIFY_URL, { method: 'POST', body, signal: AbortSignal.timeout(8000) })
  if (!response.ok) return { success: false, 'error-codes': [`http-${response.status}`] }
  return (await response.json()) as SiteverifyResult
}

/**
 * Rejects a form submission without a valid Turnstile token.
 *
 * With TURNSTILE_SECRET_KEY unset the check is skipped, so local development
 * works without Cloudflare keys. Production must set it, along with
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY on the website.
 */
export async function requireTurnstile(req: Request, res: Response, next: NextFunction) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    if (!warnedMissingSecret) {
      console.warn('[turnstile] TURNSTILE_SECRET_KEY is not set; form CAPTCHA checks are disabled')
      warnedMissingSecret = true
    }
    next()
    return
  }

  const header = req.headers[TURNSTILE_HEADER]
  const token = (Array.isArray(header) ? header[0] : header)?.trim()
  if (!token) {
    res.status(400).json({ error: 'Please complete the security check and try again.' })
    return
  }

  try {
    const result = await verifyTurnstile(token, clientIp(req))
    if (!result.success) {
      res.status(403).json({ error: 'The security check failed or expired. Please try again.' })
      return
    }
    next()
  } catch (error) {
    // Cloudflare unreachable: refuse rather than let unchecked submissions in.
    console.error('[turnstile] verification request failed', error)
    res.status(503).json({ error: 'We could not verify the security check. Please try again in a moment.' })
  }
}
