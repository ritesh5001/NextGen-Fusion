import type Anthropic from '@anthropic-ai/sdk'
import { GoogleGenAI } from '@google/genai'
import { generateStructured, type AiUsage, type JsonSchema } from '../anthropic'
import { generateStructuredGroq } from '../groq'
import { getOpenAI } from '../openai'
import type { PfAiProvider } from './settings'

// One structured-JSON call across all four providers the admin can choose.
//
// Anthropic's ContentBlockParam is the internal content format (it is already
// the convention in this codebase and carries both text and images); the Groq,
// Gemini and OpenAI adapters translate from it.

export type PfContent = Anthropic.ContentBlockParam[]

export class PfAiNotConfiguredError extends Error {
  constructor(provider: PfAiProvider) {
    super(`${provider} is not configured`)
    this.name = 'PfAiNotConfiguredError'
  }
}

export function textBlock(text: string): Anthropic.ContentBlockParam {
  return { type: 'text', text }
}

export function imageBlock(url: string): Anthropic.ContentBlockParam {
  return { type: 'image', source: { type: 'url', url } }
}

function stripCodeFences(value: string): string {
  return value.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

/**
 * Schema-in-prompt fallback used by the providers whose JSON mode does not take
 * a schema object. Keeps the shape steerable without depending on each vendor's
 * schema dialect.
 */
function systemWithSchema(system: string, schema: JsonSchema): string {
  return (
    `${system}\n\n` +
    'Return ONLY a single JSON object conforming to this JSON schema — no markdown, ' +
    `no code fences, no commentary:\n${JSON.stringify(schema)}`
  )
}

// ── Gemini ──────────────────────────────────────────────────────────────────

let genAi: GoogleGenAI | null = null

function getGenAI(): GoogleGenAI {
  if (genAi) return genAi
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) throw new PfAiNotConfiguredError('gemini')
  genAi = new GoogleGenAI({ apiKey })
  return genAi
}

export function getGeminiTextModel(): string {
  // The "-latest" alias tracks the current Flash release. Pinning a dated model
  // breaks silently when Google retires it for new accounts.
  return process.env.GEMINI_TEXT_MODEL || 'gemini-flash-latest'
}

/**
 * Gemini cannot fetch arbitrary remote images, so image blocks are downloaded
 * and passed inline as base64 parts.
 */
