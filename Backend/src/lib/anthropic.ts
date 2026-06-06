import Anthropic from '@anthropic-ai/sdk'
import { generateStructuredGroq } from './groq'

export class AnthropicNotConfiguredError extends Error {
  constructor() {
    super('Anthropic is not configured')
    this.name = 'AnthropicNotConfiguredError'
  }
}

// Which LLM backend handles a structured-generation call. Selected per request
// from the admin UI; Claude (Anthropic) is the default everywhere.
export type AiProvider = 'claude' | 'groq'

// Normalised token usage shared across providers (Groq has no prompt caching, so
// cache_read_input_tokens is always 0 there).
export type AiUsage = {
  input_tokens: number
  output_tokens: number
  cache_read_input_tokens: number
}

export function resolveProvider(value: unknown): AiProvider {
  return value === 'groq' ? 'groq' : 'claude'
}

export function providerLabel(provider: AiProvider): string {
  return provider === 'groq' ? 'Groq' : 'Anthropic'
}

export function isAiProviderConfigured(provider: AiProvider): boolean {
  return provider === 'groq' ? !!process.env.GROQ_API_KEY : !!process.env.ANTHROPIC_API_KEY
}

let cached: Anthropic | null = null

export function getAnthropic(): Anthropic {
  if (cached) return cached
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new AnthropicNotConfiguredError()
  cached = new Anthropic({ apiKey })
  return cached
}

export function getAnthropicModel(): string {
  return process.env.ANTHROPIC_MODEL || 'claude-opus-4-8'
}

// JSON Schema for structured output. Keep it simple — no maxLength/minLength
// (unsupported by structured outputs) and additionalProperties:false on objects.
export type JsonSchema = Record<string, unknown>

type UserContent = string | Anthropic.ContentBlockParam[]

/**
 * Run one structured-output Messages call and return parsed JSON of type T.
 *
 * The big, stable `system` string is cached (cache_control: ephemeral) so it is
 * reused across the ~7 per-file calls in a single generation — verify via the
 * returned `usage.cache_read_input_tokens` (> 0 after the first call).
 *
 * Streaming is required for large outputs (full PHP/CSS files) to avoid the
 * SDK's long-request HTTP timeout; we collect the complete message via
 * `.finalMessage()`.
 */
export async function generateStructured<T>(opts: {
  system: string
  prompt: UserContent
  schema: JsonSchema
  maxTokens?: number
  provider?: AiProvider
}): Promise<{ data: T; usage: AiUsage }> {
  if (opts.provider === 'groq') {
    return generateStructuredGroq<T>(opts)
  }
  const client = getAnthropic()
  const content: Anthropic.ContentBlockParam[] =
    typeof opts.prompt === 'string'
      ? [{ type: 'text', text: opts.prompt }]
      : opts.prompt

  const stream = client.messages.stream({
    model: getAnthropicModel(),
    max_tokens: opts.maxTokens ?? 16000,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: opts.system,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content }],
    // effort + structured-output JSON schema both live under output_config
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: opts.schema },
    },
  })

  const message = await stream.finalMessage()

  const text = message.content.find(
    (b): b is Anthropic.TextBlock => b.type === 'text',
  )?.text

  if (!text) throw new Error('Anthropic returned no text content')

  let data: T
  try {
    data = JSON.parse(text) as T
  } catch {
    throw new Error('Anthropic returned invalid JSON for the requested schema')
  }

  return {
    data,
    usage: {
      input_tokens: message.usage.input_tokens ?? 0,
      output_tokens: message.usage.output_tokens ?? 0,
      cache_read_input_tokens: message.usage.cache_read_input_tokens ?? 0,
    },
  }
}
