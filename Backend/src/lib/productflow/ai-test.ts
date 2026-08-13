import { getSupabaseAdmin } from '../supabase'
import { getAnthropicModel } from '../anthropic'
import { getGroqTextModel, getGroqVisionModel } from '../groq'
import {
  generateStructuredPf,
  getGeminiTextModel,
  getOpenAITextModel,
  imageBlock,
  providerSupportsVision,
  textBlock,
} from './ai'
import {
  isPfAiProviderConfigured,
  PF_AI_PROVIDERS,
  PF_AI_PROVIDER_ENV,
  PF_AI_PROVIDER_LABELS,
  type PfAiProvider,
} from './settings'

// Lets an admin prove a provider actually works before relying on it.
//
// Text and vision are tested separately on purpose: Groq answers text fine but
// serves no multimodal model, and that mismatch is what silently broke every
// message with a photo. A single combined "is it up?" check hides it.

export type PfProbe = {
  ok: boolean
  ms: number
  model: string | null
  error: string | null
  skipped?: string
}

export type PfProviderTest = {
  provider: PfAiProvider
  label: string
  configured: boolean
  envVar: string
  text: PfProbe
  vision: PfProbe
}

const PING_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['classification'],
  properties: { classification: { type: 'string' } },
}

function textModelFor(provider: PfAiProvider): string {
  switch (provider) {
    case 'claude':
      return getAnthropicModel()
    case 'groq':
      return getGroqTextModel()
    case 'gemini':
      return getGeminiTextModel()
    case 'openai':
      return getOpenAITextModel()
  }
}

function visionModelFor(provider: PfAiProvider): string | null {
  if (provider === 'groq') return process.env.GROQ_VISION_MODEL || null
  return textModelFor(provider)
}

const short = (error: unknown): string => {
  const message = error instanceof Error ? error.message : String(error)
  return message.replace(/\s+/g, ' ').slice(0, 220)
}

/** A real product image to test vision with; vision is skipped without one. */
async function sampleImageUrl(): Promise<string | null> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_images')
    .select('url')
    .eq('status', 'stored')
    .not('url', 'is', null)
    .limit(1)

  return (data?.[0]?.url as string) ?? null
}

async function probe(
  provider: PfAiProvider,
  withImage: string | null,
): Promise<PfProbe> {
  const model = withImage ? visionModelFor(provider) : textModelFor(provider)
  const started = Date.now()

  try {
    await generateStructuredPf<{ classification: string }>({
      system: 'Reply with {"classification":"PRODUCT"} and nothing else.',
      prompt: withImage
        ? [textBlock('Classify this product image.'), imageBlock(withImage)]
        : [textBlock('Black hoodie 1299')],
      schema: PING_SCHEMA,
      maxTokens: 256,
      provider,
      // Report what this provider actually does, not what the fallback rescues.
      noFallback: true,
    })
    return { ok: true, ms: Date.now() - started, model, error: null }
  } catch (error) {
    return { ok: false, ms: Date.now() - started, model, error: short(error) }
  }
}

export async function testProvider(provider: PfAiProvider): Promise<PfProviderTest> {
  const base = {
    provider,
    label: PF_AI_PROVIDER_LABELS[provider],
    configured: isPfAiProviderConfigured(provider),
    envVar: PF_AI_PROVIDER_ENV[provider],
  }

  if (!base.configured) {
    const missing: PfProbe = {
      ok: false,
      ms: 0,
      model: null,
      error: `${PF_AI_PROVIDER_ENV[provider]} is not set`,
    }
    return { ...base, text: missing, vision: missing }
  }

  const text = await probe(provider, null)

  // Vision is only meaningful if the provider offers a multimodal model.
  if (!providerSupportsVision(provider)) {
    return {
      ...base,
      text,
      vision: {
        ok: false,
        ms: 0,
        model: null,
        error: null,
        skipped:
          provider === 'groq'
            ? 'Groq serves no multimodal model. Images are dropped and products are read from text only.'
            : 'No vision model configured.',
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
        model: visionModelFor(provider),
        error: null,
        skipped: 'No stored product image to test with yet.',
      },
    }
  }

  return { ...base, text, vision: await probe(provider, image) }
}

/** Tests providers one after another; parallel calls trip free-tier rate limits. */
export async function testAllProviders(): Promise<PfProviderTest[]> {
  const results: PfProviderTest[] = []
  for (const provider of PF_AI_PROVIDERS) {
    results.push(await testProvider(provider))
  }
  return results
}
