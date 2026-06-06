import { fal } from '@fal-ai/client'

export class FalNotConfiguredError extends Error {
  constructor() {
    super('fal.ai is not configured')
    this.name = 'FalNotConfiguredError'
  }
}

let configured = false

function ensureFal(): void {
  if (configured) return
  const key = process.env.FAL_KEY
  if (!key) throw new FalNotConfiguredError()
  fal.config({ credentials: key })
  configured = true
}

type FalImageOutput = { images?: { url?: string }[] }

/**
 * Render a banner with a fal.ai image model. With product images we use the
 * edit model (composites the real product); otherwise the text-to-image model.
 * Model ids are env-overridable; defaults are Google's Nano Banana, which is
 * strong at product compositing and on-image text. fal returns a hosted URL,
 * which we download to a Buffer for the uniform Cloudinary upload step.
 */
export async function generateFalImage(opts: {
  prompt: string
  aspectRatio: string
  productImageUrls: string[]
}): Promise<Buffer> {
  ensureFal()

  const hasImages = opts.productImageUrls.length > 0
  const model = hasImages
    ? process.env.FAL_EDIT_MODEL || 'fal-ai/nano-banana/edit'
    : process.env.FAL_IMAGE_MODEL || 'fal-ai/nano-banana'

  const input: Record<string, unknown> = {
    prompt: opts.prompt,
    num_images: 1,
    output_format: 'jpeg',
    aspect_ratio: opts.aspectRatio,
  }
  if (hasImages) input.image_urls = opts.productImageUrls

  const result = await fal.subscribe(model, { input })
  const data = result.data as FalImageOutput
  const url = data.images?.[0]?.url
  if (!url) throw new Error('fal.ai returned no image')

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download fal.ai image (${res.status})`)
  return Buffer.from(await res.arrayBuffer())
}
