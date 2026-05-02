"use client"

import { Portfolio } from "@/lib/api"
import HeroSection from "@/components/hero-section"
import HeroMarqueeSection from "@/components/hero-marquee-section"
import AboutUsSection from "@/components/about-us-section"
import ComparisonSection from "@/components/comparison-section"
import ServicesSection from "@/components/services-section"
import StackMarqueeSection from "@/components/stack-marquee-section"
import BannerSection from "@/components/banner-section"
import PortfolioSection from "@/components/portfolio-section"
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
      <HeroMarqueeSection initialPortfolios={portfolios} />
      <ComparisonSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="portfolio">
        <PortfolioSection portfolios={portfolios} />
      </div>
      <div id="work">
        <WorkSection />
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
