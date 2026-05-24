'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'
import { Plus, FolderKanban, List, ExternalLink } from 'lucide-react'

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

const PRIORITY_COLORS: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-slate-100 text-slate-600',
}

const ACTIVE_STATUSES = ['kickoff', 'in_progress', 'client_review', 'revisions', 'delivered']
const ARCHIVED_STATUSES = ['on_hold', 'cancelled']

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function isOverdue(deadline: string | null, status: string): boolean {
  if (!deadline || status === 'delivered' || status === 'cancelled') return false
  return new Date(deadline) < new Date()
}

interface Member {
  id: string
  name: string
  avatar_color: string
}

interface Assignment {
  role: string
  agency_members: Member | null
}

interface Project {
  id: string
  title: string
  client_name: string
  client_company: string | null
  status: string
  priority: string
  project_type: string | null
  deadline: string | null
  budget: number | null
  currency: string
  created_at: string
  project_assignments: Assignment[]
}

function AvatarStack({ assignments }: { assignments: Assignment[] }) {
  const members = assignments
    .map((a) => a.agency_members)
    .filter((m): m is Member => m !== null)
    .slice(0, 3)

  return (
    <div className="flex -space-x-1.5">
      {members.map((m) => (
        <div
          key={m.id}
          title={m.name}
          className="h-6 w-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
          style={{ backgroundColor: m.avatar_color }}
        >
          {initials(m.name)}
        </div>
      ))}
      {assignments.length > 3 && (
        <div className="h-6 w-6 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-bold">
          +{assignments.length - 3}
        </div>
      )}
    </div>
  )
}

