import type { BlogPost } from "@/lib/api"

/** URL-safe slug for a category name, e.g. "Web Design" -> "web-design". */
export function categorySlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** The real category label a slug resolves to, read off whichever post still has it. */
export function categoryLabelFromSlug(posts: BlogPost[], slug: string): string | undefined {
  return posts.find((post) => post.category && categorySlug(post.category) === slug)?.category ?? undefined
}

/** Distinct category slugs present across active posts, for static params and the sitemap. */
export function activeCategorySlugs(posts: BlogPost[]): string[] {
  const slugs = new Set<string>()
  for (const post of posts) {
    if (post.category) slugs.add(categorySlug(post.category))
  }
  return [...slugs]
}

/**
 * Same-category posts first, then the rest — so "related posts" is an actual
 * topical link instead of whatever three posts happen to sort next.
 */
export function relatedPosts(posts: BlogPost[], current: BlogPost, limit = 3): BlogPost[] {
  const others = posts.filter((post) => post.id !== current.id)
  const sameCategory = current.category
    ? others.filter((post) => post.category === current.category)
    : []
  const rest = others.filter((post) => !sameCategory.includes(post))
  return [...sameCategory, ...rest].slice(0, limit)
}

type CategoryCopy = {
  title: string
  heading: string
  description: string
  /** Introduction above the post list, so the archive is a page of its own and not just a list of cards. */
  intro: string[]
  /** The service pages this category supports. */
  links: { label: string; href: string }[]
}

/**
 * Hand-written copy for each category archive. An archive was ~250 words of
 * card excerpts, which is thin; the introduction and links make it a useful
 * hub for the topic. Categories without an entry, or with fewer than
 * CATEGORY_INDEX_MIN_POSTS posts, are noindexed and left out of the sitemap
 * (see isCategoryIndexable).
 */
