'use client'

import { useEffect, useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Plus, Trash2, Pencil, ExternalLink } from 'lucide-react'

type Product = {
  id: string
  slug: string
  title: string
  summary: string | null
  description: string | null
  category: string | null
  price_inr: number
  price_usd: number | null
  cover_image: string | null
  gallery: string[]
  features: string[]
  tech_stack: string[]
  demo_url: string | null
  r2_key: string | null
  file_size_bytes: number | null
  version: string | null
  is_active: boolean
  is_featured: boolean
  display_order: number
  created_at: string
}

type FormState = {
  title: string
  slug: string
  summary: string
  description: string
  category: string
  price_inr: string
  price_usd: string
  cover_image: string
  gallery: string
  features: string
  tech_stack: string
  demo_url: string
  version: string
  r2_key: string
  display_order: string
  is_active: boolean
  is_featured: boolean
}

const EMPTY: FormState = {
  title: '', slug: '', summary: '', description: '', category: '',
  price_inr: '', price_usd: '', cover_image: '', gallery: '', features: '',
  tech_stack: '', demo_url: '', version: '', r2_key: '', display_order: '0',
  is_active: true, is_featured: false,
}

const inputCls =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10'
const labelCls = 'block text-sm font-medium text-slate-700 mb-1'

function errorMessage(json: { error?: string; details?: string } | null, fallback: string): string {
  const base = json?.error || fallback
  return json?.details ? `${base}: ${json.details}` : base
}

function toLines(arr: string[] | null | undefined): string {
  return (arr || []).join('\n')
}
function fromLines(text: string): string[] {
  return text.split(/[\n,]/).map((v) => v.trim()).filter(Boolean)
}

