import { Router } from 'express'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import {
  getRazorpayKeys,
  createRazorpayOrder,
  verifyRazorpaySignature,
  generateLicenseKey,
} from '../lib/razorpay'

const router = Router()

// Public-facing columns only — never expose r2_key (the private file location).
const PUBLIC_COLUMNS =
  'id, slug, title, summary, description, category, price_inr, price_usd, cover_image, gallery, features, tech_stack, demo_url, version, is_featured, display_order, created_at'

function cleanStr(v: unknown, max: number): string {
  return typeof v === 'string' ? v.trim().slice(0, max) : ''
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

router.get('/store/products', async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .select(PUBLIC_COLUMNS)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('store:products', error)
    res.status(500).json({ error: 'Failed to fetch products', details: getErrorMessage(error) })
  }
})

router.get('/store/products/:slug', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('store_products')
      .select(PUBLIC_COLUMNS)
      .eq('slug', req.params.slug)
      .eq('is_active', true)
      .maybeSingle()

    if (error) throw error
    if (!data) {
      res.status(404).json({ error: 'Product not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('store:product', error)
    res.status(500).json({ error: 'Failed to fetch product', details: getErrorMessage(error) })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Guest checkout (no login). The price is read from the DB — never trusted from
// the client — and a pending purchase row is written BEFORE payment so every
// paid order has an entitlement record for download/license.
// ─────────────────────────────────────────────────────────────────────────────
router.post('/store/checkout', async (req, res) => {
  try {
    const keys = getRazorpayKeys()
    if (!keys) {
      res.status(503).json({ error: 'Payments are not configured yet. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' })
      return
    }

    const productId = cleanStr(req.body?.productId, 60)
    const name = cleanStr(req.body?.name, 120)
    const email = cleanStr(req.body?.email, 200).toLowerCase()
    const phone = cleanStr(req.body?.phone, 20)
    if (!productId) {
      res.status(400).json({ error: 'Missing product' })
      return
    }
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'A valid email is required' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data: product, error: pErr } = await supabase
      .from('store_products')
      .select('id, slug, title, price_inr, is_active')
      .eq('id', productId)
      .eq('is_active', true)
      .maybeSingle()
    if (pErr) throw pErr
    if (!product) {
      res.status(404).json({ error: 'Product not available' })
      return
    }
    if (!product.price_inr || product.price_inr <= 0) {
      res.status(400).json({ error: 'This product is not purchasable yet' })
      return
    }

    const amountPaise = product.price_inr * 100
    const receipt = `store_${product.slug}_${Date.now()}`.slice(0, 40)
    const order = await createRazorpayOrder(keys, amountPaise, receipt, {
      productId: product.id,
      productTitle: product.title,
      email,
    })
    if (!order) {
      res.status(502).json({ error: 'Could not create payment order. Please try again.' })
      return
    }

    // Required: no payment is opened unless the purchase row is recorded.
    const { error: insErr } = await supabase.from('store_purchases').insert({
      product_id: product.id,
      customer_email: email,
      customer_name: name || null,
      amount: product.price_inr,
      currency: 'INR',
      provider: 'razorpay',
      razorpay_order_id: order.id,
      status: 'pending',
    })
    if (insErr) {
      logRouteError('store:checkout:insert', insErr)
      res.status(500).json({ error: 'Could not start checkout. Please try again.', details: getErrorMessage(insErr) })
      return
    }

    res.json({
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: keys.keyId,
        prefill: { name, email, contact: phone },
        product: { id: product.id, slug: product.slug, title: product.title, price_inr: product.price_inr },
      },
    })
  } catch (error) {
    logRouteError('store:checkout', error)
    res.status(500).json({ error: 'Checkout failed', details: getErrorMessage(error) })
  }
})

router.post('/store/verify', async (req, res) => {
  try {
    const keys = getRazorpayKeys()
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

    const supabase = getSupabaseAdmin()
    const { data: purchase, error: pErr } = await supabase
      .from('store_purchases')
      .select('id, status, license_key, product_id')
      .eq('razorpay_order_id', orderId)
      .maybeSingle()
    if (pErr) throw pErr
    if (!purchase) {
      res.status(404).json({ error: 'Purchase record not found for this order' })
      return
    }

    // Idempotent: reuse an existing license key if verify runs twice.
    const licenseKey = purchase.license_key || generateLicenseKey()
    const { error: updErr } = await supabase
      .from('store_purchases')
      .update({
        status: 'paid',
        razorpay_payment_id: paymentId,
        license_key: licenseKey,
        paid_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', orderId)
    if (updErr) throw updErr

    let product: { slug: string; title: string } | null = null
    if (purchase.product_id) {
      const { data } = await supabase
        .from('store_products')
        .select('slug, title')
        .eq('id', purchase.product_id)
        .maybeSingle()
      product = data
    }

    res.json({ data: { verified: true, licenseKey, product } })
  } catch (error) {
    logRouteError('store:verify', error)
    res.status(500).json({ error: 'Verification failed', details: getErrorMessage(error) })
  }
})

export default router
