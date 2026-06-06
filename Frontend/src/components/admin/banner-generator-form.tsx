'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Download, ImagePlus, Loader2, Sparkles, X } from 'lucide-react'

type BannerType = 'ecommerce' | 'service'
type BannerMode = 'auto' | 'guided'
type BannerRatio = '16:9' | '7:3' | '1:1'
type BannerQuality = 'low' | 'medium' | 'high'
type BannerProvider = 'openai' | 'fal' | 'gemini'

type Generation = {
  id: string
  status: 'pending' | 'running' | 'done' | 'error'
  provider: BannerProvider | null
  banner_type: BannerType | null
  mode: BannerMode | null
  ratio: BannerRatio | null
  quality: BannerQuality | null
  image_url: string | null
  error: string | null
  created_at: string
}

type ProductImage = { public_id: string; url: string }

type FormValue = {
  bannerType: BannerType
  mode: BannerMode
  ratio: BannerRatio
  provider: BannerProvider
  quality: BannerQuality
  brandName: string
  websiteUrl: string
  tagline: string
  brief: string
  headline: string
  subtext: string
  cta: string
  background: string
  colors: string
}

const EMPTY: FormValue = {
  bannerType: 'ecommerce',
  mode: 'auto',
  ratio: '16:9',
  provider: 'openai',
  quality: 'high',
  brandName: '',
  websiteUrl: '',
  tagline: '',
  brief: '',
  headline: '',
  subtext: '',
  cta: '',
  background: '',
  colors: '',
}

const RATIOS: { value: BannerRatio; label: string; hint: string; box: string }[] = [
  { value: '16:9', label: 'Desktop 16:9', hint: 'widescreen', box: 'h-7 w-12' },
  { value: '7:3', label: 'Desktop 7:3', hint: 'ultra-wide hero', box: 'h-5 w-12' },
  { value: '1:1', label: 'Phone 1:1', hint: 'square', box: 'h-9 w-9' },
]
const QUALITIES: BannerQuality[] = ['low', 'medium', 'high']
const PROVIDERS: { value: BannerProvider; label: string; hint: string }[] = [
  { value: 'openai', label: 'OpenAI', hint: 'gpt-image-1' },
  { value: 'fal', label: 'fal.ai', hint: 'Nano Banana' },
  { value: 'gemini', label: 'Gemini', hint: 'gemini-2.5-flash-image' },
]

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

