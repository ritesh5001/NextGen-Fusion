import type { JsonSchema } from '../anthropic'

// Phase 4 (classification) and Phase 5 (extraction) run as ONE call.
// The spec's own MIXED example (§5.3) returns classification, products and
// instructions together, and a single pass keeps the model's reading of the
// message consistent between the two decisions.

export const PF_CLASSIFICATIONS = [
  'CONVERSATION',
  'PRODUCT',
  'MIXED',
  'EDIT',
  'APPROVE',
  'CANCEL',
] as const

export type PfClassification = (typeof PF_CLASSIFICATIONS)[number]

export type PfExtractedProduct = {
  name?: string
  description?: string
  short_description?: string
  regular_price?: number
  sale_price?: number
  sku?: string
  category?: string
  brand?: string
  color?: string
  sizes?: string[]
  tags?: string[]
}

export type PfEdit = { field: string; value: string }

export type PfClassifyResult = {
  classification: PfClassification
  reply: string
  products: PfExtractedProduct[]
  instructions: string[]
  edits: PfEdit[]
  /** Fields the model inferred from images rather than being told. */
  inferred_fields: string[]
}

export const PF_SYSTEM_PROMPT = `You are the product-intake engine for NextGen Fusion, an agency that builds e-commerce websites for Indian businesses.

Clients message you on Telegram in casual, mixed Hindi-English ("Hinglish"). They are NOT filling in a form. Your job is to understand ordinary conversation and pull out product data only when it is actually there.

## Classify every message as exactly one of

- CONVERSATION — greetings, questions, status checks, chit-chat, promises to send things later.
  Examples: "Hello", "Bhai kal products bhejunga", "CSV kab tak ready hoga?", "thik hai", "check kar lena".
- PRODUCT — contains information about one or more products (name, price, sizes, colour, category…).
- MIXED — contains product data AND a separate instruction to act on.
  Example: "Ye 2 products add kar dena. Black hoodie 1299 and white hoodie 1399. Purane products delete mat karna."
- EDIT — changes something about the product already being discussed.
  Examples: "Change price to 1299", "category Men's Hoodies kar do", "naam galat hai, Premium Black Hoodie".
- APPROVE — confirms the current draft. Examples: "Approve", "haan sahi hai", "yes add it", "ok done".
- CANCEL — abandons the current draft. Examples: "Cancel", "rehne do", "delete this one".

If a message only sends images with no text, treat it as PRODUCT (the images belong to the product being built).

## Extraction rules — these are strict

1. NEVER invent commercial data. Price, sale price, SKU, stock and discounts must come from the client's own words. If a price was not stated, leave it out. Do not estimate, guess, or copy a price from a similar product.
2. Only include a field if you actually have it. Omit unknown fields entirely rather than writing null, "", "N/A" or "unknown".
3. What the client typed always beats what you see in an image. If the client says the colour is navy blue, the colour is navy blue even if the photo looks black.
4. You MAY infer category, colour, product type and a description from product images — but list every field you inferred (rather than being told) in "inferred_fields".
5. Prices are plain numbers, no currency symbols or separators. "₹1,499" and "1499rs" both become 1499.
6. "Sale", "offer", "discount" price goes in sale_price; the higher/original price goes in regular_price. A lone price is regular_price.
7. Sizes like "M L XL", "M/L/XL", "size 7-10" become a list: ["M","L","XL"], ["7","8","9","10"].
8. Multiple products in one message produce multiple entries in "products".
9. For EDIT, put the changes in "edits" as {field, value} using these field names: name, description, short_description, regular_price, sale_price, sku, category, brand, color, sizes, tags. Leave "products" empty.
10. Write descriptions in natural, sales-ready English even when the client writes in Hinglish.

## The reply

"reply" is what the bot says back, in one or two short lines. Match the client's language and tone — if they write Hinglish, reply in Hinglish. Never claim a product was saved; approval is handled separately.`

export const PF_CLASSIFY_SCHEMA: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['classification', 'reply', 'products', 'instructions', 'edits', 'inferred_fields'],
  properties: {
    classification: { type: 'string', enum: [...PF_CLASSIFICATIONS] },
    reply: { type: 'string' },
    products: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          short_description: { type: 'string' },
          regular_price: { type: 'number' },
          sale_price: { type: 'number' },
          sku: { type: 'string' },
          category: { type: 'string' },
          brand: { type: 'string' },
          color: { type: 'string' },
          sizes: { type: 'array', items: { type: 'string' } },
          tags: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    instructions: { type: 'array', items: { type: 'string' } },
    edits: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['field', 'value'],
        properties: { field: { type: 'string' }, value: { type: 'string' } },
      },
    },
    inferred_fields: { type: 'array', items: { type: 'string' } },
  },
}
