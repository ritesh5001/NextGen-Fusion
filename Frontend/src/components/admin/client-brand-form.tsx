'use client'

import { useCallback, useEffect, useState } from 'react'
import { ImagePlus, Loader2, Save, Sparkles, X } from 'lucide-react'
import { BrandProfile, EMPTY_BRAND, hydrateBrand, mergeParsed } from '@/lib/brand-profile'
import { AiProviderSelect, type AiProvider } from './ai-provider-select'

const inputCls =
  'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none'
const labelCls = 'text-sm font-medium text-slate-700'

function Field(props: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  textarea?: boolean
}) {
  return (
    <label className="block">
      <span className={labelCls}>{props.label}</span>
      {props.textarea ? (
        <textarea value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder} rows={3} className={inputCls} />
      ) : (
        <input value={props.value} onChange={(e) => props.onChange(e.target.value)} placeholder={props.placeholder} className={inputCls} />
      )}
    </label>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
      <h3 className="font-medium text-slate-900">{title}</h3>
      {children}
    </div>
  )
}

export function ClientBrandForm({ clientId }: { clientId: string }) {
  const [value, setValue] = useState<BrandProfile>(EMPTY_BRAND)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [brief, setBrief] = useState('')
  const [provider, setProvider] = useState<AiProvider>('claude')
  const [parsing, setParsing] = useState(false)
  const [parsedNote, setParsedNote] = useState<string | null>(null)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingProducts, setUploadingProducts] = useState(false)

  const set = <K extends keyof BrandProfile>(k: K, v: BrandProfile[K]) => {
    setValue((p) => ({ ...p, [k]: v }))
    setSaved(false)
  }

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/brand`)
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load brand profile')
      setValue(hydrateBrand(json.data?.profile))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load brand profile')
    } finally {
      setLoading(false)
    }
  }, [clientId])

  useEffect(() => {
    load()
  }, [load])

  async function parseAndFill() {
    if (!brief.trim()) return
    setParsing(true)
    setError(null)
    setParsedNote(null)
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/brand/parse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: brief, provider }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Could not parse the text')
      setValue((prev) => mergeParsed(prev, json.data as Partial<BrandProfile>))
      setSaved(false)
      setParsedNote('Fields filled from your text — review and edit below, then save.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not parse the text')
    } finally {
      setParsing(false)
    }
  }

  async function uploadFiles(files: FileList): Promise<string[]> {
    const fd = new FormData()
    Array.from(files).forEach((f) => fd.append('files', f))
    const res = await fetch(`/api/admin/clients/${clientId}/brand/upload`, { method: 'POST', body: fd })
    const json = await res.json()
    if (!res.ok) throw new Error(json?.error || 'Upload failed')
    return (json.data as { url: string }[]).map((d) => d.url)
  }

  async function onLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !files.length) return
    setUploadingLogo(true)
    setError(null)
    try {
      const urls = await uploadFiles(files)
      if (urls[0]) set('logoUrl', urls[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadingLogo(false)
      e.target.value = ''
    }
  }

  async function onProductsUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !files.length) return
    setUploadingProducts(true)
    setError(null)
    try {
      const urls = await uploadFiles(files)
      set('productImageUrls', [...value.productImageUrls, ...urls])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploadingProducts(false)
      e.target.value = ''
    }
  }

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/clients/${clientId}/brand`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: value }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to save')
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading brand profile…
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="font-medium text-slate-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-slate-500" /> Quick fill — paste everything
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Paste all the brand info, social links, page content and policy details in one block —
            in any format. AI extracts the fields below. Then add a logo and product images and save.
          </p>
        </div>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder={'e.g. Business: Acme Co — handmade candles.\nWebsite acme.in, contact hi@acme.in, WhatsApp +91 98765 43210.\nInstagram @acme.\nAbout: small-batch soy candles.\nRefund within 7 days, payments via Razorpay & UPI.'}
          rows={7}
          className={inputCls}
        />
        {parsedNote && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{parsedNote}</div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={parseAndFill}
            disabled={parsing || !brief.trim()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
          >
            {parsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {parsing ? 'Parsing…' : 'Parse & fill fields'}
          </button>
          <AiProviderSelect value={provider} onChange={setProvider} disabled={parsing} />
        </div>
      </div>

      <Section title="Brand & website">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Business name" value={value.businessName} onChange={(v) => set('businessName', v)} placeholder="Acme Co" />
          <Field label="Website URL" value={value.websiteUrl} onChange={(v) => set('websiteUrl', v)} placeholder="acme.in" />
          <Field label="CSS prefix (optional)" value={value.cssPrefix} onChange={(v) => set('cssPrefix', v)} placeholder="auto from name" />
          <Field label="Plugin slug (optional)" value={value.pluginSlug} onChange={(v) => set('pluginSlug', v)} placeholder="auto from name" />
          <Field label="Tagline" value={value.tagline} onChange={(v) => set('tagline', v)} placeholder="Hand-poured soy candles" />
          <Field label="Contact email" value={value.contactEmail} onChange={(v) => set('contactEmail', v)} placeholder="hi@acme.in" />
          <Field label="WhatsApp (country code, no +)" value={value.whatsapp} onChange={(v) => set('whatsapp', v)} placeholder="919876543210" />
          <Field label="Country / governing law" value={value.country} onChange={(v) => set('country', v)} placeholder="India" />
          <Field label="Target audience" value={value.targetAudience} onChange={(v) => set('targetAudience', v)} placeholder="home decor shoppers" />
        </div>
        <Field label="What the business does" value={value.description} onChange={(v) => set('description', v)} textarea placeholder="2-4 sentences describing products/services" />

        <div>
          <span className={labelCls}>Logo</span>
          <div className="mt-1 flex items-center gap-3">
            {value.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.logoUrl} alt="logo" className="h-16 w-16 rounded-lg border border-slate-200 object-contain bg-white" />
            ) : null}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
              {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {value.logoUrl ? 'Replace logo' : 'Upload logo'}
              <input type="file" accept="image/*" className="hidden" onChange={onLogoUpload} disabled={uploadingLogo} />
            </label>
          </div>
          <input value={value.logoUrl} onChange={(e) => set('logoUrl', e.target.value)} placeholder="or paste an https logo URL" className={inputCls} />
        </div>
      </Section>

      <Section title="Product images (used by the Banner Generator)">
        <div className="flex flex-wrap gap-3">
          {value.productImageUrls.map((url) => (
            <div key={url} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
              <button
                type="button"
                onClick={() => set('productImageUrls', value.productImageUrls.filter((u) => u !== url))}
                className="absolute -right-2 -top-2 rounded-full bg-slate-900 p-0.5 text-white hover:bg-slate-700"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700">
            {uploadingProducts ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
            <span className="text-[11px]">Add</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={onProductsUpload} disabled={uploadingProducts} />
          </label>
        </div>
      </Section>

      <Section title="Social links (leave blank to skip)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Instagram" value={value.social.instagram} onChange={(v) => set('social', { ...value.social, instagram: v })} />
          <Field label="LinkedIn" value={value.social.linkedin} onChange={(v) => set('social', { ...value.social, linkedin: v })} />
          <Field label="X / Twitter" value={value.social.twitter} onChange={(v) => set('social', { ...value.social, twitter: v })} />
          <Field label="YouTube" value={value.social.youtube} onChange={(v) => set('social', { ...value.social, youtube: v })} />
          <Field label="Facebook" value={value.social.facebook} onChange={(v) => set('social', { ...value.social, facebook: v })} />
        </div>
      </Section>

      <Section title="Page content">
        <Field label="Home — key selling points" value={value.pageContent.home} onChange={(v) => set('pageContent', { ...value.pageContent, home: v })} textarea />
        <Field label="About — story & what makes you different" value={value.pageContent.about} onChange={(v) => set('pageContent', { ...value.pageContent, about: v })} textarea />
        <Field label="Services — each service with a description" value={value.pageContent.services} onChange={(v) => set('pageContent', { ...value.pageContent, services: v })} textarea />
        <Field label="Contact — extra info (hours, address)" value={value.pageContent.contact} onChange={(v) => set('pageContent', { ...value.pageContent, contact: v })} textarea />
      </Section>

      <Section title="Policy parameters">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Refund window (days)" value={value.policy.refundDays} onChange={(v) => set('policy', { ...value.policy, refundDays: v })} placeholder="7" />
          <Field label="Payment gateways" value={value.policy.paymentGateways} onChange={(v) => set('policy', { ...value.policy, paymentGateways: v })} placeholder="Razorpay, UPI" />
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={value.policy.physicalProducts} onChange={(e) => set('policy', { ...value.policy, physicalProducts: e.target.checked })} />
            Physical products involved
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={value.policy.recurringBilling} onChange={(e) => set('policy', { ...value.policy, recurringBilling: e.target.checked })} />
            Subscription / recurring billing
          </label>
        </div>
        <Field label="Special legal requirements (optional)" value={value.policy.specialLegal} onChange={(v) => set('policy', { ...value.policy, specialLegal: v })} placeholder="e.g. GDPR" />
        <Field label="Extra pages (optional)" value={value.extraPages} onChange={(v) => set('extraPages', v)} placeholder="Page name + content description" />
      </Section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? 'Saving…' : 'Save brand profile'}
        </button>
        {saved && <span className="text-sm text-emerald-600">Saved — this client can now prefill the WP Plugin and Banner generators.</span>}
      </div>
    </div>
  )
}
