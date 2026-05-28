import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

let configured = false

function getCloudinary() {
  if (configured) return cloudinary
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
  const api_key = process.env.CLOUDINARY_API_KEY
  const api_secret = process.env.CLOUDINARY_API_SECRET
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      'Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.',
    )
  }
  cloudinary.config({ cloud_name, api_key, api_secret, secure: true })
  configured = true
  return cloudinary
}

export type UploadedImage = {
  public_id: string
  format: string | null
  bytes: number | null
  width: number | null
  height: number | null
}

// Compress on the way in: cap the long edge and let Cloudinary pick quality/format.
const INCOMING_TRANSFORM = { width: 1600, crop: 'limit', quality: 'auto:good', fetch_format: 'auto' }

// Delivery transform: a SINGLE comma-free param + a ".jpg" extension.
// Width/crop is intentionally omitted because the incoming transform already
// caps the stored image to 1600px — and WooCommerce's CSV "Images" column
// splits on commas, so the URL must not contain any (e.g. "c_limit,w_1600").
const DELIVERY_TRANSFORM = { quality: 'auto' }

export function uploadImageBuffer(
  buffer: Buffer,
  clientId: string,
  filename?: string,
): Promise<UploadedImage> {
  const cld = getCloudinary()
  return new Promise((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder: `ngf/clients/${clientId}`,
        resource_type: 'image',
        transformation: [INCOMING_TRANSFORM],
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          reject(error || new Error('Cloudinary upload failed'))
          return
        }
        resolve({
          public_id: result.public_id,
          format: result.format ?? null,
          bytes: result.bytes ?? null,
          width: result.width ?? null,
          height: result.height ?? null,
        })
      },
    )
    stream.end(buffer)
    void filename
  })
}

export function buildDeliveryUrl(publicId: string): string {
  return getCloudinary().url(publicId, { secure: true, format: 'jpg', transformation: [DELIVERY_TRANSFORM] })
}

export async function destroyImage(publicId: string): Promise<void> {
  await getCloudinary().uploader.destroy(publicId, { resource_type: 'image', invalidate: true })
}
