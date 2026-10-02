import type { AuCity } from "./types"
import { AEST } from "./zones"

export const goldCoast: AuCity = {
  slug: "gold-coast",
  name: "Gold Coast",
  state: "Queensland",
  stateCode: "QLD",
  summary: "Tourism, hospitality, construction and lifestyle brands, with sharp seasonal peaks.",
  zone: { std: AEST },
  areas: ["Surfers Paradise", "Broadbeach", "Southport", "Main Beach", "Burleigh Heads", "Palm Beach", "Robina", "Varsity Lakes", "Coolangatta", "Nerang", "Helensvale", "Coomera", "Hope Island", "Mudgeeraba"],
  nearby: ["brisbane", "sunshine-coast", "sydney"],
  page: {
    metaTitle: "Websites, Bookings & Marketing for Gold Coast Businesses",
    metaDescription:
      "Direct-booking websites, SEO, social and ads for Gold Coast tourism, hospitality, wellness and lifestyle brands. Keep more of every booking and sale.",
    h1: "Helping Gold Coast businesses keep more of every booking",
    intro: [
      "The Gold Coast runs on visitors and on growth. Tourism, hospitality and events bring in people from interstate and overseas, while a steady flow of new residents keeps construction, real estate, health and wellness busy.",
      "Both sides share a weak spot: a lot of the money flows through someone else's platform. We help Gold Coast businesses win more bookings and sales directly, through websites, search, social and ads, so less of each one goes to a middleman. We work remotely from India and have no Gold Coast office.",
    ],
    sections: [
      {
        heading: "Commission is the hidden cost",
        body: [
          "Accommodation and tours pay commission to booking sites. Venues pay delivery apps. Trades pay lead-generation sites. Each platform is useful, but when most of your revenue comes through them, a large share of every sale leaves the business before you see it.",
          "Getting even a portion of that demand to book direct, through a fast site, a simple booking flow, and search and social that point to you, goes straight to the bottom line.",
        ],
      },
      {
        heading: "Working across the seasons",
        body: [
          "Gold Coast demand rises and falls with school holidays, events and the weather. We plan work so changes land before the peaks, not during them. Queensland has no daylight saving, so our hours stay 14:30 to 23:30 Gold Coast time all year.",
        ],
      },
    ],
    industries: [
      { name: "Tourism and accommodation", need: "Operators need direct booking that is as easy as the booking sites, so fewer guests arrive through commission." },
      { name: "Hospitality and events", need: "Venues need menus, functions pages and bookings that keep up with the season." },
      { name: "Construction and real estate", need: "Builders and agents need project and listing pages that rank in the suburbs where the growth is." },
      { name: "Health, wellness and lifestyle", need: "Clinics, studios and surf and fitness brands need booking and social that turns followers into customers." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Most of our bookings come through booking sites and their commission",
        cause: "Guests find you on the booking site, then can't book as easily on your own website, so they go back.",
        steps: [
          "Make direct booking as fast as the big platforms on a phone",
          "Offer something booking sites can't, like a perk or flexible terms",
          "Remind past guests to book direct next time",
        ],
      },
      {
        service: "google-ads",
        symptom: "We're slammed in school holidays and empty in between",
        cause: "Marketing runs the same all year, so it competes hardest when demand is already high.",
        steps: [
          "Map your year's demand peaks and troughs",
          "Shift spend to shoulder periods with offers",
          "Target the cities your visitors come from",
        ],
      },
      {
        service: "social-media-marketing",
        symptom: "Our experience is amazing but our Instagram doesn't show it",
        cause: "Photos don't capture what it feels like, and content stops in busy periods.",
        steps: [
          "Film short clips during real tours, classes or services",
          "Repost guests' content with permission",
          "Batch content in quiet weeks for the busy ones",
        ],
      },
      {
        service: "ai-automation",
        symptom: "We answer the same guest questions all day",
        cause: "Parking, check-in, what to bring and cancellation questions arrive by email, chat and phone.",
        steps: [
          "Send useful pre-arrival messages automatically",
          "Answer common questions instantly from your own information",
          "Pass anything unusual to staff",
        ],
      },
      {
        service: "seo",
        symptom: "Visitors plan their trip and never come across us",
        cause: "Trip-planning searches return tourism guides and big operators, not you.",
        steps: [
          "Write pages for the searches visitors make while planning",
          "Complete your Google profile with photos and booking links",
          "Get featured on guides and sites that rank",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Our brand sells to tourists but not once they've gone home",
        cause: "Visitors find you in person, but there's no easy way to keep buying afterwards.",
        steps: [
          "Put a store link on receipts, tags and packaging",
          "Collect emails at the counter with a reason to sign up",
          "Ship nationally and to New Zealand",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office on the Gold Coast?",
        answer: "No. We work from Lucknow and Mumbai, India, and with Gold Coast businesses over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:30 to 23:30 Gold Coast time, Monday to Saturday, all year. Queensland doesn't change its clocks.",
      },
      {
        question: "Should we stop using booking sites?",
        answer: "Usually not. They bring guests you wouldn't otherwise reach. The aim is to win more repeat and direct bookings so you rely on them less.",
      },
      {
        question: "Can you work around our peak season?",
        answer: "Yes. We schedule launches and big changes for quieter periods and avoid touching booking systems during your busiest weeks.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development on the Gold Coast — Direct Bookings That Save Commission",
      metaDescription:
        "Website development for Gold Coast tours, stays and venues: direct booking as quick as the big platforms, real availability and pages that rank for trip planning.",
      h1: "Website development for Gold Coast operators who want more direct bookings",
      card: "Direct-booking sites that keep commission in your pocket.",
      intro: [
        "For a Gold Coast tour, stay or venue, every booking that comes direct instead of through a booking site keeps the commission. But guests only book direct when it's as easy as the platform they found you on: clear prices, real photos, accurate availability and a checkout that works on a phone.",
        "We build websites that make direct booking that easy, and give guests a reason to choose it.",
      ],
      sections: [
        {
          heading: "As easy as the big platforms",
          body: [
            "Availability and prices shown up front, not after an enquiry. A booking flow that takes a minute on a phone, with Apple Pay and Google Pay. Clear cancellation terms. Confirmation and reminder messages sent automatically. We connect the booking engine or channel manager you already use, or set one up.",
          ],
        },
        {
          heading: "A reason to book direct",
          body: [
            "Booking sites win on convenience. You can win on value: a welcome extra, flexible changes, a better room choice or a small discount for booking direct. We make that offer visible on every page where guests decide.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Guests find us on booking sites, then book there",
          cause: "Our site is slower, less clear about availability and harder to book on.",
          steps: [
            "Show live availability and prices on the site",
            "Simplify booking to a few steps on mobile",
            "Promote a book-direct benefit everywhere",
          ],
        },
        {
          symptom: "Past guests book through booking sites again",
          cause: "We never stay in touch after the stay or tour.",
          steps: [
            "Collect guest emails with consent at booking",
            "Send a thank-you and a direct-booking offer",
            "Remind them before next year's holidays",
          ],
        },
      ],
      checklist: [
        "Guests can see availability and prices without enquiring",
        "Booking takes under two minutes on a phone",
        "Your site offers a clear reason to book direct",
        "Past guests hear from you before the next season",
      ],
      faqs: [
        {
          question: "Can you connect our channel manager?",
          answer: "Usually, yes. Most channel managers and booking engines have integrations or embeddable booking flows. We confirm during scoping.",
        },
        {
          question: "How long does a booking website take?",
          answer: "Typically four to seven weeks. We schedule launch away from your peak season.",
        },
      ],
      caseStudies: ["ladyscootytrainer"],
    },
    "web-design": {
      metaTitle: "Web Design on the Gold Coast — For Wellness & Lifestyle Brands",
      metaDescription:
        "Web design for Gold Coast wellness studios, clinics and lifestyle brands: visual, video-led sites that still make booking a class or appointment effortless.",
      h1: "Web design for Gold Coast wellness and lifestyle brands that sell a feeling",
      card: "Visual, video-led sites that make booking effortless.",
      intro: [
        "Gold Coast wellness studios, clinics, surf schools and lifestyle brands sell a feeling as much as a service: sunshine, energy, calm, a fresh start. Their websites need to carry that feeling with video, photography and tone, while making it effortless to book a class, appointment or lesson.",
        "We design sites that do both, so the mood draws people in and the booking button never gets lost in it.",
      ],
      sections: [
        {
          heading: "Video that doesn't slow the site",
          body: [
            "Short, looping hero video can say more than a page of text, but it can also make a site slow. We compress and stream video, load it after the essentials and fall back to a still image on slow connections.",
          ],
        },
        {
          heading: "Booking never more than a tap away",
          body: [
            "Timetables, pricing and booking are visible from every page. New visitors see an intro offer. Members can log in to manage their bookings. Everything works one-handed on a phone.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site looks good but people don't book",
          cause: "The timetable and prices are hard to find, and booking opens a clunky third-party page.",
          steps: [
            "Put timetable and pricing one tap from the homepage",
            "Embed booking cleanly in your own design",
            "Show an intro offer to first-time visitors",
          ],
        },
        {
          symptom: "Our site is slow because of all the video",
          cause: "Full-size videos load before anything else.",
          steps: [
            "Compress and stream video",
            "Load text and booking first",
            "Use a still image on slow connections",
          ],
        },
      ],
      checklist: [
        "Your timetable or prices are one tap from the homepage",
        "New visitors see an intro offer",
        "Hero video doesn't delay the page appearing",
        "Booking works smoothly on a phone",
      ],
      faqs: [
        {
          question: "Can you work with Mindbody or similar booking software?",
          answer: "Yes. We design around the booking platform you use and embed it as cleanly as it allows.",
        },
        {
          question: "Do you film the videos?",
          answer: "No, we're remote. We brief you or a local videographer on what to capture, then design around it.",
        },
      ],
      caseStudies: ["vashtaraheaven", "kalamohini"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development on the Gold Coast — Surf, Swim & Activewear",
      metaDescription:
        "Ecommerce for Gold Coast surf, swim and activewear brands: stores that sell nationally and overseas, handle sizing and returns, and ride the summer peak.",
      h1: "Ecommerce for Gold Coast surf, swim and activewear brands",
      card: "Stores for swim and activewear brands selling far beyond the Coast.",
      intro: [
        "The Gold Coast has a strong community of surf, swim and activewear brands. Many began with a local shop or market stall and now sell across Australia and overseas, where customers can't try anything on and summer arrives at different times.",
        "We build online stores that handle sizing and fit, returns and exchanges, international shipping and the rush of the Australian summer.",
      ],
      sections: [
        {
          heading: "Fit sells swimwear",
          body: [
            "Detailed size charts in centimetres, fit notes on every product, model measurements and reviews that mention sizing reduce returns and increase confidence. Exchanges are easy, and customers keep their rights under Australian Consumer Law.",
          ],
        },
        {
          heading: "Selling overseas",
          body: [
            "Prices in local currency, international shipping rates, duties shown clearly and payment options that suit each market. We start with the markets where you already get orders, often New Zealand, then expand.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Swimwear returns are killing us",
          cause: "Customers order several sizes and return what doesn't fit.",
          steps: [
            "Add detailed sizing and fit notes",
            "Show model measurements and fit reviews",
            "Offer quick exchanges instead of refunds where customers choose",
          ],
        },
        {
          symptom: "Overseas customers abandon at checkout",
          cause: "Prices are in AUD and shipping or duties are a surprise.",
          steps: [
            "Show local currency prices",
            "Show shipping and duties before checkout",
            "Offer local payment methods",
          ],
        },
      ],
      checklist: [
        "Every product has measurements and a fit note",
        "Exchanges can be requested online",
        "International customers see prices in their currency",
        "Your store is ready for summer traffic before October",
      ],
      faqs: [
        {
          question: "Can you set up international shipping?",
          answer: "Yes, with rates by country or zone and carriers that handle duties. We start with your current overseas markets.",
        },
        {
          question: "What platform suits a swimwear brand?",
          answer: "Shopify, for most. Its multi-currency and international features are strong, and your team can run it easily.",
        },
      ],
      caseStudies: ["samaraha", "vashtaraheaven"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development on the Gold Coast — Sell Beyond the Holiday",
      metaDescription:
        "Shopify developers for Gold Coast brands: stores that keep tourists buying after they leave, with NZ and international selling, and a lean, fast theme.",
      h1: "Shopify development for Gold Coast brands whose customers fly home",
      card: "Shopify stores that keep visitors buying after they've gone home.",
      intro: [
        "Gold Coast shops and brands sell to people on holiday, who then fly home to Sydney, Melbourne, Auckland or further away. Many of them would buy again, if it were easy to find and order from you once they were home.",
        "We build Shopify stores designed for that: easy to find from a receipt, tag or bag, shipping nationally and internationally, with email follow-up that turns holiday buyers into regular customers.",
      ],
      sections: [
        {
          heading: "From the counter to online",
          body: [
            "A short web address or QR code on receipts, swing tags and bags. Email sign-up at the counter with a reason to join. A store that recognises the customer and makes reordering simple.",
          ],
        },
        {
          heading: "Shopify Markets for overseas visitors",
          body: [
            "With Shopify Markets, international customers see prices in their own currency and shipping that makes sense for their country. We set up the markets where your visitors come from first.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors love our products but never order again",
          cause: "There's nothing connecting the in-store purchase to the online store.",
          steps: [
            "Add a QR code or short link to receipts and tags",
            "Capture emails in-store with consent",
            "Send a welcome email with a reorder offer",
          ],
        },
        {
          symptom: "Our in-store and online stock don't match",
          cause: "Separate systems for the shop and the website.",
          steps: [
            "Use Shopify POS in-store",
            "Share stock across channels",
            "Set low-stock alerts",
          ],
        },
      ],
      checklist: [
        "Receipts or tags link to your online store",
        "In-store customers can join your email list",
        "New Zealand customers see NZD prices",
        "In-store and online stock are shared",
      ],
      faqs: [
        {
          question: "Can Shopify POS work at markets and pop-ups too?",
          answer: "Yes. Shopify POS runs on a phone or tablet with a card reader and shares stock with your store.",
        },
        {
          question: "Do you migrate existing stores?",
          answer: "Yes, with products, customers, orders and redirects for every old URL.",
        },
      ],
      caseStudies: ["clickngreet", "sitaravastram"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development on the Gold Coast — Tours & Experiences Platforms",
      metaDescription:
        "Marketplace development for Gold Coast founders: tours, activities and local experience platforms with live availability, operator tools and automatic payouts.",
      h1: "Marketplace development for Gold Coast tours and experiences platforms",
      card: "Experience marketplaces with live availability and operator payouts.",
      intro: [
        "The Gold Coast and its hinterland have hundreds of small operators, including surf schools, rainforest tours, fishing charters, food experiences and wellness retreats. Many are too small to market themselves well. Platforms that bring them together for visitors solve a real problem on both sides.",
        "We build experience marketplaces with operator onboarding, live availability, bookings and payments, automatic payouts and reviews.",
      ],
      sections: [
        {
          heading: "Live availability or nothing",
          body: [
            "Experience platforms fail when availability is wrong. Operators manage their own calendars and capacity on the platform, or connect existing booking systems, so visitors only book slots that exist.",
          ],
        },
        {
          heading: "Operators paid automatically",
          body: [
            "Visitors pay once; operators receive their share automatically after the experience, using Stripe Connect. Your commission is calculated and invoiced on every booking, and records are kept for the ATO's platform reporting rules.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors book slots operators can't honour",
          cause: "Availability is updated by hand and goes out of date.",
          steps: [
            "Give operators their own calendar and capacity tools",
            "Connect operators' existing booking systems",
            "Hold a slot only once payment is confirmed",
          ],
        },
        {
          symptom: "Paying operators takes a day each week",
          cause: "Payouts are calculated in a spreadsheet and sent by bank transfer.",
          steps: [
            "Calculate payouts automatically after each experience",
            "Pay through Stripe Connect",
            "Give operators a payout history",
          ],
        },
      ],
      checklist: [
        "Operators manage their own availability",
        "Bookings only go through for real slots",
        "Operators are paid automatically",
        "Every booking produces a commission invoice",
      ],
      faqs: [
        {
          question: "Can operators keep their existing booking system?",
          answer: "Where it has an API, yes. Otherwise they manage availability on the platform.",
        },
        {
          question: "How long does a first version take?",
          answer: "Usually ten to sixteen weeks for listings, availability, booking, payments and basic operator tools.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development on the Gold Coast — Multilingual Tourism Sites",
      metaDescription:
        "Next.js development for Gold Coast tourism businesses: fast, multilingual sites for international visitors, with booking integrated and strong search performance.",
      h1: "Next.js development for Gold Coast tourism sites with international guests",
      card: "Fast multilingual sites for international visitors.",
      intro: [
        "International visitors plan Gold Coast trips in their own languages, often on phones with roaming data. A tourism site that is slow, English-only and heavy loses them early.",
        "We build Next.js tourism sites with proper multilingual support, fast pages and booking integration, so overseas guests can plan and book with you as easily as locals.",
      ],
      sections: [
        {
          heading: "Multilingual done properly",
          body: [
            "Each language gets its own URLs, translated metadata and hreflang tags, so search engines show the right version to the right visitor. Translations are managed in a CMS, not hard-coded, and can be updated by your team or translators.",
          ],
        },
        {
          heading: "Fast on roaming data",
          body: [
            "Pages are pre-rendered and served from a global CDN, images are sized for each device, and booking loads only when needed. The site stays quick even on a weak roaming connection.",
          ],
        },
      ],
      problems: [
        {
          symptom: "International visitors bounce from our English-only site",
          cause: "Visitors who don't read English well leave before finding what they need.",
          steps: [
            "Translate key pages for your main visitor markets",
            "Set up hreflang and separate URLs for each language",
            "Translate booking steps and confirmations",
          ],
        },
        {
          symptom: "Our site is slow for overseas visitors",
          cause: "It's hosted on a single server in one location.",
          steps: [
            "Serve pages from a global CDN",
            "Optimise images by device",
            "Load booking widgets only when needed",
          ],
        },
      ],
      checklist: [
        "Your site is available in your main visitors' languages",
        "Each language version has its own URL",
        "The site loads quickly on a mobile connection",
        "Booking works in every language",
      ],
      faqs: [
        {
          question: "Do you provide translations?",
          answer: "We set up the structure and can arrange machine translation as a starting point. For important pages we recommend a professional translator review.",
        },
        {
          question: "Can we add languages later?",
          answer: "Yes. The site is built so new languages can be added without restructuring.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development on the Gold Coast — Check-In & Ticket Apps",
      metaDescription:
        "Android apps for Gold Coast tours, venues and events: guest check-in, QR ticket scanning, manifests and waivers on staff devices, working offline at the beach.",
      h1: "Android apps for Gold Coast tours, venues and events staff",
      card: "Check-in, ticket scanning and waivers on staff devices.",
      intro: [
        "Tour operators, venues and events on the Gold Coast still check guests in from printed manifests, scan tickets with clunky apps and collect waivers on paper. It slows down boarding and arrivals at exactly the moment guests are most impatient.",
        "We build native Android apps for staff devices that handle check-in, QR ticket scanning, manifests and digital waivers, working offline on a beach, boat or rainforest trail.",
      ],
      sections: [
        {
          heading: "Fast at the front of the queue",
          body: [
            "Scan a QR code or search a name, see the booking details and check guests in with a tap. Waivers can be signed on the device or before arrival. The manifest updates for everyone on the team.",
          ],
        },
        {
          heading: "Android for staff, web for guests",
          body: [
            "Staff use company Android devices, which keeps the app simpler and cheaper. Guests don't need to install anything; they use their booking confirmation and a web link. If you need an app for guests on iPhone, we scope a React Native build separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Check-in queues delay our departures",
          cause: "Staff check guests against a printed list and collect paper waivers.",
          steps: [
            "Send waivers to guests before arrival",
            "Scan QR codes from booking confirmations",
            "Share a live manifest across staff devices",
          ],
        },
        {
          symptom: "We lose track of who's on board",
          cause: "Manifest changes are made on paper and not shared.",
          steps: [
            "Keep the manifest in the app",
            "Sync changes between staff devices",
            "Work offline and sync when back in range",
          ],
        },
      ],
      checklist: [
        "Guests can sign waivers before they arrive",
        "Staff can check guests in with a scan",
        "The manifest updates on every staff device",
        "Check-in works without reception",
      ],
      faqs: [
        {
          question: "Can the app connect to our booking system?",
          answer: "Usually, through its API. We check before quoting.",
        },
        {
          question: "Will it work on cheap Android phones?",
          answer: "Yes. We test on the devices you plan to use.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services on the Gold Coast — Be Found While Trips Are Planned",
      metaDescription:
        "SEO for Gold Coast tourism and local businesses: content for trip-planning searches, Google Business Profile for 'near me' searches and reviews that win the click.",
      h1: "SEO for Gold Coast businesses that need to be found before visitors arrive",
      card: "Trip-planning content plus near-me visibility once visitors arrive.",
      intro: [
        "Visitors search for things to do and places to eat months before they arrive, and again on the day. Being found in both moments, while trips are planned and once people are here, is what keeps a Gold Coast tourism business full.",
        "We build content around trip-planning searches and set up your Google Business Profile and reviews for the \"near me\" searches that happen on the Coast itself.",
      ],
      sections: [
        {
          heading: "While the trip is being planned",
          body: [
            "Visitors search for things like \"rainy day activities Gold Coast\", \"best hinterland tours\" or \"family-friendly restaurants Broadbeach\". Useful pages that answer those questions put you on the shortlist. We write them from your knowledge of the area.",
          ],
        },
        {
          heading: "Once they're here",
          body: [
            "On the day, visitors search Google Maps. A complete profile with current hours, photos, booking links and a steady flow of recent reviews decides who gets the visit.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Tourism guides rank above us for our own activity",
          cause: "Guides cover the topic in depth; our site only lists what we offer.",
          steps: [
            "Write in-depth pages on what visitors want to know",
            "Include practical details: getting there, what to bring",
            "Link those pages to booking",
          ],
        },
        {
          symptom: "We don't appear when visitors search nearby",
          cause: "Our Google profile is incomplete and has few recent reviews.",
          steps: [
            "Complete every section of the profile",
            "Add booking links and current photos",
            "Ask every guest for a review after their visit",
          ],
        },
      ],
      checklist: [
        "You have pages answering trip-planning questions",
        "Your Google profile has a booking link",
        "You get new reviews every week in season",
        "Your hours are correct for public and school holidays",
      ],
      faqs: [
        {
          question: "How long does tourism SEO take?",
          answer: "Profile improvements show quickly. Planning content usually takes a few months to rank, so start well before peak season.",
        },
        {
          question: "Should we target international searches?",
          answer: "If a large share of your guests are international, yes, in their languages. We'll look at your guest data first.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads on the Gold Coast — Campaigns Timed to the Season",
      metaDescription:
        "Google Ads for Gold Coast tourism, hospitality and services: campaigns aimed at Sydney, Melbourne and NZ travellers, timed to school holidays and events.",
      h1: "Google Ads for Gold Coast businesses whose customers are still at home",
      card: "Ads aimed at travellers before they arrive, timed to the season.",
      intro: [
        "Gold Coast demand moves with school holidays, events and the seasons, and many customers are searching from somewhere else: Sydney, Melbourne, Brisbane, New Zealand. Campaigns that only target the Coast miss the people still planning.",
        "We plan campaigns around those peaks, target the places your visitors search from and pull back spend when demand drops.",
      ],
      sections: [
        {
          heading: "Target where visitors are, not where you are",
          body: [
            "We run separate campaigns for local customers and for travellers in your main source markets. Ads for travellers speak to planning (\"plan your hinterland day trip\"), while local ads speak to now.",
          ],
        },
        {
          heading: "Spend when it matters",
          body: [
            "In peak weeks, demand fills itself and clicks are expensive. We often shift budget to the shoulder periods, with offers that fill quieter weeks, which is usually where ads earn most.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads only reach people already on the Coast",
          cause: "Location targeting is set to the Gold Coast alone.",
          steps: [
            "Create campaigns for your visitors' home cities",
            "Write planning-focused ads for them",
            "Measure bookings by source location",
          ],
        },
        {
          symptom: "Our ad costs spike in school holidays",
          cause: "Everyone advertises at the same time.",
          steps: [
            "Reduce bids when you're already full",
            "Move budget to shoulder periods",
            "Promote offers that fill quieter weeks",
          ],
        },
      ],
      checklist: [
        "You run separate campaigns for visitors and locals",
        "Budgets change with your season",
        "Bookings from ads are tracked",
        "Ads point to pages with live availability",
      ],
      faqs: [
        {
          question: "Can you track bookings made through our booking engine?",
          answer: "Usually, yes, with conversion tracking set up on the booking confirmation. We check your engine's support.",
        },
        {
          question: "What about ads in New Zealand?",
          answer: "Yes, we can run campaigns targeting New Zealand travellers with NZ-specific ads.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing on the Gold Coast — Short Video That Books Trips",
      metaDescription:
        "Social media for Gold Coast tours, venues and lifestyle brands: short-form video, guest content and paid social aimed at people planning a trip.",
      h1: "Social media for Gold Coast businesses that sell an experience",
      card: "Short-form video and guest content aimed at trip planners.",
      intro: [
        "Gold Coast businesses sell experiences, and short-form video sells experiences better than anything else: a wave, a sunset cruise, a plate arriving at the table, a rainforest view. Guests are already filming it for you.",
        "We plan content you can keep up through the busy season, reuse guest content with permission, and run paid social aimed at people planning a trip, not just people who already live here.",
      ],
      sections: [
        {
          heading: "Your guests are your content team",
          body: [
            "We set up a simple way for guests to share and tag you, ask permission to repost, and turn the best clips into posts and ads. Real guest footage is often more convincing than anything produced professionally.",
          ],
        },
        {
          heading: "Reaching planners",
          body: [
            "Paid social is aimed at people in your visitors' home cities with travel interests, timed ahead of school holidays. Ads link straight to booking pages, and we track the bookings that follow.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our content stops during peak season",
          cause: "The team is too busy to film and post.",
          steps: [
            "Batch content in quiet weeks",
            "Use guest content with permission",
            "Let us schedule everything in advance",
          ],
        },
        {
          symptom: "Our posts reach locals but not travellers",
          cause: "Organic reach stays near you; no paid reach to source markets.",
          steps: [
            "Run paid social in visitors' home cities",
            "Time campaigns ahead of holidays",
            "Link ads to booking pages",
          ],
        },
      ],
      checklist: [
        "You repost guest content with permission",
        "You have content scheduled for peak season",
        "Your ads reach people in visitors' home cities",
        "You track bookings from social",
      ],
      faqs: [
        {
          question: "Do we need permission to repost guests' videos?",
          answer: "Yes. We ask each guest and keep a record of their consent before reposting.",
        },
        {
          question: "Which platforms work best for tourism?",
          answer: "Usually Instagram and TikTok for discovery, with Facebook for older audiences and families.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation on the Gold Coast — Guest Messaging That Answers Itself",
      metaDescription:
        "AI automation for Gold Coast tours, stays and venues: pre-arrival messages, instant answers to guest questions, review requests and multilingual replies.",
      h1: "AI automation for Gold Coast operators answering the same guest questions all day",
      card: "Guest messages, FAQs and review requests handled automatically.",
      intro: [
        "Gold Coast tours, stays and venues answer the same questions all day: where to park, what time to arrive, what to bring, whether it's still on if it rains, how to cancel. In peak season, those questions arrive faster than staff can answer.",
        "We build AI automation that answers from your own information, sends useful messages before and after each visit and passes anything unusual to your team.",
      ],
      sections: [
        {
          heading: "Before, during and after the visit",
          body: [
            "Pre-arrival messages with directions, parking and what to bring. Instant answers to common questions by email or chat. A thank-you and review request after the visit. All drafted from your information and approved by you before they go live.",
          ],
        },
        {
          heading: "In the guest's language",
          body: [
            "Many guests are international. AI can understand questions in their language and reply in kind, with your team able to see the original and the translation.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Guests miss their tour because they went to the wrong place",
          cause: "Meeting-point details are buried in the confirmation email.",
          steps: [
            "Send a clear pre-arrival message the day before",
            "Include a map link and arrival time",
            "Reply to questions instantly",
          ],
        },
        {
          symptom: "We forget to ask for reviews",
          cause: "Review requests depend on staff remembering.",
          steps: [
            "Send a review request automatically after each visit",
            "Link directly to your Google review page",
            "Alert staff to negative feedback quickly",
          ],
        },
      ],
      checklist: [
        "Guests receive a pre-arrival message",
        "Common questions are answered instantly",
        "Every guest gets a review request",
        "Unusual questions reach a person quickly",
      ],
      faqs: [
        {
          question: "Will the AI make up answers?",
          answer: "It answers only from the information you approve, and passes anything it can't answer to your team.",
        },
        {
          question: "Can it connect to our booking system?",
          answer: "Usually, so messages include each guest's booking details. We check during scoping.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software on the Gold Coast — Functions & Events Management",
      metaDescription:
        "Custom software for Gold Coast venues and event businesses: enquiries, quotes, run sheets, deposits and supplier coordination in one system.",
      h1: "Custom software for Gold Coast venues running weddings, functions and events",
      card: "Function enquiries, quotes, run sheets and deposits in one place.",
      intro: [
        "The Gold Coast hosts a steady stream of weddings, functions, conferences and events. Behind each one is a mess of emails, spreadsheets and documents: enquiries, quotes, menus, run sheets, deposits, supplier bookings and final numbers.",
        "We build event management systems for venues and event businesses that bring it all together, from first enquiry to final invoice.",
      ],
      sections: [
        {
          heading: "From enquiry to run sheet",
          body: [
            "Enquiries come in with dates, numbers and budgets. Quotes are built from packages and menus. Once confirmed, the event's details, run sheet and supplier list live in one place, updated as plans change, and shared with staff and suppliers.",
          ],
        },
        {
          heading: "Deposits and final numbers",
          body: [
            "Deposit and balance payments are requested and tracked automatically. Final numbers and dietary requirements are collected through a form, not a phone call two days before.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Event details are spread across email threads",
          cause: "There's no single record for each event.",
          steps: [
            "Create one record per event with all details",
            "Generate run sheets from it",
            "Share updates with staff and suppliers",
          ],
        },
        {
          symptom: "We chase deposits and final numbers by phone",
          cause: "Payments and confirmations are tracked by hand.",
          steps: [
            "Send payment requests automatically",
            "Collect final numbers and dietary needs by form",
            "Remind clients before deadlines",
          ],
        },
      ],
      checklist: [
        "Each event has a single, up-to-date record",
        "Run sheets are generated from that record",
        "Deposits are requested and tracked automatically",
        "Final numbers are collected without phone calls",
      ],
      faqs: [
        {
          question: "Couldn't we use existing venue software?",
          answer: "Possibly, and we'll say so if one fits. Custom makes sense when your packages, workflow or integrations don't fit existing products.",
        },
        {
          question: "Can it connect to our accounting software?",
          answer: "Yes, so deposits and invoices flow into Xero or MYOB automatically.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "api-integration": {
      metaTitle: "API Integration on the Gold Coast — Booking Engines, Channels & PMS",
      metaDescription:
        "API integration for Gold Coast accommodation and tourism: connect booking engines, channel managers, PMS, payments and accounting so availability and revenue match.",
      h1: "API integration for Gold Coast accommodation and tour operators",
      card: "Connect booking engines, channel managers, PMS and accounting.",
      intro: [
        "Gold Coast accommodation and tour operators juggle a booking engine, a channel manager feeding several booking sites, a property management system, payments and accounting. When they disagree, you get double bookings, missed payments and revenue reports nobody trusts.",
        "We connect those systems so availability, bookings and payments match everywhere, with alerts when something fails.",
      ],
      sections: [
        {
          heading: "Availability you can trust",
          body: [
            "The channel manager and booking engine stay in sync with your PMS, so a room or seat sold on one channel disappears from the others immediately. Failures are flagged before they become double bookings.",
          ],
        },
        {
          heading: "Revenue that adds up",
          body: [
            "Bookings, payments, commissions and refunds flow into your accounting in a form your bookkeeper can reconcile, with each channel's commission recorded separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We get double bookings in peak season",
          cause: "Availability syncs slowly or fails without warning.",
          steps: [
            "Audit how availability flows between systems",
            "Fix or replace the weak connection",
            "Alert staff immediately when a sync fails",
          ],
        },
        {
          symptom: "We can't see what each booking channel really earns",
          cause: "Commissions and fees aren't recorded separately.",
          steps: [
            "Record bookings by channel with their commission",
            "Post them to accounting with fees separated",
            "Report net revenue by channel",
          ],
        },
      ],
      checklist: [
        "A booking on one channel updates the others within minutes",
        "You're alerted when a sync fails",
        "Commission by channel is recorded",
        "Bookings flow into accounting automatically",
      ],
      faqs: [
        {
          question: "Which systems can you connect?",
          answer: "Most channel managers, booking engines and PMS platforms with APIs. We confirm access before quoting.",
        },
        {
          question: "Will you touch our systems in peak season?",
          answer: "Not unless it's urgent. We schedule integration work for quieter periods.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions on the Gold Coast — Booking Sites That Survive Peak Season",
      metaDescription:
        "Cloud hosting for Gold Coast tourism and events sites: scaling for holiday and event traffic, uptime monitoring, backups and Australian hosting.",
      h1: "Cloud hosting for Gold Coast sites that can't go down in school holidays",
      card: "Hosting that scales for holidays and events, with monitoring.",
      intro: [
        "For a Gold Coast tourism or events business, the website is busiest in the same few weeks the business is busiest. If it slows down or goes offline then, the cost is counted in lost bookings.",
        "We set up hosting that scales for peak traffic, is monitored around the clock by automated alerts, and is backed up and hosted in Australia.",
      ],
      sections: [
        {
          heading: "Ready for the rush",
          body: [
            "Pages are cached and served from a CDN, servers scale with demand, and we load-test before your peak periods. You pay for extra capacity only when it's used.",
          ],
        },
        {
          heading: "Payments handled safely",
          body: [
            "Card details go straight to your payment provider and never touch your servers, which keeps your security obligations simple. We set it up that way from the start.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site slows down when we're busiest",
          cause: "Fixed hosting capacity, with no caching for peak traffic.",
          steps: [
            "Cache pages and serve them from a CDN",
            "Configure automatic scaling",
            "Load-test before each peak",
          ],
        },
        {
          symptom: "We didn't know our site was down until guests told us",
          cause: "No monitoring.",
          steps: [
            "Add uptime monitoring with alerts",
            "Monitor the booking flow, not just the homepage",
            "Keep a simple response plan",
          ],
        },
      ],
      checklist: [
        "Your site has been load-tested before peak season",
        "Uptime monitoring checks the booking flow",
        "Card details never touch your servers",
        "Backups run daily",
      ],
      faqs: [
        {
          question: "What if the site goes down outside your hours?",
          answer: "Monitoring alerts us and you. We're available 14:30 to 23:30 Gold Coast time, Monday to Saturday; if you need round-the-clock cover, we'll help you plan it.",
        },
        {
          question: "Is hosting in Australia necessary?",
          answer: "Not always, but it's often faster for Australian visitors and simpler for privacy. We recommend Australian regions by default.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance on the Gold Coast — Seasonal Updates Handled",
      metaDescription:
        "Website maintenance for Gold Coast tourism and hospitality: seasonal prices, specials and hours updated, peak-season readiness checks, security and backups.",
      h1: "Website maintenance for Gold Coast businesses that change with the seasons",
      card: "Seasonal prices, specials and readiness checks, plus upkeep.",
      intro: [
        "Gold Coast businesses change their websites with the seasons: new prices, school holiday specials, event packages, winter hours. When those updates slip, guests see last season's offer and staff field the confused calls.",
        "Our maintenance plans handle seasonal updates and a readiness check before each peak, alongside updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "A check before every peak",
          body: [
            "Before each school holiday period, we check that prices, availability, specials and hours are right, that the booking flow works end to end, and that the site is fast. You get a short report and a list of anything to fix.",
          ],
        },
        {
          heading: "Updates on request",
          body: [
            "Send us new prices, packages or photos and they're live within one working day. A set number of changes is included each month.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site still shows last season's specials",
          cause: "Seasonal updates aren't anyone's job.",
          steps: [
            "Keep a calendar of seasonal changes",
            "Update before each season starts",
            "Check the booking flow after each change",
          ],
        },
        {
          symptom: "Our booking flow broke and we didn't notice",
          cause: "Nobody tests the full booking process regularly.",
          steps: [
            "Test the booking flow before every peak",
            "Monitor it automatically",
            "Fix issues before guests hit them",
          ],
        },
      ],
      checklist: [
        "This season's prices and specials are on the site",
        "Holiday hours are published in advance",
        "The booking flow was tested in the last month",
        "Software was updated this month",
      ],
      faqs: [
        {
          question: "Can you update our booking engine content too?",
          answer: "If we have access, yes, for content like descriptions and photos. Rates and inventory usually stay with your team.",
        },
        {
          question: "How quickly do you respond to urgent problems?",
          answer: "Immediately during our hours, 14:30 to 23:30 Gold Coast time, Monday to Saturday.",
        },
      ],
    },
  },
}
