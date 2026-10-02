import type { InCity } from "./types"

export const gurugram: InCity = {
  slug: "gurugram",
  name: "Gurugram",
  state: "Haryana",
  stateCode: "HR",
  summary: "Corporate headquarters, consultancies, startups and premium consumers who expect polish.",
  areas: ["Cyber City", "Golf Course Road", "Golf Course Extension Road", "Sohna Road", "MG Road", "Udyog Vihar", "Sector 29", "DLF Phase 1-5", "Sushant Lok", "South City", "Palam Vihar", "New Gurgaon", "IMT Manesar", "Sector 44"],
  nearby: ["delhi", "noida", "jaipur"],
  page: {
    metaTitle: "Website, App & Growth Agency in Gurugram",
    metaDescription:
      "Websites, enterprise-ready apps, SEO, ads and automation for Gurugram consultancies, startups, premium brands, clinics and corporate service companies.",
    h1: "Polished digital work for Gurugram's corporates, startups and premium brands",
    intro: [
      "Gurugram is where many Indian and global companies keep their headquarters, where consultancies on Golf Course Road sell to boardrooms, where startups in Udyog Vihar and Sector 44 raise money and hire fast, and where affluent consumers in DLF and Golf Course Extension expect premium experiences.",
      "Everyone here is judged against high standards. We build websites, apps and systems that meet them, with enterprise features where buyers expect them, and marketing that reaches the right decision-makers. Our offices are in Lucknow and Mumbai; Gurugram projects run over WhatsApp, video and email.",
    ],
    sections: [
      {
        heading: "Enterprise buyers check everything",
        body: [
          "A consultancy, SaaS product or service company selling to large corporates goes through vendor checks: security questionnaires, references, case studies and a website that looks established. Weakness in any of them slows or ends deals.",
        ],
      },
      {
        heading: "Premium consumers expect polish",
        body: [
          "Gurugram's affluent customers notice slow sites, clunky booking and generic design. Premium clinics, real estate, brands and services need online experiences that match their prices.",
        ],
      },
    ],
    industries: [
      { name: "Consulting and professional services", need: "Firms need credible sites, thought leadership and lead systems that impress corporate buyers." },
      { name: "Startups and SaaS", need: "Startups need enterprise-ready products, efficient growth and sales operations that scale." },
      { name: "Premium consumer brands and clinics", need: "Brands and clinics need polished sites, booking and marketing aimed at affluent customers." },
      { name: "Corporate services", need: "Gifting, events, workspace and facility companies need ordering, booking and coordination systems." },
    ],
    problems: [
      {
        service: "nextjs-development",
        symptom: "Enterprise prospects ask for SSO and audit logs we don't have",
        cause: "The product was built for small customers.",
        steps: [
          "Add SSO with SAML or OIDC",
          "Add audit logs and role-based access",
          "Document security for questionnaires",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Corporate gift orders take weeks of back-and-forth",
        cause: "Orders, branding and addresses are handled by email.",
        steps: [
          "Build a corporate gifting store",
          "Accept recipient lists and branding files",
          "Issue GST invoices automatically",
        ],
      },
      {
        service: "website-development",
        symptom: "Our consultancy site doesn't reflect our client list",
        cause: "It's generic and hasn't been updated in years.",
        steps: [
          "Show expertise by industry and problem",
          "Publish case studies and insights",
          "Introduce partners and their experience",
        ],
      },
      {
        service: "google-ads",
        symptom: "Our clinic's ads bring price shoppers",
        cause: "Ads compete on discounts rather than expertise.",
        steps: [
          "Target specific treatments and premium localities",
          "Lead with doctors' expertise",
          "Track consultations booked",
        ],
      },
      {
        service: "ai-automation",
        symptom: "Our sales team spends evenings updating the CRM",
        cause: "Call notes and follow-ups are typed by hand.",
        steps: [
          "Summarise calls into the CRM automatically",
          "Draft follow-up emails",
          "Flag stalled deals",
        ],
      },
      {
        service: "marketplace-development",
        symptom: "Booking meeting rooms across centres is all phone calls",
        cause: "There's no shared availability.",
        steps: [
          "List spaces with live availability",
          "Book and pay online",
          "Pay operators automatically",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Gurugram?",
        answer: "No. Our offices are in Lucknow and Mumbai. Gurugram projects run over WhatsApp, video calls and email.",
      },
      {
        question: "Can you meet enterprise security requirements?",
        answer: "We build features such as SSO, audit logs and role-based access, and document them. Certification is up to your organisation.",
      },
      {
        question: "Do you sign NDAs and MSAs?",
        answer: "Yes, before work starts.",
      },
      {
        question: "How do you quote?",
        answer: "We listen first, then send a fixed written quote, usually within twenty-four working hours.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development in Gurugram — Sites for Consultancies & Professional Firms",
      metaDescription:
        "Website development in Gurugram for consultancies and professional firms: credible sites with expertise, case studies and insights for corporate buyers.",
      h1: "Website development for Gurugram consultancies selling to corporate buyers",
      card: "Credible consultancy sites with expertise, case studies and insights.",
      intro: [
        "Gurugram's consultancies, advisory firms and professional services companies sell to CXOs and procurement teams who check a firm's website before taking a meeting. A generic site with stock images and vague service lists signals a small or unproven firm.",
        "We build websites that present expertise by industry and problem, introduce partners properly and publish insights and case studies that prove the firm's thinking.",
      ],
      sections: [
        {
          heading: "Expertise, organised the way buyers think",
          body: [
            "Pages by industry and by business problem, each linking to relevant case studies, insights and the partners who lead that work.",
          ],
        },
        {
          heading: "Thought leadership that's easy to publish",
          body: [
            "An insights section partners can publish to without a developer, structured for search and for sharing on LinkedIn.",
          ],
          links: [{ label: "What a website costs in India", href: "/website-development-cost-in-india/" }],
        },
      ],
      problems: [
        {
          symptom: "Prospects can't tell what we're best at",
          cause: "Services are listed without context.",
          steps: [
            "Organise by industry and problem",
            "Link case studies to each",
            "Introduce the partners leading them",
          ],
        },
        {
          symptom: "Partners never publish insights",
          cause: "Publishing is difficult.",
          steps: [
            "Build an easy insights CMS",
            "Draft from partner interviews",
            "Promote on LinkedIn",
          ],
        },
      ],
      checklist: [
        "Expertise is organised by industry or problem",
        "Case studies are current",
        "Partners have profiles",
        "Insights are published regularly",
      ],
      faqs: [
        {
          question: "Can you describe confidential engagements?",
          answer: "Yes, anonymised by industry and outcome, with your approval.",
        },
        {
          question: "How long does a consultancy site take?",
          answer: "Usually five to eight weeks.",
        },
      ],
      caseStudies: ["thegrafftee", "hcbengineering"],
    },
    "web-design": {
      metaTitle: "Web Design in Gurugram — Luxury Real Estate Project Websites",
      metaDescription:
        "Web design in Gurugram for luxury residential projects on Golf Course Road and beyond: design that sells lifestyle, with private viewings and RERA details.",
      h1: "Web design for Gurugram's luxury residential projects",
      card: "Luxury project sites that sell lifestyle and invite private viewings.",
      intro: [
        "Luxury apartments on Golf Course Road and Golf Course Extension are sold to buyers who expect a premium experience from the first click. Template project sites with brochure PDFs and pop-up forms feel at odds with the price.",
        "We design luxury project websites with restraint and quality, using architecture, materials, amenities and lifestyle, with discreet routes to a private viewing.",
      ],
      sections: [
        {
          heading: "Restraint signals luxury",
          body: [
            "Generous space, refined typography, large imagery and film, and no flashing pop-ups. Information about residences, specifications and amenities arrives when the visitor wants it.",
          ],
        },
        {
          heading: "Private viewings",
          body: [
            "Instead of aggressive lead forms, invitations to private viewings and personal consultations, with RERA details displayed as required.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our luxury project site feels like a mid-market one",
          cause: "Template design and aggressive pop-ups.",
          steps: [
            "Redesign with premium typography and space",
            "Remove pop-ups",
            "Use film and architectural photography",
          ],
        },
        {
          symptom: "High-net-worth buyers don't leave details",
          cause: "Forms feel like sales traps.",
          steps: [
            "Offer private viewing requests",
            "Ask only what's needed",
            "Respond personally",
          ],
        },
      ],
      checklist: [
        "No intrusive pop-ups",
        "RERA details are displayed",
        "Private viewings can be requested",
        "Film and imagery load quickly",
      ],
      faqs: [
        {
          question: "Can you integrate our CRM?",
          answer: "Yes, enquiries can go straight to your sales CRM.",
        },
        {
          question: "Can the site support NRI buyers?",
          answer: "Yes, with time-zone-friendly booking and international contact options.",
        },
      ],
      caseStudies: ["saurally"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce Development in Gurugram — Corporate Gifting Stores",
      metaDescription:
        "Ecommerce in Gurugram for corporate gifting companies: B2B stores with bulk orders, logo branding, recipient lists, multi-address delivery and GST invoices.",
      h1: "Ecommerce for Gurugram's corporate gifting companies",
      card: "B2B gifting stores with branding, recipient lists and GST invoices.",
      intro: [
        "Gurugram's corporates buy gifts constantly: Diwali hampers, onboarding kits, client gifts, event giveaways. Gifting companies handle those orders through emails, spreadsheets and mockups, and every order becomes weeks of back-and-forth.",
        "We build B2B gifting stores where HR and admin teams choose products, upload logos, approve mockups, upload recipient lists and pay or receive GST invoices, all online.",
      ],
      sections: [
        {
          heading: "Ordering the way corporates buy",
          body: [
            "Catalogues with corporate pricing tiers, logo upload and mockup approval, quantity breaks, recipient lists for delivery to many addresses, and purchase order support.",
          ],
        },
        {
          heading: "Delivery to everyone",
          body: [
            "Multi-address delivery across India with tracking per recipient, and status reports HR can share internally.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Every corporate order needs ten emails",
          cause: "Products, branding and addresses are handled manually.",
          steps: [
            "Let clients choose and brand products online",
            "Approve mockups in the store",
            "Upload recipient lists",
          ],
        },
        {
          symptom: "Clients ask where each gift is",
          cause: "There's no tracking per recipient.",
          steps: [
            "Track each shipment",
            "Share a status dashboard",
            "Notify recipients",
          ],
        },
      ],
      checklist: [
        "Clients can brand products online",
        "Mockups are approved in the store",
        "Recipient lists can be uploaded",
        "GST invoices are generated",
      ],
      faqs: [
        {
          question: "Can clients pay on credit?",
          answer: "Yes, with approved accounts and terms.",
        },
        {
          question: "Can we also sell to individuals?",
          answer: "Yes, with a separate retail section.",
        },
      ],
      caseStudies: ["clickngreet"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development in Gurugram — Premium Beauty & Wellness Brands",
      metaDescription:
        "Shopify developers in Gurugram for premium beauty, skincare and wellness brands: elegant stores, ingredient-led product pages, subscriptions and loyalty.",
      h1: "Shopify development for Gurugram's premium beauty and wellness brands",
      card: "Elegant stores for beauty and wellness, with subscriptions.",
      intro: [
        "Gurugram is home to many premium beauty, skincare and wellness brands. Their customers research ingredients, read reviews and expect a store that feels as considered as the product.",
        "We set up Shopify stores with elegant design, ingredient-led product pages, routines, subscriptions and loyalty, set up for Indian payments and shipping.",
      ],
      sections: [
        {
          heading: "Ingredients and routines",
          body: [
            "Product pages that explain key ingredients, who the product suits and how to use it, plus routines that bundle products sensibly.",
          ],
        },
        {
          heading: "Claims kept careful",
          body: [
            "Cosmetic and wellness claims are regulated, so product copy stays within what you can substantiate, and your team approves everything.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers buy one product and stop",
          cause: "No routines or replenishment reminders.",
          steps: [
            "Bundle products into routines",
            "Send replenishment reminders",
            "Offer subscriptions",
          ],
        },
        {
          symptom: "Our store doesn't feel premium",
          cause: "Default theme and stock layouts.",
          steps: [
            "Customise the theme to your brand",
            "Use editorial photography",
            "Simplify product pages",
          ],
        },
      ],
      checklist: [
        "Products explain ingredients and use",
        "Routines are offered as bundles",
        "Replenishment reminders are set",
        "Claims are approved by your team",
      ],
      faqs: [
        {
          question: "Can we sell on Nykaa too?",
          answer: "Yes, alongside your own store.",
        },
        {
          question: "Do you set up loyalty programmes?",
          answer: "Yes, with an app suited to your brand.",
        },
      ],
      caseStudies: ["vashtaraheaven", "mahhika"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development in Gurugram — Workspace & Meeting Room Booking",
      metaDescription:
        "Marketplace development in Gurugram for flexible workspace: desks and meeting rooms across operators, with live availability, booking and payouts.",
      h1: "Marketplace development for Gurugram's flexible workspace market",
      card: "Workspace and meeting room booking across operators.",
      intro: [
        "Gurugram has one of India's largest flexible workspace markets, with coworking centres and business centres across Cyber City, Golf Course Road and Sohna Road. Companies need day passes, meeting rooms and team spaces at short notice, and booking still often means calling each centre.",
        "We build workspace marketplaces with live availability across operators, instant booking, corporate accounts and automatic payouts.",
      ],
      sections: [
        {
          heading: "Live availability",
          body: [
            "Operators manage spaces and calendars, or connect their existing booking systems, so customers book only what's actually free.",
          ],
        },
        {
          heading: "Corporate accounts",
          body: [
            "Companies get accounts with budgets, approvals and monthly GST invoices, so teams can book without expense claims.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers book rooms that turn out to be taken",
          cause: "Availability isn't synced.",
          steps: [
            "Connect operators' calendars",
            "Hold bookings on payment",
            "Confirm instantly",
          ],
        },
        {
          symptom: "Corporate clients want one monthly invoice",
          cause: "Each booking is billed separately.",
          steps: [
            "Create corporate accounts",
            "Consolidate monthly invoices",
            "Add approval rules",
          ],
        },
      ],
      checklist: [
        "Availability is live",
        "Corporate accounts are supported",
        "Operators are paid automatically",
        "Invoices are GST-compliant",
      ],
      faqs: [
        {
          question: "How long does a first version take?",
          answer: "Usually ten to fourteen weeks.",
        },
        {
          question: "Can operators use their own systems?",
          answer: "Where they have APIs, yes.",
        },
      ],
      caseStudies: ["maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development in Gurugram — Enterprise-Ready SaaS Features",
      metaDescription:
        "Next.js development in Gurugram for SaaS startups selling to enterprises: SSO, role-based access, audit logs, admin consoles and security documentation.",
      h1: "Next.js development for Gurugram SaaS startups moving upmarket",
      card: "SSO, audit logs and admin consoles for enterprise deals.",
      intro: [
        "Many Gurugram SaaS startups start with small customers, then land their first large enterprise prospect, which asks for SSO, granular permissions, audit logs and a security questionnaire. Deals stall while engineering scrambles.",
        "We build enterprise-ready features in Next.js: SSO with SAML or OIDC, role-based access, audit logs, admin consoles and the documentation enterprise buyers ask for.",
      ],
      sections: [
        {
          heading: "Enterprise features",
          body: [
            "Single sign-on with corporate identity providers, roles and permissions customers can manage, audit logs they can export, and admin consoles for their IT teams.",
          ],
        },
        {
          heading: "Answers for security reviews",
          body: [
            "Clear documentation of authentication, data handling, encryption and logging, so your team can answer questionnaires quickly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Enterprise deals stall on SSO",
          cause: "The product only supports email login.",
          steps: [
            "Add SAML and OIDC SSO",
            "Support common identity providers",
            "Test with the prospect's IT team",
          ],
        },
        {
          symptom: "Customers want to control user permissions",
          cause: "Roles are hard-coded.",
          steps: [
            "Design a flexible role model",
            "Build an admin console",
            "Log every change",
          ],
        },
      ],
      checklist: [
        "SSO is supported",
        "Customers can manage roles",
        "Audit logs are exportable",
        "Security documentation is ready",
      ],
      faqs: [
        {
          question: "Can you work in our codebase?",
          answer: "Yes, following your conventions and review process.",
        },
        {
          question: "Which identity providers do you support?",
          answer: "Common ones like Okta, Azure AD and Google Workspace.",
        },
      ],
      caseStudies: ["maribiz-ai", "nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development in Gurugram — Apps for Car Dealerships & Service Centres",
      metaDescription:
        "Android apps in Gurugram and Manesar for car dealerships and service centres: service booking, job status, estimates and approvals sent to customers' phones.",
      h1: "Android apps for Gurugram car dealerships and service centres",
      card: "Service booking, job status and estimate approvals for workshops.",
      intro: [
        "Car owners in Gurugram are busy and expect updates. When a vehicle is in for service, they call repeatedly to ask about status, extra work and pickup time. Service advisors spend hours on calls and estimates are approved verbally.",
        "We build native Android apps for service advisors and customers: booking, job status, photo-based estimates, digital approvals and pickup notifications.",
      ],
      sections: [
        {
          heading: "Approvals with photos",
          body: [
            "When advisors find extra work, they send photos and an estimate to the customer's phone. The customer approves in a tap, with a record for both sides.",
          ],
        },
        {
          heading: "Status without calls",
          body: [
            "Customers see each stage, from received to washing to ready, and get notified when the car is ready. Advisors take fewer calls.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers dispute extra charges",
          cause: "Extra work is approved verbally.",
          steps: [
            "Send photo-based estimates",
            "Record digital approvals",
            "Attach them to the invoice",
          ],
        },
        {
          symptom: "Advisors spend hours on status calls",
          cause: "Customers can't see progress.",
          steps: [
            "Share job status in the app",
            "Notify at key stages",
            "Send pickup alerts",
          ],
        },
      ],
      checklist: [
        "Extra work is approved digitally",
        "Customers see job status",
        "Pickup notifications are sent",
        "Service history is stored",
      ],
      faqs: [
        {
          question: "Can it connect to our DMS?",
          answer: "Where your dealer management system allows integration, yes.",
        },
        {
          question: "Do customers need to install an app?",
          answer: "Not necessarily; updates can come by WhatsApp links.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Company in Gurugram — B2B & Professional Services SEO",
      metaDescription:
        "SEO in Gurugram for consultancies, law firms, SaaS and B2B companies: thought leadership, service pages and technical SEO that bring decision-makers.",
      h1: "SEO for Gurugram's B2B and professional services firms",
      card: "B2B SEO that brings decision-makers, not just traffic.",
      intro: [
        "For Gurugram consultancies, law firms, SaaS companies and B2B service providers, SEO isn't about volume. It's about being found by the few decision-makers searching for exactly what you do, and impressing them when they arrive.",
        "We build B2B SEO around specific services, industries and problems, with thought leadership that ranks and gets cited by AI assistants.",
      ],
      sections: [
        {
          heading: "Specific beats broad",
          body: [
            "\"Transfer pricing advisory for SaaS companies\" brings a qualified buyer; \"consulting firm Gurgaon\" brings everyone. We target the specific searches your best clients make.",
          ],
        },
        {
          heading: "Content that earns trust",
          body: [
            "Insights written with your experts, with named authors, dates and sources, so search engines and AI assistants treat them as credible.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our traffic doesn't bring clients",
          cause: "Content targets broad topics.",
          steps: [
            "Target specific service searches",
            "Create problem-led pages",
            "Track enquiries, not traffic",
          ],
        },
        {
          symptom: "Competitors are cited by AI assistants, we aren't",
          cause: "Our expertise isn't published clearly.",
          steps: [
            "Publish clear expert content",
            "Name authors with credentials",
            "Update it regularly",
          ],
        },
      ],
      checklist: [
        "Each service has a specific page",
        "Insights have named expert authors",
        "Enquiries from search are tracked",
        "Technical SEO is clean",
      ],
      faqs: [
        {
          question: "Can law firms do SEO in India?",
          answer: "Bar Council rules restrict advertising by advocates. Informational content is generally fine, but take advice on your specific case.",
        },
        {
          question: "How long does B2B SEO take?",
          answer: "Three to six months to see consistent enquiries.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads in Gurugram — Premium Clinic Campaigns",
      metaDescription:
        "Google Ads in Gurugram for premium dermatology, dental and fertility clinics: treatment-specific campaigns within healthcare policies, tracked to consultations.",
      h1: "Google Ads for Gurugram's premium clinics",
      card: "Treatment-specific campaigns tracked to consultations.",
      intro: [
        "Gurugram has many premium clinics, including dermatology, aesthetics, dental, physiotherapy and fertility, competing for the same affluent patients. Generic discount ads bring price shoppers; premium clinics need patients who value expertise.",
        "We run treatment-specific campaigns that lead with doctors' expertise, target the right localities and track booked consultations, within Google's healthcare policies.",
      ],
      sections: [
        {
          heading: "Expertise over discounts",
          body: [
            "Ads and pages for specific treatments, led by doctors' qualifications and approach, without exaggerated claims or before-and-after promises that breach medical advertising norms.",
          ],
        },
        {
          heading: "Consultations, tracked",
          body: [
            "Online bookings, calls and WhatsApp consultations tracked as conversions, so you see cost per consultation by treatment.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our ads attract bargain hunters",
          cause: "Ads lead with discounts.",
          steps: [
            "Lead with doctors and expertise",
            "Target premium localities",
            "Remove discount-led copy",
          ],
        },
        {
          symptom: "Some ads were disapproved",
          cause: "Healthcare policy issues.",
          steps: [
            "Review against Google's healthcare policies",
            "Remove restricted claims",
            "Resubmit compliant ads",
          ],
        },
      ],
      checklist: [
        "Each treatment has its own campaign and page",
        "Ads follow healthcare policies",
        "Consultations are tracked",
        "Targeting matches your patients' localities",
      ],
      faqs: [
        {
          question: "Can we show before-and-after photos?",
          answer: "Platform and medical rules restrict them. We'll advise on what's allowed.",
        },
        {
          question: "Do you run Meta ads for clinics?",
          answer: "Yes, within Meta's health policies.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing in Gurugram — Employer Branding on LinkedIn",
      metaDescription:
        "Social media marketing in Gurugram for startups and corporates: employer branding and founder content on LinkedIn that attracts talent and builds credibility.",
      h1: "Social media for Gurugram companies competing for talent",
      card: "Employer branding and founder content on LinkedIn.",
      intro: [
        "Gurugram companies compete hard for engineers, product managers and sales talent. Candidates research employers on LinkedIn and Glassdoor before applying, and a quiet company page with occasional job posts loses them to competitors with a visible culture.",
        "We build employer branding and founder content on LinkedIn: real stories about teams, work and leaders, posted consistently.",
      ],
      sections: [
        {
          heading: "Show the work and the people",
          body: [
            "Team spotlights, projects shipped, how decisions are made and what a typical week looks like, drafted from short interviews and approved by your team.",
          ],
        },
        {
          heading: "Founders and leaders",
          body: [
            "Founders' and leaders' perspectives in their own voice, which build credibility with candidates, customers and investors alike.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Candidates don't know what it's like to work here",
          cause: "Our page only posts jobs.",
          steps: [
            "Share team and project stories",
            "Feature employees in their words",
            "Post consistently",
          ],
        },
        {
          symptom: "Our founder is invisible on LinkedIn",
          cause: "No time to write.",
          steps: [
            "Interview the founder monthly",
            "Draft posts in their voice",
            "Schedule after approval",
          ],
        },
      ],
      checklist: [
        "Your page posts beyond job ads",
        "Employees are featured",
        "Founders post regularly",
        "Applications from LinkedIn are tracked",
      ],
      faqs: [
        {
          question: "Do employees need to agree to be featured?",
          answer: "Yes, always.",
        },
        {
          question: "Do you run LinkedIn ads?",
          answer: "Yes, for hiring campaigns where it makes sense.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation in Gurugram — Sales Ops Automation for Startups",
      metaDescription:
        "AI automation in Gurugram for sales teams: call summaries into the CRM, drafted follow-ups, deal risk alerts and meeting prep, with reps in control.",
      h1: "AI automation for Gurugram sales teams drowning in admin",
      card: "Call summaries, follow-up drafts and deal alerts for sales teams.",
      intro: [
        "Sales reps in Gurugram startups spend a large share of their week on admin: updating the CRM, writing follow-ups, preparing for meetings and chasing internal approvals. CRM data is incomplete, and managers can't see which deals are at risk.",
        "We build AI automation that summarises calls into the CRM, drafts follow-ups, prepares meeting briefs and flags stalled deals, with reps reviewing everything that goes to customers.",
      ],
      sections: [
        {
          heading: "The CRM updates itself",
          body: [
            "Call and meeting recordings are summarised with next steps, objections and stakeholders, and added to the right deal automatically.",
          ],
        },
        {
          heading: "Managers see risk early",
          body: [
            "Deals without activity, missing stakeholders or slipping dates are flagged, so managers coach before it's too late.",
          ],
        },
      ],
      problems: [
        {
          symptom: "CRM data is always incomplete",
          cause: "Reps don't have time to update it.",
          steps: [
            "Summarise calls into the CRM",
            "Extract next steps",
            "Prompt reps to confirm",
          ],
        },
        {
          symptom: "Follow-ups go out late",
          cause: "Writing them takes time.",
          steps: [
            "Draft follow-ups after each call",
            "Let reps edit and send",
            "Track follow-up times",
          ],
        },
      ],
      checklist: [
        "Call notes reach the CRM automatically",
        "Follow-ups are drafted for reps",
        "Stalled deals are flagged",
        "Reps review all customer-facing text",
      ],
      faqs: [
        {
          question: "Which CRMs do you support?",
          answer: "HubSpot, Salesforce, Zoho and others with APIs.",
        },
        {
          question: "Is call data secure?",
          answer: "We use providers that don't train on your data and follow your retention rules.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software in Gurugram — Guest Management for Corporate Events & MICE",
      metaDescription:
        "Custom software in Gurugram for event and MICE companies: RSVPs, travel, rooming lists, agendas and on-site check-in for corporate offsites and conferences.",
      h1: "Custom software for Gurugram's corporate event and MICE companies",
      card: "RSVPs, travel, rooming lists and check-in for corporate events.",
      intro: [
        "Gurugram's event and MICE companies run offsites, conferences and incentive trips for large corporates. Every event means hundreds of RSVPs, flight details, rooming lists, dietary needs and agenda changes, usually juggled in spreadsheets.",
        "We build guest management systems that handle RSVPs, travel, rooming, agendas and on-site check-in, with client dashboards.",
      ],
      sections: [
        {
          heading: "One record per guest",
          body: [
            "Registration, travel, accommodation, dietary needs, sessions and check-in status, collected through forms and updated as plans change.",
          ],
        },
        {
          heading: "Clients see progress",
          body: [
            "Client dashboards show RSVPs, travel status and attendance, so the HR team stops emailing for updates.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Rooming lists are wrong at check-in",
          cause: "Changes don't reach the master spreadsheet.",
          steps: [
            "Collect guest details in one system",
            "Generate rooming lists automatically",
            "Share updates with hotels",
          ],
        },
        {
          symptom: "Clients constantly ask for RSVP counts",
          cause: "There's no shared view.",
          steps: [
            "Give clients a dashboard",
            "Update in real time",
            "Send daily summaries",
          ],
        },
      ],
      checklist: [
        "Guests register through forms",
        "Rooming lists generate automatically",
        "Clients have a live dashboard",
        "On-site check-in is digital",
      ],
      faqs: [
        {
          question: "Can guests get updates on WhatsApp?",
          answer: "Yes, for agendas, travel and reminders.",
        },
        {
          question: "Can we reuse it for every event?",
          answer: "Yes, it's built for repeated events and clients.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "api-integration": {
      metaTitle: "API Integration in Gurugram — Salesforce, HubSpot, Slack & Billing",
      metaDescription:
        "API integration in Gurugram: connect Salesforce or HubSpot with billing, Slack, product data and support so revenue teams work from one picture.",
      h1: "API integration for Gurugram revenue teams working across too many tools",
      card: "Connect CRM, billing, Slack, product data and support.",
      intro: [
        "Revenue teams at Gurugram startups use a CRM, a billing system, Slack, a support desk and product analytics. When they aren't connected, reps miss renewals, finance chases data and leadership argues over whose numbers are right.",
        "We connect them so deals, invoices, product usage and support history appear where each team works.",
      ],
      sections: [
        {
          heading: "One picture of each account",
          body: [
            "Billing status, product usage and open tickets shown on the CRM account, so reps and success managers walk into every call informed.",
          ],
        },
        {
          heading: "Alerts in Slack",
          body: [
            "Deals won, payments failed, usage dropped or renewals coming up, posted to the right Slack channel automatically.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Reps don't know a customer has unpaid invoices",
          cause: "Billing and CRM aren't connected.",
          steps: [
            "Sync billing status to the CRM",
            "Alert account owners",
            "Show it on account pages",
          ],
        },
        {
          symptom: "Renewals are missed",
          cause: "Renewal dates live in contracts.",
          steps: [
            "Store renewal dates in the CRM",
            "Alert owners in Slack ahead of time",
            "Track renewal outcomes",
          ],
        },
      ],
      checklist: [
        "Billing status appears in the CRM",
        "Product usage is visible on accounts",
        "Key events post to Slack",
        "Renewals have reminders",
      ],
      faqs: [
        {
          question: "Do you work with Salesforce?",
          answer: "Yes, and HubSpot, Zoho and others.",
        },
        {
          question: "Can we use a tool like Zapier?",
          answer: "For simple flows, yes; for critical ones, custom integrations are more reliable.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions in Gurugram — High Availability for Consumer Apps",
      metaDescription:
        "Cloud services in Gurugram for consumer apps: autoscaling, multi-zone resilience, load testing before sales and incident monitoring on AWS or GCP.",
      h1: "Cloud infrastructure for Gurugram consumer apps that can't go down",
      card: "Autoscaling, resilience and load testing for consumer apps.",
      intro: [
        "Gurugram is home to travel, mobility, food and consumer apps that see huge spikes during sales, holidays and campaigns. An outage on a big day costs revenue and trust that take months to rebuild.",
        "We design cloud infrastructure for high availability, with autoscaling, multi-zone resilience, load testing before big events and monitoring that catches problems before users do.",
      ],
      sections: [
        {
          heading: "Ready for the spike",
          body: [
            "We load-test against expected peaks, tune autoscaling and caching, and review database capacity before every major campaign.",
          ],
        },
        {
          heading: "Resilient by design",
          body: [
            "Services spread across availability zones, health checks, automated failover and backups tested regularly.",
          ],
        },
      ],
      problems: [
        {
          symptom: "The app slows down during sales",
          cause: "Capacity isn't tested before peaks.",
          steps: [
            "Load-test before campaigns",
            "Tune autoscaling",
            "Cache heavy reads",
          ],
        },
        {
          symptom: "Users report outages before we notice",
          cause: "Monitoring is weak.",
          steps: [
            "Add monitoring and alerts",
            "Track key user journeys",
            "Write incident runbooks",
          ],
        },
      ],
      checklist: [
        "Load tests run before big campaigns",
        "Services span availability zones",
        "Alerts catch problems early",
        "Runbooks exist for incidents",
      ],
      faqs: [
        {
          question: "Do you provide 24/7 on-call?",
          answer: "No. We set up monitoring and runbooks and help you plan on-call coverage.",
        },
        {
          question: "AWS or GCP?",
          answer: "Whichever fits your stack and team.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance in Gurugram — Restaurant Groups & Multi-Outlet Brands",
      metaDescription:
        "Website maintenance in Gurugram for restaurant groups and multi-outlet brands: menus, outlets, timings and offers kept current, plus security and backups.",
      h1: "Website maintenance for Gurugram brands with many outlets",
      card: "Menus, outlets, timings and offers kept current across locations.",
      intro: [
        "Gurugram's restaurant groups, salons and retail brands often run several outlets across CyberHub, Sector 29, Golf Course Road and malls. Menus, timings, outlets and offers change constantly, and a website that falls behind sends customers to closed outlets with old menus.",
        "Our maintenance plans keep multi-outlet sites current, alongside updates, security, backups and monitoring.",
      ],
      sections: [
        {
          heading: "Every outlet accurate",
          body: [
            "Outlet details, menus, timings and offers updated within one working day, with Google Business Profiles kept in sync.",
          ],
        },
        {
          heading: "Upkeep in the background",
          body: [
            "Updates, monitoring for security issues, daily off-site backups and outage alerts.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers visit outlets that have closed",
          cause: "The outlet list isn't updated.",
          steps: [
            "Review outlets monthly",
            "Update the site and Google profiles together",
            "Redirect closed outlet pages",
          ],
        },
        {
          symptom: "Menus differ between outlets and the site",
          cause: "Menus are updated separately.",
          steps: [
            "Manage menus centrally",
            "Publish per outlet",
            "Check after each change",
          ],
        },
      ],
      checklist: [
        "Every outlet's details are current",
        "Menus match each outlet",
        "Google profiles match the site",
        "Backups run daily",
      ],
      faqs: [
        {
          question: "Can you manage our Google profiles too?",
          answer: "Yes, with access, for each outlet.",
        },
        {
          question: "How fast are changes made?",
          answer: "Within one working day.",
        },
      ],
    },
  },
}
