"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import IntegratedNavbar from "@/components/integrated-navbar";
import Footer from "@/components/footer";
import CTABanner from "@/components/cta-banner";
import { staticProjects, StaticProject } from "@/lib/static-projects";

const categories = [
  "All",
  "E-Commerce",
  "B2B Marketplace",
  "HR Tech",
  "Engineering",
  "AgriTech",
];

function matchesCategory(project: StaticProject, filter: string) {
  if (filter === "All") return true;
  if (filter === "E-Commerce") return project.category.includes("E-Commerce");
  if (filter === "B2B Marketplace")
    return project.category.includes("B2B Marketplace");
  if (filter === "HR Tech") return project.category.includes("HR Tech");
  if (filter === "Engineering") return project.category.includes("Engineering");
  if (filter === "AgriTech") return project.category.includes("AgriTech");
  return true;
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const featured = staticProjects.filter((p) => p.featured);
  const filtered = staticProjects.filter(
    (p) => !p.featured && matchesCategory(p, activeFilter)
  );

  return (
    <div className="min-h-screen bg-white">
      <IntegratedNavbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 mb-6">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Projects that{" "}
              <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                deliver results
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
              A curated selection of digital products we&apos;ve built —
              marketplaces, e-commerce stores, and business platforms spanning
              industries from maritime logistics to premium ethnic fashion.
            </p>
          </motion.div>
        </section>

        {/* Featured Projects */}
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <motion.p
            className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Featured
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-24">
            {featured.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 * i }}
              >
                <Link href={`/work/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[16/10] mb-5">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                        {project.category.split(" / ")[0]}
                      </span>
                    </div>
                    {/* Arrow on hover */}
                    <div className="absolute bottom-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                      <ArrowRight className="w-4 h-4 text-gray-900" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-medium">
                        {project.domain}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              All Projects
            </p>
            <div className="flex gap-2 flex-wrap justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`text-sm px-4 py-1.5 rounded-full font-medium transition-colors ${
                    activeFilter === cat
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/work/${project.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-[4/3] mb-4">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200">
                          {project.category.split(" / ").slice(-1)[0]}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-sm font-medium flex items-center gap-1">
                          View case study{" "}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-xs text-gray-400">{project.domain}</p>
                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-16">
          <CTABanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