function Segmented<T extends string>(props: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-300 p-0.5">
      {props.options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => props.onChange(o.value)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            props.value === o.value ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function BannerGeneratorForm() {
  const [value, setValue] = useState<FormValue>(EMPTY)
  const [images, setImages] = useState<ProductImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState<Generation | null>(null)
  const [history, setHistory] = useState<Generation[]>([])
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const set = <K extends keyof FormValue>(k: K, v: FormValue[K]) => setValue((p) => ({ ...p, [k]: v }))

  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/banners')
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
        const res = await fetch(`/api/admin/banners/${id}`)
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

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || !files.length) return
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      Array.from(files).forEach((f) => fd.append('files', f))
      const res = await fetch('/api/admin/banners/upload', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Upload failed')
      setImages((prev) => [...prev, ...(json.data as ProductImage[])])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  function removeImage(publicId: string) {
    setImages((prev) => prev.filter((i) => i.public_id !== publicId))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setCurrent(null)
    try {
      const res = await fetch('/api/admin/banners/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...value, productImageUrls: images.map((i) => i.url) }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Could not start generation')
      setCurrent({
        id: json.id,
        status: 'pending',
        provider: value.provider,
        banner_type: value.bannerType,
        mode: value.mode,
        ratio: value.ratio,
        quality: value.quality,
        image_url: null,
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

  async function download(url: string, id: string) {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const objUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objUrl
      a.download = `banner-${id}.jpg`
      a.click()
      URL.revokeObjectURL(objUrl)
    } catch {
      setError('Download failed')
    }
  }

  const isEcom = value.bannerType === 'ecommerce'
  const isGuided = value.mode === 'guided'
  const working = current?.status === 'pending' || current?.status === 'running'

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <Section title="Banner basics">
          <div className="flex flex-wrap gap-6">
            <div>
              <span className={labelCls}>Banner for</span>
              <div className="mt-1">
                <Segmented
                  value={value.bannerType}
                  onChange={(v) => set('bannerType', v)}
                  options={[
                    { value: 'ecommerce', label: 'Ecommerce' },
                    { value: 'service', label: 'Service' },
                  ]}
                />
              </div>
            </div>
            <div>
              <span className={labelCls}>How much should AI decide?</span>
              <div className="mt-1">
                <Segmented
                  value={value.mode}
                  onChange={(v) => set('mode', v)}
                  options={[
                    { value: 'auto', label: 'Let AI do everything' },
                    { value: 'guided', label: 'Guide the details' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div>
            <span className={labelCls}>Aspect ratio</span>
            <div className="mt-2 flex flex-wrap gap-3">
              {RATIOS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => set('ratio', r.value)}
                  className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                    value.ratio === r.value
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className={`shrink-0 rounded border border-slate-300 bg-slate-200 ${r.box}`} />
                  <span>
                    <span className="block text-sm font-medium text-slate-800">{r.label}</span>
                    <span className="block text-xs text-slate-500">{r.hint}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={labelCls}>Image AI</span>
            <div className="mt-2 flex flex-wrap gap-3">
              {PROVIDERS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => set('provider', p.value)}
                  className={`rounded-lg border px-4 py-3 text-left transition-colors ${
                    value.provider === p.value
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="block text-sm font-medium text-slate-800">{p.label}</span>
                  <span className="block text-xs text-slate-500">{p.hint}</span>
                </button>
              ))}
            </div>
          </div>

          {value.provider === 'openai' && (
            <label className="block max-w-xs">
              <span className={labelCls}>Image quality</span>
              <select
                value={value.quality}
                onChange={(e) => set('quality', e.target.value as BannerQuality)}
                className={inputCls}
              >
                {QUALITIES.map((q) => (
                  <option key={q} value={q}>
                    {q[0].toUpperCase() + q.slice(1)}
                    {q === 'high' ? ' (best, slower)' : q === 'low' ? ' (fast draft)' : ''}
                  </option>
                ))}
              </select>
            </label>
          )}
        </Section>

        <Section title="Brand & website">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Brand name" value={value.brandName} onChange={(v) => set('brandName', v)} placeholder="NextGen Fusion" required />
            <Field label="Website URL" value={value.websiteUrl} onChange={(v) => set('websiteUrl', v)} placeholder="nextgenfusion.in" />
            <Field label="Tagline" value={value.tagline} onChange={(v) => set('tagline', v)} placeholder="Premium WordPress & Shopify themes" />
          </div>
          <Field
            label={isEcom ? 'What are you promoting? (product, offer, discount, vibe)' : 'What should the banner say? (service, value, vibe)'}
            value={value.brief}
            onChange={(v) => set('brief', v)}
            textarea
            placeholder={
              isEcom
                ? 'e.g. Diwali sale — flat 40% off all themes, festive premium feel, gold + deep navy'
                : 'e.g. We build conversion-focused online stores for agencies — bold, trustworthy, modern'
            }
          />
        </Section>

        <Section title={isEcom ? 'Product images (composited into the banner)' : 'Images (optional)'}>
          <div className="flex flex-wrap gap-3">
            {images.map((img) => (
              <div key={img.public_id} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.url} alt="" className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(img.public_id)}
                  className="absolute -right-2 -top-2 rounded-full bg-slate-900 p-0.5 text-white hover:bg-slate-700"
                  aria-label="Remove image"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-700">
              {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ImagePlus className="h-5 w-5" />}
              <span className="text-[11px]">Add</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={onUpload} disabled={uploading} />
            </label>
          </div>
          <p className="text-xs text-slate-500">
            {isEcom
              ? 'Upload the actual product photo(s). The AI places them into the banner scene. Up to 6 images.'
              : 'Optional reference images for style or subject. Up to 6 images.'}
          </p>
        </Section>

        {isGuided && (
          <Section title="Guided details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Headline text" value={value.headline} onChange={(v) => set('headline', v)} placeholder="Flat 40% Off" />
              <Field label="Sub-text" value={value.subtext} onChange={(v) => set('subtext', v)} placeholder="Limited-time Diwali sale" />
              <Field label="Call-to-action text" value={value.cta} onChange={(v) => set('cta', v)} placeholder="Shop Now" />
              <Field label="Brand colors" value={value.colors} onChange={(v) => set('colors', v)} placeholder="#0B1F3A, gold" />
            </div>
            <Field label="Background / scene style" value={value.background} onChange={(v) => set('background', v)} textarea placeholder="Festive gradient with subtle bokeh, soft studio lighting" />
          </Section>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <button
          type="submit"
          disabled={submitting || working || uploading}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          <Sparkles className="h-4 w-4" />
          {submitting ? 'Starting…' : 'Generate banner'}
        </button>
      </form>

      {current && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            {working && <Loader2 className="h-4 w-4 animate-spin text-slate-500" />}
            <span className="text-sm font-medium text-slate-900">
              {current.status === 'pending' && 'Queued…'}
              {current.status === 'running' && 'Generating banner — this can take 30–60 seconds…'}
              {current.status === 'done' && 'Banner ready'}
              {current.status === 'error' && 'Generation failed'}
            </span>
          </div>

          {current.error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{current.error}</div>
          )}

          {current.status === 'done' && current.image_url && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={current.image_url} alt="Generated banner" className="w-full rounded-lg border border-slate-200" />
              <button
                onClick={() => download(current.image_url!, current.id)}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800"
              >
                <Download className="h-4 w-4" /> Download
              </button>
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-medium text-slate-900 mb-3">Recent banners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {history.map((gen) => (
              <div key={gen.id} className="space-y-1">
                {gen.status === 'done' && gen.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={gen.image_url}
                    alt=""
                    className="w-full rounded-lg border border-slate-200 object-cover cursor-pointer"
                    onClick={() => download(gen.image_url!, gen.id)}
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-500">
                    {gen.status}
                  </div>
                )}
                <div className="text-xs text-slate-500">
                  {gen.ratio} · {gen.provider ?? gen.banner_type} · {new Date(gen.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
