"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { trackEvent } from "@/lib/analytics"
import { cn } from "@/lib/utils"
import { whatsappHref } from "@/lib/whatsapp"

export type FinderProblem = {
  symptom: string
  cause: string
  steps: string[]
  link?: { href: string; label: string }
}

type Props = {
  heading: string
  intro: string
  /** Where the visitor's business is, used in the WhatsApp message. */
  place: string
  problems: FinderProblem[]
}

/**
 * Pick the problem that sounds like your business, see why it happens and what
 * we would do first. Every panel is in the HTML (inactive ones are `hidden`),
 * so the full diagnosis is crawlable without JavaScript.
 */
export function GrowthProblemFinder({ heading, intro, place, problems }: Props) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = problems.length - 1
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? index === last ? 0 : index + 1
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? index === 0 ? last : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section aria-labelledby={`${baseId}-heading`} className="mb-16">
      <h2 id={`${baseId}-heading`} className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-4 leading-relaxed text-gray-600">{intro}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div role="tablist" aria-orientation="vertical" aria-label="Common growth problems" className="flex flex-col gap-2">
          {problems.map((problem, index) => (
            <button
              key={problem.symptom}
              ref={(node) => {
                tabs.current[index] = node
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={active === index}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "rounded-xl border px-4 py-3 text-left text-sm font-medium leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                active === index
                  ? "border-purple-600 bg-purple-50 text-purple-900"
                  : "border-gray-200 text-gray-800 hover:border-gray-400",
              )}
            >
              &ldquo;{problem.symptom}&rdquo;
            </button>
          ))}
        </div>

        {problems.map((problem, index) => {
          const message = `Hi NextGen Fusion, I run a business in ${place}. Our problem: "${problem.symptom}". Can you help?`
          return (
            <div
              key={problem.symptom}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              hidden={active !== index}
              tabIndex={0}
              className="rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">Why this happens</p>
              <p className="mt-2 leading-relaxed text-gray-700">{problem.cause}</p>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-purple-600">What we would do first</p>
              <ol className="mt-3 space-y-3">
                {problem.steps.map((step, stepIndex) => (
                  <li key={step} className="flex gap-3 text-gray-700">
                    <span
                      aria-hidden="true"
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white"
                    >
                      {stepIndex + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={whatsappHref(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("whatsapp_click", { source: "au_problem_finder", place })}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Ask us about this on WhatsApp
                </a>
                {problem.link && (
                  <Link
                    href={problem.link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-900 transition-colors hover:border-gray-900"
                  >
                    {problem.link.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
