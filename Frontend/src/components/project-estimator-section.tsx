"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  ChevronDown,
  LayoutTemplate,
  UserRound,
  ShoppingCart,
  LayoutDashboard,
  Boxes,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"
import { useMemo, useState, type ReactNode } from "react"
import BadgeSubtitle from "./badge-subtitle"
import { apiService, ProjectEstimatorData, ProjectEstimatorResponse } from "@/lib/api"
import { computeBallpark, computeSupport, formatCurrency, PAYMENT_TERMS } from "@/lib/estimator-pricing"
import { trackEvent } from "@/lib/analytics"

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const panelVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.25 } },
}

const projectTypes: { value: EstimatorForm["projectType"]; label: string; hint: string; Icon: LucideIcon }[] = [
  { value: "landing-page", label: "Landing Page", hint: "Lead-gen pages & launch funnels", Icon: LayoutTemplate },
  { value: "portfolio", label: "Portfolio", hint: "Brand-first showcase sites", Icon: UserRound },
  { value: "ecommerce", label: "eCommerce", hint: "Catalog, checkout & payments", Icon: ShoppingCart },
  { value: "saas", label: "SaaS", hint: "Marketing + user app", Icon: LayoutDashboard },
  { value: "custom", label: "Custom", hint: "Unique, integrated, operational", Icon: Boxes },
]

const featureOptions = [
  { value: "payment", label: "Payments" },
  { value: "auth", label: "User Auth" },
  { value: "dashboard", label: "Dashboard" },
  { value: "blog", label: "Blog / CMS" },
  { value: "booking", label: "Booking" },
  { value: "analytics", label: "Analytics" },
  { value: "crm", label: "CRM Sync" },
  { value: "multi_language", label: "Multi-language" },
  { value: "seo_setup", label: "SEO Setup" },
  { value: "whatsapp", label: "WhatsApp" },
] as const

const buildTypeOptions = [
  { value: "wordpress", label: "WordPress / Shopify" },
  { value: "custom", label: "Custom-Coded" },
] as const

const ecommercePackageOptions = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "extra-premium", label: "Extra Premium" },
  { value: "custom-functionality", label: "Custom Functionality" },
] as const

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "flexible", label: "Flexible" },
] as const

const pageCountOptions = [
  { value: "1-5", label: "1-5" },
  { value: "6-15", label: "6-15" },
  { value: "16-30", label: "16-30" },
  { value: "30+", label: "30+" },
] as const

const designOptions = [
  { value: "clean", label: "Clean" },
  { value: "premium", label: "Premium" },
  { value: "conversion-focused", label: "Conversion" },
] as const

const contentOptions = [
  { value: "ready", label: "Content ready" },
  { value: "partial", label: "Partial" },
  { value: "need-help", label: "Need help" },
] as const

const maintenanceOptions = [
  { value: "none", label: "None" },
  { value: "basic", label: "Support only" },
  { value: "growth", label: "Support + changes" },
] as const

const integrationOptions = [
  "Razorpay / Stripe",
  "Shiprocket",
  "HubSpot",
  "Zoho",
  "Google Analytics",
  "Meta Pixel",
  "Custom API",
] as const

// Fields the user actively picks — blank until chosen, so nothing is preselected.
type SelectableKey =
  | "projectType"
  | "buildType"
  | "ecommercePackage"
  | "timeline"
  | "pageCount"
  | "designLevel"
  | "contentReadiness"
  | "maintenance"

type EstimatorForm = Omit<ProjectEstimatorData, SelectableKey> & {
  [K in SelectableKey]: ProjectEstimatorData[K] | ""
}

const initialForm: EstimatorForm = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  projectType: "",
  buildType: "",
  ecommercePackage: "",
  features: [],
  timeline: "",
  pageCount: "",
  designLevel: "",
  contentReadiness: "",
  maintenance: "",
  integrations: [],
  goals: "",
  notes: "",
}

