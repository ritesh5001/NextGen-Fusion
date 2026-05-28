'use client'

import { useCallback, useEffect, useState } from 'react'
import { Plus, Download, Pencil, Trash2, Package } from 'lucide-react'
import { PortalShell, PageHeader } from '@/components/portal/portal-shell'
import { ProductForm } from '@/components/portal/product-form'
import { buildCsv, downloadCsv, type CsvPlatform, type Product } from '@/lib/product-csv'

function priceRange(product: Product): string {
  const prices = product.variants
    .map((v) => parseFloat((v.sale_price || v.price || '').trim()))
    .filter((n) => !Number.isNaN(n))
  if (!prices.length) return '—'
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  return min === max ? `${min}` : `${min} – ${max}`
}

export default function PortalProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [platform, setPlatform] = useState<CsvPlatform>('shopify')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/client/products')
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load products')
      setProducts(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleDelete(id: string) {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`/api/client/products/${id}`, { method: 'DELETE' })
    if (res.ok) load()
  }

  function handleExport() {
    if (!products.length) return
    const csv = buildCsv(products, platform)
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(csv, `products-${platform}-${stamp}.csv`)
  }

  function openNew() {
    setEditing(null)
    setShowForm(true)
  }

  function openEdit(product: Product) {
    setEditing(product)
    setShowForm(true)
  }

  function onSaved() {
    setShowForm(false)
    setEditing(null)
    load()
  }

  return (
    <PortalShell>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          title="My Products"
          description="Add products, then export a WooCommerce or Shopify import CSV."
          action={
            !showForm && (
              <button
                onClick={openNew}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" /> Add product
              </button>
            )
          }
        />

        {showForm ? (
          <ProductForm
            initial={editing ?? undefined}
            onSaved={onSaved}
            onCancel={() => {
              setShowForm(false)
              setEditing(null)
            }}
          />
        ) : (
          <>
            {/* Export bar */}
            <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 mb-4">
              <span className="text-sm text-slate-600">Export catalog as</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as CsvPlatform)}
                className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                <option value="shopify">Shopify</option>
                <option value="woocommerce">WooCommerce (WordPress)</option>
              </select>
              <button
                onClick={handleExport}
                disabled={!products.length}
                className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
              >
                <Download className="h-4 w-4" /> Download CSV
              </button>
              <span className="text-xs text-slate-400 ml-auto">
                {products.length} product{products.length === 1 ? '' : 's'}
              </span>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 mb-4">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-sm text-slate-500 py-12 text-center">Loading…</div>
            ) : products.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl py-16 text-center">
                <Package className="h-10 w-10 mx-auto text-slate-300" />
                <p className="text-sm text-slate-500 mt-3">No products yet.</p>
                <button
                  onClick={openNew}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4" /> Add your first product
                </button>
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Variants</th>
                      <th className="px-4 py-3 font-medium">Price</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{p.title}</td>
                        <td className="px-4 py-3 text-slate-600">{p.variants.length || '—'}</td>
                        <td className="px-4 py-3 text-slate-600">{priceRange(p)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={
                              'text-xs px-2 py-0.5 rounded-full ' +
                              (p.published ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-500')
                            }
                          >
                            {p.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(p)}
                              className="p-2 text-slate-400 hover:text-slate-900"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(p.id)}
                              className="p-2 text-slate-400 hover:text-red-600"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </PortalShell>
  )
}
