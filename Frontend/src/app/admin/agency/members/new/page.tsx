'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'
import Link from 'next/link'

const AVATAR_COLORS = [
  { label: 'Blue', value: '#3B82F6' },
  { label: 'Green', value: '#10B981' },
  { label: 'Amber', value: '#F59E0B' },
  { label: 'Red', value: '#EF4444' },
  { label: 'Purple', value: '#8B5CF6' },
  { label: 'Pink', value: '#EC4899' },
  { label: 'Teal', value: '#14B8A6' },
  { label: 'Orange', value: '#F97316' },
  { label: 'Indigo', value: '#6366F1' },
  { label: 'Lime', value: '#84CC16' },
]

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) || '?'
}

export default function NewMemberPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'partner',
    avatar_color: '#3B82F6',
  })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/agency/members', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to create member'); return }
      router.push(`/admin/agency/members/${json.data.id}`)
    } catch {
      setError('Failed to create member')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AgencyShell>
      <div className="p-6 max-w-2xl">
        <PageHeader title="Add Team Member" description="Add a new partner to the agency" />

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-semibold text-slate-900">Profile</h2>

            {/* Avatar preview */}
            <div className="flex items-center gap-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: form.avatar_color }}
              >
                {initials(form.name)}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-700 mb-2">Avatar color</div>
                <div className="flex gap-2 flex-wrap">
                  {AVATAR_COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.label}
                      onClick={() => set('avatar_color', c.value)}
                      className={`h-6 w-6 rounded-full transition ${form.avatar_color === c.value ? 'ring-2 ring-offset-2 ring-slate-900' : ''}`}
                      style={{ backgroundColor: c.value }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Ritesh Giri"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => set('role', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                >
                  <option value="partner">Partner</option>
                  <option value="admin_partner">Admin Partner</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                required
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="partner@nextgenfusion.in"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => set('password', e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                placeholder="Min 8 characters"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
            >
              {saving ? 'Creating…' : 'Create Member'}
            </button>
            <Link
              href="/admin/agency/members"
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
