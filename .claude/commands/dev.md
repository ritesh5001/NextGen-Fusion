# Command: dev — Start Development Servers

Run Frontend and Backend in separate terminals.

## Terminal 1 — Backend

```bash
cd Backend
npm run dev
# tsx watch src/index.ts → hot-reloads on save
# Available at http://localhost:4000
# Health check: curl http://localhost:4000/health
```

## Terminal 2 — Frontend

```bash
cd Frontend
npm run dev
# Next.js dev server → http://localhost:3000
# For faster builds use: npm run dev:turbo
```

## Verify Both Are Running

```bash
curl http://localhost:4000/health    # → {"ok":true}
curl http://localhost:3000/          # → HTML
```

## Common Issues

| Symptom | Fix |
|---------|-----|
| `CORS error` | Check `ALLOWED_ORIGINS` in `Backend/.env` includes `http://localhost:3000` |
| `401 on admin routes` | `ADMIN_SESSION_SECRET` must match in both `.env` files |
| `413 payload too large` | Increase `REQUEST_BODY_LIMIT` in `Backend/.env` |
| Port already in use | `lsof -ti:4000 \| xargs kill` or change `PORT` in `Backend/.env` |
