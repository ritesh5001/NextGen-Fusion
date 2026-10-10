"use client";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Portfolio } from "@/lib/api";
import { normalizeImagePath } from "@/lib/utils";
import { useMobileIcon } from "@/hooks/use-mobile-icon";

// BadgeSubtitle component definition (in case it's missing)
function BadgeSubtitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand/10 text-brand">
      {children}
    </span>
  );
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    y: -2,
    transition: {
      duration: 0.3,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
  hover: {
    scale: 1.01,
    transition: {
      duration: 0.3,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const iconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3,
    },
  },
};

type PortfolioSectionProps = {
  portfolios: Portfolio[];
};

export default function PortfolioSection({
  portfolios = [],
}: PortfolioSectionProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const { getIconSrc } = useMobileIcon();

  // Build projects from real data (prop portfolios)
  const activeItems = (portfolios || []).filter((p) => p?.is_active);

  const projects = activeItems.map((item) => ({
    id: String(item.id),
    title: item.title,
    description: item.background || item.goal || "",
    category: item.category || "Project",
    image: normalizeImagePath(item.cover_image),
    link: "/work",
    imageHeight: "h-80",
  }));

  const filteredProjects = projects;

  return (
    <m.section
      id="portofolio"
      className="py-32 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <m.div className="mb-12" variants={itemVariants}>
          <m.div className="mb-4" variants={textVariants}>
            <BadgeSubtitle>Portfolio</BadgeSubtitle>
          </m.div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <m.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-ink leading-tight"
              variants={textVariants}
            >
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <span>Discover</span>
                <m.div
                  className="relative inline-block mx-1"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src={getIconSrc("/images/liv.svg", "/images/liv.png")}
                    alt="" aria-hidden="true"
                    width={56}
                    height={56}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                  />
                </m.div>
                <span className="text-gradient">
                  Our
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-2">
                <span>Recent</span>
                <m.div
                  className="relative inline-block mx-1"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Image
                    src={getIconSrc("/images/paint.svg", "/images/paint.png")}
                    alt="" aria-hidden="true"
                    width={56}
                    height={56}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-contain"
                  />
                </m.div>
                <span className="text-gradient">
                  Projects
                </span>
              </div>
            </m.h2>
            <m.div
              variants={textVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/work/"
                prefetch={false}
                className="flex items-center gap-2 text-ink hover:text-brand font-medium transition-colors group"
              >
                View all portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </m.div>
          </div>
        </m.div>

        {/* Projects Masonry Grid */}
        {loading ? (
          <m.div
            className="columns-1 md:columns-2 gap-6 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <m.div
                key={i}
                className="break-inside-avoid mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 rounded-[28px] h-80 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                </div>
              </m.div>
            ))}
          </m.div>
        ) : (
          <m.div
            className="columns-1 md:columns-2 gap-6 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <m.div
                key={project.id}
                className="break-inside-avoid mb-6 group"
                variants={cardVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <Link href={project.link} prefetch={false} className="block">
                  <m.div
                    className={`relative rounded-[28px] overflow-hidden aspect-[4/3] md:aspect-[16/10] w-full`}
                    variants={imageVariants}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.title} — website built by NextGen Fusion`}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                    />

                    {/* Category Badge */}
                    <m.div
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-ink-soft border border-ink/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {project.category}
                    </m.div>

                    {/* Title Overlay - Hidden by default, shown on hover */}
                    <m.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-start p-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-white">
                        <h3 className="text-lg sm:text-xl font-medium mb-2 tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <span className="glass mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-ink">
                          Read More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </m.div>
                  </m.div>
                </Link>
              </m.div>
            ))}
          </m.div>
        )}
      </div>
    </m.section>
  );
}
