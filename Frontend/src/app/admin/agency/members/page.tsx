'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AgencyShell, PageHeader } from '@/components/admin/agency-shell'
import { Plus, UserX, Users } from 'lucide-react'

const AVATAR_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
]

const AGENCY_PARTNERS = [
  { name: 'Ritesh Giri', role: 'Full Stack Developer', color: '#3B82F6' },
  { name: 'Nitesh', role: 'Project Manager', color: '#10B981' },
  { name: 'Nikhilesh', role: 'Shopify Website Developer', color: '#8B5CF6' },
  { name: 'Vinay', role: 'Graphics & UI/UX Designer', color: '#EC4899' },
  { name: 'Rahul', role: 'Sales Manager', color: '#F59E0B' },
  { name: 'Ajay', role: 'Advertising / Marketing Strategist', color: '#EF4444' },
]

interface Member {
  id: string
  name: string
  email: string
  role: string
  avatar_color: string
  is_active: boolean
  created_at: string
}

function initials(name: string): string {
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/agency/members')
      .then((r) => r.json())
      .then((json) => {
        if (json.error) setError(json.error)
        else setMembers(json.data ?? [])
      })
      .catch(() => setError('Failed to load team members'))
      .finally(() => setLoading(false))
  }, [])

  const active = members.filter((m) => m.is_active)
  const inactive = members.filter((m) => !m.is_active)

  return (
    <AgencyShell>
      <div className="p-6">
        <PageHeader
          title="Team Members"
          description={`${active.length} active partner${active.length !== 1 ? 's' : ''}`}
          action={
            <Link
              href="/admin/agency/members/new"
              className="flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              <Plus className="h-4 w-4" />
              Add Member
            </Link>
          }
        />

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-slate-400 py-12 text-center">Loading…</div>
        ) : (
          <>
            {active.length === 0 && !loading && (
              <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Users className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-blue-900">Set up your agency team</h3>
                    <p className="text-sm text-blue-700 mt-0.5">
                      Add your 6 partners below so they can log in and be assigned to projects.
                      Each person needs a name, work email, and initial password.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {AGENCY_PARTNERS.map((p) => (
                    <div key={p.name} className="flex items-center gap-3 bg-white rounded-lg border border-blue-100 p-3">
                      <div
                        className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-slate-800">{p.name}</div>
                        <div className="text-xs text-slate-500 truncate">{p.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/admin/agency/members/new"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus className="h-4 w-4" />
                  Add First Member
                </Link>
              </div>
            )}

            {active.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {active.map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            )}

            {inactive.length > 0 && (
              <>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Inactive</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inactive.map((m) => (
                    <MemberCard key={m.id} member={m} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </AgencyShell>
  )
}

function MemberCard({ member }: { member: Member }) {
  const color = AVATAR_COLORS.includes(member.avatar_color) ? member.avatar_color : '#3B82F6'
  return (
    <Link
      href={`/admin/agency/members/${member.id}`}
      className={`block rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition ${!member.is_active ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{ backgroundColor: color }}
        >
          {initials(member.name)}
        </div>
        <div className="min-w-0">
          <div className="font-medium text-slate-900 truncate">{member.name}</div>
          <div className="text-xs text-slate-500 truncate">{member.email}</div>
          <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            member.role === 'admin_partner'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-blue-50 text-blue-700'
          }`}>
            {member.role === 'admin_partner' ? 'Admin Partner' : 'Partner'}
          </span>
        </div>
      </div>
    </Link>
  )
}
