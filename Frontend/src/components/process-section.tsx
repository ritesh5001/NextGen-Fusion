"use client"

import { m } from "framer-motion"
import { LayoutTemplate, PhoneCall, Rocket } from "lucide-react"
import BadgeSubtitle from "./badge-subtitle"
import { ProcessLine } from "@/components/motion/process-line"

const steps = [
  {
    number: "1",
    title: "Free call & scope",
    description:
      "We learn your business, goals, and budget, then map a clear scope and a fixed quote — no jargon, no surprises.",
  },
  {
    number: "2",
    title: "Design & build",
    description:
      "We design and develop your site with review rounds at each milestone, so you approve as we go and stay in control.",
  },
  {
    number: "3",
    title: "Launch & grow",
    description:
      "We launch fast, then keep improving — performance, SEO, and conversions. We don't ghost you after launch.",
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
}

// One wash per step, so the three cards read as a sequence at a glance.
const STEP_WASH = ["wash-blue", "wash-violet", "wash-cyan"]
const STEP_ICON = [PhoneCall, LayoutTemplate, Rocket]

export default function ProcessSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <m.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <m.div variants={item} className="mb-5">
            <BadgeSubtitle>How we work</BadgeSubtitle>
          </m.div>
          <m.h2 variants={item} className="display text-4xl sm:text-5xl lg:text-6xl">
            From idea to launch in{" "}
            <span className="text-gradient whitespace-nowrap">three simple steps</span>
          </m.h2>
        </m.div>

        <ProcessLine steps={steps.length} />
        <m.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={container}
        >
          {steps.map((step, index) => {
            const Icon = STEP_ICON[index % STEP_ICON.length]
            return (
            <m.div key={step.number} variants={item} className="step-card glass rounded-[32px] p-3">
              <div className={`${STEP_WASH[index % STEP_WASH.length]} relative flex h-20 items-end overflow-hidden rounded-[24px] p-5 sm:h-36`}>
                {/* Decorative: a large ghost of the step number and an icon
                    rise into the gradient on hover. */}
                <span className="step-ghost" aria-hidden="true">{step.number}</span>
                <Icon className="step-icon h-9 w-9 text-white" aria-hidden="true" />
                <span className="glass-blur relative flex h-14 w-14 items-center justify-center rounded-full text-2xl font-medium text-ink">
                  {step.number}
                </span>
              </div>
              <div className="px-4 pb-5 pt-6">
                <h3 className="text-2xl font-medium tracking-tight text-ink mb-3">{step.title}</h3>
                <p className="text-ink-soft leading-relaxed">{step.description}</p>
              </div>
            </m.div>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}
