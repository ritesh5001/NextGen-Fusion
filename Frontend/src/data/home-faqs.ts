/**
 * Homepage FAQ.
 *
 * Lifted out of the client component so the homepage can emit FAQPage schema
 * server-side: the questions were already visible on the page, they just had no
 * markup behind them, which is the whole cost of missing a rich result.
 *
 * Keep the answers here in step with the opening hours in `offices.ts` and the
 * Organization schema in `app/layout.tsx` — they are the same claim in three places.
 */
export type HomeFaq = { question: string; answer: string }

export const homeFaqs: HomeFaq[] = [
  {
    question: "What industries do you serve?",
    answer: "We work across various industries including technology, healthcare, finance, e-commerce, and more.",
  },
  {
    question: "Can you work with startups or small businesses?",
    answer: "We work with businesses of all sizes, from startups to established enterprises.",
  },
  {
    question: "How do I get started with NextGen Fusion?",
    answer:
      "Simply reach out through our contact form or schedule a consultation call to discuss your project needs.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Most marketing and ecommerce sites land between roughly $800 and $2,500 depending on pages, features, and design level, while larger custom or SaaS builds scale beyond that. Use our project estimator above for a tailored range in your currency — every quote is fixed and transparent, with no hidden costs.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most websites are delivered in 2-3 weeks. Larger ecommerce, custom, or SaaS builds take longer, and we lock an exact timeline with you on the discovery call before any work starts.",
  },
  {
    question: "What if I'm not satisfied with the results?",
    answer:
      "Every project includes review rounds at agreed milestones, so you sign off as we go and there are no surprises at launch. We keep iterating until the result matches the scope and your business goals.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes. We don't ghost you after launch. We offer monthly maintenance and growth packages covering updates, monitoring, fixes, and improvements.",
  },
  {
    question: "What are the working hours of NextGen Fusion?",
    answer:
      "Our offices are open Monday to Saturday, 10 AM to 7 PM IST. We're flexible and regularly accommodate clients across different time zones.",
  },
]
