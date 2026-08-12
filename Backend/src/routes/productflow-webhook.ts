import { Router } from 'express'
import { timingSafeEqual } from 'node:crypto'
import { logRouteError } from '../lib/http-errors'
import { loadPfSettings } from '../lib/productflow/settings'
import { fromTelegramUpdate, type TelegramUpdate } from '../lib/productflow/message'
import {
  findClientByExternalId,
  ingestMessage,
  sendIngestReply,
} from '../lib/productflow/ingest'
import {
  handleCallback,
  parseCallbackData,
  replyToCallback,
} from '../lib/productflow/callbacks'

const router = Router()

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

/**
 * Telegram webhook. Public by necessity, so authenticity is proven by the
 * secret token Telegram echoes back in X-Telegram-Bot-Api-Secret-Token — the
 * value was registered with setWebhook and never leaves the server otherwise.
 *
 * Always answers 200 once the update is accepted: a non-2xx makes Telegram
 * retry the same update indefinitely, and the raw payload is already stored.
 */
router.post('/telegram/webhook', async (req, res) => {
  try {
    const settings = await loadPfSettings()

    if (!settings.telegram_bot_token || !settings.telegram_webhook_secret) {
      res.status(503).json({ error: 'Telegram is not connected' })
      return
    }

    const provided = req.header('x-telegram-bot-api-secret-token') ?? ''
    if (!provided || !safeEqual(provided, settings.telegram_webhook_secret)) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const update = req.body as TelegramUpdate
    const token = settings.telegram_bot_token

    // Approve / Edit / Cancel button presses.
    const callback = update.callback_query
    if (callback) {
      const parsed = parseCallbackData(callback.data)
      const chatId = callback.message?.chat?.id ? String(callback.message.chat.id) : null
      const userId = callback.from?.id ? String(callback.from.id) : null
      res.json({ ok: true })

      if (parsed && chatId && userId) {
        void (async () => {
          try {
            const client = await findClientByExternalId('telegram', userId)
            if (!client) return
            const reply = await handleCallback({
              token,
              chatId,
              clientId: client.id,
              action: parsed.action,
              draftId: parsed.draftId,
            })
            await replyToCallback(token, chatId, reply)
          } catch (error) {
            logRouteError('productflow:callback', error)
          }
        })()
      }
      return
    }

    const message = fromTelegramUpdate(update)

    // Nothing usable in this update (bot echo, unsupported type) — still 200 so
    // Telegram stops retrying it.
    if (!message) {
      res.json({ ok: true, skipped: true })
      return
    }

    const result = await ingestMessage(message)
    res.json({ ok: true })

    // Reply after responding so slow AI + sendMessage work never delays the
    // webhook ack (Telegram times out at ~60s and would redeliver).
    void sendIngestReply(token, message.externalChatId, result)
  } catch (error) {
    logRouteError('productflow:webhook', error)
    // 200 on purpose: the failure is ours, and retries would just repeat it.
    res.status(200).json({ ok: false })
  }
})

export default router
