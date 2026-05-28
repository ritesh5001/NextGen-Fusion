import { getSupabaseAdmin } from './supabase'
import { destroyImage } from './cloudinary'
import { logRouteError } from './http-errors'
import { retentionDays } from '../routes/client-images'

export async function cleanupExpiredImages(): Promise<{ deleted: number; errors: number }> {
  const supabase = getSupabaseAdmin()
  const cutoff = new Date(Date.now() - retentionDays() * 24 * 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from('client_images')
    .select('id, public_id')
    .lt('created_at', cutoff)
    .limit(500)

  if (error) throw error
  const rows = (data as { id: string; public_id: string }[]) ?? []

  let deleted = 0
  let errors = 0
  for (const row of rows) {
    try {
      await destroyImage(row.public_id)
      const { error: delError } = await supabase.from('client_images').delete().eq('id', row.id)
      if (delError) throw delError
      deleted++
    } catch (err) {
      errors++
      logRouteError('image-cleanup', err)
    }
  }

  return { deleted, errors }
}

export function startImageCleanupWorker(): void {
  if (process.env.IMAGE_CLEANUP_ENABLED === 'false') return
  const runDaily = 24 * 60 * 60 * 1000
  const run = () => {
    cleanupExpiredImages()
      .then(({ deleted, errors }) => {
        if (deleted || errors) console.log(`[image-cleanup] deleted=${deleted} errors=${errors}`)
      })
      .catch((err) => logRouteError('image-cleanup:worker', err))
  }
  // Defer the first run so startup isn't blocked, then run once a day.
  setTimeout(run, 60 * 1000)
  setInterval(run, runDaily)
}
