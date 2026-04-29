type KnowledgeTopic = {
  keywords: string[]
  title: string
  summary: string
  timelines: string[]
  pricing: string[]
  stack: string[]
}

const topics: KnowledgeTopic[] = [
  {
    keywords: ['website', 'landing page', 'business site', 'corporate site', 'portfolio'],
    title: 'Website development',
    summary:
      'NextGen Fusion designs and develops conversion-focused business websites, landing pages, and portfolio sites with responsive layouts, SEO-ready structure, and clear lead-generation flows.',
    timelines: ['Landing pages usually take around 1-2 weeks.', 'Multi-page business websites usually take around 3-6 weeks depending on content and revisions.'],
    pricing: ['Standard website builds usually fall around $100-$200.', 'Custom-coded website builds can start around $100 and scale up to about $2,000 depending on scope, pages, and integrations.'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'woocommerce', 'shopify', 'store', 'wordpress ecommerce', 'wordpress e-commerce'],
    title: 'E-commerce development',
    summary:
      'The agency builds e-commerce storefronts focused on conversion, checkout performance, payment gateway integration, catalog architecture, inventory workflows, and SEO.',
    timelines: ['Basic WooCommerce or Shopify stores usually take around 3-5 weeks.', 'Custom e-commerce builds with advanced catalog, payment, shipping, and CRM flows usually take around 4-10 weeks.'],
    pricing: ['WordPress, WooCommerce, and Shopify websites are usually quoted around $100-$200 for standard scope.', 'If the store needs more custom logic, integrations, or advanced workflows, the range can move upward toward custom website pricing.'],
    stack: ['Next.js', 'WooCommerce', 'Shopify', 'Stripe', 'Razorpay', 'Supabase'],
  },
  {
    keywords: ['saas', 'dashboard', 'portal', 'admin panel', 'web app', 'crm'],
    title: 'SaaS and custom product development',
    summary:
      'NextGen Fusion scopes and builds SaaS products, internal dashboards, admin panels, and custom business software with authentication, role-based access, backend workflows, and integrations.',
    timelines: ['MVP SaaS products usually take around 6-12 weeks.', 'Custom dashboards or internal tools can take around 4-8 weeks depending on data complexity and roles.'],
    pricing: ['Dashboards, portals, and SaaS-style builds are usually estimated from about $300 up to $2,000 depending on complexity.', 'If it behaves more like a fully custom-coded product, the range should be treated closer to the $100-$2,000 custom build bracket.'],
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
  },
  {
    keywords: ['wordpress', 'cms', 'blog'],
    title: 'WordPress and CMS builds',
    summary:
      'The agency can deliver content-managed marketing websites, blogs, and WooCommerce stores with strong UX, responsive implementation, SEO readiness, and lead capture.',
    timelines: ['Simple WordPress sites usually take around 2-4 weeks.', 'WordPress plus WooCommerce builds usually take around 3-6 weeks unless the product catalog or integrations are heavy.'],
    pricing: ['Standard WordPress websites are usually estimated around $100-$200.', 'WordPress with WooCommerce also usually starts in the same $100-$200 bracket unless custom requirements push it higher.'],
    stack: ['WordPress', 'WooCommerce', 'Custom themes', 'SEO plugins', 'Analytics'],
  },
  {
    keywords: ['android', 'app', 'mobile app'],
    title: 'Android app development',
    summary:
      'NextGen Fusion builds native Android apps with Kotlin, backend integration, push notifications, analytics, and Play Store launch support.',
    timelines: ['Android app projects usually take around 6-14 weeks depending on feature complexity, backend dependency, and QA scope.'],
    pricing: ['Android app work usually starts around $300 and can move up toward $2,000 depending on screens, backend work, and integrations.'],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'REST APIs'],
  },
  {
    keywords: ['seo', 'ranking', 'organic', 'google'],
    title: 'SEO services',
    summary:
      'The agency handles technical SEO, keyword planning, on-page optimization, content support, and tracking for long-term organic growth.',
    timelines: ['SEO setup can start within 1-2 weeks.', 'Meaningful organic movement usually takes 3-6 months depending on competition and current site quality.'],
    pricing: ['SEO is usually quoted around $100 for standard scope, with larger campaigns increasing if the content or technical workload expands.'],
    stack: ['Technical SEO', 'Content strategy', 'GA4', 'Search Console'],
  },
  {
    keywords: ['ai', 'automation', 'chatbot', 'agent', 'workflow'],
    title: 'AI automation and AI development',
    summary:
      'The agency builds AI assistants, workflow automation, lead qualification systems, and custom AI-powered product features tied to real operations.',
    timelines: ['Smaller AI automation systems usually take around 2-6 weeks.', 'Custom AI product features or multi-step business automations can take 6-12 weeks or more.'],
    pricing: ['Automation and AI-related work usually starts around $150 and can extend toward $1,500 or more when workflows, integrations, and reliability needs increase.'],
    stack: ['LLM APIs', 'Workflow automation', 'Node.js', 'Supabase', 'Custom integrations'],
  },
]

