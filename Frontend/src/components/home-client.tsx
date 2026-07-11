"use client"

import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import SocialProofSection from "@/components/social-proof-section"

// Below-the-fold sections are code-split so their JS (and framer-motion usage)
// loads as separate chunks instead of bloating the initial homepage bundle.
// SSR stays on (default) so the content is still in the HTML for SEO / no CLS.
const AboutUsSection = dynamic(() => import("@/components/about-us-section"))
const ComparisonSection = dynamic(() => import("@/components/comparison-section"))
const ServicesSection = dynamic(() => import("@/components/services-section"))
const ProcessSection = dynamic(() => import("@/components/process-section"))
const StackMarqueeSection = dynamic(() => import("@/components/stack-marquee-section"))
const TestimonialsSection = dynamic(() => import("@/components/testimonials-section"))
const FAQSection = dynamic(() => import("@/components/faq-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const ProjectEstimatorSection = dynamic(() => import("@/components/project-estimator-section"))
const WorkSection = dynamic(() => import("@/components/work-section"))
const DeliveredWall = dynamic(() => import("@/components/delivered-wall"))
const CTABanner = dynamic(() => import("@/components/cta-banner"))

export default function HomeClient() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <div id="hero">
        <HeroSection />
      </div>
      <SocialProofSection />
      <div id="work">
        <WorkSection />
        <DeliveredWall limit={8} hideHeader showViewAll />
      </div>
      <ComparisonSection />
      <div id="services">
        <ServicesSection />
      </div>
      <ProcessSection />
      <div id="about">
        <AboutUsSection />
      </div>
      <TestimonialsSection />
      <div id="project-estimator">
        <ProjectEstimatorSection />
      </div>
      <StackMarqueeSection />
      <div id="faq">
        <FAQSection />
      </div>
      <CTABanner className="py-16" />
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  )
}
