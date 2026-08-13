import { getSupabaseAdmin } from '../supabase'
import { imageBlock, textBlock, type PfContent } from './ai'
import { runIntegration } from './ai-runner'
import {
  PF_CLASSIFICATIONS,
  PF_CLASSIFY_SCHEMA,
  PF_SYSTEM_PROMPT,
  type PfClassification,
  type PfClassifyResult,
  type PfExtractedProduct,
} from './prompts'
import type { PfAiProvider } from './settings'

// How much prior conversation the model sees. Enough for a product spread over
// several messages (spec §6) without paying for the client's whole history.
const CONTEXT_MESSAGE_LIMIT = 12

// Vision is expensive; the newest few images carry the useful signal.
const MAX_IMAGES_PER_CALL = 4

type ContextMessage = { message_type: string; text: string | null; created_at: string }

async function loadRecentMessages(clientId: string, excludeId: string): Promise<ContextMessage[]> {
  const { data } = await getSupabaseAdmin()
    .from('pf_messages')
    .select('message_type, text, created_at')
    .eq('client_id', clientId)
    .neq('id', excludeId)
    .order('created_at', { ascending: false })
    .limit(CONTEXT_MESSAGE_LIMIT)

  return ((data ?? []) as ContextMessage[]).reverse()
}

function normalizeProduct(raw: unknown): PfExtractedProduct | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  const product: PfExtractedProduct = {}

  const text = (v: unknown): string | undefined => {
    if (typeof v !== 'string') return undefined
    const t = v.trim()
    // Models sometimes emit these instead of omitting the field.
    if (!t || ['n/a', 'na', 'unknown', 'null', 'none', '-'].includes(t.toLowerCase())) return undefined
    return t
  }

  // Prices arrive as 1499, "1499", "₹1,499" or "1499rs" depending on provider.
  const num = (v: unknown): number | undefined => {
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0) return v
    if (typeof v === 'string') {
      const cleaned = v.replace(/[^\d.]/g, '')
      const n = Number(cleaned)
      if (Number.isFinite(n) && n > 0) return n
    }
    return undefined
  }

  const list = (v: unknown): string[] | undefined => {
    if (!Array.isArray(v)) return undefined
    const items = v.map((x) => text(x)).filter((x): x is string => Boolean(x))
    return items.length ? items : undefined
  }

  product.name = text(r.name)
  product.description = text(r.description)
  product.short_description = text(r.short_description)
  product.regular_price = num(r.regular_price)
  product.sale_price = num(r.sale_price)
  product.sku = text(r.sku)
  product.category = text(r.category)
  product.brand = text(r.brand)
  product.color = text(r.color)
  product.sizes = list(r.sizes)
  product.tags = list(r.tags)

  // Guard against the model swapping the two prices.
  if (
    product.regular_price !== undefined &&
    product.sale_price !== undefined &&
    product.sale_price > product.regular_price
  ) {
    const higher = product.sale_price
    product.sale_price = product.regular_price
    product.regular_price = higher
  }

  const hasAnything = Object.values(product).some((v) => v !== undefined)
  return hasAnything ? product : null
}

function normalizeResult(raw: unknown): PfClassifyResult {
  const r = (raw ?? {}) as Record<string, unknown>

  const classification = PF_CLASSIFICATIONS.includes(r.classification as PfClassification)
    ? (r.classification as PfClassification)
    : 'CONVERSATION'

  const products = Array.isArray(r.products)
    ? r.products.map(normalizeProduct).filter((p): p is PfExtractedProduct => p !== null)
    : []

  const strings = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0) : []

  const edits = Array.isArray(r.edits)
    ? (r.edits as unknown[])
        .map((e) => {
          if (!e || typeof e !== 'object') return null
          const { field, value } = e as Record<string, unknown>
          if (typeof field !== 'string' || typeof value !== 'string') return null
          return { field: field.trim(), value: value.trim() }
        })
        .filter((e): e is { field: string; value: string } => e !== null && Boolean(e.field))
    : []

  return {
    classification,
    reply: typeof r.reply === 'string' ? r.reply.trim() : '',
    products,
    instructions: strings(r.instructions),
    edits,
    inferred_fields: strings(r.inferred_fields),
  }
}

/**
 * Classifies one incoming message and extracts any product data it contains.
 *
 * Prior messages and the current draft are supplied as context so information
 * spread across several messages resolves into one product (spec §6).
 */
export async function classifyMessage(opts: {
  provider: PfAiProvider
  clientId: string
  messageId: string
  text: string
  imageUrls: string[]
  draftData: Record<string, unknown> | null
}): Promise<PfClassifyResult> {
  const history = await loadRecentMessages(opts.clientId, opts.messageId)

  const parts: string[] = []

  if (history.length) {
    const lines = history.map((m) => {
      const label = m.message_type === 'text' ? '' : `[${m.message_type}] `
      return `- ${label}${m.text || '(no text)'}`
    })
    parts.push(`Earlier messages from this client (oldest first):\n${lines.join('\n')}`)
  }

  if (opts.draftData && Object.keys(opts.draftData).length) {
    parts.push(
      'A product draft is already in progress for this client. Treat the new message as ' +
        'continuing or editing THIS product unless it clearly starts a different one:\n' +
        JSON.stringify(opts.draftData, null, 2),
    )
  }

  parts.push(`New message:\n${opts.text || '(no text — images only)'}`)

  if (opts.imageUrls.length) {
    parts.push(
      `${opts.imageUrls.length} image(s) came with this message. Use them to infer product ` +
        'details only where the client has not stated them.',
    )
  }

  const content: PfContent = [textBlock(parts.join('\n\n'))]
  for (const url of opts.imageUrls.slice(-MAX_IMAGES_PER_CALL)) {
    content.push(imageBlock(url))
  }

  // `provider` is the integration slug the admin selected.
  const { data } = await runIntegration<unknown>({
    slug: opts.provider,
    system: PF_SYSTEM_PROMPT,
    prompt: content,
    schema: PF_CLASSIFY_SCHEMA,
    maxTokens: 4000,
  })

  return normalizeResult(data)
}
