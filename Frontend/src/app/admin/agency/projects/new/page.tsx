'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'

const PROJECT_TYPES = [
  'Web Development', 'Mobile App', 'UI/UX Design', 'SEO', 'Social Media',
  'Marketing Campaign', 'Branding', 'E-commerce', 'Content Writing', 'Other',
]

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED']

interface Member {
  id: string
  name: string
  avatar_color: string
  is_active: boolean
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function NewProjectPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [form, setForm] = useState({
    title: '',
    client_name: '',
    client_email: '',
    client_phone: '',
    client_company: '',
    client_website: '',
    status: 'kickoff',
    priority: 'medium',
    project_type: '',
    start_date: '',
    deadline: '',
    budget: '',
    currency: 'INR',
    description: '',
    notes: '',
  })
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set())
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/agency/members')
      .then((r) => r.json())
      .then((json) => setMembers((json.data ?? []).filter((m: Member) => m.is_active)))
  }, [])

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function toggleMember(id: string) {
    setSelectedMembers((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const body = {
        ...form,
        budget: form.budget ? parseFloat(form.budget) : undefined,
        start_date: form.start_date || undefined,
        deadline: form.deadline || undefined,
        member_ids: Array.from(selectedMembers),
      }
      const res = await fetch('/api/agency/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to create project'); return }
      router.push(`/admin/agency/projects/${json.data.id}`)
    } catch {
      setError('Failed to create project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AgencyShell>
      <div className="p-6 max-w-3xl">
        <PageHeader title="New Project" description="Start tracking a new client project" />

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Details */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Project Details</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Website Redesign for Client"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                <select
                  value={form.project_type}
                  onChange={(e) => set('project_type', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="">Select type…</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="kickoff">Kickoff</option>
                  <option value="in_progress">In Progress</option>
                  <option value="client_review">Client Review</option>
                  <option value="revisions">Revisions</option>
                  <option value="delivered">Delivered</option>
                  <option value="on_hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
              <div className="flex gap-2">
                {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => set('priority', p)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border capitalize transition ${
                      form.priority === p
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Client Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.client_name}
                  onChange={(e) => set('client_name', e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input
                  value={form.client_company}
                  onChange={(e) => set('client_company', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={form.client_email}
                  onChange={(e) => set('client_email', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  value={form.client_phone}
                  onChange={(e) => set('client_phone', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                <input
                  value={form.client_website}
                  onChange={(e) => set('client_website', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="https://client.com"
                />
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Timeline &amp; Budget</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => set('start_date', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => set('deadline', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
                <input
                  type="number"
                  value={form.budget}
                  onChange={(e) => set('budget', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="50000"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                <select
                  value={form.currency}
                  onChange={(e) => set('currency', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Description & Notes */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Description &amp; Notes</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                placeholder="What is this project about?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => set('notes', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                placeholder="Internal notes (not visible to client)"
              />
            </div>
          </div>

          {/* Team Assignment */}
          {members.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Assign Team Members</h2>
              <div className="grid grid-cols-2 gap-2">
                {members.map((m) => {
                  const selected = selectedMembers.has(m.id)
                  return (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                        selected ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleMember(m.id)}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      <div
                        className="h-7 w-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: m.avatar_color }}
                      >
                        {initials(m.name)}
                      </div>
                      <span className="text-sm text-slate-800">{m.name}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
            >
              {saving ? 'Creating…' : 'Create Project'}
            </button>
            <Link
              href="/admin/agency/projects"
              className="border border-slate-300 bg-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AgencyShell>
  )
}
