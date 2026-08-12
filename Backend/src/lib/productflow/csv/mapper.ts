// Phase 8: turns one internal product record into one CSV row for a given
// project template (spec §22).
//
// A template is `columns` (ordered headers) + `mapping` ({ column: token }).
// One product engine, many website formats — adding a platform is data, not code.

export type PfProductRecord = {
  id: string
  name: string
  sku: string | null
  description: string | null
  short_description: string | null
  regular_price: number | null
  sale_price: number | null
  category: string | null
  brand: string | null
  tags: string[]
  attributes: Record<string, unknown>
  images: string[]
}

/**
 * Tokens a template's `mapping` may use.
 *
 * Anything prefixed `=` is a literal (e.g. "=simple" for WooCommerce's Type
 * column, "=1" for Published). An unrecognised token yields an empty cell
 * rather than throwing, so a slightly-wrong template still exports.
 */
export const PF_MAPPING_TOKENS = [
  'name',
  'sku',
  'description',
  'short_description',
  'regular_price',
  'sale_price',
  'price',
  'category',
  'brand',
  'tags',
  'images',
  'image_first',
  'color',
  'sizes',
  'slug',
  'id',
] as const

export type PfMappingToken = (typeof PF_MAPPING_TOKENS)[number]

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function attr(product: PfProductRecord, key: string): string {
  const value = product.attributes?.[key]
  if (Array.isArray(value)) return value.join(', ')
  return value == null ? '' : String(value)
}

/**
 * Neutralises spreadsheet formula injection.
 *
 * A product named "=cmd|' /c calc'!A1" would execute on open in Excel. Client
 * text reaches this file unmodified, so a leading =, +, - or @ is prefixed with
 * an apostrophe — the standard, display-safe mitigation.
 */
export function sanitizeCell(value: string): string {
  if (!value) return value
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
}

export function resolveToken(product: PfProductRecord, token: string): string {
  const raw = String(token ?? '').trim()
  if (!raw) return ''

  // Literal
  if (raw.startsWith('=')) return raw.slice(1)

  switch (raw as PfMappingToken) {
    case 'name':
      return product.name ?? ''
    case 'sku':
      return product.sku ?? ''
    case 'description':
      return product.description ?? ''
    case 'short_description':
      return product.short_description ?? ''
    case 'regular_price':
      return product.regular_price == null ? '' : String(product.regular_price)
    case 'sale_price':
      return product.sale_price == null ? '' : String(product.sale_price)
    // The single price a storefront should charge.
    case 'price':
      return String(product.sale_price ?? product.regular_price ?? '')
    case 'category':
      return product.category ?? ''
    case 'brand':
      return product.brand ?? ''
    case 'tags':
      return (product.tags ?? []).join(', ')
    // WooCommerce splits this column on commas, which is why the Cloudinary
    // delivery URLs are built comma-free.
    case 'images':
      return (product.images ?? []).join(', ')
    case 'image_first':
      return product.images?.[0] ?? ''
    case 'color':
      return attr(product, 'color')
    case 'sizes':
      return attr(product, 'sizes')
    case 'slug':
      return slugify(product.name ?? '')
    case 'id':
      return product.id
    default:
      return ''
  }
}

export type PfTemplate = {
  id?: string
  name: string
  platform: string
  columns: string[]
  mapping: Record<string, string>
  rules?: Record<string, unknown>
}

export function buildRow(
  product: PfProductRecord,
  template: PfTemplate,
): Record<string, string> {
  const row: Record<string, string> = {}
  for (const column of template.columns) {
    row[column] = sanitizeCell(resolveToken(product, template.mapping[column] ?? ''))
  }
  return row
}

/**
 * Shopify needs one row per variant sharing a Handle, so a product with sizes
 * expands into several rows (spec §21). Platforms without variant rows return
 * a single row.
 */
export function buildRows(
  product: PfProductRecord,
  template: PfTemplate,
): Record<string, string>[] {
  const variantColumn = (template.rules?.variantColumn as string) ?? null
  const variantSource = (template.rules?.variantSource as string) ?? 'sizes'

  if (!variantColumn) return [buildRow(product, template)]

  const values = product.attributes?.[variantSource]
  const variants = Array.isArray(values) ? values.map(String).filter(Boolean) : []
  if (variants.length <= 1) return [buildRow(product, template)]

  const base = buildRow(product, template)
  return variants.map((variant, index) => {
    const row = { ...base, [variantColumn]: sanitizeCell(variant) }
    if (index > 0) {
      // Shopify repeats only the Handle and variant fields on extra rows;
      // duplicating title/body/images would create separate products.
      for (const column of (template.rules?.variantBlankColumns as string[]) ?? []) {
        if (column in row) row[column] = ''
      }
    }
    return row
  })
}