export default function AdminStorePage() {
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/store-products')
      const json = await res.json()
      if (!res.ok) throw new Error(errorMessage(json, 'Failed to load products'))
      setItems(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function startCreate() {
    setEditingId(null)
    setForm(EMPTY)
    setFormError('')
    setShowForm(true)
  }

  function startEdit(p: Product) {
    setEditingId(p.id)
    setForm({
      title: p.title, slug: p.slug, summary: p.summary || '', description: p.description || '',
      category: p.category || '', price_inr: String(p.price_inr ?? ''),
      price_usd: p.price_usd == null ? '' : String(p.price_usd),
      cover_image: p.cover_image || '', gallery: toLines(p.gallery), features: toLines(p.features),
      tech_stack: (p.tech_stack || []).join(', '), demo_url: p.demo_url || '',
      version: p.version || '', r2_key: p.r2_key || '', display_order: String(p.display_order ?? 0),
      is_active: p.is_active, is_featured: p.is_featured,
    })
    setFormError('')
    setShowForm(true)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    try {
      const payload = {
        title: form.title,
        slug: form.slug || undefined,
        summary: form.summary,
        description: form.description,
        category: form.category,
        price_inr: form.price_inr === '' ? 0 : Number(form.price_inr),
        price_usd: form.price_usd === '' ? null : Number(form.price_usd),
        cover_image: form.cover_image,
        gallery: fromLines(form.gallery),
        features: fromLines(form.features),
        tech_stack: fromLines(form.tech_stack),
        demo_url: form.demo_url,
        version: form.version,
        r2_key: form.r2_key,
        display_order: form.display_order === '' ? 0 : Number(form.display_order),
        is_active: form.is_active,
        is_featured: form.is_featured,
      }
      const url = editingId ? `/api/admin/store-products/${editingId}` : '/api/admin/store-products'
      const res = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(errorMessage(json, 'Failed to save product'))
      setShowForm(false)
      setEditingId(null)
      setForm(EMPTY)
      load()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  async function remove(p: Product) {
    if (!confirm(`Hide "${p.title}" from the store? (Purchase history is kept.)`)) return
    const res = await fetch(`/api/admin/store-products/${p.id}`, { method: 'DELETE' })
    if (res.ok) load()
    else alert('Failed to delete product')
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-5xl">
        <PageHeader
          title="Store"
          description="Digital products (CRM/ERP, templates) sold at /store. Set the price and details here; upload the downloadable file to R2 and paste its key (delivery wiring comes next)."
          action={
            <button
              onClick={startCreate}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 text-white px-3 py-2 text-sm font-medium hover:bg-slate-800 transition"
            >
              <Plus className="h-4 w-4" /> New product
            </button>
          }
        />

        {showForm && (
          <form onSubmit={save} className="mb-6 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            {formError && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title *</label>
                <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Slug (auto from title if blank)</label>
                <input className={inputCls} value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="my-crm-system" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Summary (one line for cards)</label>
              <input className={inputCls} value={form.summary} onChange={(e) => set('summary', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea className={inputCls} rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Price (₹ INR) *</label>
                <input type="number" min={0} className={inputCls} value={form.price_inr} onChange={(e) => set('price_inr', e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Price ($ USD, optional)</label>
                <input type="number" min={0} step="0.01" className={inputCls} value={form.price_usd} onChange={(e) => set('price_usd', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <input className={inputCls} value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="CRM, ERP, Template…" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Cover image URL</label>
                <input className={inputCls} value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} placeholder="https://…" />
              </div>
              <div>
                <label className={labelCls}>Live demo URL</label>
                <input className={inputCls} value={form.demo_url} onChange={(e) => set('demo_url', e.target.value)} placeholder="https://…" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Gallery image URLs (one per line)</label>
                <textarea className={inputCls} rows={3} value={form.gallery} onChange={(e) => set('gallery', e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Features (one per line)</label>
                <textarea className={inputCls} rows={3} value={form.features} onChange={(e) => set('features', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Tech stack (comma separated)</label>
                <input className={inputCls} value={form.tech_stack} onChange={(e) => set('tech_stack', e.target.value)} placeholder="Next.js, PostgreSQL, Express" />
              </div>
              <div>
                <label className={labelCls}>Version</label>
                <input className={inputCls} value={form.version} onChange={(e) => set('version', e.target.value)} placeholder="1.0.0" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>R2 file key (set after upload — Phase 3)</label>
                <input className={inputCls} value={form.r2_key} onChange={(e) => set('r2_key', e.target.value)} placeholder="products/my-crm-1.0.0.zip" />
              </div>
              <div>
                <label className={labelCls}>Display order</label>
                <input type="number" className={inputCls} value={form.display_order} onChange={(e) => set('display_order', e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
                Active (visible in store)
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} />
                Featured
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null) }} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60">
                {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create product'}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2 font-medium">Title</th>
                  <th className="px-4 py-2 font-medium">Category</th>
                  <th className="px-4 py-2 font-medium">Price (₹)</th>
                  <th className="px-4 py-2 font-medium">File</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.length === 0 && !loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                      No products yet. Create one to list it at /store.
                    </td>
                  </tr>
                )}
                {items.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900">
                      {p.title}
                      <span className="ml-2 text-xs text-slate-400">/{p.slug}</span>
                    </td>
                    <td className="px-4 py-2 text-slate-700">{p.category || '—'}</td>
                    <td className="px-4 py-2 text-slate-700">₹{p.price_inr?.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-2">
                      <span className={'text-xs px-2 py-0.5 rounded-full ' + (p.r2_key ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700')}>
                        {p.r2_key ? 'Uploaded' : 'No file'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className={'text-xs px-2 py-0.5 rounded-full ' + (p.is_active ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500')}>
                        {p.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-end gap-1">
                        <a href={`/store/${p.slug}`} target="_blank" rel="noreferrer" className="p-1.5 rounded hover:bg-slate-200 text-slate-600" title="View in store">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <button onClick={() => startEdit(p)} className="p-1.5 rounded hover:bg-slate-200 text-slate-600" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => remove(p)} className="p-1.5 rounded hover:bg-red-100 text-red-600" title="Hide from store">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  )
}
