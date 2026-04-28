# NextGen Fusion — Email Campaign Admin

A self-hosted admin panel at `/admin` for managing contacts and running
email campaigns via Resend, backed by Supabase.

## What you get

- **Password-only admin** at `/admin/login` (password from env, JWT cookie session).
- **Main contacts database** with bulk CSV upload, search, edit, delete.
- **Campaigns** with subject + HTML body, configurable inter-send pacing
  and follow-up after N days (up to N follow-ups per recipient).
- **Recipient picker** — add selected contacts, all contacts, or by filter.
- **Live send log** + per-recipient status (next send time, follow-up count, errors).
- **Cron endpoint** at `/api/cron/process-campaigns` for VPS cron.
- **Built-in queue worker** in the backend process for automatic sending even without system cron.

## 1. Supabase setup

1. Create a Supabase project at https://supabase.com.
2. Open **SQL Editor** → paste & run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. From **Settings → API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (server-only — never expose)

## 2. Resend setup

1. Add and verify your sending domain at https://resend.com/domains
   (you'll add SPF/DKIM DNS records).
2. Create an API key at https://resend.com/api-keys → `RESEND_API_KEY`.
3. Decide your default `RESEND_FROM_EMAIL` (e.g. `campaigns@nextgenfusion.in`).

## 3. Env vars

Copy `.env.example` → `.env.local` and fill in real values. The required
keys are:

```
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
RESEND_FROM_EMAIL
RESEND_FROM_NAME
RESEND_REPLY_TO          # optional
ADMIN_PASSWORD           # default in .env.example: Ritesh5001@
ADMIN_SESSION_SECRET     # 32+ random chars
CRON_SECRET              # random, used by the cron endpoint
```

Generate strong secrets:

```
openssl rand -base64 48
```

## 4. Run

```
npm run dev
# open http://localhost:3000/admin
```

In production:

```
npm run build && npm run start
```

## 5. CSV bulk upload

- Required column: **`email`**.
- Recognized columns: `name, company, phone, website, industry, notes`.
- Any extra column becomes a custom field, usable in templates as
  `{{column_name}}` (snake_case).
- Existing rows are matched by email and **updated** (upsert).
- Download a sample on the upload page.

## 6. Email template variables

Inside subject and body HTML you can use:

```
{{first_name}}  {{name}}  {{email}}  {{company}}
{{phone}}  {{website}}  {{industry}}
{{any_custom_csv_column}}
```

The system wraps your HTML in a clean responsive shell automatically
(unless you provide a full `<html>…</html>` document yourself).

## 7. The cron — VPS setup

The scheduler is a single endpoint:

```
POST /api/cron/process-campaigns
Authorization: Bearer $CRON_SECRET
```

It picks up to 50 due recipients per call, sends them, schedules their
follow-up (or marks them completed), and auto-completes campaigns when
nothing is left. **Call it every minute** from your VPS.

If you do not want to manage external cron, the backend also starts an
internal worker by default:

```
CAMPAIGN_PROCESSOR_ENABLED=true
CAMPAIGN_PROCESSOR_INTERVAL_MS=30000
```

That worker calls the same queue processor on a timer with overlap
protection. External cron is still fine, but not required for a single
backend instance.

### Linux crontab (every minute)

```cron
* * * * * curl -fsS -X POST -H "Authorization: Bearer YOUR_CRON_SECRET" https://YOUR_HOST/api/cron/process-campaigns > /dev/null 2>&1
```

### systemd timer (alternative)

`/etc/systemd/system/ngf-campaigns.service`:

```ini
[Unit]
Description=NextGen Fusion campaign processor

[Service]
Type=oneshot
ExecStart=/usr/bin/curl -fsS -X POST -H "Authorization: Bearer YOUR_CRON_SECRET" https://YOUR_HOST/api/cron/process-campaigns
```

`/etc/systemd/system/ngf-campaigns.timer`:

```ini
[Unit]
Description=Run NextGen Fusion campaign processor every minute

[Timer]
OnBootSec=1min
OnUnitActiveSec=1min

[Install]
WantedBy=timers.target
```

Enable:

```
sudo systemctl enable --now ngf-campaigns.timer
```

### Manual / one-off trigger

If you can't set headers, use the query string fallback:

```
curl https://YOUR_HOST/api/cron/process-campaigns?secret=YOUR_CRON_SECRET
```

## 8. Campaign lifecycle

1. **Create** — name, sender, subject, HTML body, interval, follow-up days, max follow-ups.
2. **Add recipients** — pick from the main contacts DB (selected, all, or filtered).
   Each recipient gets a `next_send_at` spaced by your interval.
3. **Start** — sets campaign status to `active`. The cron starts sending.
4. **Live** — overview tab shows live counts; recipients tab shows next-send times;
   send log shows every attempt with subject + Resend message id or error.
5. **Pause / Resume** — pause stops new sends; in-flight follow-ups stay scheduled.
6. **Auto-complete** — when every recipient is `completed` / `failed` /
   `unsubscribed`, the campaign flips to `completed`.

## 9. File map

```
supabase/schema.sql                                   — DB schema
src/middleware.ts                                     — guards /admin and /api/admin
src/lib/admin/
  auth.ts                                             — JWT cookie session
  supabase.ts                                         — service-role client + types
  email.ts                                            — Resend send + template renderer
src/app/admin/                                        — admin UI pages
  layout.tsx, page.tsx (dashboard)
  login/, contacts/, campaigns/
src/app/api/admin/                                    — admin REST endpoints
  login, logout, contacts, contacts/[id], contacts/bulk
  campaigns, campaigns/[id], campaigns/[id]/recipients
  campaigns/[id]/status, campaigns/[id]/logs
src/app/api/cron/process-campaigns/route.ts           — scheduler
src/components/admin/                                 — shell, contact-form, campaign-form, recipient-picker
```

## 10. Security notes

- The service-role Supabase key is **server-only**; it is never imported
  into a client component. All admin DB access goes through `/api/admin/*`
  and is gated by middleware.
- The cron endpoint requires the bearer secret; rotate `CRON_SECRET` if
  you ever paste it in chat or commit logs.
- The session cookie is `httpOnly`, `sameSite=lax`, and `secure` in
  production. Lifetime: 7 days.
- Always serve over HTTPS in production.
