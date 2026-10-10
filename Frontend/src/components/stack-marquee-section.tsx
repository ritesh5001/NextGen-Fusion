"use client"

import { m } from "framer-motion"
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
      { name: "React", iconUrl: "/tech-icons/react.svg" },
      { name: "Next.js", iconUrl: "/tech-icons/nextjs.svg" },
      { name: "TypeScript", iconUrl: "/tech-icons/typescript.svg" },
      { name: "Node.js", iconUrl: "/tech-icons/nodejs.svg" },
      { name: "Tailwind", iconUrl: "/tech-icons/tailwindcss.svg" },
      { name: "PostgreSQL", iconUrl: "/tech-icons/postgresql.svg" },
      { name: "MongoDB", iconUrl: "/tech-icons/mongodb.svg" },
      { name: "Figma", iconUrl: "/tech-icons/figma.svg" },
      { name: "AWS", iconUrl: "/tech-icons/aws.svg" },
      { name: "Docker", iconUrl: "/tech-icons/docker.svg" },
    ],
  ]

  return (
    <m.section
      className="py-5 sm:py-6 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
        <m.div
          className="text-center"
          variants={itemVariants}
        >
          <m.div className="mb-3" variants={textVariants}>
            <BadgeSubtitle>Tech Stack</BadgeSubtitle>
          </m.div>
          <m.h2
            className="display text-lg sm:text-xl"
            variants={textVariants}
          >
            The tools that accompany our workflow.
          </m.h2>
        </m.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <m.div
          className="space-y-8"
          variants={containerVariants}
        >
          {techStackLines.map((techLine, lineIndex) => (
            <m.div
              key={lineIndex}
              className="stack-row flex overflow-hidden py-3"
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
                className={`flex gap-3 sm:gap-4 ${lineIndex % 2 === 0 ? "animate-marquee-right" : "animate-marquee-left"}`}
                style={{
                  width: "max-content",
                }}
              >
                {/* Duplicate the tech stack multiple times for seamless loop */}
                {[...Array(3)].map((_, duplicateIndex) => (
                  <div key={`${lineIndex}-${duplicateIndex}`} className="flex gap-3 sm:gap-4">
                    {techLine.map((tech, techIndex) => (
                      <m.div
                        key={`${tech.name}-${duplicateIndex}-${techIndex}`}
                        className="stack-chip glass flex items-center gap-3 rounded-full py-2 pl-2 pr-5"
                        variants={imageVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: lineIndex * 0.2 + techIndex * 0.05 }}
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                          <Image
                            src={tech.iconUrl}
                            alt={tech.name}
                            width={64}
                            height={64}
                            className="h-7 w-7 object-contain"
                          />
                        </span>
                        <span className="whitespace-nowrap text-sm font-medium text-ink">{tech.name}</span>
                      </m.div>
                    ))}
                  </div>
                ))}
              </div>
            </m.div>
          ))}
        </m.div>
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
    </m.section>
  )
}