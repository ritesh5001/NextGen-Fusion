'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AdminShell, PageHeader } from '@/components/admin/admin-shell'
import { Upload } from 'lucide-react'

const SAMPLE = `email,name,company,phone,website,industry,notes
acme@example.com,Jane Doe,Acme Inc,+1 555 0001,https://acme.test,SaaS,Met at Web Summit
hello@globex.com,John Roe,Globex,,https://globex.test,Logistics,`

export default function UploadContactsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function onUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setBusy(true)
    setError(null)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/contacts/bulk', {
        method: 'POST',
        body: fd,
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Upload failed')
      setResult(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  function downloadSample() {
    const blob = new Blob([SAMPLE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'contacts-sample.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        <PageHeader
          title="Bulk upload contacts"
          description="Upload a CSV file. Existing contacts (matched by email) will be updated."
        />

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-medium text-slate-900">CSV format</h3>
          <p className="text-sm text-slate-600 mt-1">
            Required column: <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">email</code>.
            Recognized columns: <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">name, company, phone, website, industry, notes</code>.
            Any extra columns are stored as custom fields you can use in templates.
          </p>
          <button
            type="button"
            onClick={downloadSample}
            className="mt-3 text-sm text-slate-700 underline hover:text-slate-900"
          >
            Download sample CSV
          </button>
        </div>

        <form
          onSubmit={onUpload}
          className="mt-4 bg-white border border-slate-200 rounded-xl p-6 space-y-4"
        >
          <label className="block">
            <span className="text-sm font-medium text-slate-700">CSV file</span>
            <input
              type="file"
              accept=".csv,text/csv"
              required
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2 block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-slate-900 file:text-white file:text-sm file:font-medium hover:file:bg-slate-800"
            />
          </label>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3 text-sm text-emerald-800 space-y-1">
              <div className="font-medium">Upload complete.</div>
              <div>Rows received: {result.received}</div>
              <div>Upserted (new + updated): {result.upserted}</div>
              <div>Skipped (no email): {result.skippedNoEmail}</div>
              <div>Skipped (duplicate in file): {result.skippedDup}</div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/admin/contacts')}
                  className="text-emerald-900 underline"
                >
                  Go to contacts →
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || busy}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
          >
            <Upload className="h-4 w-4" />
            {busy ? 'Uploading…' : 'Upload CSV'}
          </button>
        </form>
      </div>
    </AdminShell>
  )
}
