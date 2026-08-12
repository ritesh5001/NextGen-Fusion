import { getSupabaseAdmin } from '../supabase'
import type { PfExtractedProduct } from './prompts'

// Phase 6: the conversation state that turns a stream of messages into one
// product. A client has at most one OPEN draft; every product message merges
// into it until they approve or cancel.

export const PF_OPEN_STATUSES = ['DRAFT', 'NEEDS_INFORMATION', 'READY_FOR_REVIEW'] as const

export type PfDraftStatus =
  | 'DRAFT'
  | 'NEEDS_INFORMATION'
  | 'READY_FOR_REVIEW'
  | 'APPROVED'
  | 'CANCELLED'

export type PfDraft = {
  id: string
  client_id: string
  project_id: string | null
  status: PfDraftStatus
  product_data: Record<string, unknown>
  missing_fields: string[]
}

const DRAFT_COLUMNS = 'id, client_id, project_id, status, product_data, missing_fields'

// Fields a client can set, and the draft key each maps to. Anything outside
// this list is ignored, so the AI can never write an arbitrary column.
export const PF_EDITABLE_FIELDS: Record<string, string> = {
  name: 'name',
  title: 'name',
  description: 'description',
  short_description: 'short_description',
  price: 'regular_price',
  regular_price: 'regular_price',
  sale_price: 'sale_price',
  sale: 'sale_price',
  sku: 'sku',
  category: 'category',
  brand: 'brand',
  color: 'color',
  colour: 'color',
  size: 'sizes',
  sizes: 'sizes',
  tags: 'tags',
}

const NUMERIC_FIELDS = new Set(['regular_price', 'sale_price'])
const LIST_FIELDS = new Set(['sizes', 'tags'])

export async function getOpenDraft(clientId: string): Promise<PfDraft | null> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_drafts')
    .select(DRAFT_COLUMNS)
    .eq('client_id', clientId)
    .in('status', PF_OPEN_STATUSES as unknown as string[])
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (data as PfDraft) ?? null
}

export async function createDraft(
  clientId: string,
  projectId: string | null,
  productData: Record<string, unknown>,
): Promise<PfDraft> {
  const { data, error } = await getSupabaseAdmin()
    .from('pf_product_drafts')
    .insert({
      client_id: clientId,
      project_id: projectId,
      status: 'DRAFT',
      product_data: productData,
    })
    .select(DRAFT_COLUMNS)
    .single()

  if (error) throw error
  return data as PfDraft
}

/**
 * Merges newly extracted data into an existing draft.
 *
 * Follows the spec's priority order (§17): a value the client already gave is
 * never overwritten by a later AI *inference*. An explicit restatement does
 * overwrite — that is how a client corrects themselves mid-conversation.
 */
export function mergeProductData(
  existing: Record<string, unknown>,
  incoming: PfExtractedProduct,
  inferredFields: string[] = [],
): Record<string, unknown> {
  const merged = { ...existing }
  const inferred = new Set(inferredFields)

  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value) && value.length === 0) continue

    const alreadySet =
      merged[key] !== undefined &&
      merged[key] !== null &&
      merged[key] !== '' &&
      !(Array.isArray(merged[key]) && (merged[key] as unknown[]).length === 0)

    if (alreadySet && inferred.has(key)) continue

    merged[key] = value
  }

  return merged
}

/** Applies an explicit "change X to Y" instruction. */
export function applyEdits(
  existing: Record<string, unknown>,
  edits: { field: string; value: string }[],
): { data: Record<string, unknown>; applied: string[] } {
  const data = { ...existing }
  const applied: string[] = []

  for (const edit of edits) {
    const key = PF_EDITABLE_FIELDS[edit.field.trim().toLowerCase()]
    if (!key) continue

    if (NUMERIC_FIELDS.has(key)) {
      const n = Number(edit.value.replace(/[^\d.]/g, ''))
      if (!Number.isFinite(n) || n <= 0) continue
      data[key] = n
    } else if (LIST_FIELDS.has(key)) {
      const items = edit.value
        .split(/[,/|]|\s{2,}/)
        .map((s) => s.trim())
        .filter(Boolean)
      if (!items.length) continue
      data[key] = items
    } else {
      const v = edit.value.trim()
      if (!v) continue
      data[key] = v
    }
    applied.push(key)
  }

  return { data, applied }
}

