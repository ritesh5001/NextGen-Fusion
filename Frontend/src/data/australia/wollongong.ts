import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const wollongong: AuCity = {
  slug: "wollongong",
  name: "Wollongong",
  state: "New South Wales",
  stateCode: "NSW",
  summary: "The Illawarra's port, steel, university and coastal economy, an hour from Sydney and competing with it.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Wollongong CBD", "North Wollongong", "Fairy Meadow", "Corrimal", "Thirroul", "Figtree", "Unanderra", "Dapto", "Shellharbour", "Albion Park", "Kiama", "Port Kembla", "Warrawong", "Helensburgh"],
  nearby: ["sydney", "canberra", "newcastle"],
  page: {
    metaTitle: "Websites, SEO & Software for Wollongong and Illawarra Businesses",
    metaDescription:
      "Websites, local SEO, Google Ads and automation for Wollongong and Illawarra businesses competing with Sydney firms for local customers.",
    h1: "Helping Illawarra businesses win at home against Sydney competitors",
    intro: [
      "Wollongong and the Illawarra have moved from a steel-and-port economy towards health, education, services and tourism, while Port Kembla and its industry remain important. Many residents commute to Sydney, and plenty of Sydney businesses now see the Illawarra as their next market.",
      "That means local businesses compete with Sydney firms advertising here. Being local is a real advantage, but only if it shows up in search and on your website. We help Illawarra businesses make it show. We work remotely from India, with no Wollongong office.",
    ],
    sections: [
      {
        heading: "Local should be your edge",
        body: [
          "When someone in Corrimal searches for a builder, an accountant or a physio, they often see Sydney businesses with bigger budgets near the top. Many would rather use someone local who knows the area and can turn up quickly. They just can't tell who that is.",
          "Clear local signals fix that: a complete Google profile at your Illawarra address, pages about the suburbs you serve, reviews from local customers and a website that says plainly that you're from here.",
        ],
      },
      {
        heading: "Our hours in Wollongong",
        body: [
          "We work 14:30 to 23:30 Wollongong time (15:30 to 00:30 during daylight saving), Monday to Saturday.",
        ],
      },
    ],
    industries: [
      { name: "Industrial and port services", need: "Suppliers around Port Kembla need sites that present capability and safety clearly." },
      { name: "Health, aged care and disability services", need: "Providers need accessible sites, careful data handling and less paperwork." },
      { name: "Coastal tourism and hospitality", need: "Operators from Thirroul to Kiama need direct bookings and visibility with Sydney day-trippers." },
      { name: "Trades and local services", need: "Businesses need to win local search against Sydney firms advertising into the region." },
    ],
    problems: [
      {
        service: "seo",
        symptom: "Sydney businesses outrank us in our own area",
        cause: "Their sites are stronger, and our local signals are weak.",
        steps: [
          "Complete your Google profile at your Illawarra address",
          "Build pages for the suburbs you serve",
          "Collect reviews from local customers",
        ],
      },
      {
        service: "google-ads",
        symptom: "Our ads show in Sydney, where we don't work",
        cause: "Location targeting overlaps or includes people interested in the area.",
        steps: [
          "Target only the areas you serve",
          "Use presence-only location targeting",
          "Exclude Sydney suburbs you don't cover",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our support workers spend hours on progress notes",
        cause: "Notes and records are written up after shifts, often from memory.",
        steps: [
          "Let workers dictate notes on their phone",
          "Draft structured notes automatically",
          "Have workers check and submit",
        ],
      },
      {
        service: "web-design",
        symptom: "Sydney day-trippers don't find our café or stay",
        cause: "Our site and listings don't show up when they plan a trip down the coast.",
        steps: [
          "Show what makes your place worth the drive",
          "Complete your Google profile with photos",
          "Make bookings easy on a phone",
        ],
      },
      {
        service: "website-development",
        symptom: "Our industrial customers are shrinking and we need new ones",
        cause: "The website only speaks to one or two large customers' industries.",
        steps: [
          "Identify new sectors your capability fits",
          "Present that capability for those buyers",
          "Support it with project evidence",
        ],
      },
      {
        service: "api-integration",
        symptom: "Quotes, jobs and invoices are entered three times",
        cause: "The quoting tool, job system and Xero aren't connected.",
        steps: [
          "Map the path from quote to invoice",
          "Connect each system",
          "Remove the double entry",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Wollongong?",
        answer: "No. We work remotely from Lucknow and Mumbai, India, over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:30 to 23:30 Wollongong time, or 15:30 to 00:30 during daylight saving, Monday to Saturday.",
      },
      {
        question: "Do you work with businesses in Shellharbour and Kiama?",
        answer: "Yes, across the Illawarra and the South Coast.",
      },
      {
        question: "Can you help us compete with Sydney agencies' clients?",
        answer: "Yes. Being genuinely local is an advantage we can make visible in search and on your website.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Wollongong — For Illawarra Manufacturers Diversifying",
      metaDescription:
        "Website development for Illawarra manufacturers and industrial suppliers finding new customers beyond steel and the port. Present your capability to new sectors.",
      h1: "Website development for Illawarra manufacturers looking for new customers",
      card: "Sites that help industrial suppliers reach new sectors.",
      intro: [
        "Many Illawarra fabricators, engineering firms and industrial suppliers grew up serving steelmaking, the port and the mines. As those customers change, firms are looking for work in defence, renewables, infrastructure and manufacturing, and their websites are often the first place new buyers look.",
        "We build websites that present your capability to new sectors, explaining what you can make, maintain or supply, and backing it with evidence buyers trust.",
      ],
      sections: [
        {
          heading: "Capability, not customer list",
          body: [
            "Instead of describing the business through its biggest customer, we describe what you can do: processes, materials, sizes, tolerances, certifications and capacity. New buyers can then see whether you fit their needs.",
          ],
        },
        {
          heading: "Proof for new buyers",
          body: [
            "Project examples with photos, quality certifications, safety systems and a downloadable capability statement give a buyer who has never heard of you enough confidence to make contact.",
          ],
        },
      ],
      problems: [
        {
          symptom: "New buyers don't understand what we can do",
          cause: "The site talks about past customers, not capability.",
          steps: [
            "List capabilities by process and material",
            "Create a page for each",
            "Add photos and project examples",
          ],
        },
        {
          symptom: "We don't appear when buyers search for our processes",
          cause: "Specialist services have no pages of their own.",
          steps: [
            "Research how buyers describe your services",
            "Write a page for each specialist service",
            "Link from capability pages",
          ],
        },
      ],
      checklist: [
        "Capabilities are described by process and material",
        "Each specialist service has its own page",
        "Certifications are listed with scope",
        "A capability statement can be downloaded",
      ],
      faqs: [
        {
          question: "Can you photograph our workshop?",
          answer: "No, we're remote. We'll give you or a local photographer a shot list.",
        },
        {
          question: "How long does the project take?",
          answer: "Usually four to six weeks.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "web-design": {
      metaTitle: "Web Design in Wollongong — Coastal Cafés, Stays & Day-Trip Spots",
      metaDescription:
        "Web design for Illawarra coastal hospitality and tourism, from Thirroul to Kiama: sites that make the drive from Sydney feel worth it and make booking easy.",
      h1: "Web design for Illawarra coastal spots that Sydney day-trippers should find",
      card: "Coastal hospitality sites that make the drive from Sydney worth it.",
      intro: [
        "The drive down the coast past the Sea Cliff Bridge brings Sydney day-trippers and weekenders through Thirroul, Austinmer, Wollongong, Shellharbour and Kiama. Cafés, restaurants, stays and experiences along the way compete for a short visit, and visitors often decide where to stop from their phones.",
        "We design sites that make your place look worth the stop, and make it easy to book a table, a room or a session.",
      ],
      sections: [
        {
          heading: "Make it worth the drive",
          body: [
            "Lead with what makes your place special: the view, the menu, the experience. Real photos, opening hours that are right, and clear information on parking and how to get there.",
          ],
        },
        {
          heading: "Phone-first",
          body: [
            "Most visitors find you on a phone, sometimes in the car park. Pages load fast, the menu is a real page and booking is one tap away.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors stop at the place next door",
          cause: "Our listing and site don't show what makes us special.",
          steps: [
            "Lead with your best feature and real photos",
            "Keep hours and menu current",
            "Make booking one tap",
          ],
        },
        {
          symptom: "Our site is impossible to use on a phone",
          cause: "It was designed for desktop.",
          steps: [
            "Redesign mobile-first",
            "Replace PDF menus with web pages",
            "Test on real phones",
          ],
        },
      ],
      checklist: [
        "Your best feature is visible straight away",
        "Hours and menu are current",
        "Booking is one tap on mobile",
        "Parking and directions are clear",
      ],
      faqs: [
        {
          question: "Can you work with our booking system?",
          answer: "Yes, we design around it.",
        },
        {
          question: "Do you write the copy?",
          answer: "We draft it from a short interview with you, then you edit.",
        },
      ],
      caseStudies: ["kalamohini"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Wollongong — Illawarra Makers Selling to Sydney",
      metaDescription:
        "Ecommerce for Illawarra makers and brands: online stores with local pickup, Sydney metro delivery and a checkout that converts on mobile.",
      h1: "Ecommerce for Illawarra makers with customers up the highway",
      card: "Online stores with local pickup and Sydney metro delivery.",
      intro: [
        "Illawarra makers and small brands, including ceramicists, surf shapers, roasters, bakers and designers, have customers both locally and in Sydney, an hour up the road. A good online store lets both buy easily.",
        "We build stores with local pickup, fast Sydney delivery and a checkout that works on a phone.",
      ],
      sections: [
        {
          heading: "Local and Sydney, both easy",
          body: [
            "Illawarra customers can pick up or get local delivery. Sydney customers see clear delivery times and costs. Everyone else gets fair national shipping.",
          ],
        },
        {
          heading: "Products that need explaining",
          body: [
            "Handmade and specialist products need more than a photo and a price: how they're made, materials, care and sizing. We design product pages that tell that story.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Sydney customers don't realise we deliver",
          cause: "Delivery options aren't shown until checkout.",
          steps: [
            "Show delivery areas and times on product pages",
            "Offer Sydney metro delivery clearly",
            "Add a free-delivery threshold",
          ],
        },
        {
          symptom: "Our handmade products look ordinary online",
          cause: "Product pages show a single photo and a price.",
          steps: [
            "Add process and detail photos",
            "Explain materials and making",
            "Include care instructions",
          ],
        },
      ],
      checklist: [
        "Local pickup is offered",
        "Sydney delivery is clear on product pages",
        "Product pages explain how things are made",
        "Checkout works smoothly on mobile",
      ],
      faqs: [
        {
          question: "Which platform do you recommend?",
          answer: "Shopify for most makers. It's easy to run and handles pickup and delivery well.",
        },
        {
          question: "Can we sell at markets too?",
          answer: "Yes, with Shopify POS sharing stock with the store.",
        },
      ],
      caseStudies: ["kalamohini", "samaraha"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Wollongong — Retailers Beyond Crown Street",
      metaDescription:
        "Shopify developers for Wollongong retailers: take a Crown Street or suburban shop online with shared stock, click and collect and local delivery.",
      h1: "Shopify development for Wollongong retailers selling beyond the shopfront",
      card: "Take a Wollongong shop online with click and collect.",
      intro: [
        "Wollongong retailers, from the Crown Street Mall to suburban shopping strips, compete with Sydney stores and big online retailers for local customers. A well-run Shopify store lets you compete on the things they can't match: local stock, same-day pickup and personal service.",
        "We set up Shopify for Illawarra retailers with shared stock, click and collect, local delivery and a store that reflects your shop.",
      ],
      sections: [
        {
          heading: "Same-day beats next week",
          body: [
            "Click and collect with a ready notification, and local delivery across the Illawarra, give customers a reason to buy from you instead of waiting for a parcel.",
          ],
        },
        {
          heading: "One system",
          body: [
            "Shopify POS in-store and the online store share products, stock and customers, so staff can see and fulfil online orders from the counter.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Locals buy online from big retailers instead",
          cause: "They don't know we have it in stock today.",
          steps: [
            "Show live stock online",
            "Offer same-day click and collect",
            "Promote local delivery",
          ],
        },
        {
          symptom: "Staff can't see online orders",
          cause: "The store and shop use separate systems.",
          steps: [
            "Move to Shopify POS",
            "Show online orders in-store",
            "Fulfil from shop stock",
          ],
        },
      ],
      checklist: [
        "Live stock shows online",
        "Click and collect is offered",
        "Staff can see online orders in-store",
        "Local delivery is available",
      ],
      faqs: [
        {
          question: "Can we keep our POS?",
          answer: "If it integrates with Shopify, yes. Otherwise we'll compare switching.",
        },
        {
          question: "How long does setup take?",
          answer: "Usually three to six weeks, depending on catalogue size.",
        },
      ],
      caseStudies: ["sitaravastram"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Wollongong — Student & Campus Platforms",
      metaDescription:
        "Marketplace development for Wollongong founders: student services platforms for tutoring, secondhand goods and local services, with verified users and safe payments.",
      h1: "Marketplace development for Wollongong's student and campus economy",
      card: "Student platforms for tutoring, secondhand goods and services.",
      intro: [
        "The University of Wollongong brings tens of thousands of students to the city, many from overseas. They need tutors, secondhand furniture, textbooks, part-time work and local services, and they mostly find them through scattered Facebook groups.",
        "We build student marketplaces with verified users, safe payments and the moderation that keeps a campus community trustworthy.",
      ],
      sections: [
        {
          heading: "Verified students, safer trades",
          body: [
            "Users verify with a student email address, listings are moderated, and payments go through the platform so neither side is left out of pocket.",
          ],
        },
        {
          heading: "Built around the semester",
          body: [
            "Demand spikes at the start and end of each semester, when students arrive and leave. The platform is designed for those surges, with listing tools that make moving out easy.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Students get scammed in Facebook groups",
          cause: "No verification and no protected payments.",
          steps: [
            "Verify users with student email",
            "Hold payments until items are received",
            "Moderate listings and handle reports",
          ],
        },
        {
          symptom: "Our platform is quiet except at semester changes",
          cause: "There's no reason to return between moves.",
          steps: [
            "Add services students need all year",
            "Notify users of relevant listings",
            "Partner with student clubs",
          ],
        },
      ],
      checklist: [
        "Users are verified",
        "Payments are protected",
        "Listings are moderated",
        "The platform handles semester surges",
      ],
      faqs: [
        {
          question: "Do we need the university's permission?",
          answer: "To use the university's name or branding, yes. An independent platform can still use student email verification; get legal advice on the details.",
        },
        {
          question: "How long does a first version take?",
          answer: "Usually ten to fourteen weeks.",
        },
      ],
      caseStudies: ["tatvivahtrends"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Wollongong — For University Spin-Outs & Startups",
      metaDescription:
        "Next.js developers for Wollongong startups and university spin-outs: MVPs, dashboards and marketing sites built properly from the first version.",
      h1: "Next.js development for Wollongong startups and research spin-outs",
      card: "MVPs and dashboards for startups and research spin-outs.",
      intro: [
        "Wollongong has an active startup scene around the university and its incubator, iAccelerate. Many founders are researchers or engineers with a strong technical idea and a need for a product people can actually use and pay for.",
        "We build Next.js products for those founders, turning research and prototypes into usable software, with code you own and can grow.",
      ],
      sections: [
        {
          heading: "From prototype to product",
          body: [
            "Researchers often have working code, such as models, scripts or notebooks, that proves the idea. We build the product around it: accounts, a usable interface, payments and an API, keeping your core logic intact.",
          ],
        },
        {
          heading: "Explaining it to buyers",
          body: [
            "A clear marketing site in the same codebase explains the product to buyers who aren't specialists, which is often the hardest part for technical founders.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our technology works but nobody can use it",
          cause: "It runs as scripts only the founders understand.",
          steps: [
            "Wrap the core logic in an API",
            "Build a simple interface for users",
            "Add accounts and payments",
          ],
        },
        {
          symptom: "Buyers don't understand what we do",
          cause: "The website is written for researchers.",
          steps: [
            "Explain the problem you solve in plain terms",
            "Show a demo or examples",
            "Keep technical detail for those who want it",
          ],
        },
      ],
      checklist: [
        "Users can try the product without your help",
        "Your core logic is behind a stable API",
        "Your site explains the product in plain language",
        "The code is in your company's repository",
      ],
      faqs: [
        {
          question: "Can you work with our Python code?",
          answer: "Yes. We often keep Python services for models and data work and build the product layer in Next.js.",
        },
        {
          question: "Who owns the IP?",
          answer: "You do. Code we write for you is yours under the agreement. Check your own arrangements with the university.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Wollongong — Permits & Inspections for Contractors",
      metaDescription:
        "Android apps for Illawarra industrial contractors: work permits, isolations, inspections and toolbox talks recorded on site with photos and signatures.",
      h1: "Android apps for Illawarra contractors working on industrial sites",
      card: "Permits, isolations and inspections recorded on site.",
      intro: [
        "Contractors working at Port Kembla and other Illawarra industrial sites handle a lot of safety paperwork: work permits, isolations, inspections and toolbox talks. Paper records go missing and take time to collate.",
        "We build native Android apps for company devices that record all of it on site, with photos, signatures and timestamps, ready for clients and audits.",
      ],
      sections: [
        {
          heading: "Records that stand up",
          body: [
            "Every permit, isolation and inspection is recorded with who, what, where and when, plus photos and signatures. Records sync to the office and can be searched instantly.",
          ],
        },
        {
          heading: "Fits the site's rules",
          body: [
            "Forms are built around your clients' and your own procedures, not a generic template. Company Android devices keep it simple; for iPhone we'd scope React Native separately.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Toolbox talk records are incomplete",
          cause: "Paper sign-in sheets get lost or aren't filled in.",
          steps: [
            "Record talks in the app",
            "Capture attendees' signatures",
            "Store them against the job",
          ],
        },
        {
          symptom: "Collating safety records for clients takes days",
          cause: "Records are on paper across many jobs.",
          steps: [
            "Digitise permits and inspections",
            "Link them to jobs and sites",
            "Export client reports instantly",
          ],
        },
      ],
      checklist: [
        "Permits and inspections are recorded digitally",
        "Toolbox talks have signed attendance",
        "Records include photos and timestamps",
        "Client reports can be exported quickly",
      ],
      faqs: [
        {
          question: "Can forms match our clients' procedures?",
          answer: "Yes. We build forms around the procedures you work to.",
        },
        {
          question: "Does it work offline?",
          answer: "Yes, and records sync when back in range.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Wollongong — Beat Sydney Firms in Local Search",
      metaDescription:
        "Local SEO for Wollongong and Illawarra businesses: strong local signals, suburb pages and reviews that put you above Sydney competitors advertising into the region.",
      h1: "SEO for Illawarra businesses losing local searches to Sydney firms",
      card: "Local SEO that puts Illawarra businesses above Sydney firms.",
      intro: [
        "Illawarra customers often see Sydney businesses in their search results. A Wollongong business wins by being clearly local: a well-built Google Business Profile at an Illawarra address, pages for the suburbs you serve, and reviews from customers in the area.",
        "We build those signals steadily, so Google and customers both see you as the local choice.",
      ],
      sections: [
        {
          heading: "Local signals that count",
          body: [
            "Your Google profile with the right categories, services and photos. Consistent business details across directories. Suburb pages with real local content. Links from local organisations, clubs and media. Each one tells Google you belong here.",
          ],
        },
        {
          heading: "North to south",
          body: [
            "The Illawarra runs from Helensburgh to Kiama. We focus your effort on the areas where you want work and can actually travel to.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Sydney firms rank above us for local searches",
          cause: "They have stronger websites and more links.",
          steps: [
            "Strengthen your Google profile",
            "Build pages for your suburbs",
            "Earn links from local organisations",
          ],
        },
        {
          symptom: "We rank in Wollongong but not Shellharbour or Kiama",
          cause: "Google sees us only at our address.",
          steps: [
            "Set your service area",
            "Add pages with local work",
            "Collect reviews from customers there",
          ],
        },
      ],
      checklist: [
        "Your Google profile is fully complete",
        "Your business details match across directories",
        "Suburb pages contain real local content",
        "Local organisations link to your site",
      ],
      faqs: [
        {
          question: "How long until we outrank Sydney firms?",
          answer: "Profile improvements often help within weeks. Outranking stronger websites usually takes several months.",
        },
        {
          question: "Do local sponsorships help SEO?",
          answer: "They can, through links and mentions from local clubs and media, and they help your reputation too.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Wollongong — Targeting That Stops at the Escarpment",
      metaDescription:
        "Google Ads management for Wollongong and Illawarra businesses: targeting limited to the areas you serve, no wasted Sydney clicks, and tracking to real enquiries.",
      h1: "Google Ads for Illawarra businesses paying for Sydney clicks they can't use",
      card: "Ads targeted to the Illawarra, with no wasted Sydney clicks.",
      intro: [
        "Ads aimed at \"Sydney\" often spill into the Illawarra, and ads aimed at the Illawarra often spill into Sydney. For a local business that can't travel to Sutherland or Campbelltown, every one of those clicks is wasted money.",
        "We set targeting to the areas you actually serve, use presence rather than interest, and track calls and enquiries so you see what each one costs.",
      ],
      sections: [
        {
          heading: "Draw the line precisely",
          body: [
            "We target suburbs or postcodes rather than a broad radius, exclude Sydney areas you don't serve, and use Google's \"presence\" setting so ads only show to people who are actually in your area.",
          ],
        },
        {
          heading: "Local ads, local landing pages",
          body: [
            "Ads say you're local and send people to pages that show it, with local reviews, suburbs served and how fast you can get there.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Calls come in from areas we don't serve",
          cause: "Targeting includes Sydney and people interested in the area.",
          steps: [
            "Target specific Illawarra suburbs",
            "Switch to presence-only targeting",
            "Exclude areas you don't serve",
          ],
        },
        {
          symptom: "Our ads look like everyone else's",
          cause: "They don't mention being local.",
          steps: [
            "Lead ads with your local presence",
            "Use local reviews in extensions",
            "Send traffic to local landing pages",
          ],
        },
      ],
      checklist: [
        "Targeting covers only the areas you serve",
        "Location setting is presence only",
        "Ads mention you're local",
        "Calls and enquiries are tracked",
      ],
      faqs: [
        {
          question: "What budget do we need?",
          answer: "Often less than Sydney businesses, because targeting is narrow. We estimate costs before you commit.",
        },
        {
          question: "Do we own the account?",
          answer: "Yes, always.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Wollongong — Coast, Community & Day-Trippers",
      metaDescription:
        "Social media for Illawarra businesses: community content for locals, and coastal content that reaches Sydney day-trippers planning a trip down the coast.",
      h1: "Social media for Illawarra businesses with locals and visitors to reach",
      card: "Community content for locals and coastal content for visitors.",
      intro: [
        "Illawarra businesses have two audiences on social media: locals who want to support businesses from their area, and Sydney residents looking for a reason to drive down the coast on the weekend.",
        "We plan content for both, and use paid reach to put the right posts in front of each group.",
      ],
      sections: [
        {
          heading: "For locals",
          body: [
            "Community involvement, staff, regular customers and news. Locals respond to businesses that are part of the place.",
          ],
        },
        {
          heading: "For day-trippers",
          body: [
            "Coastal views, signature dishes, experiences and events, with paid reach aimed at Sydney's southern and inner suburbs before weekends and holidays.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our posts don't reach Sydney visitors",
          cause: "Organic reach stays local.",
          steps: [
            "Run paid posts in Sydney before weekends",
            "Lead with what makes the trip worth it",
            "Link to booking or directions",
          ],
        },
        {
          symptom: "Locals don't see us as part of the community",
          cause: "Posts are all promotional.",
          steps: [
            "Share community involvement",
            "Feature staff and customers",
            "Promote less, show more",
          ],
        },
      ],
      checklist: [
        "You post community content regularly",
        "Paid posts reach Sydney before weekends",
        "Posts link to booking or directions",
        "Your content shows real people and places",
      ],
      faqs: [
        {
          question: "Which platforms matter most?",
          answer: "Instagram for visitors and lifestyle, Facebook for local community.",
        },
        {
          question: "How much paid budget do we need?",
          answer: "Often a modest amount, focused on weekends and holidays.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Wollongong — Less Paperwork for NDIS & Care Providers",
      metaDescription:
        "AI automation for Illawarra NDIS, disability and aged care providers: dictated progress notes, incident report drafts and rostering admin, with workers in control.",
      h1: "AI automation for Illawarra care providers buried in progress notes",
      card: "Dictated progress notes and less admin for care providers.",
      intro: [
        "NDIS, disability and aged care providers across the Illawarra employ support workers who spend a large part of their week on documentation: progress notes, incident reports, shift notes and service records. Much of it is written after the shift, from memory.",
        "We build AI tools that let workers dictate notes on their phone and get a structured draft to check, so documentation is quicker, more consistent and done on time.",
      ],
      sections: [
        {
          heading: "Notes in minutes, not half an hour",
          body: [
            "Workers speak a quick summary after a visit. AI turns it into a structured note in your format, covering activities, goals and observations, which the worker reviews, edits and submits.",
          ],
        },
        {
          heading: "Handled with care",
          body: [
            "Participant information is sensitive. We use AI providers that don't train on your data, keep records in your own systems in Australia, and work with test data during development so our team never sees participants' records.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Progress notes are late and inconsistent",
          cause: "They're written after shifts in different styles.",
          steps: [
            "Let workers dictate after each visit",
            "Draft notes in a consistent format",
            "Have workers review and submit",
          ],
        },
        {
          symptom: "Incident reports take too long to write",
          cause: "Workers aren't sure what to include.",
          steps: [
            "Guide workers with structured questions",
            "Draft the report from their answers",
            "Route it to a supervisor for review",
          ],
        },
      ],
      checklist: [
        "Progress notes are submitted the same day",
        "Notes follow a consistent format",
        "Workers review every AI draft",
        "Participant data stays in your Australian systems",
      ],
      faqs: [
        {
          question: "Does this meet NDIS requirements?",
          answer: "The tool helps workers write notes; your organisation remains responsible for meeting NDIS Practice Standards. We build to the format and rules you give us.",
        },
        {
          question: "Can it connect to our client management system?",
          answer: "Usually, through its API. We check before quoting.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Wollongong — Job Tracking for Illawarra Fabricators",
      metaDescription:
        "Custom software for Illawarra fabricators and workshops: quotes, job tracking, materials and hours by job, so you know which work actually makes money.",
      h1: "Custom software for Illawarra workshops that don't know which jobs make money",
      card: "Quotes, job tracking, materials and hours by job.",
      intro: [
        "Illawarra fabrication and engineering workshops quote, build and deliver a constant stream of jobs. Few know for certain which jobs made money, because hours and materials aren't tracked against each job, or are tracked on paper.",
        "We build job tracking systems that record quotes, hours, materials and progress against each job, so you can see real margins and quote better next time.",
      ],
      sections: [
        {
          heading: "Every hour and every part, by job",
          body: [
            "Workers clock onto jobs on a tablet in the workshop. Materials are recorded as they're used. The office sees each job's progress and cost against the quote in real time.",
          ],
        },
        {
          heading: "Better quotes",
          body: [
            "Over time, the data shows which kinds of job you underquote and which earn well, so quoting gets more accurate and more profitable.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't know which jobs lost money",
          cause: "Hours and materials aren't tracked by job.",
          steps: [
            "Clock workers onto jobs",
            "Record materials against jobs",
            "Compare actual cost with the quote",
          ],
        },
        {
          symptom: "Quoting is guesswork",
          cause: "There's no data from past jobs.",
          steps: [
            "Build up job cost history",
            "Group similar jobs",
            "Quote from real past figures",
          ],
        },
      ],
      checklist: [
        "Hours are recorded against jobs",
        "Materials are recorded against jobs",
        "You can compare job cost with the quote",
        "Quotes are based on past job data",
      ],
      faqs: [
        {
          question: "Will this work on the workshop floor?",
          answer: "Yes, on rugged tablets with simple, large controls.",
        },
        {
          question: "Can it connect to Xero or MYOB?",
          answer: "Yes, for invoicing and costs.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "api-integration": {
      metaTitle: "API Integration in Wollongong — Quote to Invoice Without Retyping",
      metaDescription:
        "API integration for Illawarra trades and service businesses: connect quoting tools, job management, Xero and review requests so work flows from quote to invoice.",
      h1: "API integration for Illawarra trades entering every job three times",
      card: "Connect quoting, job management, Xero and review requests.",
      intro: [
        "Many Illawarra trades and service businesses quote in one tool, manage jobs in another and invoice in Xero, entering the same customer and job details three times. Review requests, if sent at all, are a fourth manual step.",
        "We connect those tools so an accepted quote becomes a job, a completed job becomes an invoice, and a paid invoice triggers a review request.",
      ],
      sections: [
        {
          heading: "One entry, every system",
          body: [
            "Customer and job details are entered once and flow to every system that needs them. Changes update everywhere.",
          ],
        },
        {
          heading: "Reviews on autopilot",
          body: [
            "When an invoice is paid, the customer gets a friendly review request with a direct link to your Google profile, the single most useful habit for local SEO.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Accepted quotes are retyped into the job system",
          cause: "Quoting and job tools aren't connected.",
          steps: [
            "Create jobs from accepted quotes",
            "Carry over customer and scope details",
            "Notify the team",
          ],
        },
        {
          symptom: "We forget to ask for reviews",
          cause: "It's a manual step after the job.",
          steps: [
            "Trigger a review request when invoices are paid",
            "Link directly to your Google profile",
            "Alert you to unhappy feedback",
          ],
        },
      ],
      checklist: [
        "Accepted quotes become jobs automatically",
        "Completed jobs become invoices",
        "Paid invoices trigger review requests",
        "Customer details are entered once",
      ],
      faqs: [
        {
          question: "Which tools can you connect?",
          answer: "Most with APIs, including common quoting, job and accounting tools.",
        },
        {
          question: "Will this replace our tools?",
          answer: "No. It connects the tools you already use.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Wollongong — Hosting for Research & Data Startups",
      metaDescription:
        "Cloud set-up for Wollongong startups and research teams: data pipelines, compute when you need it, Australian hosting and cost controls that protect a small budget.",
      h1: "Cloud set-up for Wollongong startups and research teams on a tight budget",
      card: "Data pipelines and compute on demand, with cost controls.",
      intro: [
        "Wollongong startups and research spin-outs often work with data: sensor readings, models, images or simulations. They need compute when experiments run and storage that grows, without a cloud bill that eats their funding.",
        "We set up cloud infrastructure that scales up when you need it and back down when you don't, hosted in Australia with budget alerts from day one.",
      ],
      sections: [
        {
          heading: "Pay for what you use",
          body: [
            "Compute is started for jobs and stopped when they finish. Data is stored in the right tier for how often it's used. Budget alerts warn you before costs surprise you.",
          ],
        },
        {
          heading: "From notebook to pipeline",
          body: [
            "We turn manual data steps into automated pipelines that run on schedule or on demand, so results are repeatable and nobody has to babysit a laptop overnight.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our cloud bill is eating our grant",
          cause: "Servers run all the time whether used or not.",
          steps: [
            "Find idle resources and stop them",
            "Run compute only for jobs",
            "Set budget alerts",
          ],
        },
        {
          symptom: "Our data processing runs on one person's laptop",
          cause: "There's no shared pipeline.",
          steps: [
            "Move scripts into a repository",
            "Run them as automated cloud jobs",
            "Store results centrally",
          ],
        },
      ],
      checklist: [
        "Budget alerts are set",
        "No servers run idle",
        "Data processing is automated",
        "Data is stored in an Australian region",
      ],
      faqs: [
        {
          question: "Can you help us use startup credits?",
          answer: "We can set up accounts ready to use credits from provider programmes. Eligibility is up to the provider.",
        },
        {
          question: "Do you support GPU workloads?",
          answer: "We can set up GPU instances for training or inference, started and stopped on demand.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Wollongong — Steady Care for Illawarra Businesses",
      metaDescription:
        "Website maintenance for Wollongong and Illawarra businesses: updates, security, backups, uptime monitoring and content changes, with a named person to message.",
      h1: "Website maintenance for Illawarra businesses that just want it handled",
      card: "Updates, backups and content changes, handled.",
      intro: [
        "Most Illawarra business owners don't want to think about their website. They want it to be up, secure and current, and to have someone to message when something needs changing.",
        "That's what our maintenance plans do: updates, security, backups, monitoring and content changes, handled by a named person, with a short note each month of what was done.",
      ],
      sections: [
        {
          heading: "What's included",
          body: [
            "Software updates tested before going live. Security monitoring. Daily off-site backups. Uptime alerts. A set number of content changes each month. A monthly summary.",
          ],
        },
        {
          heading: "One person to message",
          body: [
            "Send changes by WhatsApp or email and they're live within one working day. No ticket system, no account manager in the middle.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Nobody owns our website",
          cause: "It was built and left.",
          steps: [
            "Recover and secure access",
            "Update and back up the site",
            "Start a monthly maintenance plan",
          ],
        },
        {
          symptom: "Small changes take weeks",
          cause: "There's no one to ask.",
          steps: [
            "Message changes to a named person",
            "Get them live within a working day",
            "See them in the monthly summary",
          ],
        },
      ],
      checklist: [
        "Someone is responsible for your site",
        "Software is updated monthly",
        "Backups run daily",
        "You'd know if the site went down",
      ],
      faqs: [
        {
          question: "Do you maintain sites you didn't build?",
          answer: "Yes, most of our maintenance clients did.",
        },
        {
          question: "What does it cost?",
          answer: "A fixed monthly fee based on the site. We quote after a quick review.",
        },
      ],
    },
  },
}
