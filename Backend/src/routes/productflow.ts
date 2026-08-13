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
import { seedBuiltInTemplates } from '../lib/productflow/csv/templates'
import { PF_MAPPING_TOKENS } from '../lib/productflow/csv/mapper'
import { generateProjectCsv, recordExport } from '../lib/productflow/csv/generator'
import { summarizeReport } from '../lib/productflow/csv/validator'
import { runHealthCheck } from '../lib/productflow/health'
import { replayClientMessages, type ReplayResult } from '../lib/productflow/replay'
import { sendMessage } from '../lib/productflow/telegram'
import { describeProgress, PF_STAGES } from '../lib/productflow/progress'

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

    const { data: before } = await getSupabaseAdmin()
      .from('pf_clients')
      .select('status')
      .eq('id', req.params.id)
      .maybeSingle()

    const { data, error } = await getSupabaseAdmin()
      .from('pf_clients')
      .update(patch)
      .eq('id', req.params.id)
      .select(CLIENT_COLUMNS)
      .single()

    if (error) throw error

    // Activating a client replays what they already sent, so the product they
    // messaged about while pending is built without them retyping it.
    let replay: ReplayResult | null = null
    if (patch.status === 'active' && before?.status !== 'active') {
      try {
        replay = await replayClientMessages(data as never)
        if (replay.messagesProcessed || replay.imagesStored) {
          const settings = await loadPfSettings()
          const chatId = (data as Record<string, unknown>).external_chat_id as string | null
          if (settings.telegram_bot_token && chatId) {
            await sendMessage(
              settings.telegram_bot_token,
              chatId,
              `Your account is active. ✅ I went back through your earlier messages${
                replay.imagesStored ? ` and saved ${replay.imagesStored} image(s)` : ''
              }.\n\n${replay.lastReply ?? ''}`.trim(),
            ).catch(() => {})
          }
        }
      } catch (replayError) {
        logRouteError('productflow:clients:replay', replayError)
      }
    }

    res.json({ data, replay })
  } catch (error) {
    fail(res, error, 'productflow:clients:patch')
  }
})

