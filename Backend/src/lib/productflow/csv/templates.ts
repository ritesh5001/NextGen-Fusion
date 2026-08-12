import { getSupabaseAdmin } from '../../supabase'
import type { PfTemplate } from './mapper'

// Built-in starting points. They are seeded into pf_csv_templates as ordinary
// editable rows — nothing in the engine treats them as special, so a client
// with an unusual importer can be served by editing columns/mapping in the
// admin panel rather than by shipping code.

export const WOOCOMMERCE_TEMPLATE: PfTemplate = {
  name: 'WooCommerce (default)',
  platform: 'woocommerce',
  columns: [
    'ID',
    'Type',
    'SKU',
    'Name',
    'Published',
    'Regular price',
    'Sale price',
    'Categories',
    'Tags',
    'Description',
    'Short description',
    'Images',
    'Attribute 1 name',
    'Attribute 1 value(s)',
    'Attribute 2 name',
    'Attribute 2 value(s)',
  ],
  mapping: {
    ID: '',
    Type: '=simple',
    SKU: 'sku',
    Name: 'name',
    Published: '=1',
    'Regular price': 'regular_price',
    'Sale price': 'sale_price',
    Categories: 'category',
    Tags: 'tags',
    Description: 'description',
    'Short description': 'short_description',
    Images: 'images',
    'Attribute 1 name': '=Size',
    'Attribute 1 value(s)': 'sizes',
    'Attribute 2 name': '=Color',
    'Attribute 2 value(s)': 'color',
  },
  rules: { requiredColumns: ['Name', 'Regular price'] },
}

export const SHOPIFY_TEMPLATE: PfTemplate = {
  name: 'Shopify (default)',
  platform: 'shopify',
  columns: [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Product Category',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Variant SKU',
    'Variant Price',
    'Image Src',
  ],
  mapping: {
    Handle: 'slug',
    Title: 'name',
    'Body (HTML)': 'description',
    Vendor: 'brand',
    'Product Category': 'category',
    Type: 'category',
    Tags: 'tags',
    Published: '=TRUE',
    'Option1 Name': '=Size',
    'Option1 Value': 'sizes',
    'Variant SKU': 'sku',
    'Variant Price': 'price',
    'Image Src': 'image_first',
  },
  // Shopify wants one row per variant, repeating only Handle + variant fields.
  rules: {
    requiredColumns: ['Title', 'Variant Price'],
    variantColumn: 'Option1 Value',
    variantSource: 'sizes',
    variantBlankColumns: [
      'Title',
      'Body (HTML)',
      'Vendor',
      'Product Category',
      'Type',
      'Tags',
      'Published',
      'Option1 Name',
      'Image Src',
    ],
  },
}

export const CUSTOM_TEMPLATE: PfTemplate = {
  name: 'Custom (simple)',
  platform: 'custom',
  columns: ['Name', 'SKU', 'Price', 'Sale Price', 'Category', 'Brand', 'Description', 'Images'],
  mapping: {
    Name: 'name',
    SKU: 'sku',
    Price: 'regular_price',
    'Sale Price': 'sale_price',
    Category: 'category',
    Brand: 'brand',
    Description: 'description',
    Images: 'images',
  },
  rules: { requiredColumns: ['Name', 'Price'] },
}

export const BUILT_IN_TEMPLATES = [WOOCOMMERCE_TEMPLATE, SHOPIFY_TEMPLATE, CUSTOM_TEMPLATE]

/** Creates the built-in templates once. Safe to call repeatedly. */
export async function seedBuiltInTemplates(): Promise<number> {
  const supabase = getSupabaseAdmin()
  const { data: existing } = await supabase.from('pf_csv_templates').select('name')
  const have = new Set((existing ?? []).map((t) => t.name as string))

  const missing = BUILT_IN_TEMPLATES.filter((t) => !have.has(t.name))
  if (!missing.length) return 0

  const { error } = await supabase.from('pf_csv_templates').insert(
    missing.map((t) => ({
      name: t.name,
      platform: t.platform,
      columns: t.columns,
      mapping: t.mapping,
      rules: t.rules ?? {},
      is_default: true,
    })),
  )
  if (error) throw error
  return missing.length
}

/**
 * The template a project should export with: its explicit choice, else the
 * default for its platform.
 */
export async function resolveTemplateForProject(projectId: string): Promise<PfTemplate | null> {
  const supabase = getSupabaseAdmin()

  const { data: project } = await supabase
    .from('pf_projects')
    .select('csv_template_id, platform')
    .eq('id', projectId)
    .maybeSingle()

  if (!project) return null

  if (project.csv_template_id) {
    const { data } = await supabase
      .from('pf_csv_templates')
      .select('id, name, platform, columns, mapping, rules')
      .eq('id', project.csv_template_id)
      .maybeSingle()
    if (data) return data as unknown as PfTemplate
  }

  const { data: fallback } = await supabase
    .from('pf_csv_templates')
    .select('id, name, platform, columns, mapping, rules')
    .eq('platform', project.platform ?? 'woocommerce')
    .order('is_default', { ascending: false })
    .limit(1)
    .maybeSingle()

  return (fallback as unknown as PfTemplate) ?? null
}
