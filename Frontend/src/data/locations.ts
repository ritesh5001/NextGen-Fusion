/**
 * City landing pages.
 *
 * Every result on page one for "web development company in Lucknow" ranks with a
 * dedicated city URL; we had none. These are the highest-intent combinations
 * of service × office — three per city, matching the service lines each
 * office actually sells. Mumbai started one page deep while Lucknow had all
 * three; keep them at parity going forward rather than adding a new city
 * before both existing ones are complete.
 *
 * BEFORE PUBLISHING — two fields are deliberately left blank because they state
 * facts only you can confirm:
 *   `priceBand`   — the section is omitted entirely while this is undefined, so
 *                   nothing false ships. Fill it in with your real range.
 *   `localProof`  — named local clients and outcomes. Same rule: omitted when empty.
 * Everything else below is drawn from the site's existing content and offices.
 */

export type LocationFaq = { question: string; answer: string }

export type LocationLink = { label: string; href: string }

export type LocationSection = {
  heading: string
  body: string[]
  /** Rendered as a row of links under the paragraphs. */
  links?: LocationLink[]
}

/** A real delivered project, linked to its case study at /work/<slug>/. */
export type LocationCaseStudy = { slug: string; title: string; body: string }

export type LocationPage = {
  slug: string
  city: "Lucknow" | "Mumbai"
  /** Matches an `offices[].city` entry. */
  serviceLabel: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[]
  sections: LocationSection[]
  /** Named builds with a case study behind them. Section skipped when empty. */
  caseStudies: LocationCaseStudy[]
  faqs: LocationFaq[]
  /** e.g. "₹45,000 – ₹1,80,000". Section is skipped while undefined. */
  priceBand?: string
  priceNote?: string
  /** Named local clients / outcomes. Section is skipped while empty. */
  localProof: { client: string; detail: string }[]
  relatedServices: { slug: string; label: string }[]
  relatedLocations: string[]
}

const LUCKNOW_CONTEXT = [
  "Lucknow's web market splits cleanly in two. On one side are template shops turning around a five-page brochure site in a week for the price of a good phone. On the other are Delhi and Bangalore agencies quoting metro rates for work they will run entirely over email. Neither is a good fit for a business that needs a site to actually sell something.",
  "We sit in the middle deliberately: a team based here, working at the depth a metro agency works at, on projects we stay attached to after launch. That means fewer clients and longer engagements rather than a churn of one-off builds.",
]

