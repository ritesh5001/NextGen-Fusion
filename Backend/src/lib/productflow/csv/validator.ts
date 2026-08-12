import type { PfProductRecord, PfTemplate } from './mapper'

// Phase 9 pre-flight checks (spec §23). Nothing is exported until the file
// would actually import cleanly on the target platform.

export type PfValidationIssue = {
  level: 'error' | 'warning'
  code: string
  message: string
  productId?: string
  productName?: string
}

export type PfValidationReport = {
  ok: boolean
  errors: PfValidationIssue[]
  warnings: PfValidationIssue[]
}

function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    // Commas would split WooCommerce's comma-separated Images column.
    return parsed.protocol === 'https:' && !url.includes(',')
  } catch {
    return false
  }
}

export function validateForExport(
  products: PfProductRecord[],
  template: PfTemplate,
): PfValidationReport {
  const errors: PfValidationIssue[] = []
  const warnings: PfValidationIssue[] = []

  if (!products.length) {
    errors.push({
      level: 'error',
      code: 'no_products',
      message: 'There are no approved products to export.',
    })
    return { ok: false, errors, warnings }
  }

  if (!template.columns?.length) {
    errors.push({
      level: 'error',
      code: 'no_columns',
      message: `Template "${template.name}" has no columns configured.`,
    })
  }

  // A required column that maps to nothing yields a blank column for every row.
  const requiredColumns = (template.rules?.requiredColumns as string[]) ?? []
  for (const column of requiredColumns) {
    if (!template.columns?.includes(column)) {
      errors.push({
        level: 'error',
        code: 'missing_column',
        message: `Template is missing the required column "${column}".`,
      })
    } else if (!template.mapping?.[column]) {
      errors.push({
        level: 'error',
        code: 'unmapped_column',
        message: `Required column "${column}" is not mapped to any product field.`,
      })
    }
  }

  const seenSkus = new Map<string, string>()

  for (const product of products) {
    const label = product.name || product.id
    const at = { productId: product.id, productName: label }

    if (!product.name?.trim()) {
      errors.push({ level: 'error', code: 'missing_name', message: 'Product has no name.', ...at })
    }

    const price = product.sale_price ?? product.regular_price
    if (price == null) {
      errors.push({
        level: 'error',
        code: 'missing_price',
        message: `"${label}" has no price.`,
        ...at,
      })
    } else if (!Number.isFinite(price) || price < 0) {
      errors.push({
        level: 'error',
        code: 'invalid_price',
        message: `"${label}" has an invalid price (${price}).`,
        ...at,
      })
    }

    if (
      product.sale_price != null &&
      product.regular_price != null &&
      product.sale_price > product.regular_price
    ) {
      warnings.push({
        level: 'warning',
        code: 'sale_above_regular',
        message: `"${label}" has a sale price higher than its regular price.`,
        ...at,
      })
    }

    if (!product.category?.trim()) {
      warnings.push({
        level: 'warning',
        code: 'missing_category',
        message: `"${label}" has no category.`,
        ...at,
      })
    }

    if (!product.images?.length) {
      warnings.push({
        level: 'warning',
        code: 'no_images',
        message: `"${label}" has no images.`,
        ...at,
      })
    } else {
      const bad = product.images.filter((url) => !isValidImageUrl(url))
      if (bad.length) {
        errors.push({
          level: 'error',
          code: 'invalid_image_url',
          message: `"${label}" has ${bad.length} unusable image URL(s).`,
          ...at,
        })
      }
    }

    // Duplicate SKUs make an importer overwrite the wrong row.
    const sku = product.sku?.trim()
    if (sku) {
      const owner = seenSkus.get(sku.toLowerCase())
      if (owner) {
        errors.push({
          level: 'error',
          code: 'duplicate_sku',
          message: `SKU "${sku}" is used by both "${owner}" and "${label}".`,
          ...at,
        })
      } else {
        seenSkus.set(sku.toLowerCase(), label)
      }
    }
  }

  return { ok: errors.length === 0, errors, warnings }
}

/** The human-readable blocker summary from spec §23. */
export function summarizeReport(report: PfValidationReport): string {
  if (report.ok) return 'Ready to export.'
  const lines = ['CSV cannot be generated yet.', '']
  const byCode = new Map<string, PfValidationIssue[]>()
  for (const issue of report.errors) {
    byCode.set(issue.code, [...(byCode.get(issue.code) ?? []), issue])
  }
  for (const [, issues] of byCode) {
    if (issues.length === 1) {
      lines.push(`- ${issues[0].message}`)
    } else {
      lines.push(`- ${issues.length} products: ${issues[0].code.replace(/_/g, ' ')}`)
      for (const issue of issues.slice(0, 8)) {
        lines.push(`    · ${issue.productName}`)
      }
    }
  }
  return lines.join('\n')
}
