import crypto from 'node:crypto'

export type RazorpayKeys = { keyId: string; keySecret: string }
export type RazorpayOrder = { id: string; amount: number; currency: string }

export function getRazorpayKeys(): RazorpayKeys | null {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return { keyId, keySecret }
}

// Creates a Razorpay order via their REST API. Returns the order or null on failure.
export async function createRazorpayOrder(
  keys: RazorpayKeys,
  amountPaise: number,
  receipt: string,
  notes: Record<string, string>,
): Promise<RazorpayOrder | null> {
  const auth = Buffer.from(`${keys.keyId}:${keys.keySecret}`).toString('base64')
  const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
    body: JSON.stringify({ amount: amountPaise, currency: 'INR', receipt, notes }),
  })
  if (!rzpRes.ok) {
    const detail = await rzpRes.text()
    console.error('[razorpay] order failed:', rzpRes.status, detail)
    return null
  }
  return (await rzpRes.json()) as RazorpayOrder
}

// Constant-time HMAC verification of a Razorpay checkout signature.
export function verifyRazorpaySignature(
  keySecret: string,
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  const expected = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex')
  return (
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  )
}

// A readable, unique license key: NGF-XXXXX-XXXXX-XXXXX-XXXXX (hex).
export function generateLicenseKey(): string {
  const raw = crypto.randomBytes(10).toString('hex').toUpperCase()
  return `NGF-${raw.slice(0, 5)}-${raw.slice(5, 10)}-${raw.slice(10, 15)}-${raw.slice(15, 20)}`
}
