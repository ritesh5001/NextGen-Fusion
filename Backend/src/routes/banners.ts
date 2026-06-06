import { Router } from 'express'
import multer from 'multer'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { buildBannerUrl, buildDeliveryUrl, uploadImageBufferToFolder } from '../lib/cloudinary'
import {
  generateBanner,
  type BannerInputs,
  type BannerProvider,
  type BannerRatio,
  type BannerType,
} from '../lib/banner-generator'
import type { ImageQuality } from '../lib/openai'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'))
  },
})

const RATIOS: BannerRatio[] = ['16:9', '7:3', '1:1']
const TYPES: BannerType[] = ['ecommerce', 'service']
const QUALITIES: ImageQuality[] = ['low', 'medium', 'high']
const PROVIDERS: BannerProvider[] = ['openai', 'fal', 'gemini']

// Which env var must be set for each image provider.
const PROVIDER_ENV: Record<BannerProvider, string> = {
  openai: 'OPENAI_API_KEY',
  fal: 'FAL_KEY',
  gemini: 'GEMINI_API_KEY',
}

const ROW_COLUMNS =
  'id, status, provider, banner_type, mode, ratio, quality, image_url, error, created_at'

function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

function normalizeInputs(body: unknown): BannerInputs | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body' }
  const b = body as Record<string, unknown>

  const brandName = str(b.brandName)
  if (!brandName) return { error: 'Brand name is required' }

  const bannerType = TYPES.includes(b.bannerType as BannerType)
    ? (b.bannerType as BannerType)
    : 'ecommerce'
  const mode = b.mode === 'guided' ? 'guided' : 'auto'
  const ratio = RATIOS.includes(b.ratio as BannerRatio) ? (b.ratio as BannerRatio) : '16:9'
  const provider = PROVIDERS.includes(b.provider as BannerProvider)
    ? (b.provider as BannerProvider)
    : 'openai'
  const quality = QUALITIES.includes(b.quality as ImageQuality)
    ? (b.quality as ImageQuality)
    : 'high'

  const productImageUrls = Array.isArray(b.productImageUrls)
    ? b.productImageUrls.filter((u): u is string => typeof u === 'string' && !!u.trim())
    : []

  return {
    bannerType,
    mode,
    ratio,
    provider,
    quality,
    brandName,
    websiteUrl: str(b.websiteUrl),
    tagline: str(b.tagline),
    brief: str(b.brief),
    headline: str(b.headline),
    subtext: str(b.subtext),
    cta: str(b.cta),
    background: str(b.background),
    colors: str(b.colors),
    productImageUrls,
  }
}

async function runBannerGeneration(id: string, inputs: BannerInputs): Promise<void> {
  const sb = getSupabaseAdmin()
  try {
    await sb.from('banner_generations').update({ status: 'running' }).eq('id', id)

    const { buffer, prompt } = await generateBanner(inputs)

    const uploaded = await uploadImageBufferToFolder(buffer, 'ngf/banners/outputs', `${id}.png`)
    const imageUrl = buildBannerUrl(uploaded.public_id, inputs.ratio)

    await sb
      .from('banner_generations')
      .update({ status: 'done', public_id: uploaded.public_id, image_url: imageUrl, prompt })
      .eq('id', id)
  } catch (error) {
    logRouteError('banners:generate:run', error)
    await sb
      .from('banner_generations')
      .update({ status: 'error', error: getErrorMessage(error) })
      .eq('id', id)
  }
}

// POST /api/admin/banners/upload — uploads product images to Cloudinary and
// returns their delivery URLs to be passed back into /generate.
router.post('/banners/upload', requireInternalAuth, upload.array('files', 6), async (req, res) => {
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
        'ngf/banners/inputs',
        file.originalname,
      )
      data.push({ public_id: uploaded.public_id, url: buildDeliveryUrl(uploaded.public_id) })
    }

    res.status(201).json({ data })
  } catch (error) {
    logRouteError('banners:upload', error)
    res.status(502).json({ error: 'Could not upload images', details: getErrorMessage(error) })
  }
})

// POST /api/admin/banners/generate — kicks off an async banner generation job.
router.post('/banners/generate', requireInternalAuth, async (req, res) => {
  try {
    const inputs = normalizeInputs(req.body)
    if ('error' in inputs) {
      res.status(400).json({ error: inputs.error })
      return
    }
    const providerEnv = PROVIDER_ENV[inputs.provider]
    if (!process.env[providerEnv]) {
      res.status(503).json({ error: `${inputs.provider} is not configured (missing ${providerEnv})` })
      return
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      res.status(503).json({ error: 'Anthropic is not configured (needed to craft the prompt)' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('banner_generations')
      .insert({
        status: 'pending',
        provider: inputs.provider,
        banner_type: inputs.bannerType,
        mode: inputs.mode,
        ratio: inputs.ratio,
        quality: inputs.quality,
        inputs,
        product_image_urls: inputs.productImageUrls,
      })
      .select('id')
      .single()
    if (error) throw error

    const id = data.id as string
    // Fire-and-forget background work (low-volume internal tool, no queue infra).
    void runBannerGeneration(id, inputs)

    res.status(202).json({ id })
  } catch (error) {
    logRouteError('banners:generate', error)
    res.status(502).json({ error: 'Could not start generation', details: getErrorMessage(error) })
  }
})

// GET /api/admin/banners — history list.
router.get('/banners', requireInternalAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('banner_generations')
      .select(ROW_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('banners:list', error)
    res.status(502).json({ error: 'Could not load banners', details: getErrorMessage(error) })
  }
})

// GET /api/admin/banners/:id — status polling.
router.get('/banners/:id', requireInternalAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('banner_generations')
      .select(ROW_COLUMNS)
      .eq('id', req.params.id)
      .single()
    if (error || !data) {
      res.status(404).json({ error: 'Banner not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('banners:status', error)
    res.status(502).json({ error: 'Could not load banner', details: getErrorMessage(error) })
  }
})

export default router
