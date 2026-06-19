"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import BadgeSubtitle from "./badge-subtitle"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const marqueeVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
}

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -5
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function StackMarqueeSection() {
  // A single curated row of the core tools we work with.
  const techStackLines = [
    [
      { name: "React", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Next.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "Node.js", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Tailwind", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "PostgreSQL", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
      { name: "Figma", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "AWS", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Docker", iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    ],
  ]

  return (
    <motion.section
      className="bg-white py-32 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <motion.div
            className="mb-4"
            variants={textVariants}
          >
            <BadgeSubtitle>Tech Stack</BadgeSubtitle>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            variants={textVariants}
          >
            The tools that accompany our workflow.
          </motion.h2>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
        >
          {techStackLines.map((techLine, lineIndex) => (
            <motion.div
              key={lineIndex}
              className="flex overflow-hidden rounded-lg"
              style={{
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              }}
              variants={marqueeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: lineIndex * 0.2 }}
            >
              <div
                className={`flex gap-8 sm:gap-12 ${lineIndex % 2 === 0 ? "animate-marquee-right" : "animate-marquee-left"}`}
                style={{
                  width: "max-content",
                }}
              >
                {/* Duplicate the tech stack multiple times for seamless loop */}
                {[...Array(3)].map((_, duplicateIndex) => (
                  <div key={`${lineIndex}-${duplicateIndex}`} className="flex gap-8 sm:gap-12">
                    {techLine.map((tech, techIndex) => (
                      <motion.div
                        key={`${tech.name}-${duplicateIndex}-${techIndex}`}
                        className="flex flex-col items-center gap-2 group"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: lineIndex * 0.2 + techIndex * 0.05 }}
                        whileHover={{
                          scale: 1.1,
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="relative">
                          <Image
                            src={tech.iconUrl}
                            alt={tech.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 transition-all duration-300 group-hover:drop-shadow-lg object-contain"
                          />
                          {/* Subtle glow effect on hover */}
                          <div
                            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl bg-blue-500"
                          />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }
      `}</style>
    </motion.section>
  )
}