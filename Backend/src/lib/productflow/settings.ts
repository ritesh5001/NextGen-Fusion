import { randomBytes } from 'node:crypto'
import { getSupabaseAdmin } from '../supabase'

// Providers the admin can pick for product extraction. Claude and Groq already
// have structured-output helpers; Gemini and OpenAI are wired in Phase 4.
export const PF_AI_PROVIDERS = ['claude', 'groq', 'gemini', 'openai'] as const
export type PfAiProvider = (typeof PF_AI_PROVIDERS)[number]

export const PF_AI_PROVIDER_LABELS: Record<PfAiProvider, string> = {
  claude: 'Claude (Anthropic)',
  groq: 'Groq (Llama)',
  gemini: 'Google Gemini',
  openai: 'OpenAI',
}

// Which env var holds the key for each provider, so the admin UI can show what
// is actually usable rather than offering a provider that cannot run.
export const PF_AI_PROVIDER_ENV: Record<PfAiProvider, string> = {
  claude: 'ANTHROPIC_API_KEY',
  groq: 'GROQ_API_KEY',
  gemini: 'GEMINI_API_KEY',
  openai: 'OPENAI_API_KEY',
}

export function isPfAiProviderConfigured(provider: PfAiProvider): boolean {
  return Boolean(process.env[PF_AI_PROVIDER_ENV[provider]])
}

export function resolvePfAiProvider(value: unknown): PfAiProvider {
  return PF_AI_PROVIDERS.includes(value as PfAiProvider) ? (value as PfAiProvider) : 'claude'
}

export type PfSettings = {
  telegram_bot_token: string | null
  telegram_bot_username: string | null
  telegram_bot_name: string | null
  telegram_webhook_url: string | null
  telegram_webhook_secret: string | null
  telegram_connected_at: string | null
  ai_provider: PfAiProvider
  auto_approve: boolean
}

const DEFAULTS: PfSettings = {
  telegram_bot_token: null,
  telegram_bot_username: null,
  telegram_bot_name: null,
  telegram_webhook_url: null,
  telegram_webhook_secret: null,
  telegram_connected_at: null,
  ai_provider: 'claude',
  auto_approve: false,
}

const COLUMNS =
  'telegram_bot_token, telegram_bot_username, telegram_bot_name, telegram_webhook_url, telegram_webhook_secret, telegram_connected_at, ai_provider, auto_approve'

/** Full settings including the bot token — server-side use only. */
export async function loadPfSettings(): Promise<PfSettings> {
  const { data, error } = await getSupabaseAdmin()
    .from('pf_settings')
    .select(COLUMNS)
    .eq('id', true)
    .maybeSingle()

  if (error) throw error
  if (!data) return { ...DEFAULTS }

  const row = data as Record<string, unknown>
  return {
    ...DEFAULTS,
    ...row,
    ai_provider: resolvePfAiProvider(row.ai_provider),
    auto_approve: Boolean(row.auto_approve),
  } as PfSettings
}

export async function savePfSettings(patch: Partial<PfSettings>): Promise<void> {
  const { error } = await getSupabaseAdmin()
    .from('pf_settings')
    .upsert({ id: true, ...patch }, { onConflict: 'id' })
  if (error) throw error
}

/**
 * Shows only the last 4 characters of the bot token.
 * The full token must never leave the server — it grants complete control of
 * the bot, and the admin panel only ever needs to know whether one is set.
 */
export function maskToken(token: string | null | undefined): string | null {
  if (!token) return null
  const tail = token.slice(-4)
  return `••••••••${tail}`
}

export function generateWebhookSecret(): string {
  // Telegram allows A-Z, a-z, 0-9, _ and - (1..256 chars) for the secret token.
  return randomBytes(24).toString('hex')
}

/** Settings shaped for the admin UI — token masked, secret withheld. */
export type PfPublicSettings = {
  telegramConnected: boolean
  telegramBotToken: string | null
  telegramBotUsername: string | null
  telegramBotName: string | null
  telegramWebhookUrl: string | null
  telegramConnectedAt: string | null
  aiProvider: PfAiProvider
  autoApprove: boolean
  providers: { value: PfAiProvider; label: string; configured: boolean; envVar: string }[]
}

export function toPublicSettings(settings: PfSettings): PfPublicSettings {
  return {
    telegramConnected: Boolean(settings.telegram_bot_token),
    telegramBotToken: maskToken(settings.telegram_bot_token),
    telegramBotUsername: settings.telegram_bot_username,
    telegramBotName: settings.telegram_bot_name,
    telegramWebhookUrl: settings.telegram_webhook_url,
    telegramConnectedAt: settings.telegram_connected_at,
    aiProvider: settings.ai_provider,
    autoApprove: settings.auto_approve,
    providers: PF_AI_PROVIDERS.map((value) => ({
      value,
      label: PF_AI_PROVIDER_LABELS[value],
      configured: isPfAiProviderConfigured(value),
      envVar: PF_AI_PROVIDER_ENV[value],
    })),
  }
}
