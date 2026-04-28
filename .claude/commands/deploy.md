# Command: deploy — Build & Deploy Checklist

## Pre-Deploy Checks

```bash
# Type-check
cd Backend  && npx tsc --noEmit
cd Frontend && npx tsc --noEmit

# Tests
cd Frontend && npm test

# Lint
cd Frontend && npm run lint
```

## Build

```bash
# Backend
cd Backend && npm run build
# Output: Backend/dist/index.js

# Frontend
cd Frontend && npm run build
# Output: Frontend/.next/
```

## Production Start

```bash
# Backend
cd Backend && npm start         # node dist/index.js

# Frontend
cd Frontend && npm start        # next start
```

## Environment Checklist

Before deploying to production, verify these env vars are set on the server:

**Backend**
- [ ] `PORT`
- [ ] `ALLOWED_ORIGINS` (production domain)
- [ ] `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- [ ] `RESEND_API_KEY` + `RESEND_FROM_EMAIL`
- [ ] `ADMIN_PASSWORD` + `ADMIN_SESSION_SECRET`
- [ ] `CRON_SECRET`

**Frontend**
- [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NEXT_PUBLIC_API_BASE_URL` (Backend URL)
- [ ] `ADMIN_SESSION_SECRET` (must match Backend)
- [ ] `SUPABASE_URL` + `SUPABASE_ANON_KEY`

## Cron Setup

Configure your cron provider (Vercel Cron, Railway Cron, etc.) to POST to:
```
https://yourdomain.com/api/cron/process-campaigns
Authorization: Bearer <CRON_SECRET>
```
Recommended: every 5 minutes.
