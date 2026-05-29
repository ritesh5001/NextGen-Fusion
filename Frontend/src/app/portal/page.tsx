'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PortalShell, PageHeader } from '@/components/portal/portal-shell'
import { FolderKanban, Package, CalendarClock, CheckCircle2, Circle, ArrowRight } from 'lucide-react'

type Milestone = {
  id: string
  title: string
  due_date: string | null
  is_completed: boolean
  completed_at: string | null
}

type Update = {
  id: string
  content: string
  update_type: string
  created_at: string
}

type Project = {
  id: string
  title: string
  status: string
  priority: string
  project_type: string | null
  start_date: string | null
  deadline: string | null
  delivered_date: string | null
  description: string | null
  project_milestones: Milestone[]
  project_updates: Update[]
}

const STATUS_LABELS: Record<string, string> = {
  kickoff: 'Kickoff',
  in_progress: 'In progress',
  client_review: 'Client review',
  revisions: 'Revisions',
  delivered: 'Delivered',
  on_hold: 'On hold',
  cancelled: 'Cancelled',
}

const STATUS_STYLES: Record<string, string> = {
  kickoff: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-amber-50 text-amber-700',
  client_review: 'bg-purple-50 text-purple-700',
  revisions: 'bg-orange-50 text-orange-700',
  delivered: 'bg-green-50 text-green-700',
  on_hold: 'bg-slate-100 text-slate-500',
  cancelled: 'bg-red-50 text-red-700',
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PortalDashboard() {
  const [name, setName] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    Promise.all([
      fetch('/api/client/profile').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/client/projects').then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([profile, proj]) => {
        if (!active) return
        if (profile?.data?.name) setName(profile.data.name)
        setProjects(proj?.data || [])
      })
      .catch(() => {
        if (active) setError('Could not load your dashboard. Please try again.')
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <PortalShell>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <PageHeader
          title={name ? `Welcome back, ${name.split(' ')[0]} 👋` : 'Welcome 👋'}
          description="Track your projects with NextGen Fusion and build your product catalog."
          action={
            <Link
              href="/portal/products"
              className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            >
              <Package className="h-4 w-4" /> My Products
            </Link>
          }
        />

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
          <FolderKanban className="h-4 w-4" /> Your projects
        </h2>

        {loading ? (
          <div className="text-sm text-slate-500 py-12 text-center">Loading…</div>
        ) : projects.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">
            <FolderKanban className="h-10 w-10 mx-auto text-slate-300" />
            <p className="text-sm text-slate-500 mt-3">
              No projects yet. Your NextGen Fusion team will add them here once your project starts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </PortalShell>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const milestones = project.project_milestones ?? []
  const done = milestones.filter((m) => m.is_completed).length
  const pct = milestones.length ? Math.round((done / milestones.length) * 100) : 0
  const latestUpdates = (project.project_updates ?? []).slice(0, 3)

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{project.title}</h3>
          {project.project_type && <p className="text-xs text-slate-500 mt-0.5">{project.project_type}</p>}
        </div>
        <span
          className={
            'text-xs font-medium px-2.5 py-1 rounded-full ' +
            (STATUS_STYLES[project.status] ?? 'bg-slate-100 text-slate-600')
          }
        >
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
      </div>

      {project.description && (
        <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Meta icon={<CalendarClock className="h-4 w-4" />} label="Started" value={fmtDate(project.start_date)} />
        <Meta icon={<CalendarClock className="h-4 w-4" />} label="Deadline" value={fmtDate(project.deadline)} />
        {project.delivered_date && (
          <Meta icon={<CheckCircle2 className="h-4 w-4" />} label="Delivered" value={fmtDate(project.delivered_date)} />
        )}
      </div>

      {milestones.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>Milestones</span>
            <span>
              {done}/{milestones.length} done
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${pct}%` }} />
          </div>
          <ul className="mt-3 space-y-1.5">
            {milestones.map((m) => (
              <li key={m.id} className="flex items-center gap-2 text-sm">
                {m.is_completed ? (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                ) : (
                  <Circle className="h-4 w-4 shrink-0 text-slate-300" />
                )}
                <span className={m.is_completed ? 'text-slate-400 line-through' : 'text-slate-700'}>{m.title}</span>
                {m.due_date && <span className="ml-auto text-xs text-slate-400">{fmtDate(m.due_date)}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {latestUpdates.length > 0 && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-xs font-medium text-slate-500 mb-2">Latest updates</p>
          <ul className="space-y-2">
            {latestUpdates.map((u) => (
              <li key={u.id} className="flex items-start gap-2 text-sm text-slate-600">
                <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300" />
                <span>
                  {u.content}
                  <span className="ml-2 text-xs text-slate-400">{fmtDate(u.created_at)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-400">{icon}</span>
      <span>
        <span className="block text-xs text-slate-400">{label}</span>
        <span className="text-slate-700">{value}</span>
      </span>
    </div>
  )
}
