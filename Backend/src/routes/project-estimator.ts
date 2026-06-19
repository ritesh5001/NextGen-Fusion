import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

const PROJECT_TYPES = ['landing-page', 'portfolio', 'ecommerce', 'saas', 'custom'] as const
const BUILD_TYPES = ['wordpress', 'custom'] as const
const ECOMMERCE_PACKAGES = ['standard', 'premium', 'extra-premium', 'custom-functionality'] as const
const TIMELINES = ['asap', '1-month', '3-months', 'flexible'] as const
const PAGE_COUNTS = ['1-5', '6-15', '16-30', '30+'] as const
const DESIGN_LEVELS = ['clean', 'premium', 'conversion-focused'] as const
const CONTENT_READINESS = ['ready', 'partial', 'need-help'] as const
const MAINTENANCE_LEVELS = ['none', 'basic', 'growth'] as const

type ProjectType = typeof PROJECT_TYPES[number]
type BuildType = typeof BUILD_TYPES[number]
type EcommercePackage = typeof ECOMMERCE_PACKAGES[number]
type Timeline = typeof TIMELINES[number]
type PageCount = typeof PAGE_COUNTS[number]
type DesignLevel = typeof DESIGN_LEVELS[number]
type ContentReadiness = typeof CONTENT_READINESS[number]
type MaintenanceLevel = typeof MAINTENANCE_LEVELS[number]

type EstimatorInput = {
  name: string
  email: string
  phone: string
  companyName: string
  projectType: ProjectType
  buildType: BuildType
  ecommercePackage: EcommercePackage
  features: string[]
  timeline: Timeline
  pageCount: PageCount
  designLevel: DesignLevel
  contentReadiness: ContentReadiness
  maintenance: MaintenanceLevel
  integrations: string[]
  goals: string
  notes: string
}

type SupportPlan = {
  amount: number
  cadence: 'year' | 'month'
  label: string
  note?: string
} | null

type EstimateResult = {
  summary: string
  estimated_cost_inr: { min: number; max: number }
  estimated_timeline_weeks: { min: number; max: number }
  support: SupportPlan
  payment_terms: string
  confidence: 'low' | 'medium' | 'high'
  highlighted_features: string[]
  scope_breakdown: string[]
  assumptions: string[]
  next_step: string
  provider: 'grok' | 'fallback'
  model: string | null
}

function clampRange(min: number, max: number) {
  const lo = Math.max(4000, Math.round(Math.min(min, 300000) / 100) * 100)
  const hi = Math.max(lo, Math.round(Math.min(max, 300000) / 100) * 100)
  return { min: lo, max: hi }
}

function uniqueList(values: unknown[]): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)),
  )
}

function sanitizeInput(body: any): EstimatorInput | null {
  if (!body || typeof body !== 'object') return null

  const projectType = typeof body.projectType === 'string' ? body.projectType : ''
  const buildType = typeof body.buildType === 'string' ? body.buildType : ''
  const ecommercePackage = typeof body.ecommercePackage === 'string' ? body.ecommercePackage : ''
  const timeline = typeof body.timeline === 'string' ? body.timeline : ''
  const pageCount = typeof body.pageCount === 'string' ? body.pageCount : ''
  const designLevel = typeof body.designLevel === 'string' ? body.designLevel : ''
  const contentReadiness = typeof body.contentReadiness === 'string' ? body.contentReadiness : ''
  const maintenance = typeof body.maintenance === 'string' ? body.maintenance : ''

  if (
    !PROJECT_TYPES.includes(projectType as ProjectType) ||
    !BUILD_TYPES.includes(buildType as BuildType) ||
    !ECOMMERCE_PACKAGES.includes(ecommercePackage as EcommercePackage) ||
    !TIMELINES.includes(timeline as Timeline) ||
    !PAGE_COUNTS.includes(pageCount as PageCount) ||
    !DESIGN_LEVELS.includes(designLevel as DesignLevel) ||
    !CONTENT_READINESS.includes(contentReadiness as ContentReadiness) ||
    !MAINTENANCE_LEVELS.includes(maintenance as MaintenanceLevel)
  ) {
    return null
  }

  return {
    name: typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '',
    email: typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 180) : '',
    phone: typeof body.phone === 'string' ? body.phone.trim().slice(0, 60) : '',
    companyName: typeof body.companyName === 'string' ? body.companyName.trim().slice(0, 180) : '',
    projectType: projectType as ProjectType,
    buildType: buildType as BuildType,
    ecommercePackage: ecommercePackage as EcommercePackage,
    features: uniqueList(Array.isArray(body.features) ? body.features : []),
    timeline: timeline as Timeline,
    pageCount: pageCount as PageCount,
    designLevel: designLevel as DesignLevel,
    contentReadiness: contentReadiness as ContentReadiness,
    maintenance: maintenance as MaintenanceLevel,
    integrations: uniqueList(Array.isArray(body.integrations) ? body.integrations : []),
    goals: typeof body.goals === 'string' ? body.goals.trim().slice(0, 1000) : '',
    notes: typeof body.notes === 'string' ? body.notes.trim().slice(0, 1500) : '',
  }
}

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

