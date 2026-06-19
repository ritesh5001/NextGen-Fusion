"use client"

import { Portfolio } from "@/lib/api"
import HeroSection from "@/components/hero-section"
import SocialProofSection from "@/components/social-proof-section"
import AboutUsSection from "@/components/about-us-section"
import ComparisonSection from "@/components/comparison-section"
import ServicesSection from "@/components/services-section"
import ProcessSection from "@/components/process-section"
import StackMarqueeSection from "@/components/stack-marquee-section"
import TestimonialsSection from "@/components/testimonials-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import ProjectEstimatorSection from "@/components/project-estimator-section"
import WorkSection from "@/components/work-section"
import CTABanner from "@/components/cta-banner"

type HomeClientProps = {
  portfolios: Portfolio[]
}

export default function HomeClient({ portfolios }: HomeClientProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <div id="hero">
        <HeroSection />
      </div>
      <SocialProofSection />
      <div id="work">
        <WorkSection />
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
