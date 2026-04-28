import type { Metadata } from "next"
import AiServicePage from "@/components/services/AiServicePage"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nextgenfusion.in"

export const metadata: Metadata = {
  title: "AI Automation and AI Development Services | NextGen Fusion",
  description: "AI Automation and Development Services by NextGen Fusion — workflow automation, LLM integration, AI chatbots, and custom AI feature development for your business.",
  alternates: { canonical: `${siteUrl}/services/ai-automation-development-services` },
  openGraph: {
    title: "AI Automation and AI Development Services | NextGen Fusion",
    description: "Automate workflows and build AI-powered features with LLM integration, smart assistants, and intelligent data pipelines.",
    url: `${siteUrl}/services/ai-automation-development-services`,
    siteName: "NextGen Fusion",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "AI Automation Services | NextGen Fusion", description: "Put AI to work in your business with workflow automation and LLM-powered features." },
}

export default function Page() {
  return <AiServicePage />
}