async function toGeminiParts(prompt: PfContent) {
  const parts: Array<Record<string, unknown>> = []
  for (const block of prompt) {
    if (block.type === 'text') {
      parts.push({ text: block.text })
      continue
    }
    if (block.type === 'image' && block.source.type === 'url') {
      const res = await fetch(block.source.url)
      if (!res.ok) continue
      const buffer = Buffer.from(await res.arrayBuffer())
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

async function generateStructuredGemini<T>(opts: {
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens?: number
}): Promise<{ data: T; usage: AiUsage }> {
  const ai = getGenAI()
  const parts = await toGeminiParts(opts.prompt)

  const response = await ai.models.generateContent({
    model: getGeminiTextModel(),
    contents: [{ role: 'user', parts }] as never,
    config: {
      systemInstruction: systemWithSchema(opts.system, opts.schema),
      responseMimeType: 'application/json',
      // Gemini's internal "thinking" tokens are charged against this budget, so
      // a tight limit truncates the JSON mid-object and the parse fails. Keep a
      // generous floor.
      maxOutputTokens: Math.max(opts.maxTokens ?? 8000, 4096),
      temperature: 0.2,
    },
  })

  if (response.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
    throw new Error('Gemini hit the output token limit before finishing the JSON')
  }

  const text = response.text?.trim()
  if (!text) throw new Error('Gemini returned no text content')

  let data: T
  try {
    data = JSON.parse(stripCodeFences(text)) as T
  } catch {
    throw new Error('Gemini returned invalid JSON for the requested schema')
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

// ── OpenAI ──────────────────────────────────────────────────────────────────

export function getOpenAITextModel(): string {
  return process.env.OPENAI_TEXT_MODEL || 'gpt-4o-mini'
}

type OpenAIPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

function toOpenAIParts(prompt: PfContent): OpenAIPart[] {
  const parts: OpenAIPart[] = []
  for (const block of prompt) {
    if (block.type === 'text') {
      parts.push({ type: 'text', text: block.text })
    } else if (block.type === 'image' && block.source.type === 'url') {
      // OpenAI fetches remote image URLs itself, so no download is needed.
      parts.push({ type: 'image_url', image_url: { url: block.source.url } })
    }
  }
  return parts
}

async function generateStructuredOpenAI<T>(opts: {
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens?: number
}): Promise<{ data: T; usage: AiUsage }> {
  if (!process.env.OPENAI_API_KEY) throw new PfAiNotConfiguredError('openai')
  const client = getOpenAI()

  const completion = await client.chat.completions.create({
    model: getOpenAITextModel(),
    temperature: 0.2,
    max_tokens: opts.maxTokens ?? 8000,
    // strict:false — the schema uses optional fields, which strict mode forbids.
    response_format: {
      type: 'json_schema',
      json_schema: { name: 'productflow', schema: opts.schema, strict: false },
    },
    messages: [
      { role: 'system', content: opts.system },
      { role: 'user', content: toOpenAIParts(opts.prompt) as never },
    ],
  })

  const text = completion.choices[0]?.message?.content?.trim()
  if (!text) throw new Error('OpenAI returned no text content')

  let data: T
  try {
    data = JSON.parse(stripCodeFences(text)) as T
  } catch {
    throw new Error('OpenAI returned invalid JSON for the requested schema')
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

// ── Dispatcher ──────────────────────────────────────────────────────────────

/**
 * Whether a provider can accept image content.
 *
 * Groq currently serves no multimodal model — the old
 * `llama-4-scout-17b-16e-instruct` returns 404 model_not_found — so images must
 * be dropped rather than sent. Setting GROQ_VISION_MODEL re-enables vision if
 * Groq ships one again.
 */
export function providerSupportsVision(provider: PfAiProvider): boolean {
  if (provider === 'groq') return Boolean(process.env.GROQ_VISION_MODEL)
  return true
}

const hasImages = (prompt: PfContent) => prompt.some((b) => b.type === 'image')
const stripImages = (prompt: PfContent) => prompt.filter((b) => b.type !== 'image')

function dispatch<T>(opts: {
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens?: number
  provider: PfAiProvider
}): Promise<{ data: T; usage: AiUsage }> {
  switch (opts.provider) {
    case 'gemini':
      return generateStructuredGemini<T>(opts)
    case 'openai':
      return generateStructuredOpenAI<T>(opts)
    case 'groq':
      if (!process.env.GROQ_API_KEY) throw new PfAiNotConfiguredError('groq')
      return generateStructuredGroq<T>(opts)
    case 'claude':
    default:
      if (!process.env.ANTHROPIC_API_KEY) throw new PfAiNotConfiguredError('claude')
      return generateStructured<T>({ ...opts, provider: 'claude' })
  }
}

export async function generateStructuredPf<T>(opts: {
  system: string
  prompt: PfContent
  schema: JsonSchema
  maxTokens?: number
  provider: PfAiProvider
}): Promise<{ data: T; usage: AiUsage }> {
  const imagesPresent = hasImages(opts.prompt)

  // Never send images to a provider that cannot read them.
  if (imagesPresent && !providerSupportsVision(opts.provider)) {
    return dispatch<T>({ ...opts, prompt: stripImages(opts.prompt) })
  }

  try {
    return await dispatch<T>(opts)
  } catch (error) {
    // A vision call can still fail for reasons outside our control (model
    // retired, image host unreachable, size limits). The product text alone is
    // usually enough, so retry without images rather than losing the message.
    if (!imagesPresent) throw error
    return dispatch<T>({ ...opts, prompt: stripImages(opts.prompt) })
  }
}
