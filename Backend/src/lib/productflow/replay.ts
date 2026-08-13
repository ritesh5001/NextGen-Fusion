import { getSupabaseAdmin } from '../supabase'
import { logRouteError, getErrorMessage } from '../http-errors'
import { fromTelegramUpdate, type TelegramUpdate } from './message'
import { storeInboundImage, recordImageFailure } from './images'
import { loadPfSettings } from './settings'
import { runPipeline } from './pipeline'
import { resolveProjectId, type PfClientRow } from './ingest'

// Replays messages a client sent before they were activated.
//
// A real client almost always sends their product details first and waits for
// someone to notice. Those messages are stored but deliberately not processed,
// so without a replay the client has to type everything again. This re-runs the
// pipeline over what they already sent.

const MAX_REPLAY_MESSAGES = 40

export type ReplayResult = {
  messagesProcessed: number
  imagesStored: number
  imagesFailed: number
  lastReply: string | null
  errors: string[]
}

/**
 * Processes every stored message for a client that has never been classified,
 * oldest first so a multi-message product assembles in the original order.
 */
export async function replayClientMessages(client: PfClientRow): Promise<ReplayResult> {
  const supabase = getSupabaseAdmin()
  const settings = await loadPfSettings()
  const result: ReplayResult = {
    messagesProcessed: 0,
    imagesStored: 0,
    imagesFailed: 0,
    lastReply: null,
    errors: [],
  }

  const { data: rows, error } = await supabase
    .from('pf_messages')
    .select('id, text, message_type, raw_payload')
    .eq('client_id', client.id)
    .is('classification', null)
    .order('created_at', { ascending: true })
    .limit(MAX_REPLAY_MESSAGES)

  if (error) throw error
  if (!rows?.length) return result

  const projectId = await resolveProjectId(client)

  for (const row of rows) {
    const messageId = row.id as string

    // Recover the original media from the stored Telegram payload so images
    // that were skipped while pending can still be fetched.
    const inbound = row.raw_payload
      ? fromTelegramUpdate(row.raw_payload as TelegramUpdate)
      : null

    if (inbound?.media.length && settings.telegram_bot_token) {
      const { count } = await supabase
        .from('pf_product_images')
        .select('id', { count: 'exact', head: true })
        .eq('client_id', client.id)
        .is('product_id', null)

      let position = count ?? 0
      for (const media of inbound.media) {
        try {
          await storeInboundImage({
            token: settings.telegram_bot_token,
            source: inbound.source,
            media,
            clientId: client.id,
            projectId,
            messageId,
            position,
          })
          result.imagesStored++
        } catch (err) {
          result.imagesFailed++
          logRouteError('productflow:replay:image', err)
          await recordImageFailure({
            source: inbound.source,
            fileId: media.fileId,
            clientId: client.id,
            projectId,
            messageId,
            position,
            error: getErrorMessage(err),
          }).catch(() => {})
        }
        position++
      }
    }

    // An image-only message has no text to classify; its images are already
    // attached and will be picked up by the next product message's draft.
    const text = (row.text as string) ?? ''
    if (!text.trim()) {
      await supabase
        .from('pf_messages')
        .update({ classification: 'IMAGE' })
        .eq('id', messageId)
      continue
    }

    try {
      const imageUrls = await unassignedImageUrls(client.id)
      const outcome = await runPipeline({
        provider: settings.ai_provider,
        clientId: client.id,
        projectId,
        messageId,
        text,
        imageUrls,
        autoApprove: settings.auto_approve,
      })
      result.messagesProcessed++
      result.lastReply = outcome.reply
    } catch (err) {
      logRouteError('productflow:replay:pipeline', err)
      result.errors.push(getErrorMessage(err))
    }
  }

  return result
}

async function unassignedImageUrls(clientId: string): Promise<string[]> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_images')
    .select('url')
    .eq('client_id', clientId)
    .eq('status', 'stored')
    .is('product_id', null)
    .order('created_at', { ascending: false })
    .limit(6)

  return ((data ?? []) as { url: string | null }[])
    .map((r) => r.url)
    .filter((u): u is string => Boolean(u))
    .reverse()
}
