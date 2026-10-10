"use client"

import { useMemo, useState } from "react"
import { useNearViewport } from "@/hooks/use-near-viewport"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, FileText, Globe } from "lucide-react"
import {
  deliveredProjects,
  CATEGORY_LABELS,
  ECOMMERCE_SUBCATEGORIES,
  type DeliveredProject,
  type DeliveredCategory,
} from "@/lib/delivered-projects"

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-ink text-white" : "glass text-ink-soft hover:bg-white"
      }`}
    >
      {children}
    </button>
  )
}

function DeliveredCard({ project }: { project: DeliveredProject }) {
  const [errored, setErrored] = useState(false)
  const [mediaRef, near] = useNearViewport<HTMLDivElement>()
  const caseStudyHref = project.caseStudySlug ? `/work/${project.caseStudySlug}/` : undefined

  // One primary link stretched over the whole card (case study when there is
  // one, otherwise the live site). The live-site link on case-study cards sits
  // above it with z-10, so there is never an <a> nested inside another <a>.
  // min-h-6 keeps the visible link at least 24px tall (WCAG 2.5.8); the
  // stretched ::after already makes the whole card clickable, but tap-target
  // audits measure the link's own box.
  const primaryClass =
    "inline-block max-w-full truncate py-0.5 align-top after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[24px] focus-visible:after:ring-2 focus-visible:after:ring-ink"

  return (
    <div className="glass group relative rounded-[24px] p-2 transition-all hover:-translate-y-1 hover:bg-white">
      <div ref={mediaRef} className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-canvas-deep">
        {!near ? null : errored ? (
          <div className="wash-pink flex h-full w-full items-center justify-center px-3 text-center text-sm font-medium text-ink">
            {project.host}
          </div>
        ) : (
          <Image
            src={project.image}
            alt={`${project.name} — website delivered by NextGen Fusion`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setErrored(true)}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {caseStudyHref ? (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-lime px-2.5 py-1 text-xs font-medium text-ink">
            <FileText className="h-3 w-3" aria-hidden="true" />
            Case study
          </span>
        ) : (
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-medium text-ink">
            <Globe className="h-3 w-3" aria-hidden="true" />
            Live site
          </span>
        )}
        <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-lime opacity-0 transition-opacity group-hover:opacity-100">
          {caseStudyHref ? <ArrowRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
        </div>
      </div>
      <div className="px-2 pb-1.5 pt-3">
        <p className="truncate text-sm font-medium text-ink">
          {caseStudyHref ? (
            <Link href={caseStudyHref} prefetch={false} className={primaryClass}>
              {project.name}
              <span className="sr-only"> — read the case study</span>
            </Link>
          ) : (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className={primaryClass}>
              {project.name}
              <span className="sr-only"> — visit the live site (opens in a new tab)</span>
            </a>
          )}
        </p>
        {caseStudyHref ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex min-h-6 w-fit max-w-full items-center gap-0.5 truncate py-1 text-xs text-ink-mute hover:text-ink hover:underline"
          >
            Live site: {project.host}
            <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        ) : (
          <p className="truncate py-1 text-xs text-ink-mute">{project.host}</p>
        )}
        <span className="mt-1.5 inline-block rounded-full bg-canvas px-2.5 py-0.5 text-xs font-medium text-ink-soft">
          {project.subcategory ?? CATEGORY_LABELS[project.category]}
        </span>
      </div>
    </div>
  )
}

type DeliveredWallProps = {
  limit?: number
  heading?: string
  subheading?: string
  showViewAll?: boolean
  /** When true, render only the grid (no badge/heading) — used to merge into another section. */
  hideHeader?: boolean
  /** When true, show category + ecommerce-subcategory filter chips (use on the full /work wall). */
  showFilters?: boolean
  /** Render the heading as <h1> (use when the wall is the page's primary heading). */
  asPageHeading?: boolean
}

const CATEGORY_ORDER: DeliveredCategory[] = ["ecommerce", "service", "custom"]

export default function DeliveredWall({
  limit,
  heading = "Projects we've delivered",
  subheading,
  showViewAll = false,
  hideHeader = false,
  showFilters = false,
  asPageHeading = false,
}: DeliveredWallProps) {
  const HeadingTag = asPageHeading ? "h1" : "h2"
  const [activeCat, setActiveCat] = useState<"all" | DeliveredCategory>("all")
  const [activeSub, setActiveSub] = useState<string>("all")

  // Only categories/subcategories that actually have projects show as chips.
  const presentCats = useMemo(
    () => CATEGORY_ORDER.filter((c) => deliveredProjects.some((p) => p.category === c)),
    [],
  )
  const presentSubs = useMemo(
    () =>
      ECOMMERCE_SUBCATEGORIES.filter((s) =>
        deliveredProjects.some((p) => p.category === "ecommerce" && p.subcategory === s),
      ),
    [],
  )

  const filtered = useMemo(() => {
    return deliveredProjects.filter((p) => {
      if (activeCat !== "all" && p.category !== activeCat) return false
      if (activeCat === "ecommerce" && activeSub !== "all" && p.subcategory !== activeSub) return false
      return true
    })
  }, [activeCat, activeSub])

  const base = showFilters ? filtered : deliveredProjects
  const items = limit ? base.slice(0, limit) : base

  return (
    <section className={`px-4 sm:px-6 lg:px-8 ${hideHeader ? "pb-20 pt-0" : "py-20"}`}>
      <div className="mx-auto max-w-7xl">
        {!hideHeader && (
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="eyebrow">Projects delivered</span>
              <HeadingTag className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
                {heading.includes(" ") ? (
                  <>
                    {heading.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="mark-lime">{heading.split(" ").slice(-1)}</span>
                  </>
                ) : (
                  heading
                )}
              </HeadingTag>
              <p className="mt-4 max-w-2xl text-ink-soft">
                {subheading ?? "Live websites and stores built and shipped for real businesses."}
              </p>
            </div>
            {showViewAll && (
              <Link
                href="/work/"
                prefetch={false}
                className="btn btn-glass btn-sm shrink-0"
              >
                See all projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}

        {showFilters && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Chip active={activeCat === "all"} onClick={() => { setActiveCat("all"); setActiveSub("all") }}>
                All
              </Chip>
              {presentCats.map((c) => (
                <Chip
                  key={c}
                  active={activeCat === c}
                  onClick={() => { setActiveCat(c); setActiveSub("all") }}
                >
                  {CATEGORY_LABELS[c]}
                </Chip>
              ))}
            </div>

            {activeCat === "ecommerce" && (
              <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-4">
                <Chip active={activeSub === "all"} onClick={() => setActiveSub("all")}>
                  All products
                </Chip>
                {presentSubs.map((s) => (
                  <Chip key={s} active={activeSub === s} onClick={() => setActiveSub(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((project) => (
            <DeliveredCard key={project.slug} project={project} />
          ))}
        </div>

        {hideHeader && showViewAll && (
          <div className="mt-10 text-center">
            <Link
              href="/work/"
              prefetch={false}
              className="btn btn-ink"
            >
              See all projects delivered
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
