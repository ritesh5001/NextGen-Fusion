import type { ProjectEstimatorData } from '@/lib/api'

type ProjectType = ProjectEstimatorData['projectType']
type PageCount = ProjectEstimatorData['pageCount']
type DesignLevel = ProjectEstimatorData['designLevel']
type ContentReadiness = ProjectEstimatorData['contentReadiness']
type MaintenanceLevel = ProjectEstimatorData['maintenance']
type Timeline = ProjectEstimatorData['timeline']

const baseByType: Record<ProjectType, { min: number; max: number; weeks: [number, number] }> = {
  'landing-page': { min: 100, max: 180, weeks: [1, 2] },
  portfolio: { min: 100, max: 200, weeks: [1, 3] },
  ecommerce: { min: 100, max: 200, weeks: [2, 5] },
  saas: { min: 300, max: 1400, weeks: [4, 10] },
  custom: { min: 100, max: 2000, weeks: [2, 12] },
}

const featureCost: Record<string, number> = {
  payment: 20,
  auth: 30,
  dashboard: 150,
  blog: 20,
  booking: 40,
  cms: 20,
  crm: 50,
  analytics: 20,
  multi_language: 30,
  seo_setup: 100,
  whatsapp: 10,
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
  '6-15': 40,
  '16-30': 90,
  '30+': 180,
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
  partial: 20,
  'need-help': 60,
}

const contentWeeks: Record<ContentReadiness, number> = {
  ready: 0,
  partial: 1,
  'need-help': 2,
}

const maintenanceCost: Record<MaintenanceLevel, number> = {
  none: 0,
  basic: 20,
  growth: 60,
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

const MIN_COST = 100
const MAX_COST = 2000

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

  const featuresCost = form.features.reduce((sum, f) => sum + (featureCost[f] || 20), 0)
  const featuresWeeks = form.features.reduce((sum, f) => sum + (featureWeeks[f] ?? 1), 0)
  const integrationsCost = form.integrations.length * 25
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

export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}