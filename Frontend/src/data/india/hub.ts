import { OFFICE_HOURS } from "@/data/offices"
import type { CityHub } from "@/data/city-pages/types"

/** Copy for /india/. Problems here link to the main /services/ pages. */
export const inHub: CityHub = {
  metaTitle: "Website Development & SEO Company in India",
  metaDescription:
    "Websites, online stores, SEO, Google Ads, apps and automation for businesses in Delhi, Mumbai, Bengaluru, Hyderabad, Pune and 15 more Indian cities.",
  h1: "Helping Indian businesses grow online, city by city",
  heroPresence: "Offices in Lucknow and Mumbai",
  heroHours: OFFICE_HOURS.label,
  intro: [
    "NextGen Fusion builds websites, online stores, apps and software, and runs SEO, Google Ads and social media, for businesses across India. We start with whatever is holding your business back, whether that's enquiries, orders, admin or visibility, not with a package to sell.",
    "Our offices are in Lucknow and Mumbai. Businesses in those two cities can meet us by appointment; everywhere else we work over WhatsApp, video calls and email, which is how most of our projects run anyway. The person who scopes your work is the person who builds it.",
  ],
  sections: [
    {
      heading: "How we work with businesses across India",
      body: [
        "Send us a short message about what the business does and what isn't working. We reply with a written diagnosis: what we'd fix first, why, what it would cost and how long it would take. If you don't need us, we'll say so.",
        "Prices are fixed in writing before work starts. Terms are 50% to start and 50% at the agreed milestone. Your domain, hosting, payment gateway, Google accounts and code are registered in your business's name from the first day.",
      ],
      links: [
        { label: "What a website costs in India", href: "/website-development-cost-in-india/" },
        { label: "Get a written quote", href: "/contact/" },
      ],
    },
  ],
  essentialsHeading: "What an Indian website or store has to get right",
  essentials: [
    {
      heading: "Built for the phone in your customer's hand",
      body: "Most Indians browse on mid-range Android phones over mobile data. Pages have to load fast on a 4G connection, work with one thumb and never hide the WhatsApp or call button.",
    },
    {
      heading: "UPI first, COD handled",
      body: "Checkout needs UPI, cards, wallets and net banking through a gateway like Razorpay, PayU or Cashfree. Where COD is offered, address checks and order confirmation cut the RTO losses that eat margins.",
    },
    {
      heading: "Ecommerce rules are specific",
      body: "Product pages need MRP, country of origin, seller details and a clear return policy, and stores need a grievance officer's details under the Consumer Protection (E-Commerce) Rules. We build these in, not bolt them on.",
    },
    {
      heading: "Personal data has a law now",
      body: "The Digital Personal Data Protection Act applies to the names, numbers and addresses your forms and stores collect. Consent, a clear notice and a way to request deletion are part of how we build forms.",
    },
    {
      heading: "GST on every invoice",
      body: "Stores and booking systems need GST-compliant invoices with HSN or SAC codes, and businesses over the e-invoicing threshold need IRN-ready data. We connect sites to Tally, Zoho Books or your accounting tool.",
    },
    {
      heading: "In the language your customers search in",
      body: "Many customers search in Hindi, Tamil, Telugu, Marathi, Bengali or Gujarati. A proper language version, not a translate widget, reaches buyers your competitors ignore.",
    },
  ],
  regionalHeading: "Other cities and towns",
  regionalIntro:
    "Tier-2 and tier-3 businesses often have the most to gain online, because one good website and Google Business Profile can make them the first name in their town. We work with businesses in these cities and anywhere else in India:",
  regionalCentres: [
    { state: "Uttar Pradesh", places: ["Ghaziabad", "Agra", "Prayagraj", "Meerut", "Gorakhpur", "Bareilly", "Aligarh", "Jhansi"] },
    { state: "Bihar & Jharkhand", places: ["Patna", "Ranchi", "Jamshedpur", "Gaya", "Dhanbad"] },
    { state: "Madhya Pradesh & Chhattisgarh", places: ["Bhopal", "Jabalpur", "Gwalior", "Raipur"] },
    { state: "Punjab, Haryana & the hills", places: ["Ludhiana", "Amritsar", "Jalandhar", "Dehradun", "Shimla", "Faridabad"] },
    { state: "Gujarat & Rajasthan", places: ["Vadodara", "Rajkot", "Udaipur", "Jodhpur", "Kota"] },
    { state: "Maharashtra & Goa", places: ["Nashik", "Aurangabad", "Kolhapur", "Goa"] },
    { state: "South India", places: ["Mysuru", "Mangaluru", "Visakhapatnam", "Vijayawada", "Madurai", "Thiruvananthapuram"] },
    { state: "East & North-East", places: ["Bhubaneswar", "Guwahati", "Siliguri"] },
  ],
  problems: [
    {
      serviceSlug: "website-development-services",
      serviceLabel: "Website development",
      symptom: "People visit our website but never call or WhatsApp",
      cause: "The site talks about the company instead of the customer's problem, the WhatsApp button is missing or buried, and nothing on the page proves you are real.",
      steps: [
        "Put a WhatsApp and call button on every screen",
        "Rewrite key pages around what customers ask before buying",
        "Add real photos, reviews and your GST and address details",
      ],
    },
    {
      serviceSlug: "seo-services",
      serviceLabel: "SEO",
      symptom: "Competitors show up on Google Maps in our area and we don't",
      cause: "An incomplete Google Business Profile, wrong categories, few recent reviews and a different address or phone number on JustDial, IndiaMART and your site.",
      steps: [
        "Complete and correct your Google Business Profile",
        "Make your name, address and number identical everywhere",
        "Ask every happy customer for a Google review",
      ],
    },
    {
      serviceSlug: "ecommerce-web-development-services",
      serviceLabel: "Ecommerce development",
      symptom: "COD orders keep coming back and killing our margin",
      cause: "Orders go out without confirming the buyer or the address, to pin codes with high return rates.",
      steps: [
        "Confirm COD orders on WhatsApp before dispatch",
        "Offer a small prepaid discount to shift buyers to UPI",
        "Restrict COD on pin codes with a bad RTO history",
      ],
    },
    {
      serviceSlug: "ppc-services",
      serviceLabel: "Google Ads",
      symptom: "We spent on Google Ads and got calls from the wrong people",
      cause: "Broad keywords matched job seekers, students and people looking for free things, and ads ran across all of India.",
      steps: [
        "Block searches like 'jobs', 'free', 'course' and 'PDF'",
        "Target only the cities and pin codes you serve",
        "Track real calls and WhatsApp chats as conversions",
      ],
    },
    {
      serviceSlug: "ai-automation-development-services",
      serviceLabel: "AI automation",
      symptom: "Our team spends the whole day replying to the same WhatsApp questions",
      cause: "Price, availability, address and order-status questions are answered by hand, one chat at a time.",
      steps: [
        "Answer common questions instantly on WhatsApp",
        "Send order and delivery updates automatically",
        "Pass serious buyers to your team with a summary",
      ],
    },
    {
      serviceSlug: "website-maintenance-services",
      serviceLabel: "Website maintenance",
      symptom: "Our developer stopped responding and we can't even log in",
      cause: "The domain, hosting and admin logins were created in the developer's name.",
      steps: [
        "Recover the domain and hosting with your business documents",
        "Move every account into your company's name",
        "Back up, update and monitor the site from then on",
      ],
    },
  ],
  faqs: [
    {
      question: "Where are your offices?",
      answer: "In Lucknow (Kamta) and Mumbai (Mahim). Clients in those cities can meet us by appointment. For every other city we work over WhatsApp, video calls and email.",
    },
    {
      question: "Do you work with small businesses?",
      answer: "Yes. Many of our clients are owner-run businesses. We scope work to what you need now and tell you plainly if a smaller step makes more sense.",
    },
    {
      question: "How do you price projects?",
      answer: "We don't publish prices, because they depend on the work. You get a fixed written quote, usually within one working day, with no charge for scoping.",
    },
    {
      question: "Can you build in Hindi or other Indian languages?",
      answer: "Yes. We build proper language versions with their own URLs, so they can rank in Google for searches in that language.",
    },
  ],
}
