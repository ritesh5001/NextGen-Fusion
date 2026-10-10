"use client"

import { m } from "framer-motion"
import BadgeSubtitle from "./badge-subtitle"
import { AnimatedTooltip } from "./ui/animated-tooltip"
import { team } from "@/data/team"
import { staticProjects } from "@/lib/static-projects"
import { PROJECTS_DELIVERED } from "@/lib/seo"

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

export default function AboutUsSection() {
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
    <m.section 
      id="about" 
      className="py-20 sm:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <m.div variants={itemVariants}>
            <m.div className="mb-5" variants={textVariants}>
              <BadgeSubtitle>About Us</BadgeSubtitle>
            </m.div>
            <m.h2 className="mb-8" variants={textVariants}>
              <span className="display block text-4xl sm:text-5xl lg:text-6xl">
                <span className="text-gradient">Hello,</span> we&apos;re NextGen Fusion
              </span>
              <span className="mt-5 block text-xl tracking-tight text-ink-soft sm:text-2xl">
                A web development studio in Lucknow &amp; Mumbai
              </span>
            </m.h2>
          </m.div>

          {/* Right Column */}
          <m.div className="space-y-4" variants={containerVariants}>
            {/* Two column text content */}
            <m.div className="grid sm:grid-cols-2 gap-4" variants={itemVariants}>
              <m.div variants={textVariants} className="glass rounded-[28px] p-6 sm:p-7">
                <h3 className="text-xl font-medium tracking-tight text-ink mb-3">Why we showed up</h3>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  Most of our enquiries come from businesses whose previous developer stopped replying.
                  So we stay on after launch, on a support plan quoted upfront, and the person
                  who wrote your code is the person who answers when something needs changing.
                </p>
              </m.div>
              <m.div variants={textVariants} className="glass rounded-[28px] p-6 sm:p-7">
                <h3 className="text-xl font-medium tracking-tight text-ink mb-3">Our Focus and Work</h3>
                <p className="text-ink-soft text-sm sm:text-base leading-relaxed">
                  {PROJECTS_DELIVERED} websites, online stores and web apps delivered for D2C brands,
                  manufacturers, institutes and B2B firms, with {staticProjects.length} of them written up
                  as case studies you can check. We judge
                  a build by the enquiries and sales it brings in, not by how it looks in a pitch deck.
                </p>
              </m.div>
            </m.div>

            {/* Team Section */}
            <m.div variants={itemVariants} className="wash-violet rounded-[32px] p-6 sm:p-8">
              <m.h2 className="text-2xl font-medium tracking-tight text-ink mb-3" variants={textVariants}>
                Meet the Team Behind Our Work
              </m.h2>
              <m.p className="text-ink text-sm sm:text-base mb-8 max-w-md" variants={textVariants}>
                {team.length} people across Lucknow and Mumbai. The developer who scopes your project
                writes the code.
              </m.p>

              {/* Team Member Avatars */}
              <m.div className="flex justify-start" variants={textVariants}>
                <AnimatedTooltip items={teamMembers} />
              </m.div>
            </m.div>
          </m.div>
        </div>
      </div>
    </m.section>
  )
}
