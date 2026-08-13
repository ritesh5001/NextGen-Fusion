import { getSupabaseAdmin } from '../supabase'
import { logRouteError, getErrorMessage } from '../http-errors'
import { sendMessage } from './telegram'
import { storeInboundImage, recordImageFailure } from './images'
import { loadPfSettings } from './settings'
import { runPipeline, type PipelineOutcome } from './pipeline'
import type { PfInboundMessage } from './message'

// The channel-agnostic ingestion pipeline (spec §28).
//
// Phases 1-3 cover: identify client → resolve project → store raw message →
// move media to Cloudinary. AI classification, product drafts and CSV plug in
// at the marked seam in later phases without changing anything above it.

export type PfClientRow = {
  id: string
  name: string
  status: string
  external_chat_id: string | null
  active_project_id: string | null
}

/**
 * Finds the client for a chat identity, registering unknown senders as
 * 'pending'.
 *
 * Auto-registering rather than rejecting means an admin can see who tried to
 * message the bot and approve them; 'pending' clients are logged but never
 * produce products, so a stranger who finds the public bot cannot inject data.
 */
export async function resolveClient(message: PfInboundMessage): Promise<PfClientRow> {
  const supabase = getSupabaseAdmin()

  const { data: existing, error } = await supabase
    .from('pf_clients')
    .select('id, name, status, external_chat_id, active_project_id')
    .eq('source', message.source)
    .eq('external_user_id', message.externalUserId)
    .maybeSingle()

  if (error) throw error

  if (existing) {
    // Keep the chat id fresh — it is what outbound replies are sent to.
    if (existing.external_chat_id !== message.externalChatId) {
      await supabase
        .from('pf_clients')
        .update({ external_chat_id: message.externalChatId })
        .eq('id', existing.id)
    }
    await supabase
      .from('pf_clients')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', existing.id)
    return existing as PfClientRow
  }

  const { data: created, error: insertError } = await supabase
    .from('pf_clients')
    .insert({
      name: message.senderName,
      source: message.source,
      external_user_id: message.externalUserId,
      external_chat_id: message.externalChatId,
      external_username: message.senderUsername ?? null,
      status: 'pending',
      last_message_at: new Date().toISOString(),
    })
    .select('id, name, status, external_chat_id, active_project_id')
    .single()

  if (insertError) throw insertError
  return created as PfClientRow
}

/** Looks up an existing client without creating one (used by button presses). */
export async function findClientByExternalId(
  source: string,
  externalUserId: string,
): Promise<PfClientRow | null> {
  const { data } = await getSupabaseAdmin()
    .from('pf_clients')
    .select('id, name, status, external_chat_id, active_project_id')
    .eq('source', source)
    .eq('external_user_id', externalUserId)
    .maybeSingle()

  return (data as PfClientRow) ?? null
}

/** The client's active project, falling back to their only project if unset. */
export async function resolveProjectId(client: PfClientRow): Promise<string | null> {
  if (client.active_project_id) return client.active_project_id

  const supabase = getSupabaseAdmin()
  const { data } = await supabase
    .from('pf_projects')
    .select('id')
    .eq('client_id', client.id)
    .eq('status', 'active')
    .order('created_at', { ascending: true })
    .limit(2)

  if (!data || data.length !== 1) return null

  const projectId = data[0].id as string
  await supabase.from('pf_clients').update({ active_project_id: projectId }).eq('id', client.id)
  return projectId
}

export type IngestResult = {
  messageId: string | null
  clientId: string
  clientStatus: string
  projectId: string | null
  imagesStored: number
  imagesFailed: number
  duplicate: boolean
  outcome: PipelineOutcome | null
}

/**
 * Processes one inbound message end-to-end.
 *
 * The raw message is written BEFORE any media or AI work, so a failure further
 * down never loses what the client actually said.
 */
