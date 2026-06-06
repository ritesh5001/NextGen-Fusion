'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Boxes, Download, Loader2, Sparkles } from 'lucide-react'
import { ClientBrandPicker } from './client-brand-picker'
import type { BrandProfile } from '@/lib/brand-profile'

type Palette = {
  bg: string
  primary: string
  accent: string
  surface: string
  palette: string[]
}

type Generation = {
  id: string
  status: 'pending' | 'running' | 'done' | 'error'
  business_name: string | null
  plugin_slug: string | null
  palette: Palette | null
  error: string | null
  created_at: string
}

type FormValue = {
  businessName: string
  cssPrefix: string
  pluginSlug: string
  websiteUrl: string
  logoUrl: string
  tagline: string
  description: string
  contactEmail: string
  whatsapp: string
  country: string
  targetAudience: string
  social: { instagram: string; linkedin: string; twitter: string; youtube: string; facebook: string }
  pageContent: { home: string; about: string; services: string; contact: string }
  policy: {
    refundDays: string
    physicalProducts: boolean
    paymentGateways: string
    recurringBilling: boolean
    specialLegal: string
  }
  extraPages: string
}

const EMPTY: FormValue = {
  businessName: '',
  cssPrefix: '',
  pluginSlug: '',
  websiteUrl: '',
  logoUrl: '',
  tagline: '',
  description: '',
  contactEmail: '',
  whatsapp: '',
  country: '',
  targetAudience: '',
  social: { instagram: '', linkedin: '', twitter: '', youtube: '', facebook: '' },
  pageContent: { home: '', about: '', services: '', contact: '' },
  policy: { refundDays: '', physicalProducts: false, paymentGateways: '', recurringBilling: false, specialLegal: '' },
  extraPages: '',
}

// Overlay AI-parsed values onto the current form without wiping fields the user
// already filled: a parsed value only wins when it is non-empty.
function mergeBrief(current: FormValue, parsed: Partial<FormValue>): FormValue {
  const pickStr = (next: unknown, prev: string) =>
    typeof next === 'string' && next.trim() ? next : prev
  const p = parsed
  return {
    ...current,
    businessName: pickStr(p.businessName, current.businessName),
    cssPrefix: pickStr(p.cssPrefix, current.cssPrefix),
    pluginSlug: pickStr(p.pluginSlug, current.pluginSlug),
    websiteUrl: pickStr(p.websiteUrl, current.websiteUrl),
    logoUrl: pickStr(p.logoUrl, current.logoUrl),
    tagline: pickStr(p.tagline, current.tagline),
    description: pickStr(p.description, current.description),
    contactEmail: pickStr(p.contactEmail, current.contactEmail),
    whatsapp: pickStr(p.whatsapp, current.whatsapp),
    country: pickStr(p.country, current.country),
    targetAudience: pickStr(p.targetAudience, current.targetAudience),
    social: {
      instagram: pickStr(p.social?.instagram, current.social.instagram),
      linkedin: pickStr(p.social?.linkedin, current.social.linkedin),
      twitter: pickStr(p.social?.twitter, current.social.twitter),
      youtube: pickStr(p.social?.youtube, current.social.youtube),
      facebook: pickStr(p.social?.facebook, current.social.facebook),
    },
    pageContent: {
      home: pickStr(p.pageContent?.home, current.pageContent.home),
      about: pickStr(p.pageContent?.about, current.pageContent.about),
      services: pickStr(p.pageContent?.services, current.pageContent.services),
      contact: pickStr(p.pageContent?.contact, current.pageContent.contact),
    },
    policy: {
      refundDays: pickStr(p.policy?.refundDays, current.policy.refundDays),
      physicalProducts: p.policy?.physicalProducts ?? current.policy.physicalProducts,
      paymentGateways: pickStr(p.policy?.paymentGateways, current.policy.paymentGateways),
      recurringBilling: p.policy?.recurringBilling ?? current.policy.recurringBilling,
      specialLegal: pickStr(p.policy?.specialLegal, current.policy.specialLegal),
    },
    extraPages: pickStr(p.extraPages, current.extraPages),
  }
}

const inputCls =
  'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-500 focus:outline-none'
const labelCls = 'text-sm font-medium text-slate-700'

