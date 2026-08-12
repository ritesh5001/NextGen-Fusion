import { Router, type Response } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireInternalAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import {
  deleteWebhook,
  getMe,
  getWebhookInfo,
  setWebhook,
  TelegramError,
} from '../lib/productflow/telegram'
import {
  generateWebhookSecret,
  loadPfSettings,
  resolvePfAiProvider,
  savePfSettings,
  toPublicSettings,
} from '../lib/productflow/settings'

const router = Router()
router.use(requireInternalAuth)

function str(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

// Telegram's own rejection ("Unauthorized", "chat not found") is the useful
// message for the admin, so it is passed through instead of a generic 500.
function fail(res: Response, error: unknown, scope: string): void {
  if (error instanceof TelegramError) {
    res.status(502).json({ error: error.message })
    return
  }
  logRouteError(scope, error)
  res.status(500).json({ error: 'Something went wrong', details: getErrorMessage(error) })
}

// ── Settings ────────────────────────────────────────────────────────────────

router.get('/productflow/settings', async (_req, res) => {
  try {
    res.json({ data: toPublicSettings(await loadPfSettings()) })
  } catch (error) {
    fail(res, error, 'productflow:settings:get')
  }
})

router.patch('/productflow/settings', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const patch: Record<string, unknown> = {}

    if ('aiProvider' in body) patch.ai_provider = resolvePfAiProvider(body.aiProvider)
    if ('autoApprove' in body) patch.auto_approve = Boolean(body.autoApprove)

    if (Object.keys(patch).length) await savePfSettings(patch)
    res.json({ data: toPublicSettings(await loadPfSettings()) })
  } catch (error) {
    fail(res, error, 'productflow:settings:patch')
  }
})

// ── Telegram connection ─────────────────────────────────────────────────────

/**
 * Validates a bot token against Telegram's getMe before storing it, so an
 * invalid token can never be saved.
 */
router.post('/productflow/telegram/connect', async (req, res) => {
  try {
    const token = str((req.body ?? {}).botToken)
    if (!token) {
      res.status(400).json({ error: 'Bot token is required' })
      return
    }

    const bot = await getMe(token)

    const existing = await loadPfSettings()
    await savePfSettings({
      telegram_bot_token: token,
      telegram_bot_username: bot.username ?? null,
      telegram_bot_name: bot.first_name ?? null,
      telegram_connected_at: new Date().toISOString(),
      // Preserve the secret so an already-registered webhook keeps working.
      telegram_webhook_secret: existing.telegram_webhook_secret ?? generateWebhookSecret(),
    })

    res.json({ data: toPublicSettings(await loadPfSettings()) })
  } catch (error) {
    fail(res, error, 'productflow:telegram:connect')
  }
})

router.post('/productflow/telegram/disconnect', async (_req, res) => {
  try {
    const settings = await loadPfSettings()
    // Best-effort: clear the webhook at Telegram too, but still disconnect
    // locally even if that call fails (e.g. the token was already revoked).
    if (settings.telegram_bot_token) {
      await deleteWebhook(settings.telegram_bot_token).catch(() => {})
    }
    await savePfSettings({
      telegram_bot_token: null,
      telegram_bot_username: null,
      telegram_bot_name: null,
      telegram_webhook_url: null,
      telegram_webhook_secret: null,
      telegram_connected_at: null,
    })
    res.json({ data: toPublicSettings(await loadPfSettings()) })
  } catch (error) {
    fail(res, error, 'productflow:telegram:disconnect')
  }
})

router.get('/productflow/telegram/status', async (_req, res) => {
  try {
    const settings = await loadPfSettings()
    if (!settings.telegram_bot_token) {
      res.json({ data: { connected: false, webhook: null } })
      return
    }
    const info = await getWebhookInfo(settings.telegram_bot_token)
    res.json({
      data: {
        connected: true,
        webhook: {
          url: info.url,
          pendingUpdates: info.pending_update_count,
          lastErrorMessage: info.last_error_message ?? null,
          lastErrorAt: info.last_error_date
            ? new Date(info.last_error_date * 1000).toISOString()
            : null,
        },
      },
    })
  } catch (error) {
    fail(res, error, 'productflow:telegram:status')
  }
})

/**
 * Registers the webhook with Telegram. The public URL is supplied by the admin
 * because the Backend cannot know its own external hostname behind a proxy.
 */
