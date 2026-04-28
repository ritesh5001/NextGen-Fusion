'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Upload, FileText, CheckCircle2 } from 'lucide-react'

const EXAMPLE_CSV = `company_name,contact_name,contact_title,email,phone,website,industry,company_size,location,linkedin_url,target_service,pain_point,source,notes
Acme Corp,Jane Doe,Founder,jane@acme.com,+91 98765 43210,https://acme.com,E-commerce,1-10,Mumbai,https://linkedin.com/company/acme,Website Development Services,Outdated website with no conversion flow,linkedin,Found via LinkedIn search
Example Agency,John Smith,Marketing Head,john@example.com,,https://example.com,Marketing Agency,11-50,Delhi,,SEO Services,No organic traffic despite good content,manual,`

export default function LeadsUploadPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<{ inserted: number; skipped: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  function onFile(f: File | null) {
    if (!f) return
    setFile(f)
    setResult(null)
    setError(null)
  }

  async function onUpload() {
    if (!file) return
    setUploading(true)
    setError(null)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/leads/bulk', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Upload failed')
      setResult(json)
      setFile(null)
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function downloadExample() {
    const blob = new Blob([EXAMPLE_CSV], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'leads-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-2xl">
        <PageHeader
          title="Upload Leads"
          description="Bulk-import business prospects from a CSV file."
        />

        {/* Template download */}
        <div className="mt-6 rounded-xl border border-slate-200 p-5 bg-slate-50">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700">Required column: <code className="text-xs bg-white border border-slate-200 rounded px-1 py-0.5">company_name</code></p>
              <p className="text-xs text-slate-500 mt-1">
                Optional: contact_name, contact_title, email, phone, website, industry, company_size, location, linkedin_url, target_service, pain_point, status, source, notes
              </p>
              <button
                onClick={downloadExample}
                className="mt-3 text-xs text-slate-600 underline hover:text-slate-900"
              >
                Download example CSV template
              </button>
            </div>
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            onFile(e.dataTransfer.files[0] ?? null)
          }}
          onClick={() => fileRef.current?.click()}
          className={`mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer py-14 transition ${dragging ? 'border-slate-900 bg-slate-50' : 'border-slate-300 hover:border-slate-400'}`}
        >
          <Upload className="h-8 w-8 text-slate-400" />
          {file ? (
            <p className="text-sm font-medium text-slate-700">{file.name}</p>
          ) : (
            <>
              <p className="text-sm text-slate-600 font-medium">Drop your CSV here or click to browse</p>
              <p className="text-xs text-slate-400">Supports .csv files only</p>
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">{error}</div>
        )}

        {result && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Upload successful</p>
              <p className="text-sm text-green-700 mt-0.5">
                {result.inserted} lead{result.inserted !== 1 ? 's' : ''} imported.
                {result.skipped > 0 && ` ${result.skipped} row${result.skipped !== 1 ? 's' : ''} skipped (missing company_name).`}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={onUpload}
            disabled={!file || uploading}
            className="px-5 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition"
          >
            {uploading ? 'Uploading…' : 'Upload CSV'}
          </button>
          <button
            onClick={() => router.push('/admin/leads')}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition"
          >
            Back to Leads
          </button>
        </div>
      </div>
    </AdminShell>
  )
}