function Field(props: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  textarea?: boolean
}) {
  return (
    <label className="block">
      <span className={labelCls}>
        {props.label}
        {props.required && <span className="text-red-500"> *</span>}
      </span>
      {props.textarea ? (
        <textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          rows={3}
          className={inputCls}
        />
      ) : (
        <input
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          required={props.required}
          className={inputCls}
        />
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

export function WpPluginForm() {
  const [value, setValue] = useState<FormValue>(EMPTY)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState<Generation | null>(null)
  const [history, setHistory] = useState<Generation[]>([])
  const [brief, setBrief] = useState('')
  const [parsing, setParsing] = useState(false)
  const [parseError, setParseError] = useState<string | null>(null)
  const [parsedNote, setParsedNote] = useState<string | null>(null)
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const set = <K extends keyof FormValue>(k: K, v: FormValue[K]) => setValue((p) => ({ ...p, [k]: v }))

  // Prefill the whole form from a saved client brand profile. The profile is a
  // superset of FormValue (it also carries productImageUrls, unused here).
  function loadFromClient(profile: BrandProfile) {
    setValue({
      businessName: profile.businessName,
      cssPrefix: profile.cssPrefix,
      pluginSlug: profile.pluginSlug,
      websiteUrl: profile.websiteUrl,
      logoUrl: profile.logoUrl,
      tagline: profile.tagline,
      description: profile.description,
      contactEmail: profile.contactEmail,
      whatsapp: profile.whatsapp,
      country: profile.country,
      targetAudience: profile.targetAudience,
      social: { ...profile.social },
      pageContent: { ...profile.pageContent },
      policy: { ...profile.policy },
      extraPages: profile.extraPages,
    })
  }

  async function parseAndFill() {
    if (!brief.trim()) return
    setParsing(true)
    setParseError(null)
    setParsedNote(null)
    try {
      const res = await fetch('/api/admin/wp-plugins/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: brief }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Could not parse the text')
      setValue((prev) => mergeBrief(prev, json.data as Partial<FormValue>))
      setParsedNote('Fields filled from your text — review and edit below, then generate.')
    } catch (err) {
      setParseError(err instanceof Error ? err.message : 'Could not parse the text')
    } finally {
      setParsing(false)
    }
  }

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/wp-plugins')
      const json = await res.json()
      if (res.ok) setHistory(json.data ?? [])
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    loadHistory()
    return () => {
      if (pollRef.current) clearTimeout(pollRef.current)
    }
  }, [loadHistory])

  const poll = useCallback(
    async (id: string) => {
      try {
        const res = await fetch(`/api/admin/wp-plugins/${id}`)
        const json = await res.json()
        if (res.ok) {
          const gen = json.data as Generation
          setCurrent(gen)
          if (gen.status === 'done' || gen.status === 'error') {
            loadHistory()
            return
          }
        }
      } catch {
        /* keep polling */
      }
      pollRef.current = setTimeout(() => poll(id), 2500)
    },
    [loadHistory],
  )

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setCurrent(null)
    try {
      const res = await fetch('/api/admin/wp-plugins/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Could not start generation')
      setCurrent({
        id: json.id,
        status: 'pending',
        business_name: value.businessName,
        plugin_slug: value.pluginSlug || null,
        palette: null,
        error: null,
        created_at: new Date().toISOString(),
      })
      poll(json.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start generation')
    } finally {
      setSubmitting(false)
    }
  }

  async function download(gen: Generation, plugin: 'pages' | 'hf') {
    try {
      const res = await fetch(`/api/admin/wp-plugins/download/${gen.id}?plugin=${plugin}`)
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json?.error || 'Download failed')
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${gen.plugin_slug || 'plugin'}-${plugin}.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed')
    }
  }

  const working = current?.status === 'pending' || current?.status === 'running'

  return (
    <div className="space-y-6">
      <ClientBrandPicker onLoad={loadFromClient} />

      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div>
          <h3 className="font-medium text-slate-900 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-slate-500" /> Quick fill — paste everything
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Paste all the brand info, social links, page content and policy details in one block —
            in any format. AI extracts the fields below. You can still edit anything afterwards, or
            skip this and fill the fields manually.
          </p>
        </div>
        <textarea
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder={
            'e.g. Business: NextGen Fusion — premium WordPress & Shopify themes.\n' +
            'Website nextgenfusion.in, contact contact@nextgenfusion.in, WhatsApp +91 98765 43210.\n' +
            'Instagram @nextgenfusion, LinkedIn ...\n' +
            'About: we build conversion-focused stores for agencies.\n' +
            'Refund within 7 days, payments via Razorpay & UPI, no subscriptions.'
          }
          rows={8}
          className={inputCls}
        />
        {parseError && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{parseError}</div>
        )}
        {parsedNote && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{parsedNote}</div>
        )}
        <button
          type="button"
          onClick={parseAndFill}
          disabled={parsing || !brief.trim()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white text-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
        >
          {parsing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {parsing ? 'Parsing…' : 'Parse & fill fields'}
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Brand & website">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Business name" value={value.businessName} onChange={(v) => set('businessName', v)} placeholder="NextGen Fusion" required />
            <Field label="Logo URL (https)" value={value.logoUrl} onChange={(v) => set('logoUrl', v)} placeholder="https://site.com/wp-content/uploads/logo.png" required />
            <Field label="CSS prefix (optional)" value={value.cssPrefix} onChange={(v) => set('cssPrefix', v)} placeholder="auto from name, e.g. ngf" />
            <Field label="Plugin slug (optional)" value={value.pluginSlug} onChange={(v) => set('pluginSlug', v)} placeholder="auto from name, e.g. nextgen-fusion" />
            <Field label="Website URL" value={value.websiteUrl} onChange={(v) => set('websiteUrl', v)} placeholder="nextgenfusion.in" />
            <Field label="Tagline" value={value.tagline} onChange={(v) => set('tagline', v)} placeholder="Premium WordPress & Shopify themes" />
            <Field label="Contact email" value={value.contactEmail} onChange={(v) => set('contactEmail', v)} placeholder="contact@site.com" />
            <Field label="WhatsApp (with country code, no +)" value={value.whatsapp} onChange={(v) => set('whatsapp', v)} placeholder="919876543210" />
            <Field label="Country / governing law" value={value.country} onChange={(v) => set('country', v)} placeholder="India" />
            <Field label="Target audience" value={value.targetAudience} onChange={(v) => set('targetAudience', v)} placeholder="small business owners, agencies" />
          </div>
          <Field label="What the business does" value={value.description} onChange={(v) => set('description', v)} textarea placeholder="2-4 sentences describing products/services" />
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
            <Field label="Payment gateways" value={value.policy.paymentGateways} onChange={(v) => set('policy', { ...value.policy, paymentGateways: v })} placeholder="Razorpay, UPI, Bank Transfer" />
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

        <button
          type="submit"
          disabled={submitting || working}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          <Boxes className="h-4 w-4" />
          {submitting ? 'Starting…' : 'Generate plugins'}
        </button>
      </form>

      {current && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            {working && <Loader2 className="h-4 w-4 animate-spin text-slate-500" />}
            <span className="text-sm font-medium text-slate-900">
              {current.status === 'pending' && 'Queued…'}
              {current.status === 'running' && 'Generating plugins — this can take 1–2 minutes…'}
              {current.status === 'done' && 'Generation complete'}
              {current.status === 'error' && 'Generation failed'}
            </span>
          </div>

          {current.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{current.error}</div>
          )}

          {current.palette && <PaletteSwatches palette={current.palette} />}

          {current.status === 'done' && (
            <div className="flex flex-wrap gap-3">
              <button onClick={() => download(current, 'pages')} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800">
                <Download className="h-4 w-4" /> Download Pages plugin
              </button>
              <button onClick={() => download(current, 'hf')} className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800">
                <Download className="h-4 w-4" /> Download Header/Footer plugin
              </button>
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-medium text-slate-900 mb-3">Recent generations</h3>
          <div className="divide-y divide-slate-100">
            {history.map((gen) => (
              <div key={gen.id} className="flex items-center justify-between gap-4 py-2.5">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-800 truncate">{gen.business_name || gen.plugin_slug || gen.id}</div>
                  <div className="text-xs text-slate-500">{new Date(gen.created_at).toLocaleString()} · {gen.status}</div>
                </div>
                {gen.status === 'done' && (
                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => download(gen, 'pages')} className="text-xs text-slate-700 underline hover:text-slate-900">Pages</button>
                    <button onClick={() => download(gen, 'hf')} className="text-xs text-slate-700 underline hover:text-slate-900">Header/Footer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PaletteSwatches({ palette }: { palette: Palette }) {
  const named: { label: string; hex: string }[] = [
    { label: 'bg', hex: palette.bg },
    { label: 'primary', hex: palette.primary },
    { label: 'accent', hex: palette.accent },
    { label: 'surface', hex: palette.surface },
  ]
  return (
    <div>
      <div className="text-xs font-medium text-slate-500 mb-2">Extracted palette</div>
      <div className="flex flex-wrap gap-3">
        {named.map((c) => (
          <div key={c.label} className="flex items-center gap-2">
            <span className="h-6 w-6 rounded border border-slate-200" style={{ backgroundColor: c.hex }} />
            <span className="text-xs text-slate-600">{c.label} {c.hex}</span>
          </div>
        ))}
        {palette.palette?.filter((h) => !named.some((n) => n.hex === h)).map((hex) => (
          <span key={hex} className="h-6 w-6 rounded border border-slate-200" style={{ backgroundColor: hex }} title={hex} />
        ))}
      </div>
    </div>
  )
}
