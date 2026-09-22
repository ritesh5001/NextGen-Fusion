"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import BadgeSubtitle from "./badge-subtitle"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import { useMobileIcon } from "@/hooks/use-mobile-icon"
import { team } from "@/data/team"
import { staticProjects } from "@/lib/static-projects"

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

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6
    }
  },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      duration: 0.3
    }
  }
}

export default function AboutUsSection() {
  const { getIconSrc } = useMobileIcon()
  
  // Derived from the canonical team source. This section used to carry its own
  // copy of the roster, with its own guessed LinkedIn URLs — which is how the
  // site ended up publishing links to profiles nobody had checked.
  const teamMembers = team.map((member, i) => ({
    id: i + 1,
    name: member.name,
    designation: member.role,
    image: member.image,
    hoverimage: member.image,
    ...(member.linkedinUrl ? { linkedinUrl: member.linkedinUrl } : {}),
  }))

  return (
    <motion.section 
      id="about" 
      className="bg-white py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="mb-6"
              variants={textVariants}
            >
              <BadgeSubtitle>About Us</BadgeSubtitle>
            </motion.div>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8"
              variants={textVariants}
            >
              <div className="flex flex-wrap items-center gap-2">
                <motion.div 
                  className="relative -translate-y-1 inline-block overflow-hidden hero-icon"
                  variants={imageVariants}
                  whileHover="hover"
                >
                  <Image
                    src={getIconSrc("/images/handwaves.svg", "/images/handwaves.png")}
                    alt=""
                    width={56}
                    height={56}
                    className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14"
                  />
                </motion.div>
                <span className="inline-block bg-gradient-to-r from-[#2B35AB] via-[#8A38F5] to-[#13CBD4] bg-clip-text text-transparent">
                  Hello
                </span>
                <span>. We are</span>
              </div>{" "}
              <span className="text-gray-900">NextGen</span>{" "}
              <br />
              <span className="text-gray-900">Fusion</span>
            </motion.h2>
          </motion.div>

          {/* Right Column */}
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
          >
            {/* Two column text content */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-8"
              variants={itemVariants}
            >
              <motion.div
                variants={textVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Why we showed up</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Most of our enquiries come from businesses whose previous developer stopped replying.
                  So we stay on after launch, on a support plan with a published price, and the person
                  who wrote your code is the person who answers when something needs changing.
                </p>
              </motion.div>
              <motion.div
                variants={textVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Our Focus and Work</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Websites and online stores for D2C brands, manufacturers, institutes and B2B firms,
                  with {staticProjects.length} of them written up as case studies you can check. We judge
                  a build by the enquiries and sales it brings in, not by how it looks in a pitch deck.
                </p>
              </motion.div>
            </motion.div>

            {/* Team Section */}
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-2xl font-bold text-gray-900 mb-3"
                variants={textVariants}
              >
                Meet the Team Behind Our Work
              </motion.h2>
              <motion.p 
                className="text-gray-600 text-sm sm:text-base mb-8"
                variants={textVariants}
              >
                {team.length} people across Lucknow and Mumbai. The developer who scopes your project
                writes the code.
              </motion.p>

              {/* Team Member Avatars */}
              <motion.div 
                className="flex justify-start"
                variants={textVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedTooltip items={teamMembers} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
