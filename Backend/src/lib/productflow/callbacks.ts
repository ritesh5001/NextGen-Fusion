import { getSupabaseAdmin } from '../supabase'
import { sendMessage } from './telegram'
import {
  approveDraft,
  cancelDraft,
  getDraftImages,
  updateDraft,
  type PfDraft,
} from './drafts'
import { formatDraftSummary } from './pipeline'

// Handles the Approve / Edit / Cancel inline buttons (spec §24).
// callback_data format: pf:<action>:<draftId>

const DRAFT_COLUMNS = 'id, client_id, project_id, status, product_data, missing_fields'

export type PfCallbackAction = 'approve' | 'edit' | 'cancel'

export function parseCallbackData(
  data: string | undefined,
): { action: PfCallbackAction; draftId: string } | null {
  if (!data) return null
  const [prefix, action, draftId] = data.split(':')
  if (prefix !== 'pf' || !draftId) return null
  if (action !== 'approve' && action !== 'edit' && action !== 'cancel') return null
  return { action, draftId }
}

/**
 * Applies a button press.
 *
 * The draft is re-read and its ownership checked against the pressing client:
 * callback_data is attacker-controllable, so a valid-looking id must never let
 * one client approve another's draft.
 */
export async function handleCallback(opts: {
  token: string
  chatId: string
  clientId: string
  action: PfCallbackAction
  draftId: string
}): Promise<string> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_drafts')
    .select(DRAFT_COLUMNS)
    .eq('id', opts.draftId)
    .maybeSingle()

  const draft = data as PfDraft | null
  if (!draft || draft.client_id !== opts.clientId) {
    return 'That product is no longer available.'
  }

  if (draft.status === 'APPROVED') return 'That product was already saved.'
  if (draft.status === 'CANCELLED') return 'That product was already cancelled.'

  switch (opts.action) {
    case 'approve': {
      const product = await approveDraft(draft)
      if (!product) return 'I need the product name before I can save it.'
      return `Saved <b>${product.name}</b>. ✅`
    }
    case 'cancel': {
      await cancelDraft(draft.id)
      return 'Cancelled. That product has been discarded.'
    }
    case 'edit': {
      // Reopen so the next message merges in rather than being read as a new product.
      await updateDraft(draft.id, { status: 'DRAFT' })
      const images = await getDraftImages(draft.id)
      const summary = formatDraftSummary(draft.product_data, images.length)
      return `${summary}\n\nWhat should I change? For example: "price 1299" or "category Men's Hoodies".`
    }
  }
}

export async function replyToCallback(
  token: string,
  chatId: string,
  text: string,
): Promise<void> {
  await sendMessage(token, chatId, text).catch(() => {})
}
