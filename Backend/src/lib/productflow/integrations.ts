import { getSupabaseAdmin } from '../supabase'

// The integrations registry.
//
// Credentials saved here take precedence over environment variables, so an
// admin can rotate a key or point at a different model from the panel. A row
// with no stored credential falls back to env, which keeps every existing
// deployment working unchanged.

export type PfIntegrationKind = 'ai' | 'messaging' | 'storage'

export type PfDriver =
  | 'anthropic'
  | 'groq'
  | 'gemini'
  | 'openai'
  | 'openai_compatible'
  | 'telegram'
  | 'cloudinary'

/** Drivers that can run product classification. */
export const AI_DRIVERS: PfDriver[] = [
  'anthropic',
  'groq',
  'gemini',
  'openai',
  'openai_compatible',
]

export type PfIntegration = {
  id: string
  slug: string
  label: string
  kind: PfIntegrationKind
  driver: PfDriver
  credentials: Record<string, string>
  config: Record<string, string>
  enabled: boolean
  is_builtin: boolean
  supports_vision: boolean
  last_tested_at: string | null
  last_test_ok: boolean | null
  last_test_error: string | null
  sort_order: number
}

const COLUMNS =
  'id, slug, label, kind, driver, credentials, config, enabled, is_builtin, supports_vision, last_tested_at, last_test_ok, last_test_error, sort_order'

// Env var consulted when a row has no stored key. Custom providers have no
// env fallback — their key must be entered in the panel.
const ENV_FALLBACK: Record<string, string> = {
  anthropic: 'ANTHROPIC_API_KEY',
  groq: 'GROQ_API_KEY',
  gemini: 'GEMINI_API_KEY',
  openai: 'OPENAI_API_KEY',
}

export async function listIntegrations(kind?: PfIntegrationKind): Promise<PfIntegration[]> {
  let query = getSupabaseAdmin().from('pf_integrations').select(COLUMNS).order('sort_order')
  if (kind) query = query.eq('kind', kind)

  const { data, error } = await query
  if (error) throw error
  return (data ?? []) as unknown as PfIntegration[]
}

export async function getIntegration(slug: string): Promise<PfIntegration | null> {
  const { data } = await getSupabaseAdmin()
    .from('pf_integrations')
    .select(COLUMNS)
    .eq('slug', slug)
    .maybeSingle()

  return (data as unknown as PfIntegration) ?? null
}

/**
 * The API key to use, preferring the admin-entered value and falling back to
 * the environment. Returns null when neither is set.
 */
export function resolveApiKey(integration: PfIntegration): string | null {
  const stored = integration.credentials?.apiKey?.trim()
  if (stored) return stored

  const envVar = integration.config?.envKey || ENV_FALLBACK[integration.driver]
  const fromEnv = envVar ? process.env[envVar] : undefined
  return fromEnv?.trim() || null
}

export function resolveBaseUrl(integration: PfIntegration): string | null {
  return integration.credentials?.baseUrl?.trim() || null
}

/** Where the key came from, so the panel can say so plainly. */
export function credentialSource(integration: PfIntegration): 'panel' | 'env' | 'none' {
  if (integration.credentials?.apiKey?.trim()) return 'panel'
  const envVar = integration.config?.envKey || ENV_FALLBACK[integration.driver]
  if (envVar && process.env[envVar]) return 'env'
  return 'none'
}

/** Never return a live key to the browser — only enough to recognise it. */
export function maskSecret(value: string | null | undefined): string | null {
  if (!value) return null
  if (value.length <= 8) return '••••'
  return `••••••••${value.slice(-4)}`
}

export type PfIntegrationPublic = Omit<PfIntegration, 'credentials'> & {
  hasKey: boolean
  keyPreview: string | null
  keySource: 'panel' | 'env' | 'none'
  envKey: string | null
  baseUrl: string | null
}

export function toPublicIntegration(integration: PfIntegration): PfIntegrationPublic {
  const key = resolveApiKey(integration)
  const { credentials, ...rest } = integration
  void credentials
  return {
    ...rest,
    hasKey: Boolean(key),
    keyPreview: maskSecret(key),
    keySource: credentialSource(integration),
    envKey: integration.config?.envKey || ENV_FALLBACK[integration.driver] || null,
    baseUrl: resolveBaseUrl(integration),
  }
}

export async function upsertIntegration(
  slug: string,
  patch: {
    label?: string
    driver?: PfDriver
    kind?: PfIntegrationKind
    apiKey?: string | null
    baseUrl?: string | null
    textModel?: string | null
    visionModel?: string | null
    enabled?: boolean
    supportsVision?: boolean
  },
): Promise<PfIntegration> {
  const existing = await getIntegration(slug)

  const credentials = { ...(existing?.credentials ?? {}) }
  // undefined = leave untouched; empty string = clear it and fall back to env.
  if (patch.apiKey !== undefined) {
    if (patch.apiKey) credentials.apiKey = patch.apiKey
    else delete credentials.apiKey
  }
  if (patch.baseUrl !== undefined) {
    if (patch.baseUrl) credentials.baseUrl = patch.baseUrl
    else delete credentials.baseUrl
  }

  const config = { ...(existing?.config ?? {}) }
  if (patch.textModel !== undefined) {
    if (patch.textModel) config.textModel = patch.textModel
    else delete config.textModel
  }
  if (patch.visionModel !== undefined) {
    if (patch.visionModel) config.visionModel = patch.visionModel
    else delete config.visionModel
  }

  const row: Record<string, unknown> = { credentials, config }
  if (patch.label !== undefined) row.label = patch.label
  if (patch.driver !== undefined) row.driver = patch.driver
  if (patch.kind !== undefined) row.kind = patch.kind
  if (patch.enabled !== undefined) row.enabled = patch.enabled
  if (patch.supportsVision !== undefined) row.supports_vision = patch.supportsVision

  const supabase = getSupabaseAdmin()

  // Update rather than upsert for an existing row: a partial upsert still has
  // to satisfy NOT NULL on its INSERT arm, so omitting `label` would fail.
  if (existing) {
    const { data, error } = await supabase
      .from('pf_integrations')
      .update(row)
      .eq('slug', slug)
      .select(COLUMNS)
      .single()

    if (error) throw error
    return data as unknown as PfIntegration
  }

  const { data, error } = await supabase
    .from('pf_integrations')
    .insert({
      ...row,
      slug,
      label: (row.label as string) ?? slug,
      driver: (row.driver as string) ?? 'openai_compatible',
      kind: (row.kind as string) ?? 'ai',
      sort_order: 100,
    })
    .select(COLUMNS)
    .single()

  if (error) throw error
  return data as unknown as PfIntegration
}

export async function deleteIntegration(slug: string): Promise<void> {
  const existing = await getIntegration(slug)
  if (!existing) return
  if (existing.is_builtin) throw new Error('Built-in integrations cannot be deleted, only disabled')

  const { error } = await getSupabaseAdmin().from('pf_integrations').delete().eq('slug', slug)
  if (error) throw error
}

export async function recordTestResult(
  slug: string,
  ok: boolean,
  error: string | null,
): Promise<void> {
  await getSupabaseAdmin()
    .from('pf_integrations')
    .update({
      last_tested_at: new Date().toISOString(),
      last_test_ok: ok,
      last_test_error: error?.slice(0, 400) ?? null,
    })
    .eq('slug', slug)
}
