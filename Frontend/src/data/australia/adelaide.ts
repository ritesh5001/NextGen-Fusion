import type { AuCity } from "./types"
import { ACDT, ACST } from "./zones"

export const adelaide: AuCity = {
  slug: "adelaide",
  name: "Adelaide",
  state: "South Australia",
  stateCode: "SA",
  summary: "Wine, food, defence and health, with producers who sell nationally from a city that buys locally.",
  zone: { std: ACST, dst: ACDT },
  areas: ["Adelaide CBD", "North Adelaide", "Norwood", "Unley", "Glenelg", "Prospect", "Port Adelaide", "Mawson Lakes", "Salisbury", "Marion", "Elizabeth", "Mount Barker", "Barossa Valley", "McLaren Vale"],
  nearby: ["melbourne", "perth", "darwin"],
  page: {
    metaTitle: "Websites, Online Sales & Marketing for Adelaide Businesses",
    metaDescription:
      "Help for Adelaide and South Australian businesses: wine and food stores, defence-ready supplier sites, local SEO and automation, to grow beyond a loyal home market.",
    h1: "Helping Adelaide businesses grow beyond a loyal home market",
    intro: [
      "Adelaide punches above its size in a few industries: wine from the Barossa, McLaren Vale, Clare Valley and Adelaide Hills; food and produce; a defence and shipbuilding industry with a long supply chain; and health, aged care and education.",
      "The city is loyal and word of mouth travels fast, which is great for a local business and limiting for one that wants to grow. We help South Australian businesses take the next step, usually selling to the rest of the country, and that's mostly an online problem. We work remotely from India, with no office in Adelaide.",
    ],
    sections: [
      {
        heading: "Known locally, invisible interstate",
        body: [
          "Many of Adelaide's best businesses are household names within twenty kilometres and unknown in Melbourne or Brisbane. A cellar door that's packed on weekends sells little online. A specialist manufacturer that defence primes rely on has a website that says almost nothing.",
          "The fix is rarely a big campaign. It's an online store that sells as well as the cellar door does, a website that explains your capability to someone who's never heard of you, and search visibility beyond the people who already know your name.",
        ],
      },
      {
        heading: "Our hours in Adelaide",
        body: [
          "South Australia is four hours ahead of India, five during daylight saving. Our day runs 14:00 to 23:00 Adelaide time (15:00 to 00:00 in daylight saving), Monday to Saturday.",
        ],
      },
    ],
    industries: [
      { name: "Wine and food producers", need: "Cellar doors and producers need online sales, wine clubs and age checks that work within their licence." },
      { name: "Defence and advanced manufacturing", need: "Suppliers need sites that show certifications, capabilities and security credentials to primes and procurement." },
      { name: "Health and aged care", need: "Providers need clear service pages, enquiry flows families can use and careful handling of personal information." },
      { name: "Local services and retail", need: "Businesses across the suburbs need to win their local search and keep reviews coming." },
    ],
    problems: [
      {
        service: "ecommerce-development",
        symptom: "Our cellar door is busy but online sales are tiny",
        cause: "Visitors love the wine on the day, but nothing turns that visit into an online customer afterwards, and the online store is hard to use.",
        steps: [
          "Capture emails at the cellar door with a reason to sign up",
          "Make reordering online quick, with mixed dozens and fair freight",
          "Follow up after the visit with an offer for what they tasted",
        ],
      },
      {
        service: "website-development",
        symptom: "Defence primes don't know what we can do",
        cause: "The website is vague about capability, certifications and past programmes, so you're missed when suppliers are being scoped.",
        steps: [
          "Describe capabilities in the terms primes search for",
          "Show certifications and security memberships clearly",
          "Provide a current capability statement to download",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Running the wine club takes hours every release",
        cause: "Members, preferences and payments are tracked in spreadsheets, and every release is processed by hand.",
        steps: [
          "Move members to a subscription system tied to the store",
          "Let members manage preferences and card details themselves",
          "Process each release in a batch with automatic emails",
        ],
      },
      {
        service: "seo",
        symptom: "Wine tourists plan their trip and don't find our cellar door",
        cause: "Trip-planning searches go to tourism sites and the better-known names.",
        steps: [
          "Complete your Google profile with hours, tastings and photos",
          "Build pages for experiences: tastings, lunches, tours",
          "Get listed on the regional tourism sites that rank",
        ],
      },
      {
        service: "web-design",
        symptom: "Families can't find what they need on our aged care website",
        cause: "The site is organised around the provider's structure, not the questions families have.",
        steps: [
          "List the questions families ask first",
          "Organise the site around those questions",
          "Make contact and enquiry steps simple and calm",
        ],
      },
      {
        service: "software-development",
        symptom: "Our quality records are on paper and audits are painful",
        cause: "Inspections, non-conformances and traceability live in binders and spreadsheets.",
        steps: [
          "Digitise inspection and non-conformance forms",
          "Link records to parts, batches and jobs",
          "Produce audit reports in minutes, not days",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Adelaide?",
        answer: "No. We work from Lucknow and Mumbai, India, with South Australian clients over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:00 to 23:00 Adelaide time, or 15:00 to 00:00 during daylight saving, Monday to Saturday.",
      },
      {
        question: "Can you work on defence-related projects?",
        answer: "We can build marketing websites and capability material for defence suppliers. We are an overseas team and hold no Australian security clearances, so we don't work on classified or controlled information.",
      },
      {
        question: "Do you work with wineries outside Adelaide?",
        answer: "Yes, anywhere in South Australia and beyond, from the Barossa and Clare to the Limestone Coast.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Adelaide — For Defence & Manufacturing Suppliers",
      metaDescription:
        "Website development for Adelaide defence and manufacturing suppliers: capability and certifications presented clearly for primes and procurement.",
      h1: "Website development for Adelaide suppliers who want primes to find them",
      card: "Supplier sites that present capability, quality and security clearly.",
      intro: [
        "Adelaide's defence and shipbuilding industry has a long supply chain of specialist manufacturers, engineers and service firms. Primes and their procurement teams look for suppliers by capability, and they check websites to confirm what a firm can do before they ever make contact.",
        "We build websites for those suppliers that state capability in the terms buyers use, show quality and security credentials clearly, and say nothing that can't be backed up.",
      ],
      sections: [
        {
          heading: "Capability, precisely",
          body: [
            "Buyers search for specific processes, materials, tolerances and certifications, not \"engineering solutions\". We write capability pages that name machines, processes, materials and standards, and show examples of past work where you are allowed to.",
          ],
        },
        {
          heading: "Credentials up front",
          body: [
            "Quality certifications such as ISO 9001 or AS9100, membership of the Defence Industry Security Program if you hold it, and industry registrations are shown with their scope. A downloadable capability statement matches the site exactly.",
            "We do not claim anything you can't evidence, and we do not publish details of programmes your contracts keep confidential.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website talks in generalities",
          cause: "It was written to sound impressive rather than to answer a buyer's specific questions.",
          steps: [
            "List the processes, materials and standards you work to",
            "Create a page for each core capability",
            "Back each with an example or a figure",
          ],
        },
        {
          symptom: "Buyers ask for information that should be on the site",
          cause: "Certifications, equipment lists and contact routes are missing or out of date.",
          steps: [
            "Publish certifications with scope and dates",
            "Add an equipment and facilities page",
            "Send enquiries to the right person by type",
          ],
        },
      ],
      checklist: [
        "Each core capability has its own page",
        "Certifications are listed with their scope",
        "Your capability statement matches the website",
        "Enquiries are routed to the right person",
      ],
      faqs: [
        {
          question: "Can you work with our security requirements?",
          answer: "For public marketing websites, yes. We hold no Australian security clearances, so we never handle classified or controlled information.",
        },
        {
          question: "How long does a supplier website take?",
          answer: "Usually four to six weeks. Gathering approved project descriptions often takes longest, so we start early.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "web-design": {
      metaTitle: "Web Design in Adelaide — Calm, Clear Sites for Health & Aged Care",
      metaDescription:
        "Web design for Adelaide health and aged care providers: sites organised around families' questions, accessible to older readers and easy to enquire from.",
      h1: "Web design for Adelaide health and aged care providers that families can actually use",
      card: "Calm, accessible sites organised around families' questions.",
      intro: [
        "People researching aged care or health services are often stressed, short of time and sometimes searching on behalf of a parent. Many provider websites make this harder, organised around internal departments, full of jargon and difficult for older eyes to read.",
        "We design sites for Adelaide health and aged care providers that answer families' real questions in plain language, meet accessibility standards and make enquiring feel simple.",
      ],
      sections: [
        {
          heading: "Organised around the questions people ask",
          body: [
            "What services do you offer? Is there availability? What does it cost and what funding applies? Can we visit? We structure the site around those questions, and write answers in plain English with the detail people need to take the next step.",
          ],
        },
        {
          heading: "Readable for everyone",
          body: [
            "Larger text, strong contrast, clear buttons and simple navigation help everyone, especially older readers and people using assistive technology. We design to WCAG 2.2 AA, which is part of what the Disability Discrimination Act expects of a website.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Families call to ask questions the site should answer",
          cause: "Key information is buried or written in sector jargon.",
          steps: [
            "Collect the top questions from your intake team",
            "Answer them clearly on dedicated pages",
            "Link answers from the homepage",
          ],
        },
        {
          symptom: "Older visitors find our site hard to read",
          cause: "Small text, low contrast and crowded layouts.",
          steps: [
            "Increase base text size and contrast",
            "Simplify navigation to a few clear choices",
            "Test with real users, including older people",
          ],
        },
      ],
      checklist: [
        "Body text is at least 16px and high contrast",
        "Costs and funding are explained in plain English",
        "A family can request a visit in under a minute",
        "The site works with a screen reader",
      ],
      faqs: [
        {
          question: "Do you know aged care regulations?",
          answer: "We design and build the website. Your team or advisers confirm that the content is accurate and compliant. We make it easy to update when rules change.",
        },
        {
          question: "Can enquiries go straight to our intake system?",
          answer: "Usually yes, through an integration or a secure form, handled with your privacy obligations in mind.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Adelaide — Online Wine & Food Sales",
      metaDescription:
        "Ecommerce for South Australian wineries and food producers: licence-aware stores, age confirmation, mixed dozens, wine clubs and freight for fragile cartons.",
      h1: "Ecommerce for South Australian wineries and food producers",
      card: "Wine and food stores with age checks, clubs and fair freight.",
      intro: [
        "Selling wine online isn't like selling anything else. The store has to work within your liquor licence, ask buyers to confirm they are over 18, handle wine-club subscriptions and mixed dozens, and price freight for heavy, fragile cartons fairly across states.",
        "We build stores for South Australian wineries and food producers with all of that built in, plus the follow-up that turns a cellar-door visit into years of online orders.",
      ],
      sections: [
        {
          heading: "Built around how wine is bought",
          body: [
            "Mixed dozens and bundle pricing. Back vintages and library releases. Club-only wines and member pricing. Gift messages for corporate and holiday orders. Delivery that requires an adult's signature where your licence needs it.",
          ],
        },
        {
          heading: "Freight that respects the margin",
          body: [
            "Wine is heavy, and shipping a dozen from the Barossa to Perth or Darwin costs real money. We set rates by zone and quantity, encourage full dozens with free-freight thresholds, and connect couriers that handle wine.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers buy one bottle and freight kills the sale",
          cause: "Freight for a single bottle is out of proportion to its price.",
          steps: [
            "Offer free or flat freight on full dozens",
            "Build mixed dozens that are easy to choose",
            "Show the saving clearly at checkout",
          ],
        },
        {
          symptom: "Cellar-door visitors never become online customers",
          cause: "There is no step that connects the visit to the store.",
          steps: [
            "Capture emails at the tasting with a clear benefit",
            "Send a follow-up with the wines they tried",
            "Invite them to the club after their first order",
          ],
        },
      ],
      checklist: [
        "Your store asks buyers to confirm they are over 18",
        "Full dozens get a freight incentive",
        "Visitors can reorder wines they tasted",
        "Your online sales fit within your liquor licence conditions",
      ],
      faqs: [
        {
          question: "Do you advise on liquor licensing?",
          answer: "No. Your licence and Consumer and Business Services set the rules. We build the store to follow the conditions you give us.",
        },
        {
          question: "Can the store connect to our cellar door POS?",
          answer: "Usually yes, so stock and customers are shared. We check your system's integration options during scoping.",
        },
      ],
      caseStudies: ["krushidoctor", "clickngreet"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Adelaide — Wine Clubs & Producer Stores",
      metaDescription:
        "Shopify developers for South Australian producers: wine clubs, mixed cases, age confirmation, freight by postcode and orders connected to your accounting.",
      h1: "Shopify development for South Australian producers running wine and food clubs",
      card: "Shopify stores with clubs, mixed cases and age confirmation.",
      intro: [
        "A lot of South Australian producers are on Shopify, or should be. It is straightforward for a small team to run, handles subscriptions well, and connects to most accounting and freight tools.",
        "We set up Shopify stores with wine clubs, mixed-case bundles, age confirmation and freight by postcode, and connect orders to your accounting, so cellar-door staff aren't re-keying sales.",
      ],
      sections: [
        {
          heading: "Clubs that run themselves",
          body: [
            "Members choose their preferences and manage their card details themselves. Each release is processed as a batch, with automatic emails before and after shipping. Failed payments are retried and flagged instead of chased one by one.",
          ],
        },
        {
          heading: "Connected to the rest of the business",
          body: [
            "Orders and payments flow into Xero or MYOB, stock is shared with the cellar door, and shipping labels are created automatically with the right courier.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Each club release takes days of admin",
          cause: "Members and payments are handled manually.",
          steps: [
            "Move club members to a subscription app",
            "Let members manage their own preferences and cards",
            "Run releases as a batch with automatic emails",
          ],
        },
        {
          symptom: "Card payments for club releases keep failing",
          cause: "Expired cards with no automatic retry or reminder.",
          steps: [
            "Send card update reminders before each release",
            "Retry failed payments automatically",
            "Flag remaining failures to staff",
          ],
        },
      ],
      checklist: [
        "Club members can update their own details",
        "Releases are processed as a batch",
        "Orders flow into your accounting automatically",
        "Age confirmation is on every alcohol purchase",
      ],
      faqs: [
        {
          question: "Can we move our club from another system?",
          answer: "Usually yes, including members, preferences and history. We plan the move so no release is missed.",
        },
        {
          question: "Can Shopify handle wholesale orders too?",
          answer: "Yes, with Shopify's B2B features or a separate wholesale channel, depending on your plan and needs.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Adelaide — Producer & Farm-to-Door Platforms",
      metaDescription:
        "Marketplace development for Adelaide: platforms that bring small South Australian producers together, with delivery windows, split payments and producer tools.",
      h1: "Marketplace development for platforms that bring South Australian producers together",
      card: "Producer marketplaces with delivery windows and split payments.",
      intro: [
        "South Australia has hundreds of small food and drink producers, each too small to run its own delivery network or reach interstate buyers alone. Platforms that bring them together, as farm-to-door services, regional food hubs or producer collectives, can reach customers none of them could alone.",
        "We build those platforms: producer onboarding, combined checkout across producers, delivery windows, split payments and the admin your team needs to run it.",
      ],
      sections: [
        {
          heading: "One basket, many producers",
          body: [
            "Customers shop across producers in one checkout. Each producer sees their own orders and packing lists, and is paid their share automatically, with your commission invoiced on every order.",
          ],
        },
        {
          heading: "Delivery windows and fresh produce",
          body: [
            "Fresh food needs order cut-offs, delivery days by area and sometimes cold-chain handling. We build those rules into the checkout, so customers only see delivery options you can actually meet.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Coordinating producers by email doesn't scale",
          cause: "Orders are split and sent to producers manually.",
          steps: [
            "Give each producer a dashboard for their orders",
            "Generate packing lists automatically",
            "Pay producers automatically after delivery",
          ],
        },
        {
          symptom: "Customers order for days we can't deliver",
          cause: "The checkout doesn't know delivery areas or cut-offs.",
          steps: [
            "Set delivery days by postcode",
            "Add order cut-off times",
            "Show available delivery dates at checkout",
          ],
        },
      ],
      checklist: [
        "Customers can buy from several producers in one checkout",
        "Producers see their own orders and packing lists",
        "Delivery dates shown are ones you can meet",
        "Producers are paid without manual transfers",
      ],
      faqs: [
        {
          question: "Can producers manage their own products?",
          answer: "Yes, within rules you set, with approval of new listings if you want it.",
        },
        {
          question: "What about food safety rules?",
          answer: "Those rest with you and your producers. We can build in fields and checks for the requirements you need to record.",
        },
      ],
      caseStudies: ["tatvivahtrends", "krushidoctor"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Adelaide — Fast, Accessible Information Sites",
      metaDescription:
        "Next.js development for Adelaide health, education and tourism organisations: large, accessible information sites that stay fast and easy for teams to update.",
      h1: "Next.js development for Adelaide organisations with a lot to explain",
      card: "Large, accessible information sites that stay fast.",
      intro: [
        "Health providers, education and training organisations, and tourism bodies in Adelaide often run large information sites: hundreds of pages of services, courses, locations and guidance. On an ageing CMS these sites slow down, become hard to navigate and drift out of date.",
        "We rebuild them in Next.js with a CMS your team can use, so they're fast, accessible and easy to keep current.",
      ],
      sections: [
        {
          heading: "Structured content, not page sprawl",
          body: [
            "We model content as services, locations, courses and staff, not hundreds of one-off pages. Change a location's hours once and every page that mentions it updates. Search and filtering come naturally from that structure.",
          ],
        },
        {
          heading: "Accessible and fast by default",
          body: [
            "Server-rendered pages, compressed images and accessible components mean the site works for older readers, people using assistive technology and anyone on a weak phone connection.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site has hundreds of pages and nobody trusts them",
          cause: "Information is duplicated across pages and updated in some places but not others.",
          steps: [
            "Audit content and remove duplicates",
            "Model services, locations and staff as structured data",
            "Generate pages from that single source",
          ],
        },
        {
          symptom: "Visitors can't find the course or service they need",
          cause: "Navigation reflects internal structure, and site search is poor.",
          steps: [
            "Organise by what visitors are looking for",
            "Add filters for location, type and eligibility",
            "Improve search with structured content",
          ],
        },
      ],
      checklist: [
        "Each fact on your site is stored in one place",
        "Visitors can filter services or courses",
        "The site meets WCAG 2.2 AA",
        "Your team can publish without a developer",
      ],
      faqs: [
        {
          question: "Which CMS would we use?",
          answer: "One chosen for your editors, such as Sanity, Strapi or a headless WordPress. We explain the choice in the scope.",
        },
        {
          question: "Can you migrate our existing content?",
          answer: "Yes. We migrate and restructure content, with redirects so nothing that ranks today is lost.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Adelaide — Home Care & Field Staff Apps",
      metaDescription:
        "Android apps for Adelaide home care and community teams: visit notes, checklists and schedules on company devices, built around privacy.",
      h1: "Android apps for Adelaide home care and community service teams",
      card: "Visit notes, checklists and schedules on company Android devices.",
      intro: [
        "Home care and community service workers in Adelaide spend their days travelling between clients, and much of their record-keeping happens on paper or in apps that don't quite fit. Visit notes, checklists and schedule changes get lost or written up late.",
        "We build native Android apps for company-issued devices that put schedules, visit checklists and notes in one place, designed around the privacy obligations that come with health information.",
      ],
      sections: [
        {
          heading: "Designed for the visit",
          body: [
            "Workers see their day's schedule, open each visit, follow the checklist, add notes and capture signatures, offline if needed. Schedule changes reach their phones immediately.",
          ],
        },
        {
          heading: "Privacy built in",
          body: [
            "Health information is sensitive under the Privacy Act, whatever your organisation's size. Data is encrypted on the device, access depends on role, records are stored in your own Australian cloud account, and our team works with test data, not client records.",
            "Our native strength is Android. If staff use their own iPhones, we scope a React Native build separately rather than taking on native iOS work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visit notes are written up hours later",
          cause: "There's no easy way to record them during the visit.",
          steps: [
            "Provide a simple visit checklist and notes screen",
            "Allow voice-to-text and photos where appropriate",
            "Sync notes securely to the office",
          ],
        },
        {
          symptom: "Schedule changes don't reach workers in time",
          cause: "Changes are sent by text or phone call.",
          steps: [
            "Send schedule updates to the app instantly",
            "Ask workers to confirm changes",
            "Show the office who has seen each change",
          ],
        },
      ],
      checklist: [
        "Workers record visit notes during the visit",
        "Schedule changes reach workers instantly",
        "Client data on devices is encrypted",
        "Access to records is limited by role",
      ],
      faqs: [
        {
          question: "Can the app connect to our client management system?",
          answer: "Often, through its API. We check what your system allows before quoting.",
        },
        {
          question: "Will your team see client records?",
          answer: "No. We build and test with sample data, and production access stays with your organisation.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Adelaide — Local Search That's Actually Winnable",
      metaDescription:
        "SEO for Adelaide: a very winnable local market, plus wine-tourism searches for cellar doors in the Barossa, McLaren Vale and Adelaide Hills.",
      h1: "SEO for Adelaide, where local search is still very winnable",
      card: "Local SEO in a winnable market, plus wine-tourism searches.",
      intro: [
        "Adelaide is small enough that local search is very winnable. A complete Google Business Profile, a steady stream of reviews and one good page per service often put a business in the map pack within months, where in Sydney the same work takes far longer.",
        "For wineries and tourism businesses, the opportunity is different: visitors planning a trip to the Barossa, McLaren Vale, the Clare Valley or the Adelaide Hills, searching for tastings, lunches and tours.",
      ],
      sections: [
        {
          heading: "Local businesses: do the basics thoroughly",
          body: [
            "Most Adelaide competitors have half-finished profiles, few recent reviews and thin websites. Doing the basics properly and consistently is often enough to rank: correct categories, complete services, regular photos, a review routine and a page for each service.",
          ],
        },
        {
          heading: "Wine regions: be found while trips are planned",
          body: [
            "Visitors decide which cellar doors to visit before they arrive. Pages for each experience, such as tastings, lunches, tours and events, plus a complete Google profile and presence on regional tourism sites, put you on the itinerary.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We're not in the map pack, even in our own suburb",
          cause: "Profile categories, services and reviews are thinner than competitors'.",
          steps: [
            "Complete every section of your Google profile",
            "Build a weekly review routine",
            "Add a page for each main service",
          ],
        },
        {
          symptom: "Visitors book other cellar doors near us",
          cause: "Our experiences aren't described anywhere search engines can find them.",
          steps: [
            "Create pages for each tasting and experience",
            "Add bookings, hours and photos to your Google profile",
            "List with the regional tourism bodies",
          ],
        },
      ],
      checklist: [
        "Your Google profile has every service listed",
        "You received a new review in the last 30 days",
        "Each experience or service has its own page",
        "You appear on your region's tourism website",
      ],
      faqs: [
        {
          question: "How long does local SEO take in Adelaide?",
          answer: "Often weeks for profile improvements and a few months for competitive terms, faster than in larger cities.",
        },
        {
          question: "Do you write for wine tourism?",
          answer: "Yes. We write experience pages from your input and photos, structured for the searches visitors make.",
        },
      ],
      caseStudies: ["krushidoctor"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Adelaide — Fringe Season & Local Campaigns",
      metaDescription:
        "Google Ads management for Adelaide hospitality, events and local services: campaigns timed to Fringe season and Mad March, and steady local lead generation.",
      h1: "Google Ads for Adelaide businesses that live by the festival calendar",
      card: "Campaigns timed to Fringe season and steady local lead gen.",
      intro: [
        "Adelaide's calendar shapes demand. During Fringe and the festivals of Mad March, visitors and locals flood the city looking for food, drinks, accommodation and things to do. The rest of the year, demand is steadier and local.",
        "We plan Google Ads around that rhythm, with campaigns that scale up for festival season and steady, tightly targeted local campaigns for the rest of the year.",
      ],
      sections: [
        {
          heading: "Festival season",
          body: [
            "We prepare festival campaigns in advance: ads that mention what visitors are searching for, such as pre-show dinners, late-night bars and accommodation near venues, with budgets that rise for the season and fall when it ends.",
          ],
        },
        {
          heading: "The rest of the year",
          body: [
            "Smaller markets often mean lower click costs. With tight location targeting and good landing pages, Adelaide service businesses can buy leads at prices Sydney competitors would envy.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We miss the festival rush online",
          cause: "Campaigns aren't ready until the season has already started.",
          steps: [
            "Plan festival campaigns six weeks ahead",
            "Write ads for festival-goers' searches",
            "Raise budgets for the season, then scale back",
          ],
        },
        {
          symptom: "Our ads show to people interstate who'll never visit",
          cause: "Location targeting includes people merely interested in Adelaide.",
          steps: [
            "Target people in or regularly in your area",
            "Run separate campaigns for visitors you do want",
            "Review location reports monthly",
          ],
        },
      ],
      checklist: [
        "Your festival campaigns are planned before February",
        "Location targeting uses presence, not interest",
        "You know your cost per booking or lead",
        "Each campaign has its own landing page",
      ],
      faqs: [
        {
          question: "Is Google Ads worth it for a small Adelaide business?",
          answer: "Often, because clicks are cheaper than in bigger cities. We estimate costs for your keywords before you commit.",
        },
        {
          question: "Can you run ads for an event or festival show?",
          answer: "Yes, with short campaigns built around dates, venues and ticket links.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Adelaide — Stories From the Vineyard & Kitchen",
      metaDescription:
        "Social media for South Australian wineries, producers and venues: vintage-season stories, producer content and ads that reach interstate buyers.",
      h1: "Social media for South Australian wineries and producers with stories to tell",
      card: "Vintage, producer and venue stories that reach interstate buyers.",
      intro: [
        "South Australian wineries and food producers have the kind of stories social media rewards: vintage in the vineyard, the winemaker in the shed, the first pour of a new release, produce coming in from the paddock. Most of it goes unshared because everyone's too busy doing it.",
        "We help you capture those moments, turn them into regular posts and short videos, and use paid social to reach interstate wine and food lovers who'll order online.",
      ],
      sections: [
        {
          heading: "Content from the seasons",
          body: [
            "We plan content around your year: vintage, bottling, releases, cellar-door events and harvests. Your team films short clips on a phone using a simple shot list, and we edit, caption and schedule them.",
          ],
        },
        {
          heading: "Reaching buyers interstate",
          body: [
            "We use paid social to reach wine and food lovers in Melbourne, Sydney and Brisbane, linking to your online store or club. Alcohol ads have specific platform rules and age targeting, which we set up correctly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Vintage comes and goes and we post nothing",
          cause: "The busiest time of year leaves no time for content.",
          steps: [
            "Prepare a vintage shot list before harvest",
            "Capture short clips daily during vintage",
            "Let us edit and post them across the season",
          ],
        },
        {
          symptom: "Our followers are all local",
          cause: "Organic posts mostly reach people who already know you.",
          steps: [
            "Run small paid campaigns to interstate wine lovers",
            "Link to a club or mixed-dozen offer",
            "Track online orders from each campaign",
          ],
        },
      ],
      checklist: [
        "You posted during the last vintage or harvest",
        "Your social links go to your store or club",
        "Alcohol ads are age-targeted correctly",
        "You know which posts led to online orders",
      ],
      faqs: [
        {
          question: "Are there rules for advertising alcohol on social media?",
          answer: "Yes. Platforms restrict alcohol ads and require age targeting, and the industry's ABAC code also applies. We follow both.",
        },
        {
          question: "Can you manage our cellar door events promotion?",
          answer: "Yes, from event posts and ads to ticket links and reminders.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Adelaide — Order Emails & Customer Service for Producers",
      metaDescription:
        "AI automation for South Australian producers and suppliers: wholesale orders read from emails, customer questions answered and admin cut, with a person reviewing.",
      h1: "AI automation for South Australian producers drowning in order emails",
      card: "Wholesale orders and customer emails processed automatically.",
      intro: [
        "Small South Australian producers and manufacturers often receive wholesale orders as emails and PDFs from restaurants, bottle shops and distributors, each in a different format. Someone reads them, types them into the system and replies to confirm. The same happens with customer questions about orders, clubs and deliveries.",
        "We build AI automation that reads those emails, creates draft orders and suggested replies, and leaves a person to check and approve.",
      ],
      sections: [
        {
          heading: "Orders from any format",
          body: [
            "AI reads incoming orders, matches products and customers, and creates draft orders in your system. Your team reviews them in a list and approves with a click. Unclear items are flagged rather than guessed.",
          ],
        },
        {
          heading: "Common questions answered",
          body: [
            "Questions like \"Where's my order?\", \"Can I change my club preferences?\" and \"Are you open on public holidays?\" get accurate draft replies from your own information, ready to send or edit.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Typing in wholesale orders takes hours each week",
          cause: "Orders arrive in many formats and are entered by hand.",
          steps: [
            "Route orders to a dedicated inbox",
            "Extract items and quantities automatically",
            "Approve draft orders in a single list",
          ],
        },
        {
          symptom: "The same customer questions arrive every day",
          cause: "Answers depend on someone looking up the details each time.",
          steps: [
            "Collect your common questions and answers",
            "Draft replies automatically with order details",
            "Review and send in one click",
          ],
        },
      ],
      checklist: [
        "Wholesale orders aren't typed in by hand",
        "Common questions have ready answers",
        "Every automated action is reviewed by a person",
        "You know how many hours a week admin takes",
      ],
      faqs: [
        {
          question: "What systems can draft orders go into?",
          answer: "Your store, accounting software or order system, if it has an API. We check during scoping.",
        },
        {
          question: "Is customer data safe?",
          answer: "We use AI providers whose terms exclude your data from training, and limit what is shared to what each task needs.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Adelaide — Quality & Traceability for Manufacturers",
      metaDescription:
        "Custom software for Adelaide manufacturers: inspections, non-conformance reports and batch traceability in one system, ready for audits.",
      h1: "Custom software for Adelaide manufacturers who dread audit week",
      card: "Inspection, non-conformance and traceability records in one place.",
      intro: [
        "Adelaide's advanced manufacturers supply customers who expect detailed quality records: inspections, non-conformance reports, corrective actions and traceability from raw material to finished part. Many still keep these in binders and spreadsheets, and audit week means days of searching.",
        "We build quality and traceability systems that record all of this as work happens, link it to parts, batches and jobs, and produce audit reports in minutes.",
      ],
      sections: [
        {
          heading: "Traceability you can show",
          body: [
            "Each job links to its materials and certificates, its inspections and measurements, the people who did the work and any non-conformances raised and closed. Search by part number, batch or customer and see the whole history.",
          ],
        },
        {
          heading: "Fits your quality system",
          body: [
            "We build around your existing procedures and forms, not a generic template, so the software supports your certification instead of forcing changes to it.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Audit preparation takes days",
          cause: "Records are spread across binders, spreadsheets and email.",
          steps: [
            "Digitise inspection and NCR forms",
            "Link records to jobs, parts and batches",
            "Generate audit reports on demand",
          ],
        },
        {
          symptom: "Corrective actions get forgotten",
          cause: "Nobody is reminded when actions are due.",
          steps: [
            "Assign each action an owner and due date",
            "Send reminders and escalate overdue actions",
            "Report open actions in management reviews",
          ],
        },
      ],
      checklist: [
        "You can trace any part back to its materials",
        "Non-conformances have owners and due dates",
        "Inspection records are stored digitally",
        "An audit report takes minutes, not days",
      ],
      faqs: [
        {
          question: "Can this connect to our ERP?",
          answer: "Usually, through its API or database. We confirm during scoping.",
        },
        {
          question: "Will your team see our controlled data?",
          answer: "We work with test data. If your contracts restrict overseas access, tell us and we'll design the project so production data stays with you.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Adelaide — Connect Cellar Door, Store & Accounts",
      metaDescription:
        "API integration for South Australian wineries and producers: connect cellar door POS, online store, wine club, freight and Xero so everything matches.",
      h1: "API integration for wineries running a cellar door, a store and a club",
      card: "Connect cellar door POS, online store, club, freight and Xero.",
      intro: [
        "A South Australian winery might run a cellar door POS, an online store, a club system, a freight service and Xero or MYOB. When they don't talk, stock is wrong, members get double-charged or missed, and reconciliation takes a day a week.",
        "We connect them so every sale, member and shipment is recorded once and appears everywhere it should.",
      ],
      sections: [
        {
          heading: "One customer, everywhere",
          body: [
            "A customer who buys at the cellar door, joins the club and orders online should be one record. We connect systems so that history is shared, making it easier to look after your best customers.",
          ],
        },
        {
          heading: "Stock and freight in sync",
          body: [
            "Stock is shared between cellar door and online sales, freight labels are created from orders automatically, and tracking goes back to the customer.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our online store sells wine we've run out of",
          cause: "Cellar door and online stock are counted separately.",
          steps: [
            "Choose one stock record",
            "Sync stock across channels",
            "Alert when a wine runs low",
          ],
        },
        {
          symptom: "Reconciliation takes a day every week",
          cause: "Sales from several systems are entered into Xero by hand.",
          steps: [
            "Post daily sales summaries automatically",
            "Map fees, GST and WET correctly with your accountant",
            "Flag anything that doesn't reconcile",
          ],
        },
      ],
      checklist: [
        "Cellar door and online stock are the same",
        "Club, store and cellar door share customer records",
        "Sales post to accounting automatically",
        "Freight labels are created without retyping",
      ],
      faqs: [
        {
          question: "Can you handle wine equalisation tax in the integration?",
          answer: "We map WET to the accounts your accountant specifies. They decide the tax treatment; we make sure the data lands correctly.",
        },
        {
          question: "Which systems can you connect?",
          answer: "Most with an API, including common POS, store and accounting platforms. We check each one during scoping.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Adelaide — Secure Hosting for Defence Suppliers",
      metaDescription:
        "Cloud set-up for Adelaide defence and manufacturing suppliers: Australian data regions, access control, backups and security practices clients ask about.",
      h1: "Cloud set-up for Adelaide suppliers whose clients ask hard security questions",
      card: "Australian-hosted cloud with access control and documented security.",
      intro: [
        "Adelaide's defence and advanced manufacturing suppliers increasingly face security questionnaires from their customers: where is data stored, who can access it, how is it backed up, and what controls are in place.",
        "We set up cloud hosting and storage for those suppliers in Australian regions, with access control, backups and documentation that helps answer those questionnaires accurately.",
      ],
      sections: [
        {
          heading: "Controls you can describe",
          body: [
            "Multi-factor authentication, role-based access, logging, encrypted storage, tested backups and patching on a schedule. Many of these align with the ASD's Essential Eight, which customers often reference. We document what's in place so your answers are accurate.",
          ],
        },
        {
          heading: "What we don't do",
          body: [
            "We are an overseas team without Australian security clearances. We don't host or handle classified information, and where your contracts restrict overseas access, we design the set-up so our access is limited or removed after handover.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We can't answer our customers' security questionnaires",
          cause: "Nobody has documented how systems are hosted, accessed and backed up.",
          steps: [
            "Inventory systems, data and access",
            "Put basic controls in place: MFA, backups, logging",
            "Write a short, accurate security summary",
          ],
        },
        {
          symptom: "Former staff still have access to our systems",
          cause: "There is no process for removing access when people leave.",
          steps: [
            "Audit every account",
            "Use central sign-in where possible",
            "Remove access as part of offboarding",
          ],
        },
      ],
      checklist: [
        "Multi-factor authentication is required on every account",
        "Backups are tested by restoring them",
        "Your data's location is documented",
        "Access is removed when people leave",
      ],
      faqs: [
        {
          question: "Can you make us compliant with defence requirements?",
          answer: "We can implement technical controls and document them. Formal compliance and DISP membership are decided by you and the relevant bodies.",
        },
        {
          question: "Will our data stay in Australia?",
          answer: "Yes, we host in Australian regions and document where everything is stored.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Adelaide — Accurate, Accessible & Up to Date",
      metaDescription:
        "Website maintenance for Adelaide health, aged care and community organisations: accurate content, accessibility checks, updates, backups and monitoring.",
      h1: "Website maintenance for Adelaide organisations that can't afford wrong information",
      card: "Accurate content and accessibility checks alongside the upkeep.",
      intro: [
        "For health, aged care and community organisations, wrong information on a website is more than embarrassing. An outdated phone number, service or fee can send someone who needs help in the wrong direction.",
        "Our maintenance plans keep content accurate and accessible, alongside the technical work: updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Content reviews, not just software updates",
          body: [
            "Each quarter we send you a list of pages that may be out of date, such as contact details, fees, staff and services, so the right people can check them. Changes you send us go live within one working day.",
          ],
        },
        {
          heading: "Accessibility kept in check",
          body: [
            "New content can quietly break accessibility, through images without descriptions, unclear links or poor contrast. We check new pages and fix issues as part of the plan.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website shows outdated contact details",
          cause: "Details changed, but nobody updated every page that mentions them.",
          steps: [
            "Store contact details in one place on the site",
            "Review key details every quarter",
            "Update everywhere at once",
          ],
        },
        {
          symptom: "New pages keep failing accessibility checks",
          cause: "Content editors aren't trained in accessible writing.",
          steps: [
            "Check new pages as part of maintenance",
            "Fix issues and explain them",
            "Give editors a simple checklist",
          ],
        },
      ],
      checklist: [
        "Contact details are correct on every page",
        "New pages are checked for accessibility",
        "Software was updated this month",
        "You have a recent, off-site backup",
      ],
      faqs: [
        {
          question: "Do you check our content for accuracy?",
          answer: "We flag pages that may be out of date; your team confirms what's correct, because you know the facts.",
        },
        {
          question: "Can you maintain a site another agency built?",
          answer: "Yes. We audit first and tell you plainly what condition it's in.",
        },
      ],
    },
  },
}
