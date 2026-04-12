
This project is a design agency website built with Next.js.

## Admin Login

The site now includes a MongoDB-backed admin login flow.

### Routes

- `/login` - admin sign-in page
- `/admin` - protected dashboard shell
- `/admin/campaigns` - campaign list and status overview
- `/admin/campaigns/new` - create campaign (subject + HTML)
- `/admin/campaigns/:id` - campaign detail with recipient and event timeline
- `/api/auth/login` - validates credentials and sets the session cookie
- `/api/auth/logout` - clears the session cookie
- `/api/auth/me` - returns the current admin session state
- `/api/campaigns` - campaign list/create (admin protected)
- `/api/campaigns/:id` - campaign detail/update (admin protected)
- `/api/campaigns/:id/recipients` - manual + CSV recipient ingestion (admin protected)
- `/api/campaigns/:id/start` - queue campaign recipients for paced sending
- `/api/campaigns/:id/pause` - pause campaign sending
- `/api/campaigns/:id/resume` - resume campaign sending
- `/api/campaigns/process` - cron processor endpoint to send due emails through Resend
- `/api/webhooks/resend` - Resend event ingestion for delivered/opened/clicked/failed states
- `/api/tracking/open` - tracking pixel endpoint
- `/api/tracking/click` - tracked click redirect endpoint

### Environment

Copy [.env.example](.env.example) to `.env.local` and set these values:

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME` optional
- `NEXT_PUBLIC_SITE_URL` optional
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `RESEND_WEBHOOK_SECRET`
- `CAMPAIGN_TRACKING_SECRET` optional (falls back to JWT_SECRET)
- `CAMPAIGN_CRON_SECRET` optional but recommended for secure processor endpoint
- `CAMPAIGN_PROCESS_BATCH` optional (defaults to 5)
- `CAMPAIGN_PUBLIC_BASE_URL` optional (falls back to NEXT_PUBLIC_SITE_URL)

If your MongoDB password contains special characters such as `@`, URL-encode them in `MONGODB_URI`.

### Local setup

1. Install dependencies with `npm install`.
2. Configure `.env.local`.
3. Run `npm run dev`.
4. Visit `/login` and sign in with the seeded admin credentials.

The admin session is stored in an httpOnly cookie and the password is hashed before it is stored in MongoDB.

## Campaign Flow

1. Sign in at `/login`.
2. Create a campaign from `/admin/campaigns/new`.
3. Add recipients in campaign detail using manual input or CSV (`email,name` format).
4. Start campaign to queue recipients. Queue spacing is based on daily limit (default 100 / 24h).
5. Trigger processor with cron by calling `POST /api/campaigns/process` (include `x-campaign-cron-secret` when configured).
6. Configure Resend webhook to `POST /api/webhooks/resend` for delivery/open/click/failure updates.
7. Monitor recipient timeline and recent events on `/admin/campaigns/:id`.




