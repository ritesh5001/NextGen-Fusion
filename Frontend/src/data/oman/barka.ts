import type { OmCity } from "./types"

export const barka: OmCity = {
  slug: "barka",
  name: "Barka",
  state: "South Al Batinah Governorate",
  stateCode: "South Al Batinah",
  summary: "Muscat's farm and weekend belt: fish market, farms, food producers and fast-growing new neighbourhoods.",
  areas: ["Barka Souq", "Barka Fish Market", "Al Sawadi", "Al Nahda", "Rumais", "Nakhal", "Wadi Al Maawil", "Al Musanaah", "Al Suwaiq"],
  nearby: ["seeb", "muscat", "sohar"],
  page: {
    metaTitle: "Websites & Marketing in Barka for Farms, Food & Local Services",
    metaDescription:
      "Websites, online ordering and marketing for Barka businesses: farms, seafood, food producers and services selling to Muscat and new local neighbourhoods.",
    h1: "Helping Barka's farms and food businesses sell straight to Muscat, just down the coast",
    intro: [
      "Barka sits just west of Muscat along the Batinah coast, close enough that its fish market, farms and food producers supply the capital every day. Weekends bring Muscat families to its farm stays, beaches at Al Sawadi and resorts at Al Nahda, and new neighbourhoods keep filling with families moving out of the city.",
      "Many Barka businesses already sell to Muscat, but through middlemen, phone calls and favours. We help them sell directly, take orders reliably and reach the families now living on their doorstep. We work remotely from India, with no Barka office.",
    ],
    sections: [
      {
        heading: "Selling to the capital without a middleman",
        body: [
          "A farm that delivers vegetable boxes to Muscat homes, a seafood supplier taking restaurant orders online or a dairy selling direct keeps the margin a trader would otherwise take. The tools are simple: a clear site, online ordering, delivery planning and payment.",
          "At the same time, Barka's own population is growing, and new residents search for plumbers, schools, bakeries and services just as Muscat residents do.",
        ],
      },
      {
        heading: "Our hours in Barka",
        body: [
          "Our team is online 08:30–17:30 Oman time, Monday through Saturday. Barka's early-morning businesses, like the fish market and farms, can send messages any time and we reply when our day starts.",
        ],
      },
    ],
    industries: [
      { name: "Farms, dairies and food producers", need: "Direct orders from Muscat homes and businesses." },
      { name: "Seafood suppliers", need: "Reliable ordering from restaurants and hotels in the capital." },
      { name: "Farm stays, resorts and weekend activities", need: "Bookings from Muscat families planning their weekend." },
      { name: "Trades and local services", need: "To be found by families moving into new neighbourhoods." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Restaurants order fish by phone at midnight and get it wrong",
        cause: "There's no proper ordering system.",
        steps: [
          "Take restaurant orders online",
          "Confirm availability and price",
          "Plan morning deliveries",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Muscat families want our vegetables but can't order",
        cause: "We sell only at the farm gate and to traders.",
        steps: [
          "Offer weekly produce boxes online",
          "Deliver on set days to Muscat",
          "Take payment at order or on delivery",
        ],
      },
      {
        service: "seo",
        symptom: "New residents call plumbers from Muscat",
        cause: "Local tradesmen don't show on Google Maps.",
        steps: [
          "Create a Google profile",
          "List your services and areas",
          "Ask customers for reviews",
        ],
      },
      {
        service: "web-design",
        symptom: "Our farm stay is empty on weekends while others are full",
        cause: "Our photos and information are poor.",
        steps: [
          "Photograph the property properly",
          "List facilities and capacity",
          "Add direct booking",
        ],
      },
      {
        service: "android-app-development",
        symptom: "We don't know how much milk or eggs the farm produced yesterday",
        cause: "Workers record production on paper, if at all.",
        steps: [
          "Record production daily on a phone",
          "See totals and trends",
          "Spot drops early",
        ],
      },
      {
        service: "api-integration",
        symptom: "Cash on delivery money takes weeks to reconcile",
        cause: "Courier reports and store orders don't match up.",
        steps: [
          "Connect the courier to the store",
          "Match COD payments automatically",
          "Flag missing amounts",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have staff in Barka?",
        answer: "No. We are based in Lucknow and Mumbai, India, and handle Barka projects over WhatsApp, video calls and email. Photos of farms and properties are taken by you or a local photographer.",
      },
      {
        question: "Can you help farms with no website at all?",
        answer: "Yes. Many of our farm clients start with a simple ordering page and grow from there.",
      },
      {
        question: "Do you work in Nakhal, Wadi Al Maawil and Al Musanaah?",
        answer: "Yes, across South Al Batinah and beyond.",
      },
      {
        question: "Can you help us deliver to Muscat?",
        answer: "We set up delivery areas, schedules and charges, and connect couriers if you use them.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Barka for Seafood Wholesalers",
      metaDescription:
        "Websites with online ordering for Barka seafood wholesalers: restaurants and hotels in Muscat order daily, see availability and get morning delivery.",
      h1: "Online ordering for Barka seafood suppliers serving Muscat restaurants",
      card: "Restaurant ordering for seafood wholesalers.",
      intro: [
        "Barka's fish market supplies restaurants, hotels and caterers in Muscat every morning. Orders arrive by phone and WhatsApp late at night, quantities are misheard and prices disputed.",
        "We build ordering sites for seafood suppliers where trade customers log in, see what's expected to be available, order with prices agreed, and receive confirmation and morning delivery.",
      ],
      sections: [
        {
          heading: "Orders in writing",
          body: [
            "Each restaurant orders through its account, with quantities, cuts and delivery times. No more confusion over a voice message at midnight.",
          ],
        },
        {
          heading: "Prices that change daily",
          body: [
            "Fish prices move with the catch. You update prices each day, and customers see them before they order.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Orders are misheard and returned",
          cause: "They come by phone and voice notes.",
          steps: [
            "Take orders in writing online",
            "Confirm each order",
            "Print packing lists",
          ],
        },
        {
          symptom: "Customers dispute prices",
          cause: "Prices are agreed verbally.",
          steps: [
            "Publish daily prices to trade accounts",
            "Show them at order",
            "Invoice from the order",
          ],
        },
      ],
      checklist: [
        "Trade customers order online",
        "Daily prices are shown",
        "Orders are confirmed in writing",
        "Deliveries are planned the night before",
      ],
      faqs: [
        {
          question: "Can customers order on WhatsApp too?",
          answer: "Yes. WhatsApp orders can be entered into the same system so everything is in one place.",
        },
        {
          question: "Can we invoice on credit?",
          answer: "Yes, with credit limits and statements per customer.",
        },
      ],
    },
    "web-design": {
      metaTitle: "Web Design in Barka for Farm Stays & Weekend Rest Houses",
      metaDescription:
        "Web design for Barka farm stays and rest houses: show the pool, majlis and gardens Muscat families look for, with weekend availability and booking.",
      h1: "Web design for Barka farm stays that Muscat families book for the weekend",
      card: "Sites for farm stays and weekend rest houses.",
      intro: [
        "Muscat families escape to farm stays and rest houses around Barka for weekends, birthdays and Eid gatherings. They choose by photos: the pool, the majlis, the garden, the space for children.",
        "We design sites that show all of that properly, explain capacity, privacy and rules, and let families check weekend availability and book.",
      ],
      sections: [
        {
          heading: "Show what families ask about",
          body: [
            "Pool size and privacy, majlis and kitchen, parking, play areas and capacity, shown with real photos and clear lists.",
          ],
        },
        {
          heading: "Weekends at a glance",
          body: [
            "A calendar shows free weekends and holidays. Families can request or book directly, with a deposit.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Families ask the same questions before booking",
          cause: "The listing doesn't answer them.",
          steps: [
            "List facilities and capacity",
            "Show every area in photos",
            "Explain rules and check-in times",
          ],
        },
        {
          symptom: "Weekends are double-booked",
          cause: "Bookings are taken on several phones.",
          steps: [
            "Use one booking calendar",
            "Take deposits",
            "Confirm automatically",
          ],
        },
      ],
      checklist: [
        "Facilities are shown with real photos",
        "Capacity and rules are clear",
        "Weekend availability is visible",
        "Bookings are confirmed with a deposit",
      ],
      faqs: [
        {
          question: "Can we offer separate family and ladies' areas?",
          answer: "Yes. We explain the layout and privacy options clearly.",
        },
        {
          question: "Can we list on platforms too?",
          answer: "Yes. Your own site complements platform listings and saves commission on direct guests.",
        },
      ],
    },
    "ecommerce-development": {
      metaTitle: "Farm Produce Ecommerce in Barka — Boxes Delivered to Muscat",
      metaDescription:
        "Online stores for Barka farms: weekly vegetable, fruit and egg boxes delivered to Muscat homes, with subscriptions and set delivery days.",
      h1: "Online stores for Barka farms delivering produce boxes to Muscat",
      card: "Weekly farm produce boxes for Muscat homes.",
      intro: [
        "Barka's farms grow vegetables, fruit and eggs a short drive from Muscat, yet most of it reaches the capital through traders and supermarkets. Families increasingly want fresh, local produce delivered.",
        "We build online stores with weekly boxes, subscriptions and set delivery days for Muscat areas, so farms sell directly and plan harvests around real orders.",
      ],
      sections: [
        {
          heading: "Boxes and subscriptions",
          body: [
            "Customers choose a box size or build their own, and subscribe weekly. Seasonal items change automatically.",
          ],
        },
        {
          heading: "Delivery days by area",
          body: [
            "Deliveries run on set days for each Muscat area, so drivers make efficient routes.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We harvest too much or too little",
          cause: "We don't know demand in advance.",
          steps: [
            "Take orders before harvest",
            "Plan picking from orders",
            "Offer surplus as extras",
          ],
        },
        {
          symptom: "Deliveries take all day",
          cause: "Routes are random.",
          steps: [
            "Set delivery days by area",
            "Plan routes from orders",
            "Notify customers of arrival times",
          ],
        },
      ],
      checklist: [
        "Weekly boxes and subscriptions are available",
        "Delivery days are set by area",
        "Harvests are planned from orders",
        "Payment works online or on delivery",
      ],
      faqs: [
        {
          question: "Can customers skip a week?",
          answer: "Yes, from their account, before a cut-off.",
        },
        {
          question: "Can we sell to restaurants too?",
          answer: "Yes, with trade pricing for approved accounts.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    "shopify-development": {
      metaTitle: "Shopify in Barka for Plant Nurseries & Garden Centres",
      metaDescription:
        "Shopify stores for Barka plant nurseries and garden centres: sell plants, pots and soil online with delivery and planting services across Muscat.",
      h1: "Shopify for Barka plant nurseries selling to Muscat gardens",
      card: "Plant nursery stores with delivery and planting.",
      intro: [
        "Plant nurseries around Barka supply villas, gardens and landscapers across Muscat. Customers visit, choose plants, and arrange delivery by phone. Many would order online if they could see what's available.",
        "We build Shopify stores where customers browse plants by type, size and sun needs, add pots and soil, and book delivery and planting.",
      ],
      sections: [
        {
          heading: "Plants explained for the climate",
          body: [
            "Each plant shows size, sun and water needs and how it copes with Oman's heat, so customers choose plants that survive.",
          ],
        },
        {
          heading: "Delivery and planting",
          body: [
            "Customers book delivery by area and add planting services, with large orders quoted separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers buy plants that die in summer",
          cause: "They don't get advice.",
          steps: [
            "Add care information to each plant",
            "Recommend plants for each season",
            "Offer care guides",
          ],
        },
        {
          symptom: "Landscapers order by phone and wait for quotes",
          cause: "There's no trade ordering.",
          steps: [
            "Create trade accounts",
            "Show trade prices",
            "Allow bulk orders",
          ],
        },
      ],
      checklist: [
        "Plants show size and care needs",
        "Delivery and planting can be booked",
        "Trade accounts are available",
        "Payments work through a local gateway",
      ],
      faqs: [
        {
          question: "Can we show live stock?",
          answer: "Yes. Stock can be updated manually or from your system.",
        },
        {
          question: "Can customers pay on delivery?",
          answer: "Yes, alongside card payment through a gateway that works in Oman.",
        },
      ],
    },
    "marketplace-development": {
      metaTitle: "Weekend Activities Marketplace in Barka — Riding, Farms, Beach",
      metaDescription:
        "Build a Barka marketplace for weekend activities: horse riding, farm visits and beach trips at Al Sawadi, listed, booked and reviewed by Muscat families.",
      h1: "A marketplace for weekend activities around Barka",
      card: "Marketplaces for weekend riding, farm and beach activities.",
      intro: [
        "Barka and the Batinah coast offer horse riding, farm visits, island trips from Al Sawadi and camping, but each provider has its own Instagram account and phone number. Muscat families looking for weekend plans can't compare them.",
        "We build marketplaces where providers list activities with times, prices and safety details, and families browse, book and review in one place.",
      ],
      sections: [
        {
          heading: "Plans for the weekend",
          body: [
            "Families filter by age, activity and time, see what's available this weekend and book with payment.",
          ],
        },
        {
          heading: "Safe and reviewed",
          body: [
            "Providers list safety measures and licences, and reviews come only from completed bookings.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Families can't find weekend activities",
          cause: "Providers advertise separately.",
          steps: [
            "List providers in one marketplace",
            "Show this weekend's availability",
            "Let families book quickly",
          ],
        },
        {
          symptom: "Providers lose bookings to no-shows",
          cause: "There's no payment upfront.",
          steps: [
            "Take payment at booking",
            "Set cancellation terms",
            "Pay providers promptly",
          ],
        },
      ],
      checklist: [
        "Activities show times, prices and safety",
        "Families book and pay online",
        "Reviews come from real bookings",
        "Providers manage availability",
      ],
      faqs: [
        {
          question: "How would it make money?",
          answer: "Usually a commission per booking. We help you set a level providers accept.",
        },
        {
          question: "Can it expand beyond Barka?",
          answer: "Yes, to other parts of Oman once it works locally.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Barka for Food Factories",
      metaDescription:
        "Next.js product catalogues and distributor portals for Barka food factories: specifications, certifications and online orders for distributors.",
      h1: "Next.js catalogues and distributor portals for Barka food manufacturers",
      card: "Catalogues and distributor ordering for food factories.",
      intro: [
        "Food processing businesses around Barka supply supermarkets, distributors and caterers across Oman. Buyers need product details, certifications and a way to order, and distributors want stock and price lists without calling.",
        "We build fast product catalogues and distributor portals in Next.js where buyers see specifications and certifications, and approved distributors order and download documents.",
      ],
      sections: [
        {
          heading: "Everything buyers check",
          body: [
            "Ingredients, pack sizes, shelf life, certifications and nutritional information on each product page, in Arabic and English.",
          ],
        },
        {
          heading: "Distributors order online",
          body: [
            "Approved distributors see their prices, place orders and download invoices and certificates.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers ask for specs and certificates repeatedly",
          cause: "They're not online.",
          steps: [
            "Publish product specs",
            "Add certificate downloads",
            "Keep them updated",
          ],
        },
        {
          symptom: "Distributor orders arrive by email in different formats",
          cause: "There's no ordering portal.",
          steps: [
            "Create distributor accounts",
            "Take orders online",
            "Send them to production planning",
          ],
        },
      ],
      checklist: [
        "Products show full specifications",
        "Certificates are downloadable",
        "Distributors order online",
        "Orders reach production planning",
      ],
      faqs: [
        {
          question: "Can the portal show stock levels?",
          answer: "Yes, if your system can share them.",
        },
        {
          question: "Can it be multilingual?",
          answer: "Yes, Arabic and English, and more if you export.",
        },
      ],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Barka for Dairy & Poultry Farms",
      metaDescription:
        "Android apps for Barka dairy and poultry farms: record daily milk and egg production, feed and health checks, with owners seeing trends remotely.",
      h1: "Android apps for Barka dairy and poultry farms",
      card: "Daily production and health logs for dairy and poultry farms.",
      intro: [
        "Dairy and poultry farms around Barka run on daily routines: milking, collecting eggs, feeding and checking health. Owners often find out about problems days late because records are on paper or not kept at all.",
        "We build Android apps where workers record production, feed and health checks each day, and owners see totals, trends and alerts from anywhere.",
      ],
      sections: [
        {
          heading: "Quick daily logs",
          body: [
            "Workers record milk, eggs, feed and observations in a few taps, in their language, offline if needed.",
          ],
        },
        {
          heading: "Problems spotted early",
          body: [
            "Drops in production or unusual mortality trigger alerts, so owners act before losses grow.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We noticed a production drop a week late",
          cause: "Records are reviewed occasionally.",
          steps: [
            "Log production daily",
            "Show trends",
            "Alert on drops",
          ],
        },
        {
          symptom: "Feed costs don't match production",
          cause: "Feed use isn't recorded.",
          steps: [
            "Record feed daily",
            "Compare with production",
            "Report cost per unit",
          ],
        },
      ],
      checklist: [
        "Production is recorded daily",
        "Feed and health checks are logged",
        "Owners see trends remotely",
        "Alerts flag problems early",
      ],
      faqs: [
        {
          question: "Can workers use it if they don't read Arabic?",
          answer: "Yes. We add their languages and use simple icons.",
        },
        {
          question: "Can it track individual animals?",
          answer: "For dairy herds, yes, with records per animal.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    seo: {
      metaTitle: "Local SEO in Barka for Plumbers, AC & Home Maintenance",
      metaDescription:
        "Local SEO for Barka plumbers, AC technicians and home maintenance services: get found by families in new neighbourhoods searching on Google Maps.",
      h1: "SEO for Barka's home maintenance trades and the new families who need them",
      card: "Google Maps visibility for plumbers, AC and maintenance.",
      intro: [
        "New neighbourhoods in Barka are filling with families who moved from Muscat. When the AC fails or a pipe leaks, they search on Google Maps, and often find technicians from Seeb or Muscat because local trades aren't listed.",
        "We help Barka plumbers, AC technicians, electricians and maintenance companies appear for those searches, with complete profiles, service areas and reviews.",
      ],
      sections: [
        {
          heading: "Be on the map",
          body: [
            "A complete Google profile with services, areas and hours is the biggest single step. We set it up and keep it active.",
          ],
        },
        {
          heading: "Reviews that build trust",
          body: [
            "Families trust tradesmen others recommend. We set up simple ways to ask for reviews after each job.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't appear on Google Maps",
          cause: "We never created a profile.",
          steps: [
            "Create and verify a profile",
            "Add services and areas",
            "Upload photos of work",
          ],
        },
        {
          symptom: "Customers choose competitors with more reviews",
          cause: "We don't ask for reviews.",
          steps: [
            "Send a review link after each job",
            "Reply to reviews",
            "Keep reviews coming weekly",
          ],
        },
      ],
      checklist: [
        "Your Google profile is complete",
        "Service areas are listed",
        "Reviews are requested after jobs",
        "Photos of real work are shown",
      ],
      faqs: [
        {
          question: "Do we need an office address?",
          answer: "No. Service-area businesses can show the areas they cover without a public address.",
        },
        {
          question: "How soon will calls increase?",
          answer: "Often within a few weeks of a complete profile and early reviews.",
        },
      ],
    },
    "google-ads": {
      metaTitle: "Google Ads in Barka for Private Schools",
      metaDescription:
        "Google Ads for Barka private schools: reach families moving from Muscat who search for schools nearby, with admissions pages that answer their questions.",
      h1: "Google Ads for Barka private schools enrolling families new to the area",
      card: "Ads that reach families moving to Barka.",
      intro: [
        "As families move from Muscat to Barka, choosing a school is one of their first decisions. They search for schools near their new home and compare curriculum, fees and transport.",
        "We run Google Ads for Barka private schools targeting those families, with admissions pages that answer their questions and tracking that shows which ads bring visits and enrolments.",
      ],
      sections: [
        {
          heading: "Reach families before they decide",
          body: [
            "Ads target searches for schools in Barka and nearby, and families in Muscat searching ahead of a move.",
          ],
        },
        {
          heading: "Admissions pages that convert",
          body: [
            "Curriculum, fees, transport and a visit booking form on one page, so parents can act.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Families don't know our school exists",
          cause: "We rely on word of mouth.",
          steps: [
            "Run search ads for schools in Barka",
            "Target families planning a move",
            "Track enquiries",
          ],
        },
        {
          symptom: "Ad enquiries don't book visits",
          cause: "The landing page lacks information.",
          steps: [
            "Show curriculum and fees",
            "Explain transport",
            "Add visit booking",
          ],
        },
      ],
      checklist: [
        "Ads target families in and moving to Barka",
        "Landing pages answer key questions",
        "Visits can be booked online",
        "Enquiries and enrolments are tracked",
      ],
      faqs: [
        {
          question: "When should school ads run?",
          answer: "Mostly in the months before admissions, with lower budgets the rest of the year.",
        },
        {
          question: "Can ads run in Arabic and English?",
          answer: "Yes, and we usually run both.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Barka for Bakeries & Sweet Shops",
      metaDescription:
        "Instagram and Snapchat for Barka bakeries and sweet shops: show fresh bakes daily, take cake orders and reach new families nearby.",
      h1: "Social media for Barka bakeries and sweet shops",
      card: "Instagram and Snapchat for bakeries and sweet shops.",
      intro: [
        "Bakeries and sweet shops in Barka sell fresh bread, cakes and sweets to families nearby, and take orders for birthdays, Eid and weddings. Many new residents don't yet know they exist.",
        "We help them show fresh bakes daily on Instagram and Snapchat, take custom cake orders properly, and reach the families moving into the area.",
      ],
      sections: [
        {
          heading: "Fresh every day",
          body: [
            "Simple daily posts of what's fresh bring people in. We provide templates and a plan your team can keep up.",
          ],
        },
        {
          heading: "Custom orders without confusion",
          body: [
            "A form or catalogue for custom cakes collects date, size, design and message, so orders are clear.",
          ],
        },
      ],
      problems: [
        {
          symptom: "New residents don't know about us",
          cause: "We only post to existing followers.",
          steps: [
            "Run small local ads",
            "Use Barka location tags",
            "Offer a first-order treat",
          ],
        },
        {
          symptom: "Custom cake orders go wrong",
          cause: "Details are scattered in chats.",
          steps: [
            "Use an order form",
            "Confirm details in writing",
            "Take a deposit",
          ],
        },
      ],
      checklist: [
        "Fresh items are posted daily",
        "Local ads reach new residents",
        "Custom orders use a form",
        "Deposits are taken for custom orders",
      ],
      faqs: [
        {
          question: "Do we need professional photos?",
          answer: "No. Good phone photos in natural light work well. We share simple guidance.",
        },
        {
          question: "Can you manage our account fully?",
          answer: "Yes, or we coach your team to do it.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Barka for Real Estate & Land Brokers",
      metaDescription:
        "AI automation for Barka real estate and land brokers: answer plot and villa enquiries instantly, qualify buyers and pass serious leads to agents.",
      h1: "AI automation for Barka brokers fielding endless plot enquiries",
      card: "Instant replies and lead qualification for brokers.",
      intro: [
        "Barka's growth means a steady flow of enquiries about land plots and villas, from local families and buyers in Muscat. Brokers spend hours answering the same questions about location, size and price, and miss serious buyers in the noise.",
        "We build AI assistants that answer common questions from your listings, ask about budget and timing, and pass qualified buyers to your agents with the conversation attached.",
      ],
      sections: [
        {
          heading: "Answers from your listings",
          body: [
            "The assistant answers using your current listings only, so it doesn't promise properties you don't have.",
          ],
        },
        {
          heading: "Serious buyers first",
          body: [
            "Buyers with budget and timing ready are flagged for agents. Others receive information and follow-ups automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Agents spend all day answering basic questions",
          cause: "Every enquiry is handled manually.",
          steps: [
            "Answer common questions automatically",
            "Qualify buyers",
            "Pass serious leads to agents",
          ],
        },
        {
          symptom: "We lose track of buyers",
          cause: "Enquiries are on several phones.",
          steps: [
            "Use one WhatsApp number",
            "Log every enquiry",
            "Follow up automatically",
          ],
        },
      ],
      checklist: [
        "Common questions are answered instantly",
        "Buyers are qualified",
        "Agents receive serious leads",
        "Every enquiry is logged",
      ],
      faqs: [
        {
          question: "Can it send location pins and photos?",
          answer: "Yes, from your listings.",
        },
        {
          question: "Will it negotiate prices?",
          answer: "No. Pricing discussions go to your agents.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Software for Barka Building Material Suppliers — Custom",
      metaDescription:
        "Custom software for Barka building material suppliers: orders, deliveries to sites, credit accounts and stock, built around how you trade.",
      h1: "Custom software for Barka building material suppliers delivering to sites",
      card: "Orders, deliveries and credit for building suppliers.",
      intro: [
        "With new homes going up across Barka, building material suppliers deliver cement, blocks, steel and finishing materials to sites every day, often on credit to contractors. Orders, deliveries and balances are tracked in notebooks and spreadsheets.",
        "We build software that records orders, schedules deliveries, tracks credit and stock, and gives owners a clear picture of who owes what.",
      ],
      sections: [
        {
          heading: "Deliveries planned",
          body: [
            "Orders are scheduled by site and truck, with drivers confirming delivery on their phones.",
          ],
        },
        {
          heading: "Credit visible",
          body: [
            "Each contractor's balance and limit are shown before new orders, with statements sent automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Contractors dispute deliveries",
          cause: "There's no proof of delivery.",
          steps: [
            "Record deliveries with photos and signatures",
            "Send confirmations",
            "Keep records per site",
          ],
        },
        {
          symptom: "Unpaid balances keep growing",
          cause: "Credit isn't checked before orders.",
          steps: [
            "Set credit limits",
            "Check balances before orders",
            "Send statements",
          ],
        },
      ],
      checklist: [
        "Orders and deliveries are recorded",
        "Proof of delivery is captured",
        "Credit limits are enforced",
        "Stock is tracked",
      ],
      faqs: [
        {
          question: "Can it link to our accounting?",
          answer: "Usually, through exports or an API.",
        },
        {
          question: "Can drivers use cheap phones?",
          answer: "Yes. The driver app is simple and works on basic Android phones.",
        },
      ],
    },
    "api-integration": {
      metaTitle: "Courier Integration in Barka — COD Reconciliation for Stores",
      metaDescription:
        "API integration for Barka couriers and online stores: shipments created automatically, tracking shared and cash-on-delivery payments reconciled.",
      h1: "Connecting Barka couriers and online stores, and reconciling cash on delivery",
      card: "Shipments, tracking and COD reconciliation connected.",
      intro: [
        "Local courier and delivery firms in Barka carry orders for online stores across Muscat and the Batinah, much of it cash on delivery. Shipments are created by hand, customers call for updates and COD money takes weeks to reconcile.",
        "We connect couriers and stores so shipments are created from orders, tracking is shared automatically and COD collections are matched to orders, with missing amounts flagged.",
      ],
      sections: [
        {
          heading: "Shipments from orders",
          body: [
            "Store orders become courier shipments automatically, with labels and routes ready.",
          ],
        },
        {
          heading: "Cash matched",
          body: [
            "COD collections are matched to orders and remitted with a clear statement, so stores trust the courier.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Stores say COD money is missing",
          cause: "Collections aren't matched to orders.",
          steps: [
            "Record collections per order",
            "Send statements to stores",
            "Flag gaps immediately",
          ],
        },
        {
          symptom: "Customers call for delivery updates",
          cause: "Tracking isn't shared.",
          steps: [
            "Send tracking automatically",
            "Notify on dispatch and delivery",
            "Show delivery proof",
          ],
        },
      ],
      checklist: [
        "Shipments are created from store orders",
        "Tracking is shared automatically",
        "COD is matched to orders",
        "Statements go to stores",
      ],
      faqs: [
        {
          question: "Which store platforms can you connect?",
          answer: "Shopify, WooCommerce and most platforms with an API.",
        },
        {
          question: "Can drivers record COD on their phones?",
          answer: "Yes, with a simple driver app.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Barka for Family Business Groups",
      metaDescription:
        "Cloud setup for Barka family businesses running farms, shops and rentals: records, documents and accounts in one secure place the family can access.",
      h1: "Cloud for Barka families running farms, shops and rentals together",
      card: "One place for a family group's records and documents.",
      intro: [
        "Many Barka families run several businesses at once: a farm, a shop or two, rental properties. Records sit with different relatives, on different phones and in different notebooks, and nobody sees the whole picture.",
        "We set up cloud storage and simple shared systems so documents, accounts and records for each business are in one secure place, with the right access for each family member.",
      ],
      sections: [
        {
          heading: "Everything in one place",
          body: [
            "Each business has its own folders and records, with shared summaries for the family.",
          ],
        },
        {
          heading: "Access by role",
          body: [
            "Family members and staff see what they need. Important documents like title deeds and contracts are protected.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We can't find important documents",
          cause: "They're kept in different houses.",
          steps: [
            "Scan documents to the cloud",
            "Organise by business",
            "Control access",
          ],
        },
        {
          symptom: "Only one person knows the accounts",
          cause: "Records are on their phone.",
          steps: [
            "Move records to shared systems",
            "Give the family summaries",
            "Back everything up",
          ],
        },
      ],
      checklist: [
        "Documents are scanned and organised",
        "Each business has its own records",
        "Access is set per person",
        "Everything is backed up",
      ],
      faqs: [
        {
          question: "Is this expensive?",
          answer: "Usually not. Business cloud storage and simple tools cost little each month.",
        },
        {
          question: "Can older family members use it?",
          answer: "Yes. We keep it simple and train everyone.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Barka for Resorts & Beach Chalets",
      metaDescription:
        "Website maintenance for Barka resorts and chalets at Al Sawadi and Al Nahda: booking pages tested, rates updated and sites kept fast and secure.",
      h1: "Website maintenance for Barka resorts and beach chalets",
      card: "Booking pages tested and rates kept current.",
      intro: [
        "Resorts and chalets around Al Sawadi and Al Nahda depend on weekend and holiday bookings from Muscat. Their websites often break quietly: a booking widget stops working, rates are out of date or images load slowly.",
        "We maintain hospitality websites so bookings work, rates and offers are current, the site is fast and secure, and problems are fixed before a holiday weekend.",
      ],
      sections: [
        {
          heading: "Tested before every holiday",
          body: [
            "Before Eid, national holidays and long weekends we test booking, update offers and check speed.",
          ],
        },
        {
          heading: "Fixed quickly",
          body: [
            "If booking fails, we fix it the same day, because weekend demand doesn't wait.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our booking widget stopped working before Eid",
          cause: "A plugin update broke it and nobody checked afterwards.",
          steps: [
            "Test booking before holidays",
            "Monitor bookings daily",
            "Fix failures the same day",
          ],
        },
        {
          symptom: "Rates on the site are out of date",
          cause: "Nobody updates them.",
          steps: [
            "Review rates monthly",
            "Update offers before seasons",
            "Remove expired promotions",
          ],
        },
      ],
      checklist: [
        "Booking is tested before holidays",
        "Rates and offers are current",
        "The site is fast and secure",
        "Problems are fixed quickly",
      ],
      faqs: [
        {
          question: "Can you work with our booking engine?",
          answer: "Yes. We test it and work with its support team when needed.",
        },
        {
          question: "Do you update photos?",
          answer: "Yes, when you send new ones, and we optimise them for speed.",
        },
      ],
    },
  },
}
