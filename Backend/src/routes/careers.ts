import { Router, type NextFunction, type Request, type Response } from 'express'
import multer from 'multer'
import { randomUUID } from 'crypto'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { sendCareerAdminAlert, sendCareerApplicantAck } from '../lib/career-email'

const router = Router()

export const RESUME_BUCKET = 'resumes'
const MAX_RESUME_MB = 5
const MAX_RESUME_BYTES = MAX_RESUME_MB * 1024 * 1024

const ALLOWED_RESUME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])
const ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx']

const APPLICATION_COLUMNS =
  'id, role_id, role_title, name, email, phone, location, experience, portfolio_url, cover_note, resume_path, resume_filename, resume_size, status, created_at, updated_at'

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function isMissingBucketError(error: { message?: string } | null | undefined): boolean {
  if (!error) return false
  return /bucket not found|does not exist/i.test(error.message || '')
}

function trimString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

/**
 * Storage-safe object name. The original filename reaches us from an untrusted
 * upload, so we keep only the extension and generate the rest, which removes
 * path traversal and unicode-collision risk in one step.
 */
function buildResumePath(originalName: string): { path: string; extension: string } {
  const match = /\.[a-z0-9]+$/i.exec(originalName)
  const extension = (match ? match[0] : '').toLowerCase()
  const now = new Date()
  const folder = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}`
  return { path: `${folder}/${randomUUID()}${extension}`, extension }
}

const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME_BYTES, files: 1 },
}).single('resume')

// Multer failures (oversized file, malformed multipart) must surface as a clean
// 400 rather than bubbling into the generic 500 handler.
function handleResumeUpload(req: Request, res: Response, next: NextFunction) {
  uploadResume(req, res, (err: unknown) => {
    if (err) {
      const code = (err as { code?: string })?.code
      res.status(400).json({
        error:
          code === 'LIMIT_FILE_SIZE'
            ? `Resume must be ${MAX_RESUME_MB}MB or smaller`
            : 'Resume upload failed. Please attach a single PDF or Word file.',
      })
      return
    }
    next()
  })
}

// Public endpoint used by the /careers application form.
router.post('/career-applications', handleResumeUpload, async (req, res) => {
  try {
    const payload = {
      role_id: trimString(req.body?.role_id),
      role_title: trimString(req.body?.role_title),
      name: trimString(req.body?.name),
      email: trimString(req.body?.email).toLowerCase(),
      phone: trimString(req.body?.phone),
      location: trimString(req.body?.location),
      experience: trimString(req.body?.experience),
      portfolio_url: trimString(req.body?.portfolio_url),
      cover_note: trimString(req.body?.cover_note),
    }

    if (!payload.name || !payload.email || !payload.phone || !payload.role_title) {
      res.status(400).json({ error: 'name, email, phone, and role_title are required' })
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      res.status(400).json({ error: 'A valid email address is required' })
      return
    }

    const file = req.file
    if (!file) {
      res.status(400).json({ error: 'A resume file is required' })
      return
    }

    const { path: resumePath, extension } = buildResumePath(file.originalname || '')
    if (!ALLOWED_RESUME_TYPES.has(file.mimetype) && !ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
      res.status(400).json({ error: 'Resume must be a PDF, DOC, or DOCX file' })
      return
    }

    const sb = getSupabaseAdmin()

    const { error: uploadError } = await sb.storage
      .from(RESUME_BUCKET)
      .upload(resumePath, file.buffer, {
        contentType: file.mimetype || 'application/octet-stream',
        upsert: false,
      })

    if (uploadError) {
      if (isMissingBucketError(uploadError)) {
        res.status(503).json({
          error: `Resume storage is not provisioned yet. Create a private "${RESUME_BUCKET}" bucket in Supabase Storage first.`,
        })
        return
      }
      res.status(500).json({ error: uploadError.message })
      return
    }

    const { data, error } = await sb
      .from('career_applications')
      .insert({
        ...payload,
        resume_path: resumePath,
        resume_filename: file.originalname || null,
        resume_size: file.size,
      })
      .select(APPLICATION_COLUMNS)
      .single()

    if (error) {
      // Never leave an orphaned resume behind when the row fails to insert.
      await sb.storage.from(RESUME_BUCKET).remove([resumePath]).catch(() => {})
      if (isMissingTableError(error)) {
        res.status(503).json({
          error:
            'Career application storage is not provisioned yet. Apply the career_applications table schema first.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    // The application is already stored, so a mail failure must never fail the
    // request — the candidate would resubmit and we would hold a duplicate.
    const emailArgs = {
      roleTitle: String(data.role_title),
      name: String(data.name),
      email: String(data.email),
      phone: String(data.phone),
      location: data.location as string | null,
      experience: data.experience as string | null,
      portfolioUrl: data.portfolio_url as string | null,
      coverNote: data.cover_note as string | null,
      resumeFilename: data.resume_filename as string | null,
      applicationId: String(data.id),
    }

    const [adminResult, applicantResult] = await Promise.allSettled([
      sendCareerAdminAlert(emailArgs),
      sendCareerApplicantAck(emailArgs),
    ])

    if (adminResult.status === 'rejected') {
      logRouteError('careers:notify-admin', adminResult.reason)
    }
    if (applicantResult.status === 'rejected') {
      logRouteError('careers:notify-applicant', applicantResult.reason)
    }

    res.status(201).json({
      data,
      notifications: {
        admin: adminResult.status === 'fulfilled',
        applicant: applicantResult.status === 'fulfilled',
      },
    })
  } catch (err) {
    logRouteError('careers:apply', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

// Admin list view.
router.get('/admin/career-applications', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = (req.query.q as string | undefined)?.trim() || ''
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)
    const status = (req.query.status as string | undefined)?.trim() || ''
    const roleId = (req.query.role_id as string | undefined)?.trim() || ''

    let query = sb
      .from('career_applications')
      .select(APPLICATION_COLUMNS, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(
        `name.ilike.%${safe}%,email.ilike.%${safe}%,phone.ilike.%${safe}%,role_title.ilike.%${safe}%,location.ilike.%${safe}%`,
      )
    }
    if (status) query = query.eq('status', status)
    if (roleId) query = query.eq('role_id', roleId)

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({
          data: [],
          count: 0,
          setupRequired: true,
          message:
            'Career application storage is not provisioned yet. Apply the career_applications table schema to your Supabase project.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ data, count: count || 0 })
  } catch (err) {
    logRouteError('careers:list', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.get('/admin/career-applications/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('career_applications')
      .select(APPLICATION_COLUMNS)
      .eq('id', req.params.id)
      .single()

    if (error) {
      res.status(404).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    logRouteError('careers:get', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

router.patch('/admin/career-applications/:id', requireAuth, async (req, res) => {
  try {
    const status = trimString(req.body?.status)
    const allowed = ['new', 'shortlisted', 'interviewing', 'hired', 'rejected']
    if (!allowed.includes(status)) {
      res.status(400).json({ error: `status must be one of: ${allowed.join(', ')}` })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('career_applications')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .select(APPLICATION_COLUMNS)
      .single()

    if (error) {
      res.status(500).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    logRouteError('careers:update', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

// Short-lived signed URL so resumes are never served from a public bucket.
router.get('/admin/career-applications/:id/resume', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data: row, error } = await sb
      .from('career_applications')
      .select('resume_path, resume_filename')
      .eq('id', req.params.id)
      .single()

    if (error || !row?.resume_path) {
      res.status(404).json({ error: 'Resume not found' })
      return
    }

    const { data: signed, error: signError } = await sb.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(row.resume_path, 900, { download: row.resume_filename || true })

    if (signError || !signed?.signedUrl) {
      res.status(500).json({ error: signError?.message || 'Could not sign resume URL' })
      return
    }

    res.json({ data: { url: signed.signedUrl, expires_in: 900 } })
  } catch (err) {
    logRouteError('careers:resume', err)
    res.status(500).json({ error: getErrorMessage(err) })
  }
})

export default router
