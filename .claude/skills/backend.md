# Skill: Backend (Express + TypeScript)

## Stack
- Express 4 with TypeScript, compiled by `tsc`, dev-run by `tsx watch`
- Supabase JS client (service-role key) for all DB access
- Resend for transactional/campaign email
- `jose` for JWT signing/verification (session cookies)
- `multer` + `papaparse` for CSV contact uploads

## Route Pattern

```ts
import { Router } from 'express'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.get('/resource', requireAuth, async (req, res) => {
  const { data, error } = await supabase.from('table').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
```

Register in `src/index.ts`:
```ts
app.use('/api/admin', resourceRoutes)
```

## Auth Middleware

`requireAuth` in `src/middleware/auth.ts` validates the signed `session` cookie using `ADMIN_SESSION_SECRET`. It sets `req.admin` on the request object.

## Supabase Client

```ts
import { supabase } from '../lib/supabase'
// Always use supabase (service-role) — never expose anon key on backend
```

## Email

```ts
import { sendEmail } from '../lib/email'
await sendEmail({ to, subject, html })
```

## Error Handling

- Return `res.status(4xx).json({ error: '...' })` for client errors.
- The global error handler in `index.ts` catches `entity.too.large` (413).
- Never let unhandled Promise rejections escape — always `try/catch` or `.catch()`.

## Build

```bash
cd Backend && npm run build   # tsc → dist/
cd Backend && npm start       # node dist/index.js
```
