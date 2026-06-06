import OpenAI, { toFile } from 'openai'

export class OpenAINotConfiguredError extends Error {
  constructor() {
    super('OpenAI is not configured')
    this.name = 'OpenAINotConfiguredError'
  }
}

let cached: OpenAI | null = null

export function getOpenAI(): OpenAI {
  if (cached) return cached
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new OpenAINotConfiguredError()
  cached = new OpenAI({ apiKey })
  return cached
}

export function getOpenAIImageModel(): string {
  return process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1'
}

export type ImageSize = '1024x1024' | '1536x1024' | '1024x1536'
export type ImageQuality = 'low' | 'medium' | 'high'

export type InputImage = { buffer: Buffer; filename: string; mediaType: string }

/**
 * Render one banner image with gpt-image-1.
 *
 * When `inputImages` are supplied we use the edits endpoint so the real product
 * photo(s) are composited into the scene; otherwise we generate from text only.
 * gpt-image-1 always returns base64 (no URL), so we decode to a Buffer.
 */
export async function generateBannerImage(opts: {
  prompt: string
  size: ImageSize
  quality: ImageQuality
  inputImages?: InputImage[]
}): Promise<Buffer> {
  const client = getOpenAI()
  const model = getOpenAIImageModel()

  const result =
    opts.inputImages && opts.inputImages.length
      ? await client.images.edit({
          model,
          image: await Promise.all(
            opts.inputImages.map((img) =>
              toFile(img.buffer, img.filename, { type: img.mediaType }),
            ),
          ),
          prompt: opts.prompt,
          size: opts.size,
          quality: opts.quality,
        })
      : await client.images.generate({
          model,
          prompt: opts.prompt,
          size: opts.size,
          quality: opts.quality,
          n: 1,
        })

  const b64 = result.data?.[0]?.b64_json
  if (!b64) throw new Error('OpenAI returned no image data')
  return Buffer.from(b64, 'base64')
}
