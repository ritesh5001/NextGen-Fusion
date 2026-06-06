import { generateStructured, type JsonSchema } from './anthropic'
import {
  generateBannerImage,
  type ImageQuality,
  type ImageSize,
  type InputImage,
} from './openai'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BannerType = 'ecommerce' | 'service'
export type BannerMode = 'auto' | 'guided'
export type BannerRatio = '16:9' | '7:3' | '1:1'

export type BannerInputs = {
  bannerType: BannerType
  mode: BannerMode
  ratio: BannerRatio
  quality: ImageQuality
  brandName: string
  websiteUrl?: string
  tagline?: string
  brief?: string // free-text used in "auto" mode
  headline?: string // guided mode
  subtext?: string // guided mode
  cta?: string // guided mode
  background?: string // guided mode — desired background / scene style
  colors?: string // guided mode — brand colors
  productImageUrls: string[]
}

// gpt-image-1 only renders these native sizes. Wide ratios are generated as the
// closest landscape native size and cropped to the target ratio on delivery.
export const RATIO_TO_SIZE: Record<BannerRatio, ImageSize> = {
  '1:1': '1024x1024',
  '16:9': '1536x1024',
  '7:3': '1536x1024',
}

const PROMPT_SCHEMA: JsonSchema = {
  type: 'object',
  properties: { prompt: { type: 'string' } },
  required: ['prompt'],
  additionalProperties: false,
}

// ---------------------------------------------------------------------------
// Prompt crafting (Claude) — turns the brief into an art-directed image prompt
// ---------------------------------------------------------------------------

function ratioBrief(ratio: BannerRatio): string {
  if (ratio === '1:1') {
    return 'a SQUARE 1:1 mobile/phone banner — full square is visible, compose for a centered focal point.'
  }
  // 16:9 and 7:3 are cropped from a 3:2 landscape render.
  const target = ratio === '16:9' ? '16:9 widescreen' : '7:3 ultra-wide hero'
  return (
    `a WIDE DESKTOP ${target} banner. IMPORTANT: it is rendered at 3:2 then center-cropped to ` +
    `${ratio}, so keep ALL text, logos and the product inside the central horizontal band — the ` +
    `top and bottom ~20% may be cut off. Leave generous safe margins; never place key elements ` +
    `near the top or bottom edge.`
  )
}

const PROMPT_SYSTEM = `You are a senior advertising art director who writes prompts for the
gpt-image-1 image model. Given a brand brief, you output ONE richly detailed, production-ready
image-generation prompt for a single marketing banner. Rules:
- Describe layout, composition, lighting, color palette, mood, typography style, and the EXACT
  text to render in the image (headline, offer, call-to-action) in quotes — gpt-image-1 renders
  text well, so spell it out precisely and keep on-image text short and punchy.
- Respect the requested aspect ratio and safe-area guidance literally.
- For ecommerce banners: make the product the hero, with a clean commercial backdrop, offer/price
  badge if provided, and a clear CTA button shape. If a product photo is supplied as a reference
  image, instruct that the real product be placed naturally into the scene with correct lighting
  and shadows — do not redraw or distort it.
- For service banners: lead with the value proposition and a confident, trustworthy aesthetic;
  product photos are optional.
- Use the brand colors when given; otherwise choose a tasteful palette that fits the brand.
- Output ONLY the JSON object {"prompt": "..."} — the prompt is a single paragraph, no markdown.`

export async function craftBannerPrompt(inputs: BannerInputs): Promise<string> {
  const hasProduct = inputs.productImageUrls.length > 0
  const lines = [
    `Banner type: ${inputs.bannerType}`,
    `Aspect ratio: ${inputs.ratio} — ${ratioBrief(inputs.ratio)}`,
    `Brand name: ${inputs.brandName}`,
    inputs.websiteUrl ? `Website: ${inputs.websiteUrl}` : '',
    inputs.tagline ? `Tagline: ${inputs.tagline}` : '',
    inputs.colors ? `Brand colors: ${inputs.colors}` : '',
    inputs.background ? `Desired background / scene: ${inputs.background}` : '',
    inputs.headline ? `Headline text to render: "${inputs.headline}"` : '',
    inputs.subtext ? `Sub-text to render: "${inputs.subtext}"` : '',
    inputs.cta ? `Call-to-action button text: "${inputs.cta}"` : '',
    inputs.brief ? `Free-form brief: ${inputs.brief}` : '',
    hasProduct
      ? `A real product photo (${inputs.productImageUrls.length} image(s)) is provided as a reference and MUST be composited into the banner.`
      : `No product photo provided — design a text-and-graphics banner.`,
    inputs.mode === 'auto'
      ? 'Mode: AUTO — you decide the headline, layout and styling that best sells this brand.'
      : 'Mode: GUIDED — honor the provided headline/sub-text/CTA/background as closely as possible.',
  ].filter(Boolean)

  const { data } = await generateStructured<{ prompt: string }>({
    system: PROMPT_SYSTEM,
    prompt: `Write the image prompt for this banner:\n\n${lines.join('\n')}`,
    schema: PROMPT_SCHEMA,
    maxTokens: 2000,
  })
  return data.prompt.trim()
}

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

async function fetchInputImage(url: string, index: number): Promise<InputImage> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch product image (${res.status})`)
  const mediaType = res.headers.get('content-type') || 'image/jpeg'
  const ext = mediaType.includes('png') ? 'png' : mediaType.includes('webp') ? 'webp' : 'jpg'
  const buffer = Buffer.from(await res.arrayBuffer())
  return { buffer, filename: `product-${index}.${ext}`, mediaType }
}

export async function generateBanner(
  inputs: BannerInputs,
): Promise<{ buffer: Buffer; prompt: string }> {
  const prompt = await craftBannerPrompt(inputs)

  const inputImages = inputs.productImageUrls.length
    ? await Promise.all(inputs.productImageUrls.map((url, i) => fetchInputImage(url, i)))
    : undefined

  const buffer = await generateBannerImage({
    prompt,
    size: RATIO_TO_SIZE[inputs.ratio],
    quality: inputs.quality,
    inputImages,
  })

  return { buffer, prompt }
}
