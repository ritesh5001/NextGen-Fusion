import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  Layers,
  Lightbulb,
  Zap,
  ArrowRight,
  MessageSquare,
  Gauge,
} from "lucide-react";
import ScrollToTop from "@/components/scroll-to-top";
import { staticProjects, getProjectBySlug } from "@/lib/static-projects";
import { isSiteOffline } from "@/lib/delivered-projects";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, assetUrl, breadcrumbSchema, buildMetadata, ORGANIZATION_ID, siteUrl } from "@/lib/seo"
import type { LighthouseScores, MeasuredResult, StaticProject } from "@/lib/static-projects";

// The service page and Lucknow page each build type is sold on. Case studies
// are the strongest proof on the site; linking them to the money pages passes
// that relevance on instead of leaving it stranded on /work/.
function relatedPagesFor(project: StaticProject) {
  const category = project.category.toLowerCase();
  if (category.startsWith("e-commerce")) {
    return [
      { href: "/services/ecommerce-web-development-services/", label: "E-commerce Development Services" },
      { href: "/ecommerce-development-company-in-lucknow/", label: "Ecommerce Development Company in Lucknow" },
    ];
  }
  if (category.includes("saas") || category.includes("marketplace")) {
    return [
      { href: "/services/software-development-services/", label: "Software Development Services" },
      { href: "/software-company-in-lucknow/", label: "Software Company in Lucknow" },
    ];
  }
  return [
    { href: "/services/website-development-services/", label: "Website Development Services in India" },
    { href: "/website-development-company-in-lucknow/", label: "Website Development Company in Lucknow" },
  ];
}

const SCORE_LABELS: { key: Exclude<keyof LighthouseScores, "lcp">; label: string }[] = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best practices" },
  { key: "seo", label: "SEO" },
];

function scoreColour(score: number) {
  if (score >= 90) return "text-emerald-600";
  if (score >= 50) return "text-amber-600";
  return "text-red-600";
}

