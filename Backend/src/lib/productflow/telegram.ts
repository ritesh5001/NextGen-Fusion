// Thin Telegram Bot API client.
//
// The bot token is NOT read from env: it is configured from the admin panel and
// stored in pf_settings, so the bot can be connected/rotated without a redeploy.
// Every call therefore takes an explicit token.

const API_BASE = 'https://api.telegram.org'

export class TelegramError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly description?: string,
  ) {
    super(message)
    this.name = 'TelegramError'
  }
}

type TelegramResponse<T> = {
  ok: boolean
  result?: T
  description?: string
  error_code?: number
}

async function call<T>(token: string, method: string, payload?: unknown): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/bot${token}/${method}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload ?? {}),
    })
  } catch (error) {
    throw new TelegramError(`Could not reach Telegram (${method})`, undefined, String(error))
  }

  const body = (await res.json().catch(() => null)) as TelegramResponse<T> | null
  if (!res.ok || !body?.ok) {
    // Telegram puts the useful reason in `description` ("Unauthorized",
    // "chat not found", …) — surface it so the admin UI can show something real.
    throw new TelegramError(
      body?.description || `Telegram ${method} failed`,
      res.status,
      body?.description,
    )
  }
  return body.result as T
}

export type TelegramBotInfo = {
  id: number
  is_bot: boolean
  first_name: string
  username?: string
}

export function getMe(token: string): Promise<TelegramBotInfo> {
  return call<TelegramBotInfo>(token, 'getMe')
}

export type TelegramWebhookInfo = {
  url: string
  has_custom_certificate: boolean
  pending_update_count: number
  last_error_date?: number
  last_error_message?: string
  max_connections?: number
}

export function getWebhookInfo(token: string): Promise<TelegramWebhookInfo> {
  return call<TelegramWebhookInfo>(token, 'getWebhookInfo')
}

/**
 * Registers the webhook. `secretToken` is echoed back by Telegram in the
 * X-Telegram-Bot-Api-Secret-Token header on every update, which is how the
 * webhook route proves a request really came from Telegram.
 */
export function setWebhook(
  token: string,
  url: string,
  secretToken: string,
): Promise<boolean> {
  return call<boolean>(token, 'setWebhook', {
    url,
    secret_token: secretToken,
    allowed_updates: ['message', 'edited_message', 'callback_query'],
    drop_pending_updates: false,
  })
}

export function deleteWebhook(token: string): Promise<boolean> {
  return call<boolean>(token, 'deleteWebhook', { drop_pending_updates: false })
}

export function sendMessage(
  token: string,
  chatId: string | number,
  text: string,
  extra?: Record<string, unknown>,
): Promise<unknown> {
  return call(token, 'sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    ...extra,
  })
}

type TelegramFile = {
  file_id: string
  file_unique_id: string
  file_size?: number
  file_path?: string
}

export function getFile(token: string, fileId: string): Promise<TelegramFile> {
  return call<TelegramFile>(token, 'getFile', { file_id: fileId })
}

/**
 * Downloads a Telegram file into memory.
 *
 * The returned file_path URL is short-lived and contains the bot token, which
 * is exactly why the image has to be copied to Cloudinary rather than stored as
 * a Telegram link.
 */
export async function downloadFile(token: string, fileId: string): Promise<{
  buffer: Buffer
  filePath: string
  mimeType: string
}> {
  const file = await getFile(token, fileId)
  if (!file.file_path) throw new TelegramError('Telegram did not return a file path')

  const res = await fetch(`${API_BASE}/file/bot${token}/${file.file_path}`)
  if (!res.ok) {
    throw new TelegramError(`Could not download Telegram file (${res.status})`, res.status)
  }

  const arrayBuffer = await res.arrayBuffer()
  return {
    buffer: Buffer.from(arrayBuffer),
    filePath: file.file_path,
    mimeType: res.headers.get('content-type') || guessMime(file.file_path),
  }
}

function guessMime(path: string): string {
  const ext = path.split('.').pop()?.toLowerCase()
  if (ext === 'png') return 'image/png'
  if (ext === 'webp') return 'image/webp'
  if (ext === 'gif') return 'image/gif'
  return 'image/jpeg'
}
