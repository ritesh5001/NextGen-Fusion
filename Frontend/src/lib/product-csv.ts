import Papa from 'papaparse'

export type ProductOption = {
  name: string
  values: string[]
}

export type ProductVariant = {
  option_values: Record<string, string>
  sku?: string
  price?: string
  sale_price?: string
  stock?: string
  weight?: string
  image_url?: string
}

export type Product = {
  id: string
  title: string
  description?: string | null
  vendor?: string | null
  product_type?: string | null
  category?: string | null
  tags?: string | null
  published: boolean
  options: ProductOption[]
  variants: ProductVariant[]
  images: string[]
}

export type CsvPlatform = 'shopify' | 'woocommerce'

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// A product with no defined variants still needs one row to export.
function variantsOf(product: Product): ProductVariant[] {
  return product.variants.length > 0 ? product.variants : [{ option_values: {} }]
}

// Make Cloudinary URLs safe for CSV import. Two problems with older saved URLs:
//  1. WooCommerce's "Images" column splits on commas, and Cloudinary transform
//     segments use commas (e.g. "c_limit,q_auto,w_1600") — which shatters the URL.
//  2. Importers detect images by file extension; transform-less URLs lacked one.
// Fix: drop comma-bearing transform segment(s) and ensure a ".jpg" extension.
// The stored asset is already resized/compressed on upload, so delivering it
// without the transform keeps it importable and ~100-200 KB. No-op for
// non-Cloudinary URLs and for already-clean URLs.
export function normalizeImageUrl(url: string): string {
  if (!url) return url
  const m = url.match(/^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.*)$/i)
  if (!m) return url
  const prefix = m[1]
  const segments = m[2].split('/')
  while (segments.length > 1 && segments[0].includes(',')) segments.shift()
  let rest = segments.join('/')
  const last = rest.split('?')[0].split('/').pop() || ''
  if (!/\.[a-z0-9]{2,4}$/i.test(last)) rest = `${rest}.jpg`
  return prefix + rest
}

export function toShopifyCsv(products: Product[]): string {
  const rows: Record<string, string>[] = []

  for (const product of products) {
    const handle = slugify(product.title) || product.id
    const optionNames = product.options.map((o) => o.name).slice(0, 3)
    const variants = variantsOf(product)

    variants.forEach((variant, index) => {
      const isFirst = index === 0
      const regular = (variant.price ?? '').trim()
      const sale = (variant.sale_price ?? '').trim()
      // Shopify: Variant Price is the selling price; Compare At is the (higher) original.
      const variantPrice = sale || regular
      const compareAt = sale ? regular : ''

      const row: Record<string, string> = {
        Handle: handle,
        Title: isFirst ? product.title : '',
        'Body (HTML)': isFirst ? product.description ?? '' : '',
        Vendor: isFirst ? product.vendor ?? '' : '',
        Type: isFirst ? product.product_type ?? '' : '',
        Tags: isFirst ? product.tags ?? '' : '',
        Published: isFirst ? (product.published ? 'TRUE' : 'FALSE') : '',
        'Option1 Name': optionNames[0] ?? (optionNames.length === 0 ? 'Title' : ''),
        'Option1 Value':
          optionNames[0] !== undefined
            ? variant.option_values[optionNames[0]] ?? ''
            : optionNames.length === 0
              ? 'Default Title'
              : '',
        'Option2 Name': optionNames[1] ?? '',
        'Option2 Value': optionNames[1] !== undefined ? variant.option_values[optionNames[1]] ?? '' : '',
        'Option3 Name': optionNames[2] ?? '',
        'Option3 Value': optionNames[2] !== undefined ? variant.option_values[optionNames[2]] ?? '' : '',
        'Variant SKU': variant.sku ?? '',
        'Variant Grams': variant.weight ?? '',
        'Variant Inventory Qty': variant.stock ?? '',
        'Variant Inventory Policy': 'deny',
        'Variant Fulfillment Service': 'manual',
        'Variant Price': variantPrice,
        'Variant Compare At Price': compareAt,
        'Variant Requires Shipping': 'TRUE',
        'Variant Taxable': 'TRUE',
        'Image Src': normalizeImageUrl(variant.image_url || (isFirst ? product.images[0] ?? '' : '')),
        Status: product.published ? 'active' : 'draft',
      }
      rows.push(row)
    })
  }

  return Papa.unparse(rows)
}

