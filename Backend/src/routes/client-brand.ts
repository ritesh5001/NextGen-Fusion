import { Router } from 'express'
import multer from 'multer'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { buildDeliveryUrl, uploadImageBufferToFolder } from '../lib/cloudinary'
import { parseBrief } from '../lib/wp-plugin-generator'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'))
  },
})

// GET /api/admin/clients/:id/brand — the saved brand profile (empty object if none).
router.get('/clients/:id/brand', requireInternalAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('client_brand_profiles')
      .select('profile')
      .eq('client_id', req.params.id)
      .maybeSingle()
    if (error) throw error
    res.json({ data: { profile: data?.profile ?? {} } })
  } catch (error) {
    logRouteError('client-brand:get', error)
    res.status(502).json({ error: 'Could not load brand profile', details: getErrorMessage(error) })
  }
})

// PUT /api/admin/clients/:id/brand — upsert the whole brand profile.
router.put('/clients/:id/brand', requireInternalAuth, async (req, res) => {
  try {
    const profile = req.body?.profile
    if (!profile || typeof profile !== 'object' || Array.isArray(profile)) {
      res.status(400).json({ error: 'profile must be an object' })
      return
    }
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('client_brand_profiles')
      .upsert({ client_id: req.params.id, profile }, { onConflict: 'client_id' })
      .select('profile')
      .single()
    if (error) throw error
    res.json({ data: { profile: data.profile } })
  } catch (error) {
    logRouteError('client-brand:save', error)
    res.status(502).json({ error: 'Could not save brand profile', details: getErrorMessage(error) })
  }
})

// POST /api/admin/clients/:id/brand/parse — turn a free-text brief into structured
// brand fields (same parser the WP plugin generator uses).
router.post('/clients/:id/brand/parse', requireInternalAuth, async (req, res) => {
  try {
    const text = typeof req.body?.text === 'string' ? req.body.text.trim() : ''
    if (!text) {
      res.status(400).json({ error: 'Paste some text to parse' })
      return
    }
    if (text.length > 20000) {
      res.status(400).json({ error: 'Text is too long — keep it under 20,000 characters' })
      return
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      res.status(503).json({ error: 'Anthropic is not configured' })
      return
    }
    const data = await parseBrief(text)
    res.json({ data })
  } catch (error) {
    logRouteError('client-brand:parse', error)
    res.status(502).json({ error: 'Could not parse the text', details: getErrorMessage(error) })
  }
})

// POST /api/admin/clients/:id/brand/upload — logo / product images → Cloudinary.
router.post(
  '/clients/:id/brand/upload',
  requireInternalAuth,
  upload.array('files', 8),
  async (req, res) => {
    try {
      const files = (req.files as Express.Multer.File[] | undefined) ?? []
      if (!files.length) {
        res.status(400).json({ error: 'No image files provided' })
        return
      }
      const data: { public_id: string; url: string }[] = []
      for (const file of files) {
        const uploaded = await uploadImageBufferToFolder(
          file.buffer,
          `ngf/clients/${req.params.id}/brand`,
          file.originalname,
        )
        data.push({ public_id: uploaded.public_id, url: buildDeliveryUrl(uploaded.public_id) })
      }
      res.status(201).json({ data })
    } catch (error) {
      logRouteError('client-brand:upload', error)
      res.status(502).json({ error: 'Could not upload images', details: getErrorMessage(error) })
    }
  },
)

export default router
