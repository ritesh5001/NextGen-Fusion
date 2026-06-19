"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
        active
          ? "border-transparent bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] text-white shadow-sm"
          : "border-gray-200 text-gray-600 hover:border-gray-400"
      }`}
    >
      {children}
    </button>
  )
}

function DeliveredCard({ project }: { project: DeliveredProject }) {
  const [errored, setErrored] = useState(false)

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        {errored ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2B35AB]/10 via-[#8A38F5]/10 to-[#13CBD4]/10 px-3 text-center text-sm font-semibold text-gray-500">
            {project.host}
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.name} — website delivered by NextGen Fusion`}
            loading="lazy"
            onError={() => setErrored(true)}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4 text-gray-900" />
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-purple-600">
          {project.name}
        </p>
        <p className="truncate text-xs text-gray-400">{project.host}</p>
        <span className="mt-1.5 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
          {project.subcategory ?? CATEGORY_LABELS[project.category]}
        </span>
      </div>
    </a>
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
    <section className={`bg-white px-4 sm:px-6 lg:px-8 ${hideHeader ? "pb-20 pt-0" : "py-20"}`}>
      <div className="mx-auto max-w-7xl">
        {!hideHeader && (
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                Projects delivered
              </span>
              <HeadingTag className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {heading.includes(" ") ? (
                  <>
                    {heading.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                      {heading.split(" ").slice(-1)}
                    </span>
                  </>
                ) : (
                  heading
                )}
              </HeadingTag>
              <p className="mt-3 max-w-2xl text-gray-500">
                {subheading ?? `${deliveredProjects.length}+ live websites and stores built and shipped for real businesses.`}
              </p>
            </div>
            {showViewAll && (
              <Link
                href="/work"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
              >
                See all {deliveredProjects.length} projects
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}

        {showFilters && (
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Chip active={activeCat === "all"} onClick={() => { setActiveCat("all"); setActiveSub("all") }}>
                All ({deliveredProjects.length})
              </Chip>
              {presentCats.map((c) => (
                <Chip
                  key={c}
                  active={activeCat === c}
                  onClick={() => { setActiveCat(c); setActiveSub("all") }}
                >
                  {CATEGORY_LABELS[c]} ({deliveredProjects.filter((p) => p.category === c).length})
                </Chip>
              ))}
            </div>

            {activeCat === "ecommerce" && (
              <div className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                <Chip active={activeSub === "all"} onClick={() => setActiveSub("all")}>
                  All products
                </Chip>
                {presentSubs.map((s) => (
                  <Chip key={s} active={activeSub === s} onClick={() => setActiveSub(s)}>
                    {s} ({deliveredProjects.filter((p) => p.subcategory === s).length})
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
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              See all {deliveredProjects.length} projects delivered
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
