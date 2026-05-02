import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import IntegratedNavbar from "@/components/integrated-navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import ScrollToTop from "@/components/scroll-to-top";
import {
  staticProjects,
  getProjectBySlug,
} from "@/lib/static-projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return staticProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | NextGen Fusion`,
    description: project.shortDescription,
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
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />

      {/* Header */}
      <header className="bg-white pt-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/work" className="hover:text-gray-600 transition-colors">
              Work
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-600 font-medium">{project.title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.featured && (
                  <span className="bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                {project.title}
              </h1>
              <p className="text-base text-gray-500">{project.domain}</p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit Website
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Image */}
        <section className="mb-14">
          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 shadow-xl shadow-gray-200/60">
            <div className="relative aspect-[16/9]">
              <Image
                src={project.images[0]}
                alt={`${project.title} — main screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Overview
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Additional Screenshots */}
            {project.images.length > 1 && (
              <section className="mb-12">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
                  Screenshots
                </h2>
                <div className="space-y-5">
                  {project.images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-full rounded-xl overflow-hidden bg-gray-50 shadow-md shadow-gray-200/50"
                    >
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={img}
                          alt={`${project.title} — screenshot ${idx + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 70vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Deliverables */}
            <section className="mb-12">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">
                Skills & Deliverables
              </h2>
              <div className="space-y-3">
                {project.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2B35AB] to-[#8A38F5] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Prev / Next */}
            <div className="flex justify-between items-center pt-10 border-t border-gray-100">
              {previous ? (
                <Link
                  href={`/work/${previous.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="truncate max-w-[180px]">
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/work/${next.slug}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors group"
                >
                  <span className="truncate max-w-[180px]">{next.title}</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              {/* Project Meta */}
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Role
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {project.role}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Industry
                  </p>
                  <p className="text-sm text-gray-800 font-medium">
                    {project.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Domain
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    {project.domain}
                  </a>
                </div>
              </div>

              {/* More Projects */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  More Projects
                </p>
                <div className="space-y-3">
                  {staticProjects
                    .filter((p) => p.slug !== slug)
                    .slice(0, 4)
                    .map((p) => (
                      <Link
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        className="flex items-center gap-2.5 group"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={p.coverImage}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                            sizes="40px"
                          />
                        </div>
                        <span className="text-xs text-gray-600 group-hover:text-gray-900 font-medium transition-colors line-clamp-2">
                          {p.title}
                        </span>
                      </Link>
                    ))}
                </div>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-medium mt-4 transition-colors"
                >
                  View all projects
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <CTABanner />
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
