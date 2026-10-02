import type { AuCity } from "./types"
import { AWST } from "./zones"

export const perth: AuCity = {
  slug: "perth",
  name: "Perth",
  state: "Western Australia",
  stateCode: "WA",
  summary: "Resources, engineering and the businesses around them, in the Australian time zone closest to ours.",
  zone: { std: AWST },
  areas: ["Perth CBD", "West Perth", "Fremantle", "Joondalup", "Subiaco", "Osborne Park", "Malaga", "Welshpool", "Canning Vale", "Midland", "Rockingham", "Mandurah", "Armadale", "Scarborough"],
  nearby: ["adelaide", "darwin", "melbourne"],
  page: {
    metaTitle: "Websites, Software & SEO for Perth and WA Businesses",
    metaDescription:
      "Websites that pass procurement checks, field software for remote sites, and SEO and ecommerce for Perth businesses, from a team whose day overlaps Perth's best.",
    h1: "Helping Perth businesses win work, and run it, from the most isolated capital on earth",
    intro: [
      "Perth's economy is built around resources: iron ore, gas, gold, lithium and the engineering, mining services, logistics and safety firms that support them. A lot of the selling here is business to business, decided by procurement teams who check a supplier's website and capability statement before they ever pick up the phone.",
      "We help Perth businesses with that, and with what comes after: field software for remote sites, connected systems and online stores that make sense of WA freight. We work remotely from India, and of every Australian capital, Perth's working day overlaps ours the most.",
    ],
    sections: [
      {
        heading: "Most of the work is B2B, and it's checked",
        body: [
          "A mining services contractor or engineering firm rarely wins work from a Google search alone. What happens is that a procurement officer, project manager or prime contractor looks you up after hearing your name, and decides in a few minutes whether you look like a serious, safe, capable supplier.",
          "That makes the website part of every tender, even when it's never mentioned. The same goes for how fast you respond, how clear your capability statement is, and whether your certifications are current and easy to find.",
        ],
      },
      {
        heading: "Perth hours are our best hours",
        body: [
          "Perth is two and a half hours ahead of India and does not use daylight saving. Our day runs 12:30 to 21:30 Perth time, Monday to Saturday, so we are available for most of your afternoon and can usually take a call within your working day.",
        ],
      },
    ],
    industries: [
      { name: "Mining and resources services", need: "Contractors and suppliers need capability statements, safety records and certifications presented the way procurement reads them." },
      { name: "Engineering and industrial", need: "Firms need project case studies, pages for each discipline and enquiry forms that reach the right estimator." },
      { name: "Trades and home services", need: "Across the northern and southern suburbs, work comes from Google Maps, reviews and fast replies." },
      { name: "Retail and ecommerce", need: "WA brands need freight that doesn't wreck margins, and WA buyers want to know stock ships from Perth." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Procurement teams look us up and we don't look like a serious supplier",
        cause: "The site is old, vague about capability and missing current certifications, safety performance and project evidence.",
        steps: [
          "Rebuild the site around capability by discipline and region",
          "Show certifications, insurances and safety systems clearly",
          "Offer an up-to-date capability statement to download",
        ],
      },
      {
        service: "software-development",
        symptom: "Our site paperwork is still on paper",
        cause: "Inductions, prestarts, permits and timesheets are filled in by hand on remote sites and typed in back in Perth.",
        steps: [
          "Digitise the forms used most, starting with prestarts",
          "Make them work offline and sync when back in range",
          "Feed the data into reporting and payroll automatically",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "WA customers won't wait for east coast shipping times",
        cause: "Buyers assume online stores ship from the east, so they go to a local shop or a big chain instead.",
        steps: [
          "Say clearly that you ship from Perth, on every product page",
          "Offer fast metro delivery and click and collect",
          "Price regional WA freight properly by postcode",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Tender documents take our team days to digest",
        cause: "Requirements, dates and obligations are spread across long documents in different formats.",
        steps: [
          "Extract requirements into a structured checklist",
          "Flag unusual or risky clauses for review",
          "Reuse answers from past tenders where they fit",
        ],
      },
      {
        service: "api-integration",
        symptom: "Our field tool, ERP and accounts don't talk",
        cause: "Each system was bought for one job, and staff re-key data between them after each swing.",
        steps: [
          "Map the data that has to move between systems",
          "Connect them with logged, monitored integrations",
          "Remove the manual re-entry steps one by one",
        ],
      },
      {
        service: "seo",
        symptom: "People in Joondalup and Mandurah never find us",
        cause: "Perth stretches a long way north to south, and Google favours businesses close to each searcher.",
        steps: [
          "Set a service area that matches where you really work",
          "Build pages for the corridors you want work in",
          "Collect reviews from customers across the metro area",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Perth?",
        answer: "No. We are in Lucknow and Mumbai, India, and work with Perth businesses remotely. Perth is the Australian city where our hours overlap most, so working remotely tends to feel close to local.",
      },
      {
        question: "What hours are you available in Perth?",
        answer: "12:30 to 21:30 Perth time, Monday to Saturday, all year. WA has no daylight saving, so this never changes.",
      },
      {
        question: "Do you understand resources-sector procurement?",
        answer: "We understand what procurement teams look for on a supplier's website and in a capability statement, and we have built a procurement marketplace. We do not claim inside experience of any particular operator's vendor process.",
      },
      {
        question: "Can you work with our safety and compliance requirements?",
        answer: "Yes. Tell us your requirements, such as data handling, access control and documentation, and we scope the work to meet them. If something is beyond what we can provide, we will say so.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Perth — Sites That Pass a Procurement Check",
      metaDescription:
        "Website development for Perth mining services, engineering and industrial firms: capability, safety and certifications presented the way procurement teams read them.",
      h1: "Website development for Perth firms whose website is checked before every contract",
      card: "Sites that answer a procurement team's checklist on the first visit.",
      intro: [
        "When a mining, energy or engineering firm shortlists suppliers, someone in procurement looks each one up. They are not browsing. They are checking: what you do, where you've done it, your safety performance, your certifications and insurances, and whether you look established enough to trust on their site.",
        "We build websites for Perth contractors and industrial firms that answer that checklist on the first visit, and make it easy to send the right enquiry to the right person.",
      ],
      sections: [
        {
          heading: "What procurement looks for",
          body: [
            "Capability by discipline, with examples of projects, clients where you're allowed to name them, and regions. Certifications such as ISO 9001, 45001 and 14001 shown with their scope. Safety systems and performance. Insurances. A capability statement that is current and downloadable as a PDF.",
            "We structure the site so each of those is one click from the homepage, because procurement officers often have a list to work through, and missing information can quietly drop you from a shortlist.",
          ],
        },
        {
          heading: "Keeping it current",
          body: [
            "Certifications expire, project lists grow and safety statistics change. We build editing screens for exactly those things, so your team can update them in minutes and the website never contradicts your latest tender.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website undersells what we actually do",
          cause: "It was written years ago, before you added disciplines, regions and bigger clients.",
          steps: [
            "Audit current capabilities against what the site says",
            "Create a page for each discipline with project evidence",
            "Lead with the work and scale you want more of",
          ],
        },
        {
          symptom: "Our certifications page is out of date",
          cause: "Updating it means asking a developer, so it gets forgotten.",
          steps: [
            "Build an editable certifications and insurances section",
            "Show scope and expiry dates clearly",
            "Remind the team before anything expires",
          ],
        },
      ],
      checklist: [
        "Each discipline you offer has its own page with project examples",
        "Certifications on the site are current, with their scope",
        "Your capability statement can be downloaded from the homepage",
        "Enquiries go to the right estimator or manager automatically",
        "The site works on a phone, where many first checks happen",
      ],
      faqs: [
        {
          question: "Can you write our capability statement too?",
          answer: "We can structure and design it from your information, so it matches the website. The facts, figures and claims must come from you.",
        },
        {
          question: "What if we can't name our clients?",
          answer: "Common in this sector. We describe projects by type, scale, region and outcome without naming the operator, which is still persuasive.",
        },
        {
          question: "Can we meet in Perth?",
          answer: "No, we work remotely. But Perth gets the best overlap with our hours: we are available from 12:30 to 21:30 Perth time.",
        },
      ],
      caseStudies: ["hcbengineering", "cleanship"],
    },
    "web-design": {
      metaTitle: "Web Design in Perth — Industrial Firms That Look Their Size",
      metaDescription:
        "Web design for Perth engineering and industrial firms: credible, modern design built around real site photography, clear capability and straightforward enquiry paths.",
      h1: "Web design for Perth industrial firms that look smaller online than on site",
      card: "Credible industrial design built around real site photography.",
      intro: [
        "Many Perth engineering and industrial firms do impressive work on site and look dated online: stock photos of hard hats, a slideshow from another decade and text that could describe any company. Against larger competitors with recent sites, that makes you look like the smaller, riskier choice.",
        "We design sites that look as capable as your work, built around your own project photography, clear structure and a confident, plain tone.",
      ],
      sections: [
        {
          heading: "Real sites, real people",
          body: [
            "Nothing builds credibility like your own crews, equipment and finished work. We'll tell you exactly which shots each page needs, and we design around them, along with simple diagrams or numbers where they help explain scale.",
          ],
        },
        {
          heading: "Plain, confident, easy to scan",
          body: [
            "Industrial buyers scan. Headings say what you do, short paragraphs say how, and every page has a clear next step: request a capability statement, talk to an estimator or see projects like this one.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site is full of stock photos",
          cause: "No one gathered project photography when the site was built.",
          steps: [
            "Collect existing project photos from site teams",
            "Brief a photographer on the gaps",
            "Redesign pages around real imagery",
          ],
        },
        {
          symptom: "Visitors can't tell what makes us different",
          cause: "The copy lists generic values like quality, safety and innovation that every competitor also claims.",
          steps: [
            "Find the specifics: niche capability, regions, equipment",
            "Lead with those on every key page",
            "Back each claim with a project or number",
          ],
        },
      ],
      checklist: [
        "Your homepage shows your own crews or work, not stock",
        "A visitor can tell your specialities within five seconds",
        "Each page ends with a clear next step",
        "The design works on a phone",
      ],
      faqs: [
        {
          question: "Do we need a new logo first?",
          answer: "Usually not. We work with your existing identity and refine how it's applied on the web.",
        },
        {
          question: "Can you design our tender documents to match?",
          answer: "We can create templates for capability statements and proposals that match the website's design.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Perth — Ships From WA, and Says So",
      metaDescription:
        "Ecommerce development for Perth retailers and WA brands: stores that lead with local shipping, price regional WA freight properly and sell east without losing margin.",
      h1: "Ecommerce development for WA brands whose customers are tired of waiting for the east coast",
      card: "Online stores that sell the advantage of shipping from Perth.",
      intro: [
        "Perth shoppers know that a lot of online stores ship from Sydney or Melbourne, and that delivery can take a week. A store that ships from Perth has an advantage, but only if it says so clearly and delivers on it.",
        "We build online stores for WA retailers and brands that make local shipping a selling point, price regional WA freight properly, and sell to the east coast without losing margin on every order.",
      ],
      sections: [
        {
          heading: "Make local delivery a reason to buy",
          body: [
            "\"Ships from Perth\" on product pages and at checkout. Fast metro delivery and click and collect. Delivery estimates by postcode. These are simple changes, and for WA buyers they can decide between you and a national chain.",
          ],
        },
        {
          heading: "Regional WA and the east coast",
          body: [
            "Freight to the Pilbara, the Kimberley or the Goldfields can cost far more than metro delivery, and shipping east isn't cheap either. We set rates by zone or postcode, and a free-shipping threshold that protects your margin, so remote orders don't quietly lose you money.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Regional orders lose us money",
          cause: "One flat shipping rate covers every postcode, whatever it costs to get there.",
          steps: [
            "Compare what you charge with actual freight costs by zone",
            "Set shipping rates by zone or postcode",
            "Raise or adjust the free-shipping threshold",
          ],
        },
        {
          symptom: "Perth buyers choose big chains over us",
          cause: "They don't realise you're local and can deliver faster.",
          steps: [
            "Show \"ships from Perth\" on every product",
            "Offer click and collect and fast metro delivery",
            "Show delivery estimates before checkout",
          ],
        },
      ],
      checklist: [
        "Your store says clearly that it ships from Perth",
        "Freight to regional WA is priced separately",
        "Customers see a delivery estimate before checkout",
        "Click and collect is available",
      ],
      faqs: [
        {
          question: "Can you connect couriers that service regional WA?",
          answer: "Yes. We connect Australia Post, StarTrack and other carriers with WA coverage, and can set different carriers for different zones.",
        },
        {
          question: "Which platform do you recommend?",
          answer: "Shopify for most WA retailers. WooCommerce or a custom build when content or catalogue rules need it. We explain the choice in the scope.",
        },
      ],
      caseStudies: ["krushidoctor", "deetoo"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Perth — Local Delivery & Pickup Set Up Right",
      metaDescription:
        "Shopify developers for Perth stores: local delivery zones, pickup, regional WA rates and a fast, clean theme that sells the advantage of being local.",
      h1: "Shopify development for Perth stores that want to beat the east coast on delivery",
      card: "Shopify with local delivery, pickup and regional WA rates.",
      intro: [
        "Shopify has the tools Perth stores need to compete on delivery, including local delivery zones, store pickup and carrier-calculated rates, but most stores leave them unconfigured and charge everyone the same national rate.",
        "We set up Shopify stores for Perth businesses with delivery done properly, a theme that loads quickly, and the apps you need and no more.",
      ],
      sections: [
        {
          heading: "Delivery set up for WA",
          body: [
            "Local delivery by postcode with your own drivers or a courier, store pickup with ready notifications, and carrier rates for regional WA and interstate. Delivery promises are shown on product pages, where they influence the decision, not just at checkout.",
          ],
        },
        {
          heading: "Lean and fast",
          body: [
            "We start from a well-built theme, add only the apps that earn their place, and build simple features into the theme instead of adding more apps. The store stays fast and the monthly bill stays down.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our Shopify delivery settings are a mess",
          cause: "Rates were added over time without a plan, and some zones are over- or under-charged.",
          steps: [
            "Map actual freight costs by zone",
            "Rebuild delivery profiles and zones from scratch",
            "Test checkout for metro, regional and interstate addresses",
          ],
        },
        {
          symptom: "Customers ask if we have stock in store",
          cause: "The store doesn't show local pickup availability.",
          steps: [
            "Turn on pickup with location stock",
            "Show availability on product pages",
            "Send ready-for-pickup notifications",
          ],
        },
      ],
      checklist: [
        "Perth metro customers see a local delivery option",
        "Store pickup is available at checkout",
        "Regional WA and interstate rates are tested",
        "You know what each installed app does",
      ],
      faqs: [
        {
          question: "Can you fix our existing Shopify store?",
          answer: "Yes. We start with an audit of delivery, apps, speed and checkout, then fix the issues in order of impact.",
        },
        {
          question: "Do you set up Shopify POS?",
          answer: "Yes, if you sell in-store as well, so stock and customers are shared across channels.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Perth — Procurement & Supplier Platforms",
      metaDescription:
        "Marketplace development for Perth: supplier, equipment hire and contractor platforms with verified vendors, requests for quote and quote comparison, from the team behind MariBiz.ai.",
      h1: "Marketplace development for Perth's procurement-heavy industries",
      card: "Supplier and contractor platforms with RFQs and verified vendors.",
      intro: [
        "Perth is a procurement town. Mining, energy and industrial operators source equipment, parts, services and contractors constantly, often through phone calls, spreadsheets and long supplier lists. A platform that matches buyers with verified suppliers through requests for quote solves a real problem here.",
        "We built MariBiz.ai, a marine procurement marketplace with more than 3,226 verified vendors, requests for quote, quote comparison and messaging. The same pattern fits equipment hire, contractor panels and industrial services in WA.",
      ],
      sections: [
        {
          heading: "Requests for quote, not shopping carts",
          body: [
            "Industrial buying rarely fits a cart and checkout. Buyers describe what they need, verified suppliers respond with quotes, and the buyer compares them side by side. We build that flow, along with messaging, document exchange and an audit trail procurement teams can rely on.",
          ],
        },
        {
          heading: "Verified suppliers only",
          body: [
            "Supplier onboarding collects certifications, insurances and capability, with expiry tracking. Buyers see what has been verified and can filter by it.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Finding qualified suppliers takes weeks of phone calls",
          cause: "There is no central list of verified suppliers by capability and region.",
          steps: [
            "Build supplier profiles with capability, regions and documents",
            "Let buyers search and filter by verified details",
            "Send requests for quote to matching suppliers at once",
          ],
        },
        {
          symptom: "Quotes arrive in different formats and are hard to compare",
          cause: "Each supplier responds by email with their own layout.",
          steps: [
            "Collect quotes through a structured form",
            "Compare them side by side on the platform",
            "Keep a full record for audit",
          ],
        },
      ],
      checklist: [
        "You know which buyer problem your platform solves",
        "Suppliers' documents are verified before they can quote",
        "Quotes are structured so they can be compared",
        "Every decision leaves an audit trail",
      ],
      faqs: [
        {
          question: "How does this relate to MariBiz.ai?",
          answer: "MariBiz.ai is a marine procurement marketplace we built. It isn't WA-specific, but its RFQ, verification and quote-comparison patterns are the same ones a Perth industrial platform needs.",
        },
        {
          question: "Can the platform take payments?",
          answer: "Yes, but many B2B platforms work on invoices and purchase orders instead. We design payment flows around how your buyers actually pay.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Perth — Portals & Dashboards That Load Anywhere",
      metaDescription:
        "Next.js development for Perth firms: client portals, reporting dashboards and websites that stay fast even on remote-site and satellite connections.",
      h1: "Next.js development for Perth portals and dashboards used on remote connections",
      card: "Portals and dashboards built to load fast on weak connections.",
      intro: [
        "Perth firms often have staff and clients working from remote sites, where connections can be slow or satellite-based. Portals and dashboards built for city broadband become unusable there: heavy pages, long loading spinners and timeouts.",
        "We build Next.js portals, dashboards and websites that load fast on weak connections, render on the server, send only what each page needs and cache what they can.",
      ],
      sections: [
        {
          heading: "Light pages for heavy conditions",
          body: [
            "Server rendering means the page arrives ready to read, rather than waiting for large scripts to load first. Images are compressed and sized for the device. Data tables page and filter on the server. The result works on a remote connection, not just in an office in West Perth.",
          ],
        },
        {
          heading: "Client portals for contractors",
          body: [
            "Contractors and engineering firms use portals to share progress, documents, safety records and approvals with clients. We build them with role-based access, audit trails and the reports your clients actually ask for.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our portal is unusable from site",
          cause: "Pages load large scripts and data before showing anything.",
          steps: [
            "Measure performance on a throttled connection",
            "Move rendering to the server and trim scripts",
            "Page and cache large data sets",
          ],
        },
        {
          symptom: "Clients keep asking for the same reports",
          cause: "Reports are built by hand from spreadsheets each month.",
          steps: [
            "Agree a standard set of reports with clients",
            "Generate them automatically from your data",
            "Give clients secure access in a portal",
          ],
        },
      ],
      checklist: [
        "Your portal is usable on a slow mobile connection",
        "Clients can see progress without emailing you",
        "Access is limited by role",
        "Every change to key records is logged",
      ],
      faqs: [
        {
          question: "Can the portal connect to our existing systems?",
          answer: "Usually, through APIs or database connections. We review what your systems allow during scoping.",
        },
        {
          question: "Where will it be hosted?",
          answer: "In an Australian region, usually Sydney or Melbourne, as the major cloud providers do not have a full region in Perth.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Perth — Offline Field Apps for Remote Sites",
      metaDescription:
        "Android apps for Perth resources and field teams: prestarts, inspections and job records that work fully offline on rugged devices and sync back in range.",
      h1: "Android apps for Perth field teams working far from reception",
      card: "Offline-first field apps for rugged devices on remote sites.",
      intro: [
        "On WA's remote sites, reception is patchy or absent and devices take a beating. Field teams still need to complete prestarts, inspections, permits and job records. Most off-the-shelf apps assume a connection that is not there.",
        "We build native Android apps that work fully offline on rugged phones and tablets, then sync everything when the device is back in range. Android suits these fleets because you choose the hardware. If you also need iPhone, we scope a React Native build separately; we don't build native iOS.",
      ],
      sections: [
        {
          heading: "Offline first, not offline as an afterthought",
          body: [
            "All forms, reference documents and job data are stored on the device. Records are saved locally with timestamps and location, queued, and uploaded in order when a connection returns, with conflicts handled sensibly if two people edited the same record.",
          ],
        },
        {
          heading: "Built for the conditions",
          body: [
            "Large controls for gloves, high contrast for bright sun, minimal typing with pick lists and photos, and support for the scanners and cameras on rugged devices.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our field app fails without reception",
          cause: "It was built for constant connectivity.",
          steps: [
            "Store forms and data on the device",
            "Queue records and sync when back in range",
            "Show staff clearly what has and hasn't synced",
          ],
        },
        {
          symptom: "Inspection records arrive days late",
          cause: "Paper forms travel back to Perth before anyone enters them.",
          steps: [
            "Digitise the inspection forms",
            "Capture photos and signatures on the device",
            "Report on them as soon as they sync",
          ],
        },
      ],
      checklist: [
        "Field forms work with no reception at all",
        "Staff can see what is waiting to sync",
        "Photos are stored with the record they belong to",
        "Reports are available the day records sync",
      ],
      faqs: [
        {
          question: "Which devices do you support?",
          answer: "Android phones and tablets, including common rugged models. We test on your actual devices before rollout.",
        },
        {
          question: "Can the app be distributed privately?",
          answer: "Yes, through managed Google Play or your device management system, so it never appears in the public store.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Perth — B2B Industrial & Local Search",
      metaDescription:
        "SEO for Perth businesses: niche industrial and B2B searches with little competition, plus local SEO across a city that stretches from Joondalup to Mandurah.",
      h1: "SEO for Perth businesses, from niche industrial searches to the northern and southern suburbs",
      card: "B2B industrial SEO and local SEO across a long metro area.",
      intro: [
        "Perth SEO comes in two shapes. Industrial and B2B firms compete for niche searches, such as a specific inspection service, a type of fabrication or an equipment hire category, where few competitors have good pages and one well-built page can win. Local businesses compete across a metro area that stretches over a hundred kilometres from Joondalup to Mandurah.",
        "We do both: specialist pages for niche B2B searches, and local SEO that reaches the corridors you want to work in.",
      ],
      sections: [
        {
          heading: "Niche B2B searches are winnable",
          body: [
            "Search volume for specialist industrial services is low, but every search can be worth a contract. Most firms have one generic services page. A page for each specific service, written the way engineers and procurement describe it, often ranks quickly because nobody else has bothered.",
          ],
        },
        {
          heading: "Local search on a long city",
          body: [
            "For trades and services, we set your Google service area to match where you really go, build pages for the northern and southern corridors you want, and collect reviews across them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't rank for our specialist services",
          cause: "All services sit on one generic page that ranks for nothing in particular.",
          steps: [
            "List the specific services buyers search for",
            "Write a detailed page for each one",
            "Link them from the relevant capability pages",
          ],
        },
        {
          symptom: "We only get enquiries from near our base",
          cause: "Google favours businesses close to the searcher, and your site doesn't show you work further afield.",
          steps: [
            "Set your Google service area",
            "Build corridor pages with real local projects",
            "Ask customers across the metro for reviews",
          ],
        },
      ],
      checklist: [
        "Each specialist service has its own detailed page",
        "Your Google service area matches where you work",
        "You know which searches bring in B2B enquiries",
        "Your site is verified in Search Console",
      ],
      faqs: [
        {
          question: "Is SEO worth it for a B2B industrial firm?",
          answer: "Often more than people expect. Volumes are small but competition is weak and each lead can be large. We check search demand for your services before recommending it.",
        },
        {
          question: "How do you report results?",
          answer: "Monthly, in plain English: enquiries from search, the pages that brought them and the rankings behind them.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Perth — Specialist B2B and Local Campaigns",
      metaDescription:
        "Google Ads management for Perth: tightly targeted B2B campaigns for specialist services and local campaigns for WA trades, with tracking through long sales cycles.",
      h1: "Google Ads for Perth businesses where one lead can be a large contract",
      card: "Targeted B2B and local campaigns tracked through to the deal.",
      intro: [
        "For Perth industrial and B2B firms, Google Ads works differently from retail. Search volumes are small, clicks can be expensive, and a single enquiry might turn into a large contract months later. Campaigns built for consumer volume waste money here.",
        "We run tightly targeted campaigns for specialist services, keep them away from irrelevant searches and job seekers, and track enquiries through to the contracts they become.",
      ],
      sections: [
        {
          heading: "Keep the job seekers out",
          body: [
            "In WA, many industry searches come from people looking for work rather than buying services. We exclude employment-related searches from the start, so your budget goes on buyers.",
          ],
        },
        {
          heading: "Long sales cycles, properly measured",
          body: [
            "We record each enquiry's source and, with your CRM or a simple shared sheet, follow it to a quote and a contract. That shows which campaigns produce revenue, not just form fills.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads attract job seekers",
          cause: "Industry keywords overlap with employment searches.",
          steps: [
            "Add negative keywords for jobs, careers and FIFO roles",
            "Write ads that speak to buyers' problems",
            "Review the search terms report every week at first",
          ],
        },
        {
          symptom: "We can't tell if ads ever led to a contract",
          cause: "Enquiries aren't tracked past the first form.",
          steps: [
            "Tag every enquiry with its source",
            "Track enquiries to quote and contract stage",
            "Report on revenue by campaign",
          ],
        },
      ],
      checklist: [
        "Job-seeker searches are excluded from your ads",
        "Each enquiry's source is recorded",
        "You can see which campaigns led to contracts",
        "Ads point to pages for the specific service",
      ],
      faqs: [
        {
          question: "What about LinkedIn ads?",
          answer: "LinkedIn can work for reaching specific roles in resources companies, but it is expensive. We test it only where the targeting justifies the cost.",
        },
        {
          question: "How long before we know if it works?",
          answer: "For B2B with long sales cycles, give it three months to judge enquiry quality, longer to see contracts. We report on leading signals along the way.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Perth — LinkedIn for B2B, Local for Retail",
      metaDescription:
        "Social media for Perth businesses: LinkedIn for resources and engineering firms building reputation and recruiting, and Instagram and Facebook for WA retail and services.",
      h1: "Social media for Perth firms selling to industry and hiring for it",
      card: "LinkedIn for B2B and recruiting; Instagram for WA retail.",
      intro: [
        "For Perth's resources and engineering firms, social media does two jobs: building a reputation with the people who award contracts, and attracting skilled workers in a tight market. Both happen mostly on LinkedIn, and both depend on showing real projects and people.",
        "For WA retailers and services, Instagram and Facebook still drive local sales. We handle both, with content built from your real work and paid reach aimed at the right people.",
      ],
      sections: [
        {
          heading: "LinkedIn for industry",
          body: [
            "Project milestones, safety achievements, new capabilities and people stories, posted consistently from the company page and shared by your leaders. It's slow, steady reputation-building, and it supports both business development and hiring.",
          ],
        },
        {
          heading: "Recruitment that reflects the job",
          body: [
            "Skilled workers want to see the work, the rosters and the people before they apply. Real content from your sites and crews does more for recruitment than generic job ads.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our LinkedIn page hasn't posted in months",
          cause: "Nobody owns it, and project news never reaches whoever could post it.",
          steps: [
            "Set up a simple way for project teams to share updates",
            "Post them consistently from the company page",
            "Encourage leaders to share and comment",
          ],
        },
        {
          symptom: "We struggle to attract skilled workers",
          cause: "Job ads are generic and show nothing of the real work or culture.",
          steps: [
            "Post real content from sites and crews",
            "Feature people and their roles",
            "Link posts to a careers page with current roles",
          ],
        },
      ],
      checklist: [
        "Your company page posted at least twice this month",
        "Project milestones are shared publicly where allowed",
        "Your careers content shows real sites and people",
        "Your leaders share company posts",
      ],
      faqs: [
        {
          question: "Do we need client approval to post about projects?",
          answer: "Often, yes. We work within your clients' communication rules and can describe projects without naming them.",
        },
        {
          question: "Do you manage ads on LinkedIn?",
          answer: "Yes, where the targeting justifies the cost, such as for recruitment or reaching specific roles.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Perth — Tenders, Safety Reports & Compliance",
      metaDescription:
        "AI automation for Perth firms: tender documents turned into checklists, safety and incident reports summarised, and compliance paperwork processed, with people reviewing.",
      h1: "AI automation for Perth firms buried in tenders, reports and compliance paperwork",
      card: "Tenders, safety reports and compliance paperwork, processed faster.",
      intro: [
        "Resources and engineering firms in Perth handle enormous amounts of documentation: tenders hundreds of pages long, safety and incident reports, permits, inspection records and compliance evidence. Reading, summarising and filing it takes skilled people away from skilled work.",
        "We build AI tools that pull out what matters, such as requirements, dates, obligations and hazards, into structured checklists and summaries that your people review instead of reading from scratch.",
      ],
      sections: [
        {
          heading: "Tenders into checklists",
          body: [
            "Upload a tender package and get a structured list of requirements, mandatory documents, dates and evaluation criteria, each linked back to the page it came from. Your team checks it, and nothing is accepted or submitted automatically.",
          ],
        },
        {
          heading: "Data handling",
          body: [
            "Many operators have strict rules on where data goes. We build with your rules in mind: choosing AI providers and regions you approve, keeping documents in your own cloud account, and limiting what our team can access from India. If a requirement rules out the approach, we'll say so.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Tender preparation eats our estimators' time",
          cause: "Every package has to be read in full to find the requirements.",
          steps: [
            "Extract requirements into a checklist automatically",
            "Link each requirement to its source page",
            "Have estimators review and assign tasks",
          ],
        },
        {
          symptom: "Incident and inspection reports are hard to learn from",
          cause: "They are free text in different formats, so trends are invisible.",
          steps: [
            "Classify reports by type, cause and location",
            "Summarise trends monthly",
            "Flag repeat issues for action",
          ],
        },
      ],
      checklist: [
        "Tender requirements are tracked in a checklist",
        "Safety reports are categorised consistently",
        "You can see trends in incidents over time",
        "AI outputs are reviewed by a person before use",
      ],
      faqs: [
        {
          question: "Will our documents be used to train AI models?",
          answer: "No. We use providers and settings that exclude your data from training, and we document this in the scope.",
        },
        {
          question: "Can it run inside our own cloud account?",
          answer: "Often, yes. We can deploy into your AWS or Azure account so documents never leave your control.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Perth — Contractor Portals & Compliance Systems",
      metaDescription:
        "Custom software for Perth resources contractors: inductions, prestarts, permits, timesheets and compliance records in one system that works offline on site.",
      h1: "Custom software for Perth contractors whose paperwork lives in a ute",
      card: "Inductions, permits, timesheets and compliance in one system.",
      intro: [
        "Perth's resources contractors run on paperwork: inductions, prestart checklists, timesheets, permits and compliance records, often across remote sites with patchy signal. Much of it is still paper, collected at the end of a swing and typed in back in Perth.",
        "We build portals and mobile-friendly forms that work offline and sync when they reconnect, so records are complete, searchable and ready when a client or regulator asks.",
      ],
      sections: [
        {
          heading: "One record for each worker, job and site",
          body: [
            "Workers' inductions, tickets and licences with expiry dates. Prestarts and inspections by site and asset. Timesheets by job and roster. All in one system, with reports that answer the questions clients and auditors ask.",
          ],
        },
        {
          heading: "Built to be audited",
          body: [
            "Every record shows who created or changed it and when. Documents are versioned. Access depends on role. When something goes wrong, the paper trail is already there.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Workers turn up on site with expired tickets",
          cause: "Licences and inductions are tracked in spreadsheets nobody checks.",
          steps: [
            "Record every ticket and induction with its expiry",
            "Alert workers and supervisors before expiry",
            "Block rostering when something has lapsed",
          ],
        },
        {
          symptom: "Timesheets don't match rosters or invoices",
          cause: "Hours are recorded on paper and reconciled by hand.",
          steps: [
            "Capture hours by job in a mobile form",
            "Compare against rosters automatically",
            "Feed approved hours to payroll and invoicing",
          ],
        },
      ],
      checklist: [
        "You can list every worker's tickets and expiry dates",
        "Prestarts are recorded digitally by asset",
        "Timesheets reconcile with rosters automatically",
        "Every record shows who changed it and when",
      ],
      faqs: [
        {
          question: "Why not use an off-the-shelf contractor management system?",
          answer: "Often you should. Custom software is worth it when your clients' requirements, rosters or reporting don't fit the standard products. We compare honestly.",
        },
        {
          question: "Where is the data stored?",
          answer: "In your own cloud account in an Australian region, with access controls you set.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Perth — Connect Field Tools, ERP & Accounting",
      metaDescription:
        "API integration for Perth firms: connect field service tools, rostering, ERP and accounting so jobs, hours and invoices move without re-keying after every swing.",
      h1: "API integration for Perth firms re-keying data after every swing",
      card: "Connect field tools, rostering, ERP and accounting.",
      intro: [
        "Perth firms often run a field service tool, a rostering system, an ERP and an accounting package, each chosen for a good reason, and none of them talking to the others. After every swing, someone re-keys hours, jobs and materials, and errors creep in.",
        "We connect those systems so jobs, hours and invoices move automatically, with logs and alerts so nothing fails silently.",
      ],
      sections: [
        {
          heading: "Mapping comes first",
          body: [
            "Before any code, we map each piece of data: where it starts, where it needs to go and who owns it. That map often shows that steps can be removed entirely, not just automated.",
          ],
        },
        {
          heading: "Reliable by design",
          body: [
            "Integrations retry when a system is unavailable, log every transaction and alert a named person when something needs attention. You can see what moved, when and where.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Hours are entered into three systems",
          cause: "Rostering, timesheets and payroll are separate.",
          steps: [
            "Choose the system of record for hours",
            "Sync approved hours to payroll and invoicing",
            "Report differences instead of hiding them",
          ],
        },
        {
          symptom: "Materials used on jobs never reach the invoice",
          cause: "Field records and invoicing aren't connected.",
          steps: [
            "Record materials against jobs in the field",
            "Send them to the ERP or accounting automatically",
            "Flag jobs closed without materials recorded",
          ],
        },
      ],
      checklist: [
        "Approved hours reach payroll without re-keying",
        "Materials used on jobs appear on invoices",
        "Integrations alert someone when they fail",
        "You know which system holds the master copy of each record",
      ],
      faqs: [
        {
          question: "Can you integrate with older on-premise systems?",
          answer: "Often, through a database connection, file exchange or a small connector service. We assess the options during scoping.",
        },
        {
          question: "Who maintains integrations afterwards?",
          answer: "We can, on a support plan, and everything is documented so another team could too.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Perth — Hosting & Sync for Remote Operations",
      metaDescription:
        "Cloud set-up for Perth businesses with remote operations: offline-friendly sync, Australian data regions, backups and access control for site and office teams.",
      h1: "Cloud set-up for Perth businesses running operations far from the office",
      card: "Cloud and sync built for remote sites and Australian data rules.",
      intro: [
        "Perth businesses with remote operations need cloud systems that tolerate poor connectivity: files that sync when they can, apps that work offline, and data that stays in Australia when clients require it.",
        "We set up cloud hosting, storage and sync for Perth firms with remote teams, along with backups, access control and costs you can predict.",
      ],
      sections: [
        {
          heading: "Where the data lives",
          body: [
            "The major cloud providers run their Australian regions in Sydney and Melbourne. We host there, document it, and set up access so site, office and client users see only what they should.",
          ],
        },
        {
          heading: "Designed for patchy connections",
          body: [
            "Large files are transferred in chunks that resume after dropouts. Apps cache what staff need on site. Sync is scheduled for when connections are available, rather than assuming they always are.",
          ],
        },
      ],
      problems: [
        {
          symptom: "File uploads from site keep failing",
          cause: "Uploads restart from scratch whenever the connection drops.",
          steps: [
            "Use resumable uploads",
            "Compress files on the device first",
            "Queue uploads for when a connection is available",
          ],
        },
        {
          symptom: "Nobody knows who has access to what",
          cause: "Accounts were added over years without a review.",
          steps: [
            "Audit every user and permission",
            "Set access by role",
            "Remove accounts automatically when people leave",
          ],
        },
      ],
      checklist: [
        "Uploads from site resume after a dropout",
        "Access is reviewed at least twice a year",
        "Backups are tested by restoring them",
        "Your data's location is documented",
      ],
      faqs: [
        {
          question: "Is there a cloud region in Perth?",
          answer: "The major providers' full Australian regions are in Sydney and Melbourne. For most uses, latency from Perth is fine. We'll discuss it if you have specific needs.",
        },
        {
          question: "Can you help with Microsoft 365 or Google Workspace?",
          answer: "We focus on hosting, apps and data. For workplace IT like email and devices, a local IT provider is usually the better fit, and we can work alongside them.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Perth — Keep Capability & Safety Info Current",
      metaDescription:
        "Website maintenance for Perth firms: certifications, projects and capability statements kept current, plus updates, security, backups and monitoring.",
      h1: "Website maintenance for Perth firms whose website must match their latest tender",
      card: "Certifications, projects and capability kept current, plus upkeep.",
      intro: [
        "For a Perth contractor, an outdated website is a risk: an expired certification, an old safety statistic or a capability statement from three years ago can contradict a tender and raise doubts.",
        "Our maintenance plans keep that information current, along with the technical upkeep that keeps the site secure and online.",
      ],
      sections: [
        {
          heading: "Content that has to be right",
          body: [
            "Send us renewed certificates, new project summaries or an updated capability statement, and they are live within one working day. Each quarter we send a short reminder listing what may need refreshing.",
          ],
        },
        {
          heading: "Security and uptime",
          body: [
            "Updates tested before release, security monitoring, daily off-site backups and uptime alerts. For firms whose clients scrutinise suppliers' security, we document what we do.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website contradicts our tender documents",
          cause: "Certifications and figures were updated in tenders but never on the site.",
          steps: [
            "Audit the site against your latest capability statement",
            "Update certifications, figures and projects",
            "Set a quarterly review reminder",
          ],
        },
        {
          symptom: "A client asked about our website's security and we couldn't answer",
          cause: "Nobody knows how the site is hosted, updated or backed up.",
          steps: [
            "Document hosting, updates and backups",
            "Add monitoring and an SSL check",
            "Keep a short security summary ready to send",
          ],
        },
      ],
      checklist: [
        "Certifications on the site match your current ones",
        "Your capability statement on the site is the latest version",
        "You can describe how your site is backed up",
        "Software was updated in the last month",
      ],
      faqs: [
        {
          question: "Can you take over a site built by another agency?",
          answer: "Yes. We recover access, audit the site and tell you plainly what condition it's in.",
        },
        {
          question: "How fast are urgent changes made?",
          answer: "During our hours, 12:30 to 21:30 Perth time, urgent changes and outages are handled straight away.",
        },
      ],
    },
  },
}
