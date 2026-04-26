import { NextRequest, NextResponse } from 'next/server'
import Papa from 'papaparse'
import { getSupabaseAdmin } from '@/lib/admin/supabase'

const KNOWN = new Set([
  'email',
  'name',
  'company',
  'phone',
  'website',
  'industry',
  'notes',
])

const HEADER_ALIASES: Record<string, string> = {
  'email address': 'email',
  emailaddress: 'email',
  'e-mail': 'email',
  'full name': 'name',
  fullname: 'name',
  'first name': 'name',
  'business name': 'company',
  organization: 'company',
  org: 'company',
  'phone number': 'phone',
  mobile: 'phone',
  url: 'website',
  site: 'website',
}

function normalizeKey(k: string): string {
  const cleaned = k.trim().toLowerCase().replace(/[\s_]+/g, ' ')
  if (KNOWN.has(cleaned)) return cleaned
  if (HEADER_ALIASES[cleaned]) return HEADER_ALIASES[cleaned]
  // fall back to snake_case for storing in custom_fields
  return cleaned.replace(/\s+/g, '_')
}

type ParsedRow = {
  email?: string
  name?: string
  company?: string
  phone?: string
  website?: string
  industry?: string
  notes?: string
  custom_fields?: Record<string, string>
}

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || ''

  let rawText: string | null = null
  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file')
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    rawText = await file.text()
  } else if (contentType.includes('application/json')) {
    const body = await req.json().catch(() => ({}))
    if (typeof body?.csv !== 'string') {
      return NextResponse.json({ error: 'csv field required' }, { status: 400 })
    }
    rawText = body.csv
  } else {
    rawText = await req.text()
  }

  if (!rawText || !rawText.trim()) {
    return NextResponse.json({ error: 'CSV is empty' }, { status: 400 })
  }

  const parsed = Papa.parse<Record<string, string>>(rawText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  })
  if (parsed.errors.length) {
    return NextResponse.json(
      { error: 'CSV parse error', details: parsed.errors.slice(0, 5) },
      { status: 400 }
    )
  }

  const rows: ParsedRow[] = []
  const seen = new Set<string>()
  let skippedNoEmail = 0
  let skippedDup = 0

  for (const raw of parsed.data) {
    const out: ParsedRow = { custom_fields: {} }
    for (const [k, v] of Object.entries(raw)) {
      if (v == null || String(v).trim() === '') continue
      const key = normalizeKey(k)
      const value = String(v).trim()
      if (KNOWN.has(key)) {
        ;(out as any)[key] = value
      } else {
        out.custom_fields![key] = value
      }
    }
    if (!out.email) {
      skippedNoEmail++
      continue
    }
    out.email = out.email.toLowerCase()
    if (seen.has(out.email)) {
      skippedDup++
      continue
    }
    seen.add(out.email)
    if (!out.custom_fields || Object.keys(out.custom_fields).length === 0) {
      delete out.custom_fields
    }
    rows.push(out)
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: 'No rows with a valid email column found', skippedNoEmail, skippedDup },
      { status: 400 }
    )
  }

  // Upsert in chunks of 500 to stay well under PostgREST limits
  const sb = getSupabaseAdmin()
  const chunkSize = 500
  let inserted = 0
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize)
    const { error, count } = await sb
      .from('contacts')
      .upsert(chunk, { onConflict: 'email', count: 'exact' })
    if (error) {
      return NextResponse.json(
        { error: error.message, insertedSoFar: inserted },
        { status: 500 }
      )
    }
    inserted += count ?? chunk.length
  }

  return NextResponse.json({
    ok: true,
    received: parsed.data.length,
    upserted: inserted,
    skippedNoEmail,
    skippedDup,
  })
}
