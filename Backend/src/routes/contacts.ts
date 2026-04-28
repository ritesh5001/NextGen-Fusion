import { Router } from 'express'
import multer from 'multer'
import Papa from 'papaparse'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()
const upload = multer({ storage: multer.memoryStorage() })

const ALLOWED_FIELDS = [
  'email', 'name', 'company', 'phone', 'website', 'industry', 'notes', 'custom_fields', 'unsubscribed',
] as const

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function pickContact(body: any): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const f of ALLOWED_FIELDS) if (f in body) out[f] = body[f]
  return out
}

// GET /api/admin/contacts
router.get('/contacts', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = (req.query.q as string | undefined)?.trim() || ''
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)

    let query = sb
      .from('contacts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`email.ilike.%${safe}%,name.ilike.%${safe}%,company.ilike.%${safe}%`)
    }

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({
          data: [],
          count: 0,
          setupRequired: true,
          message: 'Contacts storage is not provisioned yet. Apply Frontend/supabase/schema.sql to your Supabase project.',
        })
        return
      }
      res.status(500).json({ error: error.message }); return
    }
    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/contacts/bulk — must come before /:id
router.post('/contacts/bulk', requireAuth, upload.single('file'), async (req, res) => {
  try {
    let rawText: string | null = null

    if (req.file) {
      rawText = req.file.buffer.toString('utf-8')
    } else if (req.body && typeof req.body === 'object' && 'csv' in req.body) {
      rawText = req.body.csv
    } else if (typeof req.body === 'string') {
      rawText = req.body
    }

    if (!rawText || !rawText.trim()) {
      res.status(400).json({ error: 'CSV is empty' })
      return
    }

    const KNOWN = new Set(['email', 'name', 'company', 'phone', 'website', 'industry', 'notes'])
    const HEADER_ALIASES: Record<string, string> = {
      'email address': 'email', emailaddress: 'email', 'e-mail': 'email',
      'full name': 'name', fullname: 'name', 'first name': 'name',
      'business name': 'company', organization: 'company', org: 'company',
      'phone number': 'phone', mobile: 'phone',
      url: 'website', site: 'website',
    }

    function normalizeKey(k: string): string {
      const cleaned = k.trim().toLowerCase().replace(/[\s_]+/g, ' ')
      if (KNOWN.has(cleaned)) return cleaned
      if (HEADER_ALIASES[cleaned]) return HEADER_ALIASES[cleaned]
      return cleaned.replace(/\s+/g, '_')
    }

    type ParsedRow = {
      email?: string; name?: string; company?: string; phone?: string
      website?: string; industry?: string; notes?: string
      custom_fields?: Record<string, string>
    }

    const parsed = Papa.parse<Record<string, string>>(rawText, {
      header: true, skipEmptyLines: true, transformHeader: (h) => h.trim(),
    })
    if (parsed.errors.length) {
      res.status(400).json({ error: 'CSV parse error', details: parsed.errors.slice(0, 5) })
      return
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
          (out as any)[key] = value
        } else {
          out.custom_fields![key] = value
        }
      }
      if (!out.email) { skippedNoEmail++; continue }
      out.email = out.email.toLowerCase()
      if (seen.has(out.email)) { skippedDup++; continue }
      seen.add(out.email)
      if (!out.custom_fields || Object.keys(out.custom_fields).length === 0) delete out.custom_fields
      rows.push(out)
    }

    if (rows.length === 0) {
      res.status(400).json({ error: 'No rows with a valid email column found', skippedNoEmail, skippedDup })
      return
    }

    const sb = getSupabaseAdmin()
    const chunkSize = 500
    let inserted = 0
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize)
      const { error, count } = await sb
        .from('contacts').upsert(chunk, { onConflict: 'email', count: 'exact' })
      if (error) {
        res.status(500).json({ error: error.message, insertedSoFar: inserted })
        return
      }
      inserted += count ?? chunk.length
    }

    res.json({ ok: true, received: parsed.data.length, upserted: inserted, skippedNoEmail, skippedDup })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// POST /api/admin/contacts
router.post('/contacts', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const body = req.body
    if (!body?.email || typeof body.email !== 'string') {
      res.status(400).json({ error: 'email is required' })
      return
    }
    const payload = pickContact(body)
    payload.email = String(payload.email).trim().toLowerCase()
    const { data, error } = await sb.from('contacts').upsert(payload, { onConflict: 'email' }).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// GET /api/admin/contacts/:id
router.get('/contacts/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('contacts').select('*').eq('id', req.params.id).single()
    if (error) { res.status(404).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// PATCH /api/admin/contacts/:id
router.patch('/contacts/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const payload = pickContact(req.body)
    if (typeof payload.email === 'string') {
      payload.email = (payload.email as string).trim().toLowerCase()
    }
    const { data, error } = await sb
      .from('contacts').update(payload).eq('id', req.params.id).select().single()
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { error } = await sb.from('contacts').delete().eq('id', req.params.id)
    if (error) { res.status(500).json({ error: error.message }); return }
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