function MeasuredPanel({ measured, liveUrl }: { measured: MeasuredResult; liveUrl: string }) {
  const date = new Date(measured.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <section>
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
          <Gauge className="w-4 h-4 text-emerald-600" />
        </div>
        <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">Measured, not claimed</h2>
      </div>
      <h3 className="text-2xl font-medium text-ink mb-3 tracking-tight">How the live site scores today</h3>
      <p className="text-ink-soft leading-relaxed mb-6">
        {measured.tool}, Google&apos;s open-source audit tool, run against the live site on{" "}
        <time dateTime={measured.date}>{date}</time>. Scores move a few points between runs, so check them yourself.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(["mobile", "desktop"] as const).map((device) => (
          <div key={device} className="glass rounded-[28px] p-5">
            <p className="text-sm font-semibold text-ink capitalize">{device}</p>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {SCORE_LABELS.map(({ key, label }) => (
                <div key={key}>
                  <dt className="text-xs text-ink-mute">{label}</dt>
                  <dd className={`text-2xl font-bold ${scoreColour(measured[device][key])}`}>{measured[device][key]}</dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="text-xs text-ink-mute">Largest Contentful Paint</dt>
                <dd className="text-sm font-semibold text-ink">{measured[device].lcp}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
      <a
        href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(liveUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"
      >
        Re-run it on PageSpeed Insights <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </section>
  );
}

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seoTitle,
    description: project.shortDescription,
    path: `/work/${project.slug}`,
    // The project's own screenshot is a better preview than a text card.
    image: project.coverImage,
    type: "article",
  });
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  // The case study stands on its own; only the links to a dead site go.
  const siteOffline = isSiteOffline(project.liveUrl);

  const allProjects = staticProjects;
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  // Case studies carried only the sitewide graph — nothing describing the page
  // itself. Article is what makes them eligible to surface as their own result.
  const caseStudySchema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${absoluteUrl(`/work/${project.slug}`)}#article`,
      headline: project.seoTitle,
      description: project.shortDescription,
      articleSection: project.category,
      url: absoluteUrl(`/work/${project.slug}`),
      mainEntityOfPage: absoluteUrl(`/work/${project.slug}`),
      // assetUrl, not absoluteUrl: trailing-slashed image URLs 308-redirect and
      // validators treat redirecting structured-data images as unfetchable.
      // Deduped because coverImage is normally also images[0].
      image: Array.from(new Set([project.coverImage, ...project.images])).map((src) =>
        assetUrl(src),
      ),
      keywords: project.tags.join(", "),
      author: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@type": "Thing", name: project.title },
      ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project.title, path: `/work/${project.slug}` },
    ]),
  ];

  const otherProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <JsonLd data={caseStudySchema} />
      {/* ── PAGE HEADER ── */}
      <header className="pt-20 border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-ink-mute mb-8">
            <Link href="/" className="hover:text-ink-soft transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href="/work/"
              className="hover:text-ink-soft transition-colors"
            >
              Work
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-ink-soft font-medium truncate">
              {project.title}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.featured && (
                  <span className="bg-gradient-to-r from-brand to-violet text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured Project
                  </span>
                )}
                <span className="bg-white/70 text-ink-soft text-xs font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="bg-white/70 text-ink-soft text-xs font-medium px-3 py-1 rounded-full">
                  {project.role}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-ink leading-tight mb-3 tracking-tight">
                {project.title}
              </h1>
              <p className="text-ink-mute text-base">{project.domain}</p>
            </div>
            {!siteOffline && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-gray-700 transition-colors flex-shrink-0 w-fit"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Live Website
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <div className="border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full rounded-[28px] overflow-hidden shadow-2xl shadow-gray-300/40 bg-white/70">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.images[0]}
                alt={`${project.title} — ${project.category}, homepage of the site we built`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      {project.results.length > 0 && (
        <div className="px-4 py-6 sm:px-6">
          <div className="glass max-w-6xl mx-auto rounded-[32px] px-2 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-ink/10">
              {project.results.map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-8 text-center first:pl-0 last:pr-0"
                >
                  <p className="text-3xl sm:text-4xl font-normal tracking-tight mb-1 text-gradient">
                    {stat.metric}
                  </p>
                  <p className="text-xs text-ink-mute font-medium uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: main article */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* Overview */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-brand" />
                </div>
                <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">
                  Project Overview
                </h2>
              </div>
              <p className="text-xl text-ink font-medium leading-relaxed">
                {project.shortDescription}
              </p>
              <p className="text-ink-soft leading-relaxed mt-4">
                {project.description}
              </p>
            </section>

            {/* The Challenge */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-red-400 to-orange-400 rounded-full hidden lg:block" />
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-red-500" />
                </div>
                <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">
                  The Challenge
                </h2>
              </div>
              <h3 className="text-2xl font-medium text-ink mb-4 tracking-tight">
                What problem needed solving?
              </h3>
              <p className="text-ink-soft leading-relaxed text-base">
                {project.challenge}
              </p>
            </section>

            {/* Our Approach */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-violet rounded-full hidden lg:block" />
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-brand/10 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-brand" />
                </div>
                <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">
                  Our Approach
                </h2>
              </div>
              <h3 className="text-2xl font-medium text-ink mb-4 tracking-tight">
                How we solved it
              </h3>
              <p className="text-ink-soft leading-relaxed text-base">
                {project.approach}
              </p>
            </section>

            {/* Screenshot 2 (if exists) */}
            {project.images[1] && (
              <div className="relative w-full rounded-[28px] overflow-hidden bg-white/50 shadow-lg shadow-gray-200/50">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.images[1]}
                    alt={`${project.title} — interface detail from the ${project.category} build`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
              </div>
            )}

            {/* Key Features */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">
                  What We Built
                </h2>
              </div>
              <h3 className="text-2xl font-medium text-ink mb-8 tracking-tight">
                Features & Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="glass group p-5 rounded-[28px] hover:border-brand/25 hover:bg-brand/5 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand to-violet flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-white text-[10px] font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-ink text-sm mb-1.5 group-hover:text-brand transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-ink-mute text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {project.measured && !siteOffline && <MeasuredPanel measured={project.measured} liveUrl={project.liveUrl} />}

            {/* Screenshot 3 (if exists) */}
            {project.images[2] && (
              <div className="relative w-full rounded-[28px] overflow-hidden bg-white/50 shadow-lg shadow-gray-200/50">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.images[2]}
                    alt={`${project.title} — further interface detail from the ${project.category} build`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                </div>
              </div>
            )}

            {/* Tech Stack */}
            <section>
              <div className="flex items-center gap-2 mb-5">
                <h2 className="text-xs font-medium uppercase tracking-widest text-ink-mute">
                  Technology Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-ink text-white text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Prev / Next Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-ink/10">
              {previous ? (
                <Link
                  href={`/work/${previous.slug}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-ink/10 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-white/50 transition-all">
                    <ArrowLeft className="w-4 h-4 text-ink-mute group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[10px] text-ink-mute uppercase tracking-wider font-semibold">
                      Previous
                    </p>
                    <p className="text-sm text-ink-soft font-medium truncate max-w-[160px]">
                      {previous.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="flex items-center gap-2.5 group text-right"
                >
                  <div>
                    <p className="text-[10px] text-ink-mute uppercase tracking-wider font-semibold">
                      Next
                    </p>
                    <p className="text-sm text-ink-soft font-medium truncate max-w-[160px]">
                      {next.title}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-lg border border-ink/10 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-white/50 transition-all">
                    <ArrowLeft className="w-4 h-4 text-ink-mute rotate-180 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-8">

              {/* Project Meta Card */}
              <div className="glass rounded-[28px] p-6 space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-1.5">
                    Our Role
                  </p>
                  <p className="text-sm text-ink font-semibold">
                    {project.role}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-1.5">
                    Industry
                  </p>
                  <p className="text-sm text-ink font-semibold">
                    {project.category}
                  </p>
                </div>
                {!siteOffline && (
                  <div>
                    <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-1.5">
                      Live Website
                    </p>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand hover:text-brand font-semibold transition-colors inline-flex items-center gap-1"
                    >
                      {project.domain}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
                <div className="pt-1">
                  <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-3">
                    Deliverables
                  </p>
                  <div className="space-y-2">
                    {project.tags.map((tag) => (
                      <div key={tag} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-ink-soft">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Service and city pages this build sits under */}
              <div>
                <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-4">
                  Related Services
                </p>
                <ul className="space-y-2">
                  {relatedPagesFor(project).map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="inline-flex items-start gap-1.5 py-1 text-sm font-semibold text-ink hover:text-brand transition-colors"
                      >
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-1" />
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-brand via-violet to-violet p-6 text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-medium text-base mb-2 tracking-tight">
                    Want a project like this?
                  </h3>
                  <p className="text-white/75 text-xs leading-relaxed mb-5">
                    We build digital products that drive real results. Tell us about your project.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 bg-white text-ink text-xs font-bold px-4 py-2.5 rounded-full hover:bg-white/70 transition-colors w-full justify-center"
                  >
                    Start a conversation
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* More Projects */}
              <div>
                <p className="text-[10px] font-bold text-ink-mute uppercase tracking-widest mb-4">
                  More Work
                </p>
                <div className="space-y-4">
                  {otherProjects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-12 h-12 rounded-[20px] overflow-hidden bg-white/70 flex-shrink-0">
                        <Image
                          src={p.coverImage}
                          alt={`${p.title} — ${p.category} case study`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-ink group-hover:text-brand transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-ink-mute mt-0.5">
                          {p.category.split(" / ")[0]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/work/"
                  className="inline-flex items-center gap-1 text-xs text-brand hover:text-brand font-semibold mt-5 transition-colors"
                >
                  View all {allProjects.length} projects
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ── MORE PROJECTS STRIP ── */}
      <section className="border-t border-ink/10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-medium text-ink tracking-tight">
              More case studies
            </h2>
            <Link
              href="/work/"
              className="text-sm text-brand hover:text-brand font-semibold transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="glass group block rounded-[28px] overflow-hidden hover:border-ink/10 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.coverImage}
                    alt={`${p.title} — ${p.category} case study`}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-ink-soft text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/60">
                      {p.category.split(" / ")[0]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-ink-mute mb-1">{p.domain}</p>
                  <h3 className="text-sm font-medium text-ink group-hover:text-brand transition-colors mb-1.5 tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-ink-mute leading-relaxed line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="px-4 pb-6 pt-4 sm:px-6">
        <div className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-ink px-6 py-16 text-center sm:py-20">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="orb orb-blue -left-[10%] -top-[40%] h-[120%] w-[45%]" />
            <div className="orb orb-violet right-[-8%] bottom-[-40%] h-[120%] w-[40%]" />
          </div>
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 mb-6">
            Ready to build something great?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white leading-tight mb-6 tracking-tight">
            Your next project could be{" "}
            <span className="text-brand-light">featured here</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            We&apos;ve helped brands across fashion, AgriTech, maritime, HR, and
            e-commerce build digital products that drive real business results.
            Let&apos;s talk about yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="btn btn-brand"
            >
              <MessageSquare className="w-4 h-4" />
              Start a conversation
            </Link>
            <Link
              href="/work/"
              className="btn glass-ink text-white hover:bg-white/15"
            >
              Browse all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}
