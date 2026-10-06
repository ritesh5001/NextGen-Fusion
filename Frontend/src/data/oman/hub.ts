import type { CityHub } from "@/data/city-pages/types"

/** Copy for /oman/. Problems here link to the main /services/ pages. */
export const omHub: CityHub = {
  metaTitle: "Website Design & Development Company in Oman",
  metaDescription:
    "Website design, ecommerce, SEO, digital marketing and app development for businesses in Muscat, Salalah, Sohar, Nizwa and across Oman, built in Arabic and English.",
  h1: "Website design, ecommerce, SEO and apps for businesses across Oman",
  heroPresence: "Served remotely from Lucknow and Mumbai, India",
  heroHours: "08:30–17:30 Oman time, Monday to Saturday",
  intro: [
    "NextGen Fusion is a web development and digital marketing company that builds websites, online stores, mobile apps and business software for companies in Oman, and runs their SEO, Google Ads and social media. We start from what is stopping your business from growing, not from a package.",
    "We are a small team in Lucknow and Mumbai, India, and we have no office in Oman. We say that up front because it shapes how we work: in writing, on WhatsApp and on video calls, with everything set up in your company's name.",
  ],
  sections: [
    {
      heading: "How we work with businesses in Oman",
      body: [
        "Oman is 90 minutes behind India, so our working day runs from 08:30 to 17:30 in Muscat, Monday to Saturday. That covers your whole Monday-to-Thursday working day. We are closed on Sunday, which is a working day in Oman, so messages sent then are answered first thing on Monday.",
        "Every project begins with a written brief: what the business sells, who buys it and what is not working. We reply with what we think is holding you back, what we would do first and a fixed price. If you don't need us, we say so.",
        "The domain, hosting, payment gateway, Google Business Profile, analytics and ad accounts are all opened in your company's name. We work inside them; we never hold them.",
      ],
    },
    {
      heading: "Arabic and English, done properly",
      body: [
        "Most Omani customers search and buy in both languages. We build Arabic as a real second language with right-to-left layouts, mirrored navigation and Arabic typefaces, not a translation plugin bolted onto an English site.",
        "The Arabic copy should be written or checked by a native writer, from your team or one you hire. We will not machine-translate your pages and call it an Arabic website.",
      ],
    },
  ],
  essentialsHeading: "What a website in Oman has to get right",
  essentials: [
    {
      heading: "Three decimal places",
      body: "The Omani rial is divided into 1,000 baisa, so prices are written with three decimals: OMR 4.500, not OMR 4.50. Many store themes and invoice templates assume two. We check prices, cart totals, VAT lines and invoices all round to the baisa.",
    },
    {
      heading: "VAT at 5%",
      body: "Oman has charged VAT at 5% since April 2021. Registered businesses need tax invoices that show their VAT number, and shoppers should see the price they will actually pay before checkout, not a surprise at the last step.",
    },
    {
      heading: "Payments that work in Oman",
      body: "Card payments in Oman run through OmanNet debit cards and bank-hosted gateways, or providers such as Thawani and Tap. Shopify Payments and Stripe are not available to Omani businesses, so the gateway has to be chosen before the platform, not after. Cash on delivery is still expected by many shoppers.",
    },
    {
      heading: "Personal data needs consent",
      body: "Oman's Personal Data Protection Law (Royal Decree 6/2022) has applied since February 2023. Contact forms, WhatsApp opt-ins, analytics and email lists should collect consent and be backed by a privacy policy that describes what really happens to the data.",
    },
    {
      heading: "A Sunday-to-Thursday week",
      body: "Oman's weekend is Friday and Saturday, and Ramadan shifts both working hours and shopping late into the night. Campaign schedules, delivery promises and auto-replies should follow the Omani calendar, not a European one.",
    },
    {
      heading: "Your .om domain is yours",
      body: "A .om or .com.om domain is registered through registrars accredited by Oman's Telecommunications Regulatory Authority, usually against your commercial registration. It should be in your company's name, never an agency's.",
    },
  ],
  regionalHeading: "Across Oman's governorates",
  regionalIntro:
    "Businesses outside the big cities often have the most to gain online, because a clear site and a complete Google Business Profile can make them the first name in their wilayat. We work with businesses in these towns and anywhere else in Oman:",
  regionalCentres: [
    { state: "Muscat", places: ["Muttrah", "Bawshar", "Al Amerat", "Quriyat"] },
    { state: "North Al Batinah", places: ["Saham", "Shinas", "Liwa", "Al Khaburah", "Al Suwaiq"] },
    { state: "South Al Batinah", places: ["Rustaq", "Nakhal", "Al Musanaah", "Wadi Al Maawil"] },
    { state: "Ad Dakhiliyah", places: ["Bahla", "Al Hamra", "Izki", "Samail", "Adam"] },
    { state: "North and South Al Sharqiyah", places: ["Ibra", "Al Mudaybi", "Bidiyah", "Jalan Bani Bu Ali", "Al Kamil Wal Wafi"] },
    { state: "Dhofar", places: ["Taqah", "Mirbat", "Thumrait", "Rakhyut"] },
    { state: "Ad Dhahirah and Al Buraimi", places: ["Yanqul", "Dhank", "Mahdah"] },
    { state: "Musandam and Al Wusta", places: ["Khasab", "Dibba", "Haima", "Mahout"] },
  ],
  problems: [
    {
      serviceSlug: "website-development-services",
      serviceLabel: "Website development",
      symptom: "Our website looks fine but nobody contacts us through it",
      cause: "It talks about the company instead of the buyer's problem, the WhatsApp and phone links are buried on a phone screen, and the Arabic version is missing or half-finished.",
      steps: [
        "Find the pages people land on and leave",
        "Rebuild each around one clear action, with WhatsApp one tap away",
        "Finish the Arabic version so both audiences get the same site",
      ],
    },
    {
      serviceSlug: "seo-services",
      serviceLabel: "SEO",
      symptom: "Competitors appear on Google Maps and we're nowhere",
      cause: "An incomplete Google Business Profile, a name and number that differ between listings, few recent reviews, and no pages written in the Arabic words customers actually type.",
      steps: [
        "Complete the profile: categories, services, hours and real photos",
        "Make your name, address and phone identical everywhere",
        "Ask for reviews every week and answer them in the reviewer's language",
      ],
    },
    {
      serviceSlug: "ecommerce-web-development-services",
      serviceLabel: "Ecommerce development",
      symptom: "Customers message us to order instead of buying on the site",
      cause: "Checkout asks for too much, card payment fails for OmanNet debit cards, there is no cash on delivery and the delivery cost appears only at the end.",
      steps: [
        "Connect a gateway that accepts OmanNet cards, and offer cash on delivery",
        "Show the delivery charge by wilayat on the product page",
        "Cut checkout to the fields you really need",
      ],
    },
    {
      serviceSlug: "social-media-marketing-services",
      serviceLabel: "Social media marketing",
      symptom: "We post every day on Instagram and sales don't move",
      cause: "Posts aren't planned around what people buy, nobody replies to DMs quickly, and Snapchat and TikTok, where many younger Omanis spend their time, are ignored.",
      steps: [
        "Plan content around the products and seasons that sell",
        "Reply to every DM and comment the same day",
        "Test Snapchat and TikTok with a small budget before scaling",
      ],
    },
    {
      serviceSlug: "ai-automation-development-services",
      serviceLabel: "AI automation",
      symptom: "Our staff spend all day answering the same WhatsApp questions",
      cause: "Prices, locations, timings and order status are typed out by hand, one chat at a time, in two languages.",
      steps: [
        "Answer the common questions instantly in Arabic and English",
        "Hand anything unusual to a person with the history attached",
        "Log every enquiry so none is forgotten",
      ],
    },
    {
      serviceSlug: "website-maintenance-services",
      serviceLabel: "Website maintenance",
      symptom: "Our developer stopped replying and we can't edit our own site",
      cause: "The domain, hosting and logins were registered in the developer's name, and nobody has updated or backed up the site since.",
      steps: [
        "Recover the domain and hosting with your commercial registration",
        "Move every account into the company's name and change passwords",
        "Back up, update and monitor the site from then on",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you have an office in Oman?",
      answer: "No. NextGen Fusion's two offices are in Lucknow and Mumbai, India. We work with businesses in Oman over WhatsApp, video calls and email, from 08:30 to 17:30 Oman time, Monday to Saturday.",
    },
    {
      question: "Which cities in Oman do you work with?",
      answer: "Anywhere in Oman. We have pages for Muscat, Seeb, Salalah, Sohar, Nizwa, Sur, Barka, Ibri, Buraimi and Duqm, and we work just as readily with businesses in smaller wilayats.",
    },
    {
      question: "How much does a website cost in Oman?",
      answer: "It depends on what the site has to do, so we do not publish a price list. After a short written brief you get a fixed quote in writing, usually within one working day, and scoping is free.",
    },
    {
      question: "Can you build a website in Arabic and English?",
      answer: "Yes, with proper right-to-left layouts and Arabic as a full second language. The Arabic copy should be written or checked by a native writer; we will not machine-translate it.",
    },
    {
      question: "Which payment gateways work for an online store in Oman?",
      answer: "Common choices are bank-hosted gateways that accept OmanNet debit cards, and providers such as Thawani and Tap. Shopify Payments and Stripe are not available to Omani businesses, so we choose the gateway with you before choosing the platform.",
    },
    {
      question: "Who owns the website and accounts?",
      answer: "Your company does, from day one. The domain, hosting, code, analytics, payment gateway and ad accounts are all registered to you, and we work inside them.",
    },
  ],
}
