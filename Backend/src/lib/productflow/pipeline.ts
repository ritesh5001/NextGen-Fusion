import { getSupabaseAdmin } from '../supabase'
import { logRouteError } from '../http-errors'
import { classifyMessage } from './classifier'
import {
  applyEdits,
  approveDraft,
  attachLooseImages,
  cancelDraft,
  createDraft,
  findMissingFields,
  getDraftImages,
  getOpenDraft,
  mergeProductData,
  updateDraft,
  type PfDraft,
} from './drafts'
import type { PfAiProvider } from './settings'
import type { PfClassifyResult } from './prompts'

// Phases 4-6 orchestration: classify → extract → merge into the open draft →
// decide whether to ask for something, offer review, or record an approval.

const DEFAULT_REQUIRED = ['name', 'price', 'category', 'images']

// Fallback category. Clients rarely state one, and blocking a complete product
// over it is worse than shipping it uncategorised — every platform accepts this
// value and it is trivial to reassign later in the store.
export const DEFAULT_CATEGORY = 'Uncategorized'

/**
 * Fills in values the client did not give but that the export needs.
 * Applied before the missing-field check, so a defaulted field never blocks.
 */
function applyDefaults(data: Record<string, unknown>): Record<string, unknown> {
  const filled = { ...data }
  const category = filled.category
  if (typeof category !== 'string' || !category.trim()) {
    filled.category = DEFAULT_CATEGORY
  }
  return filled
}

export type PipelineOutcome = {
  classification: string
  reply: string
  draftId: string | null
  productId: string | null
  missingFields: string[]
  /** Show the Approve / Edit / Cancel buttons with this reply. */
  awaitingReview: boolean
}

function money(value: unknown, currency: string): string {
  if (typeof value !== 'number') return ''
  const symbol = currency === 'INR' ? '₹' : ''
  return `${symbol}${value.toLocaleString('en-IN')}`
}

/** The review card the client sees before approving (spec §3). */
export function formatDraftSummary(
  data: Record<string, unknown>,
  imageCount: number,
  currency = 'INR',
): string {
  const lines: string[] = []
  lines.push(`<b>${data.name ?? 'Untitled product'}</b>`)

  const regular = money(data.regular_price, currency)
  const sale = money(data.sale_price, currency)
  if (regular && sale) lines.push(`${regular} → ${sale}`)
  else if (regular) lines.push(regular)

  if (data.category) lines.push(`Category: ${data.category}`)
  if (data.brand) lines.push(`Brand: ${data.brand}`)
  if (data.color) lines.push(`Colour: ${data.color}`)
  if (Array.isArray(data.sizes) && data.sizes.length) {
    lines.push(`Sizes: ${(data.sizes as string[]).join(', ')}`)
  }
  if (data.sku) lines.push(`SKU: ${data.sku}`)
  lines.push(`Images: ${imageCount}`)

  return lines.join('\n')
}

function humanFieldList(fields: string[]): string {
  const labels: Record<string, string> = {
    name: 'product name',
    price: 'price',
    regular_price: 'price',
    category: 'category',
    images: 'product images',
    description: 'description',
    brand: 'brand',
    color: 'colour',
    sizes: 'sizes',
    sku: 'SKU',
  }
  const named = fields.map((f) => labels[f] ?? f)
  if (named.length === 1) return named[0]
  return `${named.slice(0, -1).join(', ')} and ${named[named.length - 1]}`
}

async function loadRequiredFields(projectId: string | null): Promise<string[]> {
  if (!projectId) return DEFAULT_REQUIRED
  const { data } = await getSupabaseAdmin()
    .from('pf_projects')
    .select('required_fields')
    .eq('id', projectId)
    .maybeSingle()

  const required = data?.required_fields
  return Array.isArray(required) && required.length ? (required as string[]) : DEFAULT_REQUIRED
}

async function loadCurrency(projectId: string | null): Promise<string> {
  if (!projectId) return 'INR'
  const { data } = await getSupabaseAdmin()
    .from('pf_projects')
    .select('currency')
    .eq('id', projectId)
    .maybeSingle()
  return (data?.currency as string) || 'INR'
}

/**
 * Brings a draft up to date after new data, then decides what to say.
 * A draft that has everything moves to READY_FOR_REVIEW; otherwise the bot asks
 * for exactly what is missing rather than guessing (spec §18, §38).
 */
