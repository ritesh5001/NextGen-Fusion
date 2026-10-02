import type { InCity } from "./types"

export const chennai: InCity = {
  slug: "chennai",
  name: "Chennai",
  state: "Tamil Nadu",
  stateCode: "TN",
  summary: "Auto and manufacturing, hospitals that treat the world, SaaS companies and T. Nagar's silk and gold.",
  areas: ["T. Nagar", "Anna Nagar", "Adyar", "Velachery", "OMR", "Guindy", "Ambattur", "Porur", "Tambaram", "Mylapore", "Nungambakkam", "Sholinganallur", "Oragadam", "Sriperumbudur"],
  nearby: ["bengaluru", "coimbatore", "hyderabad"],
  page: {
    metaTitle: "Website, SEO & Software Company in Chennai",
    metaDescription:
      "Websites, SEO, ecommerce, apps and software for Chennai manufacturers, hospitals, SaaS companies and T. Nagar retailers, in English and Tamil.",
    h1: "Helping Chennai businesses compete well beyond Chennai",
    intro: [
      "Chennai's best businesses already compete nationally and globally: auto component makers in Oragadam and Sriperumbudur supply OEMs worldwide, hospitals treat patients from across Asia and Africa, SaaS companies sell to customers on other continents, and T. Nagar's silk and jewellery houses have customers wherever Tamil families live.",
      "We help them present that capability properly online and run it more efficiently: supplier sites buyers trust, hospital sites international patients understand, Tamil and English search, and systems that replace Excel on the shop floor. Our offices are in Lucknow and Mumbai; Chennai projects run over WhatsApp, video and email.",
    ],
    sections: [
      {
        heading: "Global buyers check you online first",
        body: [
          "A purchasing manager in Germany, a patient's family in Dhaka and a SaaS buyer in Texas all form their first impression of a Chennai business from its website. A site that undersells your facilities, certifications or results costs business you'll never know you lost.",
        ],
      },
      {
        heading: "Tamil and English",
        body: [
          "Many Chennai customers search in Tamil, especially for local services, retail and healthcare. Proper Tamil pages, not machine translation, reach people competitors ignore.",
        ],
      },
    ],
    industries: [
      { name: "Auto and manufacturing", need: "Suppliers need credible B2B sites and shop-floor systems for quality, traceability and schedules." },
      { name: "Hospitals and healthcare", need: "Hospitals need clear sites for international patients and systems that handle enquiries in many languages." },
      { name: "SaaS and tech", need: "SaaS companies need marketing sites, SEO and infrastructure built for global customers." },
      { name: "Silk, jewellery and retail", need: "T. Nagar and Mylapore retailers need online stores that reach Tamil customers across India and abroad." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "OEM buyers don't see us as a serious supplier online",
        cause: "The website hides certifications, capacity and facilities behind generic text.",
        steps: [
          "Show processes, capacity and machinery clearly",
          "List certifications such as IATF 16949 with scope",
          "Offer a capability presentation to download",
        ],
      },
      {
        service: "ai-automation",
        symptom: "International patient enquiries pile up unanswered",
        cause: "Enquiries arrive in many languages with reports attached, and the desk is small.",
        steps: [
          "Acknowledge every enquiry instantly",
          "Collect reports and history in a structured way",
          "Route cases to the right department with a summary",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Customers abroad want our sarees but can't buy online",
        cause: "The store doesn't support international payments or shipping.",
        steps: [
          "Enable international payments",
          "Offer insured international shipping",
          "Show detailed silk and zari information",
        ],
      },
      {
        service: "software-development",
        symptom: "Quality records live in files and Excel",
        cause: "Inspections and traceability aren't digitised.",
        steps: [
          "Record inspections on tablets at each stage",
          "Link records to batches and customer orders",
          "Generate audit reports on demand",
        ],
      },
      {
        service: "seo",
        symptom: "Tamil searchers never find us",
        cause: "The site is English-only.",
        steps: [
          "Create Tamil versions of key pages",
          "Write for how people actually search in Tamil",
          "Add Tamil content to your Google profile posts",
        ],
      },
      {
        service: "nextjs-development",
        symptom: "Our SaaS marketing site is slow for overseas visitors",
        cause: "It's hosted in one place and heavy on scripts.",
        steps: [
          "Serve pages from a global CDN",
          "Trim scripts and optimise images",
          "Pre-render marketing pages",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Chennai?",
        answer: "No. Our offices are in Lucknow and Mumbai. Chennai projects run over WhatsApp, video calls and email.",
      },
      {
        question: "Can you build Tamil websites?",
        answer: "Yes, with proper Tamil pages and URLs. We work with Tamil writers for content.",
      },
      {
        question: "Do you work with manufacturers outside the city?",
        answer: "Yes, including Oragadam, Sriperumbudur, Hosur and across Tamil Nadu.",
      },
      {
        question: "How do you quote?",
        answer: "After one short call we send a fixed quote in writing, normally the next working day.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Chennai — B2B Sites for Auto & Engineering Suppliers",
      metaDescription:
        "Website development in Chennai for auto component and engineering suppliers: capability, certifications and facilities presented the way OEM buyers check them.",
      h1: "Website development for Chennai's auto and engineering suppliers",
      card: "B2B sites that present capability the way OEM buyers check it.",
      intro: [
        "Chennai's auto corridor is full of excellent suppliers with weak websites. Buyers from OEMs and Tier-1s, many of them overseas, look up a supplier before an audit or RFQ, and too often find a homepage slider and a list of products.",
        "We build B2B websites that answer a buyer's checklist on the first visit: processes, capacity, machinery, certifications, customers you can name, quality systems and how to start an RFQ.",
      ],
      sections: [
        {
          heading: "Organised the way buyers look",
          body: [
            "Separate pages for each process, such as machining, forging, casting, sheet metal or assembly, with machine lists, tolerances, materials and capacity. Certifications like IATF 16949 and ISO 14001 with their scope. Photos of your actual shop floor.",
          ],
        },
        {
          heading: "Export-ready",
          body: [
            "Clear English, fast loading overseas and an RFQ form that asks for drawings, volumes and timelines, routed to the right engineer.",
          ],
          links: [{ label: "What a website costs in India", href: "/website-development-cost-in-india/" }],
        },
      ],
      problems: [
        {
          symptom: "Our site lists products, not capabilities",
          cause: "It was written as a catalogue.",
          steps: [
            "Describe processes and capacity",
            "Add machine lists and tolerances",
            "Show real shop-floor photos",
          ],
        },
        {
          symptom: "RFQs arrive without drawings or volumes",
          cause: "The contact form only asks for a name and message.",
          steps: [
            "Build an RFQ form with file upload",
            "Ask for volumes and timelines",
            "Route it to the right engineer",
          ],
        },
      ],
      checklist: [
        "Each process has its own page",
        "Certifications are listed with scope",
        "The RFQ form accepts drawings",
        "Photos show your real facility",
      ],
      faqs: [
        {
          question: "Can we list OEM customers?",
          answer: "Only those you have permission to name. We can describe others by industry and part type.",
        },
        {
          question: "Do you build multilingual sites for export?",
          answer: "Yes, for key markets such as German or Japanese, with professional translation.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "web-design": {
      metaTitle: "Web Design in Chennai — Hospital Websites for International Patients",
      metaDescription:
        "Web design in Chennai for hospitals and specialty clinics: clear, trustworthy sites for local and international patients, with doctors, treatments and enquiry paths.",
      h1: "Web design for Chennai hospitals serving patients from around the world",
      card: "Clear, trustworthy hospital sites for local and international patients.",
      intro: [
        "Chennai's hospitals treat patients from across India and abroad. A family in Bangladesh, Kenya or Oman choosing where to bring a parent for surgery decides largely from what they read and see online. Hospital websites that bury doctors, treatments and the international patient desk lose those families.",
        "We design hospital and clinic sites that are calm, clear and easy to navigate, for local patients and for international families reading in their second language.",
      ],
      sections: [
        {
          heading: "Built around patients' questions",
          body: [
            "Which doctor, which treatment, what to expect, how long, how to get there and how to start. Doctor profiles with qualifications and specialties, treatment pages written plainly, and a visible international patient section.",
          ],
        },
        {
          heading: "Careful and compliant",
          body: [
            "Medical content follows advertising norms for healthcare: no testimonials-as-guarantees, no exaggerated claims. Your medical team approves every page.",
          ],
        },
      ],
      problems: [
        {
          symptom: "International families can't find how to contact us",
          cause: "The international desk is hidden deep in the site.",
          steps: [
            "Add an international patients section to the main menu",
            "Show WhatsApp and email for the desk",
            "Explain visas, travel and stay",
          ],
        },
        {
          symptom: "Patients can't find the right doctor",
          cause: "Doctor listings are long and unfiltered.",
          steps: [
            "Filter doctors by specialty and language",
            "Show availability and booking",
            "Write profiles in plain language",
          ],
        },
      ],
      checklist: [
        "International patients can find the desk in one click",
        "Doctors can be filtered by specialty",
        "Treatment pages are written plainly",
        "Medical content is approved by your team",
      ],
      faqs: [
        {
          question: "Can the site be in several languages?",
          answer: "Yes, for key international patient languages, with professional translation.",
        },
        {
          question: "Can patients book appointments online?",
          answer: "Yes, through your hospital system or a booking integration.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Chennai — Silk Sarees & Jewellery Online",
      metaDescription:
        "Ecommerce in Chennai for T. Nagar and Mylapore silk and jewellery houses: stores with fabric and purity details, video, insured shipping and NRI orders.",
      h1: "Ecommerce for Chennai silk and jewellery houses with customers worldwide",
      card: "Silk and jewellery stores with video, purity details and NRI orders.",
      intro: [
        "T. Nagar and Mylapore's silk and jewellery houses serve generations of families, many of whom now live in Bengaluru, Singapore, Dubai or the US. For weddings and festivals they still want to buy from the shop they trust, and they need a way to do it online.",
        "We build stores for that: detailed Kanchipuram silk and jewellery pages, video, video-call shopping requests, insured shipping and international orders.",
      ],
      sections: [
        {
          heading: "Detail that replaces the counter",
          body: [
            "Silk count, zari type, weight and border details for sarees; purity, weight and hallmark details for jewellery. Close-up photos and short videos in natural light. A button to request a video call with a staff member, just like being at the counter.",
          ],
        },
        {
          heading: "Shipping and payments abroad",
          body: [
            "International payments, insured shipping, duties explained up front and delivery timelines that respect wedding dates.",
          ],
          links: [{ label: "Online store or marketplace?", href: "/ecommerce-store-vs-marketplace/" }],
        },
      ],
      problems: [
        {
          symptom: "Customers abroad still order on WhatsApp",
          cause: "The store can't handle international orders.",
          steps: [
            "Enable international payments and shipping",
            "Show prices in local currency where useful",
            "Offer video-call shopping",
          ],
        },
        {
          symptom: "Buyers worry about authenticity",
          cause: "Product pages lack detail.",
          steps: [
            "Show silk mark and hallmark details",
            "Add close-ups and videos",
            "Explain your return policy clearly",
          ],
        },
      ],
      checklist: [
        "Silk and purity details are on every product",
        "Products have video",
        "International orders are supported",
        "Video-call shopping can be requested",
      ],
      faqs: [
        {
          question: "Can customers customise orders?",
          answer: "Yes, with request forms for blouse stitching, colour options or custom jewellery.",
        },
        {
          question: "Can the store show live gold rates?",
          answer: "Yes, prices can update from a daily rate you set.",
        },
      ],
      caseStudies: ["newsaraswatisareecentre", "mahhika"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Chennai — South Indian Food & Coffee Brands",
      metaDescription:
        "Shopify developers in Chennai for filter coffee, snacks, spice and food brands: stores with subscriptions, FSSAI details, freshness-aware shipping and repeat orders.",
      h1: "Shopify development for Chennai food and coffee brands",
      card: "Food and coffee stores with subscriptions and freshness-aware shipping.",
      intro: [
        "Chennai filter coffee, podis, pickles, snacks and sweets have fans across India and abroad, and many Chennai brands now sell them online. Food brings its own challenges: freshness, shelf life, FSSAI details and customers who reorder every month.",
        "We set up Shopify stores for food brands with subscriptions, clear product information and shipping that respects shelf life.",
      ],
      sections: [
        {
          heading: "Subscriptions for daily habits",
          body: [
            "Coffee and staples suit subscriptions. Customers choose a frequency, skip or pause easily and pay by UPI AutoPay or card where available.",
          ],
        },
        {
          heading: "Food labelling online",
          body: [
            "FSSAI licence number, ingredients, allergens, shelf life and storage instructions shown clearly on every product page, as buyers and regulations expect.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers forget to reorder",
          cause: "No reminders or subscriptions.",
          steps: [
            "Offer subscriptions",
            "Send reorder reminders based on pack size",
            "Reward repeat orders",
          ],
        },
        {
          symptom: "Products arrive stale in distant cities",
          cause: "Shipping doesn't account for shelf life.",
          steps: [
            "Limit perishables to reachable pin codes",
            "Use faster shipping for fresh items",
            "Show expected delivery dates",
          ],
        },
      ],
      checklist: [
        "FSSAI details are on every product",
        "Subscriptions are available",
        "Perishables ship only where they arrive fresh",
        "Reorder reminders are sent",
      ],
      faqs: [
        {
          question: "Can we sell internationally?",
          answer: "Yes, for shelf-stable products, with shipping and duties explained.",
        },
        {
          question: "Can we sell to cafés wholesale?",
          answer: "Yes, with B2B pricing for approved buyers.",
        },
      ],
      caseStudies: ["krushidoctor", "clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Chennai — B2B Manufacturing Platforms",
      metaDescription:
        "Marketplace development in Chennai for manufacturing: platforms that connect buyers with machine shops and job-work suppliers through RFQs and capability search.",
      h1: "Marketplace development for connecting Chennai's manufacturers",
      card: "B2B platforms linking buyers with machine shops through RFQs.",
      intro: [
        "Around Chennai there are thousands of small machine shops, fabricators and job-work units with spare capacity, and buyers who struggle to find them beyond their existing supplier list. Platforms that match the two through capability search and requests for quote solve a real problem.",
        "We build B2B manufacturing marketplaces with supplier capability profiles, RFQs with drawings, quote comparison and order tracking. We built MariBiz.ai, a procurement marketplace with 3,226+ verified vendors, so the RFQ pattern is familiar.",
      ],
      sections: [
        {
          heading: "Capability, not catalogue",
          body: [
            "Suppliers list machines, processes, materials, tolerances and certifications. Buyers search by what they need made, upload drawings and receive structured quotes.",
          ],
        },
        {
          heading: "Confidential by default",
          body: [
            "Drawings are shared only with suppliers the buyer chooses, with NDAs and access logs, because buyers won't upload IP to a platform they don't trust.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers won't upload drawings",
          cause: "They don't trust who will see them.",
          steps: [
            "Share drawings only with selected suppliers",
            "Add NDA acceptance",
            "Log every access",
          ],
        },
        {
          symptom: "Supplier profiles are too vague to match",
          cause: "Suppliers write marketing text, not capabilities.",
          steps: [
            "Use structured capability forms",
            "Verify machines and certifications",
            "Match RFQs on capability fields",
          ],
        },
      ],
      checklist: [
        "Supplier capabilities are structured",
        "Drawings are access-controlled",
        "Quotes are comparable side by side",
        "Suppliers are verified",
      ],
      faqs: [
        {
          question: "Can buyers pay through the platform?",
          answer: "If you want them to. Many B2B platforms work on purchase orders and invoices.",
        },
        {
          question: "How long does a first version take?",
          answer: "Typically twelve to sixteen weeks.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Chennai — Marketing Sites & Docs for SaaS",
      metaDescription:
        "Next.js developers in Chennai for SaaS companies: global marketing sites, documentation, pricing pages and product UI, fast for customers on every continent.",
      h1: "Next.js development for Chennai SaaS companies selling worldwide",
      card: "Global marketing sites, docs and pricing pages for SaaS.",
      intro: [
        "Chennai has produced some of India's best-known SaaS companies, and a new generation is following them. Most sell to customers in the US, Europe and beyond, which means the marketing site, docs and pricing pages have to be fast and convincing worldwide.",
        "We build Next.js marketing sites, documentation and product UI for Chennai SaaS teams, served from a global CDN and easy for marketing to update.",
      ],
      sections: [
        {
          heading: "Fast everywhere",
          body: [
            "Pre-rendered pages on a global edge network load quickly whether the visitor is in Chennai or Chicago. Images and scripts are tuned for Core Web Vitals.",
          ],
        },
        {
          heading: "Docs that sell",
          body: [
            "Good documentation is a sales tool. We build searchable docs with versioning and code samples, on the same stack and design system as the marketing site.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Overseas visitors find our site slow",
          cause: "It's hosted in one region.",
          steps: [
            "Move to a global CDN",
            "Pre-render marketing pages",
            "Measure performance by country",
          ],
        },
        {
          symptom: "Our docs are hard to search",
          cause: "They're scattered across tools.",
          steps: [
            "Consolidate docs in one site",
            "Add search and versioning",
            "Link docs from product UI",
          ],
        },
      ],
      checklist: [
        "Your site is fast in your main markets",
        "Docs are searchable",
        "Marketing can publish pages",
        "Pricing pages are easy to update",
      ],
      faqs: [
        {
          question: "Can you localise our site?",
          answer: "Yes, with language versions and proper hreflang.",
        },
        {
          question: "Can you work with our design team?",
          answer: "Yes, from their Figma files.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Chennai — Service Technician Apps",
      metaDescription:
        "Android apps in Chennai for HVAC, elevator and equipment service firms: job cards, checklists, spares and customer sign-off on the technician's phone.",
      h1: "Android apps for Chennai's service technicians",
      card: "Job cards, checklists, spares and sign-off for service technicians.",
      intro: [
        "Chennai is full of service companies maintaining air conditioners, elevators, generators, industrial machines and appliances. Their technicians still fill paper job cards, call the office for spares and collect signatures on carbon copies.",
        "We build native Android apps that put job cards, checklists, spare parts and customer sign-off on the technician's phone, working offline in basements and plant rooms.",
      ],
      sections: [
        {
          heading: "Digital job cards",
          body: [
            "Technicians see the day's jobs, the equipment history, checklists by job type and spares available. They record work, photos and parts used, and the customer signs on the phone.",
          ],
        },
        {
          heading: "AMC tracking",
          body: [
            "Annual maintenance contracts are scheduled automatically, visits are recorded, and customers receive service reports, making renewals easier.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Paper job cards get lost",
          cause: "Records are on paper.",
          steps: [
            "Move job cards to the app",
            "Capture photos and signatures",
            "Sync to the office",
          ],
        },
        {
          symptom: "AMC visits are missed",
          cause: "Schedules are in Excel.",
          steps: [
            "Schedule AMC visits automatically",
            "Assign technicians",
            "Notify customers",
          ],
        },
      ],
      checklist: [
        "Job cards are digital",
        "Customers sign on the phone",
        "AMC visits are scheduled automatically",
        "The app works offline",
      ],
      faqs: [
        {
          question: "Can it generate invoices?",
          answer: "Yes, GST invoices for chargeable work, or it can send data to Tally.",
        },
        {
          question: "Can customers see service history?",
          answer: "Yes, through reports or a customer portal.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Company in Chennai — Tamil & English SEO",
      metaDescription:
        "SEO in Chennai in Tamil and English: Google Business Profile, locality pages and Tamil content that reaches customers competitors ignore.",
      h1: "SEO for Chennai businesses, in Tamil and English",
      card: "Tamil and English SEO that reaches customers competitors ignore.",
      intro: [
        "Most Chennai businesses do SEO only in English, but many customers search in Tamil, especially for local services, healthcare, education and retail. Tamil search results are often far less competitive.",
        "We do SEO in both languages: Google Business Profile, locality pages for Anna Nagar, Velachery, Tambaram and wherever you serve, and proper Tamil content.",
      ],
      sections: [
        {
          heading: "Tamil pages that rank",
          body: [
            "We write Tamil pages with Tamil writers, structured with their own URLs and hreflang, targeting how people actually search, including Tamil written in English letters.",
          ],
        },
        {
          heading: "Local search",
          body: [
            "Complete Google profiles, consistent listings, reviews and locality pages, reported in calls, directions and WhatsApp clicks.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We rank in English but customers search in Tamil",
          cause: "No Tamil content exists on the site.",
          steps: [
            "Research Tamil search terms",
            "Create Tamil versions of key pages",
            "Track Tamil traffic separately",
          ],
        },
        {
          symptom: "We're not visible in nearby localities",
          cause: "Google profile and area content are thin.",
          steps: [
            "Complete the profile",
            "Add locality pages with real content",
            "Collect reviews",
          ],
        },
      ],
      checklist: [
        "You have Tamil versions of key pages",
        "Your Google profile is complete",
        "You track calls from Google",
        "Locality pages have real local content",
      ],
      faqs: [
        {
          question: "Do you write Tamil content?",
          answer: "Yes, with Tamil writers. You review before publishing.",
        },
        {
          question: "How long does SEO take?",
          answer: "Weeks for profile improvements, three to six months for competitive terms.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Chennai — Medical Tourism & International Patient Ads",
      metaDescription:
        "Google Ads in Chennai for hospitals and clinics: international patient campaigns in target countries, within healthcare ad policies, tracked to enquiries.",
      h1: "Google Ads for Chennai hospitals reaching international patients",
      card: "International patient campaigns within healthcare ad policies.",
      intro: [
        "Patients from Bangladesh, Africa, the Gulf and elsewhere search online for treatment options long before they travel to Chennai. Hospitals that appear in those searches, with a clear route to their international desk, get those patients.",
        "We run Google Ads for hospitals and specialty clinics in target countries, within Google's healthcare policies and medical advertising norms, tracked to enquiries and case submissions.",
      ],
      sections: [
        {
          heading: "Country by country",
          body: [
            "Separate campaigns for each target country, with ads in the right language and landing pages that explain treatment, travel and costs plainly.",
          ],
        },
        {
          heading: "Healthcare policies",
          body: [
            "Google restricts some healthcare ads and requires certification for certain categories. We work within those rules and your medical team approves all copy.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads bring local clicks, not international enquiries",
          cause: "Campaigns target India.",
          steps: [
            "Create country-specific campaigns",
            "Use local language ads",
            "Track international enquiries separately",
          ],
        },
        {
          symptom: "Ads were disapproved",
          cause: "Healthcare policies weren't followed.",
          steps: [
            "Review ads against Google's policies",
            "Remove restricted claims",
            "Apply for certification where needed",
          ],
        },
      ],
      checklist: [
        "International campaigns are separated by country",
        "Ads follow healthcare policies",
        "Enquiries are tracked",
        "Landing pages explain travel and costs",
      ],
      faqs: [
        {
          question: "Which countries should we target?",
          answer: "Those your international patients already come from, then nearby markets. We'll review your patient data.",
        },
        {
          question: "Can you run local ads too?",
          answer: "Yes, for specialties with strong local demand.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Chennai — Tamil Content That Connects",
      metaDescription:
        "Social media marketing in Chennai: Tamil and English Reels, local creators and Meta ads for brands, restaurants, clinics and retailers.",
      h1: "Social media for Chennai brands that speak their customers' language",
      card: "Tamil and English Reels, creators and ads that connect.",
      intro: [
        "Chennai audiences respond to content that feels local, in Tamil, with humour and references they recognise. Brands that post generic English content often get polite indifference.",
        "We plan Tamil and English content, work with Chennai creators and run Meta ads for brands, restaurants, clinics and retailers.",
      ],
      sections: [
        {
          heading: "Local voice",
          body: [
            "Content written by people who know Tamil and Chennai culture, around your products, staff and customers, posted consistently.",
          ],
        },
        {
          heading: "Ads with clear outcomes",
          body: [
            "Click-to-WhatsApp ads, store visit offers and product ads, targeted by area and interest, tracked to messages, visits and sales.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our English posts get little engagement",
          cause: "Content doesn't feel local.",
          steps: [
            "Add Tamil content",
            "Work with local creators",
            "Test formats and track results",
          ],
        },
        {
          symptom: "Social doesn't bring store visits",
          cause: "No offers or tracking for visits.",
          steps: [
            "Run local offers",
            "Use trackable codes",
            "Target nearby areas",
          ],
        },
      ],
      checklist: [
        "You post Tamil content",
        "Ads target your areas",
        "Offers are trackable",
        "You work with local creators",
      ],
      faqs: [
        {
          question: "Do you have Tamil writers?",
          answer: "Yes, we work with Tamil writers for content.",
        },
        {
          question: "Do creator posts need disclosure?",
          answer: "Yes, under ASCI guidelines.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Chennai — International Patient Desk Automation",
      metaDescription:
        "AI automation in Chennai for hospitals: multilingual enquiry handling, medical report collection, case summaries and follow-ups for international patient desks.",
      h1: "AI automation for Chennai hospitals' international patient desks",
      card: "Multilingual enquiries, report collection and case summaries.",
      intro: [
        "International patient desks in Chennai hospitals receive enquiries in many languages, with medical reports attached as photos and PDFs, from families anxious for an answer. A small team can't respond to all of them quickly.",
        "We build AI automation that acknowledges every enquiry instantly, collects the right reports, summarises cases for doctors and follows up, with medical staff making every clinical decision.",
      ],
      sections: [
        {
          heading: "Every family gets an answer",
          body: [
            "Enquiries are acknowledged immediately in the family's language, with a clear list of reports needed and what happens next.",
          ],
        },
        {
          heading: "Doctors get organised cases",
          body: [
            "Reports are collected, organised and summarised for the relevant department, so doctors review cases faster. No medical advice is given automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Families wait days for a first reply",
          cause: "The desk can't keep up.",
          steps: [
            "Acknowledge every enquiry instantly",
            "List the reports needed",
            "Set expectations for timelines",
          ],
        },
        {
          symptom: "Doctors receive disorganised reports",
          cause: "Files arrive in many formats.",
          steps: [
            "Collect reports in a structured way",
            "Summarise key details",
            "Route to the right department",
          ],
        },
      ],
      checklist: [
        "Every enquiry is acknowledged instantly",
        "Reports are collected in one place",
        "Doctors receive case summaries",
        "No clinical advice is automated",
      ],
      faqs: [
        {
          question: "Is patient data safe?",
          answer: "We use providers that don't train on your data, store data in India and restrict access.",
        },
        {
          question: "Which languages can it handle?",
          answer: "Most major languages your patients use, including Bengali, Arabic, French and Swahili.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Chennai — Quality & Traceability for Auto Suppliers",
      metaDescription:
        "Custom software in Chennai for auto component makers: inspection records, traceability, customer schedules and audit reports for IATF 16949 environments.",
      h1: "Custom software for Chennai auto suppliers facing customer audits",
      card: "Inspection, traceability and audit reports for auto suppliers.",
      intro: [
        "Auto component suppliers around Chennai live with customer audits, PPAP submissions and traceability demands. Many still keep inspection records on paper and in Excel, and audit week means days of searching.",
        "We build quality and traceability systems that record inspections at each stage, link everything to batches and customer orders, and produce audit-ready reports on demand.",
      ],
      sections: [
        {
          heading: "Traceability end to end",
          body: [
            "Raw material certificates, process parameters, inspection results and dispatch records linked by batch, so you can trace any part back to its material and forward to the customer.",
          ],
        },
        {
          heading: "Fits your quality system",
          body: [
            "Built around your existing procedures and IATF 16949 requirements, not a generic template.",
          ],
        },
      ],
      problems: [
        {
          symptom: "A customer complaint takes days to trace",
          cause: "Records are spread across paper and Excel.",
          steps: [
            "Digitise inspection records",
            "Link them to batches",
            "Search by part and date",
          ],
        },
        {
          symptom: "Audit preparation takes a week",
          cause: "Documents must be gathered by hand.",
          steps: [
            "Store records digitally",
            "Generate audit reports",
            "Track corrective actions",
          ],
        },
      ],
      checklist: [
        "Any part can be traced to its material",
        "Inspection records are digital",
        "Corrective actions are tracked",
        "Audit reports take minutes",
      ],
      faqs: [
        {
          question: "Can it connect to our ERP?",
          answer: "Yes, through APIs or database connections.",
        },
        {
          question: "Does it work on the shop floor?",
          answer: "Yes, on tablets and rugged devices.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "api-integration": {
      metaTitle: "API Integration in Chennai — Connect ERP, Customer Portals & Logistics",
      metaDescription:
        "API integration in Chennai for manufacturers: connect your ERP or Tally with OEM customer portals, delivery schedules, logistics and invoicing.",
      h1: "API integration for Chennai manufacturers juggling customer portals",
      card: "Connect your ERP with OEM portals, schedules and logistics.",
      intro: [
        "Chennai suppliers often have to log in to several OEM customer portals to download schedules, upload ASNs and check payments, then retype everything into their own ERP or Tally. It's slow and error-prone.",
        "We build integrations that move schedules, dispatch data and invoices between your systems and customers' portals where APIs or file exchanges allow.",
      ],
      sections: [
        {
          heading: "Schedules in, dispatches out",
          body: [
            "Customer delivery schedules flow into your planning, and dispatch and invoice data flow back to customers in their required format, with logs and alerts.",
          ],
        },
        {
          heading: "Where APIs don't exist",
          body: [
            "Some portals only offer file uploads. We automate preparing those files correctly, so staff only need to review and submit.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Staff retype customer schedules every week",
          cause: "Portals and ERP aren't connected.",
          steps: [
            "Import schedules automatically",
            "Validate against capacity",
            "Alert on changes",
          ],
        },
        {
          symptom: "ASN and invoice uploads have errors",
          cause: "Files are prepared by hand.",
          steps: [
            "Generate files from ERP data",
            "Validate before upload",
            "Log submissions",
          ],
        },
      ],
      checklist: [
        "Customer schedules are imported automatically",
        "Dispatch files are generated from your ERP",
        "Errors are caught before upload",
        "Integrations alert on failure",
      ],
      faqs: [
        {
          question: "Can you connect SAP Business One?",
          answer: "Yes, along with Tally and most ERPs with integration options.",
        },
        {
          question: "What if a customer changes their portal?",
          answer: "We update the integration as part of a support plan.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Chennai — Multi-Region Hosting for SaaS",
      metaDescription:
        "Cloud services in Chennai for SaaS companies: multi-region hosting in India, the US and Europe, data residency, DevOps and cost control.",
      h1: "Cloud infrastructure for Chennai SaaS companies with global customers",
      card: "Multi-region hosting, data residency and DevOps for SaaS.",
      intro: [
        "Chennai SaaS companies selling to European and US enterprises increasingly get asked where customer data is stored. Some customers require their data to stay in their region; others need strong security documentation.",
        "We design cloud infrastructure that supports multiple regions, documents data handling clearly and keeps costs under control.",
      ],
      sections: [
        {
          heading: "Data where customers need it",
          body: [
            "Separate deployments or data stores in India, the EU or the US, with routing by customer, so you can meet data residency requests without rebuilding the product.",
          ],
        },
        {
          heading: "Security documentation",
          body: [
            "Access control, encryption, logging, backups and incident processes documented in a way that helps you answer enterprise security reviews.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Enterprise customers ask for EU data residency",
          cause: "Everything runs in one region.",
          steps: [
            "Design a multi-region architecture",
            "Route customer data by region",
            "Document data flows",
          ],
        },
        {
          symptom: "Security reviews take weeks",
          cause: "There's no documentation ready.",
          steps: [
            "Document controls and processes",
            "Fix gaps",
            "Keep a reusable security pack",
          ],
        },
      ],
      checklist: [
        "You can say where each customer's data is stored",
        "Access is controlled and logged",
        "Backups are tested",
        "Security documentation is ready",
      ],
      faqs: [
        {
          question: "Can you help with SOC 2 or ISO 27001?",
          answer: "We can implement technical controls and documentation; certification is done by auditors.",
        },
        {
          question: "AWS, Azure or GCP?",
          answer: "Whichever fits your team and customers. All three have Indian and global regions.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Chennai — Hospital & Clinic Sites Kept Accurate",
      metaDescription:
        "Website maintenance in Chennai for hospitals and clinics: doctor schedules, departments and contact details kept accurate, plus security, backups and monitoring.",
      h1: "Website maintenance for Chennai hospitals and clinics",
      card: "Doctor schedules and contact details kept accurate, plus upkeep.",
      intro: [
        "Hospital and clinic websites change constantly: doctors join and leave, OPD timings change, new departments open. When the site falls behind, patients turn up at the wrong time or call numbers that no longer work.",
        "Our maintenance plans keep hospital and clinic sites accurate, alongside updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Accurate doctor information",
          body: [
            "Send us changes to doctors, timings and departments and they're live within one working day. Each month we flag pages that may be out of date.",
          ],
        },
        {
          heading: "Secure and available",
          body: [
            "Security monitoring, daily off-site backups and uptime alerts, because hospital websites are a common target and patients need them to work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Patients arrive for doctors who've left",
          cause: "Doctor listings aren't updated.",
          steps: [
            "Send changes to us as they happen",
            "Review listings monthly",
            "Keep timings in one place",
          ],
        },
        {
          symptom: "Our site was defaced",
          cause: "Outdated software and no monitoring.",
          steps: [
            "Clean and secure the site",
            "Update everything",
            "Add monitoring and backups",
          ],
        },
      ],
      checklist: [
        "Doctor listings are accurate",
        "OPD timings are current",
        "Software is updated",
        "Backups run daily",
      ],
      faqs: [
        {
          question: "Can you update Tamil pages too?",
          answer: "Yes, with translations from your team or our Tamil writers.",
        },
        {
          question: "How fast are urgent changes?",
          answer: "Immediately during working hours.",
        },
      ],
    },
  },
}
