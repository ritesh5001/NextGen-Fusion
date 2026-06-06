import type Anthropic from '@anthropic-ai/sdk'
import type { AiUsage, JsonSchema } from './anthropic'

export class GroqNotConfiguredError extends Error {
  constructor() {
    super('Groq is not configured')
    this.name = 'GroqNotConfiguredError'
  }
}

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions'

export function getGroqTextModel(): string {
  // GROQ_TEXT_MODEL is the dedicated override; falls back to the shared
  // GROQ_MODEL used elsewhere, then a sensible default.
  return process.env.GROQ_TEXT_MODEL || process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
}

export function getGroqVisionModel(): string {
  return process.env.GROQ_VISION_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct'
}

type UserContent = string | Anthropic.ContentBlockParam[]

type OpenAIPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } }

function stripCodeFences(value: string): string {
  return value.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

// Translate the Anthropic content blocks we use (text + image url/base64) into
// the OpenAI chat-completions shape Groq expects. Images switch the request to a
// vision model.
function toOpenAIContent(prompt: UserContent): {
  content: string | OpenAIPart[]
  hasImage: boolean
} {
  if (typeof prompt === 'string') return { content: prompt, hasImage: false }

  let hasImage = false
  const parts: OpenAIPart[] = []
  for (const block of prompt) {
    if (block.type === 'text') {
      parts.push({ type: 'text', text: block.text })
    } else if (block.type === 'image') {
      hasImage = true
      const source = block.source
      const url =
        source.type === 'url'
          ? source.url
          : `data:${source.media_type};base64,${source.data}`
      parts.push({ type: 'image_url', image_url: { url } })
    }
  }
  return { content: parts, hasImage }
}

/**
 * Groq counterpart to anthropic.ts's generateStructured. Groq exposes an
 * OpenAI-compatible API but no JSON-schema/structured-output mode on every
 * model, so we use json_object mode and append the schema to the system prompt
 * to steer the shape. There is no prompt caching, so cache_read is always 0.
 */
export async function generateStructuredGroq<T>(opts: {
  system: string
  prompt: UserContent
  schema: JsonSchema
  maxTokens?: number
}): Promise<{ data: T; usage: AiUsage }> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new GroqNotConfiguredError()

  const { content, hasImage } = toOpenAIContent(opts.prompt)
  const system =
    `${opts.system}\n\n` +
    `Return ONLY a single JSON object that conforms to this JSON schema — no markdown, ` +
    `no code fences, no commentary:\n${JSON.stringify(opts.schema)}`

  const response = await fetch(GROQ_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: hasImage ? getGroqVisionModel() : getGroqTextModel(),
      temperature: 0.4,
      max_tokens: opts.maxTokens ?? 8000,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content },
      ],
    }),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => '')
    throw new Error(`Groq request failed (${response.status}): ${detail.slice(0, 500)}`)
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
    usage?: { prompt_tokens?: number; completion_tokens?: number }
  }

  const text = json.choices?.[0]?.message?.content?.trim()
  if (!text) throw new Error('Groq returned no text content')

  let data: T
  try {
    data = JSON.parse(stripCodeFences(text)) as T
  } catch {
    throw new Error('Groq returned invalid JSON for the requested schema')
  }

  return {
    data,
    usage: {
      input_tokens: json.usage?.prompt_tokens ?? 0,
      output_tokens: json.usage?.completion_tokens ?? 0,
      cache_read_input_tokens: 0,
    },
  }
}
