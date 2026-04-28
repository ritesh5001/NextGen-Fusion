# NextGen Fusion — CLAUDE.md

Read this every session. It is the single source of truth for how to work in this repo.

---

## Project Overview

NextGen Fusion is a marketing/agency website with an integrated email-campaign admin panel.

| Layer    | Tech                                         | Port  |
|----------|----------------------------------------------|-------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind 4 | 3000  |
| Backend  | Express 4, TypeScript, tsx watch             | 4000  |
| Database | Supabase (Postgres + Auth)                   | cloud |
| Email    | Resend API                                   | cloud |

---

## Monorepo Layout

```
NextGen Fusion/
├── Frontend/          # Next.js app (App Router)
│   └── src/
│       ├── app/       # Pages & API routes (api/admin/[...path] proxies to Backend)
│       └── components/
├── Backend/           # Express REST API
│   └── src/
│       ├── routes/    # auth · campaigns · contacts · cron · stats
│       ├── middleware/ # auth.ts (JWT session cookie)
│       └── lib/       # supabase.ts · email.ts
└── .claude/           # Claude Code config (settings, skills, commands)
```

---

## Dev Commands

Always run Frontend and Backend in separate terminals.

```bash
# Backend
cd Backend && npm run dev        # tsx watch — hot reload

# Frontend
cd Frontend && npm run dev       # next dev
cd Frontend && npm run dev:turbo # next dev --turbopack (faster)

# Tests (Frontend)
cd Frontend && npm test
cd Frontend && npm run test:e2e

# Build
cd Backend  && npm run build     # tsc → dist/
cd Frontend && npm run build     # next build

# Type-check (no emit)
cd Backend  && npx tsc --noEmit
cd Frontend && npx tsc --noEmit
```

---

## Environment Variables

Root `.env` is for shared/legacy vars. Each sub-project has its own `.env`.

| File                  | Purpose                                  |
|-----------------------|------------------------------------------|
| `Backend/.env`        | PORT, SUPABASE_*, RESEND_*, ADMIN_*, CRON_* |
| `Frontend/.env`       | NEXT_PUBLIC_*, ADMIN_SESSION_SECRET, SUPABASE_* |

Never commit real `.env` files. Templates are in `.env.example`.

---

## Architecture Decisions

- **Frontend API proxy**: `src/app/api/admin/[...path]/route.ts` forwards all admin REST calls to the Backend. Client code never calls the Backend directly.
- **Auth**: Session stored in a signed JWT cookie (`ADMIN_SESSION_SECRET` must match between Frontend and Backend). Validated in `Backend/src/middleware/auth.ts`.
- **Email campaigns**: Resend API via `Backend/src/lib/email.ts`. Campaign sending is triggered by a cron endpoint (`/api/cron/process-campaigns`) secured with `CRON_SECRET`.
- **CORS**: Backend allows only origins listed in `ALLOWED_ORIGINS`.
- **Body size limit**: Controlled by `REQUEST_BODY_LIMIT` env var (default `2mb`).

---

## Code Style

- TypeScript strict mode in both projects.
- No `any` unless unavoidable — use `unknown` + type guards.
- No comments unless the WHY is non-obvious.
- Tailwind classes over inline styles; use `cn()` from `lib/utils` to merge.
- Radix UI + shadcn/ui components are already installed — prefer them over custom UI.
- Named exports over default exports in components.
- React Server Components by default; add `"use client"` only when needed.

---

## Workflow Rules

1. **Plan first** — confirm approach before writing code for non-trivial changes.
2. **Type-check before done** — run `npx tsc --noEmit` in the affected sub-project.
3. **Test UI changes** — start the dev server and verify the golden path in browser.
4. **One commit per logical change** — not per file.
5. **Never commit `.env`** — only `.env.example`.
6. **Never skip hooks** (`--no-verify`) without explicit user approval.
7. **Prefer editing existing files** over creating new ones.

---

## Key Files Quick-Reference

| File | Role |
|------|------|
| `Backend/src/index.ts` | Express app bootstrap, CORS, middleware, routes |
| `Backend/src/middleware/auth.ts` | JWT session cookie validation |
| `Backend/src/lib/supabase.ts` | Supabase admin client |
| `Backend/src/lib/email.ts` | Resend email helpers |
| `Backend/src/routes/campaigns.ts` | Campaign CRUD + send |
| `Frontend/src/app/api/admin/[...path]/route.ts` | Backend proxy (all methods) |
| `Frontend/src/app/api/admin/login/route.ts` | Login endpoint (sets cookie) |
| `Frontend/src/app/admin/` | Admin panel pages |
| `Frontend/src/components/admin/` | Admin UI components |
| `Frontend/supabase/schema.sql` | DB schema |

---

## Compaction Hints

When context compresses, preserve:
- This CLAUDE.md content
- Current task / open TODOs
- Any env var values discussed (but never real secrets)
- File paths that were edited

---

## MCP / Multi-Agent Notes

- Spawn `Explore` subagent for broad codebase searches spanning > 3 files.
- Use `/schedule` for recurring tasks (e.g., checking campaign cron health).
- `/ultrareview` for pre-merge code review on important PRs.