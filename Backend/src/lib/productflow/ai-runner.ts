import Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI } from '@google/genai'
import OpenAI from 'openai'
import type { AiUsage, JsonSchema } from '../anthropic'
import { getAnthropicModel } from '../anthropic'
import { getGroqTextModel } from '../groq'
import type { PfContent } from './ai'
import { getGeminiTextModel, getOpenAITextModel } from './ai'
import {
  getIntegration,
  resolveApiKey,
  resolveBaseUrl,
  type PfIntegration,
} from './integrations'

// Runs a structured call against whichever integration the admin selected,
// using the key stored in the panel (or the env fallback).
//
// Everything is driven by the integration row, so adding a provider is a
// database insert rather than a code change — any OpenAI-compatible endpoint
// (OpenRouter, Together, DeepSeek, Mistral, xAI, a local Ollama) works through
// the `openai_compatible` driver with a base URL.

export class PfIntegrationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PfIntegrationError'
  }
}

const stripCodeFences = (v: string) =>
  v.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()

const schemaSuffix = (system: string, schema: JsonSchema) =>
  `${system}\n\nReturn ONLY a single JSON object conforming to this JSON schema — no markdown, ` +
  `no code fences, no commentary:\n${JSON.stringify(schema)}`

export function textModelFor(integration: PfIntegration): string {
  const override = integration.config?.textModel?.trim()
  if (override) return override
  switch (integration.driver) {
    case 'anthropic':
      return getAnthropicModel()
    case 'groq':
      return getGroqTextModel()
    case 'gemini':
      return getGeminiTextModel()
    case 'openai':
      return getOpenAITextModel()
    default:
      // A custom endpoint has no sensible default; the admin must name a model.
      return ''
  }
}

export function visionModelFor(integration: PfIntegration): string | null {
  const override = integration.config?.visionModel?.trim()
  if (override) return override
  if (!integration.supports_vision) return null
  return textModelFor(integration) || null
}

const hasImages = (prompt: PfContent) => prompt.some((b) => b.type === 'image')
const stripImages = (prompt: PfContent) => prompt.filter((b) => b.type !== 'image')

type OpenAIPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

function toOpenAIParts(prompt: PfContent): OpenAIPart[] {
  const parts: OpenAIPart[] = []
  for (const block of prompt) {
    if (block.type === 'text') parts.push({ type: 'text', text: block.text })
    else if (block.type === 'image' && block.source.type === 'url') {
      parts.push({ type: 'image_url', image_url: { url: block.source.url } })
    }
  }
  return parts
}

/** Shared path for OpenAI itself, Groq, and any OpenAI-compatible endpoint. */
async function runOpenAICompatible<T>(opts: {
  integration: PfIntegration
  apiKey: string
  baseURL?: string
  model: string
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens: number
  useJsonSchema: boolean
}): Promise<{ data: T; usage: AiUsage }> {
  const client = new OpenAI({ apiKey: opts.apiKey, baseURL: opts.baseURL })

  const completion = await client.chat.completions.create({
    model: opts.model,
    temperature: 0.2,
    max_tokens: opts.maxTokens,
    response_format: opts.useJsonSchema
      ? {
          type: 'json_schema',
          json_schema: { name: 'productflow', schema: opts.schema, strict: false },
        }
      : { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: opts.useJsonSchema ? opts.system : schemaSuffix(opts.system, opts.schema),
      },
      { role: 'user', content: toOpenAIParts(opts.prompt) as never },
    ],
  })

  const text = completion.choices[0]?.message?.content?.trim()
  if (!text) throw new PfIntegrationError(`${opts.integration.label} returned no content`)

  let data: T
  try {
    data = JSON.parse(stripCodeFences(text)) as T
  } catch {
    throw new PfIntegrationError(`${opts.integration.label} returned invalid JSON`)
  }

  return {
    data,
    usage: {
      input_tokens: completion.usage?.prompt_tokens ?? 0,
      output_tokens: completion.usage?.completion_tokens ?? 0,
      cache_read_input_tokens: completion.usage?.prompt_tokens_details?.cached_tokens ?? 0,
    },
  }
}

const GEMINI_IMAGE_TIMEOUT_MS = 10_000
const GEMINI_MAX_IMAGE_BYTES = 4 * 1024 * 1024

async function toGeminiParts(prompt: PfContent) {
  const parts: Array<Record<string, unknown>> = []
  for (const block of prompt) {
    if (block.type === 'text') {
      parts.push({ text: block.text })
    } else if (block.type === 'image' && block.source.type === 'url') {
      const res = await fetch(block.source.url, {
        signal: AbortSignal.timeout(GEMINI_IMAGE_TIMEOUT_MS),
      }).catch(() => null)
      if (!res?.ok) continue
      const buffer = Buffer.from(await res.arrayBuffer())
      if (buffer.byteLength > GEMINI_MAX_IMAGE_BYTES) continue
      parts.push({
        inlineData: {
          mimeType: res.headers.get('content-type') || 'image/jpeg',
          data: buffer.toString('base64'),
        },
      })
    }
  }
  return parts
}

