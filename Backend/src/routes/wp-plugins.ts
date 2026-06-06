import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import {
  extractPalette,
  generatePluginFiles,
  parseBrief,
  type PluginInputs,
} from '../lib/wp-plugin-generator'
import { isAiProviderConfigured, providerLabel, resolveProvider } from '../lib/anthropic'
import { buildZip } from '../lib/wp-plugin-zip'

const router = Router()
const BUCKET = 'wp-plugins'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function derivePrefix(name: string): string {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
  return initials || slugify(name).replace(/-/g, '').slice(0, 4) || 'ngf'
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function normalizeInputs(body: unknown): PluginInputs | { error: string } {
  if (!body || typeof body !== 'object') return { error: 'Invalid request body' }
  const b = body as Record<string, unknown>

  const businessName = typeof b.businessName === 'string' ? b.businessName.trim() : ''
  if (!businessName) return { error: 'Business name is required' }
  if (!isHttpsUrl(b.logoUrl)) return { error: 'A valid https logo URL is required' }

  const cssPrefix =
    (typeof b.cssPrefix === 'string' && b.cssPrefix.trim().toLowerCase().replace(/[^a-z0-9]/g, '')) ||
    derivePrefix(businessName)
  const pluginSlug =
    (typeof b.pluginSlug === 'string' && slugify(b.pluginSlug)) || slugify(businessName)

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : undefined)
  const bool = (v: unknown) => v === true || v === 'true' || v === 'yes' || v === '1'

  const social =
    b.social && typeof b.social === 'object' ? (b.social as Record<string, unknown>) : {}
  const pageContent =
    b.pageContent && typeof b.pageContent === 'object' ? (b.pageContent as Record<string, unknown>) : {}
  const policy =
    b.policy && typeof b.policy === 'object' ? (b.policy as Record<string, unknown>) : {}

  return {
    businessName,
    cssPrefix,
    pluginSlug,
    websiteUrl: str(b.websiteUrl) || `${pluginSlug}.com`,
    logoUrl: b.logoUrl as string,
    tagline: str(b.tagline),
    description: str(b.description),
    contactEmail: str(b.contactEmail),
    whatsapp: str(b.whatsapp)?.replace(/[^0-9]/g, ''),
    country: str(b.country),
    targetAudience: str(b.targetAudience),
    social: {
      instagram: str(social.instagram),
      linkedin: str(social.linkedin),
      twitter: str(social.twitter),
      youtube: str(social.youtube),
      facebook: str(social.facebook),
    },
    pageContent: {
      home: str(pageContent.home),
      about: str(pageContent.about),
      services: str(pageContent.services),
      contact: str(pageContent.contact),
    },
    policy: {
      refundDays: str(policy.refundDays),
      physicalProducts: bool(policy.physicalProducts),
      paymentGateways: str(policy.paymentGateways),
      recurringBilling: bool(policy.recurringBilling),
      specialLegal: str(policy.specialLegal),
    },
    extraPages: str(b.extraPages),
    aiProvider: resolveProvider(b.aiProvider ?? b.provider),
  }
}

async function runGeneration(id: string, inputs: PluginInputs): Promise<void> {
  const sb = getSupabaseAdmin()
  try {
    await sb.from('wp_plugin_generations').update({ status: 'running' }).eq('id', id)

    const palette = await extractPalette(inputs.logoUrl)
    await sb.from('wp_plugin_generations').update({ palette }).eq('id', id)

    const plugins = await generatePluginFiles(inputs, palette)
    const [pagesZip, hfZip] = await Promise.all([
      buildZip(plugins.pages),
      buildZip(plugins.hf),
    ])

    const up1 = await sb.storage
      .from(BUCKET)
      .upload(`${id}/${plugins.slug}-pages.zip`, pagesZip, {
        contentType: 'application/zip',
        upsert: true,
      })
    if (up1.error) throw up1.error
    const up2 = await sb.storage
      .from(BUCKET)
      .upload(`${id}/${plugins.slug}-hf.zip`, hfZip, {
        contentType: 'application/zip',
        upsert: true,
      })
    if (up2.error) throw up2.error

    await sb.from('wp_plugin_generations').update({ status: 'done' }).eq('id', id)
  } catch (error) {
    logRouteError('wp-plugins:generate:run', error)
    await sb
      .from('wp_plugin_generations')
      .update({ status: 'error', error: getErrorMessage(error) })
      .eq('id', id)
  }
}

