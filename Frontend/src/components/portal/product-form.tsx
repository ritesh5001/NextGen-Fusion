'use client'

import { useState } from 'react'
import { Plus, Trash2, RefreshCw } from 'lucide-react'
import type { Product, ProductOption, ProductVariant } from '@/lib/product-csv'

type OptionDraft = { name: string; valuesText: string }

type FormState = {
  title: string
  description: string
  vendor: string
  product_type: string
  category: string
  tags: string
  published: boolean
  imagesText: string
  options: OptionDraft[]
  variants: ProductVariant[]
}

function toDraft(product?: Product): FormState {
  if (!product) {
    return {
      title: '',
      description: '',
      vendor: '',
      product_type: '',
      category: '',
      tags: '',
      published: true,
      imagesText: '',
      options: [],
      variants: [],
    }
  }
  return {
    title: product.title,
    description: product.description ?? '',
    vendor: product.vendor ?? '',
    product_type: product.product_type ?? '',
    category: product.category ?? '',
    tags: product.tags ?? '',
    published: product.published,
    imagesText: (product.images ?? []).join('\n'),
    options: (product.options ?? []).map((o) => ({ name: o.name, valuesText: o.values.join(', ') })),
    variants: product.variants ?? [],
  }
}

function parseValues(text: string): string[] {
  return text
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean)
}

function buildCombos(options: OptionDraft[]): Record<string, string>[] {
  const valid = options
    .map((o) => ({ name: o.name.trim(), values: parseValues(o.valuesText) }))
    .filter((o) => o.name && o.values.length)
    .slice(0, 3)
  if (!valid.length) return []
  let combos: Record<string, string>[] = [{}]
  for (const opt of valid) {
    const next: Record<string, string>[] = []
    for (const combo of combos) {
      for (const val of opt.values) next.push({ ...combo, [opt.name]: val })
    }
    combos = next
  }
  return combos
}

const inputCls =
  'w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400'

