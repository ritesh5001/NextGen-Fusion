import { Router } from 'express'

const router = Router()

const PROJECT_TYPES = ['landing-page', 'portfolio', 'ecommerce', 'saas', 'custom'] as const
const TIMELINES = ['asap', '1-month', '3-months', 'flexible'] as const
const PAGE_COUNTS = ['1-5', '6-15', '16-30', '30+'] as const
const DESIGN_LEVELS = ['clean', 'premium', 'conversion-focused'] as const
const CONTENT_READINESS = ['ready', 'partial', 'need-help'] as const
const MAINTENANCE_LEVELS = ['none', 'basic', 'growth'] as const

type ProjectType = typeof PROJECT_TYPES[number]
type Timeline = typeof TIMELINES[number]
type PageCount = typeof PAGE_COUNTS[number]
type DesignLevel = typeof DESIGN_LEVELS[number]
type ContentReadiness = typeof CONTENT_READINESS[number]
type MaintenanceLevel = typeof MAINTENANCE_LEVELS[number]

type EstimatorInput = {
  projectType: ProjectType
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

type EstimateResult = {
  summary: string
  estimated_cost_inr: { min: number; max: number }
  estimated_timeline_weeks: { min: number; max: number }
  confidence: 'low' | 'medium' | 'high'
  highlighted_features: string[]
  scope_breakdown: string[]
  assumptions: string[]
  next_step: string
  provider: 'grok' | 'fallback'
  model: string | null
}

function clampRange(min: number, max: number) {
  return {
    min: Math.max(15000, Math.round(min / 1000) * 1000),
    max: Math.max(Math.round(max / 1000) * 1000, Math.round(min / 1000) * 1000),
  }
}

function uniqueList(values: unknown[]): string[] {
  return Array.from(
    new Set(values.filter((value): value is string => typeof value === 'string' && value.trim().length > 0)),
  )
}

function sanitizeInput(body: any): EstimatorInput | null {
  if (!body || typeof body !== 'object') return null

  const projectType = typeof body.projectType === 'string' ? body.projectType : ''
  const timeline = typeof body.timeline === 'string' ? body.timeline : ''
  const pageCount = typeof body.pageCount === 'string' ? body.pageCount : ''
  const designLevel = typeof body.designLevel === 'string' ? body.designLevel : ''
  const contentReadiness = typeof body.contentReadiness === 'string' ? body.contentReadiness : ''
  const maintenance = typeof body.maintenance === 'string' ? body.maintenance : ''

  if (
    !PROJECT_TYPES.includes(projectType as ProjectType) ||
    !TIMELINES.includes(timeline as Timeline) ||
    !PAGE_COUNTS.includes(pageCount as PageCount) ||
    !DESIGN_LEVELS.includes(designLevel as DesignLevel) ||
    !CONTENT_READINESS.includes(contentReadiness as ContentReadiness) ||
    !MAINTENANCE_LEVELS.includes(maintenance as MaintenanceLevel)
  ) {
    return null
  }

  return {
    projectType: projectType as ProjectType,
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

function buildHeuristicEstimate(input: EstimatorInput): EstimateResult {
  const baseByType: Record<ProjectType, { min: number; max: number; weeks: [number, number] }> = {
    'landing-page': { min: 25000, max: 60000, weeks: [1, 3] },
    portfolio: { min: 40000, max: 90000, weeks: [2, 4] },
    ecommerce: { min: 140000, max: 320000, weeks: [5, 10] },
    saas: { min: 280000, max: 850000, weeks: [8, 20] },
    custom: { min: 180000, max: 650000, weeks: [6, 16] },
  }

  const featureCost: Record<string, number> = {
    payment: 45000,
    auth: 25000,
    dashboard: 60000,
    blog: 18000,
    booking: 30000,
    cms: 25000,
    crm: 30000,
    analytics: 20000,
    multi_language: 22000,
    seo_setup: 18000,
    whatsapp: 10000,
  }

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

  const pageCost: Record<PageCount, number> = {
    '1-5': 0,
    '6-15': 25000,
    '16-30': 60000,
    '30+': 120000,
  }

  const pageWeeks: Record<PageCount, number> = {
    '1-5': 0,
    '6-15': 1,
    '16-30': 2,
    '30+': 4,
  }

  const designMultiplier: Record<DesignLevel, number> = {
    clean: 1,
    premium: 1.18,
    'conversion-focused': 1.28,
  }

  const contentCost: Record<ContentReadiness, number> = {
    ready: 0,
    partial: 12000,
    'need-help': 30000,
  }

  const contentWeeks: Record<ContentReadiness, number> = {
    ready: 0,
    partial: 1,
    'need-help': 2,
  }

  const maintenanceCost: Record<MaintenanceLevel, number> = {
    none: 0,
    basic: 12000,
    growth: 30000,
  }

  const maintenanceWeeks: Record<MaintenanceLevel, number> = {
    none: 0,
    basic: 0,
    growth: 1,
  }

  const urgencyMultiplier: Record<Timeline, number> = {
    asap: 1.25,
    '1-month': 1.12,
    '3-months': 1,
    flexible: 0.95,
  }

  const confidence: EstimateResult['confidence'] =
    input.projectType === 'custom' || input.notes.length > 180 || input.integrations.length > 2
      ? 'medium'
      : input.features.length >= 4
        ? 'medium'
        : 'high'

  const base = baseByType[input.projectType]
  const featuresCost = input.features.reduce((sum, feature) => sum + (featureCost[feature] || 12000), 0)
  const featuresWeeks = input.features.reduce((sum, feature) => sum + (featureWeeks[feature] || 1), 0)
  const integrationsCost = input.integrations.length * 18000
  const integrationsWeeks = input.integrations.length

  let min = base.min + pageCost[input.pageCount] + featuresCost + integrationsCost + contentCost[input.contentReadiness] + maintenanceCost[input.maintenance]
  let max = base.max + Math.round(pageCost[input.pageCount] * 1.35) + Math.round(featuresCost * 1.35) + Math.round(integrationsCost * 1.4) + contentCost[input.contentReadiness] + maintenanceCost[input.maintenance]

  min = Math.round(min * designMultiplier[input.designLevel] * urgencyMultiplier[input.timeline])
  max = Math.round(max * designMultiplier[input.designLevel] * urgencyMultiplier[input.timeline])

  const weeksMin = Math.max(1, base.weeks[0] + Math.floor(featuresWeeks * 0.6) + pageWeeks[input.pageCount] + contentWeeks[input.contentReadiness])
  const weeksMax = Math.max(weeksMin + 1, base.weeks[1] + featuresWeeks + pageWeeks[input.pageCount] + contentWeeks[input.contentReadiness] + maintenanceWeeks[input.maintenance] + integrationsWeeks)

  const cost = clampRange(min, max)

  const highlights = [
    input.projectType.replace('-', ' '),
    ...input.features.slice(0, 3).map((item) => item.replace(/_/g, ' ')),
    ...input.integrations.slice(0, 2).map((item) => `${item} integration`),
  ].filter(Boolean)

  const scope = [
    `Core build for a ${input.projectType.replace('-', ' ')} project`,
    `${input.pageCount} page scope with ${input.designLevel} design treatment`,
    input.features.length ? `Feature set includes ${input.features.join(', ')}` : 'Lean MVP feature set',
    input.integrations.length ? `External integrations: ${input.integrations.join(', ')}` : 'Minimal third-party integration complexity',
  ]

  const assumptions = [
    input.contentReadiness === 'ready' ? 'Content and brand assets are ready to use.' : 'Content/design iteration will affect final scope.',
    input.timeline === 'asap' ? 'Fast-track delivery requires tighter feedback cycles and priority allocation.' : 'Standard delivery rhythm with normal revision cycles.',
    input.projectType === 'saas' || input.projectType === 'custom' ? 'Advanced product logic may need a discovery sprint before final pricing.' : 'Estimate assumes standard agency delivery without unusual compliance constraints.',
  ]

  return {
    summary: `This looks like a ${input.designLevel} ${input.projectType.replace('-', ' ')} build with ${input.features.length || 'a small'} scoped feature set and a ${input.timeline.replace('-', ' ')} delivery target.`,
    estimated_cost_inr: cost,
    estimated_timeline_weeks: { min: weeksMin, max: weeksMax },
    confidence,
    highlighted_features: highlights.slice(0, 5),
    scope_breakdown: scope,
    assumptions,
    next_step: 'Book a discovery call to convert this into a fixed proposal with exact deliverables and milestones.',
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
    projectType: input.projectType,
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
            'You are a senior web agency solutions architect for NextGen Fusion. Return only valid JSON. Quote only in INR. Keep estimates commercially realistic for an Indian digital agency. Do not include markdown fences. Stay reasonably close to the provided baseline estimate unless the user inputs clearly justify a change.',
        },
        {
          role: 'user',
          content:
            `Generate a structured project estimate for this website/app brief.\n` +
            `Return JSON with exactly these keys: summary, estimated_cost_inr, estimated_timeline_weeks, confidence, highlighted_features, scope_breakdown, assumptions, next_step.\n` +
            `estimated_cost_inr must be {"min": number, "max": number}.\n` +
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

    const baseline = buildHeuristicEstimate(input)

    try {
      const aiEstimate = await generateWithGrok(input, baseline)
      res.json({ data: aiEstimate })
      return
    } catch (err) {
      console.error('[project-estimator] Grok estimate failed, using fallback:', err instanceof Error ? err.message : err)
    }

    res.json({ data: baseline })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Estimator failed' })
  }
})

export default router