function KanbanCard({ project }: { project: Project }) {
  const overdue = isOverdue(project.deadline, project.status)
  return (
    <Link
      href={`/admin/agency/projects/${project.id}`}
      className="block rounded-xl border border-slate-200 bg-white p-3 hover:border-slate-300 hover:shadow-sm transition cursor-pointer"
    >
      <div className="flex items-start justify-between gap-1 mb-1.5">
        <span className="text-sm font-medium text-slate-900 leading-tight">{project.title}</span>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${PRIORITY_COLORS[project.priority]}`}>
          {project.priority}
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-2 truncate">{project.client_name}{project.client_company ? ` · ${project.client_company}` : ''}</p>
      <div className="flex items-center justify-between">
        {project.deadline ? (
          <span className={`text-xs ${overdue ? 'text-red-600 font-medium' : 'text-slate-400'}`}>
            {overdue ? '⚠ ' : ''}
            {new Date(project.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        ) : (
          <span className="text-xs text-slate-300">No deadline</span>
        )}
        <AvatarStack assignments={project.project_assignments} />
      </div>
    </Link>
  )
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'kanban' | 'table'>('kanban')
  const [showArchived, setShowArchived] = useState(false)
  const [filters, setFilters] = useState({ status: '', member_id: '', priority: '', q: '' })

  useEffect(() => {
    Promise.all([
      fetch('/api/agency/projects').then((r) => r.json()),
      fetch('/api/agency/members').then((r) => r.json()),
    ]).then(([pJson, mJson]) => {
      setProjects(pJson.data ?? [])
      setMembers(mJson.data ?? [])
    }).finally(() => setLoading(false))
  }, [])

  function setFilter(field: string, value: string) {
    setFilters((f) => ({ ...f, [field]: value }))
  }

  const filtered = projects.filter((p) => {
    if (filters.status && p.status !== filters.status) return false
    if (filters.priority && p.priority !== filters.priority) return false
    if (filters.member_id) {
      const hasM = p.project_assignments.some((a) => a.agency_members?.id === filters.member_id)
      if (!hasM) return false
    }
    if (filters.q) {
      const q = filters.q.toLowerCase()
      if (!p.title.toLowerCase().includes(q) && !p.client_name.toLowerCase().includes(q)) return false
    }
    return true
  })

  const activeProjects = filtered.filter((p) => ACTIVE_STATUSES.includes(p.status))
  const archivedProjects = filtered.filter((p) => ARCHIVED_STATUSES.includes(p.status))

  return (
    <AgencyShell>
      <div className="p-6">
        <PageHeader
          title="Projects"
          description={`${projects.length} total`}
          action={
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setView('kanban')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition ${view === 'kanban' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <FolderKanban className="h-3.5 w-3.5" />
                  Kanban
                </button>
                <button
                  onClick={() => setView('table')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm transition ${view === 'table' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <List className="h-3.5 w-3.5" />
                  Table
                </button>
              </div>
              <Link
                href="/admin/agency/projects/new"
                className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800 transition"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Link>
            </div>
          }
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          <input
            value={filters.q}
            onChange={(e) => setFilter('q', e.target.value)}
            placeholder="Search projects…"
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 w-52"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="">All statuses</option>
            {Object.entries(STATUS_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilter('priority', e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="">All priorities</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filters.member_id}
            onChange={(e) => setFilter('member_id', e.target.value)}
            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          >
            <option value="">All members</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-sm text-slate-400 py-16 text-center">Loading…</div>
        ) : view === 'kanban' ? (
          <KanbanView
            activeProjects={activeProjects}
            archivedProjects={archivedProjects}
            showArchived={showArchived}
            setShowArchived={setShowArchived}
          />
        ) : (
          <TableView projects={filtered} />
        )}
      </div>
    </AgencyShell>
  )
}

function KanbanView({
  activeProjects,
  archivedProjects,
  showArchived,
  setShowArchived,
}: {
  activeProjects: Project[]
  archivedProjects: Project[]
  showArchived: boolean
  setShowArchived: (v: boolean) => void
}) {
  return (
    <>
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {ACTIVE_STATUSES.map((status) => {
            const cols = activeProjects.filter((p) => p.status === status)
            return (
              <div key={status} className="w-64 shrink-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-slate-700">{STATUS_LABELS[status]}</span>
                  <span className="rounded-full bg-slate-100 text-slate-500 text-xs px-2 py-0.5">{cols.length}</span>
                </div>
                <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-0.5">
                  {cols.map((p) => <KanbanCard key={p.id} project={p} />)}
                  {cols.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400">
                      No projects
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Archived toggle */}
      <div className="mt-6">
        <button
          onClick={() => setShowArchived(!showArchived)}
          className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1.5 transition"
        >
          <span>{showArchived ? '▾' : '▸'}</span>
          {showArchived ? 'Hide' : 'Show'} archived ({archivedProjects.length})
        </button>
        {showArchived && archivedProjects.length > 0 && (
          <div className="overflow-x-auto mt-3 pb-2">
            <div className="flex gap-4 min-w-max">
              {ARCHIVED_STATUSES.map((status) => {
                const cols = archivedProjects.filter((p) => p.status === status)
                if (cols.length === 0) return null
                return (
                  <div key={status} className="w-64 shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-slate-400">{STATUS_LABELS[status]}</span>
                      <span className="rounded-full bg-slate-100 text-slate-400 text-xs px-2 py-0.5">{cols.length}</span>
                    </div>
                    <div className="space-y-2">
                      {cols.map((p) => (
                        <Link
                          key={p.id}
                          href={`/admin/agency/projects/${p.id}`}
                          className="block rounded-xl border border-slate-200 bg-white p-3 opacity-60 hover:opacity-80 transition"
                        >
                          <div className="text-sm font-medium text-slate-700">{p.title}</div>
                          <div className="text-xs text-slate-400">{p.client_name}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function TableView({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
            <th className="px-4 py-3 text-left font-medium">Project</th>
            <th className="px-4 py-3 text-left font-medium">Client</th>
            <th className="px-4 py-3 text-left font-medium">Status</th>
            <th className="px-4 py-3 text-left font-medium">Priority</th>
            <th className="px-4 py-3 text-left font-medium">Deadline</th>
            <th className="px-4 py-3 text-left font-medium">Team</th>
            <th className="px-4 py-3 text-left font-medium w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                No projects found.{' '}
                <Link href="/admin/agency/projects/new" className="underline">Create one</Link>
              </td>
            </tr>
          ) : (
            projects.map((p) => {
              const overdue = isOverdue(p.deadline, p.status)
              return (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{p.title}</div>
                    {p.project_type && <div className="text-xs text-slate-400">{p.project_type}</div>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <div>{p.client_name}</div>
                    {p.client_company && <div className="text-xs text-slate-400">{p.client_company}</div>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                      {STATUS_LABELS[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${PRIORITY_COLORS[p.priority]}`}>
                      {p.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.deadline ? (
                      <span className={`text-sm ${overdue ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                        {overdue ? '⚠ ' : ''}
                        {new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-slate-300 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <AvatarStack assignments={p.project_assignments} />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/agency/projects/${p.id}`}>
                      <ExternalLink className="h-4 w-4 text-slate-400 hover:text-slate-700" />
                    </Link>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
