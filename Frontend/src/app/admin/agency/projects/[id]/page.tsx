'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { AgencyShell } from '@/components/admin/agency-shell'
import { Trash2, Plus, FolderOpen, PenTool, Github, Link as LinkIcon, Check, Pencil } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'kickoff', label: 'Kickoff' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'client_review', label: 'Client Review' },
  { value: 'revisions', label: 'Revisions' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'cancelled', label: 'Cancelled' },
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

const PRIORITY_COLORS: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-slate-100 text-slate-600',
}

const REF_ICONS: Record<string, React.ReactNode> = {
  drive: <FolderOpen className="h-4 w-4 text-blue-500" />,
  figma: <PenTool className="h-4 w-4 text-purple-500" />,
  github: <Github className="h-4 w-4 text-slate-900" />,
  url: <LinkIcon className="h-4 w-4 text-slate-500" />,
}

const PROJECT_TYPES = [
  'Web Development', 'Mobile App', 'UI/UX Design', 'SEO', 'Social Media',
  'Marketing Campaign', 'Branding', 'E-commerce', 'Content Writing', 'Other',
]

const CURRENCIES = ['INR', 'USD', 'EUR', 'GBP', 'AED']

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function timeAgo(date: string): string {
  const diff = Date.now() - new Date(date).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

interface Member { id: string; name: string; avatar_color: string; role?: string }
interface Assignment { role: string; assigned_at: string; agency_members: Member | null }
interface Reference { id: string; type: string; title: string; url: string; notes: string | null }
interface Milestone { id: string; title: string; description: string | null; due_date: string | null; is_completed: boolean; completed_at: string | null }
interface Update { id: string; content: string; update_type: string; created_at: string; agency_members: { id: string; name: string } | null }
interface Project {
  id: string; title: string; client_name: string; client_email: string | null
  client_phone: string | null; client_company: string | null; client_website: string | null
  status: string; priority: string; project_type: string | null
  start_date: string | null; deadline: string | null; delivered_date: string | null
  budget: number | null; currency: string; description: string | null; notes: string | null
  project_assignments: Assignment[]; project_references: Reference[]
  project_milestones: Milestone[]; project_updates: Update[]
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [allMembers, setAllMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState('')

  // Status change
  const [newStatus, setNewStatus] = useState('')
  const [statusNote, setStatusNote] = useState('')
  const [statusSaving, setStatusSaving] = useState(false)

  // New reference form
  const [refForm, setRefForm] = useState({ type: 'url', title: '', url: '', notes: '' })
  const [refAdding, setRefAdding] = useState(false)
  const [showRefForm, setShowRefForm] = useState(false)

  // New milestone form
  const [milForm, setMilForm] = useState({ title: '', description: '', due_date: '' })
  const [milAdding, setMilAdding] = useState(false)
  const [showMilForm, setShowMilForm] = useState(false)

  // New activity note
  const [noteContent, setNoteContent] = useState('')
  const [noteAdding, setNoteAdding] = useState(false)

  // Assign member
  const [assignMemberId, setAssignMemberId] = useState('')
  const [assignRole, setAssignRole] = useState('contributor')
  const [assigning, setAssigning] = useState(false)

  const load = useCallback(() => {
    Promise.all([
      fetch(`/api/agency/projects/${id}`).then((r) => r.json()),
      fetch('/api/agency/members').then((r) => r.json()),
    ]).then(([pJson, mJson]) => {
      if (pJson.error) { setError(pJson.error); return }
      setProject(pJson.data)
      setNewStatus(pJson.data.status)
      setAllMembers(mJson.data ?? [])
    }).catch(() => setError('Failed to load project'))
      .finally(() => setLoading(false))
  }, [id])

  useEffect(() => { load() }, [load])

  async function saveInfo(e: React.FormEvent) {
    e.preventDefault()
    if (!project) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/agency/projects/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          title: project.title, client_name: project.client_name, client_email: project.client_email,
          client_phone: project.client_phone, client_company: project.client_company,
          client_website: project.client_website, priority: project.priority,
          project_type: project.project_type, start_date: project.start_date,
          deadline: project.deadline, budget: project.budget, currency: project.currency,
          description: project.description, notes: project.notes,
        }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed to save'); return }
      setProject((p) => p ? { ...p, ...json.data } : p)
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    } catch {
      setError('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function changeStatus() {
    setStatusSaving(true)
    try {
      const res = await fetch(`/api/agency/projects/${id}/status`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: statusNote || undefined }),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed'); return }
      setStatusNote('')
      load()
    } catch {
      setError('Failed to update status')
    } finally {
      setStatusSaving(false)
    }
  }

  async function addRef() {
    if (!refForm.title || !refForm.url) return
    setRefAdding(true)
    try {
      const res = await fetch(`/api/agency/projects/${id}/references`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(refForm),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed'); return }
      setProject((p) => p ? { ...p, project_references: [...p.project_references, json.data] } : p)
      setRefForm({ type: 'url', title: '', url: '', notes: '' })
      setShowRefForm(false)
    } catch {
      setError('Failed to add reference')
    } finally {
      setRefAdding(false)
    }
  }

  async function deleteRef(refId: string) {
    await fetch(`/api/agency/projects/${id}/references/${refId}`, { method: 'DELETE' })
    setProject((p) => p ? { ...p, project_references: p.project_references.filter((r) => r.id !== refId) } : p)
  }

  async function addMilestone() {
    if (!milForm.title) return
    setMilAdding(true)
    try {
      const res = await fetch(`/api/agency/projects/${id}/milestones`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(milForm),
      })
      const json = await res.json()
      if (!res.ok) { setError(json.error || 'Failed'); return }
      setProject((p) => p ? { ...p, project_milestones: [...p.project_milestones, json.data] } : p)
      setMilForm({ title: '', description: '', due_date: '' })
      setShowMilForm(false)
    } catch {
      setError('Failed to add milestone')
    } finally {
      setMilAdding(false)
    }
  }

  async function toggleMilestone(mil: Milestone) {
    const res = await fetch(`/api/agency/projects/${id}/milestones/${mil.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ is_completed: !mil.is_completed }),
    })
    const json = await res.json()
    if (!res.ok) return
    setProject((p) => p ? {
      ...p,
      project_milestones: p.project_milestones.map((m) => m.id === mil.id ? json.data : m),
    } : p)
    if (!mil.is_completed) {
      const updateRes = await fetch(`/api/agency/projects/${id}/updates`).then((r) => r.json())
      if (updateRes.data) setProject((p) => p ? { ...p, project_updates: updateRes.data } : p)
    }
  }

  async function deleteMilestone(milId: string) {
    await fetch(`/api/agency/projects/${id}/milestones/${milId}`, { method: 'DELETE' })
    setProject((p) => p ? { ...p, project_milestones: p.project_milestones.filter((m) => m.id !== milId) } : p)
  }

  async function addNote() {
    if (!noteContent.trim()) return
    setNoteAdding(true)
    try {
      const res = await fetch(`/api/agency/projects/${id}/updates`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: noteContent }),
      })
      const json = await res.json()
      if (!res.ok) return
      setProject((p) => p ? { ...p, project_updates: [json.data, ...p.project_updates] } : p)
      setNoteContent('')
    } catch {
      /* ignore */
    } finally {
      setNoteAdding(false)
    }
  }

  async function assignMember() {
    if (!assignMemberId) return
    setAssigning(true)
    try {
      const res = await fetch(`/api/agency/projects/${id}/assignments`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ member_id: assignMemberId, role: assignRole }),
      })
      if (!res.ok) return
      setAssignMemberId('')
      load()
    } catch {
      /* ignore */
    } finally {
      setAssigning(false)
    }
  }

  async function removeMember(memberId: string) {
    await fetch(`/api/agency/projects/${id}/assignments/${memberId}`, { method: 'DELETE' })
    setProject((p) => p ? {
      ...p,
      project_assignments: p.project_assignments.filter((a) => a.agency_members?.id !== memberId),
    } : p)
  }

  async function deleteProject() {
    if (!confirm('Delete this project permanently? This cannot be undone.')) return
    await fetch(`/api/agency/projects/${id}`, { method: 'DELETE' })
    router.push('/admin/agency/projects')
  }

  if (loading) return <AgencyShell><div className="p-6 text-sm text-slate-400">Loading…</div></AgencyShell>
  if (!project) return <AgencyShell><div className="p-6 text-sm text-red-500">{error || 'Project not found'}</div></AgencyShell>

  const assignedIds = new Set(project.project_assignments.map((a) => a.agency_members?.id).filter(Boolean))
  const unassignedMembers = allMembers.filter((m) => !assignedIds.has(m.id))

  const set = (field: keyof Project, value: string | number | null) =>
    setProject((p) => p ? { ...p, [field]: value } : p)

  return (
    <AgencyShell>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/admin/agency/projects" className="text-xs text-slate-400 hover:text-slate-600">Projects</Link>
              <span className="text-xs text-slate-300">/</span>
              <span className="text-xs text-slate-500">{project.title}</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{project.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[project.status]}`}>
                {STATUS_OPTIONS.find((s) => s.value === project.status)?.label}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${PRIORITY_COLORS[project.priority]}`}>
                {project.priority}
              </span>
              {project.deadline && (
                <span className="text-xs text-slate-500">
                  Due {new Date(project.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={deleteProject}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            title="Delete project"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left column: info, milestones, activity ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project info */}
            <form onSubmit={saveInfo} className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Project Info</h2>
                {saveSuccess && <span className="text-xs text-emerald-600 flex items-center gap-1"><Check className="h-3 w-3" /> Saved</span>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  value={project.title}
                  onChange={(e) => set('title', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client Name</label>
                  <input
                    value={project.client_name}
                    onChange={(e) => set('client_name', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                  <input
                    value={project.client_company ?? ''}
                    onChange={(e) => set('client_company', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={project.client_email ?? ''}
                    onChange={(e) => set('client_email', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    value={project.client_phone ?? ''}
                    onChange={(e) => set('client_phone', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Website</label>
                  <input
                    value={project.client_website ?? ''}
                    onChange={(e) => set('client_website', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select
                    value={project.project_type ?? ''}
                    onChange={(e) => set('project_type', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="">—</option>
                    {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={project.priority}
                    onChange={(e) => set('priority', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={project.start_date ?? ''}
                    onChange={(e) => set('start_date', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={project.deadline ?? ''}
                    onChange={(e) => set('deadline', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Budget</label>
                  <input
                    type="number"
                    value={project.budget ?? ''}
                    onChange={(e) => set('budget', e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Currency</label>
                  <select
                    value={project.currency}
                    onChange={(e) => set('currency', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={project.description ?? ''}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Internal Notes</label>
                <textarea
                  value={project.notes ?? ''}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-slate-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
              >
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </form>

            {/* Milestones */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-900">
                  Milestones ({project.project_milestones.length})
                </h2>
                <button
                  onClick={() => setShowMilForm(!showMilForm)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              {showMilForm && (
                <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <input
                    value={milForm.title}
                    onChange={(e) => setMilForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Milestone title…"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={milForm.description}
                      onChange={(e) => setMilForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Description (optional)"
                      className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                    <input
                      type="date"
                      value={milForm.due_date}
                      onChange={(e) => setMilForm((f) => ({ ...f, due_date: e.target.value }))}
                      className="px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addMilestone}
                      disabled={milAdding}
                      className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
                    >
                      {milAdding ? 'Adding…' : 'Add Milestone'}
                    </button>
                    <button
                      onClick={() => setShowMilForm(false)}
                      className="text-xs text-slate-500 px-3 py-1.5 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {project.project_milestones.length === 0 && !showMilForm ? (
                <p className="text-sm text-slate-400">No milestones yet.</p>
              ) : (
                <div className="space-y-2">
                  {project.project_milestones
                    .sort((a, b) => (a.due_date ?? '').localeCompare(b.due_date ?? ''))
                    .map((mil) => (
                      <div
                        key={mil.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border transition ${mil.is_completed ? 'border-emerald-100 bg-emerald-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        <button
                          onClick={() => toggleMilestone(mil)}
                          className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition ${mil.is_completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-slate-500'}`}
                        >
                          {mil.is_completed && <Check className="h-3 w-3" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${mil.is_completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                            {mil.title}
                          </div>
                          {mil.description && <div className="text-xs text-slate-500 mt-0.5">{mil.description}</div>}
                          {mil.due_date && (
                            <div className="text-xs text-slate-400 mt-0.5">
                              Due {new Date(mil.due_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteMilestone(mil.id)}
                          className="p-1 rounded text-slate-300 hover:text-red-500 transition shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Activity Log */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">Activity Log</h2>

              {/* Add note */}
              <div className="flex gap-2 mb-4">
                <input
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addNote() } }}
                  placeholder="Add a note…"
                  className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />
                <button
                  onClick={addNote}
                  disabled={noteAdding || !noteContent.trim()}
                  className="bg-slate-900 text-white text-sm px-3 py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              {project.project_updates.length === 0 ? (
                <p className="text-sm text-slate-400">No activity yet.</p>
              ) : (
                <div className="space-y-3">
                  {project.project_updates.map((u) => (
                    <div key={u.id} className="flex gap-3">
                      <div className="mt-0.5 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold shrink-0">
                        {u.agency_members ? initials(u.agency_members.name) : 'SY'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-medium text-slate-700">
                            {u.agency_members?.name ?? 'System'}
                          </span>
                          <span className="text-xs text-slate-400">{timeAgo(u.created_at)}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-0.5">{u.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right column: status, team, references ── */}
          <div className="space-y-6">
            {/* Change Status */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <h2 className="text-sm font-semibold text-slate-900">Status</h2>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Optional: reason for change…"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 resize-none"
              />
              <button
                onClick={changeStatus}
                disabled={statusSaving || newStatus === project.status}
                className="w-full bg-slate-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition"
              >
                {statusSaving ? 'Updating…' : 'Update Status'}
              </button>
            </div>

            {/* Team */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-3">Team</h2>

              {project.project_assignments.length === 0 ? (
                <p className="text-xs text-slate-400 mb-3">No members assigned.</p>
              ) : (
                <div className="space-y-2 mb-3">
                  {project.project_assignments.map((a) => {
                    if (!a.agency_members) return null
                    const m = a.agency_members
                    return (
                      <div key={m.id} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-7 w-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: m.avatar_color }}
                          >
                            {initials(m.name)}
                          </div>
                          <div>
                            <div className="text-sm text-slate-800">{m.name}</div>
                            <div className="text-xs text-slate-400 capitalize">{a.role}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeMember(m.id)}
                          className="p-1 text-slate-300 hover:text-red-500 transition"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}

              {unassignedMembers.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-medium">Assign member</div>
                  <select
                    value={assignMemberId}
                    onChange={(e) => setAssignMemberId(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="">Select member…</option>
                    {unassignedMembers.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  <select
                    value={assignRole}
                    onChange={(e) => setAssignRole(e.target.value)}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="lead">Lead</option>
                    <option value="contributor">Contributor</option>
                    <option value="reviewer">Reviewer</option>
                  </select>
                  <button
                    onClick={assignMember}
                    disabled={assigning || !assignMemberId}
                    className="w-full bg-slate-900 text-white text-sm font-medium py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition"
                  >
                    {assigning ? 'Assigning…' : 'Assign'}
                  </button>
                </div>
              )}
            </div>

            {/* References */}
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-900">References</h2>
                <button
                  onClick={() => setShowRefForm(!showRefForm)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>

              {showRefForm && (
                <div className="mb-3 p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                  <select
                    value={refForm.type}
                    onChange={(e) => setRefForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  >
                    <option value="drive">Google Drive</option>
                    <option value="figma">Figma</option>
                    <option value="github">GitHub</option>
                    <option value="url">URL / Other</option>
                  </select>
                  <input
                    value={refForm.title}
                    onChange={(e) => setRefForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="Label (e.g. Design Files)"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <input
                    value={refForm.url}
                    onChange={(e) => setRefForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="https://…"
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addRef}
                      disabled={refAdding}
                      className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-60 transition"
                    >
                      {refAdding ? 'Adding…' : 'Add'}
                    </button>
                    <button
                      onClick={() => setShowRefForm(false)}
                      className="text-xs text-slate-500 px-3 py-1.5 hover:text-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {project.project_references.length === 0 && !showRefForm ? (
                <p className="text-xs text-slate-400">No references yet.</p>
              ) : (
                <div className="space-y-2">
                  {project.project_references.map((ref) => (
                    <div key={ref.id} className="flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:border-slate-200 group">
                      <span className="shrink-0">{REF_ICONS[ref.type]}</span>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-0 text-sm text-slate-700 hover:text-slate-900 truncate"
                      >
                        {ref.title}
                      </a>
                      <button
                        onClick={() => deleteRef(ref.id)}
                        className="p-1 text-slate-200 hover:text-red-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
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