// Rate-card base price (INR) by project type + build type (+ ecommerce package).
// Mirrors rateCardBase() in Frontend/src/lib/estimator-pricing.ts.
function rateCardBase(
  projectType: ProjectType,
  buildType: BuildType,
  pkg: EcommercePackage,
): { min: number; max: number } {
  const wp = buildType === 'wordpress'

  switch (projectType) {
    case 'landing-page':
    case 'portfolio':
      return wp ? { min: 4000, max: 4000 } : { min: 10000, max: 10000 }
    case 'ecommerce': {
      const table: Record<EcommercePackage, { wp: { min: number; max: number }; custom: { min: number; max: number } }> = {
        standard: { wp: { min: 4000, max: 4000 }, custom: { min: 50000, max: 50000 } },
        premium: { wp: { min: 6000, max: 6000 }, custom: { min: 80000, max: 80000 } },
        'extra-premium': { wp: { min: 10000, max: 10000 }, custom: { min: 100000, max: 100000 } },
        'custom-functionality': { wp: { min: 6000, max: 12000 }, custom: { min: 100000, max: 200000 } },
      }
      const row = table[pkg] ?? table.standard
      return wp ? row.wp : row.custom
    }
    case 'saas':
      return wp ? { min: 15000, max: 30000 } : { min: 50000, max: 120000 }
    case 'custom':
      return wp ? { min: 15000, max: 30000 } : { min: 15000, max: 80000 }
  }
}

// Ongoing support (recurring, billed separately from the one-time build).
// Mirrors computeSupport() in Frontend/src/lib/estimator-pricing.ts.
function computeSupport(input: EstimatorInput): SupportPlan {
  switch (input.maintenance) {
    case 'none':
      return null
    case 'basic':
      return { amount: 2000, cadence: 'year', label: 'Support (uptime & fixes)' }
    case 'growth':
      return input.buildType === 'wordpress'
        ? { amount: 15000, cadence: 'year', label: 'Support + changes' }
        : {
            amount: 5000,
            cadence: 'month',
            label: 'Support + changes',
            note: 'Large or complex change requests are quoted separately.',
          }
  }
}

const PAYMENT_TERMS = '50% advance to start · 50% at payment-gateway integration'
const ECOMMERCE_INCLUDED = ['Payment gateway integration', 'Shiprocket integration']

