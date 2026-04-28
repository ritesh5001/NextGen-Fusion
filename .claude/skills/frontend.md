# Skill: Frontend (Next.js 15 + React 19)

## Stack
- Next.js 15 App Router, React 19, TypeScript strict
- Tailwind CSS v4 — no config file, uses `@import "tailwindcss"` in CSS
- shadcn/ui (Radix primitives) — components in `src/components/ui/`
- Framer Motion for animations
- React Hook Form + Zod for forms
- Supabase JS client for public/client-side data
- Lenis for smooth scroll

## File Conventions

| Purpose | Location |
|---------|----------|
| Pages (RSC) | `src/app/**/page.tsx` |
| Layouts | `src/app/**/layout.tsx` |
| API routes (Next.js) | `src/app/api/**/route.ts` |
| Shared components | `src/components/` |
| Admin components | `src/components/admin/` |
| shadcn/ui primitives | `src/components/ui/` |

## Component Pattern

```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// Client Component
'use client'
import { useState } from 'react'
export function Widget() { ... }
```

## Styling

```tsx
import { cn } from '@/lib/utils'
<div className={cn('base-class', condition && 'conditional-class')} />
```

## Admin API Calls

All admin REST calls go through the Next.js proxy — never call the Backend directly from client code.

```ts
// Client-side
const res = await fetch('/api/admin/campaigns', { credentials: 'include' })

// The proxy at src/app/api/admin/[...path]/route.ts forwards to Backend
```

## Forms

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({ name: z.string().min(1) })
const form = useForm({ resolver: zodResolver(schema) })
```

## Environment Variables

- `NEXT_PUBLIC_*` — exposed to browser
- Others — server-only (API routes, RSC)
- Never import `process.env.SECRET` in client components

## Testing

```bash
cd Frontend && npm test              # Jest + Testing Library
cd Frontend && npm run test:e2e      # Playwright
cd Frontend && npm run test:coverage
```
