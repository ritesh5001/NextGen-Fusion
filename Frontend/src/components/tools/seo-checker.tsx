"use client"

import { useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, MessageCircle, Search, XCircle } from "lucide-react"
import { apiService, type SeoCheck, type SeoCheckStatus, type SeoReport } from "@/lib/api"
import { trackEvent } from "@/lib/analytics"
import { TURNSTILE_ENABLED } from "@/lib/turnstile"
import { cn } from "@/lib/utils"
import { Turnstile, type TurnstileHandle } from "@/components/turnstile"
import { whatsappHref } from "@/lib/whatsapp"

const GROUPS: SeoCheck["group"][] = ["Search basics", "Content", "Technical", "Sharing"]

const STATUS: Record<SeoCheckStatus, { Icon: typeof CheckCircle2; className: string; label: string }> = {
  fail: { Icon: XCircle, className: "text-red-600", label: "Fix" },
  warn: { Icon: AlertTriangle, className: "text-amber-500", label: "Improve" },
  pass: { Icon: CheckCircle2, className: "text-emerald-600", label: "Good" },
}

const ORDER: Record<SeoCheckStatus, number> = { fail: 0, warn: 1, pass: 2 }

function scoreTone(score: number) {
  if (score >= 90) return { ring: "stroke-emerald-500", text: "text-emerald-600", word: "Strong" }
  if (score >= 70) return { ring: "stroke-amber-500", text: "text-amber-600", word: "Needs work" }
  return { ring: "stroke-red-500", text: "text-red-600", word: "Holding you back" }
}

function ScoreRing({ score }: { score: number }) {
  const tone = scoreTone(score)
  const circumference = 2 * Math.PI * 42
  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="42" className="fill-none stroke-gray-100" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="42"
          className={cn("fill-none transition-[stroke-dashoffset] duration-700", tone.ring)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - score / 100)}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-3xl font-bold", tone.text)}>{score}</span>
        <span className="text-xs text-ink-mute">out of 100</span>
      </div>
    </div>
  )
}

function CheckRow({ check }: { check: SeoCheck }) {
  const { Icon, className, label } = STATUS[check.status]
  return (
    <li className="flex gap-3 py-4">
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", className)} aria-label={label} />
      <div className="min-w-0">
        <p className="font-medium text-ink">{check.label}</p>
        <p className="mt-1 break-words text-sm leading-6 text-ink-soft">{check.detail}</p>
        {check.fix && (
          <p className="mt-2 break-words rounded-[20px] bg-white/50 px-3 py-2 text-sm leading-6 text-ink-soft">
            <span className="font-semibold text-ink">How to fix: </span>
            {check.fix}
          </p>
        )}
      </div>
    </li>
  )
}

function Report({ report }: { report: SeoReport }) {
  const counts = { fail: 0, warn: 0, pass: 0 }
  report.checks.forEach((check) => counts[check.status]++)
  const tone = scoreTone(report.score)
  const host = new URL(report.finalUrl).host
  const message = `Hi NextGen Fusion, I ran your SEO checker on ${host} (score ${report.score}/100). Can you help fix the issues?`

  return (
    <div className="glass mt-8 rounded-[36px] p-5 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <ScoreRing score={report.score} />
        <div className="min-w-0">
          <p className={cn("text-sm font-semibold uppercase tracking-wide", tone.text)}>{tone.word}</p>
          <p className="mt-1 break-all text-lg font-semibold text-ink">{report.finalUrl}</p>
          <p className="mt-2 text-sm text-ink-soft">
            <span className="font-medium text-red-600">{counts.fail} to fix</span> ·{" "}
            <span className="font-medium text-amber-600">{counts.warn} to improve</span> ·{" "}
            <span className="font-medium text-emerald-600">{counts.pass} good</span>
          </p>
        </div>
      </div>

      {GROUPS.map((group) => {
        const checks = report.checks.filter((check) => check.group === group).sort((a, b) => ORDER[a.status] - ORDER[b.status])
        if (checks.length === 0) return null
        return (
          <section key={group} className="mt-8">
            <h3 className="text-lg font-medium text-ink tracking-tight">{group}</h3>
            <ul className="divide-y divide-ink/10">
              {checks.map((check) => (
                <CheckRow key={check.id} check={check} />
              ))}
            </ul>
          </section>
        )
      })}

      <div className="glass mt-8 rounded-[28px] p-5">
        <p className="font-semibold text-ink">What this check does not cover</p>
        <p className="mt-1 text-sm leading-6 text-ink-soft">
          Page speed in a real browser, backlinks and rankings. For speed, run the same page through Google&apos;s own
          tool.
        </p>
        <a
          href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(report.finalUrl)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
        >
          Test speed on PageSpeed Insights <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {(counts.fail > 0 || counts.warn > 0) && (
        <div className="mt-6 flex flex-col gap-3 rounded-[28px] bg-ink p-5 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold">Want these fixed?</p>
            <p className="mt-1 text-sm text-white/70">Send us the report and we&apos;ll tell you what to fix first, free.</p>
          </div>
          <a
            href={whatsappHref(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { source: "seo_checker" })}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink hover:bg-white/70"
          >
            <MessageCircle className="h-4 w-4" /> Send on WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}

export function SeoChecker() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [report, setReport] = useState<SeoReport | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<TurnstileHandle>(null)
  const captchaReady = !TURNSTILE_ENABLED || captchaToken !== null

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!url.trim() || loading || !captchaReady) return
    setLoading(true)
    setError("")
    setReport(null)
    try {
      const result = await apiService.checkSite(url, captchaToken)
      setReport(result)
      trackEvent("seo_check", { score: result.score })
    } catch (err) {
      setError(err instanceof Error ? err.message : "The check could not be completed. Please try again.")
    } finally {
      setLoading(false)
      captchaRef.current?.reset()
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit} className="glass rounded-[36px] p-3 shadow-[0_20px_60px_rgba(17,19,24,0.08)] sm:p-4">
        <label htmlFor="seo-check-url" className="sr-only">
          Website address
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="seo-check-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="yourwebsite.com"
            className="min-w-0 flex-1 rounded-[28px] border border-ink/10 bg-white/50 px-4 py-3.5 text-base text-ink outline-none transition focus:border-violet focus:bg-white focus:ring-2 focus:ring-violet/15"
          />
          <button
            type="submit"
            disabled={!url.trim() || loading || !captchaReady}
            className="inline-flex items-center justify-center gap-2 rounded-[28px] bg-ink px-6 py-3.5 text-base font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            {loading ? "Checking…" : "Check my site"}
          </button>
        </div>
        <Turnstile ref={captchaRef} action="seo_checker" onToken={setCaptchaToken} className="mt-3" />
      </form>
      <p className="mt-3 text-sm text-ink-mute">
        Free, no sign-up. We read the page once, the way Google does, and don&apos;t store the result.{" "}
        <Link href="#what-we-check" className="font-medium text-brand hover:underline">
          What we check
        </Link>
      </p>

      <div aria-live="polite">
        {loading && <p className="mt-6 text-sm text-ink-soft">Reading the page, robots.txt and sitemap. This takes up to 20 seconds…</p>}
        {error && <p className="mt-6 rounded-[28px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        {report && <Report report={report} />}
      </div>
    </div>
  )
}
