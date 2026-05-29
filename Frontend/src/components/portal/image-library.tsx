'use client'

import { useCallback, useEffect, useState } from 'react'
import { Upload, Trash2, X, Check, ImagePlus, Loader2, Info } from 'lucide-react'

export type ClientImage = {
  id: string
  url: string
  public_id: string
  bytes: number | null
  original_filename: string | null
  created_at: string
  expires_at: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

// Parses a response safely. If the server returns HTML (e.g. the image API
// isn't deployed/reachable yet), surface a clear message instead of the
// cryptic "Unexpected token '<'" JSON error.
async function readJson(res: Response): Promise<{ data?: ClientImage[]; error?: string }> {
  const text = await res.text()
  let json: { data?: ClientImage[]; error?: string } | null = null
  try {
    json = text ? JSON.parse(text) : null
  } catch {
    json = null
  }
  if (!res.ok) {
    throw new Error(
      json?.error ||
        (res.status === 413
          ? 'That image is too large. Please try a smaller photo.'
          : res.status === 404 || res.status === 502 || res.status === 503
            ? 'Image service is not available yet. Please try again later.'
            : `Request failed (${res.status})`),
    )
  }
  if (!json) throw new Error('Image service is not available yet. Please try again later.')
  return json
}

// Resize + re-encode an image in the browser before upload so big camera/phone
// photos don't exceed the host's request-size limit (which caused HTTP 413).
// Caps the long edge to 1600px and exports JPEG ~0.82. Falls back to the
// original file if anything can't be decoded (e.g. HEIC in some browsers).
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.82

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  const objectUrl = URL.createObjectURL(file)
  try {
    const img = await loadImage(objectUrl)
    let { width, height } = img
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
      const scale = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height)
      width = Math.round(width * scale)
      height = Math.round(height * scale)
    }
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return file
    ctx.drawImage(img, 0, 0, width, height)
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', JPEG_QUALITY),
    )
    if (!blob) return file
    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg'
    const out = new File([blob], name, { type: 'image/jpeg' })
    return out.size < file.size ? out : file
  } catch {
    return file
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

export function useImageLibrary() {
  const [images, setImages] = useState<ClientImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/client/images')
      const json = await readJson(res)
      setImages(json.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const upload = useCallback(async (files: FileList | File[]): Promise<ClientImage[]> => {
    const list = Array.from(files)
    if (!list.length) return []
    setUploading(true)
    setError('')

    const created: ClientImage[] = []
    let firstError: string | null = null
    // Each file is its own small request (after compression) so a batch never
    // exceeds the host's request-size limit. We run a few in parallel so
    // uploading many images at once is fast.
    const CONCURRENCY = 10
    let cursor = 0

    async function worker() {
      while (cursor < list.length) {
        const file = list[cursor++]
        try {
          const compressed = await compressImage(file)
          const fd = new FormData()
          fd.append('files', compressed)
          const res = await fetch('/api/client/images', { method: 'POST', body: fd })
          const json = await readJson(res)
          const items: ClientImage[] = json.data || []
          created.push(...items)
          // Show each upload as soon as it lands.
          setImages((prev) => [...items, ...prev])
        } catch (err) {
          if (!firstError) firstError = err instanceof Error ? err.message : 'Upload failed'
        }
      }
    }

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker))

    if (firstError) setError(firstError)
    setUploading(false)
    return created
  }, [])

  const remove = useCallback(async (id: string) => {
    const res = await fetch(`/api/client/images/${id}`, { method: 'DELETE' })
    if (res.ok) setImages((prev) => prev.filter((i) => i.id !== id))
    return res.ok
  }, [])

  return { images, loading, uploading, error, refresh, upload, remove }
}

export function ExpiryNotice() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        Uploaded images are <strong>automatically deleted after 30 days</strong> — this is temporary
        storage to help you build your CSV. Once you import your products into your own
        WooCommerce/Shopify store, your store keeps its own copy of each image, so deleting them here
        later <strong>won&apos;t affect your live store</strong>.
      </p>
    </div>
  )
}

function UploadButton({
  uploading,
  onFiles,
  label = 'Upload images',
}: {
  uploading: boolean
  onFiles: (files: FileList) => void
  label?: string
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
      {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
      {uploading ? 'Uploading…' : label}
      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        disabled={uploading}
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files)
          e.target.value = ''
        }}
      />
    </label>
  )
}

function imageFilesFrom(dt: DataTransfer): File[] {
  if (dt.files && dt.files.length) {
    return Array.from(dt.files).filter((f) => f.type.startsWith('image/'))
  }
  // Fallback for some browsers that only expose items during drop.
  return Array.from(dt.items || [])
    .filter((it) => it.kind === 'file' && it.type.startsWith('image/'))
    .map((it) => it.getAsFile())
    .filter((f): f is File => !!f)
}