export const locationPages: LocationPage[] = [
  {
    slug: "website-development-company-in-lucknow",
    city: "Lucknow",
    serviceLabel: "Website Development",
    title: "Website Development Company in Lucknow",
    metaTitle: "Website Development Company in Lucknow",
    metaDescription:
      "Custom website development in Lucknow — Next.js and WordPress builds, ecommerce, SEO-ready structure, and support that continues after launch.",
    h1: "Website development company in Lucknow",
    intro: [
      "NextGen Fusion builds websites for businesses in Lucknow and across Uttar Pradesh — manufacturers, institutes, clinics, retailers and D2C brands who need a site that brings in enquiries rather than one that simply exists.",
      "We are a small in-house team, not a reseller. The developer who scopes your project writes the code, and is the person you reach when something needs changing six months later.",
    ],
    sections: [
      {
        heading: "What a website project with us looks like",
        body: [
          "We start with a written scope, not a meeting. Send us what the business does, who buys from it and what the site has to achieve, and you get back a page describing what we would build, what it would cost and how long it would take. If the number does not work, you have spent one email finding that out.",
          "From there the sequence is fixed: structure and content plan, design of the templates that matter, build, content load, then a pre-launch pass covering performance, mobile layout, analytics and search console. Nothing goes live without that last step, which is where most of the sites we are asked to rescue went wrong.",
        ],
      },
      {
        heading: "The Lucknow market, honestly",
        body: LUCKNOW_CONTEXT,
      },
      {
        heading: "What we build on",
        body: [
          "Next.js when the site needs speed, custom logic or a large content structure — this site and most of our recent client work run on it. WordPress when a non-technical team needs to publish daily and the site is content-led. Shopify when the priority is merchandising and payments rather than bespoke behaviour.",
          "We will tell you which of the three your project is, and why, before you commit. Choosing the wrong one is the single most expensive mistake in a web project, and it is almost always made in week one.",
        ],
      },
      {
        heading: "What happens after launch",
        body: [
          "Every build includes a defined support arrangement — updates, uptime monitoring, backups and a named person to call. This is the part of the industry that is broken locally, and the reason most of the enquiries we get are from businesses whose previous developer stopped replying.",
          "If you already have a site and only need that part, our maintenance plans cover it without a rebuild.",
        ],
      },
      {
        heading: "What is actually included",
        body: [
          "Design of every template the site needs rather than a homepage mockup and a promise. Responsive layouts checked on real devices, not just a browser resized. Content loaded by us from what you supply, because sites handed over empty do not get filled. Basic on-page SEO — titles, descriptions, headings, internal links, schema — done during the build rather than sold back to you afterwards.",
          "Also: analytics and Search Console connected and verified before launch, a sitemap submitted, redirects mapped from any old URLs, an SSL certificate, and a form that delivers to an inbox somebody actually reads. None of that is premium. It is the definition of finished, and it is routinely missing.",
          "What is not included by default: copywriting beyond structural editing, photography, and paid ad management. We can arrange all three and will say so up front rather than discovering it in week four.",
        ],
      },
      {
        heading: "Questions worth asking any agency in this city",
        body: [
          "Who owns the domain and hosting account? If the answer is the agency, walk away — that is leverage, not service. Ask to be added as owner on day one.",
          "Can I see the repository? A serious build lives in version control you can be handed. If there is no repository, there is no history, no rollback and no second opinion possible.",
          "What happens in month four? Get the support cost in writing before you sign the build. An agency that has not thought about month four is telling you what month four will look like.",
          "Who writes the code? Ask directly whether the work is subcontracted. Plenty of local shops resell offshore work with a markup, which is legitimate right up until something breaks and nobody in the country understands the codebase.",
        ],
      },
      {
        heading: "Who we are not a good fit for",
        body: [
          "If you need a five-page site live next week at the lowest possible price, a template shop will serve you better and we will say so. If you want a site with no plan to maintain it, the same. And if the decision is being made by committee with no single owner, projects like that stall in review and we have learned to decline them.",
          "We are a fit when the site has a job to do, somebody owns the outcome, and you intend to still be running it in three years.",
        ],
      },
      {
        heading: "Where we are in Lucknow",
        body: [
          "The Lucknow team works out of the city and takes meetings here by arrangement; the registered address we publish is the Mumbai office, and both are listed in full on the contact page. If you want to sit across a table before committing a budget, say so in the first email and we will arrange it rather than pushing you onto a video call.",
          "In practice most Lucknow projects run as one meeting in person at the start and written updates after that. Weekly calls are available and rarely wanted — a written update you can forward to a partner or a bank is more useful than a half hour nobody minuted.",
        ],
      },
      {
        heading: "What a website costs in Lucknow",
        body: [
          "The honest answer is that the city has two price points and almost nothing in between. A template brochure site goes for the price of a mid-range phone. A Delhi or Bangalore agency doing genuinely custom work starts several times higher and bills at metro rates. Businesses here routinely pay the first price, get what it buys, and then pay the second price eighteen months later to have it done properly.",
          "We publish our bands rather than holding them for a call, because most enquiries lost on price would have been lost after three meetings anyway. What moves a Lucknow project up its band is the same everywhere: how many custom features are in scope, how many systems have to talk to each other, and — most often — how ready your content and photography are.",
          "Terms are the same on every project regardless of size: 50% advance to start, 50% at payment-gateway integration. No separate design fee, no per-revision charge inside the agreed scope.",
        ],
        links: [{ label: "See the full price bands", href: "/pricing/" }],
      },
      {
        heading: "Hiring in Lucknow versus a Delhi or NCR agency",
        body: [
          "Lucknow is close enough to Delhi that NCR agencies pitch here constantly, and for some work they are the right answer — if you need a thirty-person team, a media buying desk and a brand film in the same quarter, hire one. Most businesses in this city do not need that and pay for it anyway.",
          "What you are actually buying from an NCR agency at the mid-market end is an account manager in Gurugram and production somewhere else. The distance is not the problem; the layer is. Every question about your catalogue goes through someone who has to ask a developer and come back. That is fine until something breaks during a sale.",
          "The case for hiring here is narrower and more honest: you get the person who writes the code, at a cost base that is two small offices rather than a floor in Cyber City, and you can put a face to the invoice. The case against is real too — we are four people, we cannot staff a project that needs fifteen, and we say so rather than subcontracting it quietly. Ask any Lucknow shop pitching you the same question and watch whether the answer is specific.",
        ],
      },    ],
    caseStudies: [
      {
        slug: "hcbengineering",
        title: "HCB Engineering",
        body: "A government-licensed electrical contractor with twenty years of work behind it and no digital presence to match. The build put service pages against each vertical — commercial, residential, specialty — so prospects self-qualify before they call, and it puts the licences and certifications where a procurement officer looks first. This is the shape most Uttar Pradesh contracting and manufacturing businesses need: credibility and scope, not a storefront.",
      },
      {
        slug: "samaraha",
        title: "Samaraha",
        body: "A textiles brand selling direct. The work here was catalogue structure and merchandising rather than visual novelty — getting a large, seasonal range into categories a buyer can actually navigate on a phone. Relevant to the sizeable share of Lucknow businesses that hold real inventory and have been selling it through WhatsApp and a marketplace listing.",
      },
      {
        slug: "thegrafftee",
        title: "The Grafftee",
        body: "An HR and recruitment firm whose reputation was built entirely on word of mouth, losing enterprise enquiries to competitors with better websites. The site had to carry the full breadth of services and convert high-intent visitors into demo bookings. The same problem turns up across Lucknow's professional services — established, well-regarded locally, invisible to anyone searching.",
      },
    ],
    faqs: [
      {
        question: "How long does a website take?",
        answer:
          "A structured brochure site is typically three to five weeks from content sign-off. An ecommerce build with catalogue, payments and shipping runs six to ten weeks. The variable is almost never the code — it is how quickly product copy and photography arrive.",
      },
      {
        question: "Do you work with businesses outside Lucknow?",
        answer:
          "Yes. We have delivered work for clients across India as well as in the UK, Italy and the Gulf. The Lucknow office matters if you want to meet in person; it does not limit who we work with.",
      },
      {
        question: "Do you take over a site somebody else built?",
        answer:
          "Often. We audit what exists first and tell you plainly whether it is worth maintaining or whether a rebuild costs less over two years than patching it will.",
      },
      {
        question: "Who owns the code and the accounts?",
        answer:
          "You do, from day one — domain, hosting, repository, analytics and payment gateway all registered in your name. We work inside your accounts rather than holding them.",
      },
      {
        question: "What does a website cost, roughly?",
        answer:
          "We publish the bands rather than making you ask. What moves a project within its band is the number of custom features, the number of integrations, and how ready your content is — a build where copy and photography arrive on day one is meaningfully cheaper than one still waiting on them in week six.",
      },
      {
        question: "Who pays for hosting, and whose account is it in?",
        answer:
          "You pay for it and it is in your name — domain, hosting, repository, analytics and payment gateway, all registered to you from day one. We work inside your accounts. Any Lucknow developer who registers your domain in their own name is holding leverage, not providing a service.",
      },
      {
        question: "How many revisions do I get?",
        answer:
          "Review rounds at agreed milestones, and we keep iterating until the result matches the signed scope. What costs extra is new scope — a page or feature that was not in the agreement — and we tell you that before doing the work rather than in the final invoice.",
      },
      {
        question: "What happens after launch, and what does it cost?",
        answer:
          "Every build comes with a defined support arrangement rather than a handshake: updates, uptime monitoring, backups and a named developer to call. Basic support runs yearly; a plan that includes ongoing changes is priced by build type. The plans and their prices are on the pricing page.",
      },
      {
        question: "Can we work together entirely remotely?",
        answer:
          "Yes, and most projects do after the first meeting. Day to day the work runs on shared documents and a written weekly update. Clients outside Uttar Pradesh — and in the UK, Italy and the Gulf — have run start to finish this way.",
      },
      {
        question: "What are the payment terms?",
        answer:
          "50% advance to start and 50% at payment-gateway integration, the same on every project regardless of size. There is no separate design fee and no charge for the pre-launch performance, analytics and Search Console checks.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "web-design-services", label: "Web Design Services" },
      { slug: "website-maintenance-services", label: "Website Maintenance Services" },
    ],
    relatedLocations: ["seo-services-in-lucknow", "ecommerce-development-company-in-lucknow"],
  },
  {
    slug: "seo-services-in-lucknow",
    city: "Lucknow",
    serviceLabel: "SEO Services",
    title: "SEO Services in Lucknow",
    metaTitle: "SEO Services in Lucknow",
    metaDescription:
      "Technical SEO, local search and content strategy for Lucknow businesses — run by the same team that builds the site, not a separate reporting department.",
    h1: "SEO services in Lucknow",
    intro: [
      "Most SEO retainers in this market sell reporting. Rankings go in a spreadsheet, a few directory listings get built, and nothing about the site itself changes — which is where the actual problem usually is.",
      "We run SEO as engineering work: site structure, page speed, internal linking, schema and content, changed in the codebase rather than described in a monthly PDF.",
    ],
    sections: [
      {
        heading: "Where local rankings are actually won",
        body: [
          "For a Lucknow business competing on local intent, three things decide the outcome and none of them are keyword density: a Google Business Profile that is complete and actively maintained, name-address-phone details that match exactly everywhere they appear, and a page on your own site that genuinely targets the city rather than repeating the service page with the city name swapped in.",
          "That third one is where nearly every local site fails. A find-and-replace city page is transparent to both Google and to the person reading it. Ours are written per city, which is slower and works.",
        ],
      },
      {
        heading: "What we do first",
        body: [
          "The first month is a technical pass and nothing else: crawl the whole site, fix what is blocking indexing, fix what is slow, correct the structured data, rebuild the internal linking, and set up the measurement so the following months can be judged. On most sites we take over this alone moves things, because nothing has ever been done properly at that layer.",
          "Content and authority work follows once the foundation holds. Doing it in the other order is how retainers run for a year with nothing to show.",
        ],
      },
      {
        heading: "The Lucknow market, honestly",
        body: LUCKNOW_CONTEXT,
      },
      {
        heading: "What you get monthly",
        body: [
          "A short written note of what changed on the site, what moved, and what is queued next — with the actual commits and page changes behind it. No 40-page automated export.",
          "We would rather you could tell us what we did last month than be handed a document you will not read.",
        ],
      },
      {
        heading: "What the first ninety days look like",
        body: [
          "Weeks one to four: a full technical audit and the fixes that come out of it. Crawl and indexing errors, page speed, mobile layout faults, duplicate and thin pages, broken internal links, missing or wrong structured data, and a canonical strategy that actually holds. This is unglamorous and it is where the compounding starts.",
          "Weeks five to eight: architecture. Which pages should exist, which should be merged, which should be removed, and how they link to one another. Most sites we take on have their commercial pages buried three clicks deep with no internal links pointing at them, which is a way of telling Google they do not matter.",
          "Weeks nine to twelve: content and local signals. The pages that were missing get written, Google Business Profile gets completed and maintained, and directory listings get built with name, address and phone matching exactly. Only then does link acquisition make sense — pointing authority at a site that is not structurally sound wastes it.",
        ],
      },
      {
        heading: "What we will not do",
        body: [
          "No purchased links, no private blog networks, no expired-domain redirects. These still work briefly and then stop working permanently, and recovering from a manual action costs more than the rankings were worth.",
          "No AI-generated bulk content published under your name. No fake reviews, and no review-gating schemes that violate Google's policies. No guarantee of a specific ranking position, because nobody can honestly give one.",
          "If a competing proposal promises any of the above, that is the reason it is cheaper.",
        ],
      },
      {
        heading: "How this connects to the rest of the site",
        body: [
          "SEO retained separately from the people who can change the site is the single most common reason it fails. We build and maintain sites too, which means a recommendation and its implementation are the same conversation rather than two vendors blaming each other.",
          "If we did not build your site, we work directly with whoever did — and we would rather do that than take a retainer where nothing we recommend ever ships.",
        ],
      },
      {
        heading: "What SEO costs here, and what the cheap version buys",
        body: [
          "Lucknow has a floor price for SEO that is roughly the cost of a phone bill, and at that price the work is directory submissions and a ranking report. It is not fraud exactly — those things do happen — it is just that none of them touch the reasons the site is not ranking.",
          "We price SEO as engineering time because that is what it is: changes made in the codebase, not described in a PDF. The build bands on our pricing page give you the shape of what technical work costs; a retainer is scoped against the audit rather than sold as a fixed package, because a site that needs its architecture rebuilt and a site that needs content are different amounts of work at the same monthly fee.",
        ],
        links: [{ label: "How we price work", href: "/pricing/" }],
      },
      {
        heading: "Hiring in Lucknow versus a Delhi or NCR agency",
        body: [
          "NCR agencies sell SEO into Lucknow heavily, and the pitch is usually national keyword coverage. For a business whose customers are within thirty kilometres, national coverage is the wrong product — you are paying for competitive terms you will not win against budgets you cannot match, while the Google Business Profile that would actually generate calls sits half-completed.",
          "The specific advantage of working with someone here is not cultural, it is operational: we can look at your Business Profile, your reviews and the citations that name your address, and correct them against a real address we can verify. Getting name, address and phone consistent across every listing is unglamorous and it is frequently the single biggest lever for a Lucknow business.",
          "Where an NCR or metro agency genuinely wins: national content programmes, digital PR at scale, and link acquisition budgets. If that is the brief, hire one — and we will say so.",
        ],
      },    ],
    caseStudies: [
      {
        slug: "thegrafftee",
        title: "The Grafftee",
        body: "A recruitment firm with a strong offline reputation that simply did not appear when enterprise buyers searched. The fix was structural before it was editorial — giving each service a page that could rank, and linking them so the commercially important ones were not buried three clicks deep. That burial is the single most common fault we find on Lucknow sites.",
      },
      {
        slug: "krushidoctor",
        title: "Krushi Doctor",
        body: "An AgriTech store selling into a specific, searchable niche. Narrow categories with genuine search intent behind them are exactly where a smaller business can outrank a larger one, and Uttar Pradesh's agricultural supply businesses sit on more of these than they realise.",
      },
      {
        slug: "newsaraswatisareecentre",
        title: "New Saraswati Saree Centre",
        body: "A textiles retailer moving online. Product and category structure is SEO work as much as merchandising work — get the taxonomy wrong and every product page competes with its own category. Directly relevant to the saree, chikankari and ethnic wear businesses this city has in volume.",
      },
    ],
    faqs: [
      {
        question: "How long before SEO shows results?",
        answer:
          "Technical fixes can move things in weeks. Competitive commercial rankings take six to twelve months of consistent work. Anyone promising page one in thirty days is either bidding on your brand name or selling you something else.",
      },
      {
        question: "Do you need access to my website's code?",
        answer:
          "Yes, or to whoever maintains it. SEO that cannot change the site is limited to advice, and advice nobody implements is the most common reason retainers fail.",
      },
      {
        question: "Do you handle Google Business Profile?",
        answer:
          "Yes — setup, verification, category selection, service areas, photos and review responses. For a local business it is frequently a larger lever than anything on the website itself.",
      },
      {
        question: "Can you work on a site you did not build?",
        answer:
          "Yes, and most of our SEO clients are exactly that. We start with an audit so you can see what state it is in before committing to a retainer.",
      },
      {
        question: "What does an SEO retainer cost?",
        answer:
          "It is scoped against the audit rather than sold as a fixed monthly package, because a site needing its architecture rebuilt and a site needing content are different amounts of work. The build bands on our pricing page show what technical time costs; the audit tells us how much of it your site needs.",
      },
      {
        question: "Who owns the accounts and the data?",
        answer:
          "You do. Analytics, Search Console, Google Business Profile and any tooling stay registered in your name and we work inside them. An agency that holds your Search Console access is holding the evidence of its own work hostage.",
      },
      {
        question: "What do I actually receive each month?",
        answer:
          "A short written note of what changed on the site, what moved, and what is queued next — with the commits and page changes behind it. No forty-page automated export. You should be able to tell someone else what we did last month.",
      },
      {
        question: "Do you have to be in Lucknow to do this?",
        answer:
          "For the technical and content work, no — that runs remotely and we do it for clients well outside Uttar Pradesh. For the local pack specifically, being able to verify your address, photograph the premises and correct citations against something real is a genuine advantage, which is why the local half of this is easier when we are in the same city.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "seo-services", label: "SEO Services" },
      { slug: "ppc-services", label: "PPC & Google Ads" },
      { slug: "social-media-marketing-services", label: "Social Media Marketing" },
    ],
    relatedLocations: [
      "website-development-company-in-lucknow",
      "ecommerce-development-company-in-lucknow",
    ],
  },
  {
    slug: "ecommerce-development-company-in-lucknow",
    city: "Lucknow",
    serviceLabel: "E-commerce Development",
    title: "Ecommerce Development Company in Lucknow",
    metaTitle: "Ecommerce Development Company in Lucknow",
    metaDescription:
      "Shopify, WooCommerce and custom online stores for Lucknow businesses — payments, shipping, catalogue and the post-launch support that keeps them selling.",
    h1: "Ecommerce development company in Lucknow",
    intro: [
      "We build online stores for brands in Lucknow and across Uttar Pradesh — ethnic wear, jewellery, beauty, food and manufacturing businesses selling direct for the first time or moving off a marketplace.",
      "Ecommerce is where the gap between a site that works and a site that merely exists is widest, because every defect has a rupee value attached to it.",
    ],
    sections: [
      {
        heading: "Shopify, WooCommerce or custom",
        body: [
          "Shopify if you are selling a manageable catalogue and want to stop thinking about infrastructure. It costs more monthly and less in attention, and its checkout converts better than almost anything you would build.",
          "WooCommerce if you already run WordPress, publish a lot of content, or need pricing and tax logic Shopify will not bend to. It costs less monthly and considerably more in maintenance — which is a real cost, not a hypothetical one.",
          "Custom, usually on Next.js, when the model is genuinely unusual: multi-vendor marketplaces, B2B quoting, made-to-order configurators. We have built all three, and we will talk you out of it if your project is not one of them.",
        ],
      },
      {
        heading: "The parts that decide whether a store sells",
        body: [
          "Product photography and copy, first — a store with thin listings will underperform regardless of how it is built, and this is where most launches slip. Then checkout: Razorpay or equivalent, correctly configured, with COD rules and shipping zones that match how you actually fulfil.",
          "Then speed on a mid-range Android phone on a 4G connection, which is what your customers are actually on. We test on that, not on a desktop over office wifi.",
        ],
      },
      {
        heading: "The Lucknow market, honestly",
        body: LUCKNOW_CONTEXT,
      },
      {
        heading: "After the store is live",
        body: [
          "A store needs more ongoing attention than a brochure site: gateway changes, courier integrations, sale configurations, catalogue growth, and the performance regressions that come with all of it. Our support plans cover that with a named developer rather than a ticket queue.",
          "We also connect analytics and search console properly at launch, so the first month of real traffic is measured rather than lost.",
        ],
      },
      {
        heading: "What launching actually requires from you",
        body: [
          "A product list with real names, real descriptions and real prices. Photography — ideally on a consistent background, at consistent scale. Your GST details, shipping origin, and the courier or aggregator you intend to use. A returns policy you are willing to honour, written down.",
          "Almost every delayed ecommerce launch we have seen was delayed by this list, not by development. We ask for it in week one specifically so the delay happens early and visibly rather than late and expensively.",
        ],
      },
      {
        heading: "Payments, shipping and the things that break",
        body: [
          "Razorpay, PayU or Cashfree for domestic; the choice mostly comes down to settlement timing and the categories they will underwrite. International selling adds currency display, duty messaging and a different fraud profile, and we will tell you honestly whether it is worth switching on at launch.",
          "Cash on delivery is where most Indian stores lose money quietly: without an RTO rule, a partial-prepaid nudge or a pincode restriction, the returns eat the margin. We configure those at launch rather than after the first bad month.",
          "Shipping zones, weight slabs and free-shipping thresholds get set to match how you actually fulfil, and get tested with real orders before anything goes public.",
        ],
      },
      {
        heading: "After the first hundred orders",
        body: [
          "The work changes shape. Catalogue growth slows the site down. Apps accumulate and start conflicting. Sale configurations need building and unwinding. Reviews, wishlists and abandoned-cart flows become worth adding — and each one adds script weight that has to be paid for in speed somewhere.",
          "That ongoing tuning is what our support plans are for. A store is an operating system for a business, not a project that ends.",
        ],
      },
      {
        heading: "What a store costs to build in Lucknow",
        body: [
          "A Shopify or WooCommerce store put together from a theme sits at the bottom of our range and is genuinely the right answer for a first catalogue — you are paying for setup and configuration, not engineering. A custom-coded store starts an order of magnitude higher because it is a different product, and most Lucknow businesses should not buy it until the template one is provably the constraint.",
          "Where budgets here go wrong is not the build. It is the running cost nobody quoted: gateway charges of roughly two percent a transaction, platform fees, and the returns from cash on delivery, which quietly eat more margin than all of it. We put those numbers in front of you before you commit, and the build bands are published rather than held for a call.",
          "Terms are 50% advance to start and 50% at payment-gateway integration — which for a store means you are paying the balance at the point the thing can actually take money.",
        ],
        links: [{ label: "See the price bands", href: "/pricing/" }],
      },
      {
        heading: "Hiring in Lucknow versus a Delhi or NCR agency",
        body: [
          "Ethnic wear, chikankari, sarees, jewellery and food are the categories this city actually sells, and they share a problem an NCR agency will not feel: the catalogue is large, seasonal, photographed inconsistently, and often lives in a WhatsApp thread rather than a spreadsheet. Getting it into a store is mostly a logistics job, and it goes faster when someone can sit in your shop and look at the stock.",
          "One of our team shoots product and lifestyle imagery, which for a Lucknow brand launching direct is frequently the difference between six weeks and four months. That is not a service an out-of-state agency will fly in for at this budget.",
          "Where an NCR agency wins: large paid-media budgets and multi-market rollouts. If that is where you are, hire one.",
        ],
      },    ],
    caseStudies: [
      {
        slug: "tatvivahtrends",
        title: "TatVivah Trends",
        body: "A multi-vendor wedding ethnic wear marketplace — sherwanis, kurtas and bridal sets filtered by occasion, with a three-thousand-product catalogue, Razorpay checkout and a returns and trust system built in. Wedding ethnic wear is one of the categories Lucknow genuinely competes in nationally, and this is what the full version of it looks like.",
      },
      {
        slug: "samaraha",
        title: "Samaraha",
        body: "A textiles brand going direct. The work was catalogue architecture and mobile merchandising — a large seasonal range structured so a buyer on a mid-range phone can navigate it. This is the shape most Lucknow textile businesses need first, and it is not a design problem.",
      },
      {
        slug: "sitaravastram",
        title: "Sitara Vastram",
        body: "A fashion storefront where the constraint was speed and product discovery rather than bespoke logic. A useful reference point if you are weighing a template build against a custom one: plenty of catalogues are served properly by the cheaper answer.",
      },
    ],
    faqs: [
      {
        question: "What does an online store cost to run monthly?",
        answer:
          "Beyond our support plan: platform fees if you are on Shopify, payment gateway charges of roughly 2% per transaction, domain and any apps you add. We list these before you commit so there are no surprises in month two.",
      },
      {
        question: "Can you migrate my store from another platform?",
        answer:
          "Yes — products, customers, orders and URL structure. The URL redirects are the part people forget, and skipping them discards the search visibility the old store had earned.",
      },
      {
        question: "Do you handle product photography?",
        answer:
          "We can. One of the team shoots product and lifestyle imagery, which for a new D2C brand is often the difference between launching in six weeks and launching in four months.",
      },
      {
        question: "Will my store be fast enough for Google?",
        answer:
          "Core Web Vitals are part of the pre-launch checklist, not an afterthought. We measure on a throttled mobile connection because that is the condition Google grades you on.",
      },
      {
        question: "Who owns the store, the domain and the payment gateway?",
        answer:
          "You do, from day one — domain, hosting, repository, analytics and the gateway account all in your name. We work inside your accounts. This matters more for a store than for a brochure site, because the gateway account is tied to your GST and bank details and should never sit with a developer.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Review rounds at agreed milestones through design and build, and we keep iterating until it matches the signed scope. New scope — an extra integration, a feature that was not in the agreement — is quoted before we build it.",
      },
      {
        question: "What are the payment terms?",
        answer:
          "50% advance to start, 50% at payment-gateway integration. For a store that means the balance falls due at the point it can take a real order, not at some arbitrary midpoint.",
      },
      {
        question: "Can you run the store for us remotely after launch?",
        answer:
          "Yes — sale configurations, courier integrations, catalogue growth and the performance regressions that come with all of it are exactly what the support plans cover, and none of it needs us in the room. The parts that benefit from being in Lucknow are the catalogue audit and the photography.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: ["website-development-company-in-lucknow", "seo-services-in-lucknow"],
  },
  {
    slug: "website-development-company-in-mumbai",
    city: "Mumbai",
    serviceLabel: "Website Development",
    title: "Website Development Company in Mumbai",
    metaTitle: "Website Development Company in Mumbai",
    metaDescription:
      "Website and ecommerce development for Mumbai businesses from our Mahim office — Next.js, Shopify and WordPress builds with support that continues after launch.",
    h1: "Website development company in Mumbai",
    intro: [
      "Our Mumbai office is in Mahim, and we build websites and online stores for businesses across the city — D2C brands, traders, manufacturers, clinics and professional services firms.",
      "Mumbai has no shortage of agencies. What it has less of is a team that will quote honestly, build it themselves, and still be reachable a year later.",
    ],
    sections: [
      {
        heading: "Why businesses here call us",
        body: [
          "Usually one of three reasons. The site was built by a large agency and now costs more to change than it did to build. The site was built cheaply and cannot be extended at all. Or there is no site, and the business has been running on Instagram and WhatsApp until that stopped scaling.",
          "All three are normal. The first is the most common and the least talked about: an expensive build handed over with no documentation, no repository access and no one available to maintain it.",
        ],
      },
      {
        heading: "How we price against Mumbai agency rates",
        body: [
          "We are not the cheapest option in the city and we do not try to be — but our overheads are two small offices rather than a floor in a business district, and that difference shows up in the quote rather than in the quality of the build.",
          "What you should compare is not the headline number but what happens after: how many included revisions, who owns the code, what support costs, and how quickly someone answers when the payment gateway fails on a Saturday.",
        ],
      },
      {
        heading: "What we build on",
        body: [
          "Next.js for performance-critical and custom builds, Shopify for merchandising-led ecommerce, WordPress for content-led sites a marketing team will update daily. We have shipped all three this year.",
          "The recommendation comes with reasoning attached, and it is made before you sign anything rather than after.",
        ],
      },
      {
        heading: "Working with us from Mumbai",
        body: [
          "The Mahim office takes meetings, and for Mumbai clients we generally do the kickoff in person and everything after that remotely. Day-to-day the work runs on shared documents and a weekly written update, which is faster than a standing call nobody wants.",
          "If you would rather work entirely in person, say so early — it changes how we schedule, not whether we can do it.",
        ],
      },
      {
        heading: "What is included, and what is not",
        body: [
          "Included: design of every template the site needs, responsive layouts tested on real devices, content loaded by us, on-page SEO done during the build, analytics and Search Console connected and verified, redirects mapped from any previous URLs, and a contact form that reliably delivers. You own the domain, hosting, repository and every account from day one.",
          "Not included by default: long-form copywriting, photography, and paid ad management. We can arrange all three, and we say so at quoting time rather than discovering it midway.",
        ],
      },
      {
        heading: "Rescue and takeover work",
        body: [
          "A large share of our Mumbai enquiries are sites somebody else built and nobody now maintains. The pattern is consistent: no repository access, no documentation, a page builder three major versions behind, and a hosting account in an agency's name.",
          "We start with an audit that answers one question plainly — is this worth maintaining, or are you paying rent on a bad foundation? Sometimes the honest answer is that a rebuild costs less over two years than continuing to patch it. Sometimes it is that the site is fine and you need hosting moved and updates run. We have told clients both.",
        ],
      },
      {
        heading: "Who we are not a good fit for",
        body: [
          "Businesses wanting the cheapest possible five-page site, projects with no single decision-maker, and engagements where the brief is a competitor's URL and the instruction to copy it. None of those end well, and declining them early is cheaper for everybody.",
          "We are a fit when the site has a commercial job to do and somebody owns whether it does it.",
        ],
      },
      {
        heading: "Where we are in Mumbai",
        body: [
          "The office is at GNM/95/347, Ground Floor, Banwari Compound, Mahim Rly Stn (E), Mahim, Mumbai 400016 — two minutes from Mahim station on the Western line, which makes it reachable from Bandra, Dadar and Andheri without a cab. Meetings by appointment; the map is on the contact page.",
          "For Mumbai clients we generally do the kickoff in person and everything after that remotely, because a standing weekly call across this city costs somebody ninety minutes of travel and produces less than a written update does. If you would rather work face to face throughout, say so early — it changes how we schedule, not whether we can do it.",
        ],
      },
      {
        heading: "What a build costs against Mumbai agency rates",
        body: [
          "A Lower Parel or BKC agency is carrying rent, an account layer and a new-business team, and all three are in the quote whether or not they touch your project. We carry two small offices and no account layer, and the difference lands in the number rather than in the quality of the build.",
          "What is worth comparing is not the headline figure. It is what happens after: how many revisions are included, who owns the repository, what support costs monthly, and how fast somebody answers when the gateway fails during a Saturday sale. Our bands are published, and the terms are 50% advance to start and 50% at payment-gateway integration on every project regardless of size.",
        ],
        links: [{ label: "See the full price bands", href: "/pricing/" }],
      },    ],
    caseStudies: [
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A B2B marketplace for maritime procurement — an RFQ engine, vendor verification, port-based service discovery and quote comparison for ship operators sourcing everything from spare parts to hull cleaning. Built for an industry Mumbai runs: if your business touches the port, shipping or maritime services, this is the closest reference on our list to your problem.",
      },
      {
        slug: "hcbengineering",
        title: "HCB Engineering",
        body: "A government-licensed electrical contractor with twenty years behind it and no site to match. Service pages per vertical so prospects self-qualify, with licences and certifications placed where a procurement officer looks first — the pattern most Mumbai contracting, engineering and industrial services firms need.",
      },
      {
        slug: "clickngreet",
        title: "ClickNGreet",
        body: "A gifting storefront where the work was product discovery and a checkout that holds up under occasion-driven traffic spikes. Relevant to Mumbai's consumer and D2C businesses, where demand is concentrated into a handful of weeks a year and the site either survives them or does not.",
      },
    ],
    faqs: [
      {
        question: "Do you have an office in Mumbai?",
        answer:
          "Yes — Banwari Compound, Mahim (E), near Mahim railway station. Meetings by appointment; the address and map are on our contact page.",
      },
      {
        question: "How does your pricing compare with larger Mumbai agencies?",
        answer:
          "Lower for comparable scope, because we carry far less overhead and no account-management layer. The build is done by the same people who quoted it.",
      },
      {
        question: "Can you support a site your team did not build?",
        answer:
          "Yes. We audit it first and are honest about whether maintaining it is sensible or whether you are paying rent on a bad foundation.",
      },
      {
        question: "How long does a project take?",
        answer:
          "Three to five weeks for a structured brochure site, six to ten for ecommerce, measured from content sign-off rather than from the contract date.",
      },
      {
        question: "Who owns the code, the domain and the hosting?",
        answer:
          "You do, from day one — all registered in your name, with us working inside your accounts. A large share of our Mumbai enquiries are businesses that cannot get repository or hosting access back from a previous agency, which is precisely why we set it up this way.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Review rounds at agreed milestones, iterating until the build matches the signed scope. New scope is quoted before it is built. There is no per-revision charge inside the agreement, which is a line worth checking in any Mumbai agency contract you are comparing us against.",
      },
      {
        question: "What does support cost after launch?",
        answer:
          "Support is a recurring plan billed separately from the build, covering updates, uptime monitoring, backups and a named developer. Basic cover is annual; a plan including ongoing changes is priced by build type. The figures are on the pricing page.",
      },
      {
        question: "What are the payment terms?",
        answer:
          "50% advance to start and 50% at payment-gateway integration, on every project regardless of size. No separate design fee, and no charge for the pre-launch performance, analytics and Search Console checks.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: ["seo-services-in-mumbai", "ecommerce-development-company-in-mumbai"],
  },
  {
    slug: "seo-services-in-mumbai",
    city: "Mumbai",
    serviceLabel: "SEO Services",
    title: "SEO Services in Mumbai",
    metaTitle: "SEO Services in Mumbai",
    metaDescription:
      "Technical SEO, local search and content strategy for Mumbai businesses — run from our Mahim office by the same team that builds the site.",
    h1: "SEO services in Mumbai",
    intro: [
      "Most SEO retainers sold in this city are reporting products: rankings land in a spreadsheet, a handful of directory listings get built, and nothing about the site itself changes — which is where the actual problem almost always is.",
      "We run SEO as engineering work from the Mahim office: site structure, page speed, internal linking, schema and content, changed in the codebase rather than described in a monthly PDF.",
    ],
    sections: [
      {
        heading: "Where local rankings are actually won",
        body: [
          "For a Mumbai business competing on local intent, three things decide the outcome and none of them are keyword density: a Google Business Profile that is complete and actively maintained, name-address-phone details that match exactly everywhere they appear, and a page on your own site that genuinely targets the city or suburb rather than repeating the service page with the place name swapped in.",
          "That third one is where nearly every local site fails in a city this size — Bandra, Andheri, Lower Parel and BKC are different searches with different intent, and a find-and-replace page reads as one to Google and to the person on it. Ours are written per location, which is slower and works.",
        ],
      },
      {
        heading: "What we do first",
        body: [
          "The first month is a technical pass and nothing else: crawl the whole site, fix what is blocking indexing, fix what is slow, correct the structured data, rebuild the internal linking, and set up the measurement so the following months can be judged. On most sites we take over this alone moves things, because nothing has ever been done properly at that layer.",
          "Content and authority work follows once the foundation holds. Doing it in the other order is how retainers run for a year with nothing to show.",
        ],
      },
      {
        heading: "What you get monthly",
        body: [
          "A short written note of what changed on the site, what moved, and what is queued next — with the actual commits and page changes behind it. No 40-page automated export.",
          "We would rather you could tell us what we did last month than be handed a document you will not read.",
        ],
      },
      {
        heading: "What the first ninety days look like",
        body: [
          "Weeks one to four: a full technical audit and the fixes that come out of it. Crawl and indexing errors, page speed, mobile layout faults, duplicate and thin pages, broken internal links, missing or wrong structured data, and a canonical strategy that actually holds. This is unglamorous and it is where the compounding starts.",
          "Weeks five to eight: architecture. Which pages should exist, which should be merged, which should be removed, and how they link to one another. Most sites we take on have their commercial pages buried three clicks deep with no internal links pointing at them, which is a way of telling Google they do not matter.",
          "Weeks nine to twelve: content and local signals. The pages that were missing get written, Google Business Profile gets completed and maintained, and directory listings get built with name, address and phone matching exactly. Only then does link acquisition make sense — pointing authority at a site that is not structurally sound wastes it.",
        ],
      },
      {
        heading: "What we will not do",
        body: [
          "No purchased links, no private blog networks, no expired-domain redirects. These still work briefly and then stop working permanently, and recovering from a manual action costs more than the rankings were worth.",
          "No AI-generated bulk content published under your name. No fake reviews, and no review-gating schemes that violate Google's policies. No guarantee of a specific ranking position, because nobody can honestly give one.",
          "If a competing proposal promises any of the above, that is the reason it is cheaper.",
        ],
      },
      {
        heading: "How this connects to the rest of the site",
        body: [
          "SEO retained separately from the people who can change the site is the single most common reason it fails. We build and maintain sites too, which means a recommendation and its implementation are the same conversation rather than two vendors blaming each other.",
          "If we did not build your site, we work directly with whoever did — and we would rather do that than take a retainer where nothing we recommend ever ships.",
        ],
      },
      {
        heading: "What SEO costs against Mumbai agency rates",
        body: [
          "A Lower Parel or BKC agency is carrying rent, an account layer and a new-business team, and all three sit inside the retainer whether or not they touch your rankings. At the low end of the market the retainer buys directory submissions and a monthly report — neither one moves a technical problem.",
          "We price SEO as engineering time because that is what it is: changes made in the codebase, not described in a PDF. The build bands on our pricing page give you the shape of what technical work costs; a retainer is scoped against the audit rather than sold as a fixed package, because a site that needs its architecture rebuilt and a site that needs content are different amounts of work at the same monthly fee.",
        ],
        links: [{ label: "How we price work", href: "/pricing/" }],
      },
      {
        heading: "Where we are in Mumbai",
        body: [
          "The office is at GNM/95/347, Ground Floor, Banwari Compound, Mahim Rly Stn (E), Mahim, Mumbai 400016 — two minutes from Mahim station on the Western line. For the technical and content work, being in the city is not required and we run that remotely for clients well outside Mumbai too. For the local pack specifically, being able to verify your address, photograph the premises and correct citations against something real is a genuine advantage, which is why the local half of this is easier when we are in the same city.",
        ],
      },
    ],
    caseStudies: [
      {
        slug: "thegrafftee",
        title: "The Grafftee",
        body: "A recruitment firm with a strong offline reputation that simply did not appear when enterprise buyers searched. The fix was structural before it was editorial — giving each service a page that could rank, and linking them so the commercially important ones were not buried three clicks deep. That burial is the single most common fault we find on sites in this size of city.",
      },
      {
        slug: "hcbengineering",
        title: "HCB Engineering",
        body: "A government-licensed electrical contractor with twenty years of work behind it and no digital presence to match. The build put service pages against each vertical — commercial, residential, specialty — so a procurement officer can self-qualify and find the licences and certifications where they look first. Directly relevant to Mumbai's contracting, engineering and industrial services firms.",
      },
      {
        slug: "krushidoctor",
        title: "Krushi Doctor",
        body: "An AgriTech store selling into a specific, searchable niche. Narrow categories with genuine search intent behind them are exactly where a smaller business can outrank a larger one — a useful reference for any Mumbai business selling into a specialised B2B or trade category rather than a broad consumer market.",
      },
    ],
    faqs: [
      {
        question: "How long before SEO shows results?",
        answer:
          "Technical fixes can move things in weeks. Competitive commercial rankings in a market this size take six to twelve months of consistent work. Anyone promising page one in thirty days is either bidding on your brand name or selling you something else.",
      },
      {
        question: "Do you need access to my website's code?",
        answer:
          "Yes, or to whoever maintains it. SEO that cannot change the site is limited to advice, and advice nobody implements is the most common reason retainers fail.",
      },
      {
        question: "Do you handle Google Business Profile?",
        answer:
          "Yes — setup, verification, category selection, service areas, photos and review responses. For a local business it is frequently a larger lever than anything on the website itself.",
      },
      {
        question: "Can you work on a site you did not build?",
        answer:
          "Yes, and most of our SEO clients are exactly that. We start with an audit so you can see what state it is in before committing to a retainer.",
      },
      {
        question: "What does an SEO retainer cost?",
        answer:
          "It is scoped against the audit rather than sold as a fixed monthly package, because a site needing its architecture rebuilt and a site needing content are different amounts of work. The build bands on our pricing page show what technical time costs; the audit tells us how much of it your site needs.",
      },
      {
        question: "Who owns the accounts and the data?",
        answer:
          "You do. Analytics, Search Console, Google Business Profile and any tooling stay registered in your name and we work inside them. An agency that holds your Search Console access is holding the evidence of its own work hostage.",
      },
      {
        question: "Do you have to be in Mumbai to do this?",
        answer:
          "For the technical and content work, no — that runs remotely and we do it for clients well outside the city. For the local pack specifically, being able to verify your address, photograph the premises and correct citations against something real is a genuine advantage, which is why the local half of this is easier when we are in the same city.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "seo-services", label: "SEO Services" },
      { slug: "ppc-services", label: "PPC & Google Ads" },
      { slug: "social-media-marketing-services", label: "Social Media Marketing" },
    ],
    relatedLocations: [
      "website-development-company-in-mumbai",
      "ecommerce-development-company-in-mumbai",
    ],
  },
  {
    slug: "ecommerce-development-company-in-mumbai",
    city: "Mumbai",
    serviceLabel: "E-commerce Development",
    title: "Ecommerce Development Company in Mumbai",
    metaTitle: "Ecommerce Development Company in Mumbai",
    metaDescription:
      "Shopify, WooCommerce and custom online stores for Mumbai businesses — payments, shipping, catalogue and the post-launch support that keeps them selling.",
    h1: "Ecommerce development company in Mumbai",
    intro: [
      "We build online stores for brands in Mumbai from our Mahim office — fashion, gifting, beauty, food and B2B businesses selling direct for the first time or moving off a marketplace.",
      "Ecommerce is where the gap between a site that works and a site that merely exists is widest, because every defect has a rupee value attached to it.",
    ],
    sections: [
      {
        heading: "Shopify, WooCommerce or custom",
        body: [
          "Shopify if you are selling a manageable catalogue and want to stop thinking about infrastructure. It costs more monthly and less in attention, and its checkout converts better than almost anything you would build.",
          "WooCommerce if you already run WordPress, publish a lot of content, or need pricing and tax logic Shopify will not bend to. It costs less monthly and considerably more in maintenance — which is a real cost, not a hypothetical one.",
          "Custom, usually on Next.js, when the model is genuinely unusual: multi-vendor marketplaces, B2B quoting, made-to-order configurators. We have built all three, and we will talk you out of it if your project is not one of them.",
        ],
      },
      {
        heading: "The parts that decide whether a store sells",
        body: [
          "Product photography and copy, first — a store with thin listings will underperform regardless of how it is built, and this is where most launches slip. Then checkout: Razorpay or equivalent, correctly configured, with COD rules and shipping zones that match how you actually fulfil.",
          "Then speed on a mid-range Android phone on a 4G connection, which is what your customers are actually on. We test on that, not on a desktop over office wifi.",
        ],
      },
      {
        heading: "After the store is live",
        body: [
          "A store needs more ongoing attention than a brochure site: gateway changes, courier integrations, sale configurations, catalogue growth, and the performance regressions that come with all of it. Our support plans cover that with a named developer rather than a ticket queue.",
          "We also connect analytics and search console properly at launch, so the first month of real traffic is measured rather than lost.",
        ],
      },
      {
        heading: "What launching actually requires from you",
        body: [
          "A product list with real names, real descriptions and real prices. Photography — ideally on a consistent background, at consistent scale. Your GST details, shipping origin, and the courier or aggregator you intend to use. A returns policy you are willing to honour, written down.",
          "Almost every delayed ecommerce launch we have seen was delayed by this list, not by development. We ask for it in week one specifically so the delay happens early and visibly rather than late and expensively.",
        ],
      },
      {
        heading: "Payments, shipping and the things that break",
        body: [
          "Razorpay, PayU or Cashfree for domestic; the choice mostly comes down to settlement timing and the categories they will underwrite. International selling adds currency display, duty messaging and a different fraud profile, and we will tell you honestly whether it is worth switching on at launch.",
          "Cash on delivery is where most Indian stores lose money quietly: without an RTO rule, a partial-prepaid nudge or a pincode restriction, the returns eat the margin. We configure those at launch rather than after the first bad month.",
          "Shipping zones, weight slabs and free-shipping thresholds get set to match how you actually fulfil, and get tested with real orders before anything goes public.",
        ],
      },
      {
        heading: "After the first hundred orders",
        body: [
          "The work changes shape. Catalogue growth slows the site down. Apps accumulate and start conflicting. Sale configurations need building and unwinding. Reviews, wishlists and abandoned-cart flows become worth adding — and each one adds script weight that has to be paid for in speed somewhere.",
          "That ongoing tuning is what our support plans are for. A store is an operating system for a business, not a project that ends.",
        ],
      },
      {
        heading: "What a store costs against Mumbai agency rates",
        body: [
          "A Shopify or WooCommerce store put together from a theme sits at the bottom of our range and is genuinely the right answer for a first catalogue — you are paying for setup and configuration, not engineering. A custom-coded store starts an order of magnitude higher because it is a different product, and most businesses should not buy it until the template one is provably the constraint.",
          "Where budgets in this city go wrong is not the build. It is the running cost nobody quoted: gateway charges of roughly two percent a transaction, platform fees, and the returns from cash on delivery, which quietly eat more margin than all of it. We put those numbers in front of you before you commit, and the build bands are published rather than held for a call.",
          "Terms are 50% advance to start and 50% at payment-gateway integration — which for a store means you are paying the balance at the point the thing can actually take money.",
        ],
        links: [{ label: "See the price bands", href: "/pricing/" }],
      },
      {
        heading: "Where we are in Mumbai",
        body: [
          "The office is at GNM/95/347, Ground Floor, Banwari Compound, Mahim Rly Stn (E), Mahim, Mumbai 400016 — two minutes from Mahim station on the Western line, reachable from Bandra, Dadar and Andheri without a cab. For a store launch we will usually want to see product and packaging in person once; day to day after that runs remotely on shared documents and a written weekly update.",
        ],
      },
    ],
    caseStudies: [
      {
        slug: "clickngreet",
        title: "ClickNGreet",
        body: "A gifting storefront where the work was product discovery and a checkout that holds up under occasion-driven traffic spikes. Directly relevant to Mumbai's consumer and D2C businesses, where demand concentrates into a handful of weeks a year and the site either survives them or does not.",
      },
      {
        slug: "tatvivahtrends",
        title: "TatVivah Trends",
        body: "A multi-vendor wedding ethnic wear marketplace — sherwanis, kurtas and bridal sets filtered by occasion, with a three-thousand-product catalogue, Razorpay checkout and a returns and trust system built in. A useful reference for any Mumbai fashion or gifting brand weighing what a full marketplace build actually involves versus a single-vendor store.",
      },
      {
        slug: "maribiz-ai",
        title: "MariBiz.ai",
        body: "A B2B marketplace for maritime procurement — an RFQ engine, vendor verification, port-based service discovery and quote comparison for ship operators. Built for an industry Mumbai runs: relevant to any business selling B2B into shipping, trading or industrial supply chains rather than direct to a consumer.",
      },
    ],
    faqs: [
      {
        question: "What does an online store cost to run monthly?",
        answer:
          "Beyond our support plan: platform fees if you are on Shopify, payment gateway charges of roughly 2% per transaction, domain and any apps you add. We list these before you commit so there are no surprises in month two.",
      },
      {
        question: "Can you migrate my store from another platform?",
        answer:
          "Yes — products, customers, orders and URL structure. The URL redirects are the part people forget, and skipping them discards the search visibility the old store had earned.",
      },
      {
        question: "Will my store be fast enough for Google?",
        answer:
          "Core Web Vitals are part of the pre-launch checklist, not an afterthought. We measure on a throttled mobile connection because that is the condition Google grades you on.",
      },
      {
        question: "Who owns the store, the domain and the payment gateway?",
        answer:
          "You do, from day one — domain, hosting, repository, analytics and the gateway account all in your name. We work inside your accounts. This matters more for a store than for a brochure site, because the gateway account is tied to your GST and bank details and should never sit with a developer.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "Review rounds at agreed milestones through design and build, and we keep iterating until it matches the signed scope. New scope — an extra integration, a feature that was not in the agreement — is quoted before we build it.",
      },
      {
        question: "What are the payment terms?",
        answer:
          "50% advance to start, 50% at payment-gateway integration. For a store that means the balance falls due at the point it can take a real order, not at some arbitrary midpoint.",
      },
      {
        question: "Can you run the store for us remotely after launch?",
        answer:
          "Yes — sale configurations, courier integrations, catalogue growth and the performance regressions that come with all of it are exactly what the support plans cover, and none of it needs us in the room. The part that benefits from being in Mumbai is the initial product and packaging review.",
      },
      {
        question: "Do you have an office in Mumbai?",
        answer:
          "Yes — Banwari Compound, Mahim (E), near Mahim railway station. Meetings by appointment; the address and map are on our contact page.",
      },
    ],
    localProof: [],
    relatedServices: [
      { slug: "ecommerce-web-development-services", label: "E-commerce Web Development" },
      { slug: "website-development-services", label: "Website Development Services" },
      { slug: "seo-services", label: "SEO Services" },
    ],
    relatedLocations: [
      "website-development-company-in-mumbai",
      "seo-services-in-mumbai",
    ],
  },
]

export const locationSlugs = locationPages.map((page) => page.slug)

export function getLocationPage(slug: string): LocationPage | undefined {
  return locationPages.find((page) => page.slug === slug)
}
