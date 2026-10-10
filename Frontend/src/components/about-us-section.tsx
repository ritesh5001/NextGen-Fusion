"use client"

import { m } from "framer-motion"
import BadgeSubtitle from "./badge-subtitle"
import Image from "next/image"
import Link from "next/link"
import { ScrollWords } from "@/components/motion/scroll-words"
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
  const whyText =
    "Most of our enquiries come from businesses whose previous developer stopped replying. So we stay on after launch, on a support plan quoted upfront, and the person who wrote your code is the person who answers when something needs changing."
  const focusText = `${PROJECTS_DELIVERED} websites, online stores and web apps delivered for D2C brands, manufacturers, institutes and B2B firms, with ${staticProjects.length} of them written up as case studies you can check. We judge a build by the enquiries and sales it brings in, not by how it looks in a pitch deck.`

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
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-start">
          {/* Left Column: the heading, then the people */}
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

            {/* Team Section */}
            <m.div variants={textVariants} className="wash-violet rounded-[32px] p-6 sm:p-8">
              <m.h2 className="text-2xl font-medium tracking-tight text-ink mb-3" variants={textVariants}>
                Meet the Team Behind Our Work
              </m.h2>
              <m.p className="text-ink text-sm sm:text-base mb-6 max-w-md" variants={textVariants}>
                {team.length} people across Lucknow and Mumbai. The developer who scopes your project
                writes the code.
              </m.p>

              {/* Larger portraits with names: each one is a link to the person's page. */}
              <ul className="grid auto-rows-fr grid-cols-2 gap-3 sm:gap-4">
                {team.map((member) => (
                  <li key={member.slug}>
                    <Link
                      href={`/team/${member.slug}/`}
                      prefetch={false}
                      className="glass group flex h-full flex-col items-center justify-start gap-3 rounded-[24px] p-4 text-center transition hover:bg-white"
                    >
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.role} at NextGen Fusion`}
                        width={96}
                        height={96}
                        sizes="88px"
                        className="h-[88px] w-[88px] shrink-0 rounded-full object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block text-base font-medium leading-snug text-ink">{member.name}</span>
                        <span className="mt-1 block text-xs leading-snug text-ink-soft">{member.role}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </m.div>
          </m.div>

          {/* Right Column: two statements whose words light up as you read */}
          <m.div className="space-y-4 lg:pt-4" variants={containerVariants}>
            <m.div variants={textVariants} className="glass rounded-[32px] p-7 sm:p-9">
              <h3 className="text-2xl font-medium tracking-tight text-ink mb-4">Why we showed up</h3>
              <ScrollWords text={whyText} className="text-lg leading-relaxed text-ink sm:text-xl" />
            </m.div>
            <m.div variants={textVariants} className="glass rounded-[32px] p-7 sm:p-9">
              <h3 className="text-2xl font-medium tracking-tight text-ink mb-4">Our Focus and Work</h3>
              <ScrollWords text={focusText} className="text-lg leading-relaxed text-ink sm:text-xl" />
            </m.div>
          </m.div>
        </div>
      </div>
    </m.section>
  )
}
