import crypto from 'node:crypto'

// Base URL for building buyer-facing download links (used in emails).
export const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://nextgenfusion.in').replace(/\/+$/, '')

// Stateless, unguessable download tokens (HMAC of the purchase id). No extra
// column needed — the token is valid while the purchase stays under its limit.
export function downloadSecret(): string | null {
  return process.env.STORE_DOWNLOAD_SECRET || process.env.ADMIN_SESSION_SECRET || null
}

export function signDownloadToken(purchaseId: string, secret: string): string {
  const sig = crypto.createHmac('sha256', secret).update(purchaseId).digest('base64url')
  return `${purchaseId}.${sig}`
}

export function verifyDownloadToken(token: string, secret: string): string | null {
  const idx = token.lastIndexOf('.')
  if (idx <= 0) return null
  const purchaseId = token.slice(0, idx)
  const sig = token.slice(idx + 1)
  const expected = crypto.createHmac('sha256', secret).update(purchaseId).digest('base64url')
  if (sig.length !== expected.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  return purchaseId
}

export function buildDownloadUrl(purchaseId: string, secret: string): string {
  return `${PUBLIC_SITE_URL}/api/store/download?token=${encodeURIComponent(signDownloadToken(purchaseId, secret))}`
}
