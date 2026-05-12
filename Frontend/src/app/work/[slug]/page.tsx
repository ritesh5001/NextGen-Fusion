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
} from "lucide-react";
import IntegratedNavbar from "@/components/integrated-navbar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { staticProjects, getProjectBySlug } from "@/lib/static-projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in";

export async function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | NextGen Fusion`,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteUrl}/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} Case Study | NextGen Fusion`,
      description: project.shortDescription,
      url: `${siteUrl}/work/${project.slug}`,
      siteName: "NextGen Fusion",
      type: "article",
      images: [project.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study | NextGen Fusion`,
      description: project.shortDescription,
      images: [project.coverImage],
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = staticProjects;
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previous = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  const otherProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />

      {/* ── PAGE HEADER ── */}
      <header className="bg-white pt-20 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link
              href="/work"
              className="hover:text-gray-700 transition-colors"
            >
              Work
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium truncate">
              {project.title}
            </span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {project.featured && (
                  <span className="bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured Project
                  </span>
                )}
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {project.role}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
                {project.title}
              </h1>
              <p className="text-gray-500 text-base">{project.domain}</p>
            </div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors flex-shrink-0 w-fit"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Live Website
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/40 bg-gray-100">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.images[0]}
                alt={`${project.title} — main screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      {project.results.length > 0 && (
        <div className="border-b border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
              {project.results.map((stat) => (
                <div
                  key={stat.label}
                  className="px-6 py-8 text-center first:pl-0 last:pr-0"
                >
                  <p className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] bg-clip-text text-transparent">
                    {stat.metric}
                  </p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
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
                  <Layers className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Project Overview
                </h2>
              </div>
              <p className="text-xl text-gray-800 font-medium leading-relaxed">
                {project.shortDescription}
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  The Challenge
                </h2>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                What problem needed solving?
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {project.challenge}
              </p>
            </section>

            {/* Our Approach */}
            <section className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2B35AB] to-[#8A38F5] rounded-full hidden lg:block" />
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                </div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Our Approach
                </h2>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                How we solved it
              </h3>
              <p className="text-gray-600 leading-relaxed text-base">
                {project.approach}
              </p>
            </section>

            {/* Screenshot 2 (if exists) */}
            {project.images[1] && (
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 shadow-lg shadow-gray-200/50">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.images[1]}
                    alt={`${project.title} — screenshot 2`}
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  What We Built
                </h2>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Features & Deliverables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {project.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="group p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-purple-50/30 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2B35AB] to-[#8A38F5] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <span className="text-white text-[10px] font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1.5 group-hover:text-purple-700 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Screenshot 3 (if exists) */}
            {project.images[2] && (
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 shadow-lg shadow-gray-200/50">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={project.images[2]}
                    alt={`${project.title} — screenshot 3`}
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
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Technology Stack
                </h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Prev / Next Navigation */}
            <div className="flex justify-between items-center pt-8 border-t border-gray-100">
              {previous ? (
                <Link
                  href={`/work/${previous.slug}`}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Previous
                    </p>
                    <p className="text-sm text-gray-700 font-medium truncate max-w-[160px]">
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
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Next
                    </p>
                    <p className="text-sm text-gray-700 font-medium truncate max-w-[160px]">
                      {next.title}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-gray-400 group-hover:bg-gray-50 transition-all">
                    <ArrowLeft className="w-4 h-4 text-gray-500 rotate-180 group-hover:translate-x-0.5 transition-transform" />
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
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-5">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Our Role
                  </p>
                  <p className="text-sm text-gray-800 font-semibold">
                    {project.role}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Industry
                  </p>
                  <p className="text-sm text-gray-800 font-semibold">
                    {project.category}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                    Live Website
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    {project.domain}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="pt-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                    Deliverables
                  </p>
                  <div className="space-y-2">
                    {project.tags.map((tag) => (
                      <div key={tag} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#2B35AB] via-[#5C3FC4] to-[#8A38F5] p-6 text-white">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-base mb-2">
                    Want a project like this?
                  </h3>
                  <p className="text-white/75 text-xs leading-relaxed mb-5">
                    We build digital products that drive real results. Tell us about your project.
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors w-full justify-center"
                  >
                    Start a conversation
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* More Projects */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                  More Work
                </p>
                <div className="space-y-4">
                  {otherProjects.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/work/${p.slug}`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {p.category.split(" / ")[0]}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold mt-5 transition-colors"
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
      <section className="border-t border-gray-100 bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-gray-900">
              More case studies
            </h2>
            <Link
              href="/work"
              className="text-sm text-purple-600 hover:text-purple-800 font-semibold transition-colors flex items-center gap-1"
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
                className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.coverImage}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/60">
                      {p.category.split(" / ")[0]}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-gray-400 mb-1">{p.domain}</p>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-1.5">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {p.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gradient-to-br from-[#0f1035] via-[#1a1560] to-[#0f1035] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white/80 border border-white/20 mb-6">
            Ready to build something great?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Your next project could be{" "}
            <span className="bg-gradient-to-r from-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
              featured here
            </span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            We&apos;ve helped brands across fashion, AgriTech, maritime, HR, and
            e-commerce build digital products that drive real business results.
            Let&apos;s talk about yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Start a conversation
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm"
            >
              Browse all projects
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
