import type { CityHub } from "@/data/city-pages/types"

/** Copy for /thailand/. Problems here link to the main /services/ pages. */
export const thHub: CityHub = {
  metaTitle: "Web Design & Development Company for Thailand",
  metaDescription:
    "Web design, ecommerce, SEO, LINE and apps for businesses in Bangkok, Phuket, Chiang Mai, Pattaya and across Thailand, from a remote team in India.",
  h1: "Web design, ecommerce, SEO and apps for businesses across Thailand",
  heroPresence: "Served remotely from Lucknow and Mumbai, India",
  heroHours: "11:30–20:30 Thailand time, Monday to Saturday",
  intro: [
    "NextGen Fusion is a web development and digital marketing team that builds websites, online stores, apps and business software for companies in Thailand, and runs their SEO, Google Ads and social media. We start from what is holding your business back, not from a package.",
    "We work remotely from Lucknow and Mumbai, India, and have no office in Thailand. That suits the businesses we work with best: hotels, resorts and tour operators selling to international guests, exporters and brands selling beyond Shopee and Lazada, and international companies with a Thai office that need one team for the whole web.",
  ],
  sections: [
    {
      heading: "How we work with businesses in Thailand",
      body: [
        "Thailand is 90 minutes ahead of India, so our working day runs from 11:30 to 20:30 in Bangkok, Monday to Saturday. That covers your afternoon and evening, when owners usually have time to talk, and messages sent in your morning are answered by lunchtime.",
        "Every project starts with a written brief: what the business sells, who buys from it and what is not working. We reply with what we would do first and one fixed price. The domain, hosting, LINE Official Account, payment gateway, analytics and ad accounts are all opened in your company's name, and we work inside them.",
      ],
    },
    {
      heading: "Thai and English, built properly",
      body: [
        "Thai is written without spaces between words, so a site that was built for English breaks Thai lines in the wrong places and looks careless. We use Thai typefaces made for screens and set up line breaking that respects Thai words, so the Thai version reads as well as the English one.",
        "The Thai copy itself should come from a native writer, from your team or one you hire. We will not machine-translate your pages and call it a Thai website. For tourism businesses we add the languages your guests actually use, often Chinese, Russian or German, with the same rule.",
      ],
    },
  ],
  essentialsHeading: "What a website in Thailand has to get right",
  essentials: [
    {
      heading: "PromptPay and Thai payment gateways",
      body: "Thai shoppers pay by PromptPay QR and mobile banking as readily as by card. Stores need a gateway that supports both, such as Opn Payments (formerly Omise), 2C2P or GB Prime Pay, and many still offer cash on delivery. We choose the gateway with you before the platform, because it decides what the checkout can do.",
    },
    {
      heading: "LINE is where customers talk",
      body: "Most Thai customers would rather message a business on LINE than fill in a form. A LINE Official Account linked from every page, with rich menus and automatic replies for common questions, usually brings in more enquiries than the contact form ever will.",
    },
    {
      heading: "The PDPA applies to your website",
      body: "Thailand's Personal Data Protection Act (B.E. 2562) has been fully in force since June 2022. Contact forms, LINE opt-ins, cookies and analytics need consent and a privacy notice that describes what really happens to the data.",
    },
    {
      heading: "Your own store and the marketplaces",
      body: "Shopee, Lazada and TikTok Shop bring buyers but take fees and own the relationship. Your own store keeps repeat customers and margin. Most brands need both, with stock kept in sync so nothing is sold twice.",
    },
    {
      heading: "Dates, invoices and VAT",
      body: "Thai documents often use the Buddhist Era year, 543 years ahead of the Gregorian one, and VAT-registered businesses must issue proper tax invoices. Forms, receipts and invoices should handle both calendars and show VAT the way your accountant needs.",
    },
    {
      heading: "A .co.th domain in your company's name",
      body: "A .co.th domain is registered through THNIC's registrars against your Thai company documents. It should belong to your company, never to an agency or a staff member.",
    },
  ],
  regionalHeading: "Across Thailand",
  regionalIntro:
    "Businesses outside the big cities often have the most to gain online, because a clear site, a LINE account and a complete Google Business Profile can make them the first name in their province. We work with businesses in these places and anywhere else in Thailand:",
  regionalCentres: [
    { state: "Bangkok and the Central Plains", places: ["Nonthaburi", "Samut Prakan", "Pathum Thani", "Ayutthaya", "Nakhon Pathom"] },
    { state: "The Eastern Seaboard", places: ["Si Racha", "Rayong", "Chanthaburi", "Koh Chang"] },
    { state: "The North", places: ["Chiang Rai", "Pai", "Lampang", "Phitsanulok"] },
    { state: "Isan (the Northeast)", places: ["Nakhon Ratchasima", "Ubon Ratchathani", "Nong Khai", "Buriram"] },
    { state: "The West", places: ["Kanchanaburi", "Ratchaburi"] },
    { state: "The Gulf coast and islands", places: ["Surat Thani", "Koh Phangan", "Koh Tao", "Chumphon"] },
    { state: "The Andaman coast", places: ["Khao Lak", "Phang Nga", "Koh Lanta", "Trang"] },
  ],
  problems: [
    {
      serviceSlug: "website-development-services",
      serviceLabel: "Website development",
      symptom: "Guests book us through Agoda and Booking.com, never through our own site",
      cause: "Our website can't take a booking, shows no prices and has no LINE or WhatsApp link.",
      steps: [
        "Add live availability and direct booking",
        "Accept PromptPay, cards and international wallets",
        "Give guests a reason to book direct",
      ],
    },
    {
      serviceSlug: "ecommerce-web-development-services",
      serviceLabel: "Ecommerce development",
      symptom: "All our sales come through Shopee and Lazada, and the fees keep rising",
      cause: "We have no store of our own, so every repeat customer goes back through the marketplace.",
      steps: [
        "Launch a store with PromptPay and cash on delivery",
        "Keep stock in sync with the marketplaces",
        "Bring repeat buyers to your own store through LINE",
      ],
    },
    {
      serviceSlug: "seo-services",
      serviceLabel: "SEO",
      symptom: "Foreign visitors can't find us, and Thai customers find our competitors",
      cause: "The site exists in one language only and our Google Business Profile is half-finished.",
      steps: [
        "Write pages in the languages your customers search in",
        "Complete the Google profile in Thai and English",
        "Collect reviews from both kinds of customer",
      ],
    },
    {
      serviceSlug: "social-media-marketing-services",
      serviceLabel: "Social media marketing",
      symptom: "Our Facebook page is busy but sales don't move",
      cause: "Posts aren't tied to offers, and replies on Messenger and LINE take hours.",
      steps: [
        "Plan content around what sells each season",
        "Reply to every message within the hour",
        "Test TikTok with a small budget",
      ],
    },
    {
      serviceSlug: "ai-automation-development-services",
      serviceLabel: "AI automation",
      symptom: "We answer the same LINE questions all day in three languages",
      cause: "Prices, opening hours, directions and booking questions are typed out by hand.",
      steps: [
        "Answer common questions automatically on LINE",
        "Pass bookings and complaints to a person",
        "Keep every conversation in one inbox",
      ],
    },
    {
      serviceSlug: "website-maintenance-services",
      serviceLabel: "Website maintenance",
      symptom: "The agency that built our site stopped answering",
      cause: "The domain and hosting were registered in their name, and the site hasn't been updated since.",
      steps: [
        "Recover the domain with your company documents",
        "Move every account into your company's name",
        "Update, secure and back up the site every month",
      ],
    },
  ],
  faqs: [
    {
      question: "Do you have an office in Thailand?",
      answer: "No. We are a remote team in Lucknow and Mumbai, India, and work with Thai businesses over LINE, WhatsApp, email and video calls, from 11:30 to 20:30 Thailand time, Monday to Saturday.",
    },
    {
      question: "Which cities in Thailand do you work with?",
      answer: "Anywhere in Thailand. We have pages for Bangkok, Phuket, Chiang Mai, Pattaya, Hua Hin, Koh Samui, Krabi, Khon Kaen, Hat Yai and Udon Thani, and work just as readily with businesses in smaller provinces.",
    },
    {
      question: "How much does a website cost in Thailand?",
      answer: "It depends on what the site has to do, so we do not publish a price list. After a short written brief you get one fixed quote in writing, usually within one working day, and scoping is free.",
    },
    {
      question: "Can you build a website in Thai and English?",
      answer: "Yes, with Thai typefaces and line breaking set up properly, and other languages your customers use. The Thai copy should come from a native writer; we will not machine-translate it.",
    },
    {
      question: "Can you connect our LINE Official Account to the website?",
      answer: "Yes. We link LINE from every page, and can connect it to bookings, orders and automatic replies so enquiries don't get lost.",
    },
    {
      question: "Which payment gateways work for an online store in Thailand?",
      answer: "Common choices are Opn Payments (formerly Omise), 2C2P and GB Prime Pay, all of which support PromptPay QR and cards. We choose one with you before choosing the store platform.",
    },
  ],
}
