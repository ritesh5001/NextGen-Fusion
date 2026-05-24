'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'
import { ExternalLink } from 'lucide-react'

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

const STATUS_COLORS: Record<string, string> = {
  kickoff: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-emerald-100 text-emerald-700',
  client_review: 'bg-amber-100 text-amber-700',
  revisions: 'bg-orange-100 text-orange-700',
  delivered: 'bg-slate-100 text-slate-600',
  on_hold: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-600',
}

const STATUS_LABELS: Record<string, string> = {
  kickoff: 'Kickoff',
  in_progress: 'In Progress',
  client_review: 'Client Review',
  revisions: 'Revisions',
  delivered: 'Delivered',
  on_hold: 'On Hold',
  cancelled: 'Cancelled',
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

interface Member {
  id: string
  name: string
  email: string
  role: string
  avatar_color: string
  is_active: boolean
  active_project_count: number
}

interface Project {
  id: string
  title: string
  client_name: string
  status: string
  deadline: string | null
}

export default function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [member, setMember] = useState<Member | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pwSaving, setPwSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

  useEffect(() => {
    Promise.all([
      fetch(`/api/agency/members/${id}`).then((r) => r.json()),
      fetch(`/api/agency/projects?member_id=${id}`).then((r) => r.json()),
    ]).then(([mJson, pJson]) => {
      if (mJson.error) { setError(mJson.error); return }
      setMember(mJson.data)
      setProjects(pJson.data ?? [])
    }).catch(() => setError('Failed to load member'))
      .finally(() => setLoading(false))
  }, [id])

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!member) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/agency/members/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: member.name,
          email: member.email,
          role: member.role,
          avatar_color: member.avatar_color,
          is_active: member.is_active,
        }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to save'); return }
      setMember((m) => m ? { ...m, ...json.data } : m)
      setSuccess('Profile saved')
      setTimeout(() => setSuccess(''), 2000)
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setPwSaving(true)
    setPwError('')
    setPwSuccess('')
    try {
      const res = await fetch(`/api/agency/members/${id}/password`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      })
      const json = await res.json()
      if (!res.ok) { setPwError(json.error || 'Failed'); return }
      setNewPassword('')
      setPwSuccess('Password updated')
      setTimeout(() => setPwSuccess(''), 2000)
    } catch {
      setPwError('Failed to update password')
    } finally {
      setPwSaving(false)
    }
  }

  if (loading) return <AgencyShell><div className="p-6 text-sm text-slate-400">Loading…</div></AgencyShell>
  if (!member) return <AgencyShell><div className="p-6 text-sm text-red-500">{error || 'Member not found'}</div></AgencyShell>

  const color = member.avatar_color || '#3B82F6'

  return (
    <AgencyShell>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="h-14 w-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
            style={{ backgroundColor: color }}
          >
            {initials(member.name)}
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{member.name}</h1>
            <p className="text-sm text-slate-500">{member.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: profile + password */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={saveProfile} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900">Profile</h2>

              {error && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>}
              {success && <div className="rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">{success}</div>}

              <div className="flex items-center gap-4">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: member.avatar_color }}
                >
                  {initials(member.name)}
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Avatar color</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {AVATAR_COLORS.map((c) => (
                      <button
                        key={c.value}
                        type="button"
                        title={c.label}
                        onClick={() => setMember((m) => m ? { ...m, avatar_color: c.value } : m)}
                        className={`h-5 w-5 rounded-full transition ${member.avatar_color === c.value ? 'ring-2 ring-offset-1 ring-slate-900' : ''}`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    value={member.name}
                    onChange={(e) => setMember((m) => m ? { ...m, name: e.target.value } : m)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                  <select
                    value={member.role}
                    onChange={(e) => setMember((m) => m ? { ...m, role: e.target.value } : m)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="partner">Partner</option>
                    <option value="admin_partner">Admin Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) => setMember((m) => m ? { ...m, email: e.target.value } : m)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={member.is_active}
                    onChange={(e) => setMember((m) => m ? { ...m, is_active: e.target.checked } : m)}
                    className="h-4 w-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">Active</span>
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
                >
                  {saving ? 'Saving…' : 'Save Profile'}
                </button>
              </div>
            </form>

            <form onSubmit={changePassword} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <h2 className="text-sm font-semibold text-slate-900">Change Password</h2>
              {pwError && <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{pwError}</div>}
              {pwSuccess && <div className="rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3">{pwSuccess}</div>}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                  required
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  placeholder="Min 8 characters"
                />
              </div>
              <button
                type="submit"
                disabled={pwSaving}
                className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
              >
                {pwSaving ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </div>

          {/* Right: assigned projects */}
          <div>
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Assigned Projects ({projects.length})
              </h2>
              {projects.length === 0 ? (
                <p className="text-sm text-slate-400">No projects assigned yet.</p>
              ) : (
                <div className="space-y-2">
                  {projects.map((p) => (
                    <Link
                      key={p.id}
                      href={`/admin/agency/projects/${p.id}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-900 truncate">{p.title}</div>
                        <div className="text-xs text-slate-500 truncate">{p.client_name}</div>
                        <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status] ?? 'bg-slate-100 text-slate-600'}`}>
                          {STATUS_LABELS[p.status] ?? p.status}
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AgencyShell>
  )
}
