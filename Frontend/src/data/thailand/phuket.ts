import type { ThCity } from "./types"

export const phuket: ThCity = {
  slug: "phuket",
  name: "Phuket",
  state: "Phuket Province",
  stateCode: "Phuket",
  summary: "Thailand's busiest island economy, selling to guests from dozens of countries in a season that peaks from November to April.",
  areas: ["Patong", "Kata", "Karon", "Rawai", "Chalong", "Kamala", "Bang Tao", "Laguna", "Cherngtalay", "Surin", "Phuket Town", "Mai Khao", "Ao Po"],
  nearby: ["krabi", "koh-samui", "hat-yai"],
  page: {
    metaTitle: "Website Design in Phuket — Web, SEO & Booking Systems",
    metaDescription:
      "Websites, direct booking, SEO and marketing for Phuket businesses selling to international guests in English, Russian, Chinese and Thai.",
    h1: "Helping Phuket businesses win guests from every country, not just the booking sites",
    intro: [
      "Phuket's economy runs on visitors: hotels and villas, dive centres, yacht charters, Muay Thai camps, restaurants, tours and property sales, serving guests from Europe, Russia, China, India, Australia and the Middle East. Most of them plan and book on their phones, often weeks before they land.",
      "That makes the website the shop window, and too many Phuket businesses hand that window to OTAs and booking platforms that take a commission on every guest. We help them take bookings directly, in the languages their guests use. We work remotely from India, with no Phuket office.",
    ],
    sections: [
      {
        heading: "Planning around the Andaman season",
        body: [
          "The Andaman coast is busiest from November to April and quieter in the rainy months from May to October. The businesses that do best are ready before high season: prices updated, pages refreshed, ads scheduled, and a plan for filling the green season with offers and long-stay guests.",
          "Guests also arrive in different languages at different times of year. A site that speaks to Russian, Chinese and European visitors, not just English and Thai, catches bookings competitors miss.",
        ],
      },
      {
        heading: "Our hours in Phuket",
        body: [
          "Phuket keeps Bangkok time, so we work 11:30 to 20:30, Monday to Saturday. We plan high-season launches early so nothing waits on a Sunday.",
        ],
      },
    ],
    industries: [
      { name: "Hotels, resorts and villas", need: "Direct bookings without giving most of the margin to OTAs." },
      { name: "Dive centres, yacht charters and tours", need: "To be found and booked by guests planning their trip." },
      { name: "Property developers and agents", need: "Credible, multilingual sites for foreign buyers." },
      { name: "Restaurants, beach clubs and gyms", need: "Visibility with guests who decide where to go on the day." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Divers book our trips through agents who take a big cut",
        cause: "Our site can't take a booking or show trip availability.",
        steps: [
          "Show trips, courses and dates online",
          "Take deposits directly",
          "Collect certification details before arrival",
        ],
      },
      {
        service: "marketplace-development",
        symptom: "Yacht owners have boats idle while charter guests can't find one",
        cause: "Charters are booked through scattered agents and chats.",
        steps: [
          "List boats with availability and rates",
          "Let guests book and pay a deposit",
          "Handle crew, fuel and extras clearly",
        ],
      },
      {
        service: "nextjs-development",
        symptom: "Foreign buyers leave our project site in seconds",
        cause: "It's slow, English-only and hides floor plans in PDFs.",
        steps: [
          "Rebuild it fast, with plans on every page",
          "Add Russian and Chinese versions",
          "Route enquiries by language",
        ],
      },
      {
        service: "google-ads",
        symptom: "Our rental cars sit idle in green season",
        cause: "The same ads run in January and in August.",
        steps: [
          "Raise budgets for high season",
          "Promote long-term rentals in low season",
          "Pause categories that are fully booked",
        ],
      },
      {
        service: "software-development",
        symptom: "Villa owners abroad ask what happened to their rental income",
        cause: "Bookings, costs and payouts are in spreadsheets.",
        steps: [
          "Record bookings and costs per villa",
          "Send owners monthly statements",
          "Track maintenance with photos",
        ],
      },
      {
        service: "api-integration",
        symptom: "The same tour seat sold twice on Klook and our site",
        cause: "Availability is updated by hand on each platform.",
        steps: [
          "Connect booking platforms to one calendar",
          "Close slots everywhere when full",
          "Send confirmations automatically",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Phuket?",
        answer: "No. We are a remote team in Lucknow and Mumbai, India, and work with Phuket businesses over LINE, WhatsApp, email and video calls. Photos and video are taken by your team or a Phuket photographer we brief.",
      },
      {
        question: "When should we prepare for high season?",
        answer: "By September at the latest. A new site, booking system or SEO work needs time to be ready and found before guests plan their winter trips.",
      },
      {
        question: "Can you build in Russian and Chinese?",
        answer: "Yes. We set up each language properly; the translations should come from native speakers, not machine translation.",
      },
      {
        question: "Do you work elsewhere on the Andaman coast?",
        answer: "Yes, including Khao Lak, Phang Nga, Krabi and the islands.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Phuket for Dive Centres & Liveaboards",
      metaDescription:
        "Website development for Phuket dive centres and liveaboards: trips and courses online, direct deposits and divers' certification details before arrival.",
      h1: "Websites for Phuket dive centres and liveaboards that take bookings directly",
      card: "Booking sites for dive centres and liveaboards.",
      intro: [
        "Phuket is a base for day trips, courses and liveaboard cruises to some of the best diving in the region, with the Similan season the highlight of the year. Divers plan ahead and compare operators carefully: boats, cabins, guides, safety and reviews.",
        "We build sites for dive centres and liveaboards that show trips, courses and real availability, take deposits directly and collect certification levels, medical forms and equipment sizes before guests arrive.",
      ],
      sections: [
        {
          heading: "Trips and courses with real availability",
          body: [
            "Each trip shows dates, dive sites, cabins left and what's included. Courses show prerequisites and schedules. Guests book and pay a deposit online.",
          ],
        },
        {
          heading: "Paperwork before arrival",
          body: [
            "Certification details, medical questionnaires and equipment sizes are collected at booking, so departure mornings run smoothly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Guests arrive without the right certification",
          cause: "Requirements weren't clear at booking.",
          steps: [
            "Show requirements on every trip",
            "Ask for certification at booking",
            "Remind guests before departure",
          ],
        },
        {
          symptom: "Liveaboard cabins go unsold close to departure",
          cause: "Availability isn't visible online.",
          steps: [
            "Show cabins left on each trip",
            "Offer last-minute deals",
            "Notify past guests by email",
          ],
        },
      ],
      checklist: [
        "Trips and courses show live availability",
        "Deposits are taken online",
        "Certification and medical forms are collected early",
        "Pages work in the languages your divers use",
      ],
      faqs: [
        {
          question: "Can you connect our existing booking system?",
          answer: "Often, yes. We check what your system supports during scoping.",
        },
        {
          question: "Can guests pay from abroad?",
          answer: "Yes, by international card through a Thai gateway, with PromptPay for local guests.",
        },
      ],
    },
    "web-design": {
      metaTitle: "Web Design Company in Phuket for Tourism & Hospitality",
      metaDescription:
        "Website design in Phuket for hotels, tours and restaurants: multilingual design in English, Russian, Chinese and Thai that turns visitors into bookings.",
      h1: "Web design for Phuket's tourism and hospitality businesses",
      card: "Multilingual design for hotels, tours and restaurants.",
      intro: [
        "Visitors choose a Phuket hotel, tour or restaurant in seconds on a phone, often in their own language. A design that looks dated, loads slowly on hotel Wi-Fi or only speaks English loses them to the next listing.",
        "We design websites for Phuket's hospitality and tourism businesses that look as good as the place itself, load fast, and speak English, Thai, Russian and Chinese where your guests need it.",
      ],
      sections: [
        {
          heading: "Your place, not stock photos",
          body: [
            "Real photos of rooms, boats, beaches and food, with clear prices and what's included, do more than slogans. We plan the shots and the pages around what guests ask.",
          ],
        },
        {
          heading: "Every language designed properly",
          body: [
            "Russian, Chinese and Thai each need typefaces and layouts that read naturally. We design every language version, not just translate the English one.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors leave our site within seconds",
          cause: "It's slow on mobile and full of heavy images.",
          steps: [
            "Rebuild with optimised images",
            "Put prices and booking up front",
            "Test on mobile data",
          ],
        },
        {
          symptom: "Russian and Chinese guests don't enquire",
          cause: "The site is in English only.",
          steps: [
            "Add the languages your guests use",
            "Use native-speaker translations",
            "Add a messaging option they use",
          ],
        },
      ],
      checklist: [
        "Real photos and clear prices",
        "Fast on mobile data",
        "Every language designed properly",
        "Booking or enquiry is one tap away",
      ],
      faqs: [
        {
          question: "Do you provide photography?",
          answer: "We plan the shot list and edit; photography is done by your team or a Phuket photographer.",
        },
        {
          question: "Can you redesign without losing our Google rankings?",
          answer: "Yes. We keep or redirect URLs and protect existing rankings.",
        },
      ],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce in Phuket for Swimwear & Beachwear Brands",
      metaDescription:
        "Online stores for Phuket swimwear and beachwear brands: sell to visitors after they fly home, ship internationally and take PromptPay locally.",
      h1: "Online stores for Phuket swimwear and beachwear brands",
      card: "Stores that keep visitors buying after they fly home.",
      intro: [
        "Phuket's swimwear and beachwear labels sell to visitors in boutiques and beach markets, and many of those visitors would buy again from home. Without an online store, the sale ends at the airport.",
        "We build stores that ship internationally, show prices in visitors' currencies, take PromptPay and cards, and invite every buyer to follow the brand.",
      ],
      sections: [
        {
          heading: "Selling after the holiday",
          body: [
            "Swing tags and receipts carry the store link and a discount for the next order, so a holiday purchase turns into a customer.",
          ],
        },
        {
          heading: "Sizing for every body",
          body: [
            "Swimwear returns are costly overseas. Detailed measurements and fit notes reduce them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors ask if they can order from home",
          cause: "We have no online store.",
          steps: [
            "Open a store that ships worldwide",
            "Add the link to tags and receipts",
            "Offer a returning-customer discount",
          ],
        },
        {
          symptom: "International orders get returned for size",
          cause: "Size information is vague.",
          steps: [
            "Add measurements to every product",
            "Write fit notes",
            "Set clear returns rules",
          ],
        },
      ],
      checklist: [
        "International shipping is set up",
        "Prices show in visitors' currencies",
        "Every product has measurements",
        "The store link is on every tag",
      ],
      faqs: [
        {
          question: "Can we ship from Phuket internationally?",
          answer: "Yes, through Thailand Post or international couriers. We set rates by country.",
        },
        {
          question: "Shopify or WooCommerce?",
          answer: "Shopify for most fashion brands that want an easy setup; WooCommerce if you need more control. We recommend one after scoping.",
        },
      ],
      caseStudies: ["vashtaraheaven"],
    },
    "shopify-development": {
      metaTitle: "Shopify for Phuket Muay Thai Camps — Gear & Merch Stores",
      metaDescription:
        "Shopify stores for Phuket Muay Thai camps: sell shorts, gloves and branded gear to fighters worldwide, and take bookings for training camps.",
      h1: "Shopify stores for Phuket Muay Thai camps selling gear worldwide",
      card: "Gear and merch stores for Muay Thai camps.",
      intro: [
        "Phuket's Muay Thai camps train fighters and fitness travellers from around the world, many of whom want the camp's shorts, gloves and shirts long after they leave.",
        "We build Shopify stores for camps that sell branded gear internationally, take pre-orders for limited runs and link to training packages, so the camp earns all year, not just when guests are on the island.",
      ],
      sections: [
        {
          heading: "Merch that travels",
          body: [
            "International shipping, sizes for every body and pre-orders for limited designs.",
          ],
        },
        {
          heading: "Training packages alongside",
          body: [
            "Weekly and monthly training packages can be sold or reserved from the same store, with accommodation options if you offer them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Former students ask how to buy our shorts",
          cause: "Gear is only sold at the camp.",
          steps: [
            "Open an online store",
            "Ship internationally",
            "Announce drops to past students",
          ],
        },
        {
          symptom: "Limited runs sell out before overseas fans can buy",
          cause: "Stock goes to walk-in customers first.",
          steps: [
            "Take pre-orders online",
            "Set limits per customer",
            "Plan production from orders",
          ],
        },
      ],
      checklist: [
        "Gear ships internationally",
        "Pre-orders run for limited drops",
        "Training packages are bookable",
        "Payments work for Thai and foreign customers",
      ],
      faqs: [
        {
          question: "Can Shopify handle training bookings?",
          answer: "Yes, with booking apps or simple deposit products. We choose based on how you schedule training.",
        },
        {
          question: "Do we need to hold stock?",
          answer: "Not necessarily. Pre-orders and print-on-demand are options for some products.",
        },
      ],
      caseStudies: ["terrestrialyt"],
    },
    "marketplace-development": {
      metaTitle: "Yacht Charter Marketplace Development in Phuket",
      metaDescription:
        "Build a Phuket yacht charter marketplace: owners list boats with rates and availability, guests compare and book with deposits, crew and extras included.",
      h1: "A yacht charter marketplace for Phuket's boats and guests",
      card: "Marketplaces for yacht and boat charters.",
      intro: [
        "Phuket is one of Asia's main yachting hubs, with boats based at marinas across the island. Guests looking for a day charter or a week in the Phang Nga Bay islands still book through scattered agents and long message threads.",
        "We build charter marketplaces where owners and operators list boats with photos, capacity, crew and rates, and guests compare, check availability and book with a deposit.",
      ],
      sections: [
        {
          heading: "Clear about what's included",
          body: [
            "Crew, fuel, food, marina fees and national park fees are shown upfront, so guests compare like for like.",
          ],
        },
        {
          heading: "Deposits and cancellations",
          body: [
            "Deposits secure dates, weather cancellations follow clear rules and owners are paid on schedule.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Guests compare charters that aren't comparable",
          cause: "What's included differs and isn't shown.",
          steps: [
            "Standardise what each listing shows",
            "Show all fees upfront",
            "Collect reviews after charters",
          ],
        },
        {
          symptom: "Weather cancellations cause disputes",
          cause: "Rules aren't agreed in advance.",
          steps: [
            "Publish cancellation rules",
            "Offer rescheduling options",
            "Record decisions on the platform",
          ],
        },
      ],
      checklist: [
        "Boats are listed with crew and capacity",
        "All fees are shown upfront",
        "Deposits secure bookings",
        "Weather rules are clear",
      ],
      faqs: [
        {
          question: "Do operators need licences?",
          answer: "Commercial charters are regulated; the platform can require licence details before listing.",
        },
        {
          question: "How does the marketplace earn?",
          answer: "Usually a commission per booking or owner subscriptions.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Phuket for Property Developers",
      metaDescription:
        "Fast multilingual Next.js sites for Phuket condo and villa developers selling to foreign buyers: units, floor plans, progress and enquiries by language.",
      h1: "Next.js sites for Phuket developers selling condos and villas to foreign buyers",
      card: "Fast multilingual project sites for property developers.",
      intro: [
        "Phuket's condo and villa projects sell largely to buyers abroad, from Russia, China, Europe and the Middle East. They judge a project from its website, often on a phone, in their own language.",
        "We build project sites in Next.js that load fast anywhere, show units, floor plans, prices and construction progress in each buyer's language, and route enquiries to the right sales person.",
      ],
      sections: [
        {
          heading: "Fast for buyers abroad",
          body: [
            "Pages are pre-built and served from servers near the visitor, so a buyer in Moscow or Dubai sees the site as fast as one in Phuket.",
          ],
        },
        {
          heading: "Honest about ownership",
          body: [
            "Foreign buyers ask how ownership works for condos and villas. Clear, lawyer-checked explanations build trust; we never publish legal claims you haven't approved.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers ask for floor plans we've already made",
          cause: "Plans are buried in PDFs.",
          steps: [
            "Give each unit type its own page",
            "Show plans and sizes",
            "Keep brochures as downloads",
          ],
        },
        {
          symptom: "Enquiries in Russian go unanswered",
          cause: "They reach the wrong person.",
          steps: [
            "Route enquiries by language",
            "Notify the right sales person",
            "Track response times",
          ],
        },
      ],
      checklist: [
        "Every unit type gets a dedicated page",
        "The site loads fast abroad",
        "Buyers' languages are covered",
        "Enquiries are routed by language",
      ],
      faqs: [
        {
          question: "Can you show live availability?",
          answer: "Yes, if your sales team can update it or your system can share it.",
        },
        {
          question: "Do you write the legal explanations?",
          answer: "No. Your lawyer should write or approve them; we present them clearly.",
        },
      ],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Phuket for Transfer & Tour Transport",
      metaDescription:
        "Android dispatch apps for Phuket airport transfer and tour transport operators: pickups, drivers, flight changes and live status.",
      h1: "Android apps for Phuket transfer and tour transport operators",
      card: "Driver dispatch apps for transfers and tour pickups.",
      intro: [
        "Every day, Phuket's transfer and tour transport companies move thousands of guests between the airport, hotels and piers. Pickups are planned in spreadsheets and LINE groups, flights change and drivers wait at the wrong hotel.",
        "We build Android apps for drivers and dispatchers: jobs with pickup details, flight times, passenger counts and live status, so the office and guests always know where the vehicle is.",
      ],
      sections: [
        {
          heading: "Pickups without confusion",
          body: [
            "Drivers see each job's hotel, room, passengers and luggage, with navigation and a button to message the guest.",
          ],
        },
        {
          heading: "Flight changes handled",
          body: [
            "Arrival times update in the dispatcher's view, and drivers are reassigned when flights move.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Drivers wait at the wrong hotel",
          cause: "Details are passed by voice message.",
          steps: [
            "Send full job details in the app",
            "Confirm pickups with guests",
            "Track driver arrival",
          ],
        },
        {
          symptom: "Late flights leave guests stranded",
          cause: "Dispatchers miss flight changes.",
          steps: [
            "Track flight times",
            "Alert dispatchers to changes",
            "Reassign drivers quickly",
          ],
        },
      ],
      checklist: [
        "Drivers receive jobs in the app",
        "Flight times are tracked",
        "Guests can be messaged directly",
        "The office sees live status",
      ],
      faqs: [
        {
          question: "Can guests track their driver?",
          answer: "Yes, with a tracking link sent by message.",
        },
        {
          question: "Does it work offline?",
          answer: "Job details stay on the phone and sync when signal returns.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO in Phuket for Activity Providers & Cooking Schools",
      metaDescription:
        "SEO for Phuket activity providers and cooking schools: rank for 'things to do in Phuket' searches in English, Russian and Chinese.",
      h1: "SEO for Phuket activity providers and cooking schools",
      card: "Rank for 'things to do in Phuket' searches.",
      intro: [
        "Visitors search for things to do in Phuket long before they arrive and again on rainy afternoons: cooking classes, elephant-free nature tours, kayaking, ziplines, island trips. Big booking platforms dominate those searches.",
        "We help activity providers and cooking schools rank alongside them, with pages for each experience in visitors' languages, complete Google profiles and steady reviews.",
      ],
      sections: [
        {
          heading: "A page per experience",
          body: [
            "Each class or activity gets a page with duration, what's included, pickup areas and photos, written for the questions visitors ask.",
          ],
        },
        {
          heading: "Rainy-day searches",
          body: [
            "Pages for indoor and wet-weather activities catch visitors searching on the day, especially in green season.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors book our class through platforms that take a cut",
          cause: "Our own site doesn't rank.",
          steps: [
            "Create pages for each class",
            "Complete the Google profile",
            "Collect reviews after each class",
          ],
        },
        {
          symptom: "We're invisible to Russian visitors",
          cause: "Our site is English only.",
          steps: [
            "Add Russian pages",
            "Use native translations",
            "Promote them in season",
          ],
        },
      ],
      checklist: [
        "Each activity has its own page",
        "Pages cover visitors' languages",
        "Google profile is complete",
        "Reviews arrive every week",
      ],
      faqs: [
        {
          question: "Can we rank against big platforms?",
          answer: "For specific experiences and local searches, yes, especially with a strong Google profile and reviews.",
        },
        {
          question: "How long does SEO take?",
          answer: "Profile improvements in weeks; new pages in a few months, so start before high season.",
        },
      ],
    },
    "google-ads": {
      metaTitle: "Google Ads in Phuket for Car & Scooter Rentals",
      metaDescription:
        "Google Ads for Phuket car and scooter rental companies: seasonal budgets, airport-arrival targeting and long-term rentals in green season.",
      h1: "Google Ads for Phuket car and scooter rentals",
      card: "Seasonal ads for car and scooter rental companies.",
      intro: [
        "Phuket rental companies are fully booked in high season and quiet in the rains, yet many run the same ads all year and pay for clicks they can't serve.",
        "We run Google Ads that follow the season: more spend before and during high season, airport-arrival targeting, and long-term rental offers for green-season and long-stay visitors.",
      ],
      sections: [
        {
          heading: "Budgets that follow demand",
          body: [
            "Spend rises before high season and pauses for categories that are fully booked.",
          ],
        },
        {
          heading: "Clear about licences and insurance",
          body: [
            "Ads and pages explain licence requirements and insurance, which builds trust and filters out unsuitable renters.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We pay for clicks when every car is out",
          cause: "Ads don't follow availability.",
          steps: [
            "Pause full categories",
            "Use waiting lists for peak dates",
            "Shift budget to open dates",
          ],
        },
        {
          symptom: "Green season revenue is too low",
          cause: "We don't promote long rentals.",
          steps: [
            "Advertise monthly rentals",
            "Target long-stay visitors",
            "Track bookings by campaign",
          ],
        },
      ],
      checklist: [
        "Budgets follow the season",
        "Full categories pause automatically",
        "Licence and insurance are explained",
        "Bookings are tracked to ads",
      ],
      faqs: [
        {
          question: "Should ads run in Russian?",
          answer: "If many of your renters are Russian-speaking, yes, alongside English.",
        },
        {
          question: "What about scooters specifically?",
          answer: "Scooter ads need clear licence and helmet information; we keep them accurate.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Phuket for Beach Clubs & Venues",
      metaDescription:
        "Instagram and TikTok for Phuket beach clubs and venues: reach visitors on the island this week and fill sunset sessions and events.",
      h1: "Social media for Phuket beach clubs and venues",
      card: "Instagram and TikTok that fill beach clubs and events.",
      intro: [
        "Visitors decide where to spend the afternoon and evening on their phones, often that same day. Beach clubs and venues compete on Instagram and TikTok for those decisions.",
        "We plan content and location-targeted campaigns that reach visitors already on the island, promote events and sunset sessions, and turn followers into reservations.",
      ],
      sections: [
        {
          heading: "Reach visitors on the island",
          body: [
            "Location-targeted ads and stories reach people in Phuket this week, with event details and booking links.",
          ],
        },
        {
          heading: "Reservations, not just likes",
          body: [
            "Every post leads to a booking link or chat, and we track which content fills beds and tables.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our followers aren't in Phuket",
          cause: "Content reaches a global audience that isn't visiting.",
          steps: [
            "Target visitors currently on the island",
            "Promote this week's events",
            "Measure reservations",
          ],
        },
        {
          symptom: "Low-season weekdays are empty",
          cause: "Promotions don't target them.",
          steps: [
            "Create low-season offers",
            "Target residents and long-stay visitors",
            "Track redemptions",
          ],
        },
      ],
      checklist: [
        "Ads target visitors on the island",
        "Events are promoted in advance",
        "Posts lead to reservations",
        "Low-season offers exist",
      ],
      faqs: [
        {
          question: "Do you work with influencers?",
          answer: "Yes, after checking that their audience actually visits Phuket.",
        },
        {
          question: "Which platforms matter most?",
          answer: "Instagram and TikTok for visitors, plus LINE and Facebook for Thai and resident audiences.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Phuket for Real Estate Agencies",
      metaDescription:
        "AI automation for Phuket real estate agencies: answer rental and sale enquiries in English, Russian and Chinese and pass serious buyers to agents.",
      h1: "AI automation for Phuket real estate agencies answering buyers worldwide",
      card: "Multilingual enquiry handling for real estate agencies.",
      intro: [
        "Phuket agencies receive enquiries around the clock from buyers and renters in many countries, about villas, condos and long-term rentals. Agents spend hours on the same questions and miss serious buyers.",
        "We build AI assistants that answer from your current listings in the enquirer's language, qualify budget and timing, and pass serious buyers to agents with the conversation translated.",
      ],
      sections: [
        {
          heading: "Answers from your listings",
          body: [
            "The assistant uses your live listings only, so it never promises properties you don't have.",
          ],
        },
        {
          heading: "Serious buyers to agents",
          body: [
            "Budget, timing and preferences are collected, and qualified enquiries go to the right agent immediately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Overseas enquiries wait until morning",
          cause: "Agents work Thai hours.",
          steps: [
            "Reply instantly in any time zone",
            "Qualify enquiries automatically",
            "Hand over to agents in the morning",
          ],
        },
        {
          symptom: "Agents spend hours on basic questions",
          cause: "Every enquiry is handled manually.",
          steps: [
            "Answer common questions automatically",
            "Send listings and photos",
            "Pass qualified buyers to agents",
          ],
        },
      ],
      checklist: [
        "Enquiries are answered instantly",
        "Replies come in the buyer's language",
        "Buyers are qualified",
        "Agents receive translated conversations",
      ],
      faqs: [
        {
          question: "Will it discuss ownership rules?",
          answer: "Only from text your lawyer approves. Legal questions go to your team.",
        },
        {
          question: "Can it work on WhatsApp and LINE?",
          answer: "Yes, and on your website chat and email.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Villa Management Software in Phuket — Custom Development",
      metaDescription:
        "Custom software for Phuket villa management companies: bookings, housekeeping, maintenance and monthly owner statements for owners abroad.",
      h1: "Custom software for Phuket villa managers reporting to owners abroad",
      card: "Owner statements, housekeeping and maintenance for villa managers.",
      intro: [
        "Many Phuket villas belong to owners overseas who rent them out through a management company. Owners want to see bookings, costs and income clearly, and managers juggle housekeeping, maintenance and payouts in spreadsheets.",
        "We build villa management software that records bookings and costs per villa, schedules housekeeping and maintenance with photos, and sends owners clear monthly statements.",
      ],
      sections: [
        {
          heading: "Statements owners trust",
          body: [
            "Each villa's income, commissions and expenses are recorded as they happen and summarised in a monthly statement with receipts attached.",
          ],
        },
        {
          heading: "Operations on the ground",
          body: [
            "Housekeepers and technicians receive jobs on their phones and record completion with photos.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Owners question expenses on their statements",
          cause: "Costs aren't backed by receipts.",
          steps: [
            "Attach receipts to every expense",
            "Show bookings and income clearly",
            "Send statements automatically",
          ],
        },
        {
          symptom: "Maintenance jobs are forgotten",
          cause: "They're tracked in chats.",
          steps: [
            "Log every job in the system",
            "Assign technicians",
            "Record completion with photos",
          ],
        },
      ],
      checklist: [
        "Bookings and costs are recorded per villa",
        "Owners receive monthly statements",
        "Housekeeping and maintenance are scheduled",
        "Work is recorded with photos",
      ],
      faqs: [
        {
          question: "Can it connect to Airbnb and booking channels?",
          answer: "Through a channel manager or the platforms' official integrations, where available.",
        },
        {
          question: "Can owners log in?",
          answer: "Yes, to see their villa's bookings and statements.",
        },
      ],
    },
    "api-integration": {
      metaTitle: "API Integration in Phuket — Klook, Viator & GetYourGuide Sync",
      metaDescription:
        "API integration for Phuket tour operators: connect Klook, Viator, GetYourGuide and your own site to one availability calendar and booking list.",
      h1: "Connecting Klook, Viator, GetYourGuide and your own site for Phuket tour operators",
      card: "One availability calendar across tour booking platforms.",
      intro: [
        "Phuket tour operators sell through Klook, Viator, GetYourGuide, hotel tour desks and their own sites. Availability is updated by hand, trips are overbooked and confirmations are sent one by one.",
        "We connect those channels to one availability calendar and booking list, using the platforms' official connections or approved booking systems, so seats close everywhere when a trip fills.",
      ],
      sections: [
        {
          heading: "One calendar",
          body: [
            "Every channel reads availability from the same calendar, and every booking updates it.",
          ],
        },
        {
          heading: "Pickups and manifests",
          body: [
            "Bookings from all channels feed one pickup list and passenger manifest for each departure.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Trips are overbooked in high season",
          cause: "Channels update separately.",
          steps: [
            "Connect channels to one calendar",
            "Close slots automatically",
            "Alert staff to overbookings",
          ],
        },
        {
          symptom: "Pickup lists are built by hand every evening",
          cause: "Bookings come from many places.",
          steps: [
            "Collect bookings in one list",
            "Generate pickup lists automatically",
            "Send them to drivers",
          ],
        },
      ],
      checklist: [
        "Availability syncs across channels",
        "Bookings arrive in one list",
        "Pickup lists are generated automatically",
        "Confirmations are sent automatically",
      ],
      faqs: [
        {
          question: "Do all platforms allow integration?",
          answer: "Through official connections or approved booking systems; we check what your accounts allow.",
        },
        {
          question: "Do we need a booking system?",
          answer: "Usually, yes; it becomes the single calendar the channels connect to.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Phuket for Clinics Treating Visitors",
      metaDescription:
        "Secure cloud setup for Phuket clinics treating international visitors: patient records, insurance documents and PDPA-aware access control.",
      h1: "Cloud for Phuket clinics handling international patients' records",
      card: "Secure patient records and insurance documents for clinics.",
      intro: [
        "Phuket's clinics and dental practices treat visitors from many countries, handling passports, insurance claims and medical records daily, often on office PCs and chat apps.",
        "We set up secure cloud storage and workflows for patient documents, with access limited by role, two-factor login, backups and retention rules suited to health data under the PDPA.",
      ],
      sections: [
        {
          heading: "Sensitive data handled carefully",
          body: [
            "Health data is sensitive personal data under the PDPA. Records are stored in restricted folders, access is logged and nothing is shared over chat.",
          ],
        },
        {
          heading: "Insurance paperwork in one place",
          body: [
            "Claim forms, invoices and reports are stored with each patient's file, ready to send to insurers securely.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Patient documents are sent over chat apps",
          cause: "There's no secure way to share files.",
          steps: [
            "Use secure upload and share links",
            "Store files in restricted folders",
            "Stop sending records on chat",
          ],
        },
        {
          symptom: "Insurance claims are delayed by missing documents",
          cause: "Files are spread across computers.",
          steps: [
            "Keep claim documents with each patient",
            "Use checklists per insurer",
            "Track claims to payment",
          ],
        },
      ],
      checklist: [
        "Patient files are in restricted folders",
        "Access requires two-factor login",
        "Backups are automatic",
        "Retention rules are applied",
      ],
      faqs: [
        {
          question: "Do we need new clinic software?",
          answer: "Not necessarily. Secure cloud storage often works alongside your existing system.",
        },
        {
          question: "Who is responsible under the PDPA?",
          answer: "Your clinic, as the data controller. We help you put safeguards in place; your legal adviser confirms obligations.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Phuket for Restaurants",
      metaDescription:
        "Website maintenance for Phuket restaurants: menus, prices and seasonal hours kept current in every language, with booking links that work.",
      h1: "Website maintenance for Phuket restaurants with seasons, menus and many languages",
      card: "Menus, prices and seasonal hours kept current.",
      intro: [
        "Phuket restaurants change menus, prices and opening hours with the seasons, and many publish in several languages. Websites fall behind, and visitors turn up to find a different menu or a closed door.",
        "We maintain restaurant websites so menus, prices and hours are current in every language, reservation links work and the site stays fast and secure.",
      ],
      sections: [
        {
          heading: "Seasonal updates on time",
          body: [
            "Before high season and before the rains, we update menus, hours and offers in every language.",
          ],
        },
        {
          heading: "Links that work",
          body: [
            "Reservation, LINE and WhatsApp links are tested monthly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors arrive when we're closed",
          cause: "Seasonal hours weren't updated.",
          steps: [
            "Update hours every season",
            "Sync them with Google",
            "Show holiday closures",
          ],
        },
        {
          symptom: "Russian menu prices are a year old",
          cause: "Only the English menu was updated.",
          steps: [
            "Update every language together",
            "Show a last-updated date",
            "Review monthly",
          ],
        },
      ],
      checklist: [
        "Menus are current in every language",
        "Seasonal hours are updated",
        "Booking links are tested",
        "The site is updated and secure",
      ],
      faqs: [
        {
          question: "Will you keep our Google listing in step with the site?",
          answer: "Yes, hours and menus can be kept consistent there as well.",
        },
        {
          question: "Do you translate menus?",
          answer: "We publish them; translations should come from native speakers.",
        },
      ],
    },
  },
}
