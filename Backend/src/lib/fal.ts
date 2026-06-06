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

// Each fal model family has its own text-to-image and edit endpoints plus a
// different input schema, so we adapt per family. "nano" = Google Nano Banana
// (best product compositor, takes aspect_ratio + image_urls); "flux" = FLUX.1
// (takes image_size; image-to-image takes a single image_url).
type FalSchema = 'nano' | 'flux'
type FalModelDef = { textModel: string; editModel: string; schema: FalSchema }

export const FAL_MODELS: Record<string, FalModelDef> = {
  'fal-ai/nano-banana': {
    textModel: 'fal-ai/nano-banana',
    editModel: 'fal-ai/nano-banana/edit',
    schema: 'nano',
  },
  'fal-ai/flux/dev': {
    textModel: 'fal-ai/flux/dev',
    editModel: 'fal-ai/flux/dev/image-to-image',
    schema: 'flux',
  },
  'fal-ai/flux/schnell': {
    textModel: 'fal-ai/flux/schnell',
    editModel: 'fal-ai/flux/schnell',
    schema: 'flux',
  },
}

const DEFAULT_FAL_MODEL = 'fal-ai/nano-banana'

function fluxImageSize(aspectRatio: string): string {
  return aspectRatio === '1:1' ? 'square_hd' : 'landscape_16_9'
}

/**
 * Render a banner with a fal.ai image model. With product images we use the
 * family's edit endpoint (Nano Banana composites the real product); otherwise
 * the text-to-image endpoint. fal returns a hosted URL, which we download to a
 * Buffer for the uniform Cloudinary upload step.
 */
export async function generateFalImage(opts: {
  prompt: string
  model: string
  aspectRatio: string
  productImageUrls: string[]
}): Promise<Buffer> {
  ensureFal()

  const def = FAL_MODELS[opts.model] ?? FAL_MODELS[DEFAULT_FAL_MODEL]
  const hasImages = opts.productImageUrls.length > 0
  const endpoint = hasImages ? def.editModel : def.textModel

  let input: Record<string, unknown>
  if (def.schema === 'nano') {
    input = {
      prompt: opts.prompt,
      num_images: 1,
      output_format: 'jpeg',
      aspect_ratio: opts.aspectRatio,
    }
    if (hasImages) input.image_urls = opts.productImageUrls
  } else if (hasImages && endpoint.includes('image-to-image')) {
    input = {
      prompt: opts.prompt,
      image_url: opts.productImageUrls[0],
      strength: 0.85,
      num_images: 1,
    }
  } else {
    input = {
      prompt: opts.prompt,
      image_size: fluxImageSize(opts.aspectRatio),
      num_images: 1,
    }
  }

  const result = await fal.subscribe(endpoint, { input })
  const data = result.data as FalImageOutput
  const url = data.images?.[0]?.url
  if (!url) throw new Error('fal.ai returned no image')

  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download fal.ai image (${res.status})`)
  return Buffer.from(await res.arrayBuffer())
}
