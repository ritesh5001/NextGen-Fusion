import type { SeedPost } from './blog-seed'

/**
 * Answers to the questions buyers search before they ask for a quote: how long,
 * who should build it, when SEO starts working. Each post links into the
 * service and city pages it supports, which is what gives 500+ sales pages
 * something informational pointing at them.
 *
 * Timelines match weeksByType in Frontend/src/lib/estimator-pricing.ts, so the
 * blog never contradicts what the estimator tells a visitor.
 *
 *   npm run seed:blog -- guides
 */

const AUTHOR = 'NextGen Fusion'

export const guideBlogPosts: SeedPost[] = [
  {
    title: 'How Long Does It Take to Build a Business Website?',
    slug: 'how-long-to-build-a-business-website',
    excerpt:
      'A one-page site takes one to two weeks; an online store two to five; a custom web app four to ten. Here is where that time actually goes, and the three things that stretch it.',
    category: 'Development',
    cover_image: '/projects/hcbengineering/screenshot-1.png',
    author: AUTHOR,
    display_order: 7,
    published_at: '2026-10-02T09:00:00+05:30',
    introduction:
      '<p>The honest answer is that the build is rarely the slow part. Most website projects we see run late because content arrives late, decisions get made twice, or nobody owns sign-off. Below are the timelines we actually quote, week by week, and what you can do to stay inside them.</p>',
    content: `
<h2>Typical timelines by type of site</h2>
<ul>
<li><strong>Landing page or one-page site:</strong> 1–2 weeks.</li>
<li><strong>Business website (5–15 pages):</strong> 2–4 weeks.</li>
<li><strong>Online store (WooCommerce or Shopify):</strong> 2–5 weeks, depending on how many products and how much custom logic (COD rules, pincode checks, variants).</li>
<li><strong>Custom web application or SaaS:</strong> 4–10 weeks for a first release.</li>
</ul>
<p>Each extra feature adds roughly a week: online booking, a customer login area, a CRM integration, a second language. A dashboard with its own reports is closer to two.</p>

<h2>Where the weeks go</h2>
<h3>Week 1: scope and structure</h3>
<p>We agree what the site has to do, list every page, and decide what each page is for. This is the week that prevents rework later. If you skip it, you pay for it in week four.</p>
<h3>Weeks 1–2: design</h3>
<p>Home page and one inner page first. Once those are approved, the rest follow the same system quickly. Two rounds of changes is normal; five rounds means the brief was unclear.</p>
<h3>Weeks 2–4: build and content</h3>
<p>Pages are built, forms and payment gateways are connected, and content goes in. This is where most projects stall: the build is ready but the product photos, prices or team bios are not.</p>
<h3>Final week: testing and launch</h3>
<p>We test on real phones, check page speed, set up redirects from any old URLs, submit the sitemap to Google Search Console and connect analytics. Launch is a small event, not a crisis.</p>

<h2>The three things that stretch a timeline</h2>
<ol>
<li><strong>Content that isn't ready.</strong> If you need help writing pages, add one to two weeks and say so on day one.</li>
<li><strong>Too many approvers.</strong> One person signs off. Everyone else gives feedback to that person.</li>
<li><strong>Scope that grows mid-build.</strong> New ideas are welcome, but they go into a second phase, not into the current one.</li>
</ol>

<h2>Can it be done faster?</h2>
<p>Yes, within limits. A themed WordPress or Shopify site with your content ready can go live in days. What can't be rushed is thinking: a site launched without a clear job for each page usually gets rebuilt within a year.</p>
<p>For a ballpark on your own project, the <a href="/contact/">contact page</a> has a short estimator, and our <a href="/services/website-development-services/">website development service</a> page explains how we run projects. If you're in Lucknow, see <a href="/website-development-company-in-lucknow/">website development in Lucknow</a>.</p>
`,
    conclution:
      '<p>Plan for two to five weeks for most business sites and stores, have your content ready before the build starts, and give one person the final word. Those three things decide the timeline more than the developer does.</p>',
  },
  {
    title: 'Freelancer, Agency or DIY Builder: Who Should Build Your Website?',
    slug: 'freelancer-vs-agency-vs-diy-website',
    excerpt:
      'A website builder, a freelancer and an agency are each the right answer for someone. The deciding question is not price; it is who will look after the site in month thirteen.',
    category: 'Development',
    cover_image: '/projects/samaraha/screenshot-1.png',
    author: AUTHOR,
    display_order: 8,
    published_at: '2026-10-02T10:00:00+05:30',
    introduction:
      "<p>We are an agency, so read this with that in mind. But we turn down work that a website builder or a good freelancer would do better, and here is how we'd decide if we were in your seat.</p>",
    content: `
<h2>DIY website builders (Wix, Squarespace, Shopify themes)</h2>
<p><strong>Right for you if:</strong> you need a simple presence quickly, your budget is small, and you or someone on your team enjoys tinkering.</p>
<p><strong>Watch out for:</strong> monthly fees billed in dollars, limited control over speed and SEO, and the hours it takes. A builder is cheap in money and expensive in time.</p>

<h2>Freelancers</h2>
<p><strong>Right for you if:</strong> the project is well-defined, you can describe exactly what you want, and you have found someone with live work similar to yours.</p>
<p><strong>Watch out for:</strong> the single point of failure. The most common rescue job we take on is a site whose freelancer has moved on, with the hosting login, domain and source code in their name. Before you start, make sure the domain, hosting and code are in <em>your</em> accounts.</p>

<h2>Agencies</h2>
<p><strong>Right for you if:</strong> the site has to sell, integrate with other systems (payments, CRM, WhatsApp, inventory), or be maintained over years by people who will still be there.</p>
<p><strong>Watch out for:</strong> agencies that hand a junior your project after the sales call, or that lock you into their own platform. Ask who will actually build it, and whether you own the code.</p>

<h2>Five questions that decide it</h2>
<ol>
<li>Who will update the site after launch, and how often?</li>
<li>Does it need to take payments or connect to other software?</li>
<li>Will it need to rank on Google, or is it a brochure people reach by name?</li>
<li>What happens if the person who built it disappears?</li>
<li>Can you see three live sites this person or team built, and speak to one owner?</li>
</ol>

<h2>What to put in writing, whoever you choose</h2>
<ul>
<li>Domain and hosting registered in your name.</li>
<li>A fixed scope with a list of pages and features.</li>
<li>Who owns the design files and code at the end.</li>
<li>What support costs after launch, and what it covers.</li>
</ul>
<p>If you'd like a second opinion on a quote you already have, send it to us through the <a href="/contact/">contact page</a>. See also our <a href="/services/web-design-services/">web design</a> and <a href="/services/website-maintenance-services/">website maintenance</a> services.</p>
`,
    conclution:
      '<p>Choose a builder for speed and a tiny budget, a freelancer for a well-defined project with someone you can vet, and an agency when the site has to sell and be looked after for years. Whichever you pick, keep the domain, hosting and code in your own name.</p>',
  },
  {
    title: 'How Long Does SEO Take for a Local Business in India?',
    slug: 'how-long-does-seo-take-local-business-india',
    excerpt:
      'Fixes to a broken site show up in weeks; ranking for competitive city searches takes four to nine months. What happens in each phase, and the signs that an SEO campaign is working before rankings move.',
    category: 'SEO',
    cover_image: '/projects/thegrafftee/screenshot-1.png',
    author: AUTHOR,
    display_order: 9,
    published_at: '2026-10-02T11:00:00+05:30',
    introduction:
      '<p>Anyone who promises page one in thirty days is either targeting a search nobody makes or about to do something that gets your site penalised. Here is what a realistic SEO timeline looks like for a local business in an Indian city, and how to tell if it is working.</p>',
    content: `
<h2>Months 1–2: fix what is stopping Google</h2>
<p>Most local business sites we audit have the same problems: pages Google can't index, slow mobile load times, titles that don't say what the business does or where, and no Google Business Profile, or one with a different address from the website. Fixing these can move things within weeks, because you are removing a ceiling rather than building authority.</p>

<h2>Months 2–4: pages that match real searches</h2>
<p>People search "<em>service</em> in <em>city</em>", and they search questions: how much, how long, which is better. A site with one Services page can't rank for twelve services. Each service you want to be found for needs its own page that genuinely answers that search, and supporting articles that answer the questions around it.</p>

<h2>Months 3–9: authority and reviews</h2>
<p>For competitive searches ("website development company in Lucknow", "dentist in Gomti Nagar"), the sites above you have years of links, reviews and mentions. You close that gap with Google reviews from real customers, listings on reputable directories with identical name, address and phone, and being mentioned by local publications and partners.</p>

<h2>Signs it is working before rankings move</h2>
<ul>
<li>More pages indexed in Google Search Console.</li>
<li>Impressions rising, even while clicks are flat.</li>
<li>Your Google Business Profile showing up for more searches and getting more calls and direction requests.</li>
<li>Average position improving on the long, specific searches first.</li>
</ul>

<h2>What slows it down</h2>
<ol>
<li>Changing the site's structure or URLs mid-campaign without redirects.</li>
<li>Different addresses or phone numbers across the site, Google and directories.</li>
<li>Hundreds of near-identical city pages. Google treats those as doorway pages.</li>
</ol>
<p>Our <a href="/services/seo-services/">SEO services</a> page explains how we run campaigns. For Lucknow businesses, see <a href="/seo-services-in-lucknow/">SEO services in Lucknow</a>; in Mumbai, <a href="/seo-services-in-mumbai/">SEO services in Mumbai</a>.</p>
`,
    conclution:
      '<p>Expect technical fixes to show in weeks, new service pages in two to four months, and competitive city rankings in four to nine. Judge the campaign by impressions, indexed pages and Business Profile activity while you wait.</p>',
  },
]