async function dispatch<T>(
  integration: PfIntegration,
  apiKey: string,
  opts: { system: string; prompt: PfContent; schema: JsonSchema; maxTokens: number },
): Promise<{ data: T; usage: AiUsage }> {
  const imagesPresent = hasImages(opts.prompt)
  const model = imagesPresent
    ? visionModelFor(integration) ?? textModelFor(integration)
    : textModelFor(integration)

  if (!model) {
    throw new PfIntegrationError(
      `${integration.label} has no model configured — set one in Integrations`,
    )
  }

  switch (integration.driver) {
    case 'anthropic': {
      const client = new Anthropic({ apiKey })
      const content: Anthropic.ContentBlockParam[] = opts.prompt
      const message = await client.messages
        .stream({
          model,
          max_tokens: opts.maxTokens,
          system: [{ type: 'text', text: opts.system }],
          messages: [{ role: 'user', content }],
          output_config: { format: { type: 'json_schema', schema: opts.schema } },
        })
        .finalMessage()

      const text = message.content.find(
        (b): b is Anthropic.TextBlock => b.type === 'text',
      )?.text
      if (!text) throw new PfIntegrationError('Claude returned no text content')

      return {
        data: JSON.parse(text) as T,
        usage: {
          input_tokens: message.usage.input_tokens ?? 0,
          output_tokens: message.usage.output_tokens ?? 0,
          cache_read_input_tokens: message.usage.cache_read_input_tokens ?? 0,
        },
      }
    }

    case 'gemini': {
      const ai = new GoogleGenAI({ apiKey })
      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: await toGeminiParts(opts.prompt) }] as never,
        config: {
          systemInstruction: schemaSuffix(opts.system, opts.schema),
          responseMimeType: 'application/json',
          // Gemini charges its internal "thinking" against this budget, so a
          // tight cap truncates the JSON.
          maxOutputTokens: Math.max(opts.maxTokens, 4096),
          temperature: 0.2,
        },
      })

      if (response.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
        throw new PfIntegrationError('Gemini hit the output token limit before finishing the JSON')
      }
      const text = response.text?.trim()
      if (!text) throw new PfIntegrationError('Gemini returned no text content')

      let data: T
      try {
        data = JSON.parse(stripCodeFences(text)) as T
      } catch {
        throw new PfIntegrationError('Gemini returned invalid JSON')
      }
      const usage = response.usageMetadata
      return {
        data,
        usage: {
          input_tokens: usage?.promptTokenCount ?? 0,
          output_tokens: usage?.candidatesTokenCount ?? 0,
          cache_read_input_tokens: usage?.cachedContentTokenCount ?? 0,
        },
      }
    }

    case 'groq':
      return runOpenAICompatible<T>({
        integration,
        apiKey,
        baseURL: 'https://api.groq.com/openai/v1',
        model,
        ...opts,
        // Groq does not accept json_schema response_format on every model.
        useJsonSchema: false,
      })

    case 'openai':
      return runOpenAICompatible<T>({ integration, apiKey, model, ...opts, useJsonSchema: true })

    case 'openai_compatible':
      return runOpenAICompatible<T>({
        integration,
        apiKey,
        baseURL: resolveBaseUrl(integration) ?? undefined,
        model,
        ...opts,
        // Third-party gateways vary in schema support; json_object is universal.
        useJsonSchema: false,
      })

    default:
      throw new PfIntegrationError(`${integration.driver} cannot run AI requests`)
  }
}

/**
 * Runs a structured call against an integration by slug.
 *
 * `noFallback` disables the drop-images retry — diagnostics need the raw truth,
 * production needs the resilience.
 */
export async function runIntegration<T>(opts: {
  slug: string
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens?: number
  noFallback?: boolean
}): Promise<{ data: T; usage: AiUsage }> {
  const integration = await getIntegration(opts.slug)
  if (!integration) throw new PfIntegrationError(`Integration "${opts.slug}" not found`)
  if (!integration.enabled) throw new PfIntegrationError(`${integration.label} is disabled`)

  const apiKey = resolveApiKey(integration)
  if (!apiKey) {
    throw new PfIntegrationError(
      `${integration.label} has no API key — add one in Integrations`,
    )
  }

  const call = { system: opts.system, schema: opts.schema, maxTokens: opts.maxTokens ?? 4000 }
  const imagesPresent = hasImages(opts.prompt)

  // Never send images to a provider that cannot read them.
  if (imagesPresent && !visionModelFor(integration)) {
    if (opts.noFallback) {
      throw new PfIntegrationError(`${integration.label} has no vision model configured`)
    }
    return dispatch<T>(integration, apiKey, { ...call, prompt: stripImages(opts.prompt) })
  }

  try {
    return await dispatch<T>(integration, apiKey, { ...call, prompt: opts.prompt })
  } catch (error) {
    if (!imagesPresent || opts.noFallback) throw error
    // Vision can fail for reasons outside our control (model retired, image
    // host down). The product text alone is usually enough.
    return dispatch<T>(integration, apiKey, { ...call, prompt: stripImages(opts.prompt) })
  }
}
