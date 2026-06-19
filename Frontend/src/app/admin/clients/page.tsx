'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus, KeyRound, Ban, CheckCircle2, Palette, CreditCard } from 'lucide-react'

type Client = {
  id: string
  name: string
  company: string | null
  email: string
  is_active: boolean
  subscription_plan: string | null
  subscription_status: string | null
  allowed_tools: string[] | null
  subscription_current_period_end: string | null
  created_at: string
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10'

export default function AdminClientsPage() {
  const [items, setItems] = useState<Client[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/client-users')
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load clients')
      setItems(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function createClient(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const res = await fetch('/api/admin/client-users', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, company, email, password }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to create client')
      setName('')
      setCompany('')
      setEmail('')
      setPassword('')
      setShowForm(false)
      load()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to create client')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(client: Client) {
    if (client.is_active) {
      if (!confirm(`Deactivate ${client.email}? They will no longer be able to log in.`)) return
      const res = await fetch(`/api/admin/client-users/${client.id}`, { method: 'DELETE' })
      if (res.ok) load()
    } else {
      const res = await fetch(`/api/admin/client-users/${client.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ is_active: true }),
      })
      if (res.ok) load()
    }
  }

  async function resetPassword(client: Client) {
    const next = prompt(`New password for ${client.email} (min 8 chars):`)
    if (!next) return
    if (next.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    const res = await fetch(`/api/admin/client-users/${client.id}/password`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password: next }),
    })
    if (res.ok) alert('Password updated')
    else alert('Failed to update password')
  }

  async function editSubscription(client: Client) {
    const plan = prompt('Plan name:', client.subscription_plan || 'starter')
    if (plan === null) return
    const status = prompt(
      'Status: trialing, active, past_due, canceled, inactive',
      client.subscription_status || 'active',
    )
    if (status === null) return
    const tools = prompt(
      'Allowed tools, comma separated: product_catalog, image_library, ai_product_copy',
      (client.allowed_tools || []).join(', ') || 'product_catalog',
    )
    if (tools === null) return
    const currentPeriodEnd = prompt(
      'Current period end ISO date, or blank for no expiry:',
      client.subscription_current_period_end || '',
    )
    if (currentPeriodEnd === null) return

    const res = await fetch(`/api/admin/client-users/${client.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        subscription_plan: plan,
        subscription_status: status,
        allowed_tools: tools.split(',').map((tool) => tool.trim()).filter(Boolean),
        subscription_current_period_end: currentPeriodEnd.trim() || null,
      }),
    })
    if (res.ok) load()
    else alert('Failed to update subscription')
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl">
        <PageHeader
          title="Clients"
          description="Create logins for clients to build product catalogs and export CSVs at /portal."
          action={
            <button
              onClick={() => setShowForm((s) => !s)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
            >
              <Plus className="h-4 w-4" /> New client
            </button>
          }
        />

        {showForm && (
          <form onSubmit={createClient} className="mb-6 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
                <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  className={inputCls}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password * (min 8)</label>
                <input
                  type="text"
                  className={inputCls}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {saving ? 'Creating…' : 'Create client'}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Company</th>
                  <th className="px-4 py-2 font-medium">Email</th>
                  <th className="px-4 py-2 font-medium">Plan</th>
                  <th className="px-4 py-2 font-medium">Subscription</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                      No clients yet. Create one to give them portal access.
                    </td>
                  </tr>
                )}
                {items.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">
                      <Link href={`/admin/clients/${c.id}`} className="hover:underline">
                        {c.name || c.email}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-slate-700">{c.company || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">{c.email}</td>
                    <td className="px-4 py-2 text-slate-700">{c.subscription_plan || 'starter'}</td>
                    <td className="px-4 py-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                        {c.subscription_status || 'active'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={
                          'text-xs px-2 py-0.5 rounded-full ' +
                          (c.is_active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500')
                        }
                      >
                        {c.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/clients/${c.id}`}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                          title="Brand profile"
                        >
                          <Palette className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => editSubscription(c)}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                          title="Edit subscription"
                        >
                          <CreditCard className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => resetPassword(c)}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-600"
                          title="Reset password"
                        >
                          <KeyRound className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(c)}
                          className={
                            'p-1.5 rounded ' +
                            (c.is_active ? 'hover:bg-red-100 text-red-600' : 'hover:bg-green-100 text-green-600')
                          }
                          title={c.is_active ? 'Deactivate' : 'Reactivate'}
                        >
                          {c.is_active ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
