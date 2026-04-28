'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus, MessageSquare } from 'lucide-react'

const SERVICES = [
  'Website Development Services',
  'E-commerce Web Development Services',
  'Android App Development Services',
  'Web Design Services',
  'AI Automation and AI Development Services',
  'SEO Services',
  'PPC Services',
  'Social Media Marketing Services',
  'Website Maintenance Services',
  'Software Development Services',
  'API Integration Services',
  'Cloud Solutions',
]

const STATUSES = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'replied', label: 'Replied' },
  { value: 'meeting_scheduled', label: 'Meeting Scheduled' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'not_interested', label: 'Not Interested' },
]

const INTERACTION_TYPES = ['email', 'call', 'linkedin', 'meeting', 'note']

type Lead = Record<string, unknown>
type Interaction = {
  id: string
  interaction_type: string
  summary: string
  outcome: string | null
  next_action: string | null
  created_at: string
}

export default function LeadDetailPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const id = params.id
  const [lead, setLead] = useState<Lead | null>(null)
  const [interactions, setInteractions] = useState<Interaction[]>([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, string>>({})

  // Interaction form state
  const [showInteraction, setShowInteraction] = useState(false)
  const [iForm, setIForm] = useState({ interaction_type: 'email', summary: '', outcome: '', next_action: '' })
  const [iSaving, setISaving] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/leads/${id}`).then((r) => r.json()),
      fetch(`/api/admin/leads/${id}/interactions`).then((r) => r.json()),
    ]).then(([leadData, intData]) => {
      if (leadData.error) { setError(leadData.error); return }
      setLead(leadData)
      setForm(Object.fromEntries(
        Object.entries(leadData).map(([k, v]) => [k, v == null ? '' : String(v)])
      ))
      setInteractions(Array.isArray(intData) ? intData : [])
    })
  }, [id])

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to save')
      setLead(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function onAddInteraction(e: React.FormEvent) {
    e.preventDefault()
    if (!iForm.summary.trim()) return
    setISaving(true)
    try {
      const res = await fetch(`/api/admin/leads/${id}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(iForm),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to save')
      setInteractions((prev) => [json, ...prev])
      setIForm({ interaction_type: 'email', summary: '', outcome: '', next_action: '' })
      setShowInteraction(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save interaction')
    } finally {
      setISaving(false)
    }
  }

  if (!lead) {
    return (
      <AdminShell>
        <div className="p-8 text-slate-400">
          {error ? <p className="text-red-600">{error}</p> : 'Loading…'}
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-4xl">
        <PageHeader
          title={String(lead.company_name ?? 'Lead')}
          description={[lead.contact_name, lead.contact_title, lead.industry].filter(Boolean).join(' · ')}
        />

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
        )}

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          {/* Lead form — 2/3 */}
          <form onSubmit={onSave} className="lg:col-span-2 space-y-6">
            <Section title="Business Information">
              <Grid>
                <F label="Company Name *" field="company_name" form={form} set={set} />
                <F label="Website" field="website" form={form} set={set} type="url" />
                <F label="Industry" field="industry" form={form} set={set} />
                <F label="Company Size" field="company_size" form={form} set={set} />
                <F label="Location" field="location" form={form} set={set} />
                <F label="LinkedIn" field="linkedin_url" form={form} set={set} />
              </Grid>
            </Section>

            <Section title="Contact Person">
              <Grid>
                <F label="Contact Name" field="contact_name" form={form} set={set} />
                <F label="Title / Role" field="contact_title" form={form} set={set} />
                <F label="Email" field="email" form={form} set={set} type="email" />
                <F label="Phone" field="phone" form={form} set={set} />
              </Grid>
            </Section>

            <Section title="Targeting">
              <Grid>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Service to Pitch</label>
                  <select
                    value={form.target_service ?? ''}
                    onChange={(e) => set('target_service', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    <option value="">— Select service —</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Status</label>
                  <select
                    value={form.status ?? 'new'}
                    onChange={(e) => set('status', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                  >
                    {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <F label="Source" field="source" form={form} set={set} />
                <F label="Assigned To" field="assigned_to" form={form} set={set} />
                <F label="Next Followup" field="next_followup_at" form={form} set={set} type="date" />
              </Grid>
              <div className="mt-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Pain Point</label>
                <textarea
                  value={form.pain_point ?? ''}
                  onChange={(e) => set('pain_point', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>
              <div className="mt-3">
                <label className="block text-xs font-medium text-slate-600 mb-1">Notes</label>
                <textarea
                  value={form.notes ?? ''}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>
            </Section>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/leads')}
                className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
              >
                Back to Leads
              </button>
            </div>
          </form>

          {/* Interaction log — 1/3 */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-900">Interaction Log</h2>
              <button
                onClick={() => setShowInteraction((v) => !v)}
                className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg px-2 py-1 hover:bg-slate-50 transition"
              >
                <Plus className="h-3 w-3" /> Log
              </button>
            </div>

            {showInteraction && (
              <form onSubmit={onAddInteraction} className="mb-4 rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Type</label>
                  <select
                    value={iForm.interaction_type}
                    onChange={(e) => setIForm((p) => ({ ...p, interaction_type: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {INTERACTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Summary *</label>
                  <textarea
                    value={iForm.summary}
                    onChange={(e) => setIForm((p) => ({ ...p, summary: e.target.value }))}
                    rows={2}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="What happened?"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Next Action</label>
                  <input
                    type="text"
                    value={iForm.next_action}
                    onChange={(e) => setIForm((p) => ({ ...p, next_action: e.target.value }))}
                    className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder="Follow up in 3 days…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={iSaving}
                  className="w-full py-1.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  {iSaving ? 'Saving…' : 'Log Interaction'}
                </button>
              </form>
            )}

            <div className="space-y-3">
              {interactions.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-6 w-6 text-slate-300 mb-2" />
                  <p className="text-xs text-slate-400">No interactions yet.</p>
                </div>
              )}
              {interactions.map((i) => (
                <div key={i.id} className="rounded-xl border border-slate-200 p-3 bg-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-slate-700 capitalize">{i.interaction_type}</span>
                    <span className="text-xs text-slate-400">{new Date(i.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-700">{i.summary}</p>
                  {i.next_action && (
                    <p className="mt-1 text-xs text-slate-500">Next: {i.next_action}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
}

function F({
  label, field, form, set, type = 'text',
}: {
  label: string
  field: string
  form: Record<string, string>
  set: (f: string, v: string) => void
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={form[field] ?? ''}
        onChange={(e) => set(field, e.target.value)}
        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </div>
  )
}
