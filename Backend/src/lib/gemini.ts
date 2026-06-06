import { GoogleGenAI, Modality, type Part } from '@google/genai'

export class GeminiNotConfiguredError extends Error {
  constructor() {
    super('Gemini is not configured')
    this.name = 'GeminiNotConfiguredError'
  }
}

let cached: GoogleGenAI | null = null

function getGenAI(): GoogleGenAI {
  if (cached) return cached
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) throw new GeminiNotConfiguredError()
  cached = new GoogleGenAI({ apiKey })
  return cached
}

export function getGeminiImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image'
}

export type GeminiInputImage = { data: string; mimeType: string }

/**
 * Render a banner with Gemini's image model (Nano Banana). Product photos are
 * passed inline as base64 parts so the real product is composited into the
 * scene. The model returns inline image bytes, which we decode to a Buffer.
 */
export async function generateGeminiImage(opts: {
  prompt: string
  aspectRatio: string
  productImages: GeminiInputImage[]
}): Promise<Buffer> {
  const ai = getGenAI()

  const parts: Part[] = [{ text: opts.prompt }]
  for (const img of opts.productImages) {
    parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } })
  }

  const res = await ai.models.generateContent({
    model: getGeminiImageModel(),
    contents: [{ role: 'user', parts }],
    config: {
      responseModalities: [Modality.IMAGE],
      imageConfig: { aspectRatio: opts.aspectRatio },
    },
  })

  const outParts = res.candidates?.[0]?.content?.parts ?? []
  for (const p of outParts) {
    const data = p.inlineData?.data
    if (data) return Buffer.from(data, 'base64')
  }
  throw new Error('Gemini returned no image')
}
