import dynamic from "next/dynamic"
import HeroSection from "@/components/hero-section"
import SocialProofSection from "@/components/social-proof-section"
import type { CaseStudySummary, FeaturedProject } from "@/components/work-section"

// A server component: it only arranges sections, so the social-proof strip
// and the case-study data stay on the server. Below-the-fold sections are code-split so their JS (and framer-motion usage)
// loads as separate chunks instead of bloating the initial homepage bundle.
// SSR stays on (default) so the content is still in the HTML for SEO / no CLS.
const AboutUsSection = dynamic(() => import("@/components/about-us-section"))
const ComparisonSection = dynamic(() => import("@/components/comparison-section"))
const ServicesSection = dynamic(() => import("@/components/services-section"))
const ProcessSection = dynamic(() => import("@/components/process-section"))
const StackMarqueeSection = dynamic(() => import("@/components/stack-marquee-section"))
const FAQSection = dynamic(() => import("@/components/faq-section"))
const ContactSection = dynamic(() => import("@/components/contact-section"))
const WorkSection = dynamic(() => import("@/components/work-section"))
const VelocityMarquee = dynamic(() => import("@/components/motion/velocity-marquee").then((mod) => mod.VelocityMarquee))

export default function HomeClient({
  featuredProjects,
  caseStudySummaries,
}: {
  featuredProjects: FeaturedProject[]
  caseStudySummaries: Record<string, CaseStudySummary>
}) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <div id="hero">
        <HeroSection />
      </div>
      <SocialProofSection />
      {/* No defer-render here: content-visibility contains paint, which would
          trap the pinned gallery's position: fixed inside this box. */}
      <div id="work">
        <WorkSection featured={featuredProjects} caseStudySummaries={caseStudySummaries} />
      </div>
      <VelocityMarquee words={["Websites", "Online stores", "Apps", "AI automation", "SEO"]} />
      <div className="defer-render">
        <ComparisonSection />
      </div>
      <div id="services" className="defer-render">
        <ServicesSection />
      </div>
      <div className="defer-render">
        <ProcessSection />
      </div>
      <div id="about" className="defer-render">
        <AboutUsSection />
      </div>
      {/* The project estimator (components/project-estimator-section.tsx) is
          switched off for now; the component and its backend are kept, so
          bringing it back is this block plus its import. */}
      <div className="defer-render">
        <StackMarqueeSection />
      </div>
      <div id="faq" className="defer-render">
        <FAQSection />
      </div>
      {/* No CTABanner here: it repeated the contact section's "Time to Stop
          Scrolling" H2 directly above the section itself. */}
      <div id="contact" className="defer-render">
        <ContactSection />
      </div>
    </main>
  )
}
