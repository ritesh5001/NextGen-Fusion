"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Loader2, IndianRupee, CalendarClock, Layers3, Rocket } from "lucide-react"
import { useState, type ReactNode } from "react"
import BadgeSubtitle from "./badge-subtitle"
import { apiService, ProjectEstimatorData, ProjectEstimatorResponse } from "@/lib/api"

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

const projectTypes = [
  { value: "landing-page", label: "Landing Page", hint: "Fast lead generation pages and launch funnels" },
  { value: "portfolio", label: "Portfolio", hint: "Brand-first showcase sites and studio presence" },
  { value: "ecommerce", label: "eCommerce", hint: "Catalog, checkout, payments, and conversion flows" },
  { value: "saas", label: "SaaS", hint: "Product marketing + user app experience" },
  { value: "custom", label: "Custom", hint: "Something more unique, integrated, or operational" },
] as const

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

const timelineOptions = [
  { value: "asap", label: "ASAP", note: "Fast-track delivery" },
  { value: "1-month", label: "1 Month", note: "Compressed but feasible" },
  { value: "3-months", label: "3 Months", note: "Standard delivery pace" },
  { value: "flexible", label: "Flexible", note: "Best value and planning room" },
] as const

const pageCountOptions = [
  { value: "1-5", label: "1-5 pages" },
  { value: "6-15", label: "6-15 pages" },
  { value: "16-30", label: "16-30 pages" },
  { value: "30+", label: "30+ pages" },
] as const

const designOptions = [
  { value: "clean", label: "Clean", hint: "Simple, professional, solid" },
  { value: "premium", label: "Premium", hint: "More crafted layouts and polish" },
  { value: "conversion-focused", label: "Conversion Focused", hint: "Sharper UX strategy and testing intent" },
] as const

const contentOptions = [
  { value: "ready", label: "Content is ready" },
  { value: "partial", label: "Partial content ready" },
  { value: "need-help", label: "Need help with copy/content" },
] as const

