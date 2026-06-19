import type { ProjectEstimatorData } from '@/lib/api'

type ProjectType = ProjectEstimatorData['projectType']
type BuildType = ProjectEstimatorData['buildType']
type EcommercePackage = ProjectEstimatorData['ecommercePackage']
type PageCount = ProjectEstimatorData['pageCount']
type DesignLevel = ProjectEstimatorData['designLevel']
type ContentReadiness = ProjectEstimatorData['contentReadiness']
type MaintenanceLevel = ProjectEstimatorData['maintenance']
type Timeline = ProjectEstimatorData['timeline']

// ─────────────────────────────────────────────────────────────────────────────
// All prices are in INR and derived from the NextGen Fusion rate card.
// This file MUST stay in sync with buildHeuristicEstimate() in
// Backend/src/routes/project-estimator.ts so the live preview tracks the server.
// ─────────────────────────────────────────────────────────────────────────────

type Range = { min: number; max: number }

// Rate-card base price (INR) by project type + build type (+ ecommerce package).
function rateCardBase(
  projectType: ProjectType,
  buildType: BuildType,
  pkg: EcommercePackage,
): Range {
  const wp = buildType === 'wordpress'

  switch (projectType) {
    case 'landing-page':
    case 'portfolio':
      // Landing Page: WordPress/Shopify ₹4,000 · Custom-Coded ₹10,000
      return wp ? { min: 4000, max: 4000 } : { min: 10000, max: 10000 }

    case 'ecommerce': {
      const table: Record<EcommercePackage, { wp: Range; custom: Range }> = {
        standard: { wp: { min: 4000, max: 4000 }, custom: { min: 50000, max: 50000 } },
        premium: { wp: { min: 6000, max: 6000 }, custom: { min: 80000, max: 80000 } },
        'extra-premium': { wp: { min: 10000, max: 10000 }, custom: { min: 100000, max: 100000 } },
        // Custom Functionality: WP ₹6,000 + plugin cost · Custom ₹1,00,000–₹2,00,000
        'custom-functionality': { wp: { min: 6000, max: 12000 }, custom: { min: 100000, max: 200000 } },
      }
      const row = table[pkg] ?? table.standard
      return wp ? row.wp : row.custom
    }

    case 'saas':
      // App / Backend / Frontend Development — ₹50,000 starting (custom-coded).
      return wp ? { min: 15000, max: 30000 } : { min: 50000, max: 120000 }

    case 'custom':
      // CRM (simple) ₹15,000 → App/Backend ₹50,000+.
      return wp ? { min: 15000, max: 30000 } : { min: 15000, max: 80000 }
  }
}

// Custom-coded feature/dev cost (INR). WordPress builds treat these as plugin cost.
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

