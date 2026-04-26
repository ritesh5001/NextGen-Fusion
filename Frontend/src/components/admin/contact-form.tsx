'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export type ContactFormValue = {
  id?: string
  email: string
  name: string
  company: string
  phone: string
  website: string
  industry: string
  notes: string
  unsubscribed: boolean
}

export function ContactForm({ initial }: { initial?: Partial<ContactFormValue> }) {
  const router = useRouter()
  const [value, setValue] = useState<ContactFormValue>({
    email: initial?.email || '',
    name: initial?.name || '',
    company: initial?.company || '',
    phone: initial?.phone || '',
    website: initial?.website || '',
    industry: initial?.industry || '',
    notes: initial?.notes || '',
    unsubscribed: !!initial?.unsubscribed,
    id: initial?.id,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof ContactFormValue>(k: K, v: ContactFormValue[K]) {
    setValue((p) => ({ ...p, [k]: v }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const url = value.id ? `/api/admin/contacts/${value.id}` : '/api/admin/contacts'
      const method = value.id ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Save failed')
      router.push('/admin/contacts')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-slate-200 rounded-xl p-6 max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      <Field label="Email" required>
        <input
          type="email"
          required
          value={value.email}
          onChange={(e) => update('email', e.target.value)}
          className={inputClass}
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name">
          <input value={value.name} onChange={(e) => update('name', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Company">
          <input value={value.company} onChange={(e) => update('company', e.target.value)} className={inputClass} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Phone">
          <input value={value.phone} onChange={(e) => update('phone', e.target.value)} className={inputClass} />
        </Field>
        <Field label="Website">
          <input value={value.website} onChange={(e) => update('website', e.target.value)} className={inputClass} />
        </Field>
      </div>
      <Field label="Industry">
        <input value={value.industry} onChange={(e) => update('industry', e.target.value)} className={inputClass} />
      </Field>
      <Field label="Notes">
        <textarea
          rows={4}
          value={value.notes}
          onChange={(e) => update('notes', e.target.value)}
          className={inputClass}
        />
      </Field>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={value.unsubscribed}
          onChange={(e) => update('unsubscribed', e.target.checked)}
          className="h-4 w-4 rounded border-slate-300"
        />
        Unsubscribed (won't receive any campaign emails)
      </label>
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : value.id ? 'Save changes' : 'Create contact'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400'

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  )
}