// POST /api/admin/wp-plugins/generate — kicks off an async generation job.
router.post('/wp-plugins/generate', requireInternalAuth, async (req, res) => {
  try {
    const inputs = normalizeInputs(req.body)
    if ('error' in inputs) {
      res.status(400).json({ error: inputs.error })
      return
    }
    if (!isAiProviderConfigured(inputs.aiProvider ?? 'claude')) {
      res.status(503).json({ error: `${providerLabel(inputs.aiProvider ?? 'claude')} is not configured` })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('wp_plugin_generations')
      .insert({
        status: 'pending',
        business_name: inputs.businessName,
        plugin_slug: inputs.pluginSlug,
        inputs,
      })
      .select('id')
      .single()
    if (error) throw error

    const id = data.id as string
    // Fire-and-forget background work (low-volume internal tool, no queue infra).
    void runGeneration(id, inputs)

    res.status(202).json({ id })
  } catch (error) {
    logRouteError('wp-plugins:generate', error)
    res.status(502).json({ error: 'Could not start generation', details: getErrorMessage(error) })
  }
})

// POST /api/admin/wp-plugins/parse — turns a free-text brief into structured
// form fields so the user can paste everything at once instead of field-by-field.
router.post('/wp-plugins/parse', requireInternalAuth, async (req, res) => {
  try {
    const body = req.body as Record<string, unknown> | undefined
    const text = body && typeof body.text === 'string' ? body.text.trim() : ''
    if (!text) {
      res.status(400).json({ error: 'Paste some text to parse' })
      return
    }
    if (text.length > 20000) {
      res.status(400).json({ error: 'Text is too long — keep it under 20,000 characters' })
      return
    }
    const provider = resolveProvider(body?.aiProvider ?? body?.provider)
    if (!isAiProviderConfigured(provider)) {
      res.status(503).json({ error: `${providerLabel(provider)} is not configured` })
      return
    }

    const data = await parseBrief(text, provider)
    res.json({ data })
  } catch (error) {
    logRouteError('wp-plugins:parse', error)
    res.status(502).json({ error: 'Could not parse the text', details: getErrorMessage(error) })
  }
})

// GET /api/admin/wp-plugins — history list.
router.get('/wp-plugins', requireInternalAuth, async (_req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('wp_plugin_generations')
      .select('id, status, business_name, plugin_slug, palette, error, created_at')
      .order('created_at', { ascending: false })
      .limit(50)
    if (error) throw error
    res.json({ data })
  } catch (error) {
    logRouteError('wp-plugins:list', error)
    res.status(502).json({ error: 'Could not load generations', details: getErrorMessage(error) })
  }
})

// GET /api/admin/wp-plugins/download/:id?plugin=pages|hf — streams a stored zip.
router.get('/wp-plugins/download/:id', requireInternalAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { id } = req.params
    const which = req.query.plugin === 'hf' ? 'hf' : 'pages'

    const { data: row, error } = await sb
      .from('wp_plugin_generations')
      .select('status, plugin_slug')
      .eq('id', id)
      .single()
    if (error || !row) {
      res.status(404).json({ error: 'Generation not found' })
      return
    }
    if (row.status !== 'done') {
      res.status(409).json({ error: 'Generation is not ready yet' })
      return
    }

    const filename = `${row.plugin_slug}-${which}.zip`
    const dl = await sb.storage.from(BUCKET).download(`${id}/${filename}`)
    if (dl.error || !dl.data) {
      res.status(404).json({ error: 'Plugin file not found' })
      return
    }

    const buffer = Buffer.from(await dl.data.arrayBuffer())
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(buffer)
  } catch (error) {
    logRouteError('wp-plugins:download', error)
    res.status(502).json({ error: 'Could not download plugin', details: getErrorMessage(error) })
  }
})

// GET /api/admin/wp-plugins/:id — status polling.
router.get('/wp-plugins/:id', requireInternalAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('wp_plugin_generations')
      .select('id, status, business_name, plugin_slug, palette, error, created_at')
      .eq('id', req.params.id)
      .single()
    if (error || !data) {
      res.status(404).json({ error: 'Generation not found' })
      return
    }
    res.json({ data })
  } catch (error) {
    logRouteError('wp-plugins:status', error)
    res.status(502).json({ error: 'Could not load generation', details: getErrorMessage(error) })
  }
})

export default router