router.post('/productflow/telegram/webhook', async (req, res) => {
  try {
    const settings = await loadPfSettings()
    if (!settings.telegram_bot_token) {
      res.status(400).json({ error: 'Connect a bot token first' })
      return
    }

    const baseUrl = str((req.body ?? {}).baseUrl)
    if (!baseUrl) {
      res.status(400).json({ error: 'Public base URL is required' })
      return
    }

    let url: URL
    try {
      url = new URL(baseUrl)
    } catch {
      res.status(400).json({ error: 'Public base URL is not a valid URL' })
      return
    }
    if (url.protocol !== 'https:') {
      res.status(400).json({ error: 'Telegram only accepts HTTPS webhook URLs' })
      return
    }

    const webhookUrl = `${url.origin}/api/productflow/telegram/webhook`
    const secret = settings.telegram_webhook_secret ?? generateWebhookSecret()

    await setWebhook(settings.telegram_bot_token, webhookUrl, secret)
    await savePfSettings({ telegram_webhook_url: webhookUrl, telegram_webhook_secret: secret })

    res.json({ data: { webhookUrl } })
  } catch (error) {
    fail(res, error, 'productflow:telegram:webhook:set')
  }
})

router.delete('/productflow/telegram/webhook', async (_req, res) => {
  try {
    const settings = await loadPfSettings()
    if (settings.telegram_bot_token) await deleteWebhook(settings.telegram_bot_token)
    await savePfSettings({ telegram_webhook_url: null })
    res.json({ data: { ok: true } })
  } catch (error) {
    fail(res, error, 'productflow:telegram:webhook:delete')
  }
})

// ── Clients ─────────────────────────────────────────────────────────────────

const CLIENT_COLUMNS =
  'id, name, source, external_user_id, external_chat_id, external_username, status, active_project_id, notes, last_message_at, created_at'

router.get('/productflow/clients', async (req, res) => {
  try {
    const status = str(req.query.status)
    let query = getSupabaseAdmin()
      .from('pf_clients')
      .select(CLIENT_COLUMNS)
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(200)

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:clients:list')
  }
})

router.patch('/productflow/clients/:id', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const patch: Record<string, unknown> = {}

    const name = str(body.name)
    if (name) patch.name = name
    if ('notes' in body) patch.notes = str(body.notes) ?? null
    if ('status' in body) {
      const status = str(body.status)
      if (!status || !['pending', 'active', 'blocked'].includes(status)) {
        res.status(400).json({ error: 'Status must be pending, active or blocked' })
        return
      }
      patch.status = status
    }
    if ('activeProjectId' in body) patch.active_project_id = str(body.activeProjectId) ?? null

    if (!Object.keys(patch).length) {
      res.status(400).json({ error: 'Nothing to update' })
      return
    }

    const { data, error } = await getSupabaseAdmin()
      .from('pf_clients')
      .update(patch)
      .eq('id', req.params.id)
      .select(CLIENT_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:clients:patch')
  }
})

// ── Projects ────────────────────────────────────────────────────────────────

const PROJECT_COLUMNS =
  'id, client_id, name, website_url, platform, csv_template_id, required_fields, currency, status, created_at'

const PLATFORMS = ['woocommerce', 'shopify', 'custom']

router.get('/productflow/projects', async (req, res) => {
  try {
    const clientId = str(req.query.clientId)
    let query = getSupabaseAdmin()
      .from('pf_projects')
      .select(PROJECT_COLUMNS)
      .order('created_at', { ascending: false })
      .limit(200)

    if (clientId) query = query.eq('client_id', clientId)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:projects:list')
  }
})

router.post('/productflow/projects', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const clientId = str(body.clientId)
    const name = str(body.name)
    if (!clientId || !name) {
      res.status(400).json({ error: 'Client and project name are required' })
      return
    }
    const platform = str(body.platform) ?? 'woocommerce'
    if (!PLATFORMS.includes(platform)) {
      res.status(400).json({ error: `Platform must be one of ${PLATFORMS.join(', ')}` })
      return
    }

    const { data, error } = await getSupabaseAdmin()
      .from('pf_projects')
      .insert({
        client_id: clientId,
        name,
        platform,
        website_url: str(body.websiteUrl) ?? null,
        currency: str(body.currency) ?? 'INR',
      })
      .select(PROJECT_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:projects:create')
  }
})

router.patch('/productflow/projects/:id', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const patch: Record<string, unknown> = {}

    const name = str(body.name)
    if (name) patch.name = name
    if ('websiteUrl' in body) patch.website_url = str(body.websiteUrl) ?? null
    if ('currency' in body) patch.currency = str(body.currency) ?? 'INR'
    if ('status' in body) patch.status = str(body.status) ?? 'active'
    if ('platform' in body) {
      const platform = str(body.platform) ?? 'woocommerce'
      if (!PLATFORMS.includes(platform)) {
        res.status(400).json({ error: `Platform must be one of ${PLATFORMS.join(', ')}` })
        return
      }
      patch.platform = platform
    }

    if (!Object.keys(patch).length) {
      res.status(400).json({ error: 'Nothing to update' })
      return
    }

    const { data, error } = await getSupabaseAdmin()
      .from('pf_projects')
      .update(patch)
      .eq('id', req.params.id)
      .select(PROJECT_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:projects:patch')
  }
})

