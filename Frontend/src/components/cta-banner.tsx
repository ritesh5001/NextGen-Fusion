"use client"

import { m } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, Phone } from "lucide-react"
import { whatsappHref } from "@/lib/whatsapp"
import { ScaleIn } from "@/components/motion/scale-in"

interface CTABannerProps {
  className?: string
  compact?: boolean // smaller paddings/sizes for detail pages
}

/**
 * The closing call to action on inner pages: an ink panel with colour orbs
 * behind frosted glass. It used to be a purple background image; the orbs are
 * CSS, so the banner costs no request.
 */
export default function CTABanner({ className = "", compact = false }: CTABannerProps) {
  return (
    <m.section
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScaleIn>
        <div className="relative isolate w-full overflow-hidden rounded-[36px] bg-ink">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="orb orb-blue -left-[10%] -top-[40%] h-[140%] w-[45%]" />
            <div className="orb orb-violet right-[-8%] top-[-30%] h-[130%] w-[40%]" />
            <div className="orb orb-cyan bottom-[-60%] right-[30%] h-[110%] w-[35%] opacity-70" />
          </div>
          <div
            className={`glass-ink m-2 rounded-[30px] backdrop-blur-2xl sm:m-3 ${
              compact ? "px-6 py-7 sm:px-10 sm:py-9" : "px-7 py-9 sm:px-12 sm:py-12"
            }`}
          >
            <h2
              className={`mb-4 font-normal leading-tight tracking-tight text-white ${
                compact ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl lg:text-5xl"
              }`}
            >
              Time to Stop Scrolling, Let&apos;s{" "}
              <span className="text-brand-light">Book a meeting</span> and discuss it!
            </h2>
            <p className={`mb-7 max-w-xl text-white/75 ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}>
              We&apos;re here to listen. Book a meeting with our team to discuss your vision,
              explore possibilities, and start creating something.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/#contact-section" className="btn btn-brand">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Book a meeting
              </Link>
              <a
                href={whatsappHref("Hi! I came across NextGen Fusion and I'd like to discuss a project. Could we schedule a quick call?")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn glass-ink text-white hover:bg-white/15"
              >
                Contact via WhatsApp
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        </ScaleIn>
      </div>
    </m.section>
  )
}