const generalFacts = [
  'NextGen Fusion offers website development, e-commerce, web design, Android app development, AI automation, SEO, PPC, social media marketing, software development, API integration, cloud solutions, and website maintenance.',
  'The company positions work around conversion, performance, scalability, SEO readiness, and clean implementation.',
  'Discovery calls are used for deeper scoping when the requirement is large, budget-sensitive, or integration-heavy.',
  'For cost questions, the assistant should answer in USD and stay close to these ranges: WordPress or Shopify websites around $100-$200, SEO around $100, and custom-coded websites around $100-$2,000 depending on scope.',
  'For timeline questions, the assistant should give realistic ranges and mention what usually affects delivery speed.',
  'If the user asks a direct service question, answer directly first. Do not force budget or booking questions before answering.',
  'Support and maintenance are available after launch.',
  'Typical business working hours mentioned on the website are Monday to Friday, 9 AM to 6 PM, while website booking slots can still be controlled separately.',
]

export function buildAgencyKnowledge(message: string) {
  const normalized = message.toLowerCase()
  const matched = topics.filter((topic) => topic.keywords.some((keyword) => normalized.includes(keyword)))
  const selected = matched.length ? matched : topics.slice(0, 3)

  return {
    generalFacts,
    matchedTopics: selected.map((topic) => ({
      title: topic.title,
      summary: topic.summary,
      timelines: topic.timelines,
      pricing: topic.pricing,
      stack: topic.stack,
    })),
  }
}

export function buildFallbackAnswer(message: string) {
  const knowledge = buildAgencyKnowledge(message)
  const firstTopic = knowledge.matchedTopics[0]
  const normalized = message.toLowerCase()
  const asksTimeline = /timeline|time|how long|duration|when/i.test(normalized)
  const asksPrice = /price|pricing|cost|quote|budget|estimate/i.test(normalized)
  const asksStack = /tech|stack|technology|platform/i.test(normalized)

  if (firstTopic) {
    const parts = [firstTopic.summary]
    if (asksTimeline && firstTopic.timelines.length) parts.push(firstTopic.timelines[0])
    if (asksPrice && firstTopic.pricing.length) parts.push(firstTopic.pricing[0])
    if (asksStack && firstTopic.stack.length) parts.push(`Typical stack: ${firstTopic.stack.join(', ')}.`)

    if (!asksTimeline && !asksPrice && !asksStack) {
      if (firstTopic.timelines[0]) parts.push(firstTopic.timelines[0])
      if (firstTopic.pricing[0]) parts.push(firstTopic.pricing[0])
    }

    return parts.join(' ')
  }

  return 'NextGen Fusion handles websites, e-commerce, SaaS products, custom software, SEO, AI automation, and support. Share what you want to build and I can break down the likely scope, timeline, and pricing range.'
}