/** Manual re-run, for a client whose messages failed the first time. */
router.post('/productflow/clients/:id/replay', async (req, res) => {
  try {
    const { data } = await getSupabaseAdmin()
      .from('pf_clients')
      .select('id, name, status, external_chat_id, active_project_id')
      .eq('id', req.params.id)
      .maybeSingle()

    if (!data) {
      res.status(404).json({ error: 'Client not found' })
      return
    }
    if (data.status !== 'active') {
      res.status(400).json({ error: 'Activate the client first' })
      return
    }

    res.json({ data: await replayClientMessages(data as never) })
  } catch (error) {
    fail(res, error, 'productflow:clients:replay')
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
        'id, client_id, project_id, source, external_message_id, message_type, text, classification, error, media_group_id, created_at',
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
      data: (data ?? []).map((d) => {
        const imageCount = counts.get(d.id as string) ?? 0
        return {
          ...d,
          image_count: imageCount,
          progress: describeProgress({
            status: d.status as string,
            productData: (d.product_data as Record<string, unknown>) ?? {},
            imageCount,
            missingFields: Array.isArray(d.missing_fields) ? (d.missing_fields as string[]) : [],
          }),
        }
      }),
      stages: PF_STAGES,
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

// ── CSV templates (Phase 8) ─────────────────────────────────────────────────

const TEMPLATE_COLUMNS = 'id, name, platform, columns, mapping, rules, is_default, created_at'

router.get('/productflow/templates', async (_req, res) => {
  try {
    // First visit seeds the WooCommerce / Shopify / custom starters.
    await seedBuiltInTemplates()
    const { data, error } = await getSupabaseAdmin()
      .from('pf_csv_templates')
      .select(TEMPLATE_COLUMNS)
      .order('platform', { ascending: true })
    if (error) throw error
    res.json({ data, tokens: PF_MAPPING_TOKENS })
  } catch (error) {
    fail(res, error, 'productflow:templates:list')
  }
})

router.post('/productflow/templates', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const name = str(body.name)
    if (!name) {
      res.status(400).json({ error: 'Template name is required' })
      return
    }
    const columns = Array.isArray(body.columns) ? body.columns.map(String) : []
    if (!columns.length) {
      res.status(400).json({ error: 'At least one column is required' })
      return
    }

    const { data, error } = await getSupabaseAdmin()
      .from('pf_csv_templates')
      .insert({
        name,
        platform: str(body.platform) ?? 'custom',
        columns,
        mapping: (body.mapping as Record<string, string>) ?? {},
        rules: (body.rules as Record<string, unknown>) ?? {},
      })
      .select(TEMPLATE_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:templates:create')
  }
})

router.patch('/productflow/templates/:id', async (req, res) => {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>
    const patch: Record<string, unknown> = {}
    const name = str(body.name)
    if (name) patch.name = name
    if ('platform' in body) patch.platform = str(body.platform) ?? 'custom'
    if (Array.isArray(body.columns)) patch.columns = body.columns.map(String)
    if (body.mapping && typeof body.mapping === 'object') patch.mapping = body.mapping
    if (body.rules && typeof body.rules === 'object') patch.rules = body.rules

    if (!Object.keys(patch).length) {
      res.status(400).json({ error: 'Nothing to update' })
      return
    }

    const { data, error } = await getSupabaseAdmin()
      .from('pf_csv_templates')
      .update(patch)
      .eq('id', req.params.id)
      .select(TEMPLATE_COLUMNS)
      .single()

    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:templates:patch')
  }
})

router.delete('/productflow/templates/:id', async (req, res) => {
  try {
    const { error } = await getSupabaseAdmin()
      .from('pf_csv_templates')
      .delete()
      .eq('id', req.params.id)
    if (error) throw error
    res.json({ data: { ok: true } })
  } catch (error) {
    fail(res, error, 'productflow:templates:delete')
  }
})

// ── CSV generation (Phase 9) ────────────────────────────────────────────────

/** Dry run: what would export, and what is blocking it. */
router.get('/productflow/projects/:id/csv/preview', async (req, res) => {
  try {
    const result = await generateProjectCsv(req.params.id, {
      onlyUnexported: req.query.onlyNew === 'true',
      dryRun: true,
    })
    res.json({
      data: {
        ok: result.ok,
        productCount: result.productCount,
        templateName: result.templateName,
        errors: result.report.errors,
        warnings: result.report.warnings,
        summary: summarizeReport(result.report),
      },
    })
  } catch (error) {
    fail(res, error, 'productflow:csv:preview')
  }
})

/** Streams the CSV as a download and records the export. */
router.get('/productflow/projects/:id/csv', async (req, res) => {
  try {
    const onlyNew = req.query.onlyNew === 'true'
    const result = await generateProjectCsv(req.params.id, { onlyUnexported: onlyNew })

    if (!result.ok || !result.csv || !result.filename) {
      res.status(422).json({
        error: 'CSV cannot be generated yet',
        summary: summarizeReport(result.report),
        errors: result.report.errors,
        warnings: result.report.warnings,
      })
      return
    }

    await recordExport({
      projectId: req.params.id,
      templateName: result.templateName,
      filename: result.filename,
      productCount: result.productCount,
      markExported: req.query.markExported !== 'false',
    })

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`)
    // Excel needs a BOM to read UTF-8 (₹, accented brand names) correctly.
    res.send(`﻿${result.csv}`)
  } catch (error) {
    fail(res, error, 'productflow:csv:download')
  }
})

router.get('/productflow/exports', async (req, res) => {
  try {
    const projectId = str(req.query.projectId)
    let query = getSupabaseAdmin()
      .from('pf_csv_exports')
      .select('id, project_id, template_id, filename, product_count, created_at')
      .order('created_at', { ascending: false })
      .limit(50)

    if (projectId) query = query.eq('project_id', projectId)

    const { data, error } = await query
    if (error) throw error
    res.json({ data })
  } catch (error) {
    fail(res, error, 'productflow:exports:list')
  }
})

// ── Alerts ──────────────────────────────────────────────────────────────────

/**
 * Processing failures the admin should act on.
 *
 * Grouped by error so a provider outage reads as one actionable alert
 * ("Groq failed 12 times: model not found") rather than twelve identical rows.
 */
router.get('/productflow/alerts', async (_req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const supabase = getSupabaseAdmin()

    const { data: failures } = await supabase
      .from('pf_messages')
      .select('id, client_id, error, created_at')
      .eq('classification', 'ERROR')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(200)

    const grouped = new Map<string, { count: number; lastAt: string; sample: string }>()
    for (const row of failures ?? []) {
      const message = (row.error as string) ?? 'Unknown error'
      // Collapse on the first line; retry counters and ids differ per attempt.
      const key = message.split('\n')[0].slice(0, 160)
      const existing = grouped.get(key)
      if (existing) existing.count++
      else grouped.set(key, { count: 1, lastAt: row.created_at as string, sample: message })
    }

    const { data: imageFailures } = await supabase
      .from('pf_product_images')
      .select('id, error, created_at')
      .eq('status', 'failed')
      .gte('created_at', since)
      .limit(50)

    const settings = await loadPfSettings()

    const alerts = [
      ...[...grouped.entries()].map(([key, v]) => ({
        type: 'ai_failure',
        severity: 'error' as const,
        title: `AI could not process ${v.count} message${v.count === 1 ? '' : 's'}`,
        detail: v.sample.slice(0, 300),
        hint:
          `Provider in use: ${settings.ai_provider}. ` +
          'Switch provider in Settings, or fix the key/quota, then use Reprocess on the client.',
        count: v.count,
        lastAt: v.lastAt,
        key,
      })),
      ...(imageFailures?.length
        ? [
            {
              type: 'image_failure',
              severity: 'warning' as const,
              title: `${imageFailures.length} image(s) could not be saved`,
              detail: (imageFailures[0].error as string) ?? '',
              hint: 'Ask the client to resend them, or use Reprocess.',
              count: imageFailures.length,
              lastAt: imageFailures[0].created_at as string,
              key: 'image_failure',
            },
          ]
        : []),
    ]

    res.json({ data: alerts })
  } catch (error) {
    fail(res, error, 'productflow:alerts')
  }
})

/** Clears resolved failures so the banner disappears after a successful retry. */
router.post('/productflow/alerts/dismiss', async (_req, res) => {
  try {
    const { error } = await getSupabaseAdmin()
      .from('pf_messages')
      .update({ classification: null, error: null })
      .eq('classification', 'ERROR')
    if (error) throw error
    res.json({ data: { ok: true } })
  } catch (error) {
    fail(res, error, 'productflow:alerts:dismiss')
  }
})

// ── System health (Phase 10) ────────────────────────────────────────────────

router.get('/productflow/health', async (req, res) => {
  try {
    // ?deep=true spends one small AI call to prove the provider really answers.
    res.json({ data: await runHealthCheck(req.query.deep === 'true') })
  } catch (error) {
    fail(res, error, 'productflow:health')
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
