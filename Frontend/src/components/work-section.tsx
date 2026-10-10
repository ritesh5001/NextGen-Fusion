"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StaticProject } from "@/lib/static-projects";
import {
  CATEGORY_LABELS,
  homepageDelivered,
  isSiteOffline,
  type DeliveredProject,
} from "@/lib/delivered-projects";
import { ProjectShowcase, type ShowcaseItem } from "@/components/motion/project-showcase";

/** The fields this section renders; passed from the server so the full case
 *  study data never ships to the browser. */
export type FeaturedProject = Pick<
  StaticProject,
  "slug" | "title" | "category" | "coverImage" | "domain" | "results" | "shortDescription" | "tags"
>;

/** Summary of a case study that sits behind one of the homepage's delivered sites. */
export type CaseStudySummary = {
  category: string;
  shortDescription: string;
  result: { metric: string; label: string } | null;
  tags: string[];
};

const firstPart = (category: string) => category.split(" / ")[0];

function fromFeatured(project: FeaturedProject): ShowcaseItem {
  const offline = isSiteOffline(project.domain);
  return {
    key: project.slug,
    title: project.title,
    category: firstPart(project.category),
    image: project.coverImage,
    host: project.domain,
    description: project.shortDescription,
    result: project.results?.[0],
    tags: project.tags.slice(0, 3),
    caseStudyHref: `/work/${project.slug}/`,
    liveUrl: offline ? undefined : `https://${project.domain}`,
  };
}

function fromDelivered(project: DeliveredProject, summary?: CaseStudySummary): ShowcaseItem {
  const label =
    project.subcategory && project.subcategory !== "Other"
      ? project.subcategory
      : project.category === "custom"
        ? "Web app"
        : CATEGORY_LABELS[project.category];
  return {
    key: project.slug,
    title: project.name,
    category: summary ? firstPart(summary.category) : label,
    image: project.image,
    host: project.host,
    description: summary?.shortDescription,
    result: summary?.result ?? undefined,
    tags: summary?.tags ?? [],
    caseStudyHref: project.caseStudySlug ? `/work/${project.caseStudySlug}/` : undefined,
    liveUrl: project.url,
  };
}

export default function WorkSection({
  featured,
  caseStudySummaries,
}: {
  featured: FeaturedProject[];
  caseStudySummaries: Record<string, CaseStudySummary>;
}) {
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const items: ShowcaseItem[] = [
    ...featured.map(fromFeatured),
    ...homepageDelivered
      .filter((p) => !p.caseStudySlug || !featuredSlugs.has(p.caseStudySlug))
      .map((p) => fromDelivered(p, p.caseStudySlug ? caseStudySummaries[p.caseStudySlug] : undefined)),
  ];
  // Projects whose live site is down go last, so the section opens on work a visitor can open.
  items.sort((a, b) => Number(!a.liveUrl) - Number(!b.liveUrl));

  return (
    <section className="px-3 py-16 sm:py-20 lg:px-4" aria-labelledby="work-heading">
      <ProjectShowcase
        items={items}
        heading={
          <>
            <h2 id="work-heading" className="display mt-3 text-4xl text-white sm:text-5xl">
              Projects that <span className="text-gradient">deliver results</span>
            </h2>
            <p className="mt-4 max-w-[36ch] text-[15px] leading-relaxed text-white/60">
              Marketplaces, SaaS and online stores for clients in India, the UAE, the UK and Italy.
            </p>
          </>
        }
        footer={
          <Link href="/work/" prefetch={false} className="btn btn-sm bg-white text-ink hover:bg-white/90">
            See all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    </section>
  );
}
