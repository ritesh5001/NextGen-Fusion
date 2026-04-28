import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import campaignRoutes from './routes/campaigns'
import contactRoutes from './routes/contacts'
import cronRoutes from './routes/cron'
import statsRoutes from './routes/stats'

const app = express()
const PORT = process.env.PORT || 4000

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',').map(s => s.trim())

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

app.use(express.json())
app.use(express.text({ type: 'text/plain' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/admin', authRoutes)
app.use('/api/admin', statsRoutes)
app.use('/api/admin', campaignRoutes)
app.use('/api/admin', contactRoutes)
app.use('/api/cron', cronRoutes)

app.get('/health', (_req, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