export const categoryCopy: Record<string, CategoryCopy> = {
  india: {
    title: "Website & Software Development in India: City Guides",
    heading: "Website, Software & AI Development in India",
    description:
      "City-by-city guides for Indian businesses: websites, custom software, ecommerce and AI automation in Delhi, Mumbai, Bengaluru, Chennai, Lucknow and more.",
    intro: [
      "Buying a website or software in India looks different from city to city. A D2C brand in Mumbai worries about COD and returns, a Bengaluru startup about shipping a SaaS release, a Lucknow institute about admissions enquiries that arrive on WhatsApp at night.",
      "These guides cover what businesses in each city are actually building, what it costs and how long it takes, written by the team in Lucknow and Mumbai that builds it.",
    ],
    links: [
      { label: "Cities we work in across India", href: "/india/" },
      { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
      { label: "Website development company in Lucknow", href: "/website-development-company-in-lucknow/" },
    ],
  },
  "e-commerce": {
    title: "Ecommerce Guides for Indian Online Stores",
    heading: "Ecommerce",
    description:
      "Practical guides for Indian online stores: Shopify vs WooCommerce, payment gateways, COD and the decisions that decide whether a store makes money.",
    intro: [
      "Running an online store in India means solving problems most ecommerce advice ignores: cash on delivery and returns, payment gateways that charge differently for UPI and cards, and apps billed in dollars every month.",
      "These articles come from the stores we build and maintain. They compare platforms in rupees, explain where each one stops making sense, and link to the work behind the numbers.",
    ],
    links: [
      { label: "Ecommerce development services", href: "/services/ecommerce-web-development-services/" },
      { label: "Shopify development services", href: "/services/shopify-development-services/" },
      { label: "Ecommerce development in Lucknow", href: "/ecommerce-development-company-in-lucknow/" },
    ],
  },
  development: {
    title: "Website Development Guides: Process, Platforms & Timelines",
    heading: "Website Development",
    description:
      "How websites get built: timelines, Next.js vs WordPress, freelancer vs agency, and what to put in writing before a project starts.",
    intro: [
      "Most of what goes wrong on a website project is decided before any code is written: the platform, who builds it, who owns the domain and code, and how long everyone thinks it will take.",
      "These guides answer the questions we hear on first calls, with the timelines we actually quote and the trade-offs we would weigh in your place.",
    ],
    links: [
      { label: "Website development services", href: "/services/website-development-services/" },
      { label: "Next.js development services", href: "/services/nextjs-development-services/" },
      { label: "Website maintenance", href: "/services/website-maintenance-services/" },
    ],
  },
  seo: {
    title: "SEO Guides for Indian Businesses",
    heading: "SEO",
    description:
      "SEO for local and service businesses in India: why service pages don't rank, how long SEO takes, and the fixes that move results first.",
    intro: [
      "Most small business sites don't rank for one of a handful of reasons: pages Google can't index, one Services page trying to rank for twelve services, or a Google Business Profile that disagrees with the website.",
      "These articles explain what we check first on an SEO audit, how long each kind of improvement takes to show, and how to tell a campaign is working before rankings move.",
    ],
    links: [
      { label: "SEO services", href: "/services/seo-services/" },
      { label: "SEO services in Lucknow", href: "/seo-services-in-lucknow/" },
      { label: "SEO services in Mumbai", href: "/seo-services-in-mumbai/" },
    ],
  },
  pricing: {
    title: "Website Pricing Guides for India",
    heading: "Pricing",
    description:
      "What websites, online stores and custom software cost in India, what drives the price, and how to compare quotes that look nothing alike.",
    intro: [
      "Two quotes for the same website can differ by ten times, and both can be fair. The difference is usually in what is included: content, integrations, support after launch, and who owns the result.",
      "These guides break down where the money goes so you can compare quotes on what they deliver rather than on the headline number.",
    ],
    links: [
      { label: "Website development cost in India", href: "/website-development-cost-in-india/" },
      { label: "Website development services", href: "/services/website-development-services/" },
    ],
  },
  "case-study": {
    title: "Case Studies: Lessons From Real Builds",
    heading: "Case Studies",
    description:
      "Write-ups of real projects: what the client needed, what we built, what went wrong and what we would do differently.",
    intro: [
      "Each case study follows a real project from brief to launch, including the parts that didn't go to plan.",
      "For the full portfolio with screenshots and results, see our published work.",
    ],
    links: [
      { label: "Our work", href: "/work/" },
      { label: "Marketplace development services", href: "/services/marketplace-development-services/" },
    ],
  },
  "website-redesign": {
    title: "Website Redesign Guides: When to Fix, When to Rebuild",
    heading: "Website Redesign",
    description:
      "Signs your website is costing you customers, how to decide between fixing and rebuilding, and how to redesign without losing your Google rankings.",
    intro: [
      "Most websites don't need a full redesign. They need the few problems that lose customers fixed: an unclear first screen, a broken mobile layout, a contact form that quietly stopped sending.",
      "These guides help you work out which problems you have, what to keep, and how to rebuild safely when a rebuild really is the answer.",
    ],
    links: [
      { label: "Web design services", href: "/services/web-design-services/" },
      { label: "Website development services", href: "/services/website-development-services/" },
    ],
  },
  "ai-automation": {
    title: "AI & Automation Guides for Small Businesses",
    heading: "AI & Automation",
    description:
      "Practical guides to AI chatbots, agents, WhatsApp automation and workflow tools: what they do well, where they go wrong, and how to start small.",
    intro: [
      "AI is most useful in a business when it takes repetitive work off people: answering the same questions, sorting enquiries, drafting replies, moving data between tools.",
      "These guides explain what to automate first, how to keep answers reliable and data private, and when a person should stay in the loop.",
    ],
    links: [
      { label: "AI automation services", href: "/services/ai-automation-development-services/" },
      { label: "API integration services", href: "/services/api-integration-services/" },
    ],
  },
  "wordpress-woocommerce": {
    title: "WordPress & WooCommerce Guides: Speed, Security & Fixes",
    heading: "WordPress & WooCommerce",
    description:
      "Fix slow, hacked or broken WordPress and WooCommerce sites: speed, plugins, updates, checkout problems and when to go headless.",
    intro: [
      "WordPress runs a huge share of business websites, and most of its problems come from what's been added over the years: plugins, page builders, skipped updates and cheap hosting.",
      "These guides walk through the fixes in the order that makes the biggest difference, from the team that maintains WordPress and WooCommerce sites every month.",
    ],
    links: [
      { label: "Website maintenance", href: "/services/website-maintenance-services/" },
      { label: "E-commerce development", href: "/services/ecommerce-web-development-services/" },
    ],
  },
  "ux-conversion": {
    title: "UX & Conversion Guides: Turn Visitors Into Customers",
    heading: "UX & Conversion",
    description:
      "How design affects enquiries and sales: hero sections, navigation, trust signals, calls to action, mobile-first design and accessibility.",
    intro: [
      "Good UX rarely brings more visitors. It turns more of the visitors you already have into enquiries and sales, which is why it often pays back faster than more advertising.",
      "These guides cover the parts of a page that decide whether people act, with fixes you can test one at a time.",
    ],
    links: [
      { label: "Web design services", href: "/services/web-design-services/" },
      { label: "Free SEO checker", href: "/free-seo-checker/" },
    ],
  },
  "custom-software": {
    title: "Custom Software & SaaS Guides for Founders",
    heading: "Custom Software",
    description:
      "When to build custom software, how to scope a SaaS MVP, choosing a tech stack, multi-tenancy, scaling and writing requirements developers can quote on.",
    intro: [
      "Custom software pays off when your process is genuinely different or your tools cost more in workarounds than a build would. It goes wrong when the first version tries to do everything.",
      "These guides help founders and operators scope, plan and build software that gets used, with the trade-offs explained in plain English.",
    ],
    links: [
      { label: "Software development services", href: "/services/software-development-services/" },
      { label: "Next.js development", href: "/services/nextjs-development-services/" },
    ],
  },
  "website-maintenance": {
    title: "Website Maintenance Guides: Security, Speed & Uptime",
    heading: "Website Maintenance",
    description:
      "Keep a business website secure, fast and online: security checklists, backups, SSL, hosting, email deliverability and what to do when things break.",
    intro: [
      "A website left alone doesn't stay the same. Software falls behind, certificates lapse, forms stop sending and speed slowly degrades, until something breaks in front of customers.",
      "These guides cover the habits that prevent that, and the steps to follow when something has already gone wrong.",
    ],
    links: [
      { label: "Website maintenance services", href: "/services/website-maintenance-services/" },
      { label: "Cloud solutions", href: "/services/cloud-solutions/" },
    ],
  },
  "hiring-a-developer": {
    title: "Hiring a Web Developer: Guides for Buyers",
    heading: "Hiring a Developer",
    description:
      "How to hire a web developer or agency safely: briefs, questions to ask, contracts, pricing models, ownership and running remote projects.",
    intro: [
      "Most bad experiences with developers start with a vague brief, an unchecked assumption and an agreement that didn't say who owns what.",
      "These guides are the checklists we'd want our own clients to use on us, whether you hire a freelancer, an agency or a team abroad.",
    ],
    links: [
      { label: "Get a written quote", href: "/contact/" },
      { label: "Working with international clients", href: "/offshore-web-development-company-india/" },
    ],
  },
  "mobile-apps": {
    title: "Mobile App Guides: Planning, Building & Launching",
    heading: "Mobile Apps",
    description:
      "Whether you need an app, how to choose React Native, Flutter or native, PWAs, app store approval, onboarding and what drives app cost.",
    intro: [
      "Many businesses are better served by a fast mobile website than an app. When an app is the right call, its success is decided by scope, onboarding and the first week of use.",
      "These guides help you decide, choose an approach and get through app store review without surprises.",
    ],
    links: [
      { label: "App development services", href: "/services/android-app-development-services/" },
      { label: "Software development services", href: "/services/software-development-services/" },
    ],
  },
}

/** Below this, an archive is a list of one or two cards whatever its intro says. */
export const CATEGORY_INDEX_MIN_POSTS = 2

export function isCategoryIndexable(posts: BlogPost[], slug: string): boolean {
  const count = posts.filter((post) => post.category && categorySlug(post.category) === slug).length
  return Boolean(categoryCopy[slug]) && count >= CATEGORY_INDEX_MIN_POSTS
}

/** Category label with post counts, ordered by count, for the browse chips on /blog. */
export function categoryCounts(posts: BlogPost[]): { label: string; slug: string; count: number }[] {
  const counts = new Map<string, { label: string; slug: string; count: number }>()
  for (const post of posts) {
    if (!post.category) continue
    const slug = categorySlug(post.category)
    const existing = counts.get(slug)
    if (existing) existing.count += 1
    else counts.set(slug, { label: post.category, slug, count: 1 })
  }
  return [...counts.values()].sort((a, b) => b.count - a.count)
}