function buildHeuristicEstimate(input: EstimatorInput): EstimateResult {
  const wp = input.buildType === 'wordpress'

  // Custom-coded feature/dev cost (INR). WordPress treats these as plugin cost.
  const featureCostBase: Record<string, number> = {
    payment: 8000,
    auth: 10000,
    dashboard: 30000,
    blog: 5000,
    booking: 12000,
    cms: 8000,
    crm: 15000,
    analytics: 5000,
    multi_language: 8000,
    seo_setup: 8000,
    whatsapp: 2000,
  }
  const WP_FEATURE_FACTOR = 0.25
  const featureCostFor = (feature: string) =>
    Math.round((featureCostBase[feature] ?? 8000) * (wp ? WP_FEATURE_FACTOR : 1))

  const featureWeeks: Record<string, number> = {
    payment: 1,
    auth: 1,
    dashboard: 2,
    blog: 1,
    booking: 1,
    cms: 1,
    crm: 1,
    analytics: 1,
    multi_language: 1,
    seo_setup: 1,
    whatsapp: 0,
  }

  const ADDITIONAL_PAGE_COST = 1000
  const pageExtra: Record<PageCount, { min: number; max: number }> = {
    '1-5': { min: 0, max: 4 },
    '6-15': { min: 5, max: 14 },
    '16-30': { min: 15, max: 29 },
    '30+': { min: 30, max: 40 },
  }

  const pageWeeks: Record<PageCount, number> = {
    '1-5': 0,
    '6-15': 1,
    '16-30': 2,
    '30+': 4,
  }

  const designMultiplier: Record<DesignLevel, number> = {
    clean: 1,
    premium: 1.1,
    'conversion-focused': 1.2,
  }

  const contentCost: Record<ContentReadiness, number> = {
    ready: 0,
    partial: 3000,
    'need-help': 8000,
  }

  const contentWeeks: Record<ContentReadiness, number> = {
    ready: 0,
    partial: 1,
    'need-help': 2,
  }

  const maintenanceCost: Record<MaintenanceLevel, number> = {
    none: 0,
    basic: 1500,
    growth: 5000,
  }

  const maintenanceWeeks: Record<MaintenanceLevel, number> = {
    none: 0,
    basic: 0,
    growth: 1,
  }

  const urgencyMultiplier: Record<Timeline, number> = {
    asap: 1.1,
    '1-month': 1.05,
    '3-months': 1,
    flexible: 0.98,
  }

  const weeksByType: Record<ProjectType, [number, number]> = {
    'landing-page': [1, 2],
    portfolio: [1, 3],
    ecommerce: [2, 5],
    saas: [4, 10],
    custom: [2, 8],
  }

  const confidence: EstimateResult['confidence'] =
    input.projectType === 'custom' || input.notes.length > 180 || input.integrations.length > 2
      ? 'medium'
      : input.features.length >= 4
        ? 'medium'
        : 'high'

  const base = rateCardBase(input.projectType, input.buildType, input.ecommercePackage)
  const featuresCost = input.features.reduce((sum, feature) => sum + featureCostFor(feature), 0)
  const featuresWeeks = input.features.reduce((sum, feature) => sum + (featureWeeks[feature] ?? 1), 0)
  const perIntegration = wp ? 2500 : 10000
  const integrationsCost = input.integrations.length * perIntegration
  const integrationsWeeks = input.integrations.length

  const pageApplies = input.projectType === 'landing-page' || input.projectType === 'portfolio'
  const pageAddMin = pageApplies ? pageExtra[input.pageCount].min * ADDITIONAL_PAGE_COST : 0
  const pageAddMax = pageApplies ? pageExtra[input.pageCount].max * ADDITIONAL_PAGE_COST : 0

  const extras = contentCost[input.contentReadiness] + maintenanceCost[input.maintenance]

  let min = base.min + pageAddMin + featuresCost + integrationsCost + extras
  let max = base.max + pageAddMax + Math.round(featuresCost * 1.3) + Math.round(integrationsCost * 1.3) + extras

  const designMult = input.projectType === 'ecommerce' ? 1 : designMultiplier[input.designLevel]
  const urgency = urgencyMultiplier[input.timeline]
  min = Math.round(min * designMult * urgency)
  max = Math.round(max * designMult * urgency)
  if (max <= min) max = Math.round(min * 1.15)

  const baseWeeks = weeksByType[input.projectType]
  const weeksMin = Math.max(1, baseWeeks[0] + Math.floor(featuresWeeks * 0.6) + pageWeeks[input.pageCount] + contentWeeks[input.contentReadiness])
  const weeksMax = Math.max(weeksMin + 1, baseWeeks[1] + featuresWeeks + pageWeeks[input.pageCount] + contentWeeks[input.contentReadiness] + maintenanceWeeks[input.maintenance] + integrationsWeeks)

  const cost = clampRange(min, max)

  const highlights = [
    input.projectType.replace('-', ' '),
    ...input.features.slice(0, 3).map((item) => item.replace(/_/g, ' ')),
    ...input.integrations.slice(0, 2).map((item) => `${item} integration`),
  ].filter(Boolean)

  const scope = [
    `Core build for a ${input.projectType.replace('-', ' ')} project`,
    `${input.pageCount} page scope with ${input.designLevel} design treatment`,
    input.projectType === 'ecommerce' ? `Included at no extra cost: ${ECOMMERCE_INCLUDED.join(' & ')}` : null,
    input.features.length ? `Feature set includes ${input.features.join(', ')}` : 'Lean MVP feature set',
    input.integrations.length ? `External integrations: ${input.integrations.join(', ')}` : 'Minimal third-party integration complexity',
  ].filter((x): x is string => Boolean(x))

  const support = computeSupport(input)

  const assumptions = [
    `Payment terms: ${PAYMENT_TERMS}.`,
    input.contentReadiness === 'ready' ? 'Content and brand assets are ready to use.' : 'Content/design iteration will affect final scope.',
    input.timeline === 'asap' ? 'Fast-track delivery requires tighter feedback cycles and priority allocation.' : 'Standard delivery rhythm with normal revision cycles.',
    support
      ? `Ongoing support is recurring and billed separately (${support.label}).`
      : input.projectType === 'saas' || input.projectType === 'custom'
        ? 'Complex custom logic can push the quote toward the upper side of the range.'
        : 'Estimate assumes standard delivery without unusual compliance or enterprise constraints.',
  ]

  const buildLabel = input.buildType === 'wordpress' ? 'WordPress/Shopify' : 'custom-coded'

  return {
    summary: `This looks like a ${buildLabel} ${input.projectType.replace('-', ' ')} build with ${input.features.length || 'a small'} scoped feature set and a ${input.timeline.replace('-', ' ')} delivery target.`,
    estimated_cost_inr: cost,
    estimated_timeline_weeks: { min: weeksMin, max: weeksMax },
    support,
    payment_terms: PAYMENT_TERMS,
    confidence,
    highlighted_features: highlights.slice(0, 5),
    scope_breakdown: scope,
    assumptions,
    next_step: 'Book a discovery call to lock the exact scope, confirm deliverables, and turn this range into a final quote.',
    provider: 'fallback',
    model: null,
  }
}

