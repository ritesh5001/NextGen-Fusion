# Command: new-route — Add a New Admin API Route

Use this workflow whenever adding a new resource to the admin API.

## Step 1 — Backend route

Create `Backend/src/routes/<resource>.ts`:

```ts
import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { supabase } from '../lib/supabase'

const router = Router()

router.get('/<resource>', requireAuth, async (_req, res) => {
  const { data, error } = await supabase.from('<table>').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
})

export default router
```

## Step 2 — Register in index.ts

```ts
import resourceRoutes from './routes/<resource>'
app.use('/api/admin', resourceRoutes)
```

## Step 3 — Frontend API call (Server Component or client fetch)

```ts
// Server Component
const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/<resource>`, {
  headers: { cookie: cookies().toString() },
})

// Client Component
const res = await fetch('/api/admin/<resource>', { credentials: 'include' })
```

The `[...path]` proxy in `src/app/api/admin/[...path]/route.ts` handles forwarding automatically — no new Next.js API route needed.

## Step 4 — Type-check

```bash
cd Backend  && npx tsc --noEmit
cd Frontend && npx tsc --noEmit
```
