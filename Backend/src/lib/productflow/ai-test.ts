import { getSupabaseAdmin } from '../supabase'
import { imageBlock, textBlock } from './ai'
import { runIntegration, textModelFor, visionModelFor } from './ai-runner'
import {
  AI_DRIVERS,
  listIntegrations,
  getIntegration,
  recordTestResult,
  resolveApiKey,
  credentialSource,
  type PfIntegration,
} from './integrations'

// Proves an integration actually works before anyone relies on it.
//
// Text and vision are probed separately on purpose: Groq answers text fine but
// serves no multimodal model, and that mismatch silently broke every message
// with a photo. A single "is it up?" check hides exactly that.

export type PfProbe = {
  ok: boolean
  ms: number
  model: string | null
  error: string | null
  skipped?: string
}

export type PfProviderTest = {
  provider: string
  label: string
  driver: string
  configured: boolean
  keySource: 'panel' | 'env' | 'none'
  envVar: string | null
  text: PfProbe
  vision: PfProbe
}

const PING_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['classification'],
  properties: { classification: { type: 'string' } },
}

const short = (error: unknown): string =>
  (error instanceof Error ? error.message : String(error)).replace(/\s+/g, ' ').slice(0, 220)

/** A real product image to probe vision with; skipped when none exists yet. */
async function sampleImageUrl(): Promise<string | null> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_images')
    .select('url')
    .eq('status', 'stored')
    .not('url', 'is', null)
    .limit(1)

  return (data?.[0]?.url as string) ?? null
}

async function probe(integration: PfIntegration, withImage: string | null): Promise<PfProbe> {
  const model = withImage ? visionModelFor(integration) : textModelFor(integration)
  const started = Date.now()

  try {
    await runIntegration<{ classification: string }>({
      slug: integration.slug,
      system: 'Reply with {"classification":"PRODUCT"} and nothing else.',
      prompt: withImage
        ? [textBlock('Classify this product image.'), imageBlock(withImage)]
        : [textBlock('Black hoodie 1299')],
      schema: PING_SCHEMA,
      maxTokens: 256,
      // Report what this integration really does, not what the fallback rescues.
      noFallback: true,
    })
    return { ok: true, ms: Date.now() - started, model: model || null, error: null }
  } catch (error) {
    return { ok: false, ms: Date.now() - started, model: model || null, error: short(error) }
  }
}

export async function testIntegration(slug: string): Promise<PfProviderTest> {
  const integration = await getIntegration(slug)
  if (!integration) throw new Error(`Integration "${slug}" not found`)

  const base = {
    provider: integration.slug,
    label: integration.label,
    driver: integration.driver,
    configured: Boolean(resolveApiKey(integration)),
    keySource: credentialSource(integration),
    envVar: integration.config?.envKey ?? null,
  }

  if (!base.configured) {
    const missing: PfProbe = { ok: false, ms: 0, model: null, error: 'No API key configured' }
    await recordTestResult(slug, false, 'No API key configured')
    return { ...base, text: missing, vision: missing }
  }

  if (!integration.enabled) {
    const off: PfProbe = { ok: false, ms: 0, model: null, error: null, skipped: 'Disabled' }
    return { ...base, text: off, vision: off }
  }

  const text = await probe(integration, null)
  await recordTestResult(slug, text.ok, text.error)

  if (!visionModelFor(integration)) {
    return {
      ...base,
      text,
      vision: {
        ok: false,
        ms: 0,
        model: null,
        error: null,
        skipped:
          integration.driver === 'groq'
            ? 'Groq serves no multimodal model — images are dropped and products read from text only.'
            : 'No vision model configured for this provider.',
      },
    }
  }

  const image = await sampleImageUrl()
  if (!image) {
    return {
      ...base,
      text,
      vision: {
        ok: false,
        ms: 0,
        model: visionModelFor(integration),
        error: null,
        skipped: 'No stored product image to test with yet.',
      },
    }
  }

  return { ...base, text, vision: await probe(integration, image) }
}

/** Tests sequentially; parallel calls trip free-tier rate limits. */
export async function testAllIntegrations(): Promise<PfProviderTest[]> {
  const integrations = await listIntegrations('ai')
  const results: PfProviderTest[] = []
  for (const integration of integrations) {
    if (!AI_DRIVERS.includes(integration.driver)) continue
    results.push(await testIntegration(integration.slug))
  }
  return results
}
