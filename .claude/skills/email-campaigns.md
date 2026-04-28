# Skill: Email Campaigns Domain

## Overview

The admin panel lets admins create campaigns, attach contact lists, and send bulk email via Resend.

## Data Flow

```
Admin UI → Frontend /api/admin proxy → Backend /api/admin/campaigns → Supabase + Resend
                                     ↑
Cron trigger → Backend /api/cron/process-campaigns (auth: Bearer CRON_SECRET)
```

## Key Tables (Supabase)

See `Frontend/supabase/schema.sql` for full schema.

| Table | Purpose |
|-------|---------|
| `campaigns` | Campaign metadata (subject, body, status, scheduled_at) |
| `contacts` | Subscriber list (email, name, tags, unsubscribed_at) |
| `campaign_recipients` | Join table: campaign ↔ contacts |
| `campaign_events` | Delivery events (sent, opened, clicked, bounced) |

## Campaign Lifecycle

`draft` → `scheduled` → `sending` → `sent` | `failed`

The cron endpoint (`/api/cron/process-campaigns`) picks up `scheduled` campaigns whose `scheduled_at` is in the past and processes them in batches (size controlled by `CAMPAIGN_PROCESS_BATCH` env var, default 5).

## Contacts Upload

CSV upload endpoint accepts files via multipart form; parsed with papaparse on the Backend. Required columns: `email`. Optional: `name`, `tags` (comma-separated).

## Tracking

Email open/click tracking uses pixel/redirect URLs signed with `CAMPAIGN_TRACKING_SECRET`. Events are written to `campaign_events`.

## Resend Webhook

Resend posts delivery events to `/api/admin/webhooks/resend`. The webhook secret is `RESEND_WEBHOOK_SECRET` (validated in the route).