export async function ingestMessage(message: PfInboundMessage): Promise<IngestResult> {
  const supabase = getSupabaseAdmin()
  const client = await resolveClient(message)
  const projectId = await resolveProjectId(client)

  const { data: messageRow, error: messageError } = await supabase
    .from('pf_messages')
    .insert({
      client_id: client.id,
      project_id: projectId,
      source: message.source,
      external_user_id: message.externalUserId,
      external_chat_id: message.externalChatId,
      external_message_id: message.externalMessageId,
      media_group_id: message.mediaGroupId ?? null,
      message_type: message.type,
      text: message.text || null,
      raw_payload: message.raw as never,
    })
    .select('id')
    .single()

  // A unique-violation means Telegram redelivered an update we already handled.
  if (messageError) {
    if ((messageError as { code?: string }).code === '23505') {
      return {
        messageId: null,
        clientId: client.id,
        clientStatus: client.status,
        projectId,
        imagesStored: 0,
        imagesFailed: 0,
        duplicate: true,
        outcome: null,
      }
    }
    throw messageError
  }

  const messageId = messageRow.id as string

  let imagesStored = 0
  let imagesFailed = 0

  // Images are stored for pending clients too. Telegram file ids stay valid but
  // the bytes are only reachable while the bot knows about them, and a real
  // client usually sends photos before an admin has had time to activate them —
  // dropping those images loses work that cannot be recovered. Only a blocked
  // client is skipped. AI (the expensive part) still waits for activation.
  if (message.media.length && client.status !== 'blocked') {
    const settings = await loadPfSettings()
    const token = settings.telegram_bot_token

    if (token) {
      // Position continues from whatever this client already sent, so an album
      // split across several updates keeps a stable order.
      const { count } = await supabase
        .from('pf_product_images')
        .select('id', { count: 'exact', head: true })
        .eq('client_id', client.id)
        .is('product_id', null)

      let position = count ?? 0

      for (const media of message.media) {
        try {
          await storeInboundImage({
            token,
            source: message.source,
            media,
            clientId: client.id,
            projectId,
            messageId,
            position,
          })
          imagesStored++
        } catch (error) {
          imagesFailed++
          logRouteError('productflow:image', error)
          await recordImageFailure({
            source: message.source,
            fileId: media.fileId,
            clientId: client.id,
            projectId,
            messageId,
            position,
            error: getErrorMessage(error),
          }).catch(() => {})
        }
        position++
      }
    }
  }

  // ── Phases 4-6: classify, extract, update the draft ──────────────────────
  // Only for activated clients; a 'pending' stranger's message is logged but
  // never costs an AI call or creates data.
  let outcome: PipelineOutcome | null = null

  if (client.status === 'active') {
    const settings = await loadPfSettings()
    const imageUrls = await recentDraftImageUrls(client.id)
    outcome = await runPipeline({
      provider: settings.ai_provider,
      clientId: client.id,
      projectId,
      messageId,
      text: message.text,
      imageUrls,
      autoApprove: settings.auto_approve,
    })
  }

  return {
    messageId,
    clientId: client.id,
    clientStatus: client.status,
    projectId,
    imagesStored,
    imagesFailed,
    duplicate: false,
    outcome,
  }
}

/**
 * Images the AI should look at: those already attached to the open draft plus
 * any still unassigned. Capped because vision tokens are the expensive part.
 */
async function recentDraftImageUrls(clientId: string): Promise<string[]> {
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

const NOTICE_WINDOW_MS = 10 * 60 * 1000

/**
 * True when this client already received the "not linked yet" notice in the
 * last few minutes, judged by whether they had an earlier message in that
 * window (the notice is sent at most once per burst).
 */
async function alreadyNotifiedRecently(clientId: string): Promise<boolean> {
  const since = new Date(Date.now() - NOTICE_WINDOW_MS).toISOString()
  const { count } = await getSupabaseAdmin()
    .from('pf_messages')
    .select('id', { count: 'exact', head: true })
    .eq('client_id', clientId)
    .gte('created_at', since)

  return (count ?? 0) > 1
}

/** Inline Approve / Edit / Cancel buttons shown on a completed draft (spec §24). */
function reviewKeyboard(draftId: string) {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '✅ Approve', callback_data: `pf:approve:${draftId}` },
          { text: '✏️ Edit', callback_data: `pf:edit:${draftId}` },
          { text: '❌ Cancel', callback_data: `pf:cancel:${draftId}` },
        ],
      ],
    },
  }
}

/** Sends the bot's reply for one ingested message. */
export async function sendIngestReply(
  token: string,
  chatId: string,
  result: IngestResult,
): Promise<void> {
  if (result.duplicate) return

  if (result.clientStatus !== 'active') {
    // Sending a product with photos produces one update per photo; replying to
    // each would spam the client with the same notice several times over.
    if (await alreadyNotifiedRecently(result.clientId)) return

    await sendMessage(
      token,
      chatId,
      'Thanks — I have saved your messages and images. This chat is not linked to a ' +
        'project yet, so the NextGen Fusion team has been notified. Once it is activated ' +
        'I will process everything you have already sent — you will not need to send it again.',
    ).catch((error) => logRouteError('productflow:reply', error))
    return
  }

  const outcome = result.outcome
  if (!outcome) return

  let text = outcome.reply
  if (result.imagesFailed > 0) {
    text += `\n\n⚠️ ${result.imagesFailed} image(s) could not be saved — please resend them.`
  }

  const extra =
    outcome.awaitingReview && outcome.draftId ? reviewKeyboard(outcome.draftId) : undefined

  await sendMessage(token, chatId, text, extra).catch((error) => {
    logRouteError('productflow:reply', error)
  })
}
