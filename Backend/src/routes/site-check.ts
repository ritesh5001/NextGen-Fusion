import { Router } from 'express'
import { toolLimiter } from '../lib/rate-limit'
import { requireTurnstile } from '../lib/turnstile'
import { auditUrl } from '../lib/seo-audit'
import { normaliseUrl, SiteCheckError } from '../lib/site-check'

const router = Router()

/** POST /api/site-check — the free SEO checker at /free-seo-checker/. */
router.post('/site-check', toolLimiter, requireTurnstile, async (req, res) => {
  const input: unknown = req.body?.url
  if (typeof input !== 'string') {
    res.status(400).json({ error: 'Enter a website address, like example.com.' })
    return
  }
  try {
    const report = await auditUrl(normaliseUrl(input))
    res.json({ data: report })
  } catch (error) {
    if (error instanceof SiteCheckError) {
      res.status(422).json({ error: error.message })
      return
    }
    console.error('[site-check] failed', error)
    res.status(500).json({ error: 'The check could not be completed. Please try again.' })
  }
})

export default router
