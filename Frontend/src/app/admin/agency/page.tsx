'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'
import { FolderKanban, Clock, AlertTriangle, CheckCircle2, Plus } from 'lucide-react'

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

const ACTIVE_STATUSES = new Set(['kickoff', 'in_progress', 'client_review', 'revisions'])

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

interface Member { id: string; name: string; avatar_color: string }
interface Assignment { agency_members: Member | null }
interface Project {
  id: string; title: string; client_name: string; status: string
  priority: string; deadline: string | null; created_at: string
  project_assignments: Assignment[]
}

export default function AgencyDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/agency/projects').then((r) => r.json()),
      fetch('/api/agency/members').then((r) => r.json()),
    ]).then(([pJson, mJson]) => {
      setProjects(pJson.data ?? [])
      setMembers((mJson.data ?? []).filter((m: Member & { is_active: boolean }) => m.is_active))
    }).finally(() => setLoading(false))
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const total = projects.length
  const active = projects.filter((p) => ACTIVE_STATUSES.has(p.status)).length
  const overdue = projects.filter(
    (p) => p.deadline && new Date(p.deadline) < today && !['delivered', 'cancelled'].includes(p.status)
  ).length
  const thisMonth = projects.filter((p) => {
    if (p.status !== 'delivered') return false
    const d = new Date(p.created_at)
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  }).length

  // Member workload
  const memberWorkload = members.map((m) => ({
    member: m,
    count: projects.filter(
      (p) => ACTIVE_STATUSES.has(p.status) && p.project_assignments.some((a) => a.agency_members?.id === m.id)
    ).length,
  })).sort((a, b) => b.count - a.count)

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 10)

  const stats = [
    { label: 'Total Projects', value: total, icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-50', href: '/admin/agency/projects' },
    { label: 'Active', value: active, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-50', href: '/admin/agency/projects?status=in_progress' },
    { label: 'Overdue', value: overdue, icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50', href: '/admin/agency/projects' },
    { label: 'Delivered This Month', value: thisMonth, icon: CheckCircle2, color: 'text-slate-400', bg: 'bg-slate-50', href: '/admin/agency/projects?status=delivered' },
  ]

  return (
    <AgencyShell>
      <div className="p-6">
        <PageHeader
          title="Agency Dashboard"
          description="Overview of all projects and team workload"
          action={
            <Link
              href="/admin/agency/projects/new"
              className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Link>
          }
        />

        {loading ? (
          <div className="text-sm text-slate-400 py-16 text-center">Loading…</div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`h-8 w-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${s.color}`} />
                      </div>
                      <span className="text-xs text-slate-500">{s.label}</span>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{s.value}</div>
                  </Link>
                )
              })}
            </div>

            {/* Member Workload */}
            {memberWorkload.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-semibold text-slate-700 mb-3">Team Workload</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {memberWorkload.map(({ member, count }) => (
                    <Link
                      key={member.id}
                      href={`/admin/agency/members/${member.id}`}
                      className="rounded-xl border border-slate-200 bg-white p-4 text-center hover:border-slate-300 transition"
                    >
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2"
                        style={{ backgroundColor: member.avatar_color }}
                      >
                        {initials(member.name)}
                      </div>
                      <div className="text-xs font-medium text-slate-800 truncate">{member.name.split(' ')[0]}</div>
                      <div className="text-lg font-bold text-slate-900 mt-1">{count}</div>
                      <div className="text-xs text-slate-400">active</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recent projects */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-slate-700">Recent Projects</h2>
                <Link href="/admin/agency/projects" className="text-xs text-slate-500 hover:text-slate-700">
                  View all →
                </Link>
              </div>
              <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3 text-left font-medium">Project</th>
                      <th className="px-4 py-3 text-left font-medium">Client</th>
                      <th className="px-4 py-3 text-left font-medium">Status</th>
                      <th className="px-4 py-3 text-left font-medium">Deadline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentProjects.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-10 text-center text-sm text-slate-400">
                          No projects yet.{' '}
                          <Link href="/admin/agency/projects/new" className="underline">Create the first one</Link>
                        </td>
                      </tr>
                    ) : (
                      recentProjects.map((p) => {
                        const overdue = p.deadline && new Date(p.deadline) < today && !['delivered', 'cancelled'].includes(p.status)
                        return (
                          <tr key={p.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <Link href={`/admin/agency/projects/${p.id}`} className="font-medium text-slate-900 hover:underline">
                                {p.title}
                              </Link>
                            </td>
                            <td className="px-4 py-3 text-slate-600">{p.client_name}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                                {STATUS_LABELS[p.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {p.deadline ? (
                                <span className={`text-sm ${overdue ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                                  {overdue ? '⚠ ' : ''}
                                  {new Date(p.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                </span>
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AgencyShell>
  )
}
