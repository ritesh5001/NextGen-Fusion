"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StaticProject } from "@/lib/static-projects";
import { useNearViewport } from "@/hooks/use-near-viewport";

/** Cover image mounted only when the card nears the viewport (see useNearViewport). */
function DeferredCover({ src, alt }: { src: string; alt: string }) {
  const [ref, near] = useNearViewport<HTMLDivElement>();
  return (
    <div ref={ref} className="absolute inset-0">
      {near && (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

/** The fields this section renders; passed from the server so the full case
 *  study data never ships to the browser. */
export type FeaturedProject = Pick<
  StaticProject,
  "slug" | "title" | "category" | "coverImage" | "domain" | "results" | "shortDescription" | "tags"
>;

export default function WorkSection({ featured }: { featured: FeaturedProject[] }) {

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div
          className="mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <m.div variants={item} className="mb-5">
            <span className="eyebrow">Projects delivered</span>
          </m.div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5">
            <m.h2 variants={item} className="display text-4xl sm:text-5xl lg:text-6xl">
              Projects that <span className="text-gradient whitespace-nowrap">deliver results</span>
            </m.h2>
            <m.div variants={item}>
              <Link href="/work/" prefetch={false} className="btn btn-glass btn-sm group">
                View all projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </m.div>
          </div>
        </m.div>

        {/* Featured row */}
        <m.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {featured.map((project) => (
            <m.div key={project.slug} variants={item} className="h-full">
              <Link
                href={`/work/${project.slug}/`}
                prefetch={false}
                className="glass group flex h-full flex-col rounded-[36px] p-3 transition hover:bg-white"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-[26px] bg-canvas-deep aspect-[16/10]">
                  <DeferredCover
                    src={project.coverImage}
                    alt={`${project.title} — ${project.category} project by NextGen Fusion`}
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">
                      Featured
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
                      {project.category.split(" / ")[0]}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6 sm:px-4">
                  <p className="text-xs text-ink-mute mb-2">{project.domain}</p>
                  {project.results?.[0] && (
                    <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-ink">
                      <span className="h-2 w-2 rounded-full bg-brand" aria-hidden="true" />
                      {project.results[0].metric} {project.results[0].label}
                    </p>
                  )}
                  <h3 className="text-2xl font-medium tracking-tight text-ink mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-canvas px-3 py-1 text-xs text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </m.div>
          ))}
        </m.div>

        {/* Breadth (the full delivered-projects screenshot wall) is merged in
            directly below this section in home-client, so no separate CTA here. */}
      </div>
    </section>
  );
}
