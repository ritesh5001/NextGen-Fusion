import { Router } from 'express'
import multer from 'multer'
import { getErrorMessage, logRouteError } from '../lib/http-errors'
import { getSupabaseAdmin } from '../lib/supabase'
import { requireClient } from '../middleware/auth'
import { buildDeliveryUrl, destroyImage, uploadImageBuffer } from '../lib/cloudinary'
import { requireClientTool } from '../lib/client-subscription'

const router = Router()
router.use(requireClientTool('image_library'))

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'))
  },
})

const IMAGE_COLUMNS = 'id, public_id, format, bytes, width, height, original_filename, created_at'

export function retentionDays(): number {
  const parsed = Number(process.env.CLIENT_IMAGE_RETENTION_DAYS)
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 30
}

type ImageRow = {
  id: string
  public_id: string
  format: string | null
  bytes: number | null
  width: number | null
  height: number | null
  original_filename: string | null
  created_at: string
}

function present(row: ImageRow) {
  const expiresAt = new Date(new Date(row.created_at).getTime() + retentionDays() * 24 * 60 * 60 * 1000)
  return {
    id: row.id,
    url: buildDeliveryUrl(row.public_id),
    public_id: row.public_id,
    format: row.format,
    bytes: row.bytes,
    width: row.width,
    height: row.height,
    original_filename: row.original_filename,
    created_at: row.created_at,
    expires_at: expiresAt.toISOString(),
  }
}

router.get('/images', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_images')
      .select(IMAGE_COLUMNS)
      .eq('client_id', req.client_id)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ data: ((data as ImageRow[]) ?? []).map(present) })
  } catch (error) {
    logRouteError('client-images:list', error)
    res.status(500).json({ error: 'Failed to fetch images', details: getErrorMessage(error) })
  }
})

router.post('/images', requireClient, upload.array('files', 10), async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const files = (req.files as Express.Multer.File[] | undefined) ?? []
    if (!files.length) {
      res.status(400).json({ error: 'No image files provided' })
      return
    }

    const supabase = getSupabaseAdmin()
    const created: ReturnType<typeof present>[] = []

    for (const file of files) {
      const uploaded = await uploadImageBuffer(file.buffer, req.client_id, file.originalname)
      const { data, error } = await supabase
        .from('client_images')
        .insert({
          client_id: req.client_id,
          public_id: uploaded.public_id,
          format: uploaded.format,
          bytes: uploaded.bytes,
          width: uploaded.width,
          height: uploaded.height,
          original_filename: file.originalname,
        })
        .select(IMAGE_COLUMNS)
        .single()

      if (error) {
        // Roll back the orphaned Cloudinary asset if the DB insert fails.
        await destroyImage(uploaded.public_id).catch(() => {})
        throw error
      }
      created.push(present(data as ImageRow))
    }

    res.status(201).json({ data: created })
  } catch (error) {
    logRouteError('client-images:upload', error)
    res.status(500).json({ error: 'Failed to upload images', details: getErrorMessage(error) })
  }
})

router.delete('/images/:id', requireClient, async (req, res) => {
  try {
    if (!req.client_id) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('client_images')
      .select('id, public_id')
      .eq('id', req.params.id)
      .eq('client_id', req.client_id)
      .single()

    if (error || !data) {
      res.status(404).json({ error: 'Image not found' })
      return
    }

    await destroyImage(data.public_id)
    const { error: delError } = await supabase
      .from('client_images')
      .delete()
      .eq('id', req.params.id)
      .eq('client_id', req.client_id)

    if (delError) throw delError
    res.json({ ok: true })
  } catch (error) {
    logRouteError('client-images:delete', error)
    res.status(500).json({ error: 'Failed to delete image', details: getErrorMessage(error) })
  }
})

export default router