const WOO_COLUMNS = [
  'Type',
  'SKU',
  'Name',
  'Published',
  'Visibility in catalog',
  'Short description',
  'Description',
  'Regular price',
  'Sale price',
  'Categories',
  'Tags',
  'Weight (kg)',
  'Stock',
  'Images',
  'Parent',
  'Attribute 1 name',
  'Attribute 1 value(s)',
  'Attribute 1 visible',
  'Attribute 1 global',
  'Attribute 2 name',
  'Attribute 2 value(s)',
  'Attribute 2 visible',
  'Attribute 2 global',
  'Attribute 3 name',
  'Attribute 3 value(s)',
  'Attribute 3 visible',
  'Attribute 3 global',
] as const

function emptyWooRow(): Record<string, string> {
  const row: Record<string, string> = {}
  for (const col of WOO_COLUMNS) row[col] = ''
  return row
}

export function toWooCommerceCsv(products: Product[]): string {
  const rows: Record<string, string>[] = []

  for (const product of products) {
    const parentSku = product.variants.find((v) => v.sku)?.sku || slugify(product.title) || product.id
    const options = product.options.slice(0, 3)
    const hasVariants = product.variants.length > 0 && options.length > 0
    const published = product.published ? '1' : '0'

    if (hasVariants) {
      // Variable parent row — lists all attribute values.
      const parent = emptyWooRow()
      parent['Type'] = 'variable'
      parent['SKU'] = parentSku
      parent['Name'] = product.title
      parent['Published'] = published
      parent['Visibility in catalog'] = 'visible'
      parent['Description'] = product.description ?? ''
      parent['Categories'] = product.category ?? ''
      parent['Tags'] = product.tags ?? ''
      parent['Images'] = product.images.map(normalizeImageUrl).join(', ')
      options.forEach((opt, i) => {
        parent[`Attribute ${i + 1} name`] = opt.name
        parent[`Attribute ${i + 1} value(s)`] = opt.values.join(', ')
        parent[`Attribute ${i + 1} visible`] = '1'
        parent[`Attribute ${i + 1} global`] = '1'
      })
      rows.push(parent)

      // Variation rows.
      product.variants.forEach((variant, vIndex) => {
        const row = emptyWooRow()
        row['Type'] = 'variation'
        row['SKU'] = variant.sku || `${parentSku}-${vIndex + 1}`
        row['Name'] = product.title
        row['Published'] = published
        row['Visibility in catalog'] = 'visible'
        row['Regular price'] = variant.price ?? ''
        row['Sale price'] = variant.sale_price ?? ''
        row['Weight (kg)'] = variant.weight ?? ''
        row['Stock'] = variant.stock ?? ''
        row['Images'] = variant.image_url ? normalizeImageUrl(variant.image_url) : ''
        row['Parent'] = parentSku
        options.forEach((opt, i) => {
          row[`Attribute ${i + 1} name`] = opt.name
          row[`Attribute ${i + 1} value(s)`] = variant.option_values[opt.name] ?? ''
          row[`Attribute ${i + 1} visible`] = '1'
          row[`Attribute ${i + 1} global`] = '1'
        })
        rows.push(row)
      })
    } else {
      // Simple product — single row (use first variant for price/stock if present).
      const variant = product.variants[0]
      const row = emptyWooRow()
      row['Type'] = 'simple'
      row['SKU'] = variant?.sku || parentSku
      row['Name'] = product.title
      row['Published'] = published
      row['Visibility in catalog'] = 'visible'
      row['Description'] = product.description ?? ''
      row['Regular price'] = variant?.price ?? ''
      row['Sale price'] = variant?.sale_price ?? ''
      row['Categories'] = product.category ?? ''
      row['Tags'] = product.tags ?? ''
      row['Weight (kg)'] = variant?.weight ?? ''
      row['Stock'] = variant?.stock ?? ''
      row['Images'] = (variant?.image_url ? [variant.image_url, ...product.images] : product.images)
        .map(normalizeImageUrl)
        .join(', ')
      rows.push(row)
    }
  }

  return Papa.unparse({ fields: [...WOO_COLUMNS], data: rows })
}

export function buildCsv(products: Product[], platform: CsvPlatform): string {
  return platform === 'shopify' ? toShopifyCsv(products) : toWooCommerceCsv(products)
}

export function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
