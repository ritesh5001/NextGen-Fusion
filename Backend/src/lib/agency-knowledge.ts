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
    pricing: ['Landing pages usually start around INR 25,000-60,000.', 'Multi-page custom websites are commonly in the INR 60,000-2,50,000 range depending on pages, design depth, CMS needs, and integrations.'],
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase'],
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'woocommerce', 'shopify', 'store', 'wordpress ecommerce', 'wordpress e-commerce'],
    title: 'E-commerce development',
    summary:
      'The agency builds e-commerce storefronts focused on conversion, checkout performance, payment gateway integration, catalog architecture, inventory workflows, and SEO.',
    timelines: ['Basic WooCommerce or Shopify stores usually take around 3-5 weeks.', 'Custom e-commerce builds with advanced catalog, payment, shipping, and CRM flows usually take around 4-10 weeks.'],
    pricing: ['Starter stores typically fall around INR 80,000-2,00,000.', 'Custom e-commerce systems with deeper workflows, automations, and integrations can move into the INR 2,00,000-6,00,000+ range.'],
    stack: ['Next.js', 'WooCommerce', 'Shopify', 'Stripe', 'Razorpay', 'Supabase'],
  },
  {
    keywords: ['saas', 'dashboard', 'portal', 'admin panel', 'web app', 'crm'],
    title: 'SaaS and custom product development',
    summary:
      'NextGen Fusion scopes and builds SaaS products, internal dashboards, admin panels, and custom business software with authentication, role-based access, backend workflows, and integrations.',
    timelines: ['MVP SaaS products usually take around 6-12 weeks.', 'Custom dashboards or internal tools can take around 4-8 weeks depending on data complexity and roles.'],
    pricing: ['Dashboard or internal-tool work often starts around INR 1,50,000.', 'SaaS MVPs typically land around INR 3,00,000-12,00,000+ depending on scope, roles, billing, and automation depth.'],
    stack: ['Next.js', 'React', 'Node.js', 'Express', 'Supabase', 'PostgreSQL'],
  },
  {
    keywords: ['wordpress', 'cms', 'blog'],
    title: 'WordPress and CMS builds',
    summary:
      'The agency can deliver content-managed marketing websites, blogs, and WooCommerce stores with strong UX, responsive implementation, SEO readiness, and lead capture.',
    timelines: ['Simple WordPress sites usually take around 2-4 weeks.', 'WordPress plus WooCommerce builds usually take around 3-6 weeks unless the product catalog or integrations are heavy.'],
    pricing: ['WordPress marketing sites are usually around INR 40,000-1,50,000.', 'WordPress plus WooCommerce projects are usually around INR 80,000-2,50,000+ depending on catalog size and custom features.'],
    stack: ['WordPress', 'WooCommerce', 'Custom themes', 'SEO plugins', 'Analytics'],
  },
  {
    keywords: ['android', 'app', 'mobile app'],
    title: 'Android app development',
    summary:
      'NextGen Fusion builds native Android apps with Kotlin, backend integration, push notifications, analytics, and Play Store launch support.',
    timelines: ['Android app projects usually take around 6-14 weeks depending on feature complexity, backend dependency, and QA scope.'],
    pricing: ['Simple Android apps often start around INR 2,00,000.', 'Feature-heavy Android products can range from INR 4,00,000 to INR 12,00,000+ depending on modules and integrations.'],
    stack: ['Kotlin', 'Jetpack Compose', 'Firebase', 'REST APIs'],
  },
  {
    keywords: ['seo', 'ranking', 'organic', 'google'],
    title: 'SEO services',
    summary:
      'The agency handles technical SEO, keyword planning, on-page optimization, content support, and tracking for long-term organic growth.',
    timelines: ['SEO setup can start within 1-2 weeks.', 'Meaningful organic movement usually takes 3-6 months depending on competition and current site quality.'],
    pricing: ['SEO retainers typically start around INR 25,000 per month and scale with content velocity, technical workload, and competition.'],
    stack: ['Technical SEO', 'Content strategy', 'GA4', 'Search Console'],
  },
  {
    keywords: ['ai', 'automation', 'chatbot', 'agent', 'workflow'],
    title: 'AI automation and AI development',
    summary:
      'The agency builds AI assistants, workflow automation, lead qualification systems, and custom AI-powered product features tied to real operations.',
    timelines: ['Smaller AI automation systems usually take around 2-6 weeks.', 'Custom AI product features or multi-step business automations can take 6-12 weeks or more.'],
    pricing: ['Small automation builds often start around INR 60,000-2,00,000.', 'Custom AI systems and deeper workflow automation can range from INR 2,00,000-8,00,000+ depending on data, integrations, and reliability requirements.'],
    stack: ['LLM APIs', 'Workflow automation', 'Node.js', 'Supabase', 'Custom integrations'],
  },
]

const generalFacts = [
  'NextGen Fusion offers website development, e-commerce, web design, Android app development, AI automation, SEO, PPC, social media marketing, software development, API integration, cloud solutions, and website maintenance.',
  'The company positions work around conversion, performance, scalability, SEO readiness, and clean implementation.',
  'Discovery calls are used for deeper scoping when the requirement is large, budget-sensitive, or integration-heavy.',
  'For cost questions, the assistant should give realistic price ranges and name the factors that move the quote up or down.',
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
