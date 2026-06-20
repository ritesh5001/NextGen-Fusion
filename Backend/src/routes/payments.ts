import { Router } from 'express'
import crypto from 'node:crypto'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireClient } from '../middleware/auth'
import { normalizeAllowedTools, type ClientTool } from '../lib/client-subscription'

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

// Maps a plan id to the portal tool it unlocks on successful payment.
const PLAN_TOOL_GRANTS: Record<string, ClientTool> = {
  'product-catalog': 'product_catalog',
}

const DEFAULT_PLANS: Plan[] = [
  { id: 'website-support', name: 'Website Support', amount: 2000, period: 'year', tagline: 'Keep your site healthy.', features: ['Uptime monitoring', 'Security & plugin updates', 'Bug fixes', 'Email support'] },
  { id: 'support-changes-wp', name: 'Support + Changes', amount: 15000, period: 'year', tagline: 'For WordPress & Shopify sites.', highlighted: true, features: ['Everything in Website Support', 'Content & design change requests', 'Product / page updates', 'Priority email support'] },
  { id: 'support-changes-custom', name: 'Support + Changes (Custom)', amount: 5000, period: 'month', tagline: 'For custom-coded sites & apps.', features: ['Dedicated developer support', 'Ongoing changes & enhancements', 'Performance & SEO upkeep', 'Large changes quoted separately'] },
  { id: 'product-catalog', name: 'Product Catalog Access', amount: 500, period: 'year', tagline: 'Upload & manage your products.', features: ['Access the product upload tools in your portal', 'Add & manage products with variants', 'Bulk CSV import', 'WooCommerce / Shopify CSV export'] },
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

type RazorpayOrder = { id: string; amount: number; currency: string }

// Creates a Razorpay order via their REST API. Returns the order or null on failure.
async function createRazorpayOrder(
  keys: { keyId: string; keySecret: string },
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
    console.error('[payments] Razorpay order failed:', rzpRes.status, detail)
    return null
  }
  return (await rzpRes.json()) as RazorpayOrder
}

// Constant-time HMAC verification of a Razorpay checkout signature.
function verifyRazorpaySignature(keySecret: string, orderId: string, paymentId: string, signature: string): boolean {
  const expected = crypto.createHmac('sha256', keySecret).update(`${orderId}|${paymentId}`).digest('hex')
  return (
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Public router — plan listing only. Checkout now requires a logged-in account
// and lives on the client router below.
// ─────────────────────────────────────────────────────────────────────────────
const router = Router()

router.get('/payments/plans', async (_req, res) => {
  res.json({ data: await getActivePlans() })
})

export default router

// ─────────────────────────────────────────────────────────────────────────────
// Client router — authenticated checkout. Mounted under /api/client. The buyer
// must be logged in; on a verified payment we grant the plan's tool to that
// exact account so access is immediate and tied to the logged-in user.
// ─────────────────────────────────────────────────────────────────────────────
export const clientPaymentsRouter = Router()

clientPaymentsRouter.post('/payments/order', requireClient, async (req, res) => {
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

    const sb = getSupabaseAdmin()
    const { data: client, error: clientError } = await sb
      .from('client_users')
      .select('id, name, email, phone')
      .eq('id', req.client_id)
      .single()
    if (clientError || !client) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const amountPaise = plan.amount * 100
    const receipt = `sub_${plan.id}_${Date.now()}`.slice(0, 40)
    const order = await createRazorpayOrder(keys, amountPaise, receipt, {
      planId: plan.id,
      planName: plan.name,
      period: plan.period,
      email: client.email,
      clientId: client.id,
    })
    if (!order) {
      res.status(502).json({ error: 'Could not create payment order. Please try again.' })
      return
    }

    // Best-effort persistence — never block checkout if storage is missing.
    try {
      const { error } = await sb.from('subscription_orders').insert({
        plan_id: plan.id,
        plan_name: plan.name,
        period: plan.period,
        amount: amountPaise,
        currency: 'INR',
        client_id: client.id,
        customer_name: client.name || '',
        customer_email: client.email,
        customer_phone: client.phone || null,
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
        prefill: { name: client.name || '', email: client.email, phone: client.phone || '' },
        plan: { id: plan.id, name: plan.name, period: plan.period, amount: plan.amount },
      },
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Order failed' })
  }
})

clientPaymentsRouter.post('/payments/verify', requireClient, async (req, res) => {
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

    if (!verifyRazorpaySignature(keys.keySecret, orderId, paymentId, signature)) {
      res.status(400).json({ error: 'Payment verification failed' })
      return
    }

    const sb = getSupabaseAdmin()

    // Resolve which plan was actually paid from the persisted order (authoritative),
    // falling back to the planId the client claims if storage is unavailable.
    let paidPlanId = cleanStr(req.body?.planId, 60)
    try {
      const { data: orderRow } = await sb
        .from('subscription_orders')
        .select('plan_id, client_id')
        .eq('razorpay_order_id', orderId)
        .single()
      if (orderRow?.plan_id) {
        // Only trust the stored order if it belongs to this logged-in client.
        if (orderRow.client_id && orderRow.client_id !== req.client_id) {
          res.status(403).json({ error: 'This order does not belong to your account' })
          return
        }
        paidPlanId = orderRow.plan_id
      }
    } catch {
      // Order row missing — fall back to the claimed planId below.
    }

    try {
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

    // Grant the unlocked tool to this account, if the paid plan maps to one.
    const plan = await getPlanById(paidPlanId)
    const tool = plan ? PLAN_TOOL_GRANTS[plan.id] : undefined
    if (plan && tool && req.client_id) {
      try {
        const { data: current } = await sb
          .from('client_users')
          .select('allowed_tools')
          .eq('id', req.client_id)
          .single()
        const merged = Array.from(new Set([...normalizeAllowedTools(current?.allowed_tools), tool]))

        const periodEnd = new Date()
        if (plan.period === 'month') periodEnd.setMonth(periodEnd.getMonth() + 1)
        else periodEnd.setFullYear(periodEnd.getFullYear() + 1)

        const { error } = await sb
          .from('client_users')
          .update({
            allowed_tools: merged,
            subscription_status: 'active',
            subscription_plan: plan.id,
            subscription_current_period_end: periodEnd.toISOString(),
          })
          .eq('id', req.client_id)
        if (error) console.error('[payments] tool grant error:', error.message)
      } catch (e) {
        console.error('[payments] tool grant skipped:', e instanceof Error ? e.message : e)
      }
    }

    res.json({ data: { verified: true, plan: plan ? { id: plan.id, name: plan.name } : null } })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Verification failed' })
  }
})
