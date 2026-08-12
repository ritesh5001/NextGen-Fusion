'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Loader2,
  Plug,
  RefreshCw,
  Send,
  Trash2,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Download,
  FileCheck,
  Table2,
  Activity,
} from 'lucide-react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'

type Provider = { value: string; label: string; configured: boolean; envVar: string }

type Settings = {
  telegramConnected: boolean
  telegramBotToken: string | null
  telegramBotUsername: string | null
  telegramBotName: string | null
  telegramWebhookUrl: string | null
  telegramConnectedAt: string | null
  aiProvider: string
  autoApprove: boolean
  providers: Provider[]
}

type WebhookStatus = {
  connected: boolean
  webhook: {
    url: string
    pendingUpdates: number
    lastErrorMessage: string | null
    lastErrorAt: string | null
  } | null
}

type PfClient = {
  id: string
  name: string
  external_user_id: string
  external_username: string | null
  status: string
  active_project_id: string | null
  last_message_at: string | null
}

type PfProject = {
  id: string
  client_id: string
  name: string
  website_url: string | null
  platform: string
  currency: string
  status: string
}

type PfMessage = {
  id: string
  client_id: string
  message_type: string
  text: string | null
  classification: string | null
  created_at: string
}

type PfImage = {
  id: string
  client_id: string
  url: string | null
  status: string
  error: string | null
  created_at: string
}

type Stats = {
  clients: number
  pendingClients: number
  projects: number
  messages: number
  images: number
  openDrafts: number
  products: number
}

type PfDraft = {
  id: string
  client_id: string
  status: string
  product_data: Record<string, unknown>
  missing_fields: string[]
  last_question: string | null
  image_count: number
  updated_at: string
}

type PfTemplate = {
  id: string
  name: string
  platform: string
  columns: string[]
  mapping: Record<string, string>
  is_default: boolean
}

type PfExport = {
  id: string
  project_id: string
  filename: string
  product_count: number
  created_at: string
}

type CsvPreview = {
  ok: boolean
  productCount: number
  templateName: string | null
  errors: { code: string; message: string }[]
  warnings: { code: string; message: string }[]
  summary: string
}

type PfCheck = { key: string; label: string; status: 'ok' | 'warn' | 'fail'; detail: string }
type PfHealth = { ready: boolean; checks: PfCheck[] }

const TABS = [
  ['dashboard', 'Dashboard'],
  ['clients', 'Clients'],
  ['projects', 'Projects'],
  ['drafts', 'Drafts'],
  ['products', 'Products'],
  ['messages', 'Messages & Images'],
  ['templates', 'CSV Templates'],
  ['exports', 'CSV Exports'],
  ['settings', 'Settings'],
] as const

type Tab = (typeof TABS)[number][0]

type PfProduct = {
  id: string
  client_id: string
  name: string
  sku: string | null
  regular_price: number | null
  sale_price: number | null
  category: string | null
  brand: string | null
  status: string
  created_at: string
}

const API = '/api/admin/productflow'

async function call<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json' } : undefined,
  })
  const json = await res.json().catch(() => null)
  if (!res.ok) throw new Error(json?.error || 'Request failed')
  return json?.data as T
}

