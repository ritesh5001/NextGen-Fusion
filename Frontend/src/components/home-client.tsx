"use client"

import { Portfolio } from "@/lib/api"
import HeroSection from "@/components/hero-section"
import AboutUsSection from "@/components/about-us-section"
import ComparisonSection from "@/components/comparison-section"
import ServicesSection from "@/components/services-section"
import StackMarqueeSection from "@/components/stack-marquee-section"
import BannerSection from "@/components/banner-section"
import FAQSection from "@/components/faq-section"
import ContactSection from "@/components/contact-section"
import ProjectEstimatorSection from "@/components/project-estimator-section"
import WorkSection from "@/components/work-section"

type HomeClientProps = {
  portfolios: Portfolio[]
}

export default function HomeClient({ portfolios }: HomeClientProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <div id="hero">
        <HeroSection />
      </div>
      {/* Hero marquee removed per request */}
      <ComparisonSection />
      <div id="services">
        <ServicesSection />
      </div>
      {/* Portfolio section removed per request */}
      <div id="work">
        <WorkSection />
      </div>
      <div id="project-estimator">
        <ProjectEstimatorSection />
      </div>
      <BannerSection />
      <div id="about">
        <AboutUsSection />
      </div>
      <StackMarqueeSection />
      <div id="faq">
        <FAQSection />
      </div>
      <ProjectEstimatorSection />
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  )
}
