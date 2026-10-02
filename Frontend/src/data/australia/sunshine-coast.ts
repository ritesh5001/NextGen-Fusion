import type { AuCity } from "./types"
import { AEST } from "./zones"

export const sunshineCoast: AuCity = {
  slug: "sunshine-coast",
  name: "Sunshine Coast",
  state: "Queensland",
  stateCode: "QLD",
  summary: "One of the fastest-growing regions in the country, full of owner-run businesses scaling up quickly.",
  zone: { std: AEST },
  areas: ["Maroochydore", "Mooloolaba", "Noosa", "Noosaville", "Caloundra", "Buderim", "Nambour", "Kawana", "Sippy Downs", "Coolum Beach", "Peregian Beach", "Birtinya", "Maleny", "Aura"],
  nearby: ["brisbane", "gold-coast", "newcastle"],
  page: {
    metaTitle: "Websites, SEO & Marketing for Sunshine Coast Businesses",
    metaDescription:
      "Websites, local SEO, online stores and automation for Sunshine Coast businesses growing with the region, from Noosa to Caloundra and the hinterland.",
    h1: "Helping Sunshine Coast businesses grow as fast as the region",
    intro: [
      "The Sunshine Coast has been one of the fastest-growing regions in Australia. People have moved up from the southern capitals and brought businesses, remote jobs and new expectations with them. Construction, health care, tourism, food and a large number of owner-run businesses make up the economy.",
      "Many of those businesses started on word of mouth and a basic website. As the population grows, newcomers don't know who has the good reputation, so they search. We help Sunshine Coast businesses be the name they find. We work remotely from India, with no office on the Coast.",
    ],
    sections: [
      {
        heading: "Word of mouth doesn't reach new arrivals",
        body: [
          "A business that's been the go-to in Buderim for fifteen years is invisible to a family who moved into Aura last month. They have no neighbours to ask yet. They search Google, scroll local Facebook groups and check reviews.",
          "The businesses winning those newcomers aren't always the best ones. They're the ones with complete Google profiles, recent reviews, clear websites and quick replies. That's all fixable.",
        ],
      },
      {
        heading: "Hours that suit the Coast",
        body: [
          "Queensland has no daylight saving, so our hours stay 14:30 to 23:30 Sunshine Coast time, Monday to Saturday, all year.",
        ],
      },
    ],
    industries: [
      { name: "Construction and trades", need: "Builders and trades need to show up in local search as new suburbs and estates fill." },
      { name: "Health and wellness", need: "Clinics, allied health and wellness studios need online booking and steady reviews." },
      { name: "Tourism and short-stay accommodation", need: "Noosa and Mooloolaba operators and holiday rental managers need direct bookings and smooth turnovers." },
      { name: "Food and lifestyle brands", need: "Hinterland producers and local brands need online stores that sell beyond the region." },
    ],
    problems: [
      {
        service: "seo",
        symptom: "New residents don't know we exist",
        cause: "They search instead of asking neighbours, and our Google profile is thin.",
        steps: [
          "Complete your Google Business Profile in full",
          "Build a steady flow of recent reviews",
          "Add pages for the new suburbs and estates you serve",
        ],
      },
      {
        service: "ai-automation",
        symptom: "We miss calls while we're with customers",
        cause: "Small teams can't answer the phone mid-job, and callers ring the next business.",
        steps: [
          "Text missed callers back instantly with a booking link",
          "Answer common questions automatically",
          "Pass urgent enquiries to you with a summary",
        ],
      },
      {
        service: "api-integration",
        symptom: "Holiday rental turnovers are coordinated by text message",
        cause: "Bookings, cleaners and linen are tracked in different places.",
        steps: [
          "Connect bookings to a cleaning schedule automatically",
          "Notify cleaners of each turnover",
          "Confirm completion with photos",
        ],
      },
      {
        service: "ecommerce-development",
        symptom: "Our hinterland products only sell at markets",
        cause: "There's no online store, or it's too hard to find and use.",
        steps: [
          "Launch a simple store with your best sellers",
          "Put the store link on every jar, bag and receipt",
          "Ship to Brisbane and beyond at fair rates",
        ],
      },
      {
        service: "website-development",
        symptom: "We moved here, started a business and still have a placeholder website",
        cause: "Getting the business running left no time for a proper site.",
        steps: [
          "Agree what the site has to do in one short brief",
          "Build a focused site around your main services",
          "Connect bookings or enquiries from day one",
        ],
      },
      {
        service: "social-media-marketing",
        symptom: "Locals love us, but our social media doesn't show it",
        cause: "Posts are irregular and don't reflect the community around the business.",
        steps: [
          "Plan a simple monthly content calendar",
          "Feature customers, staff and local events",
          "Boost the best posts to nearby suburbs",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you have an office on the Sunshine Coast?",
        answer: "No. We work from Lucknow and Mumbai, India, with Coast businesses over video calls, WhatsApp and email.",
      },
      {
        question: "What hours are you available?",
        answer: "14:30 to 23:30 Sunshine Coast time, Monday to Saturday, all year.",
      },
      {
        question: "Do you work with businesses in Noosa and the hinterland?",
        answer: "Yes, from Noosa and Peregian to Caloundra, Maleny and Nambour.",
      },
      {
        question: "We're a small team. Is this affordable?",
        answer: "We scope each project to what you need right now and give a fixed price. Often the most valuable work, like fixing your Google profile, is the smallest.",
      },
    ],
  },
  services: {
    "website-development": {
      metaTitle: "Website Development on the Sunshine Coast — For New & Growing Businesses",
      metaDescription:
        "Website development for Sunshine Coast businesses started by sea-changers and locals: focused sites with bookings and enquiries built in, launched quickly.",
      h1: "Website development for Sunshine Coast businesses ready to replace the placeholder",
      card: "Focused first websites for new and growing Coast businesses.",
      intro: [
        "Many Sunshine Coast businesses were started by people who moved up from Sydney or Melbourne, or by locals going out on their own. In the rush of getting going, the website stayed a placeholder: a single page, a template or a social profile.",
        "We build focused websites for those businesses: clear about what you do and who you help, with bookings or enquiries built in, launched in weeks rather than months.",
      ],
      sections: [
        {
          heading: "Start focused",
          body: [
            "Your first proper website doesn't need forty pages. It needs a clear homepage, a page for each main service, an about page that shows real people, and a simple way to book or enquire. We add more as the business grows.",
          ],
        },
        {
          heading: "Built to grow with you",
          body: [
            "We build on a platform you can edit yourself and that can grow into more pages, online booking or a store later, without starting again.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website is a single page that says almost nothing",
          cause: "It was set up quickly to have something online.",
          steps: [
            "Write a short brief of what customers need to know",
            "Build pages for each main service",
            "Add booking or enquiry forms",
          ],
        },
        {
          symptom: "We send people to our Instagram because the website is so thin",
          cause: "Social profiles feel more complete than the site.",
          steps: [
            "Build a site that can stand on its own",
            "Show your Instagram content on it",
            "Make the site the place bookings happen",
          ],
        },
      ],
      checklist: [
        "Each main service has its own page",
        "Visitors can book or enquire from any page",
        "Your about page shows real people",
        "You can edit the site yourself",
      ],
      faqs: [
        {
          question: "How quickly can we launch?",
          answer: "A focused business site often launches in three to four weeks, if content and photos are ready.",
        },
        {
          question: "Can we add online booking later?",
          answer: "Yes. We build so booking, a store or more pages can be added without a rebuild.",
        },
      ],
      caseStudies: ["ladyscootytrainer", "saurally"],
    },
    "web-design": {
      metaTitle: "Web Design on the Sunshine Coast — Noosa-Style Boutique Design",
      metaDescription:
        "Web design for Noosa and Sunshine Coast boutique hospitality, retail and wellness: understated, premium design that matches your space and still converts.",
      h1: "Web design for Sunshine Coast boutiques that feel premium in person",
      card: "Understated, premium design for boutique hospitality and retail.",
      intro: [
        "From Hastings Street in Noosa to the hinterland villages, the Sunshine Coast has boutique stays, restaurants, shops and studios that feel special in person: considered interiors, natural materials, a calm and premium feel. Too many of their websites feel like generic templates.",
        "We design sites that carry the same feeling as your space, understated and premium, while keeping booking and buying simple.",
      ],
      sections: [
        {
          heading: "Restraint as a design choice",
          body: [
            "Generous space, natural photography, a limited palette and careful type. Premium design is often about what's left out. We design every page with that restraint while keeping the next step clear.",
          ],
        },
        {
          heading: "Photography that does the work",
          body: [
            "In boutique hospitality and retail, photography sells. We'll brief you on the shots each page needs and design around them so your space is shown at its best.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our website doesn't match the feel of our venue",
          cause: "It's built on a busy template with stock imagery.",
          steps: [
            "Design around your own photography",
            "Simplify layout and palette",
            "Keep booking clear and calm",
          ],
        },
        {
          symptom: "Premium guests book elsewhere",
          cause: "The site doesn't signal the quality of the experience.",
          steps: [
            "Lead with the experience, not the price",
            "Show details that set you apart",
            "Make booking feel effortless",
          ],
        },
      ],
      checklist: [
        "Your site uses your own photography",
        "The design feels like your space",
        "Booking or buying is simple",
        "The site loads fast despite large images",
      ],
      faqs: [
        {
          question: "Do you arrange photography?",
          answer: "We brief a local photographer or your team on exactly what's needed. We're remote, so we don't shoot it ourselves.",
        },
        {
          question: "Can you work with our booking system?",
          answer: "Yes. We design around it and embed it as cleanly as it allows.",
        },
      ],
      caseStudies: ["kalamohini"],
    },
    "ecommerce-development": {
      metaTitle: "Ecommerce on the Sunshine Coast — Hinterland Producers Selling Online",
      metaDescription:
        "Ecommerce for Sunshine Coast and hinterland producers: online stores for food, drink and handmade goods, with fair shipping to Brisbane and beyond.",
      h1: "Ecommerce for hinterland producers who only sell at markets",
      card: "Online stores for hinterland food, drink and handmade goods.",
      intro: [
        "The Sunshine Coast hinterland, around Maleny, Montville, Eumundi and beyond, is full of producers making food, drink, skincare and handmade goods. Most sell at markets, cafés and to visitors. Many have no online store, so customers who love them can't buy again once they've gone home.",
        "We build online stores for those producers: simple to run, honest about shipping and connected to markets and wholesale so stock stays straight.",
      ],
      sections: [
        {
          heading: "Simple to run",
          body: [
            "You're busy making things. The store should take minutes a week: orders arrive, labels print, stock updates. We set it up so a small team can run it without a developer.",
          ],
        },
        {
          heading: "Shipping food and fragile goods",
          body: [
            "Jars, bottles and perishables need careful packing and fair pricing. We set rates by weight and zone, offer local pickup, and limit perishables to areas you can reach in time.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Market customers ask if they can order online",
          cause: "There's no store yet.",
          steps: [
            "Launch with your best sellers",
            "Add a QR code to your stall and packaging",
            "Offer local pickup and delivery",
          ],
        },
        {
          symptom: "Shipping costs scare buyers away",
          cause: "Heavy jars and bottles cost a lot to send one at a time.",
          steps: [
            "Bundle products into sensible packs",
            "Set free shipping above a useful threshold",
            "Offer pickup on the Coast",
          ],
        },
      ],
      checklist: [
        "Customers can buy online after a market visit",
        "Your packaging links to your store",
        "Perishables only ship where they arrive in time",
        "Bundles make shipping worthwhile",
      ],
      faqs: [
        {
          question: "What about food labelling rules?",
          answer: "Those are yours to follow under food standards. We make sure product pages show the information you provide clearly.",
        },
        {
          question: "Can we sell wholesale too?",
          answer: "Yes, with trade pricing for approved cafés and retailers.",
        },
      ],
      caseStudies: ["krushidoctor", "clickngreet"],
    },
    "shopify-development": {
      metaTitle: "Shopify Development on the Sunshine Coast — Subscriptions for Lifestyle Brands",
      metaDescription:
        "Shopify developers for Sunshine Coast wellness and lifestyle brands: subscriptions, bundles and loyalty that turn one-off buyers into regular customers.",
      h1: "Shopify development for Sunshine Coast lifestyle brands built on repeat buyers",
      card: "Shopify subscriptions, bundles and loyalty for lifestyle brands.",
      intro: [
        "The Coast has produced plenty of wellness and lifestyle brands, such as skincare, supplements, coffee, swimwear and homewares, often founded by people who moved here for the lifestyle. Many sell products people use up and buy again.",
        "We build Shopify stores around that repeat behaviour: subscriptions, refill bundles, loyalty and the emails that keep customers coming back.",
      ],
      sections: [
        {
          heading: "Subscriptions done right",
          body: [
            "Customers choose a frequency, skip or swap when they need to and manage it themselves. Subscriptions that are easy to pause keep more customers than ones that are hard to cancel, and they're what Australian Consumer Law expects anyway.",
          ],
        },
        {
          heading: "Loyalty that feels local",
          body: [
            "Rewards, referral codes and early access to new releases. We keep programmes simple so customers understand them and your team can run them.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers buy once and forget us",
          cause: "There's no reminder when they're likely to run out.",
          steps: [
            "Offer subscriptions at checkout",
            "Send reorder reminders based on usage",
            "Reward repeat purchases",
          ],
        },
        {
          symptom: "Subscribers cancel because they can't change their order",
          cause: "The subscription is hard to pause or swap.",
          steps: [
            "Let customers skip, pause and swap",
            "Make changes self-service",
            "Ask why when they cancel",
          ],
        },
      ],
      checklist: [
        "Customers can subscribe at checkout",
        "Subscribers can skip or pause themselves",
        "Reorder reminders go out automatically",
        "Repeat customers are rewarded",
      ],
      faqs: [
        {
          question: "Which subscription app do you use?",
          answer: "It depends on your products and pricing. We recommend one during scoping and set it up properly.",
        },
        {
          question: "Can you migrate subscribers from another platform?",
          answer: "Usually, depending on your payment provider. We check before quoting.",
        },
      ],
      caseStudies: ["vashtaraheaven"],
    },
    "marketplace-development": {
      metaTitle: "Marketplace Development on the Sunshine Coast — Holiday Rental Services",
      metaDescription:
        "Marketplaces for the Sunshine Coast: connect holiday rental owners with cleaners, linen and maintenance, with scheduling and payments built in.",
      h1: "Marketplace development for the Sunshine Coast's holiday rental economy",
      card: "Platforms connecting rental owners with cleaners and trades.",
      intro: [
        "Noosa, Mooloolaba, Coolum and Caloundra have a large holiday rental market, and every booking needs a turnover: cleaning, linen, restocking and sometimes repairs, often on the same day. Owners and managers coordinate it by text message and phone.",
        "We build platforms that connect rental owners and managers with cleaners, linen services and trades, with scheduling from bookings, photo checklists and automatic payments.",
      ],
      sections: [
        {
          heading: "Turnovers from bookings",
          body: [
            "When a property is booked, the turnover job is created automatically for the check-out date. Available providers accept it, complete a photo checklist and get paid when the owner approves.",
          ],
        },
        {
          heading: "Trust on both sides",
          body: [
            "Providers are verified and rated. Owners see a photo record of every clean. Disputes are resolved with evidence, not memory.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Same-day turnovers are a scramble",
          cause: "Cleaners are booked by text after each booking arrives.",
          steps: [
            "Create turnover jobs from bookings automatically",
            "Offer them to available providers",
            "Confirm with photos when done",
          ],
        },
        {
          symptom: "Owners don't trust that cleans are done properly",
          cause: "There's no record of the work.",
          steps: [
            "Require a photo checklist for every clean",
            "Share it with the owner",
            "Rate providers after each job",
          ],
        },
      ],
      checklist: [
        "Turnovers are scheduled from bookings automatically",
        "Every clean has a photo record",
        "Providers are verified and rated",
        "Payments happen without manual transfers",
      ],
      faqs: [
        {
          question: "Can it connect to Airbnb and other booking platforms?",
          answer: "Through channel managers or calendar feeds, usually yes. We check the options during scoping.",
        },
        {
          question: "How long does a first version take?",
          answer: "Usually ten to fourteen weeks for scheduling, providers, checklists and payments.",
        },
      ],
      caseStudies: ["cleanship", "maribiz-ai"],
    },
    "nextjs-development": {
      metaTitle: "Next.js Development on the Sunshine Coast — For Remote-First Founders",
      metaDescription:
        "Next.js developers for Sunshine Coast founders building SaaS and digital products: an MVP you own, built by a team used to working remotely.",
      h1: "Next.js development for Sunshine Coast founders building from the beach",
      card: "SaaS products and MVPs for remote-first Coast founders.",
      intro: [
        "A lot of people moved to the Sunshine Coast with remote jobs, and some of them started companies: SaaS products, digital tools and online services built from a home office in Buderim or a co-working space in Maroochydore. Remote-first founders are used to working with remote teams.",
        "We build Next.js products for those founders, from first MVP to a product that can grow, with code you own and a way of working that suits a remote company.",
      ],
      sections: [
        {
          heading: "MVPs that don't need a rewrite",
          body: [
            "We build the smallest version that proves demand, but on foundations that can grow: Next.js, Postgres, proper authentication and a structure a future team can work in.",
          ],
        },
        {
          heading: "Remote by default",
          body: [
            "Written scopes, async updates, shared boards and short demo calls in your afternoon. If you already work remotely, we'll fit into how you work.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our MVP has hit the limits of no-code tools",
          cause: "Workarounds and costs grow as users increase.",
          steps: [
            "Map what the product does and where it breaks",
            "Rebuild the core in Next.js and Postgres",
            "Migrate users without downtime",
          ],
        },
        {
          symptom: "We need to show investors a working product",
          cause: "There's a deck, but no product.",
          steps: [
            "Agree the smallest product that proves the idea",
            "Build and launch it to real users",
            "Measure usage to back up the pitch",
          ],
        },
      ],
      checklist: [
        "Your product's code is in your company's repository",
        "Core flows have automated tests",
        "There's a staging environment",
        "You can see how users actually use the product",
      ],
      faqs: [
        {
          question: "How do you work with a founder day to day?",
          answer: "Through written updates, a shared task board and a weekly demo call in your afternoon.",
        },
        {
          question: "Do we own the code?",
          answer: "Yes, from day one, in your repository.",
        },
      ],
      caseStudies: ["nextmentor"],
    },
    "android-app-development": {
      metaTitle: "Android App Development on the Sunshine Coast — Home Services Field Apps",
      metaDescription:
        "Android apps for Sunshine Coast pool, pest, cleaning and home services teams: job lists, checklists, photos and customer sign-off on company devices.",
      h1: "Android apps for Sunshine Coast home services teams",
      card: "Job lists, checklists and sign-off apps for home services crews.",
      intro: [
        "Pool, pest control, cleaning, lawn and home maintenance businesses are busy on the Sunshine Coast, with new estates filling and holiday homes needing regular care. Crews run from house to house, and job records often end up as photos in a camera roll and notes in a group chat.",
        "We build native Android apps for company devices that give crews their job list, checklists and photo records, and send customer reports when the job's done.",
      ],
      sections: [
        {
          heading: "From job list to customer report",
          body: [
            "Crews see their day's jobs in order, follow the checklist for each one, take before-and-after photos, and the customer gets a report automatically. The office sees progress in real time.",
          ],
        },
        {
          heading: "Android for crews",
          body: [
            "Company Android phones keep the app simple and affordable to build and support. If crews use their own iPhones, we scope a React Native build separately; we don't do native iOS.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Customers ask what was done at their property",
          cause: "There's no report after each visit.",
          steps: [
            "Use a checklist for every job",
            "Take before-and-after photos",
            "Send the customer a report automatically",
          ],
        },
        {
          symptom: "The office doesn't know where crews are up to",
          cause: "Progress is reported by phone call.",
          steps: [
            "Mark jobs started and finished in the app",
            "Show progress on an office dashboard",
            "Alert customers when a crew is on the way",
          ],
        },
      ],
      checklist: [
        "Every job has a checklist",
        "Customers get a report after each visit",
        "The office sees job progress live",
        "Photos are stored with each job",
      ],
      faqs: [
        {
          question: "Couldn't we use an existing field service app?",
          answer: "Often, yes, and we'll say so if one fits. Custom suits businesses with unusual services or reporting.",
        },
        {
          question: "Can completed jobs flow into Xero or MYOB?",
          answer: "Yes, so completed jobs can become invoices automatically.",
        },
      ],
    },
    seo: {
      metaTitle: "SEO Services on the Sunshine Coast — Be Found by New Residents",
      metaDescription:
        "Local SEO for Sunshine Coast businesses: win the map pack in Maroochydore, Caloundra and Noosa, and reach new residents choosing local services for the first time.",
      h1: "SEO for Sunshine Coast businesses that new residents haven't heard of yet",
      card: "Local SEO aimed at new residents choosing services for the first time.",
      intro: [
        "New residents on the Sunshine Coast don't have a plumber, dentist, mechanic or builder yet, so they search. Ranking in the map pack for your service in Maroochydore, Caloundra or Noosa puts you in front of people at the exact moment they're choosing.",
        "We set up your Google profile, reviews and pages so you're the obvious choice for newcomers, alongside the locals who already know you.",
      ],
      sections: [
        {
          heading: "New estates, new customers",
          body: [
            "Growth areas like Aura, Palmview, Birtinya and Sippy Downs are full of first-time searchers. We make sure your service area covers them and that you have content and reviews relevant to those suburbs.",
          ],
        },
        {
          heading: "Reviews newcomers trust",
          body: [
            "Without neighbours to ask, newcomers lean heavily on reviews. A steady routine of asking happy customers, and replying to every review, makes a big difference.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We're not in the map pack in our own town",
          cause: "Competitors have fuller profiles and more recent reviews.",
          steps: [
            "Complete every section of your profile",
            "Ask every happy customer for a review",
            "Post photos and updates regularly",
          ],
        },
        {
          symptom: "Newer suburbs never find us",
          cause: "Our service area and site don't mention them.",
          steps: [
            "Add growth suburbs to your service area",
            "Add pages about work in those areas",
            "Collect reviews from customers there",
          ],
        },
      ],
      checklist: [
        "Your Google profile is fully complete",
        "You got a new review in the last month",
        "Your service area includes growth suburbs",
        "You reply to every review",
      ],
      faqs: [
        {
          question: "How long does local SEO take on the Coast?",
          answer: "Profile and review improvements often show within weeks. Ranking across several towns usually takes a few months.",
        },
        {
          question: "Should we be on Facebook community groups too?",
          answer: "Yes, where rules allow, and helpfully rather than salesy. Many newcomers ask for recommendations there.",
        },
      ],
      caseStudies: ["thegrafftee"],
    },
    "google-ads": {
      metaTitle: "Google Ads on the Sunshine Coast — New Patients for Clinics",
      metaDescription:
        "Google Ads for Sunshine Coast health and allied health clinics: campaigns that bring new patients from growth suburbs, with booking tracked end to end.",
      h1: "Google Ads for Sunshine Coast clinics looking for new patients",
      card: "Campaigns that bring new patients to clinics in growth suburbs.",
      intro: [
        "Physios, dentists, GPs, psychologists and other allied health practices on the Sunshine Coast have a steady supply of potential new patients: people who've just moved here and need a new provider. Many search for one on Google the week they arrive.",
        "We run Google Ads campaigns for clinics that reach those searchers, send them to pages that answer their questions and track bookings, within advertising rules for health services.",
      ],
      sections: [
        {
          heading: "Ads that follow health advertising rules",
          body: [
            "Health service advertising has rules: no testimonials for regulated services, no misleading claims and no creating unreasonable expectations. We write ads and landing pages within AHPRA's guidelines, and you approve every word.",
          ],
        },
        {
          heading: "Tracking to bookings",
          body: [
            "We track online bookings and calls from ads, so you see what each new patient cost, not just clicks.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Ads bring clicks but few bookings",
          cause: "Ads go to the homepage instead of a page for the service searched.",
          steps: [
            "Create a page for each main service",
            "Show availability and booking up front",
            "Track bookings as conversions",
          ],
        },
        {
          symptom: "We're unsure what we can say in health ads",
          cause: "Health advertising rules are strict.",
          steps: [
            "Review ads against AHPRA guidelines",
            "Avoid testimonials and outcome claims",
            "Approve all copy before it runs",
          ],
        },
      ],
      checklist: [
        "Each main service has its own landing page",
        "Bookings from ads are tracked",
        "Ad copy follows AHPRA's advertising guidelines",
        "Ads target the suburbs your patients come from",
      ],
      faqs: [
        {
          question: "Can we advertise to new residents specifically?",
          answer: "Not by targeting new residents directly, but we target growth suburbs and searches that newcomers make, like 'new GP Sippy Downs'.",
        },
        {
          question: "Who checks compliance?",
          answer: "We write within AHPRA's guidelines, but you're responsible for your advertising, so you approve every ad.",
        },
      ],
    },
    "social-media-marketing": {
      metaTitle: "Social Media Marketing on the Sunshine Coast — Local, Consistent, Real",
      metaDescription:
        "Social media for Sunshine Coast businesses: a simple monthly plan, community-focused posts and paid reach aimed at nearby suburbs and new arrivals.",
      h1: "Social media for Sunshine Coast businesses known through word of mouth",
      card: "A simple monthly plan, community posts and reach to nearby suburbs.",
      intro: [
        "Sunshine Coast businesses are often known locally through community groups, school networks and Instagram. That reputation is valuable, but it rarely reaches new arrivals unless you share it consistently.",
        "We turn what's already happening in your business into a simple monthly plan of posts, and use a small paid budget to reach nearby suburbs and people new to the area.",
      ],
      sections: [
        {
          heading: "A plan you can keep",
          body: [
            "One planning call a month, a short list of moments to capture, and we handle the editing, captions and scheduling. Consistency beats volume.",
          ],
        },
        {
          heading: "Community first",
          body: [
            "Local events, customer stories, staff and behind-the-scenes posts consistently perform best for Coast businesses. They also build the reputation newcomers check before they choose.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We post in bursts, then go quiet for months",
          cause: "Posting depends on spare time.",
          steps: [
            "Agree a simple monthly plan",
            "Batch content in quiet weeks",
            "Schedule posts in advance",
          ],
        },
        {
          symptom: "Our posts only reach existing followers",
          cause: "Organic reach is limited.",
          steps: [
            "Boost the best posts to nearby suburbs",
            "Target growth areas",
            "Track enquiries from social",
          ],
        },
      ],
      checklist: [
        "You posted at least weekly this month",
        "Your posts feature real customers or staff",
        "Your best posts are boosted locally",
        "Your bio links to booking or contact",
      ],
      faqs: [
        {
          question: "Which platforms matter most on the Coast?",
          answer: "Facebook and Instagram for most local businesses. TikTok can work for hospitality and lifestyle brands.",
        },
        {
          question: "Do you reply to comments?",
          answer: "We can during our hours, though most businesses prefer to answer customers personally.",
        },
      ],
    },
    "ai-automation": {
      metaTitle: "AI Automation on the Sunshine Coast — Never Miss a Call or Enquiry",
      metaDescription:
        "AI automation for Sunshine Coast small businesses: instant text-back for missed calls, after-hours enquiry replies and booking links, with you in control.",
      h1: "AI automation for Sunshine Coast businesses that can't answer the phone mid-job",
      card: "Missed-call text-back and instant enquiry replies.",
      intro: [
        "Small Sunshine Coast businesses lose work every day to missed calls. The owner is with a client, under a house or on a ladder, and the caller rings the next business on Google instead.",
        "We set up automation that texts missed callers back straight away, answers common questions, offers a booking link, and passes urgent enquiries to you with a summary.",
      ],
      sections: [
        {
          heading: "The instant reply",
          body: [
            "When you miss a call, the caller gets a text within seconds: who you are, that you'll call back, and a link to book or describe the job. Most people wait for a reply rather than ring around, if they get one quickly.",
          ],
        },
        {
          heading: "After-hours enquiries",
          body: [
            "Enquiries from your website or social media after hours get an immediate, useful response from your own information, and you get a tidy summary in the morning.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Missed calls turn into lost jobs",
          cause: "Callers ring the next business when nobody answers.",
          steps: [
            "Text missed callers back instantly",
            "Include a booking or job-details link",
            "Summarise each enquiry for you",
          ],
        },
        {
          symptom: "Evening enquiries wait until the next day",
          cause: "Nobody checks messages after hours.",
          steps: [
            "Reply instantly with useful information",
            "Offer available booking times",
            "Flag urgent requests",
          ],
        },
      ],
      checklist: [
        "Missed callers get a text within a minute",
        "After-hours enquiries get an instant reply",
        "Customers can book without calling back",
        "Urgent requests reach you quickly",
      ],
      faqs: [
        {
          question: "Does this work with my existing mobile number?",
          answer: "Usually, through call forwarding or a business phone service. We check what your provider supports.",
        },
        {
          question: "Will customers think they're talking to a robot?",
          answer: "Messages are clearly from your business and say a person will follow up. We don't pretend the automation is a person.",
        },
      ],
    },
    "software-development": {
      metaTitle: "Custom Software on the Sunshine Coast — Client Portals for Home Builders",
      metaDescription:
        "Custom software for Sunshine Coast home builders: client portals for selections, progress photos, variations and payments that cut calls and build trust.",
      h1: "Custom software for Sunshine Coast builders whose clients want updates daily",
      card: "Client portals for selections, progress, variations and payments.",
      intro: [
        "Sunshine Coast builders are busy with new homes in growth estates, and many clients are relocating from interstate, building a house they can't easily visit. They want updates, photos and answers, and they ring and message constantly.",
        "We build client portals where homeowners see progress photos, make selections, approve variations and track payments, cutting calls while building trust.",
      ],
      sections: [
        {
          heading: "Everything in one place",
          body: [
            "Progress updates with photos at each stage. Selections with deadlines and options. Variations with prices and digital approval. Progress claims and payments. All visible to the client, and all on the record.",
          ],
        },
        {
          heading: "Fewer calls, fewer disputes",
          body: [
            "When clients can see progress and approve changes in writing, there are fewer anxious calls and fewer disagreements at handover.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Interstate clients call daily for updates",
          cause: "They can't see the site, so they ask.",
          steps: [
            "Post progress photos at each stage",
            "Share them in a client portal",
            "Notify clients when there's news",
          ],
        },
        {
          symptom: "Selections are late and delay the build",
          cause: "Deadlines aren't clear and choices are made by email.",
          steps: [
            "List selections with deadlines in the portal",
            "Remind clients before each deadline",
            "Record choices in writing",
          ],
        },
      ],
      checklist: [
        "Clients see progress photos without asking",
        "Selections have clear deadlines",
        "Variations are approved digitally",
        "Payment schedules are visible",
      ],
      faqs: [
        {
          question: "Couldn't we use builder software?",
          answer: "Possibly, and we'll compare. Custom portals suit builders whose process or branding doesn't fit standard tools.",
        },
        {
          question: "Can it connect to our accounting system?",
          answer: "Yes, so progress claims and payments sync.",
        },
      ],
      caseStudies: ["hcbengineering"],
    },
    "api-integration": {
      metaTitle: "API Integration on the Sunshine Coast — Holiday Rental Systems Connected",
      metaDescription:
        "API integration for Sunshine Coast holiday rental managers: connect booking platforms, property management, cleaning schedules, guest messaging and Xero.",
      h1: "API integration for Sunshine Coast holiday rental managers",
      card: "Connect booking platforms, PMS, cleaning, messaging and Xero.",
      intro: [
        "Holiday rental managers in Noosa, Mooloolaba and Caloundra juggle several booking platforms, a property management system, cleaning schedules, guest messages and owner statements in Xero. Gaps between them cause double bookings, missed cleans and late owner payments.",
        "We connect those systems so bookings trigger cleans, messages and accounting automatically.",
      ],
      sections: [
        {
          heading: "One booking, everything follows",
          body: [
            "A new booking blocks the calendar everywhere, schedules a clean for check-out day, sends the guest their arrival details and records revenue against the property for the owner statement.",
          ],
        },
        {
          heading: "Owner statements without the spreadsheet",
          body: [
            "Revenue, fees, cleaning costs and commissions are recorded per property, so owner statements come straight from the data.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Cleaners aren't told about new bookings",
          cause: "Cleaning schedules are updated by hand.",
          steps: [
            "Create cleans from bookings automatically",
            "Notify cleaners instantly",
            "Update when bookings change",
          ],
        },
        {
          symptom: "Owner statements take days each month",
          cause: "Figures are pulled from several systems by hand.",
          steps: [
            "Record revenue and costs per property",
            "Sync to Xero automatically",
            "Generate statements from the data",
          ],
        },
      ],
      checklist: [
        "Bookings sync across platforms within minutes",
        "Cleans are scheduled automatically",
        "Guests get arrival details automatically",
        "Owner statements come from live data",
      ],
      faqs: [
        {
          question: "Which property management systems can you connect?",
          answer: "Most with APIs. We confirm your system's options during scoping.",
        },
        {
          question: "Will you change systems during peak season?",
          answer: "No. We schedule changes for quieter periods.",
        },
      ],
    },
    "cloud-solutions": {
      metaTitle: "Cloud Solutions on the Sunshine Coast — Small Team, Proper Set-Up",
      metaDescription:
        "Cloud set-up for Sunshine Coast small businesses and remote teams: files off laptops, proper backups, secure access and Australian hosting for your website and apps.",
      h1: "Cloud set-up for Sunshine Coast small teams with files scattered across laptops",
      card: "Files off laptops, backups and secure access for small teams.",
      intro: [
        "Many Sunshine Coast businesses are small teams, often partly remote, whose important files live on individual laptops and personal cloud accounts. When a laptop dies or someone leaves, things are lost.",
        "We set up cloud storage, backups and secure access for small teams, plus reliable Australian hosting for your website and any apps you run.",
      ],
      sections: [
        {
          heading: "Business files in business accounts",
          body: [
            "Shared files move into business accounts your company owns, organised by client or project, with access by role. When someone leaves, their access goes and the files stay.",
          ],
        },
        {
          heading: "Backups you've tested",
          body: [
            "Website, apps and key files are backed up automatically to a separate location, and we test restoring them, because untested backups often fail when needed.",
          ],
        },
      ],
      problems: [
        {
          symptom: "Our files live on personal laptops",
          cause: "There's no shared business storage.",
          steps: [
            "Set up business cloud storage",
            "Move files in by client or project",
            "Set access by role",
          ],
        },
        {
          symptom: "We lost work when a laptop died",
          cause: "There were no backups.",
          steps: [
            "Back up files and systems automatically",
            "Store backups separately",
            "Test a restore",
          ],
        },
      ],
      checklist: [
        "Business files are in business-owned accounts",
        "Backups run automatically",
        "You've tested restoring a backup",
        "Access is removed when people leave",
      ],
      faqs: [
        {
          question: "Do you set up email and laptops?",
          answer: "No, we focus on hosting, storage and applications. A local IT provider is better for devices and email.",
        },
        {
          question: "Will costs be predictable?",
          answer: "Yes. We estimate monthly costs up front and set alerts.",
        },
      ],
    },
    "website-maintenance": {
      metaTitle: "Website Maintenance on the Sunshine Coast — Taking Over Orphaned Sites",
      metaDescription:
        "Website maintenance for Sunshine Coast businesses whose developer has moved on: recover access, update, secure and keep your site current.",
      h1: "Website maintenance for Sunshine Coast businesses whose developer has moved on",
      card: "We take over orphaned sites and keep them current and secure.",
      intro: [
        "Many Sunshine Coast businesses had their site built by someone who has since moved on to another job, another town or another career. The site still runs, but nobody's updated it, and nobody quite knows how.",
        "We take over existing sites, update and secure them, and become the person you message when something needs changing.",
      ],
      sections: [
        {
          heading: "Taking over",
          body: [
            "We recover access to the domain, hosting and site, move accounts into your business's name, back everything up and audit the site. You get a plain summary of its condition and what we recommend.",
          ],
        },
        {
          heading: "Keeping it current",
          body: [
            "Updates, security, daily off-site backups and uptime monitoring, plus small content changes when you send them, live within one working day.",
          ],
        },
      ],
      problems: [
        {
          symptom: "We don't know who hosts our website",
          cause: "The developer set it up and the details left with them.",
          steps: [
            "Trace the domain and hosting from public records",
            "Recover access with your business details",
            "Move accounts into your name",
          ],
        },
        {
          symptom: "Our site shows old prices and services",
          cause: "Nobody has been able to update it.",
          steps: [
            "List what's out of date",
            "Update it in one go",
            "Keep it current with a monthly plan",
          ],
        },
      ],
      checklist: [
        "You know who hosts your site",
        "Accounts are in your business's name",
        "Prices and services on the site are current",
        "A recent backup exists",
      ],
      faqs: [
        {
          question: "What if we can't recover access?",
          answer: "There's usually a way through the registrar or host using your business details. In the worst case, we rebuild and move the domain.",
        },
        {
          question: "How quickly are changes made?",
          answer: "Within one working day for routine updates.",
        },
      ],
    },
  },
}
