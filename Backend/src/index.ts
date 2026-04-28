import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import type { NextFunction, Request, Response } from 'express'
import authRoutes from './routes/auth'
import campaignRoutes from './routes/campaigns'
import { startCampaignProcessor } from './lib/campaign-processor'
import contactFormRoutes from './routes/contact-forms'
import contactRoutes from './routes/contacts'
import cronRoutes from './routes/cron'
import leadsRoutes from './routes/leads'
import statsRoutes from './routes/stats'

const app = express()
const PORT = process.env.PORT || 4000
const requestBodyLimit = process.env.REQUEST_BODY_LIMIT || '2mb'

const defaultOrigins = [
  'http://localhost:3000',
  'https://nextgenfusion.in',
  'https://www.nextgenfusion.in',
]
const allowedOrigins = Array.from(
  new Set(
    (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .concat(defaultOrigins),
  ),
)

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    }
  },
  credentials: true,
}))

app.use(express.json({ limit: requestBodyLimit }))
app.use(express.text({ type: 'text/plain' }))
app.use(express.urlencoded({ extended: true, limit: requestBodyLimit }))
app.use(cookieParser())

app.use('/api/admin', authRoutes)
app.use('/api/admin', statsRoutes)
app.use('/api/admin', campaignRoutes)
app.use('/api/admin', contactRoutes)
app.use('/api/admin', leadsRoutes)
app.use('/api', contactFormRoutes)
app.use('/api/cron', cronRoutes)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  if (
    error &&
    typeof error === 'object' &&
    'type' in error &&
    error.type === 'entity.too.large'
  ) {
    return res.status(413).json({
      error: 'Request payload is too large',
      limit: requestBodyLimit,
    })
  }

  return next(error)
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
  startCampaignProcessor()
})
