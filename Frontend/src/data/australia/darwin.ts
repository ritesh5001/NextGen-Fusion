import type { AuCity } from "./types"
import { ACST } from "./zones"

export const darwin: AuCity = {
  slug: "darwin",
  name: "Darwin",
  state: "Northern Territory",
  stateCode: "NT",
  summary: "Defence, energy, government and tourism, with a dry-season peak and long supply lines.",
  zone: { std: ACST },
  areas: ["Darwin CBD", "Darwin Waterfront", "Stuart Park", "Parap", "Fannie Bay", "Nightcliff", "Casuarina", "Palmerston", "Berrimah", "Winnellie", "Coconut Grove", "Howard Springs", "Humpty Doo", "Katherine"],
  nearby: ["perth", "adelaide", "brisbane"],
  page: {
    metaTitle: "Websites, Systems & Marketing for Darwin and Top End Businesses",
    metaDescription:
      "Websites, online stores, field software and marketing for Darwin and Top End businesses working with the seasons, long supply lines and remote operations.",
    h1: "Helping Top End businesses work with the seasons, not against them",
    intro: [
      "Darwin is a small capital with a big role: defence, gas and energy, government services, pastoral and export industries, and a gateway to Kakadu, Litchfield and the Top End. Its closeness to Asia and its distance from the rest of Australia both shape how business works here.",
      "The seasons drive the year. Tourism and much of construction peak in the dry, while the wet changes who is searching for what. We help Top End businesses plan their online presence, systems and marketing around that rhythm. We work remotely from India, with no Darwin office.",
    ],
    sections: [
      {
        heading: "A small market is a winnable market",
        body: [
          "Darwin is small enough that steady, basic work goes a long way. A complete Google profile, regular reviews and a clear website can put a local business at the top of its category in months.",
          "The harder problems are distance and seasonality: freight that takes longer and costs more, remote operations with patchy connectivity, cyclone season, and a tourism year that runs on the dry. We plan around all of them.",
        ],
      },
      {
        heading: "Our hours in Darwin",
        body: [
          "The Northern Territory doesn't use daylight saving, so our hours stay 14:00 to 23:00 Darwin time, Monday to Saturday, all year.",
        ],
      },
    ],
    industries: [
      { name: "Defence and government contractors", need: "Suppliers need sites that present capability, compliance and local presence clearly." },
      { name: "Tourism operators", need: "Tours and stays need direct bookings and visibility with people planning a Top End trip months ahead." },
      { name: "Pastoral, agriculture and export", need: "Stations and exporters need records and systems that work far from reception." },
      { name: "Trades and construction", need: "Businesses need to show up in local search and reply quickly in the dry-season rush." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Our tours are booked out in the dry and empty in the wet",
        cause: "Marketing ignores the green season, and visitors don't know what it offers.",
        steps: [
          "Show what the wet season experience is like",
          "Offer green-season tours and packages",
          "Promote them to travellers who prefer fewer crowds",
        ],
      },
      {
        service: "cloud-solutions",
        symptom: "A cyclone warning made us realise our data isn't safe",
        cause: "Files and systems live on a server or laptops in one building.",
        steps: [
          "Move critical data to cloud storage interstate",
          "Back up automatically and test restores",
          "Make sure staff can work from anywhere",
        ],
      },
      {
        service: "android-app-development",
        symptom: "Station records are still on paper",
        cause: "Bore runs, stock counts and maintenance happen far from reception.",
        steps: [
          "Record checks on rugged Android devices",
          "Save offline and sync at the homestead",
          "Report from the data, not notebooks",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Territory customers give up when they see interstate delivery times",
        cause: "They assume online stores ship from down south.",
        steps: [
          "Say clearly that you ship from Darwin",
          "Offer local delivery and pickup",
          "Price remote NT freight properly",
        ],
      },
      {
        service: "seo",
        symptom: "Visitors plan their Top End trip and miss us",
        cause: "Planning searches go to guides and big operators.",
        steps: [
          "Write pages for the questions visitors ask",
          "Complete your Google profile",
          "Get listed on tourism sites that rank",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Grant applications and reports eat our team's time",
        cause: "Every application and acquittal is written from scratch.",
        steps: [
          "Build a library of past applications",
          "Draft new ones from it",
          "Have staff edit rather than start fresh",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Darwin?",
        answer: "No. We work remotely from Lucknow and Mumbai, India, with Top End businesses over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:00 to 23:00 Darwin time, Monday to Saturday, all year. The NT has no daylight saving.",
      },
      {
        question: "Do you work with businesses outside Darwin?",
        answer: "Yes, across the Territory, from Palmerston and Katherine to remote stations and communities.",
      },
      {
        question: "Can you work on defence projects?",
        answer: "We can build public websites and capability material for defence suppliers. We hold no Australian security clearances and don't handle classified or controlled information.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Darwin — Top End Tours for Every Season",
      metaDescription:
        "Website development for Darwin and Top End tour operators: sites that sell dry and green season, rank for trip planning and take bookings direct.",
      h1: "Website development for Top End tour operators planning a whole year, not just the dry",
      card: "Tourism sites that sell the dry and the green season.",
      intro: [
        "Top End tour operators earn most of their year in the dry season, and their customers plan months ahead from interstate and overseas. Many operators leave the wet, the green season, to chance, even though it has its own appeal: waterfalls at full flow, lightning storms, lush landscapes and fewer crowds.",
        "We build sites that rank for trip-planning searches, show real availability, take bookings direct, and sell every season honestly, including road access and what to expect.",
      ],
      sections: [
        {
          heading: "Honest about the seasons",
          body: [
            "Visitors want to know what's open, what's accessible and what it will be like. Clear pages on seasonal conditions, road access and what each tour involves build trust and reduce cancellations.",
          ],
        },
        {
          heading: "Book direct, months ahead",
          body: [
            "Live availability, clear prices and a quick booking flow on a phone, plus reminders and pre-trip information sent automatically as the date approaches.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Green-season bookings are almost non-existent",
          cause: "The website only shows the dry season.",
          steps: [
            "Create green-season pages with real photos",
            "Offer seasonal tours and pricing",
            "Explain access and conditions clearly",
          ],
        },
        {
          symptom: "Guests cancel when they learn about road conditions",
          cause: "Access information wasn't clear when they booked.",
          steps: [
            "Explain seasonal access on every tour page",
            "Send conditions updates before the trip",
            "Offer alternatives when roads close",
          ],
        },
      ],
      checklist: [
        "Your site sells both dry and green seasons",
        "Road access and conditions are explained",
        "Visitors can book direct months ahead",
        "Pre-trip information is sent automatically",
      ],
      faqs: [
        {
          question: "Can you connect our booking system?",
          answer: "Usually, yes, embedded or through an integration.",
        },
        {
          question: "When should we launch a new site?",
          answer: "Ideally during the wet, so it's ready and ranking before dry-season planning peaks.",
        },
      ],
      caseStudies: ["ladyscootytrainer"],
    },
    "web-design": {
      metaTitle: "Web Design in Darwin — For Galleries, Art Centres & Cultural Businesses",
      metaDescription:
        "Web design for Darwin galleries and art centres: sites that present art and stories respectfully, follow your cultural protocols and support sales.",
      h1: "Web design for Top End galleries and cultural businesses",
      card: "Respectful sites for galleries, art centres and cultural businesses.",
      intro: [
        "Darwin and the Top End are home to galleries, art centres and cultural businesses whose work is in demand across Australia and around the world. Their websites need to present art and stories respectfully and help collectors buy with confidence.",
        "We design sites that put the work and the artists first, follow the cultural protocols you set, and make enquiring or buying straightforward.",
      ],
      sections: [
        {
          heading: "Your protocols, built in",
          body: [
            "Communities and art centres have protocols around names, images and stories, including how to handle images of people who have passed away. We design the site and its editing tools so your team can follow them easily, and we take direction from you.",
          ],
        },
        {
          heading: "Confidence for collectors",
          body: [
            "Artist biographies, provenance information and certificates of authenticity help collectors buy ethically. We make these easy to publish with each work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Collectors ask for provenance we can't easily show online",
          cause: "Certificates and artist information aren't attached to each work.",
          steps: [
            "Attach artist bios and certificates to each work",
            "Show provenance clearly",
            "Make enquiring easy",
          ],
        },
        {
          symptom: "Updating our site to follow protocol is difficult",
          cause: "Images and names are scattered across pages.",
          steps: [
            "Store artists and works as structured records",
            "Let staff hide or update content in one place",
            "Apply changes across the site instantly",
          ],
        },
      ],
      checklist: [
        "Each work shows the artist and provenance",
        "Staff can apply cultural protocols easily",
        "Collectors can buy or enquire simply",
        "Images look sharp but load quickly",
      ],
      faqs: [
        {
          question: "Who decides how cultural content is presented?",
          answer: "You and the artists and communities you work with. We build to your direction.",
        },
        {
          question: "Can you sell artwork online?",
          answer: "Yes, with a store or an enquiry flow depending on the work.",
        },
      ],
      caseStudies: ["kalamohini"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Darwin — Ships From the Territory",
      metaDescription:
        "Ecommerce for Darwin retailers: stores that sell the advantage of local stock, price remote NT freight properly and offer pickup and fast Darwin delivery.",
      h1: "Ecommerce for Darwin retailers competing with stores down south",
      card: "Stores that sell local stock, pickup and fair remote freight.",
      intro: [
        "Territorians are used to waiting a week or more for online orders from Sydney or Melbourne, and paying more for freight. A Darwin store with local stock can beat that easily, but only if it says so clearly and delivers on it.",
        "We build stores that lead with local stock and fast delivery, offer pickup and price remote NT freight properly.",
      ],
      sections: [
        {
          heading: "Local is the selling point",
          body: [
            "\"Ships from Darwin\" on every product. Pickup and fast local delivery across Darwin and Palmerston. Honest delivery estimates for remote towns and communities.",
          ],
        },
        {
          heading: "Remote freight priced fairly",
          body: [
            "Freight to remote NT postcodes costs more and takes longer. We set rates by zone so remote orders cover their costs and customers know what to expect.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Local customers buy from interstate stores",
          cause: "They don't realise we have stock here.",
          steps: [
            "Show local stock and delivery times",
            "Offer pickup",
            "Promote fast Darwin delivery",
          ],
        },
        {
          symptom: "Remote orders lose us money",
          cause: "Freight is priced as a flat rate.",
          steps: [
            "Price freight by zone",
            "Set clear delivery estimates",
            "Choose carriers that serve remote areas",
          ],
        },
      ],
      checklist: [
        "Your store says it ships from Darwin",
        "Pickup is offered",
        "Remote freight is priced by zone",
        "Delivery estimates are shown before checkout",
      ],
      faqs: [
        {
          question: "Which carriers serve remote NT?",
          answer: "Several, including Australia Post. We set up the ones that suit your products and destinations.",
        },
        {
          question: "Which platform do you recommend?",
          answer: "Shopify for most retailers; we'll explain any reason to choose differently.",
        },
      ],
      caseStudies: ["deetoo", "krushidoctor"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Darwin — Art Sales With Provenance",
      metaDescription:
        "Shopify developers for Top End galleries: art sales with artist details, certificates of authenticity, careful shipping of artworks and international buyers.",
      h1: "Shopify development for Top End galleries selling art to the world",
      card: "Shopify for galleries, with provenance and careful art shipping.",
      intro: [
        "Top End galleries sell to collectors across Australia and overseas. Selling art online needs more than a standard store: artist information, certificates of authenticity, careful packing and shipping of fragile works, and buyers in other currencies.",
        "We set up Shopify for galleries with all of that, so collectors can buy with confidence and you can ship safely.",
      ],
      sections: [
        {
          heading: "Provenance with every sale",
          body: [
            "Each work links to its artist and community, and comes with a certificate of authenticity. Galleries that follow the Indigenous Art Code can show it clearly.",
          ],
        },
        {
          heading: "Shipping art safely",
          body: [
            "Shipping is calculated by size and destination, with options for insured, specialist art freight. International buyers see prices in their own currency.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Overseas collectors abandon at checkout",
          cause: "Prices are in AUD and shipping is unclear.",
          steps: [
            "Show prices in local currencies",
            "Quote international art freight clearly",
            "Offer insured shipping",
          ],
        },
        {
          symptom: "Collectors ask for certificates after buying",
          cause: "Provenance isn't part of the listing.",
          steps: [
            "Attach certificates to each work",
            "Show artist and community details",
            "Include certificates with every shipment",
          ],
        },
      ],
      checklist: [
        "Each work shows artist and provenance",
        "Certificates of authenticity accompany sales",
        "International prices are shown in local currency",
        "Art freight is quoted by size and destination",
      ],
      faqs: [
        {
          question: "Can sold works stay on the site?",
          answer: "Yes, as an archive marked sold, which helps collectors see an artist's range.",
        },
        {
          question: "Can you migrate our existing gallery store?",
          answer: "Yes, with works, artists and redirects.",
        },
      ],
      caseStudies: ["kalamohini", "sitaravastram"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Darwin — Local Supplier Platforms for Big Projects",
      metaDescription:
        "Marketplace development for Darwin: platforms connecting defence, energy and government projects with verified local Territory suppliers and contractors.",
      h1: "Marketplace development for connecting big Top End projects with local suppliers",
      card: "Platforms that connect big projects with verified local suppliers.",
      intro: [
        "Large defence, energy and government projects in the Top End are often expected to use local Territory businesses. Finding capable, verified local suppliers quickly is a real challenge for project teams, and being found is a challenge for small local firms.",
        "We build supplier platforms where local businesses list verified capabilities and project teams find them, request quotes and compare responses. We built MariBiz.ai, a verified-vendor procurement marketplace, so this is familiar work.",
      ],
      sections: [
        {
          heading: "Local capability, searchable",
          body: [
            "Suppliers list services, certifications, insurances and capacity, with their Territory presence verified. Project teams filter by what they need.",
          ],
        },
        {
          heading: "Requests for quote and records",
          body: [
            "Project teams send requests for quote to matching suppliers and compare structured responses, with a full record that helps them report on local participation.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Project teams don't know which local firms can do the work",
          cause: "There's no searchable, verified list.",
          steps: [
            "Build verified supplier profiles",
            "Make them searchable by capability",
            "Keep certifications and insurances current",
          ],
        },
        {
          symptom: "Small local suppliers miss opportunities",
          cause: "They hear about them too late or not at all.",
          steps: [
            "Notify suppliers of matching requests",
            "Make responding simple",
            "Show suppliers their request history",
          ],
        },
      ],
      checklist: [
        "Suppliers' local presence is verified",
        "Certifications and insurances are tracked",
        "Requests reach matching suppliers",
        "Every request leaves a record",
      ],
      faqs: [
        {
          question: "How does this relate to MariBiz.ai?",
          answer: "We built MariBiz.ai for marine procurement. Its supplier verification and RFQ patterns apply directly.",
        },
        {
          question: "Who verifies suppliers?",
          answer: "Your team, using tools we build. You set the criteria.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Darwin — Export Sites for Asian Buyers",
      metaDescription:
        "Next.js development for Darwin exporters: fast multilingual sites for buyers in Asia, with product specifications, enquiry routing and strong search performance.",
      h1: "Next.js development for Darwin exporters selling into Asia",
      card: "Multilingual export sites for buyers in Asia.",
      intro: [
        "Darwin is closer to Jakarta and Singapore than to Sydney, and many Territory businesses export cattle, produce, services and know-how into Asia. Their buyers research suppliers online, often in their own language and on mobile.",
        "We build fast, multilingual Next.js sites for exporters, with product and capability information buyers need and enquiries routed to the right person.",
      ],
      sections: [
        {
          heading: "In the buyer's language",
          body: [
            "Each language has its own URLs and metadata, so search engines show the right version in each market. Translations live in a CMS your team or translators can update.",
          ],
        },
        {
          heading: "What buyers check",
          body: [
            "Specifications, certifications, supply capacity, shipping options and contacts, presented clearly and consistently in every language.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Asian buyers don't find us",
          cause: "Our site is English-only and not optimised for their markets.",
          steps: [
            "Translate key pages for target markets",
            "Set up language-specific URLs",
            "Optimise for local search engines' needs",
          ],
        },
        {
          symptom: "Enquiries from overseas go unanswered",
          cause: "They land in a general inbox.",
          steps: [
            "Route enquiries by market and product",
            "Acknowledge them instantly",
            "Track responses",
          ],
        },
      ],
      checklist: [
        "Key pages are in your buyers' languages",
        "Each language has its own URL",
        "Specifications and certifications are clear",
        "Overseas enquiries are routed and tracked",
      ],
      faqs: [
        {
          question: "Do you translate the content?",
          answer: "We arrange machine translation as a start and recommend professional review for important pages.",
        },
        {
          question: "Where is the site hosted?",
          answer: "On a global CDN, so it's fast in Asia and Australia.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Darwin — Station & Remote Operations Apps",
      metaDescription:
        "Android apps for NT pastoral stations and remote operations: bore runs, stock counts, maintenance and incident records captured offline and synced at base.",
      h1: "Android apps for NT stations and remote operations far from reception",
      card: "Offline apps for bore runs, stock counts and remote maintenance.",
      intro: [
        "On Territory pastoral stations and remote operations, work happens hundreds of kilometres from reception: bore and water checks, stock counts, fence and equipment maintenance, incident records. Paper notebooks and memory are still the norm.",
        "We build native Android apps for rugged company devices that capture all of it offline, with GPS and photos, and sync when back at the homestead or in range.",
      ],
      sections: [
        {
          heading: "Fully offline",
          body: [
            "Maps, forms and reference data are stored on the device. Records are saved with location and time and synced when a connection appears, by satellite or back at base.",
          ],
        },
        {
          heading: "Records you can use",
          body: [
            "Water point histories, maintenance due, stock movements and incidents, reported from the data rather than reconstructed from notebooks.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Bore run results are lost or late",
          cause: "They're written in notebooks.",
          steps: [
            "Record each water point check on a device",
            "Attach photos and GPS",
            "Flag problems to the homestead on sync",
          ],
        },
        {
          symptom: "Maintenance gets missed",
          cause: "Nobody can see what's due across the property.",
          steps: [
            "Register equipment and water points",
            "Schedule maintenance",
            "Record completion in the field",
          ],
        },
      ],
      checklist: [
        "Field records are captured on devices",
        "The app works with no reception",
        "Problems are flagged on sync",
        "Maintenance schedules are visible",
      ],
      faqs: [
        {
          question: "Will it work with satellite internet?",
          answer: "Yes. Syncs are small and resume if interrupted.",
        },
        {
          question: "Do you build for iPhone?",
          answer: "Not natively. If needed, we scope a React Native build separately.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Darwin — A Small Market You Can Win",
      metaDescription:
        "SEO for Darwin and Top End businesses: local search in a small, winnable market, plus content that puts tour operators on visitors' itineraries months ahead.",
      h1: "SEO for Darwin businesses in a market small enough to win",
      card: "Local SEO in a winnable market, plus trip-planning content.",
      intro: [
        "Because Darwin's market is small, local search is very winnable for businesses that put in steady effort. Many competitors have incomplete profiles and thin websites, and consistent basics often reach the top.",
        "For tour operators, the challenge is visitors planning months ahead from interstate and overseas. We build content that puts you on their itinerary before they arrive.",
      ],
      sections: [
        {
          heading: "Local basics, done properly",
          body: [
            "A complete Google profile, accurate hours (including wet-season changes), steady reviews and a page for each service. In Darwin, that alone often wins.",
          ],
        },
        {
          heading: "Trip-planning content",
          body: [
            "Pages on what visitors want to know: when to visit, what's accessible in each season, how to get to Kakadu or Litchfield, and what a day on your tour looks like.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Competitors outrank us in a market this small",
          cause: "Their profiles and reviews are slightly better, and that's enough.",
          steps: [
            "Complete every part of your profile",
            "Collect reviews steadily",
            "Add a page for each service",
          ],
        },
        {
          symptom: "Visitors don't find us while planning",
          cause: "Planning searches go to guides.",
          steps: [
            "Write pages answering planning questions",
            "Link them to booking",
            "Get featured by tourism sites",
          ],
        },
      ],
      checklist: [
        "Your Google profile is complete",
        "Seasonal hours are accurate",
        "You get new reviews regularly",
        "You have trip-planning content if you're in tourism",
      ],
      faqs: [
        {
          question: "How quickly can we rank in Darwin?",
          answer: "Often within weeks for profile improvements, and a few months for competitive terms.",
        },
        {
          question: "Should we target Palmerston separately?",
          answer: "If you serve it, yes, with your service area and a page about your work there.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Darwin — Campaigns Timed to the Dry Season",
      metaDescription:
        "Google Ads for Darwin and Top End businesses: tourism campaigns timed to dry-season planning, local campaigns kept tight to Darwin and Palmerston.",
      h1: "Google Ads for Top End businesses whose year turns on the seasons",
      card: "Tourism ads timed to the dry; local ads kept tight.",
      intro: [
        "Darwin demand is seasonal. Visitors plan dry-season trips months in advance, while local demand for trades and services shifts with the build-up, the wet and the dry.",
        "We time campaigns to those patterns: tourism ads aimed at people planning from interstate and overseas, and local campaigns kept tight to Darwin and Palmerston so spend isn't wasted.",
      ],
      sections: [
        {
          heading: "Ahead of the dry",
          body: [
            "Tourism campaigns start while visitors are planning, often during the wet, targeting southern cities and overseas markets with ads and landing pages built for planning.",
          ],
        },
        {
          heading: "Local, seasonal, tight",
          body: [
            "Air-conditioning before the build-up, roofing and cyclone preparation before the wet, outdoor work in the dry. Local campaigns follow the season and stay within the areas you serve.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our tourism ads start too late",
          cause: "Campaigns begin when the dry starts, after visitors have booked.",
          steps: [
            "Start campaigns during planning season",
            "Target southern and overseas markets",
            "Track bookings by month",
          ],
        },
        {
          symptom: "Local ads run the same all year",
          cause: "They don't follow seasonal demand.",
          steps: [
            "Map demand for your services by season",
            "Shift budget and messages accordingly",
            "Pause what's out of season",
          ],
        },
      ],
      checklist: [
        "Tourism campaigns start before the dry",
        "Local ads follow seasonal demand",
        "Targeting stays within your service area",
        "Bookings and enquiries are tracked",
      ],
      faqs: [
        {
          question: "Can you target overseas visitors?",
          answer: "Yes, in markets your visitors come from, with ads in their language if needed.",
        },
        {
          question: "What budget do we need?",
          answer: "Often modest locally, because Darwin is small. We estimate before you commit.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Darwin — Selling the Green Season",
      metaDescription:
        "Social media for Top End tourism and hospitality: content for the dry and the green season, aimed at southern and overseas travellers planning a trip.",
      h1: "Social media for Top End businesses with two very different seasons to sell",
      card: "Dry and green season content aimed at travellers planning trips.",
      intro: [
        "The Top End has two very different seasons to show: the dry, with clear days, swimming holes and sunsets, and the green season, with storms, waterfalls in full flow and lush landscapes. Both make extraordinary content, and most businesses only post one.",
        "We help you capture both and share them with southern and overseas travellers planning their next trip.",
      ],
      sections: [
        {
          heading: "Content for both seasons",
          body: [
            "A simple shot list for each season, captured by your team on a phone. We edit, caption and schedule, so your feed shows why the Top End is worth visiting at any time of year.",
          ],
        },
        {
          heading: "Aimed at planners",
          body: [
            "Paid posts reach travellers in southern cities and overseas markets while they're deciding when and where to go, linking to booking pages.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our social media goes quiet in the wet",
          cause: "We assume nobody cares about the off-season.",
          steps: [
            "Film green-season moments",
            "Share them as a reason to visit",
            "Promote green-season offers",
          ],
        },
        {
          symptom: "Our followers are mostly locals",
          cause: "Organic reach stays nearby.",
          steps: [
            "Run paid posts in visitor markets",
            "Link to booking",
            "Track bookings from social",
          ],
        },
      ],
      checklist: [
        "You post in both seasons",
        "Paid posts reach visitor markets",
        "Posts link to booking",
        "You track bookings from social",
      ],
      faqs: [
        {
          question: "Which platforms suit Top End tourism?",
          answer: "Instagram and TikTok for discovery; Facebook for older travellers and families.",
        },
        {
          question: "Do we need a drone or professional camera?",
          answer: "Not to start. Phone footage of real moments works well.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Darwin — Grant Applications & Reports Drafted Faster",
      metaDescription:
        "AI automation for Darwin organisations: grant applications and acquittals drafted from your past work, with staff in control.",
      h1: "AI automation for Territory organisations writing grant after grant",
      card: "Grant applications and acquittals drafted from your past work.",
      intro: [
        "Community organisations, not-for-profits and small businesses in the Territory rely on grants, and each one means an application and later an acquittal report. Small teams spend weeks a year writing them, often repeating what they've written before.",
        "We build AI tools that draft new applications and reports from your past work, organisation details and program data, which your staff then edit and approve.",
      ],
      sections: [
        {
          heading: "A library of what you've written",
          body: [
            "Past applications, reports, program descriptions and outcomes are organised into a library. New applications start from the best matching content, not a blank page.",
          ],
        },
        {
          heading: "You stay responsible",
          body: [
            "Every claim in a grant application is yours. The tool drafts; your staff check facts, adjust for the funder and submit. Nothing is sent automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Every application starts from scratch",
          cause: "Past work is scattered across folders.",
          steps: [
            "Collect past applications and reports",
            "Organise them by topic",
            "Draft new applications from them",
          ],
        },
        {
          symptom: "Acquittal reports are a scramble",
          cause: "Program data is gathered at the last minute.",
          steps: [
            "Record outcomes as programs run",
            "Draft reports from that data",
            "Review and submit on time",
          ],
        },
      ],
      checklist: [
        "Past applications are easy to find",
        "Program outcomes are recorded as you go",
        "Drafts are reviewed by staff",
        "Reports go in before deadlines",
      ],
      faqs: [
        {
          question: "Is it OK to use AI for grant applications?",
          answer: "Check each funder's rules. Many allow it as long as the content is accurate and yours. Your staff stay responsible.",
        },
        {
          question: "Is our data private?",
          answer: "We use AI providers that don't train on your data.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Darwin — Fleet & Asset Tracking for Remote Operations",
      metaDescription:
        "Custom software for Territory fleets and assets: vehicles, services and pre-starts tracked in one system that copes with patchy connectivity.",
      h1: "Custom software for Territory businesses running fleets across long distances",
      card: "Fleet, equipment and service tracking for remote operations.",
      intro: [
        "Territory businesses run vehicles and equipment across huge distances, in heat, dust and wet-season conditions that wear things out fast. Keeping track of services, pre-starts, defects and registrations in spreadsheets is risky.",
        "We build fleet and asset systems that track every vehicle and machine, schedule services, record pre-starts and defects in the field, and warn you before registrations or services fall due.",
      ],
      sections: [
        {
          heading: "Every vehicle, every check",
          body: [
            "Each vehicle and machine has its service history, pre-start records, defects and registration dates. Drivers record pre-starts and defects on a phone, offline if needed.",
          ],
        },
        {
          heading: "Nothing falls due unnoticed",
          body: [
            "Services, registrations and inspections are scheduled with reminders, and defects become tracked repairs.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Vehicles miss services",
          cause: "Service schedules live in a spreadsheet.",
          steps: [
            "Register vehicles with service schedules",
            "Send reminders",
            "Record completed services",
          ],
        },
        {
          symptom: "Defects found on pre-start never get fixed",
          cause: "They're written on paper and lost.",
          steps: [
            "Record pre-starts in an app",
            "Turn defects into repair jobs",
            "Track until closed",
          ],
        },
      ],
      checklist: [
        "Every vehicle has a service schedule",
        "Pre-starts are recorded digitally",
        "Defects become tracked repairs",
        "Registrations have reminders",
      ],
      faqs: [
        {
          question: "Can it use GPS trackers we already have?",
          answer: "If they have an API, often yes. We check during scoping.",
        },
        {
          question: "Will it work out of range?",
          answer: "Yes. Field records save offline and sync later.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Darwin — Station Records, Livestock Data & Accounts",
      metaDescription:
        "API integration for NT pastoral and agricultural businesses: connect station records, livestock data, sales and accounting so information is entered once.",
      h1: "API integration for Territory stations and agribusinesses",
      card: "Connect station records, livestock data, sales and accounting.",
      intro: [
        "Territory pastoral and agricultural businesses keep records in several places: herd management software, livestock movement records, sale paperwork, freight bookings and accounting. The same information is typed in again and again.",
        "We connect those systems so herd and movement data, sales and costs flow through, and are entered once.",
      ],
      sections: [
        {
          heading: "From paddock to accounts",
          body: [
            "Stock records feed sales, sales feed invoices, and freight and costs flow into accounting. The records needed for livestock movements, including NLIS transfers, are prepared from the same data.",
          ],
        },
        {
          heading: "Built for patchy connections",
          body: [
            "Syncs are small, retry automatically and report clearly when something hasn't gone through, because station connectivity isn't always reliable.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Livestock data is entered in three systems",
          cause: "Herd, sales and accounting software aren't connected.",
          steps: [
            "Choose the herd system as the source",
            "Sync sales and accounts from it",
            "Remove duplicate entry",
          ],
        },
        {
          symptom: "Sale paperwork takes days",
          cause: "Figures are pulled together by hand.",
          steps: [
            "Prepare sale records from herd data",
            "Create invoices automatically",
            "Record freight and costs",
          ],
        },
      ],
      checklist: [
        "Herd data is entered once",
        "Sales create invoices automatically",
        "Freight costs are recorded",
        "Syncs retry when connections drop",
      ],
      faqs: [
        {
          question: "Can you connect to NLIS?",
          answer: "We can prepare data in the formats needed for NLIS transfers. Direct integration depends on access available to your business.",
        },
        {
          question: "Which herd software can you work with?",
          answer: "Those with APIs or data exports. We check before quoting.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Darwin — Cyclone-Season Resilience",
      metaDescription:
        "Cloud set-up for Darwin businesses: data stored safely interstate, tested backups and remote access so a cyclone or outage doesn't stop the business.",
      h1: "Cloud set-up for Darwin businesses that can't afford to lose everything in a cyclone",
      card: "Data stored safely interstate, with tested backups and remote access.",
      intro: [
        "Every wet season, Darwin businesses face the risk of cyclones, storms, flooding and power outages. If your data lives on a server or laptops in one building, a single event could take it all.",
        "We set up cloud storage and hosting in Australian regions far from Darwin, with tested backups and remote access, so your business can keep running from anywhere if your premises can't.",
      ],
      sections: [
        {
          heading: "Data out of harm's way",
          body: [
            "Critical files and systems are hosted in cloud regions interstate, with automatic backups to a separate location. Nothing important depends on a single building.",
          ],
        },
        {
          heading: "Ready before the wet",
          body: [
            "Before each wet season, we check backups by restoring them, confirm staff can work remotely, and update a simple plan for what happens if the office is out of action.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our data is all in the office",
          cause: "Files and systems run on a local server.",
          steps: [
            "Move critical data to the cloud",
            "Back up to a separate region",
            "Test restores",
          ],
        },
        {
          symptom: "If the office closes, we can't work",
          cause: "Systems are only accessible on-site.",
          steps: [
            "Enable secure remote access",
            "Test working from home before the wet",
            "Write a simple continuity plan",
          ],
        },
      ],
      checklist: [
        "Critical data is stored outside Darwin",
        "Backups are tested before each wet",
        "Staff can work remotely",
        "You have a continuity plan",
      ],
      faqs: [
        {
          question: "Is cloud hosting reliable from Darwin?",
          answer: "Yes. Connections to Australian regions are fast enough for most business use.",
        },
        {
          question: "Do you handle our IT hardware?",
          answer: "No. A local IT provider is better for hardware and networks; we can work with them.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Darwin — Wet and Dry Season Updates",
      metaDescription:
        "Website maintenance for Darwin and Top End businesses: seasonal hours, tours and closures updated for the wet and dry, plus security, backups and monitoring.",
      h1: "Website maintenance for Top End businesses that change with the wet and dry",
      card: "Wet and dry season updates, plus security and backups.",
      intro: [
        "Top End businesses change with the seasons: tours open and close, hours shift, roads become impassable and some businesses close for the wet. Visitors and locals rely on your website being right.",
        "Our maintenance plans keep seasonal information current, along with updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Season changeovers",
          body: [
            "Before the wet and the dry, we review tours, hours, closures and access information on your site and Google profile, and update anything you send us within one working day.",
          ],
        },
        {
          heading: "Ongoing upkeep",
          body: [
            "Software updates tested before release, security monitoring, daily off-site backups stored interstate and uptime alerts, with a short monthly summary.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site still shows dry-season tours in the wet",
          cause: "Seasonal changes aren't scheduled.",
          steps: [
            "Plan seasonal changeovers",
            "Update site and Google profile together",
            "Add notices for closures and access",
          ],
        },
        {
          symptom: "Our site went down in a storm and we didn't know",
          cause: "No monitoring, and hosting is local.",
          steps: [
            "Move hosting interstate",
            "Add uptime monitoring",
            "Keep backups off-site",
          ],
        },
      ],
      checklist: [
        "Seasonal tours and hours are current",
        "Closures and access notices are published",
        "Backups are stored interstate",
        "Uptime is monitored",
      ],
      faqs: [
        {
          question: "Can you update our Google profile too?",
          answer: "Yes, with access, so it matches your website.",
        },
        {
          question: "How fast are urgent changes made?",
          answer: "Immediately during our hours, 14:00 to 23:00 Darwin time.",
        },
      ],
    },
  },
}
