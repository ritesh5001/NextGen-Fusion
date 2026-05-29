export class AiNotConfiguredError extends Error {
  constructor() {
    super('AI is not configured')
    this.name = 'AiNotConfiguredError'
  }
}

function stripCodeFences(value: string): string {
  return value.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

const SYSTEM_PROMPT =
  'You are an e-commerce copywriter. Look at the product photo and return ONLY JSON with exactly two keys: "title" and "description". ' +
  'Title: a concise product name, max 70 characters, no surrounding quotes. ' +
  'Description: 2-3 plain, factual sentences about what is visible in the photo (materials, color, type, notable features). ' +
  'Do not invent specifications, brands, sizes, or prices that are not clearly visible.'

export async function generateProductCopyFromImage(
  imageUrl: string,
  hint?: string,
): Promise<{ title: string; description: string }> {
  const provider = process.env.GROQ_API_KEY ? 'groq' : process.env.XAI_API_KEY ? 'xai' : null
  const apiKey = process.env.GROQ_API_KEY || process.env.XAI_API_KEY
  if (!provider || !apiKey) throw new AiNotConfiguredError()

  const model =
    provider === 'groq'
      ? process.env.GROQ_VISION_MODEL || 'meta-llama/llama-4-scout-17b-16e-instruct'
      : process.env.XAI_VISION_MODEL || 'grok-2-vision-1212'

  const response = await fetch(
    provider === 'groq'
      ? 'https://api.groq.com/openai/v1/chat/completions'
      : 'https://api.x.ai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: 400,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: hint && hint.trim()
                  ? `Generate a product title and description for this image. The seller added this detail to help you understand it — treat it as accurate and use it, especially if the photo is unclear: "${hint.trim()}"`
                  : 'Generate a product title and description for this image.',
              },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`${provider === 'groq' ? 'Groq' : 'xAI'} request failed: ${response.status}`)
  }
  const json = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> }
  const content = json.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('AI returned empty content')

  const parsed = JSON.parse(stripCodeFences(content)) as { title?: unknown; description?: unknown }
  const title = typeof parsed.title === 'string' ? parsed.title.trim().slice(0, 120) : ''
  const description = typeof parsed.description === 'string' ? parsed.description.trim().slice(0, 2000) : ''
  if (!title && !description) throw new Error('AI returned no usable copy')

  return { title, description }
}
