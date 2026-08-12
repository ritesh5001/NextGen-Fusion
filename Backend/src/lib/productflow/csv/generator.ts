import Papa from 'papaparse'
import { getSupabaseAdmin } from '../../supabase'
import { buildRows, type PfProductRecord, type PfTemplate } from './mapper'
import { validateForExport, type PfValidationReport } from './validator'
import { resolveTemplateForProject } from './templates'

// Phase 9: approved products → project template → mapping → validation → CSV.

export type PfExportResult = {
  ok: boolean
  report: PfValidationReport
  csv: string | null
  filename: string | null
  productCount: number
  rowCount: number
  templateName: string | null
}

/** Loads approved products for a project with their images attached. */
export async function loadExportableProducts(
  projectId: string,
  opts: { onlyUnexported?: boolean } = {},
): Promise<PfProductRecord[]> {
  const supabase = getSupabaseAdmin()

  let query = supabase
    .from('pf_products')
    .select(
      'id, name, sku, description, short_description, regular_price, sale_price, category, brand, tags, attributes, exported_at',
    )
    .eq('project_id', projectId)
    .eq('status', 'APPROVED')
    .order('created_at', { ascending: true })

  if (opts.onlyUnexported) query = query.is('exported_at', null)

  const { data, error } = await query
  if (error) throw error

  const products = (data ?? []) as Record<string, unknown>[]
  if (!products.length) return []

  const ids = products.map((p) => p.id as string)
  const { data: images } = await supabase
    .from('pf_product_images')
    .select('product_id, url, position')
    .in('product_id', ids)
    .eq('status', 'stored')
    .order('position', { ascending: true })

  const byProduct = new Map<string, string[]>()
  for (const image of images ?? []) {
    const key = image.product_id as string
    const url = image.url as string | null
    if (!url) continue
    byProduct.set(key, [...(byProduct.get(key) ?? []), url])
  }

  return products.map((p) => ({
    id: p.id as string,
    name: (p.name as string) ?? '',
    sku: (p.sku as string) ?? null,
    description: (p.description as string) ?? null,
    short_description: (p.short_description as string) ?? null,
    // Supabase returns numeric() as a string; coerce so validation sees numbers.
    regular_price: p.regular_price == null ? null : Number(p.regular_price),
    sale_price: p.sale_price == null ? null : Number(p.sale_price),
    category: (p.category as string) ?? null,
    brand: (p.brand as string) ?? null,
    tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
    attributes: (p.attributes as Record<string, unknown>) ?? {},
    images: byProduct.get(p.id as string) ?? [],
  }))
}

function filenameFor(projectName: string, date = new Date()): string {
  const slug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `${slug || 'products'}-${date.toISOString().slice(0, 10)}.csv`
}

/**
 * Builds the CSV for a project.
 *
 * Validation runs first and blocks on errors — a half-valid file that a client
 * imports is worse than no file (spec §23).
 */
export async function generateProjectCsv(
  projectId: string,
  opts: { onlyUnexported?: boolean; dryRun?: boolean } = {},
): Promise<PfExportResult> {
  const supabase = getSupabaseAdmin()

  const { data: project } = await supabase
    .from('pf_projects')
    .select('id, name')
    .eq('id', projectId)
    .maybeSingle()

  if (!project) {
    return {
      ok: false,
      report: {
        ok: false,
        errors: [{ level: 'error', code: 'no_project', message: 'Project not found.' }],
        warnings: [],
      },
      csv: null,
      filename: null,
      productCount: 0,
      rowCount: 0,
      templateName: null,
    }
  }

  const template = await resolveTemplateForProject(projectId)
  if (!template) {
    return {
      ok: false,
      report: {
        ok: false,
        errors: [
          {
            level: 'error',
            code: 'no_template',
            message: 'No CSV template is configured for this project or its platform.',
          },
        ],
        warnings: [],
      },
      csv: null,
      filename: null,
      productCount: 0,
      rowCount: 0,
      templateName: null,
    }
  }

  const products = await loadExportableProducts(projectId, opts)
  const report = validateForExport(products, template)

  if (!report.ok || opts.dryRun) {
    return {
      ok: report.ok,
      report,
      csv: null,
      filename: null,
      productCount: products.length,
      rowCount: 0,
      templateName: template.name,
    }
  }

  const rows = products.flatMap((product) => buildRows(product, template))
  const csv = Papa.unparse({ fields: template.columns, data: rows.map((r) => template.columns.map((c) => r[c] ?? '')) })
  const filename = filenameFor((project.name as string) ?? 'products')

  return {
    ok: true,
    report,
    csv,
    filename,
    productCount: products.length,
    rowCount: rows.length,
    templateName: template.name,
  }
}

/**
 * Records an export and marks the products as exported, so the next run can be
 * limited to new products only.
 */
export async function recordExport(opts: {
  projectId: string
  templateName: string | null
  filename: string
  productCount: number
  markExported: boolean
}): Promise<void> {
  const supabase = getSupabaseAdmin()

  const { data: template } = await supabase
    .from('pf_csv_templates')
    .select('id')
    .eq('name', opts.templateName ?? '')
    .maybeSingle()

  await supabase.from('pf_csv_exports').insert({
    project_id: opts.projectId,
    template_id: (template?.id as string) ?? null,
    filename: opts.filename,
    product_count: opts.productCount,
  })

  if (opts.markExported) {
    await supabase
      .from('pf_products')
      .update({ exported_at: new Date().toISOString(), status: 'EXPORTED' })
      .eq('project_id', opts.projectId)
      .eq('status', 'APPROVED')
  }
}
