// The common inbound-message shape every channel adapter produces.
//
// Telegram is the first adapter; a WhatsApp adapter later converts its own
// webhook payload into this same structure, so the ingestion pipeline, AI
// engine, product engine and CSV engine never learn about Telegram at all.

export type PfSource = 'telegram' | 'whatsapp'

export type PfMessageType = 'text' | 'image' | 'document' | 'other'

export type PfInboundMedia = {
  /** Channel-native file identifier used to fetch the bytes later. */
  fileId: string
  mimeType?: string
  fileSize?: number
  width?: number
  height?: number
  filename?: string
}

export type PfInboundMessage = {
  source: PfSource
  externalUserId: string
  externalChatId: string
  externalMessageId: string
  /** Groups media sent together as one album, so N images stay one product. */
  mediaGroupId?: string
  type: PfMessageType
  text: string
  media: PfInboundMedia[]
  senderName: string
  senderUsername?: string
  sentAt: string
  raw: unknown
}

// ── Telegram adapter ────────────────────────────────────────────────────────

type TelegramPhotoSize = {
  file_id: string
  file_unique_id: string
  width: number
  height: number
  file_size?: number
}

type TelegramDocument = {
  file_id: string
  file_name?: string
  mime_type?: string
  file_size?: number
}

type TelegramUser = {
  id: number
  is_bot?: boolean
  first_name?: string
  last_name?: string
  username?: string
}

type TelegramMessage = {
  message_id: number
  from?: TelegramUser
  chat?: { id: number; type?: string }
  date?: number
  text?: string
  caption?: string
  media_group_id?: string
  photo?: TelegramPhotoSize[]
  document?: TelegramDocument
}

export type TelegramUpdate = {
  update_id: number
  message?: TelegramMessage
  edited_message?: TelegramMessage
  callback_query?: {
    id: string
    from?: TelegramUser
    message?: TelegramMessage
    data?: string
  }
}

function displayName(user?: TelegramUser): string {
  if (!user) return 'Unknown'
  const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim()
  return name || user.username || String(user.id)
}

/**
 * Converts a raw Telegram update into the common message shape.
 * Returns null for updates the pipeline does not handle (e.g. a bot's own
 * messages, or updates with no usable content).
 */
export function fromTelegramUpdate(update: TelegramUpdate): PfInboundMessage | null {
  const message = update.message ?? update.edited_message
  if (!message) return null
  if (message.from?.is_bot) return null

  const externalUserId = message.from?.id ? String(message.from.id) : null
  const externalChatId = message.chat?.id ? String(message.chat.id) : null
  if (!externalUserId || !externalChatId) return null

  const media: PfInboundMedia[] = []
  let type: PfMessageType = 'text'

  if (message.photo?.length) {
    // Telegram sends the same photo in several resolutions; the last entry is
    // the largest, which is the one worth keeping.
    const largest = message.photo[message.photo.length - 1]
    media.push({
      fileId: largest.file_id,
      width: largest.width,
      height: largest.height,
      fileSize: largest.file_size,
      mimeType: 'image/jpeg',
    })
    type = 'image'
  } else if (message.document) {
    const isImage = message.document.mime_type?.startsWith('image/')
    media.push({
      fileId: message.document.file_id,
      mimeType: message.document.mime_type,
      fileSize: message.document.file_size,
      filename: message.document.file_name,
    })
    type = isImage ? 'image' : 'document'
  }

  const text = (message.text ?? message.caption ?? '').trim()
  if (type === 'text' && !text) return null

  return {
    source: 'telegram',
    externalUserId,
    externalChatId,
    externalMessageId: String(message.message_id),
    mediaGroupId: message.media_group_id,
    type,
    text,
    media,
    senderName: displayName(message.from),
    senderUsername: message.from?.username,
    sentAt: message.date ? new Date(message.date * 1000).toISOString() : new Date().toISOString(),
    raw: update,
  }
}
