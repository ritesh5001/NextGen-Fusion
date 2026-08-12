import { getSupabaseAdmin } from '../supabase'
import { buildDeliveryUrl, uploadImageBufferToFolder } from '../cloudinary'
import { downloadFile } from './telegram'
import type { PfInboundMedia, PfSource } from './message'

// Telegram's own file URLs expire and embed the bot token, so every image is
// copied to Cloudinary immediately and only the Cloudinary URL is kept.
//
// Note: buildDeliveryUrl() intentionally produces a comma-free URL — the
// WooCommerce CSV "Images" column splits on commas.

const MAX_IMAGE_BYTES = 20 * 1024 * 1024

export type StoredImage = {
  id: string
  url: string
  publicId: string
  position: number
}

function folderFor(clientId: string, projectId: string | null): string {
  // Mirrors the spec's products/<project>/<product>/ layout, scoped under the
  // existing "ngf/" Cloudinary namespace used by the rest of the app.
  return projectId
    ? `ngf/productflow/${clientId}/${projectId}`
    : `ngf/productflow/${clientId}/unassigned`
}

/**
 * Downloads one channel media item and stores it in Cloudinary + pf_product_images.
 *
 * Idempotent: a repeated webhook delivery for the same source file id returns
 * the existing row instead of uploading a second copy.
 */
export async function storeInboundImage(opts: {
  token: string
  source: PfSource
  media: PfInboundMedia
  clientId: string
  projectId: string | null
  messageId: string | null
  position: number
}): Promise<StoredImage> {
  const supabase = getSupabaseAdmin()

  const { data: existing } = await supabase
    .from('pf_product_images')
    .select('id, url, cloudinary_public_id, position')
    .eq('source', opts.source)
    .eq('source_file_id', opts.media.fileId)
    .maybeSingle()

  if (existing?.url) {
    return {
      id: existing.id as string,
      url: existing.url as string,
      publicId: (existing.cloudinary_public_id as string) ?? '',
      position: (existing.position as number) ?? opts.position,
    }
  }

  if (opts.media.fileSize && opts.media.fileSize > MAX_IMAGE_BYTES) {
    throw new Error(`Image is too large (${Math.round(opts.media.fileSize / 1024 / 1024)}MB)`)
  }

  const { buffer, mimeType, filePath } = await downloadFile(opts.token, opts.media.fileId)

  const uploaded = await uploadImageBufferToFolder(
    buffer,
    folderFor(opts.clientId, opts.projectId),
    opts.media.filename,
  )
  const url = buildDeliveryUrl(uploaded.public_id)

  const { data, error } = await supabase
    .from('pf_product_images')
    .insert({
      client_id: opts.clientId,
      project_id: opts.projectId,
      message_id: opts.messageId,
      source: opts.source,
      source_file_id: opts.media.fileId,
      cloudinary_public_id: uploaded.public_id,
      url,
      filename: opts.media.filename ?? filePath.split('/').pop() ?? null,
      mime_type: opts.media.mimeType ?? mimeType,
      width: uploaded.width,
      height: uploaded.height,
      file_size: uploaded.bytes,
      position: opts.position,
      status: 'stored',
    })
    .select('id, url, cloudinary_public_id, position')
    .single()

  if (error) throw error

  return {
    id: data.id as string,
    url: data.url as string,
    publicId: data.cloudinary_public_id as string,
    position: data.position as number,
  }
}

/** Records an image we failed to store, so nothing disappears silently. */
export async function recordImageFailure(opts: {
  source: PfSource
  fileId: string
  clientId: string
  projectId: string | null
  messageId: string | null
  position: number
  error: string
}): Promise<void> {
  await getSupabaseAdmin()
    .from('pf_product_images')
    .insert({
      client_id: opts.clientId,
      project_id: opts.projectId,
      message_id: opts.messageId,
      source: opts.source,
      source_file_id: opts.fileId,
      position: opts.position,
      status: 'failed',
      error: opts.error.slice(0, 500),
    })
}
