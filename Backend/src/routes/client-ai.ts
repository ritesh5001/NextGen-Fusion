import { Router } from 'express'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { requireClient } from '../middleware/auth'
import { AiNotConfiguredError, generateProductCopyFromImage } from '../lib/ai-vision'

const router = Router()

function isAllowedImageUrl(value: unknown): value is string {
  if (typeof value !== 'string' || !value) return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com'
  } catch {
    return false
  }
}

router.post('/ai/product-copy', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const { imageUrl, hint } = req.body ?? {}
    if (!isAllowedImageUrl(imageUrl)) {
      res.status(400).json({ error: 'A valid product image is required' })
      return
    }
    const cleanHint = typeof hint === 'string' ? hint.trim().slice(0, 400) : undefined

    const data = await generateProductCopyFromImage(imageUrl, cleanHint)
    res.json({ data })
  } catch (error) {
    if (error instanceof AiNotConfiguredError) {
      res.status(503).json({ error: 'AI is not configured' })
      return
    }
    logRouteError('client-ai:product-copy', error)
    res.status(502).json({ error: 'Could not generate copy from the image', details: getErrorMessage(error) })
  }
})

export default router
