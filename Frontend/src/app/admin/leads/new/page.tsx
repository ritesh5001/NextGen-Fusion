'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'

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

export default function NewLeadPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    company_name: '',
    contact_name: '',
    contact_title: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    company_size: '',
    location: '',
    linkedin_url: '',
    target_service: '',
    pain_point: '',
    status: 'new',
    source: 'manual',
    notes: '',
  })

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company_name.trim()) { setError('Company name is required'); return }
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to create lead')
      router.push('/admin/leads')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
      setSaving(false)
    }
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader title="New Lead" description="Add a new business prospect to your targeting database." />

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
        )}

        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          {/* Business Info */}
          <section>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Business Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Company Name *" value={form.company_name} onChange={(v) => set('company_name', v)} placeholder="Acme Corp" />
              <Field label="Website" value={form.website} onChange={(v) => set('website', v)} placeholder="https://acme.com" type="url" />
              <Field label="Industry" value={form.industry} onChange={(v) => set('industry', v)} placeholder="E-commerce, Real Estate, SaaS…" />
              <Field label="Company Size" value={form.company_size} onChange={(v) => set('company_size', v)} placeholder="1-10, 11-50, 51-200, 200+" />
              <Field label="Location" value={form.location} onChange={(v) => set('location', v)} placeholder="Mumbai, India" />
              <Field label="LinkedIn" value={form.linkedin_url} onChange={(v) => set('linkedin_url', v)} placeholder="https://linkedin.com/company/acme" />
            </div>
          </section>

          {/* Contact Info */}
          <section>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Contact Person</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Contact Name" value={form.contact_name} onChange={(v) => set('contact_name', v)} placeholder="Jane Doe" />
              <Field label="Title / Role" value={form.contact_title} onChange={(v) => set('contact_title', v)} placeholder="Founder, Marketing Manager…" />
              <Field label="Email" value={form.email} onChange={(v) => set('email', v)} placeholder="jane@acme.com" type="email" />
              <Field label="Phone" value={form.phone} onChange={(v) => set('phone', v)} placeholder="+91 98765 43210" />
            </div>
          </section>

          {/* Targeting */}
          <section>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Targeting</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Service to Pitch</label>
                <select
                  value={form.target_service}
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
                  value={form.status}
                  onChange={(e) => set('status', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
                >
                  {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <Field label="Source" value={form.source} onChange={(v) => set('source', v)} placeholder="manual, linkedin, referral…" />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-slate-600 mb-1">Pain Point / Why We Reach Out</label>
              <textarea
                value={form.pain_point}
                onChange={(e) => set('pain_point', e.target.value)}
                rows={2}
                placeholder="They have an outdated website with no clear conversion path…"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
              />
            </div>
          </section>

          {/* Notes */}
          <section>
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Notes</h2>
            <textarea
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              rows={3}
              placeholder="Any additional context, research findings, or outreach ideas…"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition"
            >
              {saving ? 'Saving…' : 'Create Lead'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </div>
  )
}
