import { Router } from 'express'
import crypto from 'node:crypto'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

// ─────────────────────────────────────────────────────────────────────────────
// Subscription plan catalog. Prices are managed from the admin panel and stored
// in the `subscription_plans` table — that table is the price authority. The
// hardcoded DEFAULT_PLANS below are a fallback used only if the table is missing
// or empty. Amounts are in INR rupees; Razorpay is charged in paise (× 100).
// ─────────────────────────────────────────────────────────────────────────────
type BillingPeriod = 'year' | 'month'
type Plan = {
  id: string
  name: string
  amount: number // INR rupees
  period: BillingPeriod
  tagline?: string
  features?: string[]
  highlighted?: boolean
}

const DEFAULT_PLANS: Plan[] = [
  { id: 'website-support', name: 'Website Support', amount: 2000, period: 'year', tagline: 'Keep your site healthy.', features: ['Uptime monitoring', 'Security & plugin updates', 'Bug fixes', 'Email support'] },
  { id: 'support-changes-wp', name: 'Support + Changes', amount: 15000, period: 'year', tagline: 'For WordPress & Shopify sites.', highlighted: true, features: ['Everything in Website Support', 'Content & design change requests', 'Product / page updates', 'Priority email support'] },
  { id: 'support-changes-custom', name: 'Support + Changes (Custom)', amount: 5000, period: 'month', tagline: 'For custom-coded sites & apps.', features: ['Dedicated developer support', 'Ongoing changes & enhancements', 'Performance & SEO upkeep', 'Large changes quoted separately'] },
  { id: 'product-catalog', name: 'Product Catalog Access', amount: 4999, period: 'year', tagline: 'Upload & manage your products.', features: ['Access the product upload tools in your portal', 'Add & manage products with variants', 'Bulk CSV import', 'WooCommerce / Shopify CSV export'] },
]

// Active plans, sourced from the admin-managed table with a safe fallback.
async function getActivePlans(): Promise<Plan[]> {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('subscription_plans')
      .select('id, name, amount, period, tagline, features, highlighted, active, sort_order')
      .eq('active', true)
      .order('sort_order', { ascending: true })
    if (error || !data || data.length === 0) return DEFAULT_PLANS
    return data.map((r) => ({
      id: r.id,
      name: r.name,
      amount: r.amount,
      period: r.period as BillingPeriod,
      tagline: r.tagline ?? undefined,
      features: Array.isArray(r.features) ? (r.features as string[]) : [],
      highlighted: !!r.highlighted,
    }))
  } catch {
    return DEFAULT_PLANS
  }
}

async function getPlanById(id: string): Promise<Plan | null> {
  const plans = await getActivePlans()
  return plans.find((p) => p.id === id) ?? null
}

function getKeys() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return { keyId, keySecret }
}

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function cleanStr(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

// Public list of plans (display + cross-checking on the client).
router.get('/payments/plans', async (_req, res) => {
  res.json({ data: await getActivePlans() })
})

// Create a Razorpay order for the chosen plan.
router.post('/payments/razorpay/order', async (req, res) => {
  try {
    const keys = getKeys()
    if (!keys) {
      res.status(503).json({ error: 'Payments are not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' })
      return
    }

    const planId = cleanStr(req.body?.planId, 60)
    const plan = await getPlanById(planId)
    if (!plan) {
      res.status(400).json({ error: 'Unknown plan' })
      return
    }

    const name = cleanStr(req.body?.name, 120)
    const email = cleanStr(req.body?.email, 180).toLowerCase()
    const phone = cleanStr(req.body?.phone, 40)
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' })
      return
    }

    const amountPaise = plan.amount * 100
    const receipt = `sub_${plan.id}_${Date.now()}`.slice(0, 40)

    const auth = Buffer.from(`${keys.keyId}:${keys.keySecret}`).toString('base64')
    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${auth}` },
      body: JSON.stringify({
        amount: amountPaise,
        currency: 'INR',
        receipt,
        notes: { planId: plan.id, planName: plan.name, period: plan.period, email },
      }),
    })

    if (!rzpRes.ok) {
      const detail = await rzpRes.text()
      console.error('[payments] Razorpay order failed:', rzpRes.status, detail)
      res.status(502).json({ error: 'Could not create payment order. Please try again.' })
      return
    }

    const order = (await rzpRes.json()) as { id: string; amount: number; currency: string }

    // Best-effort persistence — never block checkout if storage is missing.
    try {
      const sb = getSupabaseAdmin()
      const { error } = await sb.from('subscription_orders').insert({
        plan_id: plan.id,
        plan_name: plan.name,
        period: plan.period,
        amount: amountPaise,
        currency: 'INR',
        customer_name: name,
        customer_email: email,
        customer_phone: phone || null,
        razorpay_order_id: order.id,
        status: 'created',
      })
      if (error && !isMissingTableError(error)) {
        console.error('[payments] order insert error:', error.message)
      }
    } catch (e) {
      console.error('[payments] order persistence skipped:', e instanceof Error ? e.message : e)
    }

    res.json({
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keys.keyId,
        plan: { id: plan.id, name: plan.name, period: plan.period, amount: plan.amount },
      },
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Order failed' })
  }
})

// Verify the payment signature after Razorpay Checkout completes.
router.post('/payments/razorpay/verify', async (req, res) => {
  try {
    const keys = getKeys()
    if (!keys) {
      res.status(503).json({ error: 'Payments are not configured.' })
      return
    }

    const orderId = cleanStr(req.body?.razorpay_order_id, 80)
    const paymentId = cleanStr(req.body?.razorpay_payment_id, 80)
    const signature = cleanStr(req.body?.razorpay_signature, 200)
    if (!orderId || !paymentId || !signature) {
      res.status(400).json({ error: 'Missing payment fields' })
      return
    }

    const expected = crypto
      .createHmac('sha256', keys.keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    const valid =
      expected.length === signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))

    if (!valid) {
      res.status(400).json({ error: 'Payment verification failed' })
      return
    }

    try {
      const sb = getSupabaseAdmin()
      const { error } = await sb
        .from('subscription_orders')
        .update({ status: 'paid', razorpay_payment_id: paymentId, paid_at: new Date().toISOString() })
        .eq('razorpay_order_id', orderId)
      if (error && !isMissingTableError(error)) {
        console.error('[payments] order update error:', error.message)
      }
    } catch (e) {
      console.error('[payments] paid-update skipped:', e instanceof Error ? e.message : e)
    }

    res.json({ data: { verified: true } })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Verification failed' })
  }
})

export default router