function featureCost(feature: string, buildType: BuildType): number {
  const base = featureCostBase[feature] ?? 8000
  return Math.round(base * (buildType === 'wordpress' ? WP_FEATURE_FACTOR : 1))
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

// "+ ₹1,000 per additional page" applies to single-page / brochure builds.
const ADDITIONAL_PAGE_COST = 1000
const pageExtra: Record<PageCount, Range> = {
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

// Design level only applies to non-ecommerce; ecommerce design is set by package.
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

// Support is billed separately as a recurring plan (see computeSupport), so it is
// NOT part of the one-time build total.
const maintenanceCost: Record<MaintenanceLevel, number> = {
  none: 0,
  basic: 0,
  growth: 0,
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

const MIN_COST = 4000
const MAX_COST = 300000

function clamp(min: number, max: number): { min: number; max: number } {
  const lo = Math.max(MIN_COST, Math.round(Math.min(min, MAX_COST) / 100) * 100)
  const hi = Math.max(lo, Math.round(Math.min(max, MAX_COST) / 100) * 100)
  return { min: lo, max: hi }
}

export type Ballpark = {
  cost: { min: number; max: number }
  weeks: { min: number; max: number }
}

// ─────────────────────────────────────────────────────────────────────────────
// Ongoing support (recurring, billed separately from the one-time build).
//  - basic  : ₹2,000 / year (uptime monitoring & fixes, no content changes)
//  - growth : "support + changes" → WordPress/Shopify ₹15,000 / year,
//             custom-coded ₹5,000 / month (large changes quoted separately)
// Mirrors computeSupport() in Backend/src/routes/project-estimator.ts.
// ─────────────────────────────────────────────────────────────────────────────
export type SupportPlan = {
  amount: number // INR
  cadence: 'year' | 'month'
  label: string
  note?: string
} | null

export function computeSupport(form: ProjectEstimatorData): SupportPlan {
  switch (form.maintenance) {
    case 'none':
      return null
    case 'basic':
      return { amount: 2000, cadence: 'year', label: 'Support (uptime & fixes)' }
    case 'growth':
      return form.buildType === 'wordpress'
        ? { amount: 15000, cadence: 'year', label: 'Support + changes' }
        : {
            amount: 5000,
            cadence: 'month',
            label: 'Support + changes',
            note: 'Large or complex change requests are quoted separately.',
          }
  }
}

// Standard payment terms shown (highlighted) on every estimate.
export const PAYMENT_TERMS = '50% advance to start · 50% at payment-gateway integration'

// Integrations bundled into every ecommerce build at no extra cost.
export const ECOMMERCE_INCLUDED = ['Payment gateway integration', 'Shiprocket integration']

export function computeBallpark(form: ProjectEstimatorData): Ballpark {
  const base = rateCardBase(form.projectType, form.buildType, form.ecommercePackage)

  const featuresCost = form.features.reduce((sum, f) => sum + featureCost(f, form.buildType), 0)
  const featuresWeeks = form.features.reduce((sum, f) => sum + (featureWeeks[f] ?? 1), 0)
  const perIntegration = form.buildType === 'wordpress' ? 2500 : 10000
  const integrationsCost = form.integrations.length * perIntegration
  const integrationsWeeks = form.integrations.length

  // Additional-page cost only for single-page / brochure-style builds.
  const pageApplies = form.projectType === 'landing-page' || form.projectType === 'portfolio'
  const pageAddMin = pageApplies ? pageExtra[form.pageCount].min * ADDITIONAL_PAGE_COST : 0
  const pageAddMax = pageApplies ? pageExtra[form.pageCount].max * ADDITIONAL_PAGE_COST : 0

  const extras = contentCost[form.contentReadiness] + maintenanceCost[form.maintenance]

  let min = base.min + pageAddMin + featuresCost + integrationsCost + extras
  let max =
    base.max +
    pageAddMax +
    Math.round(featuresCost * 1.3) +
    Math.round(integrationsCost * 1.3) +
    extras

  const designMult = form.projectType === 'ecommerce' ? 1 : designMultiplier[form.designLevel]
  const urgency = urgencyMultiplier[form.timeline]
  min = Math.round(min * designMult * urgency)
  max = Math.round(max * designMult * urgency)
  if (max <= min) max = Math.round(min * 1.15)

  const baseWeeks = weeksByType[form.projectType]
  const weeksMin = Math.max(
    1,
    baseWeeks[0] + Math.floor(featuresWeeks * 0.6) + pageWeeks[form.pageCount] + contentWeeks[form.contentReadiness],
  )
  const weeksMax = Math.max(
    weeksMin + 1,
    baseWeeks[1] +
      featuresWeeks +
      pageWeeks[form.pageCount] +
      contentWeeks[form.contentReadiness] +
      maintenanceWeeks[form.maintenance] +
      integrationsWeeks,
  )

  return { cost: clamp(min, max), weeks: { min: weeksMin, max: weeksMax } }
}

// ─────────────────────────────────────────────────────────────────────────────
// Currency display. Prices are authored in INR. Indian visitors see ₹ directly;
// everyone else sees an approximate USD conversion.
// TODO: confirm the conversion rate (or wire it to a live FX source).
// ─────────────────────────────────────────────────────────────────────────────
const INR_PER_USD = 85

function prefersINR(): boolean {
  if (typeof window === 'undefined') return true // SSR default for an India-first brand
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return true
  } catch {
    // ignore — fall through to language check
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  return langs.some((l) => /(-IN$|^hi)/i.test(l))
}

export function formatCurrency(inrValue: number): string {
  if (prefersINR()) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(inrValue)
  }
  const usd = Math.round(inrValue / INR_PER_USD)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(usd)
}
