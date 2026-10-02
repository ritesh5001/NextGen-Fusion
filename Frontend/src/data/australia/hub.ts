import type { CityHub } from "@/data/city-pages/types"

/** Copy for /australia/. Problems here link to the main /services/ pages. */
export const auHub: CityHub = {
  metaTitle: "Website Development, SEO & Digital Marketing for Australian Businesses",
  metaDescription:
    "Websites, online stores, SEO, Google Ads and automation for businesses in Sydney, Melbourne, Brisbane, Perth, Adelaide and across Australia, served remotely from India.",
  h1: "Helping Australian businesses grow online",
  heroPresence: "Served remotely from Lucknow and Mumbai, India",
  heroHours: "Australian afternoons and evenings, Monday to Saturday",
  intro: [
    "NextGen Fusion builds websites, online stores and software, and runs SEO, Google Ads and social media, for businesses across Australia. We start with the problem that is holding your business back, not with a package to sell.",
    "We are a small team working from Lucknow and Mumbai, India. We have no Australian office, and we would rather tell you that here. The person who scopes your project builds it and answers your messages after launch.",
  ],
  sections: [
    {
      heading: "How we work with Australian businesses",
      body: [
        "Everything starts in writing. Tell us what the business does, who buys from it and what is not working. We reply with what we think is holding growth back, what we would fix first, and a fixed price. If you don't need us, we say so.",
        "Our working day falls in the Australian afternoon and evening: it starts at 12:30 in Perth, 14:00 in Adelaide and Darwin, and 14:30 on the east coast (an hour later where daylight saving applies). Messages sent in your morning are answered the same afternoon, and calls are booked in your afternoon.",
        "Every account, including the domain, hosting, analytics, ad accounts and payment gateway, is set up in your business's name. We work inside your accounts and never hold them.",
      ],
    },
  ],
  essentialsHeading: "What an Australian website has to get right",
  regionalHeading: "Regional Australia",
  regionalIntro:
    "Regional businesses often have the most to gain online, because a well-built site and Google Business Profile can make them the obvious choice in their town. We work with businesses in these centres and anywhere else in Australia:",
  regionalCentres: [
    { state: "New South Wales", places: ["Central Coast", "Albury", "Wagga Wagga", "Coffs Harbour", "Port Macquarie", "Orange", "Dubbo"] },
    { state: "Victoria", places: ["Geelong", "Ballarat", "Bendigo", "Shepparton", "Mildura"] },
    { state: "Queensland", places: ["Townsville", "Cairns", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg"] },
    { state: "Western Australia", places: ["Bunbury", "Geraldton", "Kalgoorlie", "Karratha", "Port Hedland"] },
    { state: "South Australia", places: ["Mount Gambier", "Whyalla", "Port Lincoln"] },
    { state: "Tasmania", places: ["Launceston", "Devonport", "Burnie"] },
    { state: "Northern Territory", places: ["Alice Springs", "Katherine"] },
  ],
  essentials: [
    {
      heading: "Prices include GST",
      body: "Prices shown to consumers must include GST. A GST-exclusive headline price on a consumer site can mislead under Australian Consumer Law. Stores also need tax invoices that show your ABN.",
    },
    {
      heading: ".com.au domains need your ABN",
      body: "A .au domain requires an Australian presence, usually an ABN, so it should be registered by your business. That is how we would want it anyway: your domain should never sit in an agency's account.",
    },
    {
      heading: "Privacy is not optional for everyone",
      body: "Businesses with annual turnover above $3 million, and all health service providers, are covered by the Privacy Act. Forms, analytics and email tools need a privacy policy that describes what really happens to the data.",
    },
    {
      heading: "Marketing emails need consent",
      body: "The Spam Act requires consent, clear sender details and a working unsubscribe in every marketing email. We build sign-up forms and email flows that keep a record of consent.",
    },
    {
      heading: "No \"no refunds\"",
      body: "Under Australian Consumer Law, customers keep their rights to a repair, replacement or refund for major faults. Store policies that say otherwise mislead customers and can get a business into trouble with the ACCC.",
    },
    {
      heading: "Accessible by default",
      body: "The Disability Discrimination Act applies to websites. We design and build to WCAG 2.2 AA, which also tends to make a site clearer and faster for everyone.",
    },
  ],
  problems: [
    {
      serviceSlug: "website-development-services",
      serviceLabel: "Website development",
      symptom: "Our website gets visitors but no enquiries",
      cause: "The site describes the business instead of the visitor's problem, contact details are hard to find on a phone, and there is no proof near the call to action.",
      steps: [
        "Find the pages that get traffic but no enquiries",
        "Rewrite them around one clear action each",
        "Put reviews, licences and real photos beside that action",
      ],
    },
    {
      serviceSlug: "seo-services",
      serviceLabel: "SEO",
      symptom: "We don't show up on Google Maps in our own area",
      cause: "A thin or miscategorised Google Business Profile, business details that differ across the web, and too few recent reviews.",
      steps: [
        "Fix the Google Business Profile categories, services and photos",
        "Make your name, address and phone consistent everywhere",
        "Ask every happy customer for a review, every week",
      ],
    },
    {
      serviceSlug: "ppc-services",
      serviceLabel: "Google Ads",
      symptom: "Google Ads costs a lot and the leads are poor",
      cause: "Default settings that spend the budget broadly, no negative keywords and conversion tracking that counts the wrong actions.",
      steps: [
        "Block irrelevant searches you've been paying for",
        "Target only people actually in the areas you serve",
        "Count real calls and enquiries as conversions",
      ],
    },
    {
      serviceSlug: "ecommerce-web-development-services",
      serviceLabel: "Ecommerce development",
      symptom: "Interstate freight is eating our online margin",
      cause: "One flat shipping rate for the whole country undercharges orders to WA, the NT and Tasmania.",
      steps: [
        "Compare what you charge with what each zone costs you",
        "Set rates by zone or postcode, with a free-shipping threshold",
        "Connect your courier so labels and tracking are automatic",
      ],
    },
    {
      serviceSlug: "ai-automation-development-services",
      serviceLabel: "AI automation",
      symptom: "Admin takes more of our week than customers do",
      cause: "The same details are typed into email, quotes, the CRM and accounting, and follow-ups depend on memory.",
      steps: [
        "Time the repetitive tasks for a week",
        "Automate the most frequent one, with a person reviewing",
        "Connect the systems so data is entered once",
      ],
    },
    {
      serviceSlug: "website-maintenance-services",
      serviceLabel: "Website maintenance",
      symptom: "Our developer disappeared and we can't change our own site",
      cause: "The domain, hosting and logins were set up in the developer's name.",
      steps: [
        "Recover the domain and hosting using your business details",
        "Change every password and move accounts into your name",
        "Back up, update and monitor the site from then on",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you have an office in Australia?",
      answer: "No. Our offices are in Lucknow and Mumbai, India. We work with Australian businesses over video calls, WhatsApp and email, during your afternoon and evening.",
    },
    {
      question: "Which Australian cities do you work with?",
      answer: "Anywhere in Australia. We have pages for the capitals and larger cities, and we work just as readily with businesses in regional towns.",
    },
    {
      question: "How do you price Australian projects?",
      answer: "We do not publish prices, because they depend on the work. You get a fixed written quote, usually within one working day, with no charge for scoping.",
    },
    {
      question: "Who owns the website and accounts?",
      answer: "You do, from day one. The domain, hosting, code repository, analytics and ad accounts are in your business's name, and we work inside them.",
    },
  ],
}