export default function ProductFlowPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [status, setStatus] = useState<WebhookStatus | null>(null)
  const [clients, setClients] = useState<PfClient[]>([])
  const [projects, setProjects] = useState<PfProject[]>([])
  const [messages, setMessages] = useState<PfMessage[]>([])
  const [images, setImages] = useState<PfImage[]>([])
  const [drafts, setDrafts] = useState<PfDraft[]>([])
  const [products, setProducts] = useState<PfProduct[]>([])
  const [templates, setTemplates] = useState<PfTemplate[]>([])
  const [exports, setExports] = useState<PfExport[]>([])
  const [preview, setPreview] = useState<Record<string, CsvPreview>>({})
  const [health, setHealth] = useState<PfHealth | null>(null)
  const [tab, setTab] = useState<Tab>('dashboard')
  const [stats, setStats] = useState<Stats | null>(null)

  const [botToken, setBotToken] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const [newProject, setNewProject] = useState({ clientId: '', name: '', websiteUrl: '', platform: 'woocommerce' })

  const load = useCallback(async () => {
    setError(null)
    try {
      const [s, c, p, m, i, st, dr, pr, tp, ex] = await Promise.all([
        call<Settings>('/settings'),
        call<PfClient[]>('/clients'),
        call<PfProject[]>('/projects'),
        call<PfMessage[]>('/messages?limit=25'),
        call<PfImage[]>('/images?limit=18'),
        call<Stats>('/stats'),
        call<PfDraft[]>('/drafts'),
        call<PfProduct[]>('/products'),
        call<PfTemplate[]>('/templates'),
        call<PfExport[]>('/exports'),
      ])
      setSettings(s)
      setClients(c ?? [])
      setProjects(p ?? [])
      setMessages(m ?? [])
      setImages(i ?? [])
      setStats(st)
      setDrafts(dr ?? [])
      setProducts(pr ?? [])
      setTemplates(tp ?? [])
      setExports(ex ?? [])
      if (s.telegramWebhookUrl && !baseUrl) {
        setBaseUrl(new URL(s.telegramWebhookUrl).origin)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    }
  }, [baseUrl])

  useEffect(() => {
    void load()
    call<PfHealth>('/health').then(setHealth).catch(() => {})
  }, [])

  async function run(key: string, fn: () => Promise<void>, successMessage?: string) {
    setBusy(key)
    setError(null)
    setNotice(null)
    try {
      await fn()
      if (successMessage) setNotice(successMessage)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setBusy(null)
    }
  }

  const connect = () =>
    run(
      'connect',
      async () => {
        const s = await call<Settings>('/telegram/connect', {
          method: 'POST',
          body: JSON.stringify({ botToken: botToken.trim() }),
        })
        setSettings(s)
        setBotToken('')
      },
      'Bot connected.',
    )

  const disconnect = () =>
    run(
      'disconnect',
      async () => {
        setSettings(await call<Settings>('/telegram/disconnect', { method: 'POST' }))
        setStatus(null)
      },
      'Bot disconnected.',
    )

  const registerWebhook = () =>
    run(
      'webhook',
      async () => {
        await call<{ webhookUrl: string }>('/telegram/webhook', {
          method: 'POST',
          body: JSON.stringify({ baseUrl: baseUrl.trim() }),
        })
        await load()
        setStatus(await call<WebhookStatus>('/telegram/status'))
      },
      'Webhook registered with Telegram.',
    )

  const removeWebhook = () =>
    run(
      'webhook-delete',
      async () => {
        await call('/telegram/webhook', { method: 'DELETE' })
        await load()
        setStatus(null)
      },
      'Webhook removed.',
    )

  const checkHealth = (deep = false) =>
    run(deep ? 'health-deep' : 'health', async () => {
      setHealth(await call<PfHealth>(`/health${deep ? '?deep=true' : ''}`))
    })

  const checkStatus = () =>
    run('status', async () => {
      setStatus(await call<WebhookStatus>('/telegram/status'))
    })

  const setProvider = (aiProvider: string) =>
    run('provider', async () => {
      setSettings(await call<Settings>('/settings', { method: 'PATCH', body: JSON.stringify({ aiProvider }) }))
    })

  const setClientStatus = (id: string, status: string) =>
    run(`client-${id}`, async () => {
      await call(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) })
      await load()
    })

  const createProject = () =>
    run(
      'project',
      async () => {
        await call('/projects', { method: 'POST', body: JSON.stringify(newProject) })
        setNewProject({ clientId: '', name: '', websiteUrl: '', platform: 'woocommerce' })
        await load()
      },
      'Project created.',
    )

  const deleteProject = (id: string) =>
    run(`project-${id}`, async () => {
      await call(`/projects/${id}`, { method: 'DELETE' })
      await load()
    })

  const cancelDraft = (id: string) =>
    run(`draft-${id}`, async () => {
      await call(`/drafts/${id}`, { method: 'DELETE' })
      await load()
    })

  const checkCsv = (projectId: string) =>
    run(`csv-${projectId}`, async () => {
      const p = await call<CsvPreview>(`/projects/${projectId}/csv/preview`)
      setPreview((prev) => ({ ...prev, [projectId]: p }))
    })

  // A download must go through the browser, not fetch(), so the file is saved.
  const downloadCsv = (projectId: string) => {
    window.location.href = `${API}/projects/${projectId}/csv`
  }

  const clientName = (id: string) => clients.find((c) => c.id === id)?.name ?? '—'

  const money = (v: number | null) => (v == null ? '' : `₹${v.toLocaleString('en-IN')}`)

  return (
    <AdminShell>
      <div className="p-8 max-w-6xl">
        <PageHeader
          title="ProductFlow"
          description="Clients send product details as normal chat on Telegram. Messages are logged, images are stored in Cloudinary, and approved products export as a per-project CSV."
        />
      {error && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {notice && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {stats && (
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-6">
          {[
            { label: 'Clients', value: stats.clients },
            { label: 'Pending approval', value: stats.pendingClients },
            { label: 'Projects', value: stats.projects },
            { label: 'Open drafts', value: stats.openDrafts },
            { label: 'Products', value: stats.products },
            { label: 'Images stored', value: stats.images },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-2xl font-semibold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Section tabs (Phase 10) ──────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap gap-1 border-b border-slate-200">
        {TABS.map(([value, label]) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === value
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {label}
            {value === 'drafts' && stats?.openDrafts ? (
              <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800">
                {stats.openDrafts}
              </span>
            ) : null}
            {value === 'clients' && stats?.pendingClients ? (
              <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] text-amber-800">
                {stats.pendingClients}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* ── System health ────────────────────────────────────────────────── */}
      {tab === 'dashboard' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <Activity className="h-4 w-4" /> System health
              {health && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    health.ready ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}
                >
                  {health.ready ? 'Ready' : 'Not ready'}
                </span>
              )}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => checkHealth(false)}
                disabled={busy === 'health'}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
              >
                {busy === 'health' ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCw className="h-3.5 w-3.5" />
                )}
                Re-check
              </button>
              <button
                onClick={() => checkHealth(true)}
                disabled={busy === 'health-deep'}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white"
                title="Also sends one tiny AI request to prove the provider really answers"
              >
                {busy === 'health-deep' ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                Deep check
              </button>
            </div>
          </div>
          {!health ? (
            <p className="text-sm text-slate-500">Running checks…</p>
          ) : (
            <ul className="space-y-2">
              {health.checks.map((c) => (
                <li key={c.key} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 shrink-0">
                    {c.status === 'ok' ? '✅' : c.status === 'warn' ? '⚠️' : '❌'}
                  </span>
                  <span>
                    <span className="font-medium text-slate-900">{c.label}</span>
                    <span className="block text-xs text-slate-600">{c.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ── Telegram integration ─────────────────────────────────────────── */}
      {tab === 'settings' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900">
              <Send className="h-4 w-4" /> Telegram integration
            </h2>
            {settings?.telegramConnected && (
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Connected
              </span>
            )}
          </div>

          {!settings?.telegramConnected ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">
                Create a bot with <span className="font-mono">@BotFather</span> on Telegram, then paste
                its token here. The token is stored server-side and never shown again.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="password"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  placeholder="123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={connect}
                  disabled={!botToken.trim() || busy === 'connect'}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {busy === 'connect' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plug className="h-4 w-4" />}
                  Connect
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-slate-500">Bot</dt>
                  <dd className="font-medium text-slate-900">
                    {settings.telegramBotName}
                    {settings.telegramBotUsername && (
                      <span className="ml-1 font-normal text-slate-500">@{settings.telegramBotUsername}</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Token</dt>
                  <dd className="font-mono text-slate-700">{settings.telegramBotToken}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Webhook</dt>
                  <dd className="truncate text-slate-700">{settings.telegramWebhookUrl ?? 'Not registered'}</dd>
                </div>
              </dl>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <label className="mb-1 block text-xs font-medium text-slate-600">
                  Public HTTPS base URL of this Backend
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="https://api.nextgenfusion.in"
                    className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={registerWebhook}
                    disabled={!baseUrl.trim() || busy === 'webhook'}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                  >
                    {busy === 'webhook' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Register webhook
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Telegram will post to <span className="font-mono">{'{base}'}/api/productflow/telegram/webhook</span>.
                  Must be HTTPS and publicly reachable.
                </p>
              </div>

              {status?.webhook && (
                <div className="rounded-lg border border-slate-200 p-3 text-sm">
                  <div className="text-slate-700">
                    Pending updates: <strong>{status.webhook.pendingUpdates}</strong>
                  </div>
                  {status.webhook.lastErrorMessage && (
                    <div className="mt-1 text-red-600">
                      Last error: {status.webhook.lastErrorMessage}
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={checkStatus}
                  disabled={busy === 'status'}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                >
                  {busy === 'status' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  Check status
                </button>
                <button
                  onClick={removeWebhook}
                  disabled={busy === 'webhook-delete'}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
                >
                  Remove webhook
                </button>
                <button
                  onClick={disconnect}
                  disabled={busy === 'disconnect'}
                  className="rounded-lg border border-red-300 px-3 py-1.5 text-sm text-red-600"
                >
                  Disconnect bot
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── AI provider ──────────────────────────────────────────────────── */}
      {tab === 'settings' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 text-base font-semibold text-slate-900">AI provider</h2>
          <p className="mb-3 text-sm text-slate-600">
            Used to classify messages and extract product data. Wired up in Phase 4.
          </p>
          <div className="flex flex-wrap gap-2">
            {settings?.providers.map((p) => {
              const active = settings.aiProvider === p.value
              return (
                <button
                  key={p.value}
                  onClick={() => setProvider(p.value)}
                  disabled={busy === 'provider'}
                  className={`rounded-lg border px-3 py-2 text-left text-sm ${
                    active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="font-medium">{p.label}</div>
                  <div className={`text-xs ${active ? 'text-slate-300' : p.configured ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {p.configured ? 'Key configured' : `Set ${p.envVar}`}
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Clients ──────────────────────────────────────────────────────── */}
      {tab === 'clients' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 text-base font-semibold text-slate-900">Clients</h2>
          <p className="mb-3 text-sm text-slate-600">
            Anyone who messages the bot appears here as <strong>pending</strong>. Their messages are
            logged, but nothing is processed until you activate them.
          </p>
          {clients.length === 0 ? (
            <p className="text-sm text-slate-500">No one has messaged the bot yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                    <th className="py-2">Name</th>
                    <th className="py-2">Telegram</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Last message</th>
                    <th className="py-2" />
                  </tr>
                </thead>
                <tbody>
                  {clients.map((c) => (
                    <tr key={c.id} className="border-b border-slate-100">
                      <td className="py-2 font-medium text-slate-900">{c.name}</td>
                      <td className="py-2 text-slate-600">
                        {c.external_username ? `@${c.external_username}` : c.external_user_id}
                      </td>
                      <td className="py-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            c.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : c.status === 'blocked'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="py-2 text-slate-500">
                        {c.last_message_at ? new Date(c.last_message_at).toLocaleString() : '—'}
                      </td>
                      <td className="py-2 text-right">
                        <select
                          value={c.status}
                          onChange={(e) => setClientStatus(c.id, e.target.value)}
                          disabled={busy === `client-${c.id}`}
                          className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        >
                          <option value="pending">pending</option>
                          <option value="active">active</option>
                          <option value="blocked">blocked</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      {tab === 'projects' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-base font-semibold text-slate-900">Projects</h2>

          <div className="mb-4 grid grid-cols-1 gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-5">
            <select
              value={newProject.clientId}
              onChange={(e) => setNewProject((p) => ({ ...p, clientId: e.target.value }))}
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
            >
              <option value="">Client…</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              value={newProject.name}
              onChange={(e) => setNewProject((p) => ({ ...p, name: e.target.value }))}
              placeholder="Project name"
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
            />
            <input
              value={newProject.websiteUrl}
              onChange={(e) => setNewProject((p) => ({ ...p, websiteUrl: e.target.value }))}
              placeholder="https://site.com"
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
            />
            <select
              value={newProject.platform}
              onChange={(e) => setNewProject((p) => ({ ...p, platform: e.target.value }))}
              className="rounded-lg border border-slate-300 px-2 py-2 text-sm"
            >
              <option value="woocommerce">WooCommerce</option>
              <option value="shopify">Shopify</option>
              <option value="custom">Custom</option>
            </select>
            <button
              onClick={createProject}
              disabled={!newProject.clientId || !newProject.name.trim() || busy === 'project'}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              {busy === 'project' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add
            </button>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-slate-500">No projects yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {projects.map((p) => (
                <li key={p.id} className="py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium text-slate-900">{p.name}</div>
                      <div className="text-xs text-slate-500">
                        {clientName(p.client_id)} · {p.platform}
                        {p.website_url ? ` · ${p.website_url}` : ''}
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={() => checkCsv(p.id)}
                        disabled={busy === `csv-${p.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      >
                        {busy === `csv-${p.id}` ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <FileCheck className="h-3.5 w-3.5" />
                        )}
                        Check CSV
                      </button>
                      <button
                        onClick={() => downloadCsv(p.id)}
                        disabled={preview[p.id] ? !preview[p.id].ok : false}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-white disabled:opacity-40"
                      >
                        <Download className="h-3.5 w-3.5" />
                        CSV
                      </button>
                      <button
                        onClick={() => deleteProject(p.id)}
                        disabled={busy === `project-${p.id}`}
                        className="rounded-lg border border-slate-300 p-1.5 text-slate-500 hover:text-red-600"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {preview[p.id] && (
                    <div
                      className={`mt-2 rounded-lg border px-3 py-2 text-xs ${
                        preview[p.id].ok
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                          : 'border-red-200 bg-red-50 text-red-700'
                      }`}
                    >
                      <div className="font-medium">
                        {preview[p.id].ok
                          ? `Ready — ${preview[p.id].productCount} product(s) via ${preview[p.id].templateName}`
                          : 'CSV cannot be generated yet'}
                      </div>
                      {preview[p.id].errors.map((e, idx) => (
                        <div key={idx}>· {e.message}</div>
                      ))}
                      {preview[p.id].warnings.slice(0, 5).map((w, idx) => (
                        <div key={`w${idx}`} className="text-amber-700">
                          ⚠ {w.message}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ── Drafts in progress ───────────────────────────────────────────── */}
      {tab === 'drafts' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 text-base font-semibold text-slate-900">Product drafts</h2>
          <p className="mb-3 text-sm text-slate-600">
            Products being assembled from chat. A draft waits at{' '}
            <span className="font-medium">NEEDS_INFORMATION</span> until the client supplies the
            missing fields, then moves to <span className="font-medium">READY_FOR_REVIEW</span>.
          </p>
          {drafts.length === 0 ? (
            <p className="text-sm text-slate-500">No drafts yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {drafts.map((d) => {
                const data = d.product_data ?? {}
                const name = (data.name as string) || 'Untitled product'
                return (
                  <li key={d.id} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-slate-900">{name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            d.status === 'READY_FOR_REVIEW'
                              ? 'bg-emerald-50 text-emerald-700'
                              : d.status === 'NEEDS_INFORMATION'
                                ? 'bg-amber-50 text-amber-700'
                                : d.status === 'APPROVED'
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {d.status}
                        </span>
                      </div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {clientName(d.client_id)}
                        {data.regular_price ? ` · ${money(data.regular_price as number)}` : ''}
                        {data.sale_price ? ` → ${money(data.sale_price as number)}` : ''}
                        {data.category ? ` · ${data.category}` : ''}
                        {` · ${d.image_count} image${d.image_count === 1 ? '' : 's'}`}
                      </div>
                      {d.missing_fields?.length > 0 && (
                        <div className="mt-1 text-xs text-amber-700">
                          Missing: {d.missing_fields.join(', ')}
                        </div>
                      )}
                    </div>
                    {!['APPROVED', 'CANCELLED'].includes(d.status) && (
                      <button
                        onClick={() => cancelDraft(d.id)}
                        disabled={busy === `draft-${d.id}`}
                        className="shrink-0 rounded-lg border border-slate-300 px-2.5 py-1 text-xs text-slate-600 hover:text-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      )}

      {/* ── Approved products ────────────────────────────────────────────── */}
      {tab === 'products' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 text-base font-semibold text-slate-900">Approved products</h2>
          <p className="mb-3 text-sm text-slate-600">Ready to export as CSV in Phase 8/9.</p>
          {products.length === 0 ? (
            <p className="text-sm text-slate-500">Nothing approved yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500">
                    <th className="py-2">Product</th>
                    <th className="py-2">Client</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Category</th>
                    <th className="py-2">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100">
                      <td className="py-2 font-medium text-slate-900">{p.name}</td>
                      <td className="py-2 text-slate-600">{clientName(p.client_id)}</td>
                      <td className="py-2 text-slate-700">
                        {p.sale_price ? (
                          <>
                            <span className="text-slate-400 line-through">{money(p.regular_price)}</span>{' '}
                            {money(p.sale_price)}
                          </>
                        ) : (
                          money(p.regular_price)
                        )}
                      </td>
                      <td className="py-2 text-slate-600">{p.category ?? '—'}</td>
                      <td className="py-2 text-slate-500">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* ── CSV templates (Phase 8) ──────────────────────────────────────── */}
      {tab === 'templates' && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-slate-900">
            <Table2 className="h-4 w-4" /> CSV templates
          </h2>
          <p className="mb-3 text-sm text-slate-600">
            Each project exports through the template matching its platform. Columns and field
            mapping are data, so a client with an unusual importer is handled by editing a template
            rather than changing code.
          </p>
          {templates.length === 0 ? (
            <p className="text-sm text-slate-500">Loading templates…</p>
          ) : (
            <ul className="space-y-2">
              {templates.map((t) => (
                <li key={t.id} className="rounded-lg border border-slate-200 px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">{t.name}</span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                      {t.platform}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-slate-500">
                    {t.columns.length} columns · {t.columns.slice(0, 6).join(', ')}
                    {t.columns.length > 6 ? '…' : ''}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* ── Export history (Phase 9) ─────────────────────────────────────── */}
      {tab === 'exports' && exports.length > 0 && (
        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-3 text-base font-semibold text-slate-900">Recent CSV exports</h2>
          <ul className="divide-y divide-slate-100 text-sm">
            {exports.map((e) => (
              <li key={e.id} className="flex items-center justify-between py-2">
                <span className="font-mono text-xs text-slate-700">{e.filename}</span>
                <span className="text-xs text-slate-500">
                  {e.product_count} product(s) · {new Date(e.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Inbound log ──────────────────────────────────────────────────── */}
      {tab === 'messages' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-3 text-base font-semibold text-slate-900">Recent messages</h2>
            {messages.length === 0 ? (
              <p className="text-sm text-slate-500">Nothing received yet.</p>
            ) : (
              <ul className="space-y-2">
                {messages.map((m) => (
                  <li key={m.id} className="rounded-lg border border-slate-100 px-3 py-2 text-sm">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{clientName(m.client_id)}</span>
                      <span>{new Date(m.created_at).toLocaleString()}</span>
                    </div>
                    <div className="text-slate-800">
                      {m.message_type !== 'text' && (
                        <span className="mr-1 rounded bg-slate-100 px-1.5 py-0.5 text-xs">{m.message_type}</span>
                      )}
                      {m.classification && (
                        <span className="mr-1 rounded bg-indigo-50 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
                          {m.classification}
                        </span>
                      )}
                      {m.text || <span className="text-slate-400">(no text)</span>}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-1 text-base font-semibold text-slate-900">Recent images</h2>
            <p className="mb-3 text-xs text-slate-500">Downloaded from Telegram and stored in Cloudinary.</p>
            {images.length === 0 ? (
              <p className="text-sm text-slate-500">No images yet.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {images.map((img) =>
                  img.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={img.id}
                      src={img.url}
                      alt=""
                      className="aspect-square w-full rounded-lg border border-slate-200 object-cover"
                    />
                  ) : (
                    <div
                      key={img.id}
                      title={img.error ?? 'failed'}
                      className="flex aspect-square w-full items-center justify-center rounded-lg border border-red-200 bg-red-50 text-[10px] text-red-600"
                    >
                      failed
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        </div>
      )}
      </div>
    </AdminShell>
  )
}
