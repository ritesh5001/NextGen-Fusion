import type { ThCity } from "./types"

export const khonKaen: ThCity = {
  slug: "khon-kaen",
  name: "Khon Kaen",
  state: "Khon Kaen Province",
  stateCode: "Khon Kaen",
  summary: "The commercial heart of Isan: a university city, a medical hub and the market for the Northeast's farms, where customers live on LINE.",
  areas: ["Khon Kaen city centre", "Khon Kaen University area", "Bueng Kaen Nakhon", "Nai Mueang", "Sila", "Ban Phai", "Chum Phae", "Nam Phong", "Phon", "Chonnabot"],
  nearby: ["udon-thani", "bangkok", "chiang-mai"],
  page: {
    metaTitle: "Websites, LINE & Marketing for Khon Kaen Businesses",
    metaDescription:
      "Websites, online stores, LINE OA, apps and marketing for Khon Kaen and Isan businesses: hospitals, schools, farms, food brands and retailers.",
    h1: "Helping Khon Kaen businesses grow across Isan, in Thai and on LINE",
    intro: [
      "Khon Kaen is where the Northeast comes to shop, study and see a doctor. Its university draws students from across Isan, its hospitals serve patients from many provinces, and its traders, rice mills and buying stations connect the region's farms to the rest of Thailand.",
      "Customers here search and buy in Thai, ask questions on LINE and Facebook, and pay with PromptPay. We help Khon Kaen businesses meet them there, with websites, LINE and systems that suit how Isan works. We work remotely from India, with no Khon Kaen office.",
    ],
    sections: [
      {
        heading: "Thai-first, LINE-first",
        body: [
          "Unlike Phuket or Bangkok, most Khon Kaen customers are Thai, and many never use a contact form. A LINE Official Account linked from every page, a Facebook page that answers quickly and a Thai website built properly matter more than a polished English site.",
          "Businesses here also serve a wide area. A clinic, a school or a food brand in Khon Kaen can reach customers across Isan and Bangkok with the right site and delivery.",
        ],
      },
      {
        heading: "Our hours in Khon Kaen",
        body: [
          "We work 11:30 to 20:30 Thailand time, Monday to Saturday. Thai content should be written or checked by a native writer on your side.",
        ],
      },
    ],
    industries: [
      { name: "Hospitals and clinics", need: "To reach patients from across Isan before they travel." },
      { name: "Schools and tutoring", need: "Enrolments from students preparing for university." },
      { name: "Farms, mills and buying stations", need: "Records and payments that farmers can trust." },
      { name: "Food brands and retailers", need: "Sales beyond Khon Kaen and customers who return." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Patients from other provinces call to ask basic questions",
        cause: "Our hospital site doesn't explain services, doctors or how to book.",
        steps: [
          "Publish services and doctors in Thai",
          "Explain how to book and what to bring",
          "Link LINE from every page",
        ],
      },
      {
        service: "android-app-development",
        symptom: "Farmers dispute weights at our buying station",
        cause: "Weights are written by hand.",
        steps: [
          "Record weights in an app",
          "Give farmers a receipt",
          "Keep a history per farmer",
        ],
      },
      {
        service: "marketplace-development",
        symptom: "Harvesters sit idle while farmers wait for one",
        cause: "Machine hire is arranged by phone.",
        steps: [
          "List machines and operators",
          "Show availability by area",
          "Book and pay online",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Farmers message our store about prices all day",
        cause: "Every LINE question is answered by hand.",
        steps: [
          "Reply to price and stock questions on LINE automatically",
          "Take orders on LINE",
          "Pass advice questions to staff",
        ],
      },
      {
        service: "software-development",
        symptom: "Our rice mill doesn't know its real stock",
        cause: "Purchases and milling are recorded on paper.",
        steps: [
          "Record paddy purchases",
          "Track drying and milling",
          "Report stock daily",
        ],
      },
      {
        service: "api-integration",
        symptom: "Customers join our LINE but loyalty points aren't tracked",
        cause: "Points live on paper cards, separate from LINE.",
        steps: [
          "Connect LINE OA to the POS",
          "Award points automatically",
          "Send offers by segment",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Khon Kaen?",
        answer: "No. We work from Lucknow and Mumbai, India, with Khon Kaen businesses over LINE, video calls and email.",
      },
      {
        question: "Can you build Thai-only sites?",
        answer: "Yes. Many Isan businesses need Thai first; English can come later if needed.",
      },
      {
        question: "Can you set up our LINE Official Account?",
        answer: "Yes, with rich menus, automatic replies and connections to your website and systems.",
      },
      {
        question: "Do you work elsewhere in Isan?",
        answer: "Yes, including Udon Thani, Nakhon Ratchasima, Ubon Ratchathani and Roi Et.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Khon Kaen for Hospitals & Clinics",
      metaDescription:
        "Websites for Khon Kaen private hospitals and clinics: services, doctors and booking in Thai, linked to LINE, for patients from across Isan.",
      h1: "Websites for Khon Kaen hospitals and clinics serving patients across Isan",
      card: "Thai-first sites for hospitals and clinics.",
      intro: [
        "Patients travel to Khon Kaen's private hospitals and specialist clinics from across the Northeast. Before they make the trip, they want to know which doctors are there, which services are offered, what it might cost and how to book.",
        "We build hospital and clinic websites in Thai first, with services, doctors, schedules and booking linked to LINE, so patients can plan their visit with confidence.",
      ],
      sections: [
        {
          heading: "Doctors and schedules",
          body: [
            "Each doctor's speciality and clinic days are shown, so patients know when to come.",
          ],
        },
        {
          heading: "Book through LINE",
          body: [
            "Patients book or ask questions on LINE, and staff answer from one inbox.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Patients arrive on days the doctor isn't there",
          cause: "Schedules aren't online.",
          steps: [
            "Publish doctors' schedules",
            "Update them weekly",
            "Allow booking ahead",
          ],
        },
        {
          symptom: "The call centre is overwhelmed",
          cause: "Every question comes by phone.",
          steps: [
            "Answer common questions online",
            "Add LINE booking",
            "Publish preparation guides",
          ],
        },
      ],
      checklist: [
        "Services and doctors are listed in Thai",
        "Schedules are current",
        "Booking works through LINE",
        "Preparation guides are published",
      ],
      faqs: [
        {
          question: "Can we publish prices?",
          answer: "Package prices for common services help patients plan; it's your decision.",
        },
        {
          question: "Are there rules for medical websites?",
          answer: "Yes, medical advertising is regulated in Thailand. We keep content factual and approved by your doctors.",
        },
      ],
    },
    "web-design": {
      metaTitle: "Web Design in Khon Kaen for Tutoring & Exam-Prep Schools",
      metaDescription:
        "Website design for Khon Kaen tutoring and university entrance prep schools: courses, results and enrolment in Thai, designed for students and parents.",
      h1: "Web design for Khon Kaen tutoring and university entrance schools",
      card: "Design for tutoring and exam-prep schools.",
      intro: [
        "Students across Isan prepare for university entrance in Khon Kaen's tutoring schools, and parents compare schools by courses, teachers, results and schedules.",
        "We design school sites that present courses by exam and level, introduce teachers, show results honestly and make enrolment simple on a phone, in Thai.",
      ],
      sections: [
        {
          heading: "Courses students can choose",
          body: [
            "Courses are organised by exam, subject and schedule, with clear fees.",
          ],
        },
        {
          heading: "Results shown honestly",
          body: [
            "Results are presented with students' permission and without exaggeration.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Parents can't compare our courses",
          cause: "Information is in Facebook posts.",
          steps: [
            "Publish courses on the site",
            "Show schedules and fees",
            "Introduce teachers",
          ],
        },
        {
          symptom: "Enrolment takes several visits",
          cause: "It's done on paper.",
          steps: [
            "Enrol online",
            "Pay by PromptPay",
            "Confirm on LINE",
          ],
        },
      ],
      checklist: [
        "Courses are organised by exam and subject",
        "Teachers are introduced",
        "Results are presented honestly",
        "Enrolment works online",
      ],
      faqs: [
        {
          question: "Can students watch recorded lessons?",
          answer: "Yes, we can add an online course area.",
        },
        {
          question: "Should the site be in English?",
          answer: "Thai first; English only if you teach international curricula.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce in Khon Kaen for Isan Food Brands",
      metaDescription:
        "Online stores for Khon Kaen and Isan food brands: sell sauces, snacks and local specialties to customers across Thailand with PromptPay and COD.",
      h1: "Online stores for Isan food brands from Khon Kaen",
      card: "Stores for Isan sauces, snacks and specialties.",
      intro: [
        "Isan food is loved across Thailand, and Khon Kaen producers make sauces, snacks and specialties that Isan families in Bangkok and beyond miss from home.",
        "We build stores that sell across Thailand with PromptPay, cards and cash on delivery, show ingredients and FDA details clearly, and bring customers back through LINE.",
      ],
      sections: [
        {
          heading: "A taste of home, delivered",
          body: [
            "Products ship nationwide by Kerry, Flash or Thailand Post, with packaging suitable for food.",
          ],
        },
        {
          heading: "Repeat orders on LINE",
          body: [
            "Customers join your LINE to reorder and hear about new products.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Isan families in Bangkok can't buy from us",
          cause: "We sell only locally.",
          steps: [
            "Open an online store",
            "Ship nationwide",
            "Promote in Facebook groups",
          ],
        },
        {
          symptom: "Customers buy once",
          cause: "We can't reach them again.",
          steps: [
            "Invite buyers to LINE",
            "Send restock news",
            "Reward repeat orders",
          ],
        },
      ],
      checklist: [
        "Products show ingredients and FDA numbers",
        "Nationwide shipping is set up",
        "PromptPay and COD work",
        "Buyers are invited to LINE",
      ],
      faqs: [
        {
          question: "Do we need FDA registration?",
          answer: "Many food products do; we sell only what you're approved to sell.",
        },
        {
          question: "Should we keep our Shopee shop?",
          answer: "Yes, with stock kept in sync.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    "shopify-development": {
      metaTitle: "Shopify in Khon Kaen for Chonnabot Mudmee Silk",
      metaDescription:
        "Shopify stores for Khon Kaen silk weavers and brands: sell Chonnabot mudmee silk with its story, to customers in Thailand and abroad.",
      h1: "Shopify for Khon Kaen's mudmee silk weavers and brands",
      card: "Shopify stores for mudmee silk.",
      intro: [
        "Chonnabot, in Khon Kaen province, is known for mudmee silk, woven with patterns tie-dyed into the threads before weaving. Weavers and brands sell at markets and fairs, with few customers able to buy online.",
        "We build Shopify stores that tell the story of each piece and its weaver, show patterns in detail and ship to customers in Thailand and abroad.",
      ],
      sections: [
        {
          heading: "The pattern and the weaver",
          body: [
            "Each piece shows its pattern, colours, length and the community that made it.",
          ],
        },
        {
          heading: "For gifts and occasions",
          body: [
            "Silk for ceremonies, gifts and corporate orders is presented with clear options.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers outside Isan can't buy our silk",
          cause: "We sell only at fairs.",
          steps: [
            "Open an online store",
            "Ship nationwide and abroad",
            "Promote on Facebook",
          ],
        },
        {
          symptom: "Photos don't show the pattern quality",
          cause: "They're taken quickly on phones.",
          steps: [
            "Photograph patterns in detail",
            "Show the weaving process",
            "Use consistent light",
          ],
        },
      ],
      checklist: [
        "Each piece shows its pattern and weaver",
        "Detail photos are clear",
        "Shipping covers Thailand and abroad",
        "Thai payments work",
      ],
      faqs: [
        {
          question: "Can we take custom orders?",
          answer: "Yes, with deposits and lead times shown.",
        },
        {
          question: "Can government OTOP products be sold this way?",
          answer: "Yes, OTOP products can be sold online like any other.",
        },
      ],
      caseStudies: ["samaraha"],
    },
    "marketplace-development": {
      metaTitle: "Farm Machinery Hire Marketplace in Khon Kaen",
      metaDescription:
        "Build an Isan marketplace for tractor and harvester hire: operators list machines and areas, farmers book for planting and harvest seasons.",
      h1: "A farm machinery hire marketplace for Khon Kaen and Isan",
      card: "Marketplaces for tractor and harvester hire.",
      intro: [
        "At planting and harvest time, Isan farmers compete for tractors and combine harvesters, while some machine owners have gaps in their schedules. Hire is arranged by phone and word of mouth.",
        "We build machinery hire marketplaces where operators list machines, areas and rates, and farmers book for specific dates, with reminders and payments handled on the platform.",
      ],
      sections: [
        {
          heading: "Book for the season",
          body: [
            "Farmers book by crop, area and date; operators plan routes across villages.",
          ],
        },
        {
          heading: "Clear rates",
          body: [
            "Rates per rai or per hour are shown, avoiding arguments after the work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Farmers wait for harvesters while crops spoil",
          cause: "Availability isn't visible.",
          steps: [
            "Show machine availability",
            "Book in advance",
            "Remind before arrival",
          ],
        },
        {
          symptom: "Price disputes after the job",
          cause: "Rates weren't agreed.",
          steps: [
            "Publish rates",
            "Confirm at booking",
            "Record completed work",
          ],
        },
      ],
      checklist: [
        "Machines are listed by area",
        "Rates are clear",
        "Bookings are made by date",
        "Completed work is recorded",
      ],
      faqs: [
        {
          question: "Do farmers need smartphones?",
          answer: "Most have LINE; booking can happen through LINE as well as the app.",
        },
        {
          question: "How does it earn?",
          answer: "A small fee per booking or operator subscriptions.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Khon Kaen for Startups & Spin-Offs",
      metaDescription:
        "Next.js development for Khon Kaen startups and university spin-offs: fast MVPs and web apps in Thai, ready for pilots and investors.",
      h1: "Next.js for Khon Kaen startups and university spin-offs",
      card: "MVPs and web apps for startups and spin-offs.",
      intro: [
        "Khon Kaen's university and innovation programmes produce startups and spin-offs in agritech, health and education. They need working products to win pilots and funding, often with small budgets.",
        "We build web apps in Next.js scoped to what the pilot needs, in Thai and English, with code and cloud accounts owned by the founders.",
      ],
      sections: [
        {
          heading: "Scoped for the pilot",
          body: [
            "Version one proves the core idea, built properly so it can grow.",
          ],
        },
        {
          heading: "Founders own everything",
          body: [
            "Code, cloud and domain accounts are in the startup's name from day one.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We have a grant but no product",
          cause: "The scope is too broad.",
          steps: [
            "Agree what the pilot must show",
            "Build that first",
            "Deploy to your cloud account",
          ],
        },
        {
          symptom: "Our prototype can't handle real users",
          cause: "It was built as a demo.",
          steps: [
            "Audit the prototype",
            "Rebuild the core",
            "Set up proper hosting",
          ],
        },
      ],
      checklist: [
        "Version one fits the pilot",
        "Thai and English work",
        "Founders own all accounts",
        "Deployment is documented",
      ],
      faqs: [
        {
          question: "Can you work with university researchers?",
          answer: "Yes, alongside your technical team.",
        },
        {
          question: "Do you take equity?",
          answer: "No, we work for a fixed fee.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Khon Kaen for Buying Stations",
      metaDescription:
        "Android apps for Isan sugar cane and cassava buying stations: weights, quality, farmer receipts and payments recorded accurately.",
      h1: "Android apps for Isan sugar cane and cassava buying stations",
      card: "Weight, quality and payment records for buying stations.",
      intro: [
        "Sugar cane and cassava are major crops around Khon Kaen, sold through buying stations that weigh each load, assess quality and pay farmers. Records are handwritten, and disputes follow.",
        "We build Android apps for buying stations that record weight, quality deductions and price per load, print or LINE a receipt to the farmer and calculate payments automatically.",
      ],
      sections: [
        {
          heading: "Every load on record",
          body: [
            "Weight, quality checks and price are recorded per load, with the farmer's details.",
          ],
        },
        {
          heading: "Receipts farmers trust",
          body: [
            "Farmers get a receipt on the spot and a history of their deliveries.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Farmers question deductions",
          cause: "Quality checks aren't recorded.",
          steps: [
            "Record quality per load",
            "Show deductions on receipts",
            "Keep history",
          ],
        },
        {
          symptom: "Payment totals don't match",
          cause: "Calculations are done by hand.",
          steps: [
            "Calculate payments automatically",
            "Reconcile daily",
            "Report by farmer",
          ],
        },
      ],
      checklist: [
        "Each load is recorded",
        "Quality deductions are shown",
        "Farmers receive receipts",
        "Payments are calculated automatically",
      ],
      faqs: [
        {
          question: "Can it connect to our scale?",
          answer: "Many digital scales can send weights to the app; we check yours.",
        },
        {
          question: "Can receipts go by LINE?",
          answer: "Yes, or be printed.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    seo: {
      metaTitle: "SEO in Khon Kaen for Car Dealers & Used Car Yards",
      metaDescription:
        "SEO for Khon Kaen car dealers and used car yards: rank for Thai searches by model across Isan, with stock pages and a complete Google profile.",
      h1: "SEO for Khon Kaen car dealers and used car yards",
      card: "Rank for car searches across Isan.",
      intro: [
        "Buyers across Isan search for pickups and cars by model and price, in Thai, and many travel to Khon Kaen to buy. Dealers that don't appear in those searches lose them to Facebook sellers and Bangkok dealers.",
        "We help dealers rank with a page for every car, model guides, a complete Google profile and reviews from buyers.",
      ],
      sections: [
        {
          heading: "A page per car",
          body: [
            "Each car has its own page with photos, price, mileage and finance options, which Google can find.",
          ],
        },
        {
          heading: "Model searches",
          body: [
            "Pages for popular pickup models answer the questions buyers search in Thai.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers find our cars only on Facebook",
          cause: "Our site doesn't list stock properly.",
          steps: [
            "Publish a page for every car in stock",
            "Update stock weekly",
            "Link from Facebook to the site",
          ],
        },
        {
          symptom: "We don't appear for 'used pickup Khon Kaen'",
          cause: "There's no local content.",
          steps: [
            "Create model and area pages",
            "Complete the Google profile",
            "Collect reviews",
          ],
        },
      ],
      checklist: [
        "Every car in stock has a page",
        "Stock is updated weekly",
        "Model pages exist",
        "Google profile is complete",
      ],
      faqs: [
        {
          question: "Can buyers apply for finance online?",
          answer: "We can link to your finance partners' forms.",
        },
        {
          question: "How quickly will we see results?",
          answer: "Google profile gains in weeks; stock pages within a few months.",
        },
      ],
    },
    "google-ads": {
      metaTitle: "Google Ads in Khon Kaen for Student Condos & Dormitories",
      metaDescription:
        "Google Ads for Khon Kaen condos and dormitories near KKU: reach students and parents before each semester with prices, photos and LINE booking.",
      h1: "Google Ads for Khon Kaen student condos and dormitories",
      card: "Ads that fill student rooms before each semester.",
      intro: [
        "Every semester, students and their parents search for rooms near Khon Kaen University. Condo and dormitory owners compete for them with signs, Facebook posts and word of mouth.",
        "We run Google Ads that reach students and parents searching before each semester, with prices, photos, distance to campus and LINE booking.",
      ],
      sections: [
        {
          heading: "Timed to the semester",
          body: [
            "Budgets rise before each semester and fall once rooms are full.",
          ],
        },
        {
          heading: "Answer parents' questions",
          body: [
            "Security, distance to campus, facilities and contract terms are on the landing page.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Rooms stay empty into the semester",
          cause: "We advertise too late.",
          steps: [
            "Start ads before the semester",
            "Show prices and photos",
            "Take bookings on LINE",
          ],
        },
        {
          symptom: "Parents worry about security",
          cause: "We don't explain it.",
          steps: [
            "Show security features",
            "Explain contract terms",
            "Share reviews",
          ],
        },
      ],
      checklist: [
        "Ads run before each semester",
        "Prices and photos are shown",
        "Security is explained",
        "Bookings work on LINE",
      ],
      faqs: [
        {
          question: "Is Google better than Facebook for this?",
          answer: "Google catches searches; Facebook reaches students browsing. We often use both.",
        },
        {
          question: "What budget is needed?",
          answer: "Modest; Khon Kaen competition is lower than Bangkok.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Khon Kaen for Isan Restaurants",
      metaDescription:
        "Facebook, TikTok and LINE marketing for Khon Kaen Isan restaurants: show dishes, promote quiet days and keep regulars coming back.",
      h1: "Social media for Khon Kaen's Isan restaurants",
      card: "Facebook, TikTok and LINE for restaurants.",
      intro: [
        "Khon Kaen diners discover restaurants on Facebook and TikTok and keep in touch through LINE. Restaurants that post regularly and reply quickly stay busy; others depend on passing trade.",
        "We plan content that shows your food, promotes quiet days and family occasions, and builds a LINE following of regulars.",
      ],
      sections: [
        {
          heading: "Food that looks as good as it tastes",
          body: [
            "Short videos of dishes being made and served, posted consistently.",
          ],
        },
        {
          heading: "Regulars on LINE",
          body: [
            "A LINE Official Account with offers and reservations keeps regulars returning.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Weekdays are quiet",
          cause: "We don't promote them.",
          steps: [
            "Create weekday offers",
            "Post them on Facebook and TikTok",
            "Track redemptions",
          ],
        },
        {
          symptom: "Reservations get lost in messages",
          cause: "They come on several apps.",
          steps: [
            "Use LINE for reservations",
            "Confirm automatically",
            "Keep one list",
          ],
        },
      ],
      checklist: [
        "Content is posted consistently",
        "Weekday offers exist",
        "Regulars follow on LINE",
        "Reservations are confirmed",
      ],
      faqs: [
        {
          question: "Is Facebook still important in Isan?",
          answer: "Yes, alongside TikTok and LINE.",
        },
        {
          question: "Do you create the videos?",
          answer: "We plan the shoots and edit; your staff film on a phone.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Khon Kaen for Agricultural Supply Stores",
      metaDescription:
        "AI and LINE automation for Khon Kaen agricultural supply stores: answer farmers' price and stock questions and take orders on LINE.",
      h1: "AI automation for Khon Kaen agricultural supply stores on LINE",
      card: "LINE replies and orders for farm supply stores.",
      intro: [
        "Farmers message agricultural supply stores on LINE about fertiliser prices, seed stock and delivery, especially before planting. Staff answer the same questions hundreds of times.",
        "We build LINE automation that answers price and stock questions from your system, takes orders and passes advice questions to staff who know the crops.",
      ],
      sections: [
        {
          heading: "Prices and stock on LINE",
          body: [
            "Farmers ask on LINE and get current prices and stock instantly.",
          ],
        },
        {
          heading: "Advice from people",
          body: [
            "Questions about crop problems or chemical use go to staff, never answered automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Staff are overwhelmed before planting season",
          cause: "Every question comes on LINE.",
          steps: [
            "Answer price and stock questions automatically",
            "Take orders on LINE",
            "Pass advice to staff",
          ],
        },
        {
          symptom: "Prices given on LINE are out of date",
          cause: "Staff quote from memory.",
          steps: [
            "Connect answers to your price list",
            "Update centrally",
            "Log quotes",
          ],
        },
      ],
      checklist: [
        "Price and stock answers are automatic",
        "Orders are taken on LINE",
        "Advice goes to staff",
        "Prices come from your system",
      ],
      faqs: [
        {
          question: "Will it recommend pesticides?",
          answer: "No. Product advice comes from your trained staff.",
        },
        {
          question: "Can farmers order by voice message?",
          answer: "Voice messages go to staff; text orders can be automated.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Rice Mill Software in Khon Kaen — Custom Development",
      metaDescription:
        "Custom software for Isan rice mills: paddy purchases, moisture and quality, drying, milling, stock and sales in one system.",
      h1: "Custom software for Isan rice mills",
      card: "Purchases, drying, milling and stock for rice mills.",
      intro: [
        "Rice mills around Khon Kaen buy paddy from farmers, dry, mill and sell it. Purchases, moisture deductions, stock and sales are recorded across paper and spreadsheets, and owners don't know their real position.",
        "We build mill software that records purchases with moisture and quality, tracks drying and milling yields, and shows stock and sales in real time.",
      ],
      sections: [
        {
          heading: "Purchases recorded properly",
          body: [
            "Each purchase records weight, moisture, quality and price, with a receipt for the farmer.",
          ],
        },
        {
          heading: "Yields and stock",
          body: [
            "Milling yields and stock by grade are tracked daily.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't know our real stock",
          cause: "Records are on paper.",
          steps: [
            "Record purchases and milling",
            "Track stock by grade",
            "Report daily",
          ],
        },
        {
          symptom: "Milling yields seem low",
          cause: "They're never measured.",
          steps: [
            "Record inputs and outputs",
            "Calculate yields",
            "Compare by batch",
          ],
        },
      ],
      checklist: [
        "Purchases are recorded with moisture",
        "Milling yields are measured",
        "Stock is tracked by grade",
        "Sales are recorded",
      ],
      faqs: [
        {
          question: "Can it connect to our weighbridge?",
          answer: "Often, depending on the equipment.",
        },
        {
          question: "Is it in Thai?",
          answer: "Yes, entirely.",
        },
      ],
    },
    "api-integration": {
      metaTitle: "LINE OA & POS Integration in Khon Kaen for Retail Chains",
      metaDescription:
        "API integration for Khon Kaen retail chains: connect LINE Official Account loyalty with your POS, so points, offers and receipts work automatically.",
      h1: "Connecting LINE loyalty and the POS for Khon Kaen retail chains",
      card: "LINE OA loyalty connected to your POS.",
      intro: [
        "Retail chains in Khon Kaen ask customers to follow them on LINE, but points and offers are tracked separately from the till, so customers lose interest.",
        "We connect your LINE Official Account to your POS so purchases earn points automatically, receipts arrive on LINE and offers are sent by what customers buy.",
      ],
      sections: [
        {
          heading: "Points without paperwork",
          body: [
            "Customers scan or link their LINE at the till, and points are added automatically.",
          ],
        },
        {
          heading: "Offers that fit",
          body: [
            "Offers are sent by purchase history, not to everyone at once.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers follow our LINE then ignore it",
          cause: "There's no benefit.",
          steps: [
            "Link LINE to loyalty points",
            "Send receipts on LINE",
            "Offer member deals",
          ],
        },
        {
          symptom: "Points are tracked on paper cards",
          cause: "LINE and the POS aren't connected.",
          steps: [
            "Connect the systems",
            "Award points automatically",
            "Show balances on LINE",
          ],
        },
      ],
      checklist: [
        "LINE is linked to the POS",
        "Points are automatic",
        "Receipts arrive on LINE",
        "Offers are targeted",
      ],
      faqs: [
        {
          question: "Does our POS support this?",
          answer: "Many modern POS systems have APIs; we check yours.",
        },
        {
          question: "Will our LINE OA message quota be enough?",
          answer: "Depending on message volume; we help you choose.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Khon Kaen for Accounting Offices",
      metaDescription:
        "Secure cloud setup for Khon Kaen accounting offices serving Isan SMEs: client documents, tax filings and backups, organised and PDPA-aware.",
      h1: "Cloud for Khon Kaen accounting offices serving Isan businesses",
      card: "Secure client files and backups for accounting offices.",
      intro: [
        "Accounting offices in Khon Kaen keep the books of many small businesses across Isan, receiving receipts and statements by LINE, photo and paper. Files live on office PCs with little protection.",
        "We set up cloud storage where each client's documents are organised, uploaded through secure links instead of LINE, and backed up, with access by role.",
      ],
      sections: [
        {
          heading: "Each client organised",
          body: [
            "Clients have their own folders by year and month, and staff see only their clients.",
          ],
        },
        {
          heading: "Documents in, safely",
          body: [
            "Clients upload receipts through a link, and files are named and filed automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Client receipts arrive as LINE photos",
          cause: "There's no upload process.",
          steps: [
            "Provide upload links",
            "File documents automatically",
            "Confirm receipt to clients",
          ],
        },
        {
          symptom: "A PC failure lost a year of files",
          cause: "Files were stored locally.",
          steps: [
            "Move files to the cloud",
            "Back up automatically",
            "Test restores",
          ],
        },
      ],
      checklist: [
        "Client files are organised",
        "Uploads use secure links",
        "Backups are automatic",
        "Access is by role",
      ],
      faqs: [
        {
          question: "Does it work with Thai accounting software?",
          answer: "Usually, alongside it.",
        },
        {
          question: "Is client data protected under the PDPA?",
          answer: "The setup supports it; your adviser confirms obligations.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Khon Kaen for Private Schools",
      metaDescription:
        "Website maintenance for Khon Kaen private schools: admissions, calendars and news kept current in Thai, forms tested and the site secure.",
      h1: "Website maintenance for Khon Kaen private schools",
      card: "Admissions, calendars and news kept current for schools.",
      intro: [
        "Private schools in Khon Kaen often update their website only at admission time. Calendars, news and contact details drift out of date, and forms stop working unnoticed.",
        "We maintain school websites so admissions, calendars and news are current in Thai, forms are tested and the site stays secure.",
      ],
      sections: [
        {
          heading: "Updated all year",
          body: [
            "We post news and update calendars when you send them.",
          ],
        },
        {
          heading: "Ready for admissions",
          body: [
            "Before admissions open, we check fees, requirements and forms.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Parents saw last year's admissions information",
          cause: "Pages weren't updated.",
          steps: [
            "Review admissions before each round",
            "Update fees and requirements",
            "Test forms",
          ],
        },
        {
          symptom: "The site was hacked",
          cause: "Software was outdated.",
          steps: [
            "Clean and update the site",
            "Change passwords",
            "Monitor monthly",
          ],
        },
      ],
      checklist: [
        "Admissions information is current",
        "News and calendars are updated",
        "Forms are tested",
        "The site is secure",
      ],
      faqs: [
        {
          question: "Can teachers post news?",
          answer: "Yes, with simple access.",
        },
        {
          question: "Do you post on Facebook too?",
          answer: "We can share website news to your page if you want.",
        },
      ],
    },
  },
}