function stripCodeFences(value: string): string {
  return value.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
}

async function generateWithGrok(input: EstimatorInput, baseline: EstimateResult): Promise<EstimateResult> {
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return baseline
  }

  const model = process.env.XAI_MODEL || 'grok-4-1-fast-non-reasoning'
  const prompt = {
    name: input.name,
    companyName: input.companyName,
    projectType: input.projectType,
    buildType: input.buildType,
    ecommercePackage: input.ecommercePackage,
    features: input.features,
    timeline: input.timeline,
    pageCount: input.pageCount,
    designLevel: input.designLevel,
    contentReadiness: input.contentReadiness,
    maintenance: input.maintenance,
    integrations: input.integrations,
    goals: input.goals,
    notes: input.notes,
    baselineEstimate: baseline,
  }

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      max_tokens: 900,
      messages: [
        {
          role: 'system',
          content:
            'You are a senior web agency solutions architect for NextGen Fusion. Return only valid JSON, no markdown fences. The pricing comes from a fixed INR rate card and is provided to you as baselineEstimate.estimated_cost_inr — you MUST copy those exact numbers and never change them. Your job is only to write helpful, accurate text (summary, scope, assumptions, highlights). All amounts are in Indian Rupees (INR).',
        },
        {
          role: 'user',
          content:
            `Generate a structured project estimate for this website/app brief.\n` +
            `Return JSON with exactly these keys: summary, estimated_cost_inr, estimated_timeline_weeks, confidence, highlighted_features, scope_breakdown, assumptions, next_step.\n` +
            `estimated_cost_inr must be exactly the baselineEstimate.estimated_cost_inr values (INR). Do not recalculate or alter them.\n` +
            `estimated_timeline_weeks must be {"min": number, "max": number}.\n` +
            `confidence must be one of low, medium, high.\n` +
            `highlighted_features, scope_breakdown, assumptions must each be arrays of short strings.\n` +
            `Keep highlighted_features to 3-5 items, scope_breakdown to 3-6 items, assumptions to 2-4 items.\n` +
            `Input JSON:\n${JSON.stringify(prompt)}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(`xAI request failed: ${response.status}`)
  }

  const json = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const content = json.choices?.[0]?.message?.content
  if (!content) throw new Error('xAI returned empty content')

  const parsed = JSON.parse(stripCodeFences(content)) as Partial<EstimateResult>
  const estimatedCost = parsed.estimated_cost_inr
  const estimatedTimeline = parsed.estimated_timeline_weeks

  if (
    !estimatedCost ||
    typeof estimatedCost.min !== 'number' ||
    typeof estimatedCost.max !== 'number' ||
    !estimatedTimeline ||
    typeof estimatedTimeline.min !== 'number' ||
    typeof estimatedTimeline.max !== 'number'
  ) {
    throw new Error('xAI returned invalid estimate structure')
  }

  return {
    summary: typeof parsed.summary === 'string' ? parsed.summary : baseline.summary,
    estimated_cost_inr: clampRange(estimatedCost.min, estimatedCost.max),
    estimated_timeline_weeks: {
      min: Math.max(1, Math.round(estimatedTimeline.min)),
      max: Math.max(Math.round(estimatedTimeline.max), Math.round(estimatedTimeline.min)),
    },
    support: baseline.support,
    payment_terms: baseline.payment_terms,
    confidence:
      parsed.confidence === 'low' || parsed.confidence === 'medium' || parsed.confidence === 'high'
        ? parsed.confidence
        : baseline.confidence,
    highlighted_features: uniqueList(Array.isArray(parsed.highlighted_features) ? parsed.highlighted_features : baseline.highlighted_features).slice(0, 5),
    scope_breakdown: uniqueList(Array.isArray(parsed.scope_breakdown) ? parsed.scope_breakdown : baseline.scope_breakdown).slice(0, 6),
    assumptions: uniqueList(Array.isArray(parsed.assumptions) ? parsed.assumptions : baseline.assumptions).slice(0, 4),
    next_step: typeof parsed.next_step === 'string' ? parsed.next_step : baseline.next_step,
    provider: 'grok',
    model,
  }
}

router.post('/project-estimator', async (req, res) => {
  try {
    const input = sanitizeInput(req.body)
    if (!input) {
      res.status(400).json({ error: 'Invalid estimator payload' })
      return
    }
    if (!input.name || !input.email || input.goals.trim().length < 12) {
      res.status(400).json({ error: 'name, email, and a valid project goal are required' })
      return
    }

    const baseline = buildHeuristicEstimate(input)
    let estimate = baseline

    try {
      estimate = await generateWithGrok(input, baseline)
    } catch (err) {
      console.error('[project-estimator] Grok estimate failed, using fallback:', err instanceof Error ? err.message : err)
    }

    // The rate card is the single source of truth: never let the AI move the price
    // or timeline. AI is only allowed to enrich the supporting text.
    estimate = {
      ...estimate,
      estimated_cost_inr: baseline.estimated_cost_inr,
      estimated_timeline_weeks: baseline.estimated_timeline_weeks,
      support: baseline.support,
      payment_terms: baseline.payment_terms,
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('project_estimator_submissions')
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        company_name: input.companyName || null,
        project_type: input.projectType,
        features: input.features,
        timeline: input.timeline,
        page_count: input.pageCount,
        design_level: input.designLevel,
        content_readiness: input.contentReadiness,
        maintenance: input.maintenance,
        integrations: input.integrations,
        goals: input.goals,
        notes:
          [
            `Build type: ${input.buildType === 'wordpress' ? 'WordPress/Shopify' : 'Custom-coded'}`,
            input.projectType === 'ecommerce' ? `eCommerce package: ${input.ecommercePackage}` : null,
            input.notes ? `\n${input.notes}` : null,
          ]
            .filter(Boolean)
            .join(' · ') || null,
        estimate_summary: estimate.summary,
        estimated_cost_min: estimate.estimated_cost_inr.min,
        estimated_cost_max: estimate.estimated_cost_inr.max,
        estimated_timeline_min_weeks: estimate.estimated_timeline_weeks.min,
        estimated_timeline_max_weeks: estimate.estimated_timeline_weeks.max,
        confidence: estimate.confidence,
        highlighted_features: estimate.highlighted_features,
        scope_breakdown: estimate.scope_breakdown,
        assumptions: estimate.assumptions,
        next_step: estimate.next_step,
        estimate_provider: estimate.provider,
        estimate_model: estimate.model,
      })
      .select('id')
      .single()

    if (error) {
      if (isMissingTableError(error)) {
        res.status(503).json({ error: 'Estimator storage is not provisioned yet. Apply the latest Supabase schema first.' })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ data: { ...estimate, submission_id: data?.id || null } })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Estimator failed' })
  }
})

router.get('/admin/project-estimator-submissions', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = (req.query.q as string | undefined)?.trim() || ''
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)

    let query = sb
      .from('project_estimator_submissions')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`name.ilike.%${safe}%,email.ilike.%${safe}%,company_name.ilike.%${safe}%,project_type.ilike.%${safe}%,goals.ilike.%${safe}%`)
    }

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({
          data: [],
          count: 0,
          setupRequired: true,
          message: 'Estimator submissions storage is not provisioned yet. Apply the latest Supabase schema to your project.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.get('/admin/project-estimator-submissions/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('project_estimator_submissions')
      .select('*')
      .eq('id', req.params.id)
      .single()
    if (error) {
      res.status(404).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
