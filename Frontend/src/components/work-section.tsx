"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { staticProjects } from "@/lib/static-projects";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export default function WorkSection() {
  const featured = staticProjects.filter((p) => p.featured);
  const rest = staticProjects.filter((p) => !p.featured).slice(0, 4);

  return (
    <section className="bg-white py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.div variants={item} className="mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              Our Work
            </span>
          </motion.div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <motion.h2
              variants={item}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Projects that{" "}
              <span className="bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                deliver results
              </span>
            </motion.h2>
            <motion.div variants={item} whileHover={{ scale: 1.05 }}>
              <Link
                href="/work"
                className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium text-sm transition-colors group whitespace-nowrap"
              >
                View all projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Featured row */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {featured.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Link href={`/work/${project.slug}`} className="group block">
                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[16/10] mb-5 shadow-lg shadow-gray-200/60">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-gradient-to-r from-[#2B35AB] to-[#8A38F5] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                      Featured
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-white/60">
                      {project.category.split(" / ")[0]}
                    </span>
                  </div>
                  {/* Arrow */}
                  <div className="absolute bottom-5 right-5 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <ArrowRight className="w-4 h-4 text-gray-900" />
                  </div>
                </div>

                {/* Meta */}
                <div>
                  <p className="text-xs text-gray-400 mb-1">{project.domain}</p>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Supporting grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={container}
        >
          {rest.map((project) => (
            <motion.div key={project.slug} variants={item}>
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] mb-3">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/60">
                      {project.category.split(" / ").slice(-1)[0]}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mb-0.5">
                  {project.domain}
                </p>
                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-1">
                  {project.title}
                </h4>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 hover:text-white hover:bg-gray-900 hover:border-gray-900 font-medium text-sm px-6 py-3 rounded-full transition-all duration-200 group"
          >
            Explore all {staticProjects.length} projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