// Resolve the blank-slate form into a full ProjectEstimatorData once the essential
// choices exist. Untouched optional fields fall back to neutral (no-upcharge)
// defaults so the live ballpark and the API stay in agreement. Returns null while
// the essentials are still unselected.
function resolveEstimatorForm(form: EstimatorForm): ProjectEstimatorData | null {
  if (!form.projectType || !form.buildType || !form.pageCount || !form.timeline) return null
  if (form.projectType === "ecommerce" && !form.ecommercePackage) return null
  return {
    ...form,
    projectType: form.projectType,
    buildType: form.buildType,
    ecommercePackage: form.ecommercePackage || "standard",
    timeline: form.timeline,
    pageCount: form.pageCount,
    designLevel: form.designLevel || "clean",
    contentReadiness: form.contentReadiness || "ready",
    maintenance: form.maintenance || "none",
  }
}

const GRADIENT = "bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4]"

export default function ProjectEstimatorSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<EstimatorForm>(initialForm)
  const [showDetail, setShowDetail] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ProjectEstimatorResponse | null>(null)

  const resolved = useMemo(() => resolveEstimatorForm(form), [form])
  const ballpark = useMemo(() => (resolved ? computeBallpark(resolved) : null), [resolved])
  const support = useMemo(() => (resolved ? computeSupport(resolved) : null), [resolved])

  function update<K extends keyof EstimatorForm>(key: K, value: EstimatorForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleItem(key: "features" | "integrations", value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }))
  }

  const isStepOneValid = resolved !== null
  const isStepTwoValid =
    form.name.trim().length >= 2 && form.email.trim().length >= 5 && form.goals.trim().length >= 12

  async function handleEstimate() {
    if (!resolved || !isStepTwoValid) return
    setLoading(true)
    setError("")
    try {
      const response = await apiService.estimateProject(resolved)
      trackEvent("estimator_submit", { project_type: resolved.projectType })
      setResult(response)
      setStep(3)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate estimate")
    } finally {
      setLoading(false)
    }
  }

  function resetEstimator() {
    setForm(initialForm)
    setResult(null)
    setError("")
    setShowDetail(false)
    setStep(1)
  }

  const featureLabel = (value: string) =>
    featureOptions.find((f) => f.value === value)?.label ?? value.replace(/_/g, " ")

  return (
    <motion.section
      id="project-estimator"
      className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(43,53,171,0.10),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(19,203,212,0.10),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div className="max-w-3xl" variants={itemVariants}>
          <BadgeSubtitle>Project Estimator</BadgeSubtitle>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Get an instant{" "}
            <span className={`${GRADIENT} bg-clip-text text-transparent`}>price estimate</span> for your project.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Answer a few quick questions and watch your estimate update live. No back-and-forth, no waiting.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Tool */}
          <motion.div
            variants={itemVariants}
            className="order-2 rounded-3xl border border-gray-200 bg-white p-4 shadow-[0_30px_80px_rgba(17,19,24,0.08)] lg:order-1"
          >
            <div className="rounded-[20px] border border-gray-100 bg-white p-5 sm:p-7">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step-1" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <StepHeading title="Your build" subtitle="Pick the type, size, and timeline." />

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {projectTypes.map((item) => (
                        <SelectableCard
                          key={item.value}
                          active={form.projectType === item.value}
                          title={item.label}
                          subtitle={item.hint}
                          Icon={item.Icon}
                          onClick={() => update("projectType", item.value)}
                        />
                      ))}
                    </div>

                    <div className="mt-6">
                      <Segmented
                        label="How should we build it?"
                        options={buildTypeOptions}
                        value={form.buildType}
                        onChange={(v) => update("buildType", v as EstimatorForm["buildType"])}
                      />
                    </div>

                    {form.projectType === "ecommerce" && (
                      <div className="mt-6">
                        <Segmented
                          label="Store package"
                          options={ecommercePackageOptions}
                          value={form.ecommercePackage}
                          onChange={(v) => update("ecommercePackage", v as EstimatorForm["ecommercePackage"])}
                        />
                      </div>
                    )}

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <Segmented
                        label="How many pages?"
                        options={pageCountOptions}
                        value={form.pageCount}
                        onChange={(v) => update("pageCount", v as EstimatorForm["pageCount"])}
                      />
                      <Segmented
                        label="Timeline"
                        options={timelineOptions}
                        value={form.timeline}
                        onChange={(v) => update("timeline", v as EstimatorForm["timeline"])}
                      />
                    </div>

                    <div className="mt-6">
                      <label className="text-sm font-medium text-gray-700">Features you need</label>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {featureOptions.map((item) => (
                          <TagButton
                            key={item.value}
                            active={form.features.includes(item.value)}
                            onClick={() => toggleItem("features", item.value)}
                            label={item.label}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Optional detail */}
                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <button
                        type="button"
                        onClick={() => setShowDetail((s) => !s)}
                        className="flex w-full items-center justify-between text-sm font-medium text-gray-700 transition hover:text-gray-900"
                      >
                        <span>Add detail for a sharper estimate (optional)</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showDetail ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {showDetail && (
                          <motion.div
                            key="detail"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                              <Segmented
                                label="Design quality"
                                options={designOptions}
                                value={form.designLevel}
                                onChange={(v) => update("designLevel", v as EstimatorForm["designLevel"])}
                              />
                              <Segmented
                                label="Content readiness"
                                options={contentOptions}
                                value={form.contentReadiness}
                                onChange={(v) => update("contentReadiness", v as EstimatorForm["contentReadiness"])}
                              />
                              <Segmented
                                label="Post-launch support"
                                options={maintenanceOptions}
                                value={form.maintenance}
                                onChange={(v) => update("maintenance", v as EstimatorForm["maintenance"])}
                              />
                            </div>
                            <div className="mt-5">
                              <label className="text-sm font-medium text-gray-700">Integrations</label>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {integrationOptions.map((item) => (
                                  <TagButton
                                    key={item}
                                    active={form.integrations.includes(item)}
                                    onClick={() => toggleItem("integrations", item)}
                                    label={item}
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <StepHeading title="Where to send it" subtitle="A couple of details and your estimate is ready." />

                    <div className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Your name">
                          <input
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Ritesh Kumar"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Work email">
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@company.com"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Field label="Phone (optional)">
                          <input
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                          />
                        </Field>
                        <Field label="Company (optional)">
                          <input
                            value={form.companyName}
                            onChange={(e) => update("companyName", e.target.value)}
                            placeholder="NextGen Fusion"
                            className={inputClass}
                          />
                        </Field>
                      </div>
                      <Field label="What's the main goal of this project?">
                        <textarea
                          value={form.goals}
                          onChange={(e) => update("goals", e.target.value)}
                          rows={3}
                          placeholder="e.g. A high-conversion site with quote requests, CRM capture, and SEO-ready service pages."
                          className={textareaClass}
                        />
                      </Field>
                      <Field label="Anything else? (optional)">
                        <textarea
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          rows={3}
                          placeholder="Design inspiration, constraints, admin workflows, or anything unusual."
                          className={textareaClass}
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {step === 3 && result && (
                  <motion.div key="step-3" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <StepHeading title="Your estimate" subtitle="A first-pass scope and budget from your brief." />
                      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Scope generated
                      </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[24px] bg-[#0b0d12] p-6 text-white">
                      <p className="text-xs uppercase tracking-[0.22em] text-white/50">Estimated investment</p>
                      <div className={`mt-3 text-3xl font-bold sm:text-4xl ${GRADIENT} bg-clip-text text-transparent`}>
                        {formatCurrency(result.estimated_cost_inr.min)} – {formatCurrency(result.estimated_cost_inr.max)}
                      </div>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{result.summary}</p>

                      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <MetricCard
                          label="Timeline"
                          value={`${result.estimated_timeline_weeks.min}-${result.estimated_timeline_weeks.max} weeks`}
                        />
                        <MetricCard label="Confidence" value={result.confidence} />
                        <MetricCard
                          label="Feature focus"
                          value={result.highlighted_features.slice(0, 2).join(" + ") || "Core build"}
                        />
                      </div>
                    </div>

                    {/* Highlighted payment terms + ongoing support */}
                    <div className={`mt-6 rounded-2xl p-[1.5px] ${GRADIENT}`}>
                      <div className="rounded-[15px] bg-white p-5">
                        <div className="flex items-start gap-3">
                          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#8A38F5]" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">Payment terms</p>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              {result.payment_terms ?? "50% advance to start · 50% at payment-gateway integration"}
                            </p>
                          </div>
                        </div>
                        {result.support && (
                          <div className="mt-4 flex items-start gap-3 border-t border-gray-100 pt-4">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                            <div>
                              <p className="text-sm font-semibold text-gray-900">
                                {result.support.label} —{" "}
                                <span className={`${GRADIENT} bg-clip-text text-transparent`}>
                                  {formatCurrency(result.support.amount)}/
                                  {result.support.cadence === "year" ? "yr" : "mo"}
                                </span>
                              </p>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Recurring, billed separately from the one-time build.
                                {result.support.note ? ` ${result.support.note}` : ""}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                      <ListCard title="Highlighted features" items={result.highlighted_features} />
                      <ListCard title="Scope breakdown" items={result.scope_breakdown} />
                    </div>

                    <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <p className="text-sm font-semibold text-gray-900">Assumptions</p>
                      <ul className="mt-3 space-y-2">
                        {result.assumptions.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-gray-600">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#8A38F5]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm font-medium text-gray-900">{result.next_step}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-500">
                  {step === 1 && "Shape the brief — the price updates as you go."}
                  {step === 2 && "Last step before your tailored estimate."}
                  {step === 3 && "Use this as the opener for a discovery call."}
                </div>
                <div className="flex flex-wrap gap-2">
                  {step === 2 && (
                    <button onClick={() => setStep(1)} className={secondaryButtonClass}>
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  )}
                  {step === 1 && (
                    <button onClick={() => setStep(2)} disabled={!isStepOneValid} className={primaryButtonClass}>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  {step === 2 && (
                    <button onClick={handleEstimate} disabled={!isStepTwoValid || loading} className={primaryButtonClass}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      {loading ? "Estimating..." : "Generate estimate"}
                    </button>
                  )}
                  {step === 3 && (
                    <>
                      <a href="#contact-section" className={secondaryButtonClass}>
                        Discuss this project
                      </a>
                      <button onClick={resetEstimator} className={primaryButtonClass}>
                        Run another estimate
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live preview */}
          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 overflow-hidden rounded-3xl border border-white/10 bg-[#0b0d12] p-7 text-white shadow-[0_25px_80px_rgba(0,0,0,0.18)]">
              <div className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full ${GRADIENT} opacity-20 blur-3xl`} />

              <div className="relative">
                <div className="flex items-center gap-2 text-white/60">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium uppercase tracking-[0.22em]">
                    {step === 3 ? "Tailored estimate" : "Ballpark estimate"}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={
                      step === 3 && result
                        ? `final-${result.estimated_cost_inr.min}-${result.estimated_cost_inr.max}`
                        : ballpark
                          ? `bp-${ballpark.cost.min}-${ballpark.cost.max}`
                          : "bp-empty"
                    }
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${GRADIENT} bg-clip-text text-transparent`}
                  >
                    {step === 3 && result
                      ? `${formatCurrency(result.estimated_cost_inr.min)} – ${formatCurrency(result.estimated_cost_inr.max)}`
                      : ballpark
                        ? `${formatCurrency(ballpark.cost.min)} – ${formatCurrency(ballpark.cost.max)}`
                        : "—"}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
                  {ballpark ? (
                    <span>
                      Timeline:{" "}
                      <span className="font-medium text-white">
                        {step === 3 && result
                          ? `${result.estimated_timeline_weeks.min}-${result.estimated_timeline_weeks.max}`
                          : `${ballpark.weeks.min}-${ballpark.weeks.max}`}{" "}
                        weeks
                      </span>
                    </span>
                  ) : (
                    <span className="text-white/50">Pick your build to see a live estimate.</span>
                  )}
                  {support && (
                    <span>
                      Support:{" "}
                      <span className="font-medium text-white">
                        {formatCurrency(support.amount)}/{support.cadence === "year" ? "yr" : "mo"}
                      </span>
                    </span>
                  )}
                </div>

                <p className="mt-3 text-xs leading-5 text-white/55">{PAYMENT_TERMS}</p>

                {/* Drivers */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {form.projectType && (
                    <Pill>{projectTypes.find((p) => p.value === form.projectType)?.label}</Pill>
                  )}
                  {form.pageCount && <Pill>{form.pageCount} pages</Pill>}
                  {form.features.slice(0, 3).map((f) => (
                    <Pill key={f}>{featureLabel(f)}</Pill>
                  ))}
                  {form.features.length > 3 && <Pill>+{form.features.length - 3} more</Pill>}
                  {form.integrations.length > 0 && <Pill>{form.integrations.length} integrations</Pill>}
                </div>

                <p className="mt-6 text-xs leading-5 text-white/45">
                  {step === 3
                    ? "Locked in from your brief. Book a call to turn it into a fixed quote."
                    : "A live ballpark — refined into an exact figure when you submit."}
                </p>

                {/* Progress */}
                {step < 3 && (
                  <div className="mt-6">
                    <div className="flex gap-2">
                      {[1, 2].map((s) => (
                        <div
                          key={s}
                          className={`h-1.5 flex-1 rounded-full transition ${
                            s <= step ? GRADIENT : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-white/45">Step {step} of 2</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">{subtitle}</p>
    </div>
  )
}

function SelectableCard({
  active,
  title,
  subtitle,
  Icon,
  onClick,
}: {
  active: boolean
  title: string
  subtitle: string
  Icon: LucideIcon
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition ${
        active
          ? "border-transparent bg-[#0b0d12] text-white shadow-[0_12px_30px_rgba(17,19,24,0.16)]"
          : "border-gray-200 bg-white text-gray-900 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          active ? `${GRADIENT} text-white` : "bg-gray-100 text-gray-600"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className={`mt-0.5 block text-xs leading-5 ${active ? "text-white/65" : "text-gray-500"}`}>
          {subtitle}
        </span>
      </span>
    </button>
  )
}

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly { value: T; label: string }[]
  value: T | ""
  onChange: (value: T) => void
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((item) => (
          <TagButton
            key={item.value}
            active={value === item.value}
            onClick={() => onChange(item.value)}
            label={item.label}
          />
        ))}
      </div>
    </div>
  )
}

function TagButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? `border-transparent ${GRADIENT} text-white shadow-sm`
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
      }`}
    >
      {label}
    </button>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</div>
      <div className="mt-2 text-lg font-semibold capitalize text-white">{value}</div>
    </div>
  )
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm capitalize leading-6 text-gray-600">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${GRADIENT}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium capitalize text-white/80">
      {children}
    </span>
  )
}

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#8A38F5] focus:bg-white focus:ring-2 focus:ring-[#8A38F5]/15"

const textareaClass =
  "w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition focus:border-[#8A38F5] focus:bg-white focus:ring-2 focus:ring-[#8A38F5]/15"

const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"

const secondaryButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-gray-300 hover:bg-gray-50"
