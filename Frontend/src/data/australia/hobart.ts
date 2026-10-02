import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const hobart: AuCity = {
  slug: "hobart",
  name: "Hobart",
  state: "Tasmania",
  stateCode: "TAS",
  summary: "Tourism, food and drink producers, and marine and Antarctic science, selling from an island.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Hobart CBD", "Battery Point", "Sandy Bay", "North Hobart", "Salamanca", "New Town", "Moonah", "Glenorchy", "Bellerive", "Kingston", "Huon Valley", "Richmond", "Sorell", "Launceston"],
  nearby: ["melbourne", "adelaide", "sydney"],
  page: {
    metaTitle: "Websites, Online Stores & Marketing for Hobart and Tasmanian Businesses",
    metaDescription:
      "Websites, online stores, SEO and automation for Hobart and Tasmanian producers, tourism operators and marine businesses selling to the mainland and beyond.",
    h1: "Helping Tasmanian businesses sell beyond Bass Strait",
    intro: [
      "Hobart's economy leans on tourism, a strong food and drink scene (whisky, gin, wine, cider, seafood and produce), marine and Antarctic science, and government and health services. Many of its best businesses are small, owner-run and much loved by visitors.",
      "Being on an island shapes everything online. Visitors discover Tasmanian producers on holiday and want to keep buying once they're home, but freight across Bass Strait costs more and takes longer. We help Tasmanian businesses turn holiday discoveries into lasting customers. We work remotely from India, with no Hobart office.",
    ],
    sections: [
      {
        heading: "The holiday ends; the relationship shouldn't",
        body: [
          "A visitor tastes your whisky at a cellar door, eats at your restaurant or takes your tour, and loves it. Then they fly home to Melbourne or Brisbane. Without an email address, a simple online store and a reason to come back, that's usually the end of it.",
          "Most of our Tasmanian work is about building that bridge: capturing visitors' interest while they're here and making it easy to buy, book or return after they leave.",
        ],
      },
      {
        heading: "Our hours in Hobart",
        body: [
          "We work 14:30 to 23:30 Hobart time (15:30 to 00:30 during daylight saving), Monday to Saturday.",
        ],
      },
    ],
    industries: [
      { name: "Food and drink producers", need: "Distilleries, wineries and producers need stores that ship to the mainland at a sensible cost." },
      { name: "Tourism and accommodation", need: "Operators need direct bookings, especially in the shoulder seasons that decide the year." },
      { name: "Marine and Antarctic", need: "Marine services, research and supply businesses need credible sites and tools for specialist audiences." },
      { name: "Local services", need: "Hobart businesses need to win local search in a small, competitive market." },
    ],
    problems: [
      {
        service: "ecommerce-development",
        symptom: "Mainland customers balk at our shipping costs",
        cause: "Freight across Bass Strait is priced per item, making small orders uneconomical.",
        steps: [
          "Price freight by zone and weight",
          "Encourage larger orders with bundles",
          "Offer free shipping above a sensible threshold",
        ],
      },
      {
        service: "shopify-development",
        symptom: "Limited releases sell out in chaos",
        cause: "Releases go on sale to everyone at once, with no allocation or queue.",
        steps: [
          "Run an allocation list for loyal customers first",
          "Limit quantities per customer",
          "Release the rest publicly with notice",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Weather cancellations mean hours of phone calls",
        cause: "Every cancelled tour needs guests contacted and rebooked one by one.",
        steps: [
          "Message every affected guest automatically",
          "Offer rebooking options by link",
          "Process refunds or credits by your policy",
        ],
      },
      {
        service: "website-development",
        symptom: "We're full in summer and quiet the rest of the year",
        cause: "The site only sells the peak season experience.",
        steps: [
          "Create content for autumn and winter visits",
          "Offer shoulder-season packages",
          "Aim ads at travellers choosing autumn and winter dates",
        ],
      },
      {
        service: "marketplace-development",
        symptom: "Finding marine suppliers in Hobart is all phone calls",
        cause: "There's no shared directory of verified suppliers.",
        steps: [
          "List verified suppliers by capability",
          "Send requests for quote to the right ones",
          "Compare quotes on one screen",
        ],
      },
      {
        service: "software-development",
        symptom: "Our distillery's production and excise records are a spreadsheet maze",
        cause: "Batches, stock movements and excise figures are kept in separate files.",
        steps: [
          "Record batches and movements in one system",
          "Calculate excise figures from that data",
          "Produce reports in minutes",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Hobart?",
        answer: "No. We work remotely from Lucknow and Mumbai, India, with Tasmanian businesses over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:30 to 23:30 Hobart time, or 15:30 to 00:30 during daylight saving, Monday to Saturday.",
      },
      {
        question: "Do you work with businesses outside Hobart?",
        answer: "Yes, across Tasmania, from Launceston and the north-west to the Huon Valley and the east coast.",
      },
      {
        question: "Can you help us sell overseas?",
        answer: "Yes. We set up international selling where your products and regulations allow it.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Hobart — Fill the Shoulder Season",
      metaDescription:
        "Website development for Hobart and Tasmanian tourism operators: sites that sell autumn and winter visits, take bookings direct and rank for trip-planning searches.",
      h1: "Website development for Tasmanian tourism operators who need a better shoulder season",
      card: "Tourism sites that sell autumn and winter, not just summer.",
      intro: [
        "For Tasmanian tourism operators, summer mostly fills itself. The shoulder months and winter decide the year. A site that only sells the summer experience leaves the rest of the year to chance.",
        "We build tourism websites that sell every season, with content for off-peak trips, packages that give visitors a reason to come, and direct booking that keeps commission in your pocket.",
      ],
      sections: [
        {
          heading: "Every season has its pitch",
          body: [
            "Autumn colour, winter fires, quiet trails, whisky and long lunches. We create pages for each season's experience so visitors planning an off-peak trip find you and see why it's worth it.",
          ],
        },
        {
          heading: "Book direct",
          body: [
            "Live availability, clear prices, a quick booking flow on a phone and a reason to book direct rather than through a booking site.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Winter bookings are thin",
          cause: "The site shows only summer photos and experiences.",
          steps: [
            "Photograph and describe the winter experience",
            "Create winter packages",
            "Promote them to off-peak travellers",
          ],
        },
        {
          symptom: "Most bookings come through booking sites",
          cause: "Direct booking is slow or unclear.",
          steps: [
            "Show live availability on your site",
            "Simplify booking on mobile",
            "Offer a direct-booking perk",
          ],
        },
      ],
      checklist: [
        "Your site shows the off-peak experience",
        "You offer seasonal packages",
        "Visitors can book direct in under two minutes",
        "You give a reason to book direct",
      ],
      faqs: [
        {
          question: "Can you connect our booking system?",
          answer: "Usually, yes, either embedded or through an integration.",
        },
        {
          question: "How long does a tourism website take?",
          answer: "Usually four to six weeks. We schedule launch outside your peak.",
        },
      ],
      caseStudies: ["ladyscootytrainer"],
    },
    "web-design": {
      metaTitle: "Web Design in Hobart — For Galleries, Studios & Makers",
      metaDescription:
        "Web design for Hobart galleries, design studios and makers: sites that let the work speak, with clear enquiry and buying paths for collectors and clients.",
      h1: "Web design for Hobart galleries, studios and makers who let the work speak",
      card: "Sites for galleries and makers that put the work first.",
      intro: [
        "Hobart has a thriving arts and design community: galleries, studios, furniture makers, ceramicists, jewellers and designers. Their work is distinctive, and their websites should be a frame for it, not a template that competes with it.",
        "We design sites that put the work first, with large images, quiet layouts and clear paths for collectors and clients to enquire, commission or buy.",
      ],
      sections: [
        {
          heading: "A frame, not a feature",
          body: [
            "Neutral layouts, generous space and careful type that step back and let images lead. Images are optimised so they look sharp without slowing the page.",
          ],
        },
        {
          heading: "From admiring to buying",
          body: [
            "Each piece or project has a clear next step: buy, enquire, commission or visit. Available works show price or \"price on request\" clearly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "People admire our work online but never enquire",
          cause: "There's no clear way to buy or commission.",
          steps: [
            "Add a clear action to every piece",
            "Show availability and price policy",
            "Make enquiring simple on a phone",
          ],
        },
        {
          symptom: "Our images look poor on the site",
          cause: "They're compressed badly or cropped by the template.",
          steps: [
            "Use high-quality, properly sized images",
            "Design layouts around the work's proportions",
            "Let visitors view images full screen",
          ],
        },
      ],
      checklist: [
        "Every piece has a clear next step",
        "Images look sharp on all devices",
        "Availability is clear",
        "The design doesn't compete with the work",
      ],
      faqs: [
        {
          question: "Can we sell artwork online?",
          answer: "Yes, with an online store or an enquiry flow, depending on the work and price.",
        },
        {
          question: "Can we update the collection ourselves?",
          answer: "Yes. Adding a piece takes a few minutes.",
        },
      ],
      caseStudies: ["kalamohini", "sitaravastram"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Hobart — Tasmanian Produce to the Mainland",
      metaDescription:
        "Ecommerce for Tasmanian producers: stores that price Bass Strait freight properly, confirm age for alcohol and turn holiday visitors into repeat online customers.",
      h1: "Ecommerce for Tasmanian producers whose customers live on the mainland",
      card: "Stores that price Bass Strait freight properly and win repeat orders.",
      intro: [
        "For a Tasmanian producer, freight is the make-or-break part of the store. Mainland customers expect delivery to feel reasonable, and per-item shipping across Bass Strait can make a single bottle or jar uneconomical.",
        "We build stores that price freight by zone and weight, encourage orders that make shipping worthwhile, confirm age for alcohol, and follow up with visitors so they reorder from Sydney or Melbourne.",
      ],
      sections: [
        {
          heading: "Freight that makes sense",
          body: [
            "Rates by zone and weight, bundles and mixed packs that make freight worthwhile, and a free-shipping threshold set to protect margin. Delivery times are shown honestly.",
          ],
        },
        {
          heading: "From cellar door to inbox",
          body: [
            "Visitors sign up while they're with you. After they leave, they get a thank-you, a note on what they tried and an easy way to order it again.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Single-item orders lose money on freight",
          cause: "Freight is the same for one item or six.",
          steps: [
            "Offer bundles and mixed packs",
            "Set a free-shipping threshold",
            "Price freight by zone and weight",
          ],
        },
        {
          symptom: "Visitors never order once they're home",
          cause: "We don't stay in touch.",
          steps: [
            "Collect emails at the cellar door with consent",
            "Send a follow-up with a reorder link",
            "Invite them to a club or allocation list",
          ],
        },
      ],
      checklist: [
        "Bundles make mainland shipping worthwhile",
        "Freight is priced by zone",
        "Visitors can sign up at the cellar door",
        "Alcohol orders include age confirmation",
      ],
      faqs: [
        {
          question: "Can you ship to Western Australia?",
          answer: "Yes. WA freight is priced separately because it costs more.",
        },
        {
          question: "Do you handle liquor licensing?",
          answer: "No. You confirm your licence conditions; we build the store to follow them.",
        },
      ],
      caseStudies: ["krushidoctor", "clickngreet"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Hobart — Distillery Releases & Allocations",
      metaDescription:
        "Shopify developers for Tasmanian distilleries: allocation lists, limited releases, per-customer limits and fair access for loyal buyers, without launch-day chaos.",
      h1: "Shopify development for Tasmanian distilleries with more demand than bottles",
      card: "Shopify allocations and limited releases without the chaos.",
      intro: [
        "Tasmanian whisky and gin have a devoted following, and limited releases can sell out in minutes. Without a plan, release day means a crashed store, frustrated loyal customers and bottles going to resellers.",
        "We set up Shopify for distilleries with allocation lists, release queues, per-customer limits and early access for members, so releases are fair and calm.",
      ],
      sections: [
        {
          heading: "Fair releases",
          body: [
            "Allocation members get first access by email link, with quantity limits per customer. Remaining stock is released publicly at an announced time, with limits and bot protection.",
          ],
        },
        {
          heading: "A store that holds up",
          body: [
            "We trim the theme and apps before release day, and test the pages everyone will hit first.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Resellers buy up our releases",
          cause: "No limits, and anyone can buy at once.",
          steps: [
            "Limit quantities per customer and address",
            "Give allocation members first access",
            "Add bot protection at checkout",
          ],
        },
        {
          symptom: "Our store slows down on release day",
          cause: "Heavy theme and apps under peak traffic.",
          steps: [
            "Remove unnecessary apps and scripts",
            "Test the release pages under load",
            "Stagger access by group",
          ],
        },
      ],
      checklist: [
        "You run an allocation list",
        "Releases have per-customer limits",
        "Members get early access",
        "Your store was tested before the last release",
      ],
      faqs: [
        {
          question: "Can allocation members pay in advance?",
          answer: "Yes, with pre-orders or reserved allocations, depending on how you run it.",
        },
        {
          question: "Can you migrate our allocation list?",
          answer: "Yes, from a spreadsheet or another system.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Hobart — Marine & Antarctic Supply Platforms",
      metaDescription:
        "Marketplace development for Hobart's marine and Antarctic supply chain: verified suppliers, requests for quote and quote comparison, from the team behind MariBiz.ai.",
      h1: "Marketplace development for Hobart's marine and Antarctic supply chain",
      card: "Marine and Antarctic supply platforms with RFQs and verified vendors.",
      intro: [
        "Hobart is a gateway to the Antarctic and home to a busy marine sector: research vessels, aquaculture, ship repair and the suppliers that serve them. Sourcing specialist parts and services still runs largely on phone calls and personal networks.",
        "We built MariBiz.ai, a marine procurement marketplace with more than 3,226 verified vendors across 121 service categories, requests for quote and quote comparison. The same approach can help Hobart's marine buyers and suppliers find each other.",
      ],
      sections: [
        {
          heading: "Verified marine suppliers",
          body: [
            "Suppliers list capabilities, certifications and the ports they serve. Buyers search by what they need and where, and see which suppliers are verified.",
          ],
        },
        {
          heading: "Quotes you can compare",
          body: [
            "Buyers send one request for quote to several suppliers, receive structured responses and compare them side by side, with messages and documents kept on the record.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Specialist marine suppliers are hard to find",
          cause: "Supplier knowledge lives in people's contact lists.",
          steps: [
            "Build supplier profiles by capability and port",
            "Verify certifications",
            "Make them searchable for buyers",
          ],
        },
        {
          symptom: "Quotes arrive in every format",
          cause: "Each supplier replies differently by email.",
          steps: [
            "Ask every supplier to quote in the same structured format",
            "Compare them side by side",
            "Keep a full record",
          ],
        },
      ],
      checklist: [
        "Suppliers are searchable by capability and port",
        "Certifications are verified",
        "Quotes are structured and comparable",
        "Every request has a full record",
      ],
      faqs: [
        {
          question: "Is MariBiz.ai based in Tasmania?",
          answer: "No. It's a global marine marketplace we built. We mention it because the same patterns apply to a Hobart platform.",
        },
        {
          question: "Can buyers pay through the platform?",
          answer: "If you want them to. Many B2B platforms use invoices and purchase orders instead.",
        },
      ],
      caseStudies: ["maribiz-ai", "cleanship"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Hobart — Data Portals for Marine & Science Groups",
      metaDescription:
        "Next.js development for Hobart marine and science organisations: public data portals, maps and dashboards that make research accessible and fast.",
      h1: "Next.js development for Hobart science groups sharing data with the public",
      card: "Data portals, maps and dashboards for marine and science groups.",
      intro: [
        "Hobart's marine and Antarctic science organisations collect valuable data, and funders, partners and the public increasingly expect to see it. Static reports and downloadable spreadsheets don't do it justice.",
        "We build Next.js data portals with maps, charts and searchable datasets that make research accessible to non-specialists while staying fast and maintainable.",
      ],
      sections: [
        {
          heading: "Data people can explore",
          body: [
            "Interactive maps, time-series charts and filters let visitors explore data themselves. Each view has a plain-English explanation, and datasets can be downloaded for those who want them.",
          ],
        },
        {
          heading: "Fast and accessible",
          body: [
            "Data is pre-processed and served efficiently, so pages load quickly. Charts have text alternatives so the findings are accessible to everyone.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our data sits in spreadsheets nobody opens",
          cause: "There's no way to explore it online.",
          steps: [
            "Clean and structure the key datasets",
            "Build interactive maps and charts",
            "Explain each view in plain language",
          ],
        },
        {
          symptom: "Our data portal is slow and hard to update",
          cause: "It was built as a one-off project.",
          steps: [
            "Automate data updates",
            "Pre-process heavy data",
            "Document the portal for your team",
          ],
        },
      ],
      checklist: [
        "Key datasets can be explored online",
        "Charts have text alternatives",
        "Data updates automatically",
        "Datasets can be downloaded",
      ],
      faqs: [
        {
          question: "Can the portal update from our database?",
          answer: "Yes, on a schedule or as new data arrives.",
        },
        {
          question: "Can you work with scientific data formats?",
          answer: "Usually. We convert common formats into ones suited to the web.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Hobart — Aquaculture & Farm Field Records",
      metaDescription:
        "Android apps for Tasmanian aquaculture and farm teams: checks, observations and records captured offline on the water or in the paddock, synced to the office.",
      h1: "Android apps for Tasmanian teams recording data on the water and in the paddock",
      card: "Offline field records for aquaculture and farm teams.",
      intro: [
        "Tasmanian aquaculture and farm teams record a lot in the field: equipment checks, observations, feeding, treatments and maintenance. Often it's on paper or in a notebook that gets wet, and it reaches the office days later.",
        "We build native Android apps for rugged company devices that capture those records offline, with photos and location, and sync them when back in range.",
      ],
      sections: [
        {
          heading: "Built for wet, cold conditions",
          body: [
            "Large controls for gloves, minimal typing, pick lists and photos. Records save on the device and sync later, because reception on the water or in a valley is unreliable.",
          ],
        },
        {
          heading: "Records for compliance",
          body: [
            "Many checks are needed for regulators and certification. The app records who did what, when and where, and produces reports from the data.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Field records arrive late or not at all",
          cause: "They're on paper that gets lost or damaged.",
          steps: [
            "Capture records on rugged devices",
            "Save offline and sync later",
            "Alert the office to missed checks",
          ],
        },
        {
          symptom: "Compliance reports take days to compile",
          cause: "Records are spread across notebooks.",
          steps: [
            "Record checks in a structured app",
            "Store them centrally",
            "Generate reports from the data",
          ],
        },
      ],
      checklist: [
        "Field records are captured on a device",
        "The app works without reception",
        "Missed checks are flagged",
        "Compliance reports come from the data",
      ],
      faqs: [
        {
          question: "Which devices do you support?",
          answer: "Android phones and tablets, including rugged models. We test on your devices.",
        },
        {
          question: "Can it support iPhone too?",
          answer: "Not natively. If you need iPhone, we scope a React Native build separately.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Hobart — Be on the Tasmanian Itinerary",
      metaDescription:
        "SEO for Hobart and Tasmanian businesses: content for trip planners, Google Business Profile for visitors on the ground, and local search in a small market.",
      h1: "SEO for Tasmanian businesses that want to be on visitors' itineraries",
      card: "Trip-planning content and local search for Tasmanian businesses.",
      intro: [
        "Visitors plan Tasmanian trips carefully, searching for where to eat, what to see, where to taste and which tours are worth it. Being in those results, and on Google Maps once they arrive, decides which businesses get visited.",
        "We build content around those trip-planning searches and make sure your Google profile is complete and current for visitors on the ground.",
      ],
      sections: [
        {
          heading: "On the itinerary",
          body: [
            "Useful pages that answer what visitors plan around: day trips from Hobart, what to do in winter, where to taste whisky, how to get there. Written from your local knowledge, they're the kind of pages that rank and get shared.",
          ],
        },
        {
          heading: "On the map",
          body: [
            "Complete profiles with current hours, including seasonal changes, booking links, menus and recent photos and reviews win the on-the-day searches.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Visitors don't find us when planning",
          cause: "Guides and bigger operators dominate planning searches.",
          steps: [
            "Publish pages that answer what Tasmania-bound visitors are asking",
            "Link them to booking",
            "Get mentioned by guides and tourism sites",
          ],
        },
        {
          symptom: "Visitors turn up when we're closed",
          cause: "Seasonal hours aren't updated online.",
          steps: [
            "Update hours on your site and Google profile",
            "Add special hours for holidays",
            "Review them each season",
          ],
        },
      ],
      checklist: [
        "Your site answers the questions visitors ask while planning a Tasmanian trip",
        "Seasonal hours are correct online",
        "Your Google profile includes booking links",
        "You get regular new reviews",
      ],
      faqs: [
        {
          question: "How long does tourism SEO take?",
          answer: "Profiles improve quickly; planning content takes a few months to rank, so start before your season.",
        },
        {
          question: "Do you help with listings on tourism sites?",
          answer: "We advise on which ones matter and make sure your details are consistent.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Hobart — Reach Mainland Travellers Before They Book",
      metaDescription:
        "Google Ads for Tasmanian tourism and producers: reach mainland travellers planning trips and past visitors ready to reorder, with tracking to bookings and sales.",
      h1: "Google Ads for Tasmanian businesses whose customers are across the water",
      card: "Ads that reach mainland travellers and repeat buyers.",
      intro: [
        "Most of a Tasmanian tourism business's customers are on the mainland until they arrive, and most of a producer's online customers live there permanently. Ads that only target Tasmania miss nearly all of them.",
        "We run campaigns aimed at mainland travellers planning trips and mainland buyers searching for Tasmanian products, with tracking to bookings and sales.",
      ],
      sections: [
        {
          heading: "Travellers in planning mode",
          body: [
            "Campaigns target Melbourne, Sydney and Brisbane searchers planning Tasmanian trips, with ads for the experiences they're searching for and landing pages that take bookings.",
          ],
        },
        {
          heading: "Buyers looking for Tasmanian products",
          body: [
            "Shopping and search campaigns reach people looking for Tasmanian whisky, gin, wine or produce, sending them to your store.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads only reach Tasmanians",
          cause: "Location targeting is limited to the state.",
          steps: [
            "Run campaigns in mainland cities",
            "Write planning-focused ads",
            "Track bookings by location",
          ],
        },
        {
          symptom: "Off-peak ads don't fill rooms",
          cause: "Ads promote the summer experience year-round.",
          steps: [
            "Create seasonal ads and offers",
            "Target travellers planning off-peak trips",
            "Adjust budgets by season",
          ],
        },
      ],
      checklist: [
        "Campaigns target mainland travellers",
        "Ads change with the season",
        "Bookings and sales are tracked",
        "Product ads reach mainland buyers",
      ],
      faqs: [
        {
          question: "Are there rules for advertising alcohol?",
          answer: "Yes. Google has alcohol ad policies and requires age-appropriate targeting. We follow them.",
        },
        {
          question: "What budget do we need?",
          answer: "We estimate costs for your keywords and markets before you commit.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Hobart — Tasmanian Stories for Mainland Buyers",
      metaDescription:
        "Social media for Tasmanian producers and tourism: stories from the still, the farm and the coast, aimed at mainland followers who'll buy, book and visit.",
      h1: "Social media for Tasmanian businesses with stories mainlanders love",
      card: "Stories from the still, farm and coast for mainland followers.",
      intro: [
        "Tasmania has a powerful image on the mainland: wild landscapes, clean produce and craft. Tasmanian producers and operators have exactly the stories that feed it, from the still, the orchard, the boat and the trail.",
        "We help you capture and share those stories consistently, and put paid reach behind them in the mainland cities where your buyers and visitors live.",
      ],
      sections: [
        {
          heading: "Craft and place",
          body: [
            "Behind-the-scenes production, the landscape and the people. Short videos filmed on a phone often outperform polished content because they feel real.",
          ],
        },
        {
          heading: "Aimed at the mainland",
          body: [
            "Paid posts reach food, drink and travel lovers in Melbourne, Sydney and Brisbane, linking to your store, allocation list or bookings.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our followers are mostly local",
          cause: "Organic reach stays near home.",
          steps: [
            "Run paid posts in mainland cities",
            "Link to store or bookings",
            "Track resulting sales",
          ],
        },
        {
          symptom: "We never have time to post",
          cause: "Production and guests come first.",
          steps: [
            "Use a short weekly shot list",
            "Let us edit and schedule",
            "Batch content in quiet periods",
          ],
        },
      ],
      checklist: [
        "You post weekly",
        "Paid posts reach mainland cities",
        "Posts link to buying or booking",
        "You show production and people, not just products",
      ],
      faqs: [
        {
          question: "Can you promote alcohol on social media?",
          answer: "Yes, within platform rules and age targeting, and in line with the ABAC code.",
        },
        {
          question: "Do we need professional video?",
          answer: "Not usually. Phone footage of real moments often works best.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Hobart — Weather Cancellations Handled Automatically",
      metaDescription:
        "AI automation for Tasmanian tour operators: weather cancellations, guest messaging, rebooking and refunds handled automatically, with staff in control.",
      h1: "AI automation for Tasmanian operators at the mercy of the weather",
      card: "Weather cancellations, rebooking and guest messages automated.",
      intro: [
        "Tasmanian weather changes fast, and tours, cruises and flights get cancelled. Each cancellation means contacting every guest, offering alternatives, rebooking and processing refunds, often by phone, often on short notice.",
        "We build automation that messages affected guests straight away, offers rebooking options by link and processes refunds or credits by your policy, while your team handles the exceptions.",
      ],
      sections: [
        {
          heading: "One decision, every guest informed",
          body: [
            "When you cancel a departure, every guest gets a clear message with options: another date, a credit or a refund. Their choice updates the booking system automatically.",
          ],
        },
        {
          heading: "Everyday questions too",
          body: [
            "What to wear, where to meet, whether it's still on. Common questions get instant, accurate answers from your own information.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Cancellations take hours of phone calls",
          cause: "Guests are contacted and rebooked one by one.",
          steps: [
            "Message all affected guests at once",
            "Offer rebooking options by link",
            "Process refunds by your policy",
          ],
        },
        {
          symptom: "Guests arrive underdressed for the conditions",
          cause: "Preparation advice isn't sent before the trip.",
          steps: [
            "Send weather-aware preparation messages",
            "Include what to wear and bring",
            "Answer questions instantly",
          ],
        },
      ],
      checklist: [
        "Cancellations notify every guest automatically",
        "Guests can rebook themselves",
        "Preparation messages go out before trips",
        "Staff handle exceptions, not every case",
      ],
      faqs: [
        {
          question: "Does this work with our booking system?",
          answer: "Usually, through its API. We check before quoting.",
        },
        {
          question: "Who decides to cancel?",
          answer: "You do. The automation only handles the communication and rebooking once you decide.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Hobart — Production & Excise Records for Distilleries",
      metaDescription:
        "Custom software for Tasmanian distilleries and producers: batches, barrels, stock movements and excise figures in one system, with reports in minutes.",
      h1: "Custom software for Tasmanian distilleries tracking batches, barrels and excise",
      card: "Batches, barrels, stock and excise figures in one system.",
      intro: [
        "Tasmanian distilleries keep detailed records: batches, barrels, transfers, bottlings and stock movements, plus the figures needed for excise. Many manage it in spreadsheets that grow more fragile with every release.",
        "We build production and stock systems that record each step once and produce the reports you need, including the figures your excise reporting relies on.",
      ],
      sections: [
        {
          heading: "Barrel to bottle",
          body: [
            "Each batch and barrel has a record: fill date, spirit, cask, location and every movement. Bottlings draw from barrels and add finished stock. The history of any bottle can be traced.",
          ],
        },
        {
          heading: "Reports from the data",
          body: [
            "Stock, production and the figures your excise returns need are calculated from recorded movements. Your accountant or adviser confirms the treatment; the system makes the numbers reliable.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our barrel records live in a fragile spreadsheet",
          cause: "It's grown over years and only one person understands it.",
          steps: [
            "Move barrels and batches into a proper system",
            "Record every movement",
            "Give the team access by role",
          ],
        },
        {
          symptom: "Excise figures take days to prepare",
          cause: "They're assembled by hand from several files.",
          steps: [
            "Record movements as they happen",
            "Calculate figures from the data",
            "Have your adviser review the output",
          ],
        },
      ],
      checklist: [
        "Every barrel has a complete history",
        "Stock movements are recorded as they happen",
        "Excise-related figures come from the data",
        "More than one person can use the system",
      ],
      faqs: [
        {
          question: "Do you advise on excise?",
          answer: "No. Your adviser and the ATO set the rules. We build the system to record what's needed accurately.",
        },
        {
          question: "Can it connect to our online store?",
          answer: "Yes, so finished stock is shared with online sales.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "api-integration": {
      metaTitle: "API Integration in Hobart — Connect Store, Wholesale, Freight & Xero",
      metaDescription:
        "API integration for Tasmanian producers: connect your online store, wholesale orders, cellar door, freight and Xero so stock and orders match everywhere.",
      h1: "API integration for Tasmanian producers selling through every channel",
      card: "Connect store, wholesale, cellar door, freight and Xero.",
      intro: [
        "A Tasmanian producer might sell through an online store, a cellar door, wholesale to bottle shops and restaurants, and a club, with freight booked separately and everything reconciled in Xero. When they aren't connected, stock goes wrong and admin piles up.",
        "We connect those channels so stock is shared, orders flow to freight automatically and sales post to accounting.",
      ],
      sections: [
        {
          heading: "Shared stock across channels",
          body: [
            "Stock is held in one place and updated by every sale, whether online, at the cellar door or wholesale. Low stock is flagged before it runs out.",
          ],
        },
        {
          heading: "Freight booked automatically",
          body: [
            "Orders create freight bookings and labels with the right carrier, and tracking goes to the customer.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Wholesale and online stock clash",
          cause: "They're tracked separately.",
          steps: [
            "Hold stock in one system",
            "Update it from every channel",
            "Flag low stock",
          ],
        },
        {
          symptom: "Freight is booked by hand for every order",
          cause: "The store and carrier aren't connected.",
          steps: [
            "Connect the store to your carrier",
            "Create labels automatically",
            "Send tracking to customers",
          ],
        },
      ],
      checklist: [
        "Stock is shared across all channels",
        "Freight labels are created automatically",
        "Sales post to Xero",
        "Customers receive tracking",
      ],
      faqs: [
        {
          question: "Which carriers can you connect?",
          answer: "Most major carriers serving Tasmania, through their APIs or shipping platforms.",
        },
        {
          question: "Will this change how our staff work?",
          answer: "Mostly it removes steps. We train staff on anything new.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Hobart — Reliable Hosting for Small Tasmanian Teams",
      metaDescription:
        "Cloud set-up for Hobart businesses and research groups: Australian hosting, backups, secure access for remote staff and costs that suit a small team.",
      h1: "Cloud set-up for small Tasmanian teams that need things to just work",
      card: "Australian hosting, backups and secure access for small teams.",
      intro: [
        "Small Tasmanian businesses and research groups often have staff spread across the island and beyond: in the field, at sea or working from home. They need systems that are reliable, accessible from anywhere and backed up.",
        "We set up cloud hosting and storage for small teams, in Australian regions, with backups, secure access and costs that suit a small budget.",
      ],
      sections: [
        {
          heading: "Accessible from anywhere",
          body: [
            "Files and systems are reachable from the office, the field or home, with individual accounts and multi-factor authentication.",
          ],
        },
        {
          heading: "Backed up and tested",
          body: [
            "Automatic backups to a separate location, tested by restoring them, so a failed laptop or server never means lost work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Staff away from the office can't reach files",
          cause: "Files are on an office computer or server.",
          steps: [
            "Move files to cloud storage",
            "Give individual secure access",
            "Retire the office server when safe",
          ],
        },
        {
          symptom: "We've never tested our backups",
          cause: "Nobody has had time.",
          steps: [
            "Test a restore now",
            "Automate backups",
            "Schedule regular restore tests",
          ],
        },
      ],
      checklist: [
        "Staff can reach files from anywhere securely",
        "Backups are automatic",
        "You've tested restoring a backup",
        "Your monthly costs are predictable",
      ],
      faqs: [
        {
          question: "Is the Australian cloud region far from Tasmania?",
          answer: "The major providers' regions are in Sydney and Melbourne. Latency from Tasmania is fine for almost all uses.",
        },
        {
          question: "Do you look after our email and computers?",
          answer: "No. A local IT provider suits that better, and we can work alongside them.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Hobart — Seasonal Updates for Tasmanian Businesses",
      metaDescription:
        "Website maintenance for Hobart and Tasmanian businesses: seasonal hours, menus and experiences updated, plus security, backups and uptime monitoring.",
      h1: "Website maintenance for Tasmanian businesses that change with the seasons",
      card: "Seasonal hours, menus and experiences kept current, plus upkeep.",
      intro: [
        "Tasmanian businesses change a lot through the year: summer and winter hours, seasonal menus, different tours and closures for maintenance. Visitors plan around what your website says, so outdated information means disappointed guests.",
        "Our maintenance plans keep seasonal information current, alongside updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "A seasonal checklist",
          body: [
            "Before each season, we check hours, menus, experiences, prices and contact details across your site, and update anything you send us within one working day.",
          ],
        },
        {
          heading: "Quietly kept healthy",
          body: [
            "Software updates tested before release, security monitoring, daily off-site backups and uptime alerts, with a short monthly summary.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our winter hours are still showing in summer",
          cause: "Seasonal changes aren't anyone's job.",
          steps: [
            "Set a seasonal update calendar",
            "Update site and Google profile together",
            "Check before each season",
          ],
        },
        {
          symptom: "We closed for maintenance and guests turned up",
          cause: "The closure wasn't published online.",
          steps: [
            "Publish closures on the site and Google",
            "Add a banner during closures",
            "Remove it when you reopen",
          ],
        },
      ],
      checklist: [
        "Seasonal hours are current",
        "Closures are published",
        "Software was updated this month",
        "A recent backup exists",
      ],
      faqs: [
        {
          question: "Can you update our Google profile too?",
          answer: "Yes, with access, so it always matches your website.",
        },
        {
          question: "How fast are urgent changes made?",
          answer: "Immediately during our hours, 14:30 to 23:30 Hobart time.",
        },
      ],
    },
  },
}