export function ProductForm({
  initial,
  onSaved,
  onCancel,
}: {
  initial?: Product
  onSaved: () => void
  onCancel: () => void
}) {
  const [state, setState] = useState<FormState>(() => toDraft(initial))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function addOption() {
    if (state.options.length >= 3) return
    set('options', [...state.options, { name: '', valuesText: '' }])
  }

  function updateOption(index: number, patch: Partial<OptionDraft>) {
    set(
      'options',
      state.options.map((o, i) => (i === index ? { ...o, ...patch } : o)),
    )
  }

  function removeOption(index: number) {
    set('options', state.options.filter((_, i) => i !== index))
  }

  function regenerateVariants() {
    const combos = buildCombos(state.options)
    if (!combos.length) {
      set('variants', [])
      return
    }
    const keyOf = (ov: Record<string, string>) => JSON.stringify(ov)
    const existing = new Map(state.variants.map((v) => [keyOf(v.option_values), v]))
    const next: ProductVariant[] = combos.map((ov) => {
      const prev = existing.get(keyOf(ov))
      return prev ? { ...prev, option_values: ov } : { option_values: ov }
    })
    set('variants', next)
  }

  function updateVariant(index: number, patch: Partial<ProductVariant>) {
    set(
      'variants',
      state.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!state.title.trim()) {
      setError('Product title is required')
      return
    }
    setSaving(true)
    setError('')

    const options: ProductOption[] = state.options
      .map((o) => ({ name: o.name.trim(), values: parseValues(o.valuesText) }))
      .filter((o) => o.name && o.values.length)
      .slice(0, 3)

    const images = state.imagesText
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      title: state.title.trim(),
      description: state.description,
      vendor: state.vendor,
      product_type: state.product_type,
      category: state.category,
      tags: state.tags,
      published: state.published,
      options,
      variants: state.variants,
      images,
    }

    try {
      const url = initial ? `/api/client/products/${initial.id}` : '/api/client/products'
      const method = initial ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Save failed')
      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const optionNames = state.options.map((o) => o.name.trim()).filter(Boolean).slice(0, 3)

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{initial ? 'Edit product' : 'New product'}</h2>
        <button type="button" onClick={onCancel} className="text-sm text-slate-500 hover:text-slate-900">
          Cancel
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
          <input className={inputCls} value={state.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            className={inputCls + ' min-h-24'}
            value={state.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Vendor / Brand</label>
          <input className={inputCls} value={state.vendor} onChange={(e) => set('vendor', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product type</label>
          <input
            className={inputCls}
            value={state.product_type}
            onChange={(e) => set('product_type', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <input className={inputCls} value={state.category} onChange={(e) => set('category', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Tags (comma separated)</label>
          <input className={inputCls} value={state.tags} onChange={(e) => set('tags', e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Gallery image URLs (one per line)
          </label>
          <textarea
            className={inputCls + ' min-h-20'}
            value={state.imagesText}
            onChange={(e) => set('imagesText', e.target.value)}
            placeholder="https://…/image-1.jpg"
          />
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={state.published}
            onChange={(e) => set('published', e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="published" className="text-sm text-slate-700">
            Published / visible
          </label>
        </div>
      </div>

      {/* Options */}
      <div className="border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Variant options</h3>
            <p className="text-xs text-slate-500">e.g. Size: S, M, L &nbsp;·&nbsp; Color: Red, Blue (up to 3)</p>
          </div>
          <button
            type="button"
            onClick={addOption}
            disabled={state.options.length >= 3}
            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-50"
          >
            <Plus className="h-4 w-4" /> Add option
          </button>
        </div>

        <div className="space-y-2">
          {state.options.map((opt, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls + ' max-w-40'}
                placeholder="Option name"
                value={opt.name}
                onChange={(e) => updateOption(i, { name: e.target.value })}
              />
              <input
                className={inputCls}
                placeholder="Values (comma separated)"
                value={opt.valuesText}
                onChange={(e) => updateOption(i, { valuesText: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeOption(i)}
                className="p-2 text-slate-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {state.options.length > 0 && (
          <button
            type="button"
            onClick={regenerateVariants}
            className="mt-3 inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4" /> Generate variant rows
          </button>
        )}
      </div>

      {/* Variants */}
      <div className="border-t border-slate-200 pt-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          {state.variants.length > 0
            ? `Variants (${state.variants.length})`
            : 'Pricing (no variants — fill a single row)'}
        </h3>

        {state.variants.length === 0 && (
          <SingleVariantRow
            variant={state.variants[0]}
            onChange={(patch) => {
              const base = state.variants[0] ?? { option_values: {} }
              set('variants', [{ ...base, ...patch, option_values: base.option_values }])
            }}
          />
        )}

        {state.variants.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200">
                  {optionNames.map((n) => (
                    <th key={n} className="py-2 pr-3 font-medium">
                      {n}
                    </th>
                  ))}
                  <th className="py-2 pr-3 font-medium">SKU</th>
                  <th className="py-2 pr-3 font-medium">Price</th>
                  <th className="py-2 pr-3 font-medium">Sale price</th>
                  <th className="py-2 pr-3 font-medium">Stock</th>
                  <th className="py-2 pr-3 font-medium">Weight</th>
                  <th className="py-2 pr-3 font-medium">Image URL</th>
                </tr>
              </thead>
              <tbody>
                {state.variants.map((v, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {optionNames.map((n) => (
                      <td key={n} className="py-1.5 pr-3 whitespace-nowrap font-medium text-slate-700">
                        {v.option_values[n] ?? ''}
                      </td>
                    ))}
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-28'}
                        value={v.sku ?? ''}
                        onChange={(e) => updateVariant(i, { sku: e.target.value })}
                      />
                    </td>
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-20'}
                        value={v.price ?? ''}
                        onChange={(e) => updateVariant(i, { price: e.target.value })}
                      />
                    </td>
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-20'}
                        value={v.sale_price ?? ''}
                        onChange={(e) => updateVariant(i, { sale_price: e.target.value })}
                      />
                    </td>
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-16'}
                        value={v.stock ?? ''}
                        onChange={(e) => updateVariant(i, { stock: e.target.value })}
                      />
                    </td>
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-16'}
                        value={v.weight ?? ''}
                        onChange={(e) => updateVariant(i, { weight: e.target.value })}
                      />
                    </td>
                    <td className="py-1.5 pr-3">
                      <input
                        className={inputCls + ' min-w-40'}
                        value={v.image_url ?? ''}
                        onChange={(e) => updateVariant(i, { image_url: e.target.value })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-200 pt-5">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-50">
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? 'Saving…' : initial ? 'Save changes' : 'Save product'}
        </button>
      </div>
    </form>
  )
}

function SingleVariantRow({
  variant,
  onChange,
}: {
  variant?: ProductVariant
  onChange: (patch: Partial<ProductVariant>) => void
}) {
  const v = variant ?? { option_values: {} }
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Field label="SKU" value={v.sku} onChange={(val) => onChange({ sku: val })} />
      <Field label="Price" value={v.price} onChange={(val) => onChange({ price: val })} />
      <Field label="Sale price" value={v.sale_price} onChange={(val) => onChange({ sale_price: val })} />
      <Field label="Stock" value={v.stock} onChange={(val) => onChange({ stock: val })} />
      <Field label="Weight" value={v.weight} onChange={(val) => onChange({ weight: val })} />
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <input className={inputCls} value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