// When dragging an image FROM another web page (Google Images, a website, etc.)
// the browser hands over a URL instead of a file. Read it synchronously from
// the drop event (dataTransfer is only valid during the event).
function draggedImageUrl(dt: DataTransfer): string | null {
  const uri = dt.getData('text/uri-list') || dt.getData('text/plain')
  if (uri) {
    const first = uri.split('\n').map((s) => s.trim()).find((s) => /^https?:\/\//i.test(s))
    if (first) return first
  }
  const html = dt.getData('text/html')
  const m = html && html.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (m && /^https?:\/\//i.test(m[1])) return m[1]
  return null
}

function imageFilesFromClipboard(items: DataTransferItemList | undefined | null): File[] {
  return Array.from(items || [])
    .filter((it) => it.kind === 'file' && it.type.startsWith('image/'))
    .map((it) => it.getAsFile())
    .filter((f): f is File => !!f)
}

async function fetchUrlAsImageFile(url: string): Promise<File | null> {
  try {
    const res = await fetch(url, { mode: 'cors' })
    if (!res.ok) return null
    const blob = await res.blob()
    if (!blob.type.startsWith('image/')) return null
    const base = (url.split('?')[0].split('/').pop() || 'image') || 'image'
    const name = /\.[a-z0-9]{2,4}$/i.test(base) ? base : `${base}.jpg`
    return new File([blob], name, { type: blob.type })
  } catch {
    return null
  }
}

function Dropzone({
  uploading,
  onFiles,
  hint = 'Drag & drop or paste images here, or',
}: {
  uploading: boolean
  onFiles: (files: File[]) => void
  hint?: string
}) {
  const [over, setOver] = useState(false)
  const [dropError, setDropError] = useState('')
  const [fetching, setFetching] = useState(false)

  // Paste support: lets users copy an image (e.g. right-click → Copy image in
  // WhatsApp Web) and press Cmd/Ctrl+V to upload it — no download needed. This
  // works where drag can't, because copying decodes the image to the clipboard.
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const files = imageFilesFromClipboard(e.clipboardData?.items)
      if (files.length) {
        e.preventDefault()
        setDropError('')
        onFiles(files)
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [onFiles])

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOver(true)
      }}
      onDragOver={(e) => {
        // Required so the browser allows the drop (esp. Chrome/Safari on macOS).
        e.preventDefault()
        e.stopPropagation()
        e.dataTransfer.dropEffect = 'copy'
        if (!over) setOver(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOver(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setOver(false)
        setDropError('')
        // Read everything synchronously — dataTransfer is only valid in-event.
        const files = imageFilesFrom(e.dataTransfer)
        if (files.length) {
          onFiles(files)
          return
        }
        // Dragged from another web page (Google Images, a site, etc.) → URL.
        const url = draggedImageUrl(e.dataTransfer)
        if (url) {
          setFetching(true)
          fetchUrlAsImageFile(url)
            .then((file) => {
              if (file) onFiles([file])
              else
                setDropError(
                  "Couldn't load that image directly. Tip: right-click it → Copy image, then press ⌘V / Ctrl+V here.",
                )
            })
            .finally(() => setFetching(false))
          return
        }
        setDropError(
          'This image is protected by the source site (e.g. WhatsApp Web) and can\'t be dragged in. Right-click it → Copy image, then press ⌘V / Ctrl+V here.',
        )
      }}
      className={
        'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition ' +
        (over ? 'border-slate-900 bg-slate-100' : 'border-slate-300 bg-white')
      }
    >
      <ImagePlus className={'h-7 w-7 ' + (over ? 'text-slate-700' : 'text-slate-300')} />
      <p className="text-sm text-slate-500">
        {over ? 'Drop to upload' : fetching ? 'Fetching image…' : hint}
      </p>
      <UploadButton uploading={uploading} onFiles={(fl) => onFiles(Array.from(fl))} label="Choose images" />
      {dropError && <p className="text-xs text-amber-700">{dropError}</p>}
    </div>
  )
}

// Manage mode — for the "My Images" page.
export function ImageManager() {
  const { images, loading, uploading, error, upload, remove } = useImageLibrary()

  return (
    <div className="space-y-5">
      <ExpiryNotice />
      <Dropzone uploading={uploading} onFiles={(f) => upload(f)} />
      <div className="flex justify-end">
        <span className="text-xs text-slate-400">{images.length} image{images.length === 1 ? '' : 's'}</span>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading…</div>
      ) : images.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
          <ImagePlus className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">No images yet. Upload your product photos to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.original_filename ?? ''} className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-2 px-2.5 py-2">
                <span className="truncate text-xs text-slate-500" title={`Deletes on ${formatDate(img.expires_at)}`}>
                  Deletes {formatDate(img.expires_at)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this image? Products already exported keep their copy.')) remove(img.id)
                  }}
                  className="p-1 text-slate-400 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Modal picker — select one or many images from the library (with upload).
export function ImagePickerModal({
  multiple,
  initialSelected = [],
  onConfirm,
  onClose,
}: {
  multiple: boolean
  initialSelected?: string[]
  onConfirm: (urls: string[]) => void
  onClose: () => void
}) {
  const { images, loading, uploading, error, upload, remove } = useImageLibrary()
  const [selected, setSelected] = useState<string[]>(initialSelected)

  function toggle(url: string) {
    if (!multiple) {
      onConfirm([url])
      return
    }
    setSelected((prev) => (prev.includes(url) ? prev.filter((u) => u !== url) : [...prev, url]))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-semibold">Choose {multiple ? 'images' : 'an image'}</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-4"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <ExpiryNotice />
          <Dropzone
            uploading={uploading}
            onFiles={async (f) => {
              const created = await upload(f)
              if (!multiple && created[0]) onConfirm([created[0].url])
              else if (created.length) setSelected((prev) => [...prev, ...created.map((c) => c.url)])
            }}
          />
          <div className="flex justify-end">
            <span className="text-xs text-slate-400">Click an image to {multiple ? 'select' : 'choose'}</span>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">Loading…</div>
          ) : images.length === 0 ? (
            <div className="py-12 text-center text-sm text-slate-500">
              No images yet — upload your first product photo above.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {images.map((img) => {
                const isSel = selected.includes(img.url)
                return (
                  <div key={img.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => toggle(img.url)}
                      className={
                        'block w-full overflow-hidden rounded-lg border-2 transition ' +
                        (isSel ? 'border-slate-900' : 'border-transparent hover:border-slate-300')
                      }
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt="" className="aspect-square w-full object-cover" />
                      {isSel && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Delete this image from your library?')) remove(img.id)
                      }}
                      className="absolute left-1.5 top-1.5 hidden rounded-full bg-white/90 p-1 text-slate-500 hover:text-red-600 group-hover:block"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {multiple && (
          <div className="flex shrink-0 items-center justify-between border-t border-slate-200 px-5 py-4">
            <span className="text-sm text-slate-500">{selected.length} selected</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(selected)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                Add selected
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Product gallery field — selected images with cover/remove + "add" opens the modal.
export function GalleryPicker({ value, onChange }: { value: string[]; onChange: (urls: string[]) => void }) {
  const [open, setOpen] = useState(false)

  function removeAt(url: string) {
    onChange(value.filter((u) => u !== url))
  }
  function makeCover(url: string) {
    onChange([url, ...value.filter((u) => u !== url)])
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">Product images</label>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
        >
          <ImagePlus className="h-4 w-4" /> Add images
        </button>
      </div>

      {value.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 px-4 py-6 text-center text-sm text-slate-400">
          No images selected. Click &ldquo;Add images&rdquo; to upload or pick from your library.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {value.map((url, i) => (
            <div key={url} className="group relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              {i === 0 && (
                <span className="absolute left-0 top-0 bg-slate-900/80 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={() => removeAt(url)}
                className="absolute right-0.5 top-0.5 hidden rounded-full bg-white/90 p-0.5 text-slate-500 hover:text-red-600 group-hover:block"
                title="Remove"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              {i !== 0 && (
                <button
                  type="button"
                  onClick={() => makeCover(url)}
                  className="absolute inset-x-0 bottom-0 hidden bg-slate-900/70 py-0.5 text-[10px] text-white group-hover:block"
                >
                  Make cover
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <ImagePickerModal
          multiple
          initialSelected={value}
          onClose={() => setOpen(false)}
          onConfirm={(urls) => {
            onChange(urls)
            setOpen(false)
          }}
        />
      )}
    </div>
  )
}

// Per-variant single-image button.
export function VariantImageButton({
  value,
  onChange,
}: {
  value?: string
  onChange: (url: string) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-slate-300 hover:border-slate-400"
        title={value ? 'Change image' : 'Choose image'}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-full w-full object-cover" />
        ) : (
          <ImagePlus className="h-4 w-4 text-slate-400" />
        )}
      </button>
      {open && (
        <ImagePickerModal
          multiple={false}
          onClose={() => setOpen(false)}
          onConfirm={(urls) => {
            if (urls[0]) onChange(urls[0])
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
