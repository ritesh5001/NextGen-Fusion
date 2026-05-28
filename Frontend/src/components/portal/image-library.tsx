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
        (res.status === 404 || res.status === 502 || res.status === 503
          ? 'Image service is not available yet. Please try again later.'
          : `Request failed (${res.status})`),
    )
  }
  if (!json) throw new Error('Image service is not available yet. Please try again later.')
  return json
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
    try {
      const fd = new FormData()
      list.forEach((f) => fd.append('files', f))
      const res = await fetch('/api/client/images', { method: 'POST', body: fd })
      const json = await readJson(res)
      const created: ClientImage[] = json.data || []
      setImages((prev) => [...created, ...prev])
      return created
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      return []
    } finally {
      setUploading(false)
    }
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

// Manage mode — for the "My Images" page.
export function ImageManager() {
  const { images, loading, uploading, error, upload, remove } = useImageLibrary()

  return (
    <div className="space-y-5">
      <ExpiryNotice />
      <div className="flex items-center justify-between">
        <UploadButton uploading={uploading} onFiles={(f) => upload(f)} />
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
        className="flex max-h-[85vh] w-full max-w-3xl flex-col rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-base font-semibold">Choose {multiple ? 'images' : 'an image'}</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-400 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto px-5 py-4">
          <ExpiryNotice />
          <div className="flex items-center justify-between">
            <UploadButton
              uploading={uploading}
              label="Upload new"
              onFiles={async (f) => {
                const created = await upload(f)
                if (!multiple && created[0]) onConfirm([created[0].url])
                else if (created.length) setSelected((prev) => [...prev, ...created.map((c) => c.url)])
              }}
            />
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
          <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
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
