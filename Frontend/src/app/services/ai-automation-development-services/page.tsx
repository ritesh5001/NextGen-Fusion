import type { Metadata } from "next"
import AiServicePage from "@/components/services/AiServicePage"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbSchema, buildMetadata, serviceSchema } from "@/lib/seo"

const PATH = "/services/ai-automation-development-services"
const NAME = "AI Automation and AI Development Services"

export const metadata: Metadata = buildMetadata({
  title: "AI Automation and AI Development Services",
  description: "Workflow automation, LLM integration, AI chatbots and custom AI feature development, built into the systems you already run.",
  path: PATH,
  ogTitle: "AI Automation and AI Development Services | NextGen Fusion",
  ogDescription: "Automate workflows and build AI-powered features with LLM integration, smart assistants, and intelligent data pipelines.",
  twitterTitle: "AI Automation Services | NextGen Fusion",
  twitterDescription: "Put AI to work in your business with workflow automation and LLM-powered features.",
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({ name: NAME, description: "Automate workflows and build AI-powered features with LLM integration, smart assistants, and intelligent data pipelines.", path: PATH }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: NAME, path: PATH },
          ]),
        ]}
      />
      <AiServicePage />
    </>
  )
}
