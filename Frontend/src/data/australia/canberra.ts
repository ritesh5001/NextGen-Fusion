import type { AuCity } from "./types"
import { AEDT, AEST } from "./zones"

export const canberra: AuCity = {
  slug: "canberra",
  name: "Canberra",
  state: "Australian Capital Territory",
  stateCode: "ACT",
  summary: "Government, research, peak bodies and the consultancies around them, where accessibility isn't optional.",
  zone: { std: AEST, dst: AEDT },
  areas: ["Civic", "Braddon", "Barton", "Kingston", "Manuka", "Belconnen", "Gungahlin", "Woden", "Tuggeranong", "Fyshwick", "Mitchell", "Dickson", "Molonglo", "Queanbeyan"],
  nearby: ["sydney", "wollongong", "melbourne"],
  page: {
    metaTitle: "Accessible Websites, Software & SEO for Canberra Organisations",
    metaDescription:
      "Accessible websites, member systems, research platforms and SEO for Canberra consultancies, peak bodies, research organisations and local businesses.",
    h1: "Helping Canberra organisations be clear, credible and accessible online",
    intro: [
      "Canberra's economy is shaped by the federal government and the organisations around it: consultancies and contractors, peak bodies and associations, universities and research organisations. Their audiences are expert, their buyers check everything, and accessibility is expected, not a bonus.",
      "Alongside them is a busy city of small businesses serving a well-educated, digitally fluent population. We help both. We work remotely from India, have no Canberra office, and are not on any government procurement panel. We'd rather say that here than have you find out later.",
    ],
    sections: [
      {
        heading: "Being checked is normal here",
        body: [
          "In Canberra, nearly every serious decision involves someone checking: a procurement officer looking at a consultancy's site, a member deciding whether to renew, a journalist checking a peak body's position, a grant assessor reading an organisation's track record.",
          "That rewards websites that are clear, accurate, accessible and easy to keep current, and it penalises vague claims and broken pages. Most of our Canberra work is about getting those basics right and making them easy to maintain.",
        ],
      },
      {
        heading: "Our hours in Canberra",
        body: [
          "Our day runs 14:30 to 23:30 Canberra time (15:30 to 00:30 during daylight saving), Monday to Saturday. Morning emails are answered that afternoon, and calls are booked in your afternoon.",
        ],
      },
    ],
    industries: [
      { name: "Consultancies and contractors", need: "Firms that sell to government need sites that show capability, people and past work clearly, and meet accessibility standards." },
      { name: "Peak bodies and associations", need: "Member organisations need membership, events and publications handled online, connected to their CRM." },
      { name: "Research and education", need: "Institutes and training providers need content-heavy, accessible sites and tools for collecting and publishing data." },
      { name: "Local businesses", need: "Shops, clinics and trades in the town centres need local search, reviews and fast mobile sites." },
    ],
    problems: [
      {
        service: "web-design",
        symptom: "Our website fails accessibility checks",
        cause: "Low contrast, missing alt text, PDFs instead of web pages and forms that don't work with a keyboard.",
        steps: [
          "Audit the site against WCAG 2.2 AA",
          "Fix templates first, so every page benefits",
          "Convert key PDFs into accessible web pages",
        ],
      },
      {
        service: "api-integration",
        symptom: "Member renewals, events and invoices are all manual",
        cause: "The CRM, event tool, email platform and accounting software aren't connected.",
        steps: [
          "Map the member journey from joining to renewal",
          "Connect the systems so data is entered once",
          "Automate renewal reminders and invoices",
        ],
      },
      {
        service: "website-development",
        symptom: "Our consultancy's website doesn't reflect our expertise",
        cause: "It describes services in general terms and hides the people and past work buyers want to see.",
        steps: [
          "Create pages for each area of expertise",
          "Publish team profiles with relevant experience",
          "Describe past work as clearly as your contracts allow",
        ],
      },
      {
        service: "nextjs-development",
        symptom: "Nobody can find anything in our publications library",
        cause: "Hundreds of PDFs with poor titles, no tags and a search that barely works.",
        steps: [
          "Add structured metadata to every publication",
          "Build filters by topic, year and type",
          "Publish key reports as accessible HTML",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Responding to RFQs takes days we don't have",
        cause: "Each response is written from scratch, though much of it has been written before.",
        steps: [
          "Build a library of your best past responses",
          "Draft new responses from it automatically",
          "Have experts edit, not start from a blank page",
        ],
      },
      {
        service: "seo",
        symptom: "Locals in Gungahlin and Tuggeranong don't find our business",
        cause: "Canberra's town centres each have their own local search, and we only show up near our address.",
        steps: [
          "Set your Google service area to the town centres you serve",
          "Add pages about your work in each one",
          "Collect reviews from customers across the territory",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Canberra?",
        answer: "No. We work from Lucknow and Mumbai, India, over video calls, WhatsApp and email.",
      },
      {
        question: "Are you on any government panels?",
        answer: "No. We are not on any Commonwealth or ACT procurement panel, so we don't sell directly to agencies through them. We work with consultancies, associations, research organisations and private businesses.",
      },
      {
        question: "Do you build to accessibility standards?",
        answer: "Yes. We design and build to WCAG 2.2 AA and test with automated tools and by hand, including keyboard and screen reader checks.",
      },
      {
        question: "Can you work with security or data requirements?",
        answer: "Tell us your requirements and we'll say plainly whether we can meet them. We hold no Australian security clearances and don't handle classified information.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Canberra — For Consultancies Selling to Government",
      metaDescription:
        "Website development for Canberra consultancies and contractors: expertise, people and past work presented clearly and accessibly for government buyers.",
      h1: "Website development for Canberra consultancies whose buyers check everything",
      card: "Consultancy sites that show expertise, people and past work.",
      intro: [
        "For a consultancy selling to government, the website is part of the evidence. Before a shortlist, someone checks what you do, who your people are and what you've delivered. A vague site with stock photos and \"solutions\" language doesn't survive that check.",
        "We build websites for Canberra consultancies and contractors that present expertise, people and past work clearly, and meet the accessibility standards your clients are held to. We're not on any government panel ourselves, so we work with the firms that are.",
      ],
      sections: [
        {
          heading: "Expertise, by practice area",
          body: [
            "Each practice area gets its own page, explaining the problems you solve, how you approach them and what you've delivered, in the language your buyers use. That helps procurement officers and helps search engines too.",
          ],
        },
        {
          heading: "People and past work",
          body: [
            "Government buyers are buying people. Team profiles with relevant experience, qualifications and publications matter. Case studies describe the problem, approach and outcome as specifically as your contracts allow, without naming agencies where you can't.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Buyers can't tell what we specialise in",
          cause: "Services are described in general terms on a single page.",
          steps: [
            "Create a page for each practice area",
            "Describe the problems you solve, in buyers' words",
            "Link relevant people and case studies",
          ],
        },
        {
          symptom: "We can't name clients, so we show no evidence at all",
          cause: "Confidentiality is treated as a reason to say nothing.",
          steps: [
            "Describe projects by problem, scale and outcome",
            "Use approved quotes or results where possible",
            "Check every case study against your contracts",
          ],
        },
      ],
      checklist: [
        "Each practice area has its own page",
        "Team profiles show relevant experience",
        "You have case studies, even if anonymised",
        "The site meets WCAG 2.2 AA",
      ],
      faqs: [
        {
          question: "Can you help us describe confidential work?",
          answer: "Yes. We help you describe the problem, approach and outcome without identifying details. You approve every case study before it's published.",
        },
        {
          question: "How long does a consultancy website take?",
          answer: "Usually five to eight weeks. Collecting approved case studies and team bios takes the most time.",
        },
      ],
      caseStudies: ["thegrafftee", "sidcobharat"],
    },
    "web-design": {
      metaTitle: "Web Design in Canberra — Accessible to WCAG 2.2 AA by Default",
      metaDescription:
        "Accessible web design for Canberra organisations: WCAG 2.2 AA from the first sketch, plain language, keyboard and screen-reader friendly, and still good to look at.",
      h1: "Accessible web design for Canberra organisations",
      card: "Design to WCAG 2.2 AA from the first sketch.",
      intro: [
        "Government buyers in Canberra expect accessibility, and the people using your site include people with disabilities, older readers and people on assistive technology. Accessibility retrofitted at the end is expensive and rarely complete. Designed in from the start, it's mostly good design.",
        "We design and build to WCAG 2.2 AA: proper contrast, keyboard navigation, readable forms, meaningful headings and screen-reader-friendly structure, checked with tools and by hand.",
      ],
      sections: [
        {
          heading: "Accessibility from the first sketch",
          body: [
            "Colour palettes are checked for contrast before they're approved. Layouts work at 200% zoom. Every interactive element can be used with a keyboard and has a visible focus state. Forms have labels, helpful errors and no time limits.",
          ],
        },
        {
          heading: "Plain language is part of it",
          body: [
            "Clear, plain language is one of the most effective accessibility improvements, and one of the most neglected. We help rewrite key pages so they can be understood quickly by anyone.",
          ],
        },
      ],
      problems: [
        {
          symptom: "An accessibility audit found hundreds of issues",
          cause: "Problems are built into templates and repeated on every page.",
          steps: [
            "Group issues by template and component",
            "Fix templates first for the widest effect",
            "Re-test and document conformance",
          ],
        },
        {
          symptom: "Our key information is locked in PDFs",
          cause: "Reports and forms were published as PDFs that are hard to read on phones and with screen readers.",
          steps: [
            "Identify the most-used PDFs",
            "Publish them as accessible web pages",
            "Keep a PDF version for printing only",
          ],
        },
      ],
      checklist: [
        "Text contrast meets WCAG 2.2 AA",
        "Every page can be navigated with a keyboard",
        "Forms have labels and clear error messages",
        "Key documents are available as web pages, not only PDFs",
      ],
      faqs: [
        {
          question: "Can you audit our existing site?",
          answer: "Yes. We test against WCAG 2.2 AA with automated tools and manual checks, and give you a prioritised list of fixes.",
        },
        {
          question: "Will an accessible site look plain?",
          answer: "No. Accessibility constrains things like contrast and focus states, but leaves plenty of room for a distinctive design.",
        },
      ],
      caseStudies: ["sidcobharat"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce for Canberra Associations — Memberships, Events & Publications",
      metaDescription:
        "Ecommerce for Canberra associations: memberships, event tickets and publications with member pricing, tax invoices and purchase-order support.",
      h1: "Ecommerce for Canberra associations selling memberships, events and publications",
      card: "Online payments for memberships, events and publications.",
      intro: [
        "Canberra is home to many peak bodies and professional associations. They sell things online, just not the way a shop does: memberships with tiers, event and conference tickets, training, and publications, often to organisations that need tax invoices and want to pay by purchase order.",
        "We build ecommerce for associations that handles all of that, with member pricing, organisational purchases, GST-compliant tax invoices and payment by card or invoice.",
      ],
      sections: [
        {
          heading: "Built for how members buy",
          body: [
            "Members see member prices automatically when logged in. Organisations can buy several tickets or memberships at once and add names later. Buyers choose card payment or an invoice with a purchase order number.",
          ],
        },
        {
          heading: "Connected to your member records",
          body: [
            "Every purchase updates the member's record in your CRM, so renewals, attendance and purchases are in one history, and reporting to your board doesn't require a week of spreadsheets.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Organisations can't buy several tickets in one go",
          cause: "The checkout assumes one buyer, one ticket.",
          steps: [
            "Allow group purchases with names added later",
            "Offer invoice payment with a PO number",
            "Send a single tax invoice to the organisation",
          ],
        },
        {
          symptom: "Members pay non-member prices by mistake",
          cause: "The store doesn't know who is a member.",
          steps: [
            "Connect the store to your member records",
            "Show member prices automatically when logged in",
            "Prompt non-members to join at checkout",
          ],
        },
      ],
      checklist: [
        "Members see member prices automatically",
        "Organisations can pay by invoice with a PO number",
        "Tax invoices are issued automatically",
        "Purchases update member records in your CRM",
      ],
      faqs: [
        {
          question: "Can you connect to our membership CRM?",
          answer: "Usually, yes, through its API. We check your CRM's capabilities during scoping.",
        },
        {
          question: "Can conference registration include workshops and dinners?",
          answer: "Yes. Registrations can include sessions, add-ons and dietary requirements, with capacity limits.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Canberra — Makers, Gifts & Corporate Orders",
      metaDescription:
        "Shopify developers for Canberra makers and gift businesses: online stores that handle markets, local pickup and corporate gift orders with invoices.",
      h1: "Shopify development for Canberra makers and gift businesses with corporate customers",
      card: "Shopify for makers, local pickup and corporate gift orders.",
      intro: [
        "Canberra has a strong community of makers and small gift businesses, many of whom sell at weekend markets and to a steady stream of corporate customers buying gifts for staff, visiting delegations and events.",
        "We set up Shopify stores that work for both: a lovely store for individual buyers, local pickup, and a smooth process for corporate orders with bulk pricing, custom messages and invoices.",
      ],
      sections: [
        {
          heading: "Corporate orders without the email chain",
          body: [
            "Corporate buyers can request quotes, order in bulk with custom messages or branding, pay by invoice, and get tax invoices that satisfy their finance team. We set this up in Shopify with B2B features or a simple quote flow.",
          ],
        },
        {
          heading: "Markets and pickup",
          body: [
            "Shopify POS at markets keeps stock in sync with the online store. Local pickup lets Canberra customers collect from you or a market stall.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Corporate gift orders take hours of back-and-forth",
          cause: "Quotes, custom messages and invoices are handled by email.",
          steps: [
            "Add a corporate order or quote form",
            "Collect custom messages and delivery details in one go",
            "Send tax invoices automatically",
          ],
        },
        {
          symptom: "Market sales and online stock don't match",
          cause: "Market stock isn't recorded in the online store.",
          steps: [
            "Use Shopify POS at markets",
            "Share stock across channels",
            "Review best sellers after each market",
          ],
        },
      ],
      checklist: [
        "Corporate buyers can order and pay by invoice",
        "Bulk pricing is set up",
        "Market and online stock are shared",
        "Local pickup is available",
      ],
      faqs: [
        {
          question: "Can corporate buyers pay by invoice?",
          answer: "Yes, through Shopify's B2B features or a manual payment option with clear payment terms.",
        },
        {
          question: "Can each gift have its own message and address?",
          answer: "Yes. We set up bulk orders with per-recipient messages and addresses.",
        },
      ],
      caseStudies: ["clickngreet", "kalamohini"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Canberra — Tutoring & Professional Services",
      metaDescription:
        "Marketplace development for Canberra founders: tutoring, coaching and professional services platforms with credential checks, bookings, payments and reviews.",
      h1: "Marketplace development for Canberra platforms connecting people with expertise",
      card: "Tutoring and professional services platforms with credential checks.",
      intro: [
        "Canberra has one of the most highly educated populations in Australia, and plenty of people with expertise to share: tutors, coaches, specialist advisers and trainers. Platforms that connect them with clients depend on trust, especially where children or sensitive information are involved.",
        "We build marketplaces for expertise with credential verification, bookings, payments, reviews and the admin tools to keep quality high.",
      ],
      sections: [
        {
          heading: "Credentials checked, not claimed",
          body: [
            "Providers upload qualifications and registrations during onboarding, such as an ACT Working with Vulnerable People registration where they work with children, with expiry dates tracked. Clients see what's been verified.",
          ],
        },
        {
          heading: "Bookings, sessions and payment",
          body: [
            "Clients book sessions from providers' calendars, pay on the platform, and providers are paid automatically. Packages, recurring sessions and cancellations follow rules you set.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Parents don't trust tutors on our platform",
          cause: "Registrations and qualifications aren't visible or verified.",
          steps: [
            "Require and verify registrations at onboarding",
            "Show verified badges with dates",
            "Track expiries and pause lapsed providers",
          ],
        },
        {
          symptom: "Recurring sessions are booked by hand each week",
          cause: "The platform only supports one-off bookings.",
          steps: [
            "Add recurring bookings and packages",
            "Charge per session or per package automatically",
            "Handle cancellations by your policy",
          ],
        },
      ],
      checklist: [
        "Providers' registrations are verified",
        "Expired registrations pause a provider automatically",
        "Clients can book recurring sessions",
        "Providers are paid without manual transfers",
      ],
      faqs: [
        {
          question: "Can the platform host online sessions?",
          answer: "Yes, by integrating a video service, or by linking to tools providers already use.",
        },
        {
          question: "How do you handle children's data?",
          answer: "Carefully, collecting only what's needed, with access controls and privacy terms you approve. We design this with your legal advice.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Canberra — Publications & Research Libraries",
      metaDescription:
        "Next.js for Canberra research organisations and peak bodies: searchable, accessible publication libraries that are fast and easy to maintain.",
      h1: "Next.js development for Canberra organisations with large publication libraries",
      card: "Searchable, accessible publications and research libraries.",
      intro: [
        "Research organisations, think tanks and peak bodies in Canberra publish constantly: reports, submissions, policy positions, data and briefs. Over the years, publication libraries turn into hundreds of poorly labelled PDFs that nobody can search.",
        "We build Next.js knowledge sites that turn those libraries into structured, searchable, accessible collections that are fast to browse and easy to keep up to date.",
      ],
      sections: [
        {
          heading: "Publications as data",
          body: [
            "Every publication gets structured metadata: title, authors, date, topics, type and a summary. Visitors filter and search across it, and related publications link to each other automatically.",
          ],
        },
        {
          heading: "HTML first, PDF second",
          body: [
            "Key reports are published as accessible web pages, with the PDF available for download. They are easier to read on a phone, work with assistive technology and are far easier for search engines and AI assistants to cite.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our reports don't show up in search",
          cause: "They're PDFs with generic file names and no page of their own.",
          steps: [
            "Give each publication its own page with a summary",
            "Publish key reports in HTML",
            "Add structured data for publications",
          ],
        },
        {
          symptom: "Staff can't find our own past submissions",
          cause: "No consistent tagging or search.",
          steps: [
            "Define a simple topic and type taxonomy",
            "Tag the existing library",
            "Build filtered search for staff and the public",
          ],
        },
      ],
      checklist: [
        "Each publication has its own web page",
        "Publications can be filtered by topic and year",
        "Key reports are available as accessible HTML",
        "Staff can publish without a developer",
      ],
      faqs: [
        {
          question: "Can you migrate our existing library?",
          answer: "Yes. We import and tag existing publications, with redirects from old URLs.",
        },
        {
          question: "Can you convert PDFs into web pages?",
          answer: "Yes, for priority documents. We use conversion tools, then check and fix the structure by hand for accessibility.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Canberra — Field Data Collection Apps",
      metaDescription:
        "Android apps for Canberra research and environmental teams: offline field data collection with GPS, photos and structured forms that sync to your database.",
      h1: "Android apps for Canberra research teams collecting data in the field",
      card: "Offline field data collection with GPS, photos and forms.",
      intro: [
        "Research, environmental and survey teams based in Canberra collect data in the field: in national parks, on farms and in remote communities, often far from reception. Paper forms and generic survey apps slow them down and introduce errors.",
        "We build native Android apps for field data collection with structured forms, GPS, photos and validation, working fully offline and syncing to your database when back in range.",
      ],
      sections: [
        {
          heading: "Data that's right the first time",
          body: [
            "Forms are built around your protocol, with pick lists, units, ranges and required fields, so mistakes are caught in the field rather than in analysis. GPS coordinates and timestamps are recorded automatically.",
          ],
        },
        {
          heading: "Android devices you control",
          body: [
            "Our native strength is Android, which suits research teams issuing standard devices. If team members need iPhones, we scope a React Native build separately rather than taking on native iOS.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Field data has to be cleaned for weeks",
          cause: "Paper forms and free-text entries create inconsistent data.",
          steps: [
            "Build forms with validation and pick lists",
            "Record location and time automatically",
            "Sync straight to your database",
          ],
        },
        {
          symptom: "Our survey app doesn't work in the field",
          cause: "It needs a connection to load or submit forms.",
          steps: [
            "Store forms and reference data on the device",
            "Queue submissions until a connection returns",
            "Show what's waiting to sync",
          ],
        },
      ],
      checklist: [
        "Field forms work with no reception",
        "Location and time are recorded automatically",
        "Data is validated as it's entered",
        "Data syncs straight into your database",
      ],
      faqs: [
        {
          question: "Can the app export to our analysis tools?",
          answer: "Yes, as CSV or directly into a database your analysis tools can read.",
        },
        {
          question: "Where will the data be stored?",
          answer: "In your own cloud account in an Australian region, or on your own servers if required.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services in Canberra — Town Centres & Expert Content",
      metaDescription:
        "SEO for Canberra businesses and organisations: local search across Belconnen, Gungahlin, Woden and Tuggeranong, and expert content that ranks and gets cited.",
      h1: "SEO for Canberra, from town-centre searches to expert content",
      card: "Local SEO across town centres, plus content that gets cited.",
      intro: [
        "Canberra is compact, but its town centres, including Belconnen, Gungahlin, Woden and Tuggeranong, each have their own local search. A business that serves the whole territory needs to show up in each one, which takes area pages and a Google Business Profile set up for the right service area.",
        "For consultancies, peak bodies and research organisations, SEO is different: being the source that search engines and AI assistants cite when people ask about your field.",
      ],
      sections: [
        {
          heading: "Local businesses across the territory",
          body: [
            "We set your Google profile's service area, build genuinely useful pages about the work you do in each town centre, and help you collect reviews from customers across Canberra and Queanbeyan.",
          ],
        },
        {
          heading: "Expert organisations",
          body: [
            "Clear, well-structured explainers on your field, with named expert authors, publication dates and sources, rank well and are cited by AI assistants. Your expertise is already there; we help structure it so it can be found.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We only rank near our own town centre",
          cause: "Google sees no evidence you serve the rest of Canberra.",
          steps: [
            "Set your service area to match where you work",
            "Build pages for each town centre you serve",
            "Collect reviews from across the territory",
          ],
        },
        {
          symptom: "Others are cited on topics we're experts in",
          cause: "Our expertise is in PDFs and media releases, not clear web pages.",
          steps: [
            "Write explainers on your core topics",
            "Name expert authors with profiles",
            "Update them as the field changes",
          ],
        },
      ],
      checklist: [
        "Your Google profile's service area covers where you work",
        "Each core topic has a clear explainer page",
        "Expert authors are named with profiles",
        "Your site is verified in Search Console",
      ],
      faqs: [
        {
          question: "Can SEO help with AI search tools?",
          answer: "Yes. Clear structure, named experts, dates and sources make content more likely to be cited by AI assistants as well as search engines.",
        },
        {
          question: "How long does it take?",
          answer: "Local improvements often show in weeks. Expert content takes months to build authority.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Canberra — Course Enrolments, Events & Local Leads",
      metaDescription:
        "Google Ads for Canberra training providers, associations and local businesses: enrolments, event registrations and local leads, with honest B2G advice.",
      h1: "Google Ads for Canberra training providers, associations and local businesses",
      card: "Ads for enrolments, event registrations and local leads.",
      intro: [
        "Google Ads works well in Canberra for some things and poorly for others. It's effective for training courses, event registrations and local services, where people search with clear intent. It rarely wins government consulting work, which is bought through panels and relationships, and we'll say so.",
        "We run campaigns where they make sense, with tight targeting and tracking to enrolments, registrations and enquiries.",
      ],
      sections: [
        {
          heading: "Enrolments and registrations",
          body: [
            "For training providers and associations, we build campaigns around each course or event, with landing pages that answer the key questions (dates, cost, eligibility, outcomes) and track completed registrations, not just clicks.",
          ],
        },
        {
          heading: "Local services",
          body: [
            "Canberra's population is compact and searches with clear intent. Tight location targeting and good landing pages keep costs down for local service businesses.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Course ads get clicks but few enrolments",
          cause: "Ads send people to a general course list, not the course they searched for.",
          steps: [
            "Create a landing page for each course",
            "Show dates, cost and outcomes up front",
            "Track completed enrolments",
          ],
        },
        {
          symptom: "Event registrations come in at the last minute",
          cause: "Promotion starts too late and stops too early.",
          steps: [
            "Start campaigns six to eight weeks out",
            "Use early-bird deadlines in ads",
            "Retarget people who visited but didn't register",
          ],
        },
      ],
      checklist: [
        "Each course or event has its own landing page",
        "You track completed enrolments or registrations",
        "Campaigns start well before event dates",
        "Location targeting matches your audience",
      ],
      faqs: [
        {
          question: "Will Google Ads win us government work?",
          answer: "Rarely. Government buying happens through panels, tenders and relationships. We'd suggest your website, expertise content and LinkedIn instead.",
        },
        {
          question: "Can you run ads for a national conference?",
          answer: "Yes, targeting your audience across Australia, timed to registration deadlines.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Canberra — LinkedIn Thought Leadership",
      metaDescription:
        "Social media for Canberra consultancies and peak bodies: LinkedIn thought leadership, event promotion and expert content that builds reputation.",
      h1: "Social media for Canberra organisations whose reputation is their pipeline",
      card: "LinkedIn thought leadership and event promotion for expert organisations.",
      intro: [
        "For Canberra consultancies, peak bodies and research organisations, reputation is the pipeline. Work comes from being known as the people who understand an issue, and LinkedIn is where much of that reputation is built.",
        "We help you turn your expertise, including reports, submissions, events and opinions, into consistent posts from your organisation and your experts, without adding hours to anyone's week.",
      ],
      sections: [
        {
          heading: "Your experts, amplified",
          body: [
            "People follow people. We help your experts post short, useful takes on their field, drafted from their own reports and talks for them to edit, and coordinate company posts that share and support them.",
          ],
        },
        {
          heading: "Events and publications",
          body: [
            "Each new report, submission or event becomes several posts: the key finding, a chart, a quote, a short video. We schedule them over weeks rather than one post on launch day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our reports launch and disappear",
          cause: "Each publication gets one post on release day.",
          steps: [
            "Turn each report into a series of posts",
            "Schedule them over several weeks",
            "Share them from experts' personal profiles",
          ],
        },
        {
          symptom: "Our experts are too busy to post",
          cause: "Writing posts from scratch takes time they don't have.",
          steps: [
            "Draft posts from their existing work",
            "Let them edit and approve in minutes",
            "Schedule posts for them",
          ],
        },
      ],
      checklist: [
        "Each new publication is promoted over several weeks",
        "Your experts post on LinkedIn at least monthly",
        "Event promotion starts six weeks out",
        "You know which posts drive website visits",
      ],
      faqs: [
        {
          question: "Do you write posts in our experts' voices?",
          answer: "We draft from their own words and work. They edit and approve everything before it's posted.",
        },
        {
          question: "Can you manage posts during caretaker periods or sensitive times?",
          answer: "Yes. We follow your communications rules and pause or adjust scheduled posts when needed.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Canberra — Faster RFQ Responses & Report Summaries",
      metaDescription:
        "AI automation for Canberra consultancies: RFQ responses drafted from your best past work and long reports summarised, with experts in control.",
      h1: "AI automation for Canberra consultancies writing responses against the clock",
      card: "Draft RFQ responses from past work and summarise long reports.",
      intro: [
        "Canberra consultancies spend enormous time responding to requests for quote and tenders. Much of each response has been written before: methodology, team experience, case studies and quality approach, scattered across old documents nobody can find under deadline.",
        "We build AI tools that draft new responses from a library of your best past work, and summarise long reports, inquiries and submissions, leaving your experts to refine rather than start from nothing.",
      ],
      sections: [
        {
          heading: "Your best answers, ready to reuse",
          body: [
            "We organise past responses into a searchable library. When a new RFQ arrives, the tool matches each question to your strongest previous answers and drafts a response for your team to tailor. Every claim stays your responsibility, and nothing is submitted automatically.",
          ],
        },
        {
          heading: "Handling sensitive material",
          body: [
            "Many documents are commercial-in-confidence. We use AI providers that exclude your data from training, can deploy inside your own cloud account, and don't work with classified material.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We rewrite the same sections for every response",
          cause: "Past responses are scattered and hard to search.",
          steps: [
            "Collect and tag your best past responses",
            "Match new questions to them automatically",
            "Draft first versions for experts to refine",
          ],
        },
        {
          symptom: "Nobody has time to read every relevant report",
          cause: "Inquiries, reviews and submissions run to hundreds of pages.",
          steps: [
            "Summarise long documents into key findings",
            "Link each point to its source page",
            "Share summaries with the team",
          ],
        },
      ],
      checklist: [
        "Your best past responses are easy to find",
        "First drafts don't start from a blank page",
        "Long documents are summarised with sources",
        "Experts review every draft before it's used",
      ],
      faqs: [
        {
          question: "Will AI-written responses sound generic?",
          answer: "Drafts are built from your own past writing, so they sound like you. Your experts tailor each one to the specific buyer.",
        },
        {
          question: "Is our data safe?",
          answer: "We use providers that don't train on your data and can deploy within your own cloud account.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Canberra — Program & Grant Management Tools",
      metaDescription:
        "Custom software for Canberra not-for-profits, associations and research bodies: program, grant and reporting tools that replace spreadsheets and make reporting easy.",
      h1: "Custom software for Canberra organisations running programs and grants",
      card: "Program, grant and reporting tools that replace spreadsheets.",
      intro: [
        "Not-for-profits, associations and research bodies in Canberra often run programs and grants on spreadsheets: applications, assessments, milestones, payments and reports to funders. Every reporting deadline becomes a scramble.",
        "We build program and grant management tools that hold all of it in one place, so applications, assessments, milestones and reports are tracked as they happen, and funder reporting takes hours instead of weeks.",
      ],
      sections: [
        {
          heading: "Applications to acquittal",
          body: [
            "Applicants apply online, assessors score against criteria, successful projects get milestones and payments, and progress reports are collected through forms. Everything is linked, and nothing lives in an inbox.",
          ],
        },
        {
          heading: "Reports funders actually want",
          body: [
            "Reports are generated from live data in the format your funders require, with outcomes, spending and milestones up to date.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Funder reporting takes weeks",
          cause: "Data is spread across spreadsheets and emails.",
          steps: [
            "Hold program data in one system",
            "Collect progress through forms",
            "Generate funder reports automatically",
          ],
        },
        {
          symptom: "Assessing applications is slow and inconsistent",
          cause: "Assessors score in separate spreadsheets.",
          steps: [
            "Move applications and scoring online",
            "Score against shared criteria",
            "Show results side by side",
          ],
        },
      ],
      checklist: [
        "Applications are submitted online",
        "Assessors score in one system",
        "Milestones and payments are tracked",
        "Funder reports are generated from live data",
      ],
      faqs: [
        {
          question: "Couldn't we use an off-the-shelf grants system?",
          answer: "Often, yes, and we'll compare honestly. Custom makes sense when your programs or reporting don't fit existing products.",
        },
        {
          question: "Where is the data stored?",
          answer: "In an Australian region of your own cloud account, with access controls you set.",
        },
      ],
      caseStudies: ["sidcobharat"],
    },
    "api-integration": {
      metaTitle: "API Integration in Canberra — Membership CRM, Events & Accounting",
      metaDescription:
        "API integration for Canberra associations and peak bodies: connect membership CRM, events, email, website and accounting so renewals and reporting run themselves.",
      h1: "API integration for Canberra associations running on disconnected systems",
      card: "Connect membership CRM, events, email and accounting.",
      intro: [
        "Canberra associations and peak bodies often run a membership CRM, an events platform, an email tool, a website and accounting software, each bought separately. Staff copy member details between them, renewals get missed, and nobody trusts the membership numbers.",
        "We connect those systems so member data is entered once and flows everywhere it's needed.",
      ],
      sections: [
        {
          heading: "One member record",
          body: [
            "A member who joins online, registers for an event and opens your newsletter should have one record with their full history. We connect systems so that's true, and remove the duplicate entries that make reporting unreliable.",
          ],
        },
        {
          heading: "Renewals that happen",
          body: [
            "Renewal reminders go out on schedule, payments update the member's status, invoices are created in accounting, and lapsed members are flagged for a follow-up.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our membership numbers never agree",
          cause: "Each system holds a different list of members.",
          steps: [
            "Choose the CRM as the single source of truth",
            "Sync other systems to it",
            "Clean up duplicates once",
          ],
        },
        {
          symptom: "Renewals slip through the cracks",
          cause: "Reminders and invoices are sent by hand.",
          steps: [
            "Automate reminders before renewal dates",
            "Update status automatically on payment",
            "Flag lapsed members for follow-up",
          ],
        },
      ],
      checklist: [
        "Each member has one record across systems",
        "Renewal reminders send automatically",
        "Payments update member status",
        "Event attendance appears in member records",
      ],
      faqs: [
        {
          question: "Which CRMs can you connect?",
          answer: "Most with an API, including common membership and nonprofit CRMs. We confirm during scoping.",
        },
        {
          question: "Will this mean changing our CRM?",
          answer: "Not usually. We connect what you have, unless it can't support what you need.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Canberra — Australian Hosting With Clear Documentation",
      metaDescription:
        "Cloud set-up for Canberra organisations: Australian data regions, providers with IRAP-assessed services, access control and documentation for your security reviews.",
      h1: "Cloud set-up for Canberra organisations that need to show where data lives",
      card: "Australian-hosted cloud with documentation for security reviews.",
      intro: [
        "Canberra organisations often have to answer detailed questions about their systems: where data is stored, which services are used, who has access and how it's protected. Government clients and funders ask, and \"we're not sure\" isn't an acceptable answer.",
        "We set up cloud hosting in Australian regions, using providers whose services are commonly assessed for government use, with access controls and documentation that make those questions easy to answer.",
      ],
      sections: [
        {
          heading: "Providers your clients recognise",
          body: [
            "The major cloud providers run Australian regions, and many of their services have been through IRAP assessment. We don't hold any assessment ourselves, but we build on services that commonly meet government clients' expectations and document exactly which ones are used.",
          ],
        },
        {
          heading: "Documented from day one",
          body: [
            "A plain-English description of your set-up covers hosting, data locations, access, backups and logging. We keep it current as things change, so security questionnaires take minutes.",
          ],
        },
      ],
      problems: [
        {
          symptom: "A client asked where our data is stored and we couldn't say",
          cause: "Systems were set up over years without documentation.",
          steps: [
            "Inventory every system and its data location",
            "Move data to Australian regions where needed",
            "Document the set-up in plain English",
          ],
        },
        {
          symptom: "Access to our systems isn't controlled",
          cause: "Shared logins and accounts that never get removed.",
          steps: [
            "Give everyone individual accounts with MFA",
            "Set access by role",
            "Remove access when people leave",
          ],
        },
      ],
      checklist: [
        "Your data's location is documented",
        "Everyone uses an individual account with MFA",
        "Backups are tested",
        "Your security summary is up to date",
      ],
      faqs: [
        {
          question: "Can you get us IRAP-assessed?",
          answer: "No. IRAP assessments are done by endorsed assessors. We can build on services with existing assessments and document your set-up clearly.",
        },
        {
          question: "Will your team have access to our data?",
          answer: "Only as much as the work needs, and you can remove it at any time. If your requirements rule out overseas access, we'll design around that.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Canberra — Accessibility Kept Up, Not Just Software",
      metaDescription:
        "Website maintenance for Canberra organisations: accessibility checks on new content, publications added, software updated and backups and monitoring handled.",
      h1: "Website maintenance for Canberra organisations that must stay accessible",
      card: "Accessibility checks on new content, plus updates and backups.",
      intro: [
        "An accessible website doesn't stay accessible by itself. Every new page, image, PDF and form can introduce problems, and for Canberra organisations whose clients expect WCAG conformance, that drift is a risk.",
        "Our maintenance plans check new content for accessibility, publish your new reports and pages, and handle the technical upkeep: updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Accessibility, maintained",
          body: [
            "We check new pages and documents as they're published and fix issues such as missing alt text, unclear links, poor heading structure and inaccessible PDFs. Each quarter we run a wider check and report what we found.",
          ],
        },
        {
          heading: "Publishing support",
          body: [
            "Send us new reports, submissions or news, and we publish them properly tagged and accessible within one working day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our site passed an audit last year and fails now",
          cause: "New content has introduced issues since the audit.",
          steps: [
            "Check new content as it's published",
            "Run a quarterly accessibility check",
            "Train editors on the common issues",
          ],
        },
        {
          symptom: "Publishing a report takes days",
          cause: "Only one person knows how, and they're busy.",
          steps: [
            "Send reports to us for publishing",
            "Publish with tags and an accessible summary",
            "Go live within one working day",
          ],
        },
      ],
      checklist: [
        "New pages are checked for accessibility",
        "New publications are tagged consistently",
        "Software was updated this month",
        "A recent backup exists off the server",
      ],
      faqs: [
        {
          question: "Do you fix accessibility in PDFs?",
          answer: "For priority documents, yes. Often the better fix is to publish the content as an accessible web page alongside the PDF.",
        },
        {
          question: "Can you maintain a site built by another agency?",
          answer: "Yes. We audit it first and tell you plainly what condition it's in.",
        },
      ],
    },
  },
}