async function settleDraft(
  // reassigned when defaults are persisted
  // eslint-disable-next-line prefer-const
  draft: PfDraft,
  aiReply: string,
  autoApprove = false,
): Promise<PipelineOutcome> {
  await attachLooseImages(draft.client_id, draft.id)
  const images = await getDraftImages(draft.id)

  // Persist the defaults so the draft, the review card and the exported product
  // all agree on what the category is.
  const withDefaults = applyDefaults(draft.product_data)
  if (withDefaults.category !== draft.product_data.category) {
    draft = await updateDraft(draft.id, { productData: withDefaults })
  }

  const required = await loadRequiredFields(draft.project_id)
  const missing = findMissingFields(draft.product_data, required, images.length)

  const currency = await loadCurrency(draft.project_id)
  const summary = formatDraftSummary(draft.product_data, images.length, currency)

  if (missing.length) {
    const question = `I still need the ${humanFieldList(missing)}.`
    await updateDraft(draft.id, {
      status: 'NEEDS_INFORMATION',
      missingFields: missing,
      lastQuestion: question,
    })
    return {
      classification: 'PRODUCT',
      reply: `${summary}\n\n${question}`,
      draftId: draft.id,
      productId: null,
      missingFields: missing,
      awaitingReview: false,
    }
  }

  const ready = await updateDraft(draft.id, {
    status: 'READY_FOR_REVIEW',
    missingFields: [],
    lastQuestion: null,
  })

  // Opt-in per the spec's default-off review workflow (§24).
  if (autoApprove) {
    const product = await approveDraft(ready)
    if (product) {
      return {
        classification: 'PRODUCT',
        reply: `Saved <b>${product.name}</b>. ✅\n\n${summary}`,
        draftId: draft.id,
        productId: product.id,
        missingFields: [],
        awaitingReview: false,
      }
    }
  }

  return {
    classification: 'PRODUCT',
    reply: `${aiReply ? `${aiReply}\n\n` : ''}Product ready for review:\n\n${summary}`,
    draftId: draft.id,
    productId: null,
    missingFields: [],
    awaitingReview: true,
  }
}

/**
 * Runs classification + extraction + draft state for one stored message.
 * Returns what the bot should say back.
 */
export async function runPipeline(opts: {
  provider: PfAiProvider
  clientId: string
  projectId: string | null
  messageId: string
  text: string
  imageUrls: string[]
  autoApprove: boolean
}): Promise<PipelineOutcome> {
  const openDraft = await getOpenDraft(opts.clientId)

  let result: PfClassifyResult
  try {
    result = await classifyMessage({
      provider: opts.provider,
      clientId: opts.clientId,
      messageId: opts.messageId,
      text: opts.text,
      imageUrls: opts.imageUrls,
      draftData: openDraft?.product_data ?? null,
    })
  } catch (error) {
    logRouteError('productflow:classify', error)
    // The message is already stored; failing the AI call must not lose it.
    return {
      classification: 'ERROR',
      reply: 'I could not process that just now. Please try again in a moment.',
      draftId: openDraft?.id ?? null,
      productId: null,
      missingFields: [],
      awaitingReview: false,
    }
  }

  await getSupabaseAdmin()
    .from('pf_messages')
    .update({ classification: result.classification })
    .eq('id', opts.messageId)

  switch (result.classification) {
    case 'APPROVE': {
      if (!openDraft) {
        return outcome(result, 'There is no product waiting for approval right now.', null)
      }
      const product = await approveDraft(openDraft)
      if (!product) {
        return outcome(result, 'I need the product name before I can save it.', openDraft.id)
      }
      return {
        classification: result.classification,
        reply: `Saved <b>${product.name}</b>. ✅ Send the next product whenever you are ready.`,
        draftId: openDraft.id,
        productId: product.id,
        missingFields: [],
        awaitingReview: false,
      }
    }

    case 'CANCEL': {
      if (!openDraft) return outcome(result, 'There is nothing to cancel.', null)
      await cancelDraft(openDraft.id)
      return outcome(result, 'Cancelled. That product has been discarded.', null)
    }

    case 'EDIT': {
      if (!openDraft) {
        return outcome(result, 'There is no product open to edit. Send the product details first.', null)
      }
      const { data, applied } = applyEdits(openDraft.product_data, result.edits)
      if (!applied.length) {
        return outcome(result, result.reply || 'I did not catch what to change. Could you say it again?', openDraft.id)
      }
      const updated = await updateDraft(openDraft.id, { productData: data })
      return settleDraft(updated, result.reply, opts.autoApprove)
    }

    case 'PRODUCT':
    case 'MIXED': {
      if (!result.products.length) {
        // Images with no extractable text still belong to the open draft.
        if (openDraft) return settleDraft(openDraft, result.reply, opts.autoApprove)
        return outcome(result, result.reply || 'Got it.', null)
      }

      const [first, ...rest] = result.products

      let draft: PfDraft
      if (openDraft) {
        const merged = mergeProductData(openDraft.product_data, first, result.inferred_fields)
        draft = await updateDraft(openDraft.id, { productData: merged })
      } else {
        draft = await createDraft(
          opts.clientId,
          opts.projectId,
          mergeProductData({}, first, result.inferred_fields),
        )
      }

      // Several products in one message (spec §26): the first continues the
      // open draft, the others become their own drafts immediately.
      for (const extra of rest) {
        await createDraft(opts.clientId, opts.projectId, mergeProductData({}, extra, result.inferred_fields))
      }

      const settled = await settleDraft(draft, result.reply, opts.autoApprove)

      if (rest.length) {
        settled.reply += `\n\nI also started ${rest.length} more draft${rest.length > 1 ? 's' : ''} from that message.`
      }
      if (result.instructions.length) {
        settled.reply += `\n\nNoted: ${result.instructions.join('; ')}`
      }
      return settled
    }

    case 'CONVERSATION':
    default:
      return outcome(result, result.reply || 'Got it.', openDraft?.id ?? null)
  }
}

function outcome(result: PfClassifyResult, reply: string, draftId: string | null): PipelineOutcome {
  return {
    classification: result.classification,
    reply,
    draftId,
    productId: null,
    missingFields: [],
    awaitingReview: false,
  }
}