// Which draft key satisfies each configurable requirement name.
const REQUIREMENT_KEYS: Record<string, string> = {
  name: 'name',
  price: 'regular_price',
  regular_price: 'regular_price',
  category: 'category',
  description: 'description',
  brand: 'brand',
  color: 'color',
  sizes: 'sizes',
  sku: 'sku',
}

/**
 * Which required fields are still missing. `images` is checked against stored
 * images rather than the JSON blob, since images live in their own table.
 */
export function findMissingFields(
  productData: Record<string, unknown>,
  requiredFields: string[],
  imageCount: number,
): string[] {
  const missing: string[] = []

  for (const requirement of requiredFields) {
    const name = String(requirement).toLowerCase()

    if (name === 'images') {
      if (imageCount === 0) missing.push('images')
      continue
    }

    const key = REQUIREMENT_KEYS[name] ?? name
    const value = productData[key]
    const present =
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)

    if (!present) missing.push(name)
  }

  return missing
}

export async function updateDraft(
  id: string,
  patch: {
    productData?: Record<string, unknown>
    status?: PfDraftStatus
    missingFields?: string[]
    lastQuestion?: string | null
  },
): Promise<PfDraft> {
  const update: Record<string, unknown> = {}
  if (patch.productData !== undefined) update.product_data = patch.productData
  if (patch.status !== undefined) update.status = patch.status
  if (patch.missingFields !== undefined) update.missing_fields = patch.missingFields
  if (patch.lastQuestion !== undefined) update.last_question = patch.lastQuestion

  const { data, error } = await getSupabaseAdmin()
    .from('pf_product_drafts')
    .update(update)
    .eq('id', id)
    .select(DRAFT_COLUMNS)
    .single()

  if (error) throw error
  return data as PfDraft
}

/**
 * Attaches every image the client has sent that is not yet tied to a draft.
 * Images arrive before or after the text that describes them, so they are
 * captured unassigned and claimed by whichever draft is open.
 */
export async function attachLooseImages(clientId: string, draftId: string): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('pf_product_images')
    .update({ draft_id: draftId })
    .eq('client_id', clientId)
    .eq('status', 'stored')
    .is('draft_id', null)
    .is('product_id', null)
    .select('id')

  if (error) throw error
  return data?.length ?? 0
}

export async function getDraftImages(draftId: string): Promise<{ id: string; url: string }[]> {
  const { data } = await getSupabaseAdmin()
    .from('pf_product_images')
    .select('id, url')
    .eq('draft_id', draftId)
    .eq('status', 'stored')
    .order('position', { ascending: true })

  return ((data ?? []) as { id: string; url: string | null }[])
    .filter((i): i is { id: string; url: string } => Boolean(i.url))
}

/**
 * Turns an approved draft into a product row and hands its images over.
 * Returns null if the draft has no name — the one field a product cannot lack.
 */
export async function approveDraft(draft: PfDraft): Promise<{ id: string; name: string } | null> {
  const supabase = getSupabaseAdmin()
  const d = draft.product_data as Record<string, unknown>

  const name = typeof d.name === 'string' ? d.name.trim() : ''
  if (!name) return null

  const attributes: Record<string, unknown> = {}
  if (d.color) attributes.color = d.color
  if (d.sizes) attributes.sizes = d.sizes

  const { data: product, error } = await supabase
    .from('pf_products')
    .insert({
      client_id: draft.client_id,
      project_id: draft.project_id,
      draft_id: draft.id,
      name,
      sku: (d.sku as string) ?? null,
      description: (d.description as string) ?? null,
      short_description: (d.short_description as string) ?? null,
      regular_price: (d.regular_price as number) ?? null,
      sale_price: (d.sale_price as number) ?? null,
      category: (d.category as string) ?? null,
      brand: (d.brand as string) ?? null,
      tags: (d.tags as string[]) ?? [],
      attributes,
      status: 'APPROVED',
    })
    .select('id, name')
    .single()

  if (error) throw error

  await supabase
    .from('pf_product_images')
    .update({ product_id: product.id })
    .eq('draft_id', draft.id)

  await updateDraft(draft.id, { status: 'APPROVED' })

  return product as { id: string; name: string }
}

export async function cancelDraft(draftId: string): Promise<void> {
  await updateDraft(draftId, { status: 'CANCELLED' })
}
