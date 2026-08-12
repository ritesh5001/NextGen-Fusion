import { getSupabaseAdmin } from '../supabase'
import { getWebhookInfo } from './telegram'
import {
  isPfAiProviderConfigured,
  loadPfSettings,
  PF_AI_PROVIDER_ENV,
  PF_AI_PROVIDER_LABELS,
} from './settings'
import { generateStructuredPf, textBlock } from './ai'

// Phase 10: an honest readiness report for the whole pipeline, so "is it
// working?" has a checkable answer instead of a guess.

export type PfCheck = {
  key: string
  label: string
  status: 'ok' | 'warn' | 'fail'
  detail: string
}

export type PfHealthReport = {
  ready: boolean
  checks: PfCheck[]
}

const PF_TABLES = [
  'pf_settings',
  'pf_clients',
  'pf_projects',
  'pf_messages',
  'pf_product_drafts',
  'pf_products',
  'pf_product_images',
  'pf_csv_templates',
  'pf_csv_exports',
]

async function checkDatabase(): Promise<PfCheck[]> {
  const supabase = getSupabaseAdmin()
  const missing: string[] = []

  for (const table of PF_TABLES) {
    const { error } = await supabase.from(table).select('*', { count: 'exact', head: true })
    // PGRST205 / 42P01 both mean "relation does not exist".
    if (error) missing.push(table)
  }

  if (missing.length === PF_TABLES.length) {
    return [
      {
        key: 'database',
        label: 'Database schema',
        status: 'fail',
        detail:
          'No ProductFlow tables found. Run supabase/productflow_migration.sql in the Supabase SQL editor.',
      },
    ]
  }

  if (missing.length) {
    return [
      {
        key: 'database',
        label: 'Database schema',
        status: 'fail',
        detail: `Missing table(s): ${missing.join(', ')}. Re-run productflow_migration.sql.`,
      },
    ]
  }

  return [
    {
      key: 'database',
      label: 'Database schema',
      status: 'ok',
      detail: `All ${PF_TABLES.length} ProductFlow tables present.`,
    },
  ]
}

async function checkTelegram(): Promise<PfCheck[]> {
  const settings = await loadPfSettings().catch(() => null)
  if (!settings) {
    return [
      {
        key: 'telegram',
        label: 'Telegram bot',
        status: 'fail',
        detail: 'Settings could not be read — run the database migration first.',
      },
    ]
  }

  if (!settings.telegram_bot_token) {
    return [
      {
        key: 'telegram',
        label: 'Telegram bot',
        status: 'fail',
        detail: 'No bot connected. Paste a BotFather token in Settings.',
      },
    ]
  }

  const checks: PfCheck[] = [
    {
      key: 'telegram',
      label: 'Telegram bot',
      status: 'ok',
      detail: `Connected as @${settings.telegram_bot_username ?? 'unknown'}.`,
    },
  ]

  try {
    const info = await getWebhookInfo(settings.telegram_bot_token)
    if (!info.url) {
      checks.push({
        key: 'webhook',
        label: 'Telegram webhook',
        status: 'fail',
        detail: 'No webhook registered — the bot will not receive messages.',
      })
    } else if (info.last_error_message) {
      checks.push({
        key: 'webhook',
        label: 'Telegram webhook',
        status: 'warn',
        detail: `${info.url} — last error: ${info.last_error_message}`,
      })
    } else {
      checks.push({
        key: 'webhook',
        label: 'Telegram webhook',
        status: info.pending_update_count > 20 ? 'warn' : 'ok',
        detail: `${info.url} · ${info.pending_update_count} pending update(s).`,
      })
    }
  } catch (error) {
    checks.push({
      key: 'webhook',
      label: 'Telegram webhook',
      status: 'fail',
      detail: error instanceof Error ? error.message : 'Could not reach Telegram.',
    })
  }

  return checks
}

/**
 * Confirms the selected AI provider has a key and, when `deep`, that it can
 * actually answer. A configured key is not proof of a funded account.
 */
async function checkAi(deep: boolean): Promise<PfCheck[]> {
  const settings = await loadPfSettings().catch(() => null)
  const provider = settings?.ai_provider ?? 'claude'
  const label = PF_AI_PROVIDER_LABELS[provider]

  if (!isPfAiProviderConfigured(provider)) {
    return [
      {
        key: 'ai',
        label: 'AI provider',
        status: 'fail',
        detail: `${label} is selected but ${PF_AI_PROVIDER_ENV[provider]} is not set.`,
      },
    ]
  }

  if (!deep) {
    return [
      {
        key: 'ai',
        label: 'AI provider',
        status: 'ok',
        detail: `${label} selected, key configured. Run a deep check to confirm it responds.`,
      },
    ]
  }

  try {
    const { data } = await generateStructuredPf<{ ok: boolean }>({
      system: 'You are a health check. Reply with {"ok":true}.',
      prompt: [textBlock('ping')],
      schema: {
        type: 'object',
        additionalProperties: false,
        required: ['ok'],
        properties: { ok: { type: 'boolean' } },
      },
      maxTokens: 64,
      provider,
    })
    return [
      {
        key: 'ai',
        label: 'AI provider',
        status: data?.ok ? 'ok' : 'warn',
        detail: `${label} responded successfully.`,
      },
    ]
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return [
      {
        key: 'ai',
        label: 'AI provider',
        status: 'fail',
        detail: `${label} rejected the call: ${message.slice(0, 180)}`,
      },
    ]
  }
}

function checkCloudinary(): PfCheck[] {
  const configured =
    !!process.env.CLOUDINARY_CLOUD_NAME &&
    !!process.env.CLOUDINARY_API_KEY &&
    !!process.env.CLOUDINARY_API_SECRET

  return [
    {
      key: 'cloudinary',
      label: 'Image storage (Cloudinary)',
      status: configured ? 'ok' : 'fail',
      detail: configured
        ? 'Credentials configured — product images will be stored.'
        : 'CLOUDINARY_* env vars missing; images cannot be saved.',
    },
  ]
}

async function checkTemplates(): Promise<PfCheck[]> {
  const { data, error } = await getSupabaseAdmin().from('pf_csv_templates').select('id, platform')
  if (error) {
    return [
      { key: 'templates', label: 'CSV templates', status: 'fail', detail: 'Table unavailable.' },
    ]
  }
  const count = data?.length ?? 0
  return [
    {
      key: 'templates',
      label: 'CSV templates',
      status: count > 0 ? 'ok' : 'warn',
      detail:
        count > 0
          ? `${count} template(s) available.`
          : 'None yet — they seed automatically when the Templates tab is opened.',
    },
  ]
}

export async function runHealthCheck(deep = false): Promise<PfHealthReport> {
  const dbChecks = await checkDatabase()
  const dbOk = dbChecks[0].status === 'ok'

  // Everything else reads from the database, so stop early when it is missing
  // rather than reporting a cascade of confusing failures.
  if (!dbOk) {
    return {
      ready: false,
      checks: [...dbChecks, ...checkCloudinary()],
    }
  }

  const [telegram, ai, templates] = await Promise.all([
    checkTelegram(),
    checkAi(deep),
    checkTemplates(),
  ])

  const checks = [...dbChecks, ...telegram, ...ai, ...checkCloudinary(), ...templates]
  return { ready: checks.every((c) => c.status !== 'fail'), checks }
}
