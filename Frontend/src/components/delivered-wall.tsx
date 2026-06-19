"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { deliveredProjects, type DeliveredProject } from "@/lib/delivered-projects"

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
      </div>
    </a>
  )
}

type DeliveredWallProps = {
  limit?: number
  heading?: string
  subheading?: string
  showViewAll?: boolean
}

export default function DeliveredWall({
  limit,
  heading = "Sites we've delivered",
  subheading,
  showViewAll = false,
}: DeliveredWallProps) {
  const items = limit ? deliveredProjects.slice(0, limit) : deliveredProjects

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
              Delivered work
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
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
            </h2>
            <p className="mt-3 max-w-2xl text-gray-500">
              {subheading ?? `${deliveredProjects.length}+ live websites and stores built and shipped for real businesses.`}
            </p>
          </div>
          {showViewAll && (
            <Link
              href="/work"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
            >
              See all {deliveredProjects.length} sites
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((project) => (
            <DeliveredCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