const maintenanceOptions = [
  { value: "none", label: "No maintenance" },
  { value: "basic", label: "Basic support" },
  { value: "growth", label: "Growth + iteration support" },
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

type EstimatorForm = ProjectEstimatorData

const initialForm: EstimatorForm = {
  name: "",
  email: "",
  phone: "",
  companyName: "",
  projectType: "landing-page",
  features: [],
  timeline: "3-months",
  pageCount: "1-5",
  designLevel: "premium",
  contentReadiness: "partial",
  maintenance: "basic",
  integrations: [],
  goals: "",
  notes: "",
}

export default function ProjectEstimatorSection() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<EstimatorForm>(initialForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<ProjectEstimatorResponse | null>(null)

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

  const isStepOneValid = !!form.projectType && !!form.timeline && !!form.pageCount
  const isStepTwoValid = !!form.designLevel && !!form.contentReadiness && !!form.maintenance
  const isStepThreeValid = form.name.trim().length >= 2 && form.email.trim().length >= 5 && form.goals.trim().length >= 12

  async function handleEstimate() {
    if (!isStepOneValid || !isStepTwoValid || !isStepThreeValid) return
    setLoading(true)
    setError("")
    try {
      const response = await apiService.estimateProject(form)
      setResult(response)
      setStep(4)
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
    setStep(1)
  }

  return (
    <motion.section
      id="project-estimator"
      className="relative overflow-hidden bg-[#f7f5ef] px-4 py-20 sm:px-6 md:py-28 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(240,180,41,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div className="max-w-3xl" variants={itemVariants}>
          <BadgeSubtitle className="border-[#d6c8a4] bg-white/70 text-[#61553a]">Project Estimator</BadgeSubtitle>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#151515] sm:text-4xl md:text-5xl">
            Give visitors a serious project estimate before they even book the call.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#5a5a5a] sm:text-lg">
            Visitors answer a serious project brief, then get a tailored price range, delivery window, and scope summary based on what they actually want built.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={itemVariants}
            className="rounded-[28px] border border-[#ded6c3] bg-[#111318] p-7 text-white shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0b429] text-[#111318]">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#f0d79b]">Why It Hits</p>
                <p className="mt-1 text-xl font-semibold">A pricing conversation without the friction.</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Benefit icon={<IndianRupee className="h-4 w-4" />} title="Commercially grounded estimates" text="The estimator is anchored with real delivery logic so numbers stay believable." />
              <Benefit icon={<Layers3 className="h-4 w-4" />} title="Scope discovery built in" text="It asks enough about pages, integrations, content, and features to feel serious." />
              <Benefit icon={<CalendarClock className="h-4 w-4" />} title="Timeline-aware pricing" text="Urgent delivery requests naturally come back with higher estimates." />
              <Benefit icon={<Rocket className="h-4 w-4" />} title="Positioning asset" text="This becomes a standout homepage feature, not just another contact form." />
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#f0d79b]">Current Intake</p>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className={`h-2 flex-1 rounded-full transition ${
                      item <= step ? "bg-[#f0b429]" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-white/75">
                Step {step === 4 ? "4" : step} of 4. The last step returns a polished estimate ready to push the lead toward a call.
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[32px] border border-[#dfd7c5] bg-white/90 p-4 shadow-[0_30px_80px_rgba(17,19,24,0.08)] backdrop-blur"
          >
            <div className="rounded-[24px] border border-[#ece6d8] bg-white p-5 sm:p-7">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step-1" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <StepHeading title="Project basics" subtitle="Start with the build type, expected size, and delivery urgency." />

                    <div className="mt-6 grid gap-3">
                      {projectTypes.map((item) => (
                        <SelectableCard
                          key={item.value}
                          active={form.projectType === item.value}
                          title={item.label}
                          subtitle={item.hint}
                          onClick={() => update("projectType", item.value)}
                        />
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                      <SelectBlock label="How many pages?">
                        <select value={form.pageCount} onChange={(e) => update("pageCount", e.target.value as EstimatorForm["pageCount"])} className={selectClass}>
                          {pageCountOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </SelectBlock>
                      <SelectBlock label="What is your timeline?">
                        <select value={form.timeline} onChange={(e) => update("timeline", e.target.value as EstimatorForm["timeline"])} className={selectClass}>
                          {timelineOptions.map((item) => <option key={item.value} value={item.value}>{item.label} · {item.note}</option>)}
                        </select>
                      </SelectBlock>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step-2" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <StepHeading title="Features and build depth" subtitle="Choose the systems and complexity layers that affect delivery." />

                    <div className="mt-6">
                      <label className="text-sm font-medium text-[#3e3a33]">Which features do you need?</label>
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

                    <div className="mt-6">
                      <label className="text-sm font-medium text-[#3e3a33]">Any integrations?</label>
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

                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                      <SelectBlock label="Design quality">
                        <select value={form.designLevel} onChange={(e) => update("designLevel", e.target.value as EstimatorForm["designLevel"])} className={selectClass}>
                          {designOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </SelectBlock>
                      <SelectBlock label="Content readiness">
                        <select value={form.contentReadiness} onChange={(e) => update("contentReadiness", e.target.value as EstimatorForm["contentReadiness"])} className={selectClass}>
                          {contentOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </SelectBlock>
                      <SelectBlock label="Post-launch support">
                        <select value={form.maintenance} onChange={(e) => update("maintenance", e.target.value as EstimatorForm["maintenance"])} className={selectClass}>
                          {maintenanceOptions.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                      </SelectBlock>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step-3" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <StepHeading title="Project intent" subtitle="Give the estimator the business context and contact details needed to save the request properly." />

                    <div className="mt-6 space-y-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#3e3a33]">Your name</label>
                          <input
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="Ritesh Kumar"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#3e3a33]">Work email</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => update("email", e.target.value)}
                            placeholder="you@company.com"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#3e3a33]">Phone number</label>
                          <input
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium text-[#3e3a33]">Company name</label>
                          <input
                            value={form.companyName}
                            onChange={(e) => update("companyName", e.target.value)}
                            placeholder="NextGen Fusion"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#3e3a33]">What is the main goal of this project?</label>
                        <textarea
                          value={form.goals}
                          onChange={(e) => update("goals", e.target.value)}
                          rows={4}
                          placeholder="Example: We need a high-conversion site for a marine services company with quote requests, CRM capture, and SEO-ready service pages."
                          className={textareaClass}
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#3e3a33]">Anything else we should consider?</label>
                        <textarea
                          value={form.notes}
                          onChange={(e) => update("notes", e.target.value)}
                          rows={5}
                          placeholder="Mention design inspiration, industry constraints, multilingual needs, admin workflows, inventory logic, or anything unusual."
                          className={textareaClass}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 4 && result && (
                  <motion.div key="step-4" variants={panelVariants} initial="hidden" animate="visible" exit="exit">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <StepHeading title="Your project estimate" subtitle="A first-pass scope and budget range generated from your brief." />
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#d8d0bc] bg-[#faf7f1] px-3 py-1 text-xs font-medium text-[#5f553d]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Project scope generated
                      </div>
                    </div>

                    <div className="mt-6 rounded-[28px] bg-[#111318] p-6 text-white">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#f0d79b]">Estimated investment</p>
                      <div className="mt-3 text-3xl font-semibold sm:text-4xl">
                        {formatINR(result.estimated_cost_inr.min)} to {formatINR(result.estimated_cost_inr.max)}
                      </div>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">{result.summary}</p>

                      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <MetricCard label="Timeline" value={`${result.estimated_timeline_weeks.min}-${result.estimated_timeline_weeks.max} weeks`} />
                        <MetricCard label="Confidence" value={result.confidence} />
                        <MetricCard label="Feature focus" value={result.highlighted_features.slice(0, 2).join(" + ") || "Core build"} />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
                      <ListCard title="Highlighted features" items={result.highlighted_features} />
                      <ListCard title="Scope breakdown" items={result.scope_breakdown} />
                    </div>

                    <div className="mt-5 rounded-3xl border border-[#e5decd] bg-[#faf7f1] p-5">
                      <p className="text-sm font-semibold text-[#1f1f1f]">Assumptions</p>
                      <ul className="mt-3 space-y-2">
                        {result.assumptions.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#5d584d]">
                            <CheckCircle2 className="mt-1 h-4 w-4 text-[#b8860b]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-sm font-medium text-[#1f1f1f]">{result.next_step}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 border-t border-[#ede7d8] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-[#6b6558]">
                  {step < 4 ? "Shape the brief, then get a pricing window." : "Use this estimate as the opener for a discovery call or proposal."}
                </div>
                <div className="flex flex-wrap gap-2">
                  {step > 1 && step < 4 && (
                    <button onClick={() => setStep((current) => current - 1)} className={secondaryButtonClass}>
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
                    <button onClick={() => setStep(3)} disabled={!isStepTwoValid} className={primaryButtonClass}>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                  {step === 3 && (
                    <button onClick={handleEstimate} disabled={!isStepThreeValid || loading} className={primaryButtonClass}>
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                      {loading ? "Estimating..." : "Generate estimate"}
                    </button>
                  )}
                  {step === 4 && (
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
        </div>
      </div>
    </motion.section>
  )
}

function StepHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold tracking-tight text-[#151515] sm:text-3xl">{title}</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68614f] sm:text-base">{subtitle}</p>
    </div>
  )
}

function Benefit({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-[#f0d79b]">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm leading-6 text-white/72">{text}</p>
    </div>
  )
}

function SelectableCard({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean
  title: string
  subtitle: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
        active
          ? "border-[#111318] bg-[#111318] text-white shadow-[0_12px_30px_rgba(17,19,24,0.16)]"
          : "border-[#e5decd] bg-[#fbfaf7] text-[#1f1f1f] hover:border-[#bcae87]"
      }`}
    >
      <div className="text-base font-semibold">{title}</div>
      <div className={`mt-1 text-sm leading-6 ${active ? "text-white/72" : "text-[#6d6554]"}`}>{subtitle}</div>
    </button>
  )
}

function TagButton({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? "border-[#f0b429] bg-[#f0b429] text-[#111318]"
          : "border-[#dfd7c4] bg-white text-[#4d473b] hover:border-[#bcae87]"
      }`}
    >
      {label}
    </button>
  )
}

function SelectBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#3e3a33]">{label}</span>
      {children}
    </label>
  )
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-[0.18em] text-white/48">{label}</div>
      <div className="mt-2 text-lg font-semibold text-white">{value}</div>
    </div>
  )
}

function ListCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-[#e5decd] bg-white p-5">
      <p className="text-sm font-semibold text-[#1f1f1f]">{title}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[#5d584d]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#b8860b]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

const selectClass =
  "w-full rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"

const inputClass =
  "w-full rounded-2xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"

const textareaClass =
  "w-full rounded-3xl border border-[#e1d9c8] bg-[#fbfaf7] px-4 py-3 text-sm leading-6 text-[#1f1f1f] outline-none transition focus:border-[#111318] focus:ring-2 focus:ring-[#111318]/10"

const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-full bg-[#111318] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#1a1d24] disabled:cursor-not-allowed disabled:opacity-50"

const secondaryButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-[#ddd4c0] bg-white px-5 py-3 text-sm font-medium text-[#2a2926] transition hover:border-[#b9aa82] hover:bg-[#faf7f1]"