router.delete('/productflow/projects/:id', async (req, res) => {
  try {
    const { error } = await getSupabaseAdmin()
      .from('pf_projects')
      .delete()
      .eq('id', req.params.id)
    if (error) throw error
    res.json({ data: { ok: true } })
  } catch (error) {
    fail(res, error, 'productflow:projects:delete')
  }
})

// ── Messages (inbound log) ──────────────────────────────────────────────────

router.get('/productflow/messages', async (req, res) => {
  try {
    const clientId = str(req.query.clientId)
    const limit = Math.min(Number(req.query.limit) || 100, 500)

    let query = getSupabaseAdmin()
      .from('pf_messages')
      .select(
        'id, client_id, project_id, source, external_message_id, message_type, text, classification, media_group_id, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(limit)

    if (clientId) query = query.eq('client_id', clientId)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:messages:list')
  }
})

// ── Images ──────────────────────────────────────────────────────────────────

router.get('/productflow/images', async (req, res) => {
  try {
    const clientId = str(req.query.clientId)
    const limit = Math.min(Number(req.query.limit) || 60, 200)

    let query = getSupabaseAdmin()
      .from('pf_product_images')
      .select(
        'id, client_id, project_id, message_id, url, width, height, file_size, position, status, error, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(limit)

    if (clientId) query = query.eq('client_id', clientId)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:images:list')
  }
})

// ── Drafts ──────────────────────────────────────────────────────────────────

router.get('/productflow/drafts', async (req, res) => {
  try {
    const status = str(req.query.status)
    let query = getSupabaseAdmin()
      .from('pf_product_drafts')
      .select('id, client_id, project_id, status, product_data, missing_fields, last_question, updated_at')
      .order('updated_at', { ascending: false })
      .limit(100)

    if (status) query = query.eq('status', status)

    const { data, error } = await query
    if (error) throw error

    // Attach image counts so the admin can see how complete a draft is.
    const ids = (data ?? []).map((d) => d.id as string)
    const counts = new Map<string, number>()
    if (ids.length) {
      const { data: images } = await getSupabaseAdmin()
        .from('pf_product_images')
        .select('draft_id')
        .in('draft_id', ids)
        .eq('status', 'stored')
      for (const row of images ?? []) {
        const key = row.draft_id as string
        counts.set(key, (counts.get(key) ?? 0) + 1)
      }
    }

    res.json({
      data: (data ?? []).map((d) => ({ ...d, image_count: counts.get(d.id as string) ?? 0 })),
    })
  } catch (error) {
    fail(res, error, 'productflow:drafts:list')
  }
})

router.delete('/productflow/drafts/:id', async (req, res) => {
  try {
    const { error } = await getSupabaseAdmin()
      .from('pf_product_drafts')
      .update({ status: 'CANCELLED' })
      .eq('id', req.params.id)
    if (error) throw error
    res.json({ data: { ok: true } })
  } catch (error) {
    fail(res, error, 'productflow:drafts:cancel')
  }
})

// ── Products ────────────────────────────────────────────────────────────────

router.get('/productflow/products', async (req, res) => {
  try {
    const projectId = str(req.query.projectId)
    let query = getSupabaseAdmin()
      .from('pf_products')
      .select(
        'id, client_id, project_id, name, sku, regular_price, sale_price, category, brand, tags, attributes, status, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(200)

    if (projectId) query = query.eq('project_id', projectId)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:products:list')
  }
})

// ── Overview counters ───────────────────────────────────────────────────────

router.get('/productflow/stats', async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin()
    const countOf = async (table: string, filter?: (q: any) => any) => {
      let q = supabase.from(table).select('id', { count: 'exact', head: true })
      if (filter) q = filter(q)
      const { count } = await q
      return count ?? 0
    }

    const [clients, pendingClients, projects, messages, images, openDrafts, products] =
      await Promise.all([
        countOf('pf_clients'),
        countOf('pf_clients', (q) => q.eq('status', 'pending')),
        countOf('pf_projects'),
        countOf('pf_messages'),
        countOf('pf_product_images', (q) => q.eq('status', 'stored')),
        countOf('pf_product_drafts', (q) =>
          q.in('status', ['DRAFT', 'NEEDS_INFORMATION', 'READY_FOR_REVIEW']),
        ),
        countOf('pf_products'),
      ])

    res.json({
      data: { clients, pendingClients, projects, messages, images, openDrafts, products },
    })
  } catch (error) {
    fail(res, error, 'productflow:stats')
  }
})

export default router
