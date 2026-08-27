/**
 * Launch set for /blog.
 *
 * Every post maps to a service page and links to it, which is the whole point:
 * the twelve service pages are commercial pages with no supporting
 * informational content pointing at them. Figures come from the real rate card
 * in Frontend/src/lib/estimator-pricing.ts and from projects on /work, so the
 * blog never contradicts what the estimator quotes a visitor.
 */

export type SeedPost = {
  title: string
  slug: string
  excerpt: string
  introduction: string
  content: string
  conclution: string
  cover_image: string
  category: string
  author: string
  display_order: number
  published_at: string
}

const AUTHOR = 'NextGen Fusion'

export const blogSeedPosts: SeedPost[] = [
  {
    title: 'Shopify vs WooCommerce for Indian D2C Brands',
    slug: 'shopify-vs-woocommerce-indian-d2c-brands',
    excerpt:
      'We run more than 50 live WooCommerce stores. Here is the honest comparison for an Indian D2C brand — real monthly costs in rupees, COD handling, and the point where each platform stops making sense.',
    category: 'E-commerce',
    cover_image: '/projects/samaraha/screenshot-1.png',
    author: AUTHOR,
    display_order: 1,
    published_at: '2026-08-05T09:00:00+05:30',
    introduction:
      '<p>Most Shopify-versus-WooCommerce articles are written for a US store owner paying in dollars, shipping domestically, and never touching cash on delivery. None of that describes an Indian D2C brand. This is the comparison we actually give clients, based on the WooCommerce stores we run and maintain.</p>',
    content: `
<h2>The cost difference is not the subscription</h2>
<p>Shopify's plan fee is the number everyone compares, and it is the least interesting one. The figure that matters for an Indian brand is what leaves your account per order once you add the platform fee, the payment gateway cut, and any app subscriptions you are paying in dollars.</p>
<p>WooCommerce has no platform fee. You pay for hosting, a theme, and whatever plugins you need. On the stores we build, that lands around <strong>&#8377;4,000 to &#8377;10,000</strong> to set up depending on how much custom functionality you need, plus hosting. There is no per-order platform cut at all — your only transaction cost is the payment gateway.</p>
<p>Shopify charges its plan fee monthly in USD, which means your cost moves with the exchange rate, and it takes an additional cut on every transaction unless you use Shopify Payments — which is not available in India. That last detail is the one people miss. In India you will be using Razorpay, Cashfree, or PayU through Shopify, so you pay the gateway's percentage <em>and</em> Shopify's third-party transaction fee on top.</p>

<h2>Cash on delivery changes the maths</h2>
<p>COD is still a large share of orders for most Indian D2C brands outside the metros. It is also the single biggest source of operational pain: partial deliveries, RTO, reconciliation.</p>
<p>WooCommerce handles COD natively and lets you gate it however you want — by pincode, by cart value, by product category, by customer history. We have built all of those. On Shopify the same rules usually mean an app subscription, and app subscriptions are billed in dollars per month, forever.</p>
<p>If COD is more than a fifth of your orders, model the app costs before you commit to Shopify. Three apps at $15 a month is roughly &#8377;45,000 a year, which is more than the entire build cost of a standard WooCommerce store.</p>

<h2>Where Shopify genuinely wins</h2>
<p>We are not anti-Shopify, and it would be dishonest to pretend WooCommerce is always right.</p>
<ul>
<li><strong>You have no technical person and never will.</strong> Shopify's hosting, security patching, and uptime are somebody else's problem. WooCommerce needs someone to keep WordPress and its plugins updated. If that person does not exist, a WooCommerce store slowly rots.</li>
<li><strong>You are scaling fast and unpredictably.</strong> Shopify absorbs traffic spikes without you thinking about it. A WooCommerce store on cheap shared hosting will fall over during a sale — the fix is proper hosting and caching, but that is a decision someone has to make in advance.</li>
<li><strong>You need to launch this week.</strong> A themed Shopify store can be live in days.</li>
</ul>

<h2>Where WooCommerce wins</h2>
<ul>
<li><strong>You need rules that are specific to your business.</strong> Every non-standard requirement on Shopify is an app or a Shopify Plus conversation. On WooCommerce it is code you own. When we built a saree store that needed filtering by weave type, price band, and festive collection simultaneously, that was a straightforward build.</li>
<li><strong>Content and SEO are part of your strategy.</strong> WordPress is a publishing platform that grew a store attached to it. If you plan to rank for informational queries and funnel that traffic to products, you are already on the better tool.</li>
<li><strong>You want to own the thing.</strong> Your database, your files, your host. You can move it. That matters more to some founders than others, but it is real.</li>
</ul>

<h2>The question that actually decides it</h2>
<p>Not "which is better" — ask <strong>who maintains this in eighteen months</strong>.</p>
<p>If the answer is "an agency or a developer we work with", WooCommerce gives you more control, lower running costs, and better content tooling. If the answer is "nobody, honestly", pay Shopify to be that person. A neglected WooCommerce store with six outdated plugins is worse than either.</p>

<h2>What we do in practice</h2>
<p>Most of the D2C brands we work with are on WooCommerce with Razorpay for payments and Shiprocket for fulfilment — a combination that covers COD, tracking, and returns without a stack of dollar-billed apps. We use the same setup across our store builds, which means a fix we work out on one store benefits all of them.</p>
<p>If you are weighing this up for a specific brand, our <a href="/services/ecommerce-web-development-services/">e-commerce development service</a> page covers what a build includes, and <a href="/work/">our work</a> has live stores you can click through and judge for yourself.</p>
`,
    conclution:
      '<p>The platform matters less than the honest answer to the maintenance question. Decide that first, then pick the tool that fits the answer — not the other way round.</p>',
  },

  {
    title: 'What a Business Website Actually Costs in India in 2026',
    slug: 'business-website-cost-india-2026',
    excerpt:
      'Real rupee figures from our own rate card — what a landing page, a business site, a store, and a custom platform each cost, what drives the number up, and the recurring costs nobody quotes you.',
    category: 'Pricing',
    cover_image: '/og/og-default.png',
    author: AUTHOR,
    display_order: 2,
    published_at: '2026-08-08T09:00:00+05:30',
    introduction:
      '<p>Ask five agencies what a website costs and you will get five ranges wide enough to be useless. So here is our actual rate card, the same numbers our project estimator quotes, with an explanation of what moves them.</p>',
    content: `
<h2>The four bands</h2>
<p>Almost every enquiry we get falls into one of four shapes. These are starting figures on a WordPress build versus a custom-coded one.</p>
<ul>
<li><strong>Landing page or portfolio</strong> — from &#8377;4,000 on WordPress, from &#8377;10,000 custom-coded.</li>
<li><strong>Online store, standard</strong> — from &#8377;4,000 on WooCommerce, from &#8377;50,000 custom-coded.</li>
<li><strong>Online store, premium</strong> — from &#8377;6,000 on WooCommerce, from &#8377;80,000 custom-coded. Extra-premium runs &#8377;10,000 and &#8377;1,00,000 respectively.</li>
<li><strong>App, platform, or SaaS product</strong> — &#8377;15,000 to &#8377;30,000 on WordPress if it can be done there at all, &#8377;50,000 to &#8377;1,20,000 custom-coded.</li>
</ul>
<p>The gap between the WordPress and custom columns is the entire argument. WordPress is cheaper because most of the work is already done and tested. Custom code costs more because everything is built for you specifically — which is worth paying for when your requirements do not fit an existing plugin, and a waste when they do.</p>

<h2>What actually adds to the number</h2>
<p>The base is rarely the final figure. Features are what move it, and here is roughly what each one adds to a custom build:</p>
<ul>
<li>Payment gateway integration — &#8377;8,000</li>
<li>User accounts and authentication — &#8377;10,000</li>
<li>A real dashboard — &#8377;30,000</li>
<li>Booking or appointment system — &#8377;12,000</li>
<li>CRM integration — &#8377;15,000</li>
<li>CMS so you can edit content yourself — &#8377;8,000</li>
<li>Blog — &#8377;5,000</li>
<li>Multi-language — &#8377;8,000</li>
<li>SEO setup — &#8377;8,000</li>
<li>Analytics — &#8377;5,000</li>
<li>WhatsApp integration — &#8377;2,000</li>
</ul>
<p>On a WordPress build, the same features cost roughly a quarter of that, because you are configuring a plugin rather than writing the feature. Extra pages beyond the included set run about &#8377;1,000 each, and a premium design treatment adds around 10 per cent across the board.</p>
<p>Add three or four features to a base and you can see how a "&#8377;50,000 website" becomes &#8377;1,00,000 without anyone being dishonest. Ask for the feature breakdown, not just the total.</p>

<h2>The costs nobody puts in the quote</h2>
<p>These are yours regardless of who builds the site, and they are the ones that surprise people in month three.</p>
<ul>
<li><strong>Domain</strong> — &#8377;800 to &#8377;1,500 a year.</li>
<li><strong>Hosting</strong> — &#8377;3,000 a year at the cheap end, and worth more than that for a store. Shared hosting is where sale-day crashes come from.</li>
<li><strong>Payment gateway</strong> — around 2 per cent per transaction. Not a build cost, but it is the number that scales with your success.</li>
<li><strong>Maintenance</strong> — WordPress core, theme, and plugin updates. Skipping this is how sites get compromised. Budget for it or buy a plan.</li>
<li><strong>Content</strong> — if you do not have copy and photography ready, someone has to make them. This is the single most common reason projects run late.</li>
</ul>

<h2>Why the cheapest quote usually costs more</h2>
<p>A &#8377;4,000 landing page is a real thing and we will build one. What it is not is a &#8377;4,000 store with custom filtering, a booking flow, and a CRM hook — and the quotes that promise that are quietly planning to deliver a template with the requirements dropped.</p>
<p>The pattern we see repeatedly: a business pays for a cheap build, discovers six months in that it cannot do the one thing the business actually needed, and pays again for the rebuild. The second build costs more than doing it properly would have, because now there is data to migrate and a live site to keep running.</p>
<p>Judge a quote on whether it names your specific requirements, not on the total.</p>

<h2>Getting a number for your project</h2>
<p>Our <a href="/services/website-development-services/">website development service</a> page covers what a build includes at each level. If you want a figure for your own scope, the project estimator on our homepage runs the same rate card described here and gives you a range in about two minutes — no call required.</p>
`,
    conclution:
      '<p>Any agency that gives you a price before understanding your requirements is guessing, and any agency that will not show you how the price is composed is hiding something. Ask for the breakdown.</p>',
  },

  {
    title: 'Next.js or WordPress for a Service Business?',
    slug: 'nextjs-vs-wordpress-service-business',
    excerpt:
      'We build in both. For most service businesses WordPress is the right answer — here is the honest case for it, and the four situations where custom code genuinely pays for itself.',
    category: 'Development',
    cover_image: '/projects/thegrafftee/screenshot-1.png',
    author: AUTHOR,
    display_order: 3,
    published_at: '2026-08-12T09:00:00+05:30',
    introduction:
      '<p>Developers like this question because the answer feels like a statement about craft. It is not. It is a question about who edits the site next month and what the site has to do that a plugin cannot.</p>',
    content: `
<h2>Start with the uncomfortable answer</h2>
<p>For a typical service business — a clinic, a law firm, a contractor, a consultancy — <strong>WordPress is usually correct</strong>, and we say so even though custom builds are the more profitable project for us.</p>
<p>A service business site needs to explain services credibly, rank for local queries, collect enquiries, and be editable by a non-technical person. WordPress does all four out of the box. Custom code does all four too, but you pay several times more and the editing story is worse unless you also build a CMS.</p>
<p>The honest test: if you cannot name a requirement that WordPress genuinely cannot meet, you do not need custom code.</p>

<h2>When Next.js earns its cost</h2>
<p>There are real cases, and we build them regularly.</p>
<h3>1. The site is really an application</h3>
<p>Dashboards, role-based access, complex state, real-time updates. Once users log in and <em>do</em> things rather than read things, WordPress starts fighting you. The B2B marketplace we built handles RFQ workflows, quote comparison, and live messaging — that was never a WordPress project.</p>
<h3>2. You have an unusual data model</h3>
<p>If your content does not look like posts and pages, forcing it into custom post types works until it does not. A multi-vendor platform with sellers, listing prices, margin snapshots and multi-seller orders is a relational data problem, and you want a real schema.</p>
<h3>3. Integrations are the product</h3>
<p>When the site's job is to sit between a CRM, an ERP, a payment provider, and a shipping API, you are writing integration code either way. Better to write it in a codebase built for it than inside WordPress hooks.</p>
<h3>4. Performance is a competitive advantage</h3>
<p>Not "we want it fast" — everyone wants that, and a well-built WordPress site on decent hosting is fast. This is for cases where measurable latency changes conversion enough to justify the build cost.</p>

<h2>The maintenance trade nobody mentions</h2>
<p>WordPress needs regular updating — core, theme, plugins — and if that stops, the site becomes a liability. It is a small ongoing cost that does not go away.</p>
<p>Custom code does not need plugin updates, but it needs a developer who understands the codebase whenever anything changes. Add a page and someone deploys. Change your service list and someone deploys. Unless you built a CMS, which is more cost.</p>
<p>Neither is maintenance-free. WordPress spreads a small cost across the year; custom concentrates it in whoever holds the code. Pick the shape that matches how your business actually operates.</p>

<h2>The hybrid worth knowing about</h2>
<p>You do not have to choose for the whole site. A common setup is a marketing site on WordPress, editable by the marketing team, with a custom application on a subdomain for the part that is genuinely an app. Each side uses the tool that fits, and neither compromises for the other.</p>
<p>This is usually the right answer for a service business that also has a client portal or a booking engine.</p>

<h2>How to decide in five minutes</h2>
<ol>
<li>Write down every requirement, including the ones you think are obvious.</li>
<li>Mark the ones a standard plugin cannot do. Be strict — "we want it to look premium" is not one of them.</li>
<li>No marks? WordPress. Put the saved budget into content and SEO, which will do more for you than the framework.</li>
<li>Two or more marks in the same area? That area probably wants custom code, and possibly only that area.</li>
</ol>
<p>Our <a href="/services/website-development-services/">website development</a> and <a href="/services/software-development-services/">software development</a> pages describe how we approach each. If you are unsure which side of the line you fall on, the honest scoping conversation is free.</p>
`,
    conclution:
      '<p>The framework is not the interesting decision. What your site has to do, and who keeps it running, is — and those two answers pick the tool for you.</p>',
  },

  {
    title: 'Choosing a Payment Gateway for an Indian Online Store',
    slug: 'payment-gateway-indian-online-store',
    excerpt:
      'Razorpay, Cashfree, PayU and the rest look identical on a pricing page. What separates them in practice is settlement, refund handling, and how they behave the day something breaks.',
    category: 'E-commerce',
    cover_image: '/projects/tatvivahtrends/screenshot-1.png',
    author: AUTHOR,
    display_order: 4,
    published_at: '2026-08-16T09:00:00+05:30',
    introduction:
      '<p>Every Indian gateway advertises roughly 2 per cent and every one supports UPI, cards, net banking, and wallets. On paper they are interchangeable. They are not, and the differences only show up after you are live.</p>',
    content: `
<h2>The rate is the least important number</h2>
<p>The headline percentage is nearly identical across providers, and it is negotiable at volume. Three things matter more.</p>
<h3>Settlement cycle</h3>
<p>How long until money is in your bank? T+2 is standard, T+1 is available, instant settlement usually costs extra. For a business buying stock against incoming revenue, one day of working capital is worth more than a rate difference of a tenth of a per cent.</p>
<h3>What a refund actually costs</h3>
<p>Some providers return the transaction fee on a refund; some keep it. If you sell apparel, where returns are structural rather than exceptional, this is a real line item. Ask explicitly and get the answer in writing.</p>
<h3>Failure rate</h3>
<p>Not published anywhere and it varies by bank and by method. The only way to know is to run traffic. This is one reason we suggest going live with the most established option and revisiting later rather than optimising the choice up front.</p>

<h2>The integration detail that causes real losses</h2>
<p>Whatever you pick, <strong>verify the webhook signature on your server and treat the webhook as the source of truth</strong> — not the browser redirect.</p>
<p>The redirect back to your site after payment is a convenience for the user. It is not proof of anything. It can be lost when the customer closes the tab, killed by a flaky mobile connection, or forged outright. If your order is marked paid because a browser landed on a success URL, you have a hole.</p>
<p>The correct flow, and the one we implement on every store:</p>
<ol>
<li>Customer pays. Show them a pending state.</li>
<li>The gateway posts a webhook to your server.</li>
<li>Your server verifies the signature against your secret. Anything that fails verification is discarded.</li>
<li>Only after verification does the order become paid and fulfilment begin.</li>
</ol>
<p>On the multi-vendor platform we built, this mattered doubly: one payment fans out into separate seller orders, so an unverified state change would have dispatched real inventory against a payment that never landed.</p>

<h2>Handle these before launch, not after</h2>
<ul>
<li><strong>Duplicate webhooks.</strong> Gateways retry. Your handler must be idempotent, or a retried notification will double-count an order.</li>
<li><strong>Late webhooks.</strong> They can arrive minutes later. The customer will refresh. Design a pending state that does not look like failure.</li>
<li><strong>Partial refunds.</strong> Multi-item orders need them. Check the provider supports it through the API, not just the dashboard.</li>
<li><strong>Reconciliation.</strong> Someone has to match settlements against orders monthly. Decide who before you have three hundred orders to reconcile by hand.</li>
</ul>

<h2>A practical recommendation</h2>
<p>For most Indian stores, start with <strong>Razorpay</strong>. The documentation is the best of the group, the dashboard is usable by a non-developer, and the integration is well-trodden — which means when something breaks at 11pm, the answer already exists somewhere. We use it across the stores we build for exactly that reason.</p>
<p>Look seriously at alternatives when you have specific pressure: a materially better rate at your volume, a settlement cycle you need, or a payment method your customers want that your current provider handles badly.</p>
<p>Do not run two gateways to hedge. You double the reconciliation work and the failure surface for a benefit you will not measure.</p>
<p>Payment integration is part of every store we build — our <a href="/services/ecommerce-web-development-services/">e-commerce development</a> page covers what that includes, and <a href="/services/api-integration-services/">API integration</a> covers the cases where payments have to talk to an ERP or CRM as well.</p>
`,
    conclution:
      '<p>Pick the provider with the best documentation and the settlement cycle your cash flow needs, then spend your attention on the webhook handling. That is where the money is actually lost.</p>',
  },

  {
    title: 'Why Your Service Pages Do Not Rank',
    slug: 'why-service-pages-dont-rank',
    excerpt:
      'A diagnosis we have run on our own site and on client sites: the pages you most want to rank are usually the ones with the fewest internal links pointing at them, and no supporting content at all.',
    category: 'SEO',
    cover_image: '/og/og-default.png',
    author: AUTHOR,
    display_order: 5,
    published_at: '2026-08-20T09:00:00+05:30',
    introduction:
      '<p>You wrote two thousand words on a service page. It is well structured, the keyword is in the title, the meta description is written. It sits on page four. This is almost never a content quality problem.</p>',
    content: `
<h2>Check the internal links first</h2>
<p>Before touching the copy, count how many links on your own site point at that page. Not the number of pages on your site — the number of links to <em>that specific page</em>.</p>
<p>For most service businesses the answer is one: an entry in a services hub that itself has no navigation link. Sometimes zero, because the main navigation points at a homepage anchor like <code>/#services</code> rather than the real page.</p>
<p>Internal linking is one of the clearest signals you control. A page nothing links to reads as a page you do not consider important. We found exactly this on our own site during a technical audit — six of our twelve service pages were reachable only through a hub that was not itself linked from anywhere. The fix was one array in the footer.</p>
<p>Do this today: add every service page to your footer with its real URL. It is ten minutes and it is the cheapest ranking gain available to most sites.</p>

<h2>Commercial pages need informational pages pointing at them</h2>
<p>This is the structural problem, and it is why most service pages plateau.</p>
<p>A service page targets a commercial query — "web development company in Lucknow", "SEO services India". Those queries are the most competitive on your entire site, and every competitor is also targeting them with a similar page.</p>
<p>What separates the sites that rank is that their commercial pages sit inside a cluster of informational content. Someone searching "what does a business website cost in India" is not ready to hire, but they are the same person who will search "web development company" three weeks later. If you answered the first question, you have a link, a brand impression, and a page that passes authority to the commercial page.</p>
<p>Twelve service pages with no supporting content is twelve isolated pages competing on domain authority alone — the one factor a smaller agency loses on.</p>

<h2>Stop your own pages competing with each other</h2>
<p>If your SEO page and your PPC page both target "digital marketing services", they split the signal and neither wins. This happens naturally when pages are generated from one template with the service name swapped.</p>
<p>Give each page one primary query it owns. Everything else on that page supports it. If two pages want the same query, either merge them or genuinely differentiate them.</p>
<p>A related tell: if all your service pages share the same eleven section headings in the same order with only the service name changed, a quality rater will read that as programmatic — and so will the algorithm that approximates one. Pick your three or four money services and give those pages real client numbers, a named case study, and original screenshots.</p>

<h2>The technical issues that quietly cap everything</h2>
<p>Content work cannot fix these, so check them first:</p>
<ul>
<li><strong>Both hostnames resolving.</strong> If <code>example.com</code> and <code>www.example.com</code> both return 200 with no redirect, your authority is split across two sites and Google picks a canonical for you.</li>
<li><strong>Client-rendered content.</strong> If your listing pages fetch content in the browser, a crawler sees a loading spinner. View source — actually view source, not inspect element — and look for your content.</li>
<li><strong>Pages missing from the sitemap.</strong> Product and service pages that exist but are not listed have no discovery path.</li>
<li><strong>Dishonest lastmod dates.</strong> If every URL in your sitemap claims it changed today, the field stops being trusted for your whole domain.</li>
</ul>

<h2>The order to work in</h2>
<ol>
<li>Fix anything blocking crawling or indexing. Nothing else matters until this is done.</li>
<li>Add internal links from the footer and navigation to every page you want to rank.</li>
<li>Publish informational content that answers the questions preceding your commercial query, and link each piece to its service page.</li>
<li>Differentiate your top service pages with real specifics.</li>
<li>Then, and only then, worry about backlinks.</li>
</ol>
<p>Our <a href="/services/seo-services/">SEO services</a> page covers how we run this on client sites. If you want the technical layer checked properly, that is where to start — the content work is wasted until the crawling issues are gone.</p>
`,
    conclution:
      '<p>Rewriting a page that nothing links to and nothing supports will not move it. Fix the structure around the page, and the page you already wrote will start doing its job.</p>',
  },

  {
    title: 'What We Learned Building a Multi-Vendor Marketplace',
    slug: 'building-multi-vendor-marketplace-lessons',
    excerpt:
      'Notes from shipping a wedding-wear marketplace with 3,000+ products across a web store, an admin layer, and a mobile app — the pricing model, the checkout problem, and what we would do differently.',
    category: 'Case Study',
    cover_image: '/projects/tatvivahtrends/screenshot-2.png',
    author: AUTHOR,
    display_order: 6,
    published_at: '2026-08-24T09:00:00+05:30',
    introduction:
      '<p>A marketplace is not a store with extra user accounts. Two problems make it a different kind of build, and both surface late enough to be expensive if you did not plan for them.</p>',
    content: `
<h2>Problem one: there is more than one price</h2>
<p>In a single-brand store a product has a price. In a marketplace it has at least three, and confusing them corrupts your books.</p>
<ul>
<li><strong>Seller price</strong> — what the vendor wants.</li>
<li><strong>Listing price</strong> — what the customer sees, set by the platform.</li>
<li><strong>Margin</strong> — the difference, which is your revenue.</li>
</ul>
<p>The trap is treating margin as a calculation rather than a record. If margin is derived at read time from the current seller price, then every historical order silently changes whenever a vendor edits their price. Last quarter's revenue moves. Reconciliation stops matching.</p>
<p>We solved it by <strong>snapshotting the margin at order time</strong>. The order stores what the seller was owed and what the platform kept, as facts, at the moment of purchase. Prices can change afterwards and history stays correct.</p>
<p>If you are building a marketplace, decide this in week one. Retrofitting it means backfilling orders with data you may no longer have.</p>

<h2>Problem two: one payment, several orders</h2>
<p>A customer fills a cart with items from three sellers and pays once. That single payment has to become three seller orders, each with its own fulfilment, tracking, and payout.</p>
<p>This breaks a lot of assumptions:</p>
<ul>
<li><strong>Partial fulfilment is normal.</strong> One seller ships next day, another takes a week. "Order status" is no longer a single value.</li>
<li><strong>Returns are per-seller.</strong> A customer returning one item must not disturb the other two.</li>
<li><strong>Checkout must be atomic.</strong> Either every seller order is created or none is. A half-written checkout leaves a customer charged for items no seller was told to ship.</li>
</ul>
<p>We made checkout atomic and verified the payment webhook server-side before any fulfilment began. Under concurrency — two customers buying the last item at once — the ordering has to be correct or you oversell, so inventory checks belong inside the same transaction as order creation, not before it.</p>

<h2>Structure the backend before it gets big</h2>
<p>We used a layered monolith rather than microservices: controllers for HTTP, services for business rules, repositories for data access. Not fashionable, and correct for this.</p>
<p>Microservices would have added deployment and network complexity to a team that needed to ship. The layering gave us the thing that actually mattered — business rules in one place, testable, not scattered through route handlers — while the catalogue grew past three thousand products.</p>
<p>The rule we would repeat: <em>separate the layers early, split the services late.</em> Layering is nearly free at the start and expensive to introduce later. Splitting into services is the opposite.</p>

<h2>Merchandising is a product problem</h2>
<p>Wedding wear is bought by occasion, not category. Nobody searches "sherwani, size 40". They search for something to wear to a friend's haldi.</p>
<p>So the catalogue is browsable by occasion — wedding, haldi, mehendi — alongside conventional categories. This is a merchandising decision that shaped the data model, and it had to be understood before the schema was written. Talk to the client about how their customers actually shop before you design the taxonomy.</p>

<h2>Quality control has to be part of the build</h2>
<p>Open a marketplace to independent sellers and you inherit their photography, their descriptions, and their pricing. Without a gate, the catalogue degrades quickly and the customer blames you, not the seller.</p>
<p>We built seller verification and a product approval pipeline: nothing goes live without review. It is unglamorous and it is the difference between a marketplace and a listings dump.</p>

<h2>What we would do differently</h2>
<ul>
<li><strong>Build the seller dashboard earlier.</strong> We treated it as secondary to the buyer experience. Sellers are users too, and a bad seller panel means bad listings, which means a bad storefront. We ended up doing a dedicated performance pass on it.</li>
<li><strong>Design notifications as a domain, not a feature.</strong> Order placed, shipped, returned, approved, rejected, payout sent — it multiplies fast. A queued worker from the start beats bolting one on.</li>
<li><strong>Agree the payout schedule in writing first.</strong> It drives data model decisions and it is a business conversation, not a technical one.</li>
</ul>
<p>The platform runs across an API, a web storefront, and a mobile app sharing one domain model. If you are planning something similar, our <a href="/services/software-development-services/">software development</a> page covers how we scope this kind of build, and <a href="/work/">our work</a> has the live result.</p>
`,
    conclution:
      '<p>Marketplaces fail on money handling and trust, not on features. Get the pricing model and the checkout right first — everything else can be improved after launch, and those two cannot.</p>',
  },
]
