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
import projectEstimatorRoutes from './routes/project-estimator'
import paymentsRoutes, { clientPaymentsRouter } from './routes/payments'
import subscriptionPlansRoutes from './routes/subscription-plans'
import salesAssistantRoutes from './routes/sales-assistant'
import statsRoutes from './routes/stats'
import agencyAuthRoutes from './routes/agency-auth'
import agencyMembersRoutes from './routes/agency-members'
import agencyProjectsRoutes from './routes/agency-projects'
import clientAuthRoutes from './routes/client-auth'
import clientProductRoutes from './routes/client-products'
import clientImageRoutes from './routes/client-images'
import clientAiRoutes from './routes/client-ai'
import clientProjectRoutes from './routes/client-projects'
import clientProfileRoutes from './routes/client-profile'
import clientUsersRoutes from './routes/client-users'
import storeProductsRoutes from './routes/store-products'
import storeRoutes from './routes/store'
import wpPluginsRoutes from './routes/wp-plugins'
import bannersRoutes from './routes/banners'
import clientBrandRoutes from './routes/client-brand'
import productflowRoutes from './routes/productflow'
import productflowWebhookRoutes from './routes/productflow-webhook'
import { startImageCleanupWorker } from './lib/image-cleanup'

const app = express()
const PORT = process.env.PORT || 4000
const requestBodyLimit = process.env.REQUEST_BODY_LIMIT || '2mb'

function normalizeOriginValue(value: string): string {
  return value
    .trim()
    .replace(/^ALLOWED_ORIGINS\s*=\s*/i, '')
}

const defaultOrigins = [
  'http://localhost:3000',
  'http://localhost:8081',
  'https://nextgenfusion.in',
  'https://www.nextgenfusion.in',
]
const allowedOrigins = Array.from(
  new Set(
    (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(normalizeOriginValue)
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
app.use('/api/admin', wpPluginsRoutes)
app.use('/api/admin', bannersRoutes)
app.use('/api/admin', clientBrandRoutes)
app.use('/api/admin', subscriptionPlansRoutes)
app.use('/api', contactFormRoutes)
app.use('/api', projectEstimatorRoutes)
app.use('/api', paymentsRoutes)
app.use('/api', salesAssistantRoutes)
app.use('/api/cron', cronRoutes)
app.use('/api/agency', agencyAuthRoutes)
app.use('/api/agency', agencyMembersRoutes)
app.use('/api/agency', agencyProjectsRoutes)
app.use('/api/client', clientPaymentsRouter)
app.use('/api/client', clientAuthRoutes)
app.use('/api/client', clientProductRoutes)
app.use('/api/client', clientImageRoutes)
app.use('/api/client', clientAiRoutes)
app.use('/api/client', clientProjectRoutes)
app.use('/api/client', clientProfileRoutes)
app.use('/api/admin', clientUsersRoutes)
app.use('/api/agency', clientUsersRoutes)
app.use('/api/admin', storeProductsRoutes)
app.use('/api', storeRoutes)
app.use('/api/admin', productflowRoutes)
// Public: Telegram posts here. Authenticity is proven by the secret token
// header rather than an admin session, so it must sit outside /api/admin.
app.use('/api/productflow', productflowWebhookRoutes)

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
  startImageCleanupWorker()
})
