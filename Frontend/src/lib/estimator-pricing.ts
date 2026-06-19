import type { ProjectEstimatorData } from '@/lib/api'

type ProjectType = ProjectEstimatorData['projectType']
type PageCount = ProjectEstimatorData['pageCount']
type DesignLevel = ProjectEstimatorData['designLevel']
type ContentReadiness = ProjectEstimatorData['contentReadiness']
type MaintenanceLevel = ProjectEstimatorData['maintenance']
type Timeline = ProjectEstimatorData['timeline']

const baseByType: Record<ProjectType, { min: number; max: number; weeks: [number, number] }> = {
  'landing-page': { min: 400, max: 800, weeks: [1, 2] },
  portfolio: { min: 500, max: 1000, weeks: [1, 3] },
  ecommerce: { min: 900, max: 2500, weeks: [2, 5] },
  saas: { min: 2000, max: 6000, weeks: [4, 10] },
  custom: { min: 800, max: 8000, weeks: [2, 12] },
}

const featureCost: Record<string, number> = {
  payment: 150,
  auth: 200,
  dashboard: 800,
  blog: 120,
  booking: 250,
  cms: 150,
  crm: 350,
  analytics: 150,
  multi_language: 200,
  seo_setup: 400,
  whatsapp: 60,
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
  '6-15': 250,
  '16-30': 600,
  '30+': 1200,
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
  partial: 150,
  'need-help': 400,
}

const contentWeeks: Record<ContentReadiness, number> = {
  ready: 0,
  partial: 1,
  'need-help': 2,
}

const maintenanceCost: Record<MaintenanceLevel, number> = {
  none: 0,
  basic: 120,
  growth: 350,
}

const maintenanceWeeks: Record<MaintenanceLevel, number> = {
  none: 0,
  basic: 0,
  growth: 1,
}

const urgencyMultiplier: Record<Timeline, number> = {
  asap: 1.12,
  '1-month': 1.05,
  '3-months': 1,
  flexible: 0.98,
}

const MIN_COST = 400
const MAX_COST = 12000

function clamp(min: number, max: number): { min: number; max: number } {
  const lo = Math.max(MIN_COST, Math.min(min, MAX_COST))
  const hi = Math.max(lo, Math.min(max, MAX_COST))
  return { min: lo, max: hi }
}

export type Ballpark = {
  cost: { min: number; max: number }
  weeks: { min: number; max: number }
}

// Mirrors the cost/timeline math of buildHeuristicEstimate in
// Backend/src/routes/project-estimator.ts so the live preview tracks the server.
export function computeBallpark(form: ProjectEstimatorData): Ballpark {
  const base = baseByType[form.projectType]

  const featuresCost = form.features.reduce((sum, f) => sum + (featureCost[f] || 150), 0)
  const featuresWeeks = form.features.reduce((sum, f) => sum + (featureWeeks[f] ?? 1), 0)
  const integrationsCost = form.integrations.length * 150
  const integrationsWeeks = form.integrations.length

  let min =
    base.min +
    pageCost[form.pageCount] +
    featuresCost +
    integrationsCost +
    contentCost[form.contentReadiness] +
    maintenanceCost[form.maintenance]

  let max =
    base.max +
    Math.round(pageCost[form.pageCount] * 1.35) +
    Math.round(featuresCost * 1.35) +
    Math.round(integrationsCost * 1.4) +
    contentCost[form.contentReadiness] +
    maintenanceCost[form.maintenance]

  min = Math.round(min * designMultiplier[form.designLevel] * urgencyMultiplier[form.timeline])
  max = Math.round(max * designMultiplier[form.designLevel] * urgencyMultiplier[form.timeline])

  const weeksMin = Math.max(
    1,
    base.weeks[0] + Math.floor(featuresWeeks * 0.6) + pageWeeks[form.pageCount] + contentWeeks[form.contentReadiness],
  )
  const weeksMax = Math.max(
    weeksMin + 1,
    base.weeks[1] +
      featuresWeeks +
      pageWeeks[form.pageCount] +
      contentWeeks[form.contentReadiness] +
      maintenanceWeeks[form.maintenance] +
      integrationsWeeks,
  )

  return { cost: clamp(min, max), weeks: { min: weeksMin, max: weeksMax } }
}

// Prices are authored in USD. For Indian visitors we convert to INR for display.
// TODO: confirm the conversion rate (or wire it to a live FX source).
const INR_PER_USD = 85

function prefersINR(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return true
  } catch {
    // ignore — fall through to language check
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => /(-IN$|^hi)/i.test(l))
}

export function formatCurrency(usdValue: number): string {
  if (prefersINR()) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(usdValue * INR_PER_USD)
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usdValue)
}