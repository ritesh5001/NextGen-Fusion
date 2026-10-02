import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const newcastle: AuCity = {
  slug: "newcastle",
  name: "Newcastle",
  state: "New South Wales",
  stateCode: "NSW",
  summary: "The Hunter's industrial, energy and health hub, now competing with Sydney for customers and talent.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Newcastle CBD", "Honeysuckle", "Hamilton", "Merewether", "Cooks Hill", "The Junction", "Charlestown", "Kotara", "Lake Macquarie", "Maitland", "Cessnock", "Port Stephens", "Raymond Terrace", "Hunter Valley"],
  nearby: ["sydney", "sunshine-coast", "wollongong"],
  page: {
    metaTitle: "Websites, SEO & Software for Newcastle and Hunter Businesses",
    metaDescription:
      "Websites, SEO, ecommerce and software for Newcastle and Hunter businesses repositioning for the energy transition and competing with Sydney for customers.",
    h1: "Helping Newcastle and Hunter businesses through a decade of change",
    intro: [
      "Newcastle and the Hunter combine heavy industry and one of the world's big export ports with a region at the centre of Australia's energy transition, plus a large health and university sector and the Hunter Valley's wine and tourism trade.",
      "Change brings opportunity and pressure. Industrial firms are repositioning, Sydney people and businesses are moving north, and local businesses are suddenly being compared with Sydney ones. We help Hunter businesses look, sell and operate like they belong in that comparison. We work remotely from India, with no Newcastle office.",
    ],
    sections: [
      {
        heading: "Repositioning, not just refreshing",
        body: [
          "Many Hunter firms built their reputation serving coal, power and heavy industry, and are now winning work in renewables, transmission, hydrogen projects, defence and advanced manufacturing. Their websites still describe the old business.",
          "That's a costly mismatch: new clients can't see the capability, and recruits can't see the future. Updating how you present the business online is often the cheapest part of a strategic shift, and one of the most visible.",
        ],
      },
      {
        heading: "Our hours in Newcastle",
        body: [
          "We work 14:30 to 23:30 Newcastle time (15:30 to 00:30 during daylight saving), Monday to Saturday. Send a brief in the morning and you'll have our reply that afternoon.",
        ],
      },
    ],
    industries: [
      { name: "Engineering, energy and industrial", need: "Firms need to show new capability in renewables, transmission and advanced manufacturing alongside their track record." },
      { name: "Health and allied health", need: "Clinics and providers need online booking, referral handling and careful management of patient information." },
      { name: "Hunter Valley wine and tourism", need: "Cellar doors, venues and stays need direct bookings and online sales to Sydney weekenders." },
      { name: "Trades and home services", need: "From Lake Macquarie to Maitland, work comes from local search, reviews and fast replies." },
    ],
    problems: [
      {
        service: "website-development",
        symptom: "Our website still describes the business we were ten years ago",
        cause: "The firm has moved into renewables, transmission or defence work, but the site only shows coal and power projects.",
        steps: [
          "List the markets you're pursuing now and the evidence you have",
          "Restructure the site around those markets",
          "Keep your track record, framed as transferable capability",
        ],
      },
      {
        service: "seo",
        symptom: "Customers in Maitland and Lake Macquarie choose someone closer",
        cause: "The Hunter is several local markets, and Google favours businesses near each searcher.",
        steps: [
          "Set your service area across the Hunter",
          "Build pages for each area with local jobs",
          "Ask customers in each area for reviews",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our clinic spends hours on referrals and intake forms",
        cause: "Referral letters and paper intake forms are typed into the practice system by hand.",
        steps: [
          "Move intake forms online before the appointment",
          "Extract key details from referral letters automatically",
          "Have staff check and file, rather than retype",
        ],
      },
      {
        service: "web-design",
        symptom: "New residents from Sydney think our business looks dated",
        cause: "The site hasn't changed in years and looks out of place next to the Sydney businesses they're used to.",
        steps: [
          "Refresh the design around real photography",
          "Lead with what makes you the local choice",
          "Make booking or enquiring easy on a phone",
        ],
      },
      {
        service: "software-development",
        symptom: "Asset inspections and maintenance are tracked in spreadsheets",
        cause: "Inspection results, defects and work orders live in different files.",
        steps: [
          "Register assets with inspection schedules",
          "Record inspections and defects on a tablet",
          "Turn defects into tracked work orders",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Sydney weekenders love our produce but never order online",
        cause: "There's no simple way to order after the visit, and delivery to Sydney isn't offered clearly.",
        steps: [
          "Collect emails at the counter with consent",
          "Offer Sydney metro delivery at a clear price",
          "Send a follow-up with a reorder link",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Newcastle?",
        answer: "No. We work remotely from Lucknow and Mumbai, India, with Hunter businesses over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:30 to 23:30 Newcastle time, or 15:30 to 00:30 during daylight saving, Monday to Saturday.",
      },
      {
        question: "Do you work with Hunter Valley businesses outside Newcastle?",
        answer: "Yes, from Cessnock and Pokolbin to Port Stephens and the Upper Hunter.",
      },
      {
        question: "Can you help an industrial firm reposition for new markets?",
        answer: "We can restructure and rewrite how you present the business online. The strategy and the evidence come from you; we make them clear and findable.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Newcastle — Repositioning Industrial Firms",
      metaDescription:
        "Website development for Newcastle and Hunter industrial firms moving into renewables, transmission, defence and advanced manufacturing. Show the capability you have now.",
      h1: "Website development for Hunter firms moving into new markets",
      card: "Sites that show where an industrial firm is heading, not just where it's been.",
      intro: [
        "Hunter engineering and industrial firms built strong reputations serving coal, power and heavy industry. Many are now winning work in renewables, transmission, hydrogen, defence and advanced manufacturing, but their websites still show only the old work.",
        "We rebuild websites around the markets you're pursuing now, presenting your track record as proof of transferable capability rather than a history lesson.",
      ],
      sections: [
        {
          heading: "Lead with where you're going",
          body: [
            "Each market you're targeting gets its own page: what you can do for clients in that sector, the capabilities and certifications that apply, and the projects that show it, even if they came from other industries. Buyers in new sectors want to know you understand their world.",
          ],
        },
        {
          heading: "Capability that transfers",
          body: [
            "Decades of work on heavy plant, high-voltage systems or complex fabrication is a strong credential for renewables and transmission. We frame past projects around the skills and systems they prove, not just the industry they were in.",
          ],
        },
      ],
      problems: [
        {
          symptom: "New-sector clients don't see us as relevant",
          cause: "Every example on the site is from coal or power generation.",
          steps: [
            "Create pages for each target sector",
            "Reframe past projects around transferable capability",
            "Add new-sector projects as soon as you have them",
          ],
        },
        {
          symptom: "Graduates and engineers don't see a future with us",
          cause: "The site suggests a business tied to industries in decline.",
          steps: [
            "Show the new work you're doing",
            "Feature people working on it",
            "Link careers content to those stories",
          ],
        },
      ],
      checklist: [
        "Each sector you're targeting has its own page",
        "Past projects are described by the capability they prove",
        "Recent new-sector work is visible on the homepage",
        "Your careers page reflects where the business is heading",
      ],
      faqs: [
        {
          question: "Can we keep our existing brand?",
          answer: "Usually, yes. Repositioning is mostly about structure and content; the brand can be refreshed rather than replaced.",
        },
        {
          question: "Will we lose our current search rankings?",
          answer: "Not if old URLs are redirected properly. We map every one before launch.",
        },
      ],
      caseStudies: ["hcbengineering", "saurally"],
    },
    "web-design": {
      metaTitle: "Web Design in Newcastle — Hold Your Own Against Sydney",
      metaDescription:
        "Web design for Newcastle businesses now compared with Sydney ones: a modern, local-feeling design that wins new residents without losing loyal customers.",
      h1: "Web design for Newcastle businesses now being compared with Sydney",
      card: "Modern design that wins new residents and keeps loyal ones.",
      intro: [
        "More Sydney residents and businesses are moving to Newcastle and the Lake Macquarie area, and they bring Sydney expectations. A local business with a dated site now sits next to competitors who've upgraded, and newcomers don't know which local names are good.",
        "We design sites that look as current as anything in Sydney while still feeling unmistakably local, so newcomers trust you and long-time customers still recognise you.",
      ],
      sections: [
        {
          heading: "Local, not generic",
          body: [
            "Real photos of your premises, team and work in Newcastle. Copy that sounds like a local business, not a franchise. Signs of being part of the community, such as local partnerships and suburbs served, help newcomers decide who to trust.",
          ],
        },
        {
          heading: "Modern where it matters",
          body: [
            "Fast loading, clear layout, easy booking or enquiry on a phone and accessible design. These are what make a site feel current, more than trends do.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Newcomers choose newer-looking competitors",
          cause: "Our site looks older than our standard of work.",
          steps: [
            "Refresh the design with real local photography",
            "Put reviews and local credentials up front",
            "Make the next step obvious on mobile",
          ],
        },
        {
          symptom: "Our redesign felt corporate and loyal customers didn't like it",
          cause: "The new site lost the personality of the business.",
          steps: [
            "Bring back the voice and faces customers know",
            "Keep the modern structure and speed",
            "Test with a few loyal customers before launch",
          ],
        },
      ],
      checklist: [
        "Your site shows your real team and premises",
        "It looks at home next to Sydney competitors",
        "Reviews are visible on key pages",
        "Booking or enquiring works smoothly on a phone",
      ],
      faqs: [
        {
          question: "How long does a redesign take?",
          answer: "Usually four to six weeks, depending on the number of templates and how ready the photography is.",
        },
        {
          question: "Can you keep our existing platform?",
          answer: "Often, yes, if it's sound. We'll tell you after reviewing it.",
        },
      ],
      caseStudies: ["tatvivahtrends"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Newcastle — Hunter Produce & Gift Hampers Online",
      metaDescription:
        "Ecommerce for Hunter Valley producers and gift businesses: online hampers, corporate gifting and Sydney delivery that turns weekend visitors into regular customers.",
      h1: "Ecommerce for Hunter producers selling to Sydney after the weekend ends",
      card: "Online hampers, corporate gifts and Sydney delivery for Hunter producers.",
      intro: [
        "Every weekend, Sydney visitors fill the Hunter Valley's cellar doors, delis, chocolate makers and providores. They buy, love it, and drive home. Most never order again, because nothing makes it easy.",
        "We build online stores for Hunter producers and gift businesses that turn those visits into ongoing orders: hampers and gift boxes, corporate gifting and Sydney delivery that's priced clearly.",
      ],
      sections: [
        {
          heading: "Hampers and gifts",
          body: [
            "Build-your-own hampers, ready-made gift boxes, gift messages and delivery dates chosen at checkout. Corporate buyers can order in bulk, upload a recipient list and pay by invoice.",
          ],
        },
        {
          heading: "Delivery to Sydney",
          body: [
            "Clear delivery rates for Sydney, Newcastle and the Central Coast, and cut-off dates for Christmas and Mother's Day shown well in advance. Fragile and perishable items are packed and priced appropriately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Corporate gift orders arrive as spreadsheets by email",
          cause: "The store can't handle multiple recipients.",
          steps: [
            "Let buyers upload a recipient list",
            "Add per-recipient messages and dates",
            "Offer invoice payment for businesses",
          ],
        },
        {
          symptom: "We're overwhelmed by Christmas orders at the last minute",
          cause: "Cut-offs aren't clear, and orders aren't spread across the season.",
          steps: [
            "Publish delivery cut-offs early",
            "Offer early-order incentives",
            "Cap daily orders if needed",
          ],
        },
      ],
      checklist: [
        "Customers can build and gift a hamper online",
        "Corporate buyers can order for many recipients at once",
        "Sydney delivery rates are clear",
        "Holiday cut-off dates are published early",
      ],
      faqs: [
        {
          question: "Can you sell wine as part of hampers?",
          answer: "Yes, with age confirmation and within your licence conditions, which you'll need to confirm.",
        },
        {
          question: "Which platform do you recommend?",
          answer: "Shopify for most producers, with apps or custom features for hampers and corporate orders.",
        },
      ],
      caseStudies: ["clickngreet", "krushidoctor"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Newcastle — Darby Street to Online",
      metaDescription:
        "Shopify developers for Newcastle independent retailers: take your Darby Street or Beaumont Street shop online with shared stock, local pickup and a lean store.",
      h1: "Shopify development for Newcastle's independent shops going online",
      card: "Take an independent shop online with shared stock and pickup.",
      intro: [
        "Newcastle's independent shops, from Darby Street in Cooks Hill to Beaumont Street in Hamilton and the stores across Lake Macquarie, have loyal customers and great products. Many still sell only in person, or have a basic online store that doesn't match the shop.",
        "We set up Shopify for independent retailers with the shop and website sharing one stock count, local pickup, and a store that feels like walking into yours.",
      ],
      sections: [
        {
          heading: "Shop and site as one",
          body: [
            "Shopify POS in-store and an online store with one shared catalogue, stock and customer list. Customers can check stock online and pick up the same day. Staff can look up and fulfil online orders from the counter.",
          ],
        },
        {
          heading: "Getting the catalogue online",
          body: [
            "Most of the work is the catalogue: products, photos and descriptions. We set up a simple process so your team can photograph and list products efficiently, and import what you already have.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We'd sell online but listing products takes forever",
          cause: "Every product needs photos, descriptions and variants.",
          steps: [
            "Import existing product data from your POS",
            "Set up a simple photo routine at the shop",
            "List best sellers first, then the rest",
          ],
        },
        {
          symptom: "Customers ring to ask if something's in stock",
          cause: "Online and in-store stock aren't connected.",
          steps: [
            "Use Shopify POS in-store",
            "Show live stock online",
            "Offer same-day pickup",
          ],
        },
      ],
      checklist: [
        "Your best sellers are available online",
        "Online stock matches the shop",
        "Customers can pick up the same day",
        "Your store looks and feels like your shop",
      ],
      faqs: [
        {
          question: "Can we keep our current POS?",
          answer: "If it integrates with Shopify, yes. Otherwise we'll compare moving to Shopify POS.",
        },
        {
          question: "Do we need a big catalogue to start?",
          answer: "No. Starting with your best sellers is usually smarter.",
        },
      ],
      caseStudies: ["newsaraswatisareecentre"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Newcastle — Shutdown & Skilled Labour Platforms",
      metaDescription:
        "Marketplace development for Hunter founders: platforms matching industrial sites with ticketed tradespeople for maintenance shutdowns and short-notice work.",
      h1: "Marketplace development for matching Hunter industry with skilled workers",
      card: "Platforms matching industrial sites with ticketed tradespeople.",
      intro: [
        "Hunter industrial sites run planned maintenance shutdowns that need large numbers of skilled, ticketed workers at short notice, as do unexpected breakdowns. Finding available, qualified people still involves phone trees and spreadsheets.",
        "We build platforms that match sites with workers whose tickets, inductions and availability are verified and up to date.",
      ],
      sections: [
        {
          heading: "Tickets and availability, verified",
          body: [
            "Workers maintain profiles with their trade, tickets, licences, inductions and availability calendars. Expiry dates are tracked and workers are reminded before anything lapses. Sites search and filter by what they need.",
          ],
        },
        {
          heading: "Fast matching for short notice",
          body: [
            "When a site posts a requirement, matching workers are notified, accept or decline, and the site confirms. Rosters, timesheets and invoicing follow on the platform.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Filling shutdown crews takes days of calls",
          cause: "There's no searchable pool of available, qualified workers.",
          steps: [
            "Build worker profiles with tickets and availability",
            "Notify matching workers automatically",
            "Confirm crews on the platform",
          ],
        },
        {
          symptom: "Workers arrive with expired tickets",
          cause: "Ticket expiries aren't tracked.",
          steps: [
            "Record every ticket with its expiry",
            "Remind workers before expiry",
            "Exclude lapsed workers from matching",
          ],
        },
      ],
      checklist: [
        "Workers' tickets are verified with expiry dates",
        "Availability is visible before you call",
        "Crews can be confirmed on the platform",
        "Timesheets and invoices flow from bookings",
      ],
      faqs: [
        {
          question: "Does the platform employ the workers?",
          answer: "That's your business model to decide, with legal and industrial advice. We build the platform to support it.",
        },
        {
          question: "Can sites have their own induction requirements?",
          answer: "Yes. Each site can list its requirements, and only matching workers are offered.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Newcastle — For Hunter Health & Tech Startups",
      metaDescription:
        "Next.js developers for Newcastle health, medtech and tech startups: products and patient-facing sites built with privacy, accessibility and speed in mind.",
      h1: "Next.js development for Newcastle health and tech startups",
      card: "Health and tech products built with privacy and accessibility in mind.",
      intro: [
        "Newcastle has a growing health, medical research and tech scene around its university, hospitals and innovation spaces. Startups here often need a product that handles sensitive information carefully and a website that explains complex ideas simply.",
        "We build Next.js products and sites for Hunter startups, with privacy, accessibility and performance designed in from the first version.",
      ],
      sections: [
        {
          heading: "Privacy from the first commit",
          body: [
            "Health information is sensitive under the Privacy Act. We collect only what's needed, encrypt it, host it in Australian regions, restrict access by role and log who saw what. Our team works with test data, not real patient records.",
          ],
        },
        {
          heading: "Explaining complex products",
          body: [
            "Clinicians, patients and investors all need to understand what you do. We build sites with clear explanations for each audience, accessible to people with low vision or limited health literacy.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our prototype wasn't built to handle real patient data",
          cause: "It was built quickly to prove an idea, without privacy controls.",
          steps: [
            "Review what data is collected and why",
            "Rebuild storage and access with privacy controls",
            "Host in an Australian region with logging",
          ],
        },
        {
          symptom: "Clinicians and patients both find our site confusing",
          cause: "One site tries to speak to every audience at once.",
          steps: [
            "Create separate paths for each audience",
            "Write plainly for patients",
            "Give clinicians the detail they need",
          ],
        },
      ],
      checklist: [
        "Patient data is encrypted and hosted in Australia",
        "Access to data is logged",
        "Your site has a clear path for each audience",
        "Pages meet WCAG 2.2 AA",
      ],
      faqs: [
        {
          question: "Can you build software that's a medical device?",
          answer: "Software that meets the TGA's definition of a medical device has regulatory requirements beyond what we provide. We build supporting products and websites, and will tell you if a project crosses that line.",
        },
        {
          question: "Will your team see patient data?",
          answer: "No. We build and test with sample data; production access stays with your organisation.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Newcastle — Port & Logistics Yard Apps",
      metaDescription:
        "Android apps for Newcastle port and logistics businesses: truck and container check-in, yard inspections, damage photos and handovers on rugged devices.",
      h1: "Android apps for Newcastle's port and logistics yards",
      card: "Yard check-in, inspections and damage photos on rugged devices.",
      intro: [
        "Around the Port of Newcastle, logistics businesses move trucks, containers, equipment and bulk materials through busy yards. Check-ins, inspections, damage records and handovers are still often done on paper or by phone, and disputes follow when records are missing.",
        "We build native Android apps for rugged devices that record every movement, inspection and handover, with photos and timestamps.",
      ],
      sections: [
        {
          heading: "Every movement recorded",
          body: [
            "Scan a container or vehicle, record its condition with photos, capture the driver's signature and log the time. Records are linked to the job and available in the office immediately, or as soon as the device is back in range.",
          ],
        },
        {
          heading: "Built for yards",
          body: [
            "Large buttons, high-contrast screens for bright days, barcode and camera scanning, and offline support. Android suits company-issued rugged devices; if drivers need it on their own iPhones, we scope a React Native build separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We can't prove the condition equipment arrived in",
          cause: "Inspections aren't photographed or timestamped consistently.",
          steps: [
            "Require photos at every check-in",
            "Timestamp and locate each record",
            "Link records to the job automatically",
          ],
        },
        {
          symptom: "Drivers wait while paperwork is filled out",
          cause: "Check-in is done on paper in the office.",
          steps: [
            "Check drivers in by scan in the yard",
            "Capture signatures on the device",
            "Send records to the office instantly",
          ],
        },
      ],
      checklist: [
        "Every check-in includes photos",
        "Records are timestamped automatically",
        "Drivers sign digitally",
        "The office sees records in real time",
      ],
      faqs: [
        {
          question: "Can the app integrate with our transport management system?",
          answer: "Usually, through its API. We check before quoting.",
        },
        {
          question: "Will it work on rugged scanners?",
          answer: "Yes. We build for the scanner hardware on common rugged Android devices.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Newcastle — Rank Across the Whole Hunter",
      metaDescription:
        "Local SEO for Newcastle and Hunter businesses: get found in Lake Macquarie, Maitland, Cessnock and Port Stephens, not just near your own address.",
      h1: "SEO for businesses that serve the whole Hunter, not just Newcastle",
      card: "Local SEO across Lake Macquarie, Maitland, Cessnock and Port Stephens.",
      intro: [
        "The Hunter is a collection of separate local markets: Newcastle, Lake Macquarie, Maitland, Cessnock, Port Stephens and beyond. A customer in Maitland searching for a plumber sees different results from one in Hamilton, and Google strongly favours businesses close to the searcher.",
        "We set up your Google Business Profile for the areas you serve, build a genuinely useful page for each one, and help you collect reviews across the region, so a Maitland customer finds you as easily as one next door.",
      ],
      sections: [
        {
          heading: "Pages with real local substance",
          body: [
            "Each area page describes work you've done there, local considerations and the customers you serve, not a copy with the suburb swapped. Google ignores copies; real local detail is what ranks.",
          ],
        },
        {
          heading: "Maitland's growth",
          body: [
            "Maitland and the surrounding new estates are among the fastest-growing parts of the Hunter, full of new homeowners choosing tradespeople and services for the first time. Early visibility there pays off for years.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We rank in Newcastle but not Maitland",
          cause: "Google has no evidence we serve Maitland.",
          steps: [
            "Add Maitland to your service area",
            "Create a Maitland page with local jobs",
            "Collect reviews from Maitland customers",
          ],
        },
        {
          symptom: "Our area pages don't rank",
          cause: "They're the same page with different suburb names.",
          steps: [
            "Rewrite each with real local detail",
            "Add local projects and photos",
            "Merge areas with nothing specific to say",
          ],
        },
      ],
      checklist: [
        "Your service area covers the Hunter areas you work in",
        "Each area page has genuinely local content",
        "You have reviews from several Hunter areas",
        "You know where you rank outside Newcastle",
      ],
      faqs: [
        {
          question: "How long until we rank in other Hunter areas?",
          answer: "Typically three to six months of steady work, faster in less competitive areas.",
        },
        {
          question: "Should we open a second Google profile in Maitland?",
          answer: "Only if you have a real, staffed location there. Otherwise, use your service area.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Newcastle — Reach Sydneysiders Planning the Move",
      metaDescription:
        "Google Ads for Newcastle builders, agents and services: reach Sydney residents researching a move north, plus tightly targeted local campaigns across the Hunter.",
      h1: "Google Ads for Newcastle businesses whose next customers live in Sydney",
      card: "Ads for Sydney residents researching a move, plus local campaigns.",
      intro: [
        "Many of Newcastle's next customers still live in Sydney. They're researching a move: searching for builders, house-and-land packages, agents, schools and services in Newcastle and Lake Macquarie. Most local businesses only advertise to people already here.",
        "We run campaigns that reach those people while they're planning, alongside tightly targeted local campaigns across the Hunter.",
      ],
      sections: [
        {
          heading: "Reaching people before they arrive",
          body: [
            "Campaigns aimed at Sydney searchers looking for Newcastle builders, land, agents or services, with landing pages written for someone new to the area: what to expect, which suburbs suit whom and how you help newcomers.",
          ],
        },
        {
          heading: "Local campaigns, tightly drawn",
          body: [
            "For local work, we target the areas you actually serve, set the location option to people present there, and schedule ads for hours someone can answer the phone.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads only reach people already in Newcastle",
          cause: "Targeting is limited to the Hunter.",
          steps: [
            "Create campaigns for Sydney-based searchers",
            "Write landing pages for people relocating",
            "Track enquiries by location",
          ],
        },
        {
          symptom: "Our local ads show in areas we don't serve",
          cause: "Targeting is a broad radius, including interest in the area.",
          steps: [
            "Target specific Hunter areas",
            "Use presence-only location targeting",
            "Exclude areas you don't serve",
          ],
        },
      ],
      checklist: [
        "You run separate campaigns for relocators and locals",
        "Landing pages speak to people new to the area",
        "Location targeting uses presence",
        "You track enquiries by campaign",
      ],
      faqs: [
        {
          question: "Does targeting Sydney cost more?",
          answer: "Sydney clicks can be pricier, but relocation searches are specific and often high value. We test with modest budgets first.",
        },
        {
          question: "Who owns the ad account?",
          answer: "You do, always. We work inside it with your permission.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Newcastle — Community-First Local Content",
      metaDescription:
        "Social media for Newcastle businesses: community-first content, local partnerships and Facebook and Instagram reach across the Hunter's suburbs and towns.",
      h1: "Social media for Newcastle businesses that are part of their community",
      card: "Community-first content and local reach across the Hunter.",
      intro: [
        "Newcastle is a proud, close-knit city, and local businesses that show up for the community get noticed: sponsoring the junior footy club, supporting a local charity, celebrating a long-serving staff member. That's also what performs best on social media here.",
        "We help you share those stories consistently on Facebook and Instagram, and put a modest paid budget behind them across the Hunter suburbs and towns you serve.",
      ],
      sections: [
        {
          heading: "Local stories, told well",
          body: [
            "Staff, customers, community involvement and the work itself. We plan a simple monthly calendar from what's happening in your business, and handle the editing, captions and scheduling.",
          ],
        },
        {
          heading: "Reach that stays local",
          body: [
            "Paid posts are aimed at the suburbs and towns you serve, so your budget reaches potential customers, not people a hundred kilometres away.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We do lots for the community but nobody knows",
          cause: "Community work isn't shared, or is shared once and forgotten.",
          steps: [
            "Capture community moments as they happen",
            "Share them with the people involved",
            "Feature them across the year",
          ],
        },
        {
          symptom: "Our posts reach people outside our area",
          cause: "Boosted posts use broad targeting.",
          steps: [
            "Target by the suburbs you serve",
            "Match content to each area",
            "Track enquiries from each campaign",
          ],
        },
      ],
      checklist: [
        "You've shared a community story this month",
        "Your paid posts target your service areas",
        "Your posts feature real staff and customers",
        "You can see enquiries from social",
      ],
      faqs: [
        {
          question: "Should we post in local Facebook groups?",
          answer: "Where the group's rules allow and it's genuinely helpful. Hard selling in community groups usually backfires.",
        },
        {
          question: "Do you need to be in Newcastle to make content?",
          answer: "No. Your team captures moments on a phone; we turn them into posts.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Newcastle — Less Admin for Clinics & Allied Health",
      metaDescription:
        "AI automation for Newcastle clinics and allied health: online intake, referral letters read automatically and reminders sent, with privacy built in and staff in control.",
      h1: "AI automation for Newcastle clinics drowning in referrals and paperwork",
      card: "Online intake, referral processing and reminders for clinics.",
      intro: [
        "Clinics and allied health practices across Newcastle spend hours each week on admin: typing referral letters into the practice system, chasing intake forms, confirming appointments and following up no-shows. It's time reception could spend with patients.",
        "We build automation that handles much of it: online intake before the visit, referral details extracted for staff to check, and reminders sent automatically, designed around your privacy obligations.",
      ],
      sections: [
        {
          heading: "Referrals and intake",
          body: [
            "Referral letters arriving by email or fax-to-email are read automatically, with patient and referrer details extracted for reception to confirm. New patients complete intake forms online before they arrive, saving time at the desk.",
          ],
        },
        {
          heading: "Privacy first",
          body: [
            "Health information is sensitive under the Privacy Act. We use AI providers that don't train on your data, process information in Australian regions where possible, and build so our team never sees real patient records.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Reception retypes every referral letter",
          cause: "Referrals arrive as documents, not data.",
          steps: [
            "Route referrals to a dedicated inbox",
            "Extract key details automatically",
            "Have reception confirm and file",
          ],
        },
        {
          symptom: "New patients fill in forms in the waiting room",
          cause: "Intake is on paper or a PDF.",
          steps: [
            "Send an online intake form with the booking",
            "Remind patients to complete it",
            "Import answers into the practice system",
          ],
        },
      ],
      checklist: [
        "Referral details aren't retyped by hand",
        "New patients complete intake before arriving",
        "Appointment reminders are automatic",
        "AI providers don't train on your data",
      ],
      faqs: [
        {
          question: "Does this work with our practice management system?",
          answer: "Often, through its API or import features. We check your system before quoting.",
        },
        {
          question: "Will AI make clinical decisions?",
          answer: "No. It handles admin only, and staff check everything it does.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Newcastle — Asset Inspection & Maintenance Systems",
      metaDescription:
        "Custom software for Hunter engineering and industrial firms: asset registers, inspection schedules, defect tracking and work orders that replace spreadsheets.",
      h1: "Custom software for Hunter firms managing inspections and maintenance",
      card: "Asset registers, inspections, defects and work orders in one system.",
      intro: [
        "Hunter engineering and industrial firms inspect and maintain a lot of equipment, their own and their clients'. Inspection schedules, results, defects and work orders often live in separate spreadsheets, and things fall between them.",
        "We build systems that hold the asset register, schedule inspections, record results on a tablet and turn defects into tracked work orders, with reports clients can rely on.",
      ],
      sections: [
        {
          heading: "From inspection to closed defect",
          body: [
            "Each asset has its inspection schedule. Inspectors record results and photos on a tablet. Defects become work orders with owners and due dates. Nothing is closed without evidence, and clients can see the status of their assets.",
          ],
        },
        {
          heading: "Reports clients ask for",
          body: [
            "Compliance reports, open defects and inspection history are generated from live data, in the format your clients need.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Inspections are missed",
          cause: "Schedules live in a spreadsheet nobody checks daily.",
          steps: [
            "Put schedules in the system with reminders",
            "Show what's due this week",
            "Escalate anything overdue",
          ],
        },
        {
          symptom: "Defects are found but never fixed",
          cause: "There's no link between inspection results and work orders.",
          steps: [
            "Create work orders from defects automatically",
            "Assign owners and due dates",
            "Require evidence to close",
          ],
        },
      ],
      checklist: [
        "Every asset has an inspection schedule",
        "Inspections are recorded on a device with photos",
        "Defects become tracked work orders",
        "Clients can see their assets' status",
      ],
      faqs: [
        {
          question: "Couldn't we buy maintenance software?",
          answer: "Often, and we'll compare honestly. Custom suits firms whose processes or client reporting don't fit standard products.",
        },
        {
          question: "Does it work offline on site?",
          answer: "Yes, inspections can be recorded offline and synced later.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Newcastle — Connect Practice Software, Booking & Xero",
      metaDescription:
        "API integration for Newcastle clinics and service businesses: connect practice management, online booking, SMS, payments and Xero so patient admin flows automatically.",
      h1: "API integration for Newcastle clinics and practices",
      card: "Connect practice software, booking, SMS, payments and Xero.",
      intro: [
        "A typical Newcastle clinic runs practice management software, an online booking tool, an SMS service, a payment terminal and Xero. When they aren't connected, reception enters bookings twice, reconciles payments by hand and chases no-shows manually.",
        "We connect those systems so bookings, reminders, payments and accounting flow automatically, with privacy handled carefully.",
      ],
      sections: [
        {
          heading: "Bookings to payments",
          body: [
            "Online bookings appear in the practice system, reminders go out by SMS, payments are matched to appointments, and daily takings post to Xero ready for your bookkeeper.",
          ],
        },
        {
          heading: "Minimal data, carefully moved",
          body: [
            "Integrations move only the data each system needs, over secure connections, with logs of what moved and when.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Online bookings are re-entered by reception",
          cause: "The booking tool and practice system aren't connected.",
          steps: [
            "Connect booking to the practice system",
            "Confirm new bookings automatically",
            "Send reminders by SMS",
          ],
        },
        {
          symptom: "Daily takings take ages to reconcile",
          cause: "Payments, claims and accounting are separate.",
          steps: [
            "Match payments to appointments",
            "Post daily summaries to Xero",
            "Flag anything that doesn't match",
          ],
        },
      ],
      checklist: [
        "Online bookings appear in your practice system automatically",
        "Reminders go out without staff action",
        "Daily takings post to Xero",
        "Integrations move only the data needed",
      ],
      faqs: [
        {
          question: "Which practice systems can you connect?",
          answer: "Those with APIs or integration partners. We confirm what your system allows before quoting.",
        },
        {
          question: "Is patient data safe in transit?",
          answer: "Yes. We use encrypted connections, minimal data and logged transfers.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Newcastle — Off the Office Server, Safely",
      metaDescription:
        "Cloud migration for Newcastle and Hunter firms: move off ageing office servers to Australian-hosted cloud with backups, access control and predictable costs.",
      h1: "Cloud migration for Hunter firms still running an office server",
      card: "Move off ageing office servers to Australian-hosted cloud.",
      intro: [
        "Plenty of Hunter engineering and professional firms still run a server in the office: shared drives, an old database, maybe a line-of-business application. It's ageing, backups are uncertain, and staff working on site or from home struggle to reach it.",
        "We plan and carry out the move to Australian-hosted cloud services, with backups, access control and running costs agreed up front.",
      ],
      sections: [
        {
          heading: "Plan before moving",
          body: [
            "We inventory what the server does, who uses it and how, then plan where each part should go: cloud storage, a hosted database or a modern replacement. Both systems run side by side until the new set-up is proven.",
          ],
        },
        {
          heading: "Access from anywhere, safely",
          body: [
            "Staff reach files and systems from site or home with individual accounts and multi-factor authentication, not a shared VPN password.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We're not sure our server backups actually work",
          cause: "Backups have never been tested by restoring them.",
          steps: [
            "Test a full restore now",
            "Move to automatic cloud backups",
            "Test restores on a schedule",
          ],
        },
        {
          symptom: "Staff on site can't reach the files they need",
          cause: "Files live on an office server behind a slow VPN.",
          steps: [
            "Move shared files to cloud storage",
            "Give staff individual secure access",
            "Retire the VPN once everyone has moved",
          ],
        },
      ],
      checklist: [
        "You've tested restoring a backup",
        "Staff can reach files securely from site",
        "Everyone uses an individual account with MFA",
        "You know your monthly cloud costs",
      ],
      faqs: [
        {
          question: "What about our old line-of-business application?",
          answer: "We assess whether it can run in the cloud, be replaced, or needs to stay put for now. We'll recommend the least risky option.",
        },
        {
          question: "Do you look after our computers and email too?",
          answer: "No. We handle servers, hosting and applications. A local IT provider is better for desktops and email, and we can work with them.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Newcastle — When a Mate Built Your Site",
      metaDescription:
        "Website maintenance for Newcastle and Hunter small businesses: take over a site built by a friend or freelancer, secure it, update it and keep it running.",
      h1: "Website maintenance for Hunter businesses whose site was built by a mate",
      card: "Take over a site a friend or freelancer built and keep it safe.",
      intro: [
        "A lot of Hunter small businesses got their first website from a friend, a relative or a freelancer who has since moved on. It worked for a while. Now nobody's updated it in years, the logins are in someone else's email, and it's quietly become a security risk.",
        "We take over sites like these, recover access, secure and update them, and then keep them maintained, with a named person to message when something needs changing.",
      ],
      sections: [
        {
          heading: "Getting the keys back",
          body: [
            "We help you recover the domain, hosting and site logins and put them in your business's name. It's often the most important thing we do, because a domain registered to someone else can disappear when they stop paying for it.",
          ],
        },
        {
          heading: "Then keep it healthy",
          body: [
            "Updates, security monitoring, daily off-site backups, uptime alerts and small content changes, with a short monthly note of what was done.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our domain is registered to the person who built the site",
          cause: "It was set up in their name for convenience.",
          steps: [
            "Ask the registrant to transfer it, with our help",
            "Use the registrar's dispute process if needed",
            "Register everything in your business's name",
          ],
        },
        {
          symptom: "Our site hasn't been updated in years",
          cause: "Nobody knows how, and everyone's afraid of breaking it.",
          steps: [
            "Back up the site completely",
            "Update on a staging copy and test",
            "Release and monitor",
          ],
        },
      ],
      checklist: [
        "Your domain is registered in your business's name",
        "You have admin access to your site",
        "Software was updated this month",
        "You have a recent off-site backup",
      ],
      faqs: [
        {
          question: "What if our site is beyond saving?",
          answer: "We'll say so, and explain what a rebuild costs compared with keeping it going.",
        },
        {
          question: "Can you work with a .com.au domain registered to someone else?",
          answer: "Yes. We'll guide you through transferring it to your business, which needs your ABN.",
        },
      ],
    },
  },
}
