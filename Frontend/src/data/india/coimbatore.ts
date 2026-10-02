import type { InCity } from "./types"

export const coimbatore: InCity = {
  slug: "coimbatore",
  name: "Coimbatore",
  state: "Tamil Nadu",
  stateCode: "TN",
  summary: "Pumps, motors, textiles, foundries and wet grinders, sold through dealers across India.",
  areas: ["RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony", "Race Course", "Avinashi Road", "Singanallur", "Saravanampatti", "Ganapathy", "Kuniamuthur", "Ukkadam", "Kovaipudur", "Sulur", "Tiruppur"],
  nearby: ["chennai", "kochi", "bengaluru"],
  page: {
    metaTitle: "Website, SEO & Software Company in Coimbatore",
    metaDescription:
      "Websites, dealer apps, product selectors, SEO and software for Coimbatore pump and motor makers, textile mills, foundries, Tiruppur knitwear and appliance brands.",
    h1: "Helping Coimbatore's manufacturers sell through dealers and direct",
    intro: [
      "Coimbatore makes things the whole country uses: pumps and motors, wet grinders, textile machinery and yarn, castings and engineered parts. Nearby Tiruppur makes much of India's knitwear. Most of these businesses sell through dealers and distributors, and many are now building direct channels too.",
      "We help Coimbatore manufacturers support their dealers, reach new ones and sell directly, with product selectors, dealer and electrician apps, B2B catalogues, D2C stores and production systems. Our offices are in Lucknow and Mumbai; Coimbatore projects run over WhatsApp, video and email.",
    ],
    sections: [
      {
        heading: "Dealers are the customer too",
        body: [
          "For a pump or appliance brand, the dealer and the electrician often decide which brand the end customer buys. Tools that make their lives easier, like product selection, warranty registration and loyalty rewards, win shelf space and recommendations.",
        ],
      },
      {
        heading: "Tamil and English",
        body: [
          "Dealers, electricians and many end customers prefer Tamil. Apps, websites and content in Tamil reach them better.",
        ],
      },
    ],
    industries: [
      { name: "Pumps, motors and electricals", need: "Brands need product selectors, dealer apps and loyalty programmes for electricians." },
      { name: "Textiles and spinning mills", need: "Mills need production visibility and credible sites for yarn buyers in India and abroad." },
      { name: "Tiruppur knitwear", need: "Exporters and brands need D2C stores and private-label enquiries." },
      { name: "Foundries, engineering and appliances", need: "Manufacturers need B2B catalogues, used machinery sales and consumer stores." },
    ],
    problems: [
      {
        service: "nextjs-development",
        symptom: "Dealers pick the wrong pump for customers",
        cause: "Selecting by head and flow needs technical charts.",
        steps: [
          "Build an online pump selector",
          "Recommend models by head, flow and power",
          "Link to datasheets and dealers",
        ],
      },
      {
        service: "android-app-development",
        symptom: "Electricians recommend competitors' brands",
        cause: "Competitors reward electricians; we don't.",
        steps: [
          "Launch a loyalty app with QR scans",
          "Pay rewards by UPI",
          "Track scans by region",
        ],
      },
      {
        service: "software-development",
        symptom: "We don't know mill efficiency until month end",
        cause: "Production is recorded on paper per shift.",
        steps: [
          "Record shift production digitally",
          "Calculate efficiency automatically",
          "Show dashboards to managers",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Our wet grinders sell only through shops",
        cause: "No direct online store.",
        steps: [
          "Launch a store with demos and specs",
          "Offer EMI and doorstep delivery",
          "Handle warranty registration online",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Dealers call for the same technical answers",
        cause: "Manuals are hard to search.",
        steps: [
          "Build an assistant from your manuals",
          "Answer dealers on WhatsApp",
          "Escalate complex issues",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Our Tiruppur knitwear brand only sells wholesale",
        cause: "No D2C channel.",
        steps: [
          "Launch a D2C store",
          "Use clear size charts",
          "Control COD returns",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Coimbatore?",
        answer: "No. Our offices are in Lucknow and Mumbai. Coimbatore projects run over WhatsApp, video calls and email.",
      },
      {
        question: "Do you work with Tiruppur businesses?",
        answer: "Yes, and across western Tamil Nadu, including Erode, Karur and Salem.",
      },
      {
        question: "Can apps and sites be in Tamil?",
        answer: "Yes.",
      },
      {
        question: "How do you quote?",
        answer: "No published rates: a short chat, then a fixed quote in writing the next working day.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Coimbatore — Sites for Pump & Motor Manufacturers",
      metaDescription:
        "Website development in Coimbatore for pump and motor manufacturers: product catalogues with specs and curves, dealer locators and dealer enquiry forms.",
      h1: "Website development for Coimbatore's pump and motor manufacturers",
      card: "Product catalogues with specs, curves and dealer locators.",
      intro: [
        "Coimbatore is India's pump city. Hundreds of manufacturers make submersible, monoblock, openwell and industrial pumps and motors, selling through dealers across India and abroad. Buyers, dealers and consultants all check product specifications online before choosing a brand.",
        "We build websites with proper technical catalogues, dealer locators and dealer enquiry forms, so your products are easy to specify and buy.",
      ],
      sections: [
        {
          heading: "A technical catalogue",
          body: [
            "Every model with power, head, flow, voltage, phase and performance curves, plus downloadable datasheets, searchable by application such as agriculture, domestic or industrial.",
          ],
        },
        {
          heading: "Where to buy",
          body: [
            "A dealer locator by district and pin code, plus a dealer enquiry form for new regions.",
          ],
          links: [{ label: "What a website costs in India", href: "/website-development-cost-in-india/" }],
        },
      ],
      problems: [
        {
          symptom: "Customers can't find where to buy our pumps",
          cause: "There's no dealer locator.",
          steps: [
            "Add dealers by district",
            "Search by pin code",
            "Keep dealer data current",
          ],
        },
        {
          symptom: "Specs are only in printed catalogues",
          cause: "The website lists models without data.",
          steps: [
            "Add full specs per model",
            "Publish performance curves",
            "Offer datasheet downloads",
          ],
        },
      ],
      checklist: [
        "Every model has full specifications",
        "Performance curves are available",
        "Dealers can be found by pin code",
        "New dealers can enquire online",
      ],
      faqs: [
        {
          question: "Can the site be in Tamil and Hindi?",
          answer: "Yes, for dealers and customers in different regions.",
        },
        {
          question: "Can we add a pump selector?",
          answer: "Yes, see our Next.js page for Coimbatore.",
        },
      ],
      caseStudies: ["hcbengineering", "saurally"],
    },
    "web-design": {
      metaTitle: "Web Design in Coimbatore — Websites for Spinning Mills & Yarn Exporters",
      metaDescription:
        "Web design in Coimbatore for spinning mills and yarn exporters: credible sites showing counts, capacity, quality systems and certifications to buyers worldwide.",
      h1: "Web design for Coimbatore's spinning mills and yarn exporters",
      card: "Credible mill sites showing counts, capacity and quality.",
      intro: [
        "Coimbatore's spinning mills supply yarn to weavers and knitters across India and to export buyers. Buyers compare mills on counts, capacity, quality systems and certifications, and many mills' websites show none of that clearly.",
        "We design mill websites that present product range, capacity, machinery, quality systems and certifications in a clean, credible way.",
      ],
      sections: [
        {
          heading: "What yarn buyers look for",
          body: [
            "Counts and blends produced, spindle capacity, machinery, testing facilities, certifications such as organic or recycled standards where you hold them, and export markets.",
          ],
        },
        {
          heading: "Clean and credible",
          body: [
            "Professional photography of the mill, clear structure and an enquiry form that asks for count, quantity and destination.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers can't see our product range",
          cause: "Counts and blends aren't listed.",
          steps: [
            "List counts and blends",
            "Show capacity",
            "Add testing details",
          ],
        },
        {
          symptom: "Our site looks outdated next to competitors",
          cause: "It was built a decade ago.",
          steps: [
            "Redesign with mill photography",
            "Simplify structure",
            "Make it fast internationally",
          ],
        },
      ],
      checklist: [
        "Counts and blends are listed",
        "Capacity is stated",
        "Certifications are shown",
        "Enquiries ask for count and quantity",
      ],
      faqs: [
        {
          question: "Can we show sustainability credentials?",
          answer: "Yes, those you can evidence.",
        },
        {
          question: "Can the site be in other languages?",
          answer: "Yes, for key export markets.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Coimbatore — D2C Stores for Tiruppur Knitwear Brands",
      metaDescription:
        "Ecommerce for Tiruppur and Coimbatore knitwear brands: D2C stores for t-shirts, innerwear and kidswear with size charts, multipacks and COD control.",
      h1: "Ecommerce for Tiruppur knitwear brands going direct",
      card: "D2C stores for t-shirts, innerwear and kidswear.",
      intro: [
        "Tiruppur makes a huge share of India's knitwear, mostly for export buyers and other brands. More Tiruppur manufacturers now launch their own brands of t-shirts, innerwear, loungewear and kidswear, and sell directly online.",
        "We build D2C stores for knitwear brands with clear sizing, multipacks, COD control and repeat-purchase flows.",
      ],
      sections: [
        {
          heading: "Sizing and multipacks",
          body: [
            "Size charts with measurements, fabric GSM and composition, multipacks and combos that raise order value and make shipping worthwhile.",
          ],
        },
        {
          heading: "Repeat orders",
          body: [
            "Basics like innerwear and t-shirts are bought again and again. Reorder reminders and loyalty rewards bring customers back.",
          ],
          links: [{ label: "Online store or marketplace?", href: "/ecommerce-store-vs-marketplace/" }],
        },
      ],
      problems: [
        {
          symptom: "Returns for wrong size are high",
          cause: "Size charts are vague.",
          steps: [
            "Add measurement-based size charts",
            "Describe fit",
            "Offer easy exchanges",
          ],
        },
        {
          symptom: "Average order value is too low",
          cause: "Single items only.",
          steps: [
            "Offer multipacks",
            "Create combos",
            "Set a free-shipping threshold",
          ],
        },
      ],
      checklist: [
        "Size charts use measurements",
        "Multipacks are offered",
        "COD is confirmed",
        "Reorder reminders are sent",
      ],
      faqs: [
        {
          question: "Can we also take private-label enquiries?",
          answer: "Yes, with a separate B2B enquiry section.",
        },
        {
          question: "Which platform do you recommend?",
          answer: "Shopify for most brands.",
        },
      ],
      caseStudies: ["vashtaraheaven", "deetoo"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Coimbatore — Wet Grinder & Kitchen Appliance Brands",
      metaDescription:
        "Shopify developers in Coimbatore for wet grinder and kitchen appliance brands: stores with demos, specs, EMI, warranty registration and doorstep delivery.",
      h1: "Shopify development for Coimbatore wet grinder and appliance brands",
      card: "Appliance stores with demos, EMI and warranty registration.",
      intro: [
        "Coimbatore wet grinders are famous across India, and the city's appliance makers sell to households everywhere. Most sales still happen through dealers, while customers increasingly research and buy online.",
        "We set up Shopify stores for appliance brands with product demos, specifications, EMI options, warranty registration and doorstep delivery.",
      ],
      sections: [
        {
          heading: "Help customers choose",
          body: [
            "Capacity guides by family size, demo videos, specifications and comparisons, so customers pick the right model.",
          ],
        },
        {
          heading: "After the sale",
          body: [
            "Online warranty registration, service requests and spare parts, so customers stay with your brand.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers don't know which capacity to buy",
          cause: "No sizing guidance.",
          steps: [
            "Add a capacity guide",
            "Show demo videos",
            "Compare models",
          ],
        },
        {
          symptom: "Warranty cards are never returned",
          cause: "Registration is on paper.",
          steps: [
            "Register warranties online",
            "Use QR codes on products",
            "Send confirmation",
          ],
        },
      ],
      checklist: [
        "Capacity guidance is shown",
        "Demo videos are on product pages",
        "EMI options are available",
        "Warranties are registered online",
      ],
      faqs: [
        {
          question: "Can we sell spares online?",
          answer: "Yes, linked to each model.",
        },
        {
          question: "Will this upset our dealers?",
          answer: "We can route online orders to nearby dealers if you prefer.",
        },
      ],
      caseStudies: ["deetoo", "clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Coimbatore — Used Machinery & Spares Marketplaces",
      metaDescription:
        "Marketplace development in Coimbatore for used textile machinery and spares: listings, inspections, enquiries and secure deals between businesses.",
      h1: "Marketplace development for used machinery and spares in Coimbatore",
      card: "Used machinery and spares marketplaces with inspections.",
      intro: [
        "Coimbatore and Tiruppur have a busy trade in used textile machinery, industrial equipment and spares, mostly through brokers and word of mouth. Buyers struggle to find the right machine; sellers struggle to reach buyers beyond their network.",
        "We build B2B marketplaces for used machinery and spares with detailed listings, inspection reports, enquiries and secure deal handling.",
      ],
      sections: [
        {
          heading: "Listings buyers can trust",
          body: [
            "Make, model, year, condition, photos, videos and optional inspection reports, so buyers can shortlist without travelling.",
          ],
        },
        {
          heading: "Deals, not just ads",
          body: [
            "Enquiries, offers and deposits handled on the platform, with commission and records for both sides.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers travel to see machines that aren't as described",
          cause: "Listings lack detail.",
          steps: [
            "Require detailed listings",
            "Offer inspection reports",
            "Add videos",
          ],
        },
        {
          symptom: "Sellers can't reach buyers beyond brokers",
          cause: "No open marketplace.",
          steps: [
            "List machines online",
            "Promote to buyers across India",
            "Handle enquiries on the platform",
          ],
        },
      ],
      checklist: [
        "Listings include condition and videos",
        "Inspections are available",
        "Enquiries are tracked",
        "Deposits are secure",
      ],
      faqs: [
        {
          question: "Can brokers use the platform?",
          answer: "Yes, with broker accounts.",
        },
        {
          question: "How long does it take?",
          answer: "A first version typically takes ten to fourteen weeks.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Coimbatore — Online Pump Selection Tools",
      metaDescription:
        "Next.js development in Coimbatore for pump manufacturers: online pump selectors that recommend models from head, flow and power, with curves and datasheets.",
      h1: "Next.js development for pump selection tools",
      card: "Online pump selectors that recommend models from head and flow.",
      intro: [
        "Choosing the right pump means matching head, flow, power supply and application to the right model, which dealers and customers often get wrong. A wrong pump means poor performance, returns and blame on the brand.",
        "We build online pump selectors in Next.js that ask a few questions, recommend matching models with performance curves and link to datasheets and nearby dealers.",
      ],
      sections: [
        {
          heading: "Selection made simple",
          body: [
            "Users enter head, flow, power supply and application, or answer simpler questions such as borewell depth and land area. The selector recommends suitable models and explains why.",
          ],
        },
        {
          heading: "Data you maintain",
          body: [
            "Model data and curves are stored in one place your engineers update, and the selector, catalogue and datasheets all read from it.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Wrong pumps cause returns and complaints",
          cause: "Selection relies on dealers' judgement.",
          steps: [
            "Build a selector from your data",
            "Explain recommendations",
            "Track selections and outcomes",
          ],
        },
        {
          symptom: "Farmers can't understand technical terms",
          cause: "Selection needs engineering knowledge.",
          steps: [
            "Ask simple questions",
            "Convert answers to head and flow",
            "Show results in Tamil or Hindi",
          ],
        },
      ],
      checklist: [
        "Selection uses your real model data",
        "Recommendations are explained",
        "Results link to dealers",
        "Simple-language mode is available",
      ],
      faqs: [
        {
          question: "Can the selector work offline for dealers?",
          answer: "We can build an app version that works offline.",
        },
        {
          question: "Can it include motors and accessories?",
          answer: "Yes, as part of the recommendation.",
        },
      ],
      caseStudies: ["maribiz-ai", "saurally"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Coimbatore — Electrician & Plumber Loyalty Apps",
      metaDescription:
        "Android apps in Coimbatore for pump, motor and electrical brands: electrician and plumber loyalty apps with QR scanning, points and UPI rewards.",
      h1: "Android loyalty apps for Coimbatore pump and electrical brands",
      card: "Electrician loyalty apps with QR scans and UPI rewards.",
      intro: [
        "Electricians and plumbers decide which pump, motor or wire brand many customers buy. Large brands win their loyalty with reward apps: scan a QR code on each product installed, earn points, get paid by UPI.",
        "We build native Android loyalty apps for Coimbatore brands, with QR scanning, points, UPI payouts and fraud checks, in Tamil, Hindi and other languages.",
      ],
      sections: [
        {
          heading: "Scan, earn, redeem",
          body: [
            "Electricians scan the QR code inside each product, earn points instantly and redeem them by UPI or for gifts. Schemes can vary by product and region.",
          ],
        },
        {
          heading: "Fraud-resistant",
          body: [
            "Unique codes, scan limits, location checks and alerts for suspicious patterns keep the programme honest.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Electricians prefer brands with rewards",
          cause: "We have no loyalty programme.",
          steps: [
            "Launch a QR loyalty app",
            "Pay rewards by UPI",
            "Run regional schemes",
          ],
        },
        {
          symptom: "Our paper coupon scheme is abused",
          cause: "Coupons are easy to fake.",
          steps: [
            "Use unique QR codes",
            "Check scans for patterns",
            "Block suspicious accounts",
          ],
        },
      ],
      checklist: [
        "Each product has a unique QR",
        "Rewards pay by UPI",
        "Fraud checks are in place",
        "Scans are tracked by region",
      ],
      faqs: [
        {
          question: "Can the app be multilingual?",
          answer: "Yes, Tamil, Hindi, Telugu, Kannada and more.",
        },
        {
          question: "Who prints the QR codes?",
          answer: "Your packaging supplier; we generate the unique codes.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Company in Coimbatore — Industrial Product SEO & Tamil SEO",
      metaDescription:
        "SEO in Coimbatore for manufacturers and local businesses: rank for product searches like 'submersible pump manufacturer', plus Tamil local SEO.",
      h1: "SEO for Coimbatore manufacturers and local businesses",
      card: "Industrial product SEO plus Tamil local SEO.",
      intro: [
        "Dealers, contractors and buyers across India search for specific products: \"5 HP submersible pump\", \"openwell pump manufacturer\", \"compact wet grinder\". Coimbatore manufacturers with strong product pages win those searches from portals and traders.",
        "We build product SEO for manufacturers and Tamil local SEO for businesses serving Coimbatore.",
      ],
      sections: [
        {
          heading: "Product pages that rank",
          body: [
            "A page per model and category with specifications, applications and structured data, so search engines understand and rank them.",
          ],
        },
        {
          heading: "Tamil local search",
          body: [
            "Tamil pages and a complete Google profile for businesses serving local customers.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Traders rank above us for our own products",
          cause: "Our product pages are thin.",
          steps: [
            "Build detailed model pages",
            "Add product schema",
            "Earn industry links",
          ],
        },
        {
          symptom: "Tamil searches find competitors",
          cause: "No Tamil content.",
          steps: [
            "Create Tamil pages",
            "Target Tamil searches",
            "Track results",
          ],
        },
      ],
      checklist: [
        "Each model has a detailed page",
        "Product schema is added",
        "You have Tamil pages",
        "Enquiries from search are tracked",
      ],
      faqs: [
        {
          question: "Can we rank across India?",
          answer: "For product searches, yes, with strong product pages.",
        },
        {
          question: "How long does it take?",
          answer: "Competitive terms typically need three to six months of steady work.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Coimbatore — Dealer Acquisition for Manufacturers",
      metaDescription:
        "Google Ads in Coimbatore for pump, appliance and engineering brands: campaigns that recruit dealers and distributors in new states and track dealer enquiries.",
      h1: "Google Ads for Coimbatore brands recruiting dealers in new states",
      card: "Campaigns that recruit dealers and distributors in new states.",
      intro: [
        "Many Coimbatore brands are strong in Tamil Nadu and Kerala but thin elsewhere. Expanding means finding dealers in Maharashtra, Karnataka, Andhra Pradesh, Uttar Pradesh and beyond, usually through sales trips and trade fairs.",
        "We run campaigns targeting businesses searching for dealerships and distributorships in your category, in their language, tracked to dealer enquiries.",
      ],
      sections: [
        {
          heading: "Dealer intent",
          body: [
            "Searches like \"pump dealership\", \"motor distributorship\" or \"appliance distributor\" in target states, with landing pages explaining margins, support and how to apply.",
          ],
        },
        {
          heading: "Language and region",
          body: [
            "Ads and pages in Hindi, Marathi, Telugu or Kannada, aimed at the states you're expanding into.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Dealer ads bring end customers",
          cause: "Keywords aren't dealer-specific.",
          steps: [
            "Use dealership keywords",
            "Explain dealer benefits",
            "Exclude retail searches",
          ],
        },
        {
          symptom: "We can't evaluate dealer enquiries",
          cause: "Forms don't ask the right questions.",
          steps: [
            "Ask for current business and location",
            "Score enquiries",
            "Route to regional managers",
          ],
        },
      ],
      checklist: [
        "Campaigns target dealership searches",
        "Pages explain dealer benefits",
        "Enquiries are scored",
        "Ads run in regional languages",
      ],
      faqs: [
        {
          question: "Can you also run consumer ads?",
          answer: "Yes, separately, for direct sales.",
        },
        {
          question: "Which states should we start with?",
          answer: "Those adjoining your strong regions, then outward.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Coimbatore — YouTube Demos for Industrial Brands",
      metaDescription:
        "Social media marketing in Coimbatore for pump, motor and machinery brands: YouTube and Instagram demos, installation videos and dealer content in Tamil and Hindi.",
      h1: "Social media for Coimbatore's industrial and appliance brands",
      card: "YouTube demos and installation videos for industrial brands.",
      intro: [
        "Farmers, electricians and small business owners research pumps, motors and machines on YouTube before buying. Demo, installation and comparison videos influence decisions, and most Coimbatore brands have few or none.",
        "We plan and publish product videos on YouTube and Instagram, including demos, installation guides and customer stories, in Tamil, Hindi and other languages.",
      ],
      sections: [
        {
          heading: "Videos that answer questions",
          body: [
            "How to choose, install and maintain your products, filmed by your team or a local videographer, edited and published by us.",
          ],
        },
        {
          heading: "Content dealers can share",
          body: [
            "Short videos dealers share with customers on WhatsApp, which build trust in your brand at the point of sale.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers watch competitors' demo videos",
          cause: "We have no video content.",
          steps: [
            "Film product demos",
            "Publish installation guides",
            "Optimise for YouTube search",
          ],
        },
        {
          symptom: "Dealers have nothing to show customers",
          cause: "No shareable content.",
          steps: [
            "Create short dealer videos",
            "Share them in regional languages",
            "Update with new products",
          ],
        },
      ],
      checklist: [
        "Each key product has a demo video",
        "Installation guides are published",
        "Videos are in regional languages",
        "Dealers can share them",
      ],
      faqs: [
        {
          question: "Do you film the videos?",
          answer: "Your team or a local videographer films from our brief; we edit and publish.",
        },
        {
          question: "Can you optimise our YouTube channel?",
          answer: "Yes, titles, descriptions and playlists.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Coimbatore — Technical Assistants for Dealers",
      metaDescription:
        "AI automation in Coimbatore for manufacturers: WhatsApp assistants that answer dealers' and electricians' technical questions from your manuals, in Tamil and Hindi.",
      h1: "AI automation for Coimbatore brands answering dealers' technical questions",
      card: "WhatsApp assistants answering technical questions from manuals.",
      intro: [
        "Dealers and electricians call your service team with the same questions every day: wiring, capacitor values, installation depth, error codes. The answers are in your manuals, but nobody reads manuals.",
        "We build AI assistants that answer technical questions on WhatsApp from your own manuals and datasheets, in Tamil, Hindi and English, and escalate anything complex to your engineers.",
      ],
      sections: [
        {
          heading: "Answers from your documents",
          body: [
            "The assistant uses only your manuals, datasheets and service notes, cites the source and says when it doesn't know.",
          ],
        },
        {
          heading: "Engineers for the hard cases",
          body: [
            "Complex or safety-related questions go straight to your service team with the conversation history.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Service lines are flooded with basic questions",
          cause: "Manuals aren't easy to use.",
          steps: [
            "Build an assistant from manuals",
            "Answer on WhatsApp",
            "Escalate complex issues",
          ],
        },
        {
          symptom: "Answers vary between service staff",
          cause: "No single source.",
          steps: [
            "Use one knowledge base",
            "Cite sources in answers",
            "Update when products change",
          ],
        },
      ],
      checklist: [
        "Answers come from your documents",
        "Sources are cited",
        "Complex cases go to engineers",
        "Multiple languages are supported",
      ],
      faqs: [
        {
          question: "What if the assistant is wrong?",
          answer: "It answers only from your documents and escalates when unsure; we review answers regularly.",
        },
        {
          question: "Can it read scanned manuals?",
          answer: "Yes, we convert them first.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Coimbatore — Production Monitoring for Spinning Mills",
      metaDescription:
        "Custom software in Coimbatore for spinning mills: shift-wise production, efficiency, waste, quality tests and dispatch tracked in one system with dashboards.",
      h1: "Custom software for Coimbatore spinning mills",
      card: "Shift-wise production, efficiency, quality and dispatch.",
      intro: [
        "Spinning mills run around the clock, and margins depend on efficiency, waste and quality. Many mills still record production on paper per shift and see efficiency only at month end, when it's too late to act.",
        "We build production monitoring systems that record output, efficiency, waste and quality tests by shift and machine, with dashboards for managers.",
      ],
      sections: [
        {
          heading: "Shift by shift",
          body: [
            "Production and stoppages recorded per shift and machine, efficiency calculated automatically and losses highlighted the same day.",
          ],
        },
        {
          heading: "Quality and dispatch",
          body: [
            "Test results linked to lots, and dispatch tracked against orders.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We find efficiency problems at month end",
          cause: "Data is compiled from paper.",
          steps: [
            "Record shift data digitally",
            "Calculate efficiency daily",
            "Alert on drops",
          ],
        },
        {
          symptom: "Quality complaints can't be traced",
          cause: "Tests aren't linked to lots.",
          steps: [
            "Link tests to lots",
            "Record dispatch per lot",
            "Search history quickly",
          ],
        },
      ],
      checklist: [
        "Production is recorded per shift",
        "Efficiency is calculated daily",
        "Quality tests link to lots",
        "Dispatch is tracked",
      ],
      faqs: [
        {
          question: "Can it read data from machines?",
          answer: "Where machines provide data, yes; otherwise supervisors enter it on tablets.",
        },
        {
          question: "Can it connect to our ERP?",
          answer: "Yes, through APIs or exports.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "api-integration": {
      metaTitle: "API Integration in Coimbatore — Connect Loyalty, ERP & UPI Payouts",
      metaDescription:
        "API integration in Coimbatore for manufacturers: connect loyalty apps, ERP, dealer systems and UPI payout providers so rewards and sales data flow automatically.",
      h1: "API integration for Coimbatore brands running dealer and loyalty programmes",
      card: "Connect loyalty apps, ERP, dealer systems and UPI payouts.",
      intro: [
        "Brands running dealer and electrician programmes need many systems to work together: product codes from the factory, loyalty scans, dealer sales, ERP and UPI payout providers. Gaps mean delayed rewards and unreliable data.",
        "We connect them so codes, scans, sales and payouts flow automatically.",
      ],
      sections: [
        {
          heading: "From factory to reward",
          body: [
            "Unique codes generated with production batches, linked in ERP, scanned in the field and rewarded through UPI payouts, with every step logged.",
          ],
        },
        {
          heading: "Data for sales planning",
          body: [
            "Scans and dealer sales by region feed reports for the sales team.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Rewards are paid weeks late",
          cause: "Payouts are processed manually.",
          steps: [
            "Connect a UPI payout provider",
            "Pay automatically after validation",
            "Notify recipients",
          ],
        },
        {
          symptom: "Scan data doesn't match production",
          cause: "Codes aren't linked to batches.",
          steps: [
            "Generate codes per batch",
            "Link them in ERP",
            "Validate on scan",
          ],
        },
      ],
      checklist: [
        "Codes link to production batches",
        "Rewards pay automatically",
        "Scan data reaches sales reports",
        "Every step is logged",
      ],
      faqs: [
        {
          question: "Which payout providers do you use?",
          answer: "Established Indian payout providers; we choose with you.",
        },
        {
          question: "Can you connect SAP Business One?",
          answer: "Yes, and most ERPs.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Coimbatore — Move Mill & Factory ERP to the Cloud",
      metaDescription:
        "Cloud services in Coimbatore for mills and factories: move on-premise ERP and files to secure cloud hosting with backups, remote access and predictable costs.",
      h1: "Cloud migration for Coimbatore mills and factories",
      card: "Move on-premise ERP and files to secure cloud hosting.",
      intro: [
        "Many Coimbatore mills and factories run ERP and accounting on a server in the office. Power cuts, hardware failures and the need for owners to check figures from home make that set-up a risk.",
        "We move ERP, accounting and files to secure cloud hosting in India with backups, remote access and predictable monthly costs.",
      ],
      sections: [
        {
          heading: "Reliable and remote",
          body: [
            "ERP and files available from the factory, office and home, with individual logins and multi-factor authentication.",
          ],
        },
        {
          heading: "Backed up",
          body: [
            "Daily backups to a separate location, tested by restoring them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Power cuts stop our ERP",
          cause: "It runs on a local server.",
          steps: [
            "Move ERP to the cloud",
            "Access it from anywhere",
            "Remove the local dependency",
          ],
        },
        {
          symptom: "Owners can't see figures when travelling",
          cause: "Systems are only accessible on-site.",
          steps: [
            "Enable secure remote access",
            "Use individual logins",
            "Add dashboards",
          ],
        },
      ],
      checklist: [
        "ERP is accessible remotely and securely",
        "Backups are tested",
        "Each user has a login",
        "Monthly costs are known",
      ],
      faqs: [
        {
          question: "Can Tally run on the cloud?",
          answer: "Yes, through supported cloud options.",
        },
        {
          question: "Do you handle factory networks?",
          answer: "No, a local IT provider suits that better.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Coimbatore — Product Catalogues & Dealer Lists Kept Current",
      metaDescription:
        "Website maintenance in Coimbatore for manufacturers: new models, specifications, dealer lists and datasheets kept current, plus security, backups and monitoring.",
      h1: "Website maintenance for Coimbatore manufacturers with changing catalogues",
      card: "New models, dealer lists and datasheets kept current.",
      intro: [
        "Manufacturers launch models, update specifications and add or lose dealers constantly. When the website falls behind, customers find discontinued products and dealers who no longer stock you.",
        "Our maintenance plans keep catalogues, datasheets and dealer lists current, alongside updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Catalogue and dealers",
          body: [
            "New models and datasheets published, discontinued ones redirected and dealer lists updated within one working day.",
          ],
        },
        {
          heading: "Technical care",
          body: [
            "Updates, security monitoring, daily backups and uptime alerts.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers call dealers who've stopped stocking us",
          cause: "The dealer list is outdated.",
          steps: [
            "Review dealers quarterly",
            "Update the locator",
            "Remove inactive dealers",
          ],
        },
        {
          symptom: "New models aren't on the website",
          cause: "Uploading is nobody's job.",
          steps: [
            "Send specs and photos",
            "We publish within a day",
            "Announce on social",
          ],
        },
      ],
      checklist: [
        "New models are online",
        "Dealer lists are current",
        "Datasheets are latest versions",
        "Backups run daily",
      ],
      faqs: [
        {
          question: "Can you update Tamil pages?",
          answer: "Yes, with text from your team or a Tamil writer.",
        },
        {
          question: "How fast are changes made?",
          answer: "Within one working day.",
        },
      ],
    },
  },
}
