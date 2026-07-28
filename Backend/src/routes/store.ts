import { Router } from 'express'
import crypto from 'node:crypto'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import {
  getRazorpayKeys,
  createRazorpayOrder,
  verifyRazorpaySignature,
  generateLicenseKey,
} from '../lib/razorpay'
import { isR2Configured, presignR2Download } from '../lib/r2'
import { sendProductDeliveryEmail } from '../lib/email'

const router = Router()

// Base URL for building buyer-facing download links (used in emails).
const PUBLIC_SITE_URL = (process.env.PUBLIC_SITE_URL || 'https://nextgenfusion.in').replace(/\/+$/, '')

// Stateless, unguessable download tokens (HMAC of the purchase id). No extra
// column needed — the token is valid while the purchase stays under its limit.
function downloadSecret(): string | null {
  return process.env.STORE_DOWNLOAD_SECRET || process.env.ADMIN_SESSION_SECRET || null
}
function signDownloadToken(purchaseId: string, secret: string): string {
  const sig = crypto.createHmac('sha256', secret).update(purchaseId).digest('base64url')
  return `${purchaseId}.${sig}`
}
function verifyDownloadToken(token: string, secret: string): string | null {
  const idx = token.lastIndexOf('.')
  if (idx <= 0) return null
  const purchaseId = token.slice(0, idx)
  const sig = token.slice(idx + 1)
  const expected = crypto.createHmac('sha256', secret).update(purchaseId).digest('base64url')
  if (sig.length !== expected.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null
  return purchaseId
}
function buildDownloadUrl(purchaseId: string, secret: string): string {
  return `${PUBLIC_SITE_URL}/api/store/download?token=${encodeURIComponent(signDownloadToken(purchaseId, secret))}`
}

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
      .select('id, status, license_key, product_id, customer_email, customer_name')
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

    const secret = downloadSecret()
    const downloadUrl = secret ? buildDownloadUrl(purchase.id, secret) : null

    // Email the license + download link (best-effort — never fail the purchase).
    if (downloadUrl && product && purchase.customer_email) {
      sendProductDeliveryEmail({
        to: purchase.customer_email,
        name: purchase.customer_name,
        productTitle: product.title,
        licenseKey,
        downloadUrl,
      }).catch((e) => logRouteError('store:verify:email', e))
    }

    res.json({ data: { verified: true, licenseKey, product, downloadUrl } })
  } catch (error) {
    logRouteError('store:verify', error)
    res.status(500).json({ error: 'Verification failed', details: getErrorMessage(error) })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// Secure download: validate the token + entitlement, count the download, then
// 302 to a short-lived R2 presigned URL (the file streams from R2, not us).
// ─────────────────────────────────────────────────────────────────────────────
router.get('/store/download', async (req, res) => {
  try {
    const secret = downloadSecret()
    if (!secret) {
      res.status(503).json({ error: 'Downloads are not configured (missing STORE_DOWNLOAD_SECRET).' })
      return
    }
    const token = typeof req.query.token === 'string' ? req.query.token : ''
    const purchaseId = token ? verifyDownloadToken(token, secret) : null
    if (!purchaseId) {
      res.status(403).json({ error: 'Invalid download link' })
      return
    }

    const supabase = getSupabaseAdmin()
    const { data: purchase, error } = await supabase
      .from('store_purchases')
      .select('id, status, download_count, download_limit, product_id')
      .eq('id', purchaseId)
      .maybeSingle()
    if (error) throw error
    if (!purchase || purchase.status !== 'paid') {
      res.status(403).json({ error: 'No paid purchase found for this link' })
      return
    }
    if (purchase.download_count >= purchase.download_limit) {
      res.status(429).json({ error: 'Download limit reached. Contact support if you need access again.' })
      return
    }

    const { data: product } = await supabase
      .from('store_products')
      .select('title, r2_key')
      .eq('id', purchase.product_id)
      .maybeSingle()
    if (!product?.r2_key) {
      res.status(503).json({ error: 'The file for this product is not available yet.' })
      return
    }
    if (!isR2Configured()) {
      res.status(503).json({ error: 'File storage is not configured.' })
      return
    }

    const filename = `${(product.title || 'product').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.zip`
    const url = await presignR2Download(product.r2_key, 900, filename)
    if (!url) {
      res.status(502).json({ error: 'Could not generate the download link.' })
      return
    }

    await supabase
      .from('store_purchases')
      .update({ download_count: purchase.download_count + 1 })
      .eq('id', purchase.id)

    res.redirect(302, url)
  } catch (error) {
    logRouteError('store:download', error)
    res.status(500).json({ error: 'Download failed', details: getErrorMessage(error) })
  }
})

// Re-send download links for all paid purchases tied to an email (guest re-download).
router.post('/store/purchases/resend', async (req, res) => {
  try {
    const email = cleanStr(req.body?.email, 200).toLowerCase()
    if (!EMAIL_RE.test(email)) {
      res.status(400).json({ error: 'A valid email is required' })
      return
    }
    const secret = downloadSecret()
    const supabase = getSupabaseAdmin()
    const { data: purchases } = await supabase
      .from('store_purchases')
      .select('id, license_key, product_id, customer_name')
      .eq('customer_email', email)
      .eq('status', 'paid')

    if (secret && purchases && purchases.length > 0) {
      for (const p of purchases) {
        const { data: product } = await supabase
          .from('store_products')
          .select('title')
          .eq('id', p.product_id)
          .maybeSingle()
        if (!product) continue
        await sendProductDeliveryEmail({
          to: email,
          name: p.customer_name,
          productTitle: product.title,
          licenseKey: p.license_key || '—',
          downloadUrl: buildDownloadUrl(p.id, secret),
        }).catch((e) => logRouteError('store:resend:email', e))
      }
    }
    // Generic response — never reveal whether an email has purchases.
    res.json({ data: { ok: true } })
  } catch (error) {
    logRouteError('store:resend', error)
    res.status(500).json({ error: 'Could not process request', details: getErrorMessage(error) })
  }
})

export default router
