# GEO Audit Report: NextGen Fusion

**Audit Date:** 2026-09-18
**URL:** https://www.nextgenfusion.in/
**Business Type:** Agency / Services (web development, SEO, digital products — Lucknow & Mumbai, India)
**Pages Analyzed:** 57 (full sitemap crawl) + robots.txt, llms.txt, sitemap.xml

---

## Executive Summary

**Overall GEO Score: 56/100 (Poor — but atypically shaped)**

This site's problem is not its content and not its engineering. Both are strong: technically it is one of the cleanest builds this audit format encounters — 57/57 pages return 200, every page is server-rendered with a title, description, self-referencing canonical, exactly one `<h1>` and structured data, and zero images lack alt text. The editorial writing on `/about/`, `/pricing/`, the 12 city pages and the single blog post is genuinely top-decile for an agency, publishing real prices, explicit exclusions and disclosed bias.

The score is dragged down by one category. **Brand Authority scores 8/100** — outside four client footer backlinks and one Instagram account, NextGen Fusion does not exist as a recognizable entity to any AI system, while at least six other organizations and the entire nuclear-fusion industry contest its name. Two structural defects compound this: the homepage's best FAQ content renders only inside `<script>` tags, and the site contradicts itself on project timelines and ecommerce pricing across four pages.

A 56 composed this way is very different from a 56 spread evenly. The expensive work is done. What remains is mostly off-site registration and a handful of small code fixes.

### Score Breakdown

| Category | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Citability | 78/100 | 25% | 19.5 |
| Brand Authority | 8/100 | 20% | 1.6 |
| Content E-E-A-T | 60/100 | 20% | 12.0 |
| Technical GEO | 84/100 | 15% | 12.6 |
| Schema & Structured Data | 49/100 | 10% | 4.9 |
| Platform Optimization | 58/100 | 10% | 5.8 |
| **Overall GEO Score** | | | **56/100** |

---

## Critical Issues (Fix Immediately)

### C1. No privacy policy, terms of service, or cookie policy exist anywhere
**Verified:** `/privacy/`, `/privacy-policy/`, `/terms/`, `/terms-and-conditions/`, `/terms-of-service/`, `/cookie-policy/`, `/legal/`, `/disclaimer/`, `/refund-policy/` — all return **404**. The homepage footer contains no legal links at all.

The site operates Login/Sign Up, contact forms collecting name, email and phone, GA4/GTM tracking, and a `/store/` taking live Razorpay payments. This is DPDP Act 2023 exposure, a Razorpay merchant-policy requirement, and a foundational trust failure that every AI system checks for.

**Fix:** Publish all three, link them from the global footer.

### C2. Live placeholder text in the two policy pages that do exist
**Verified on `/store/refunds/`:** `Last updated: [DATE]` (×2), `within [7] days`, `within [5] business days`, `within [2] business days`. **`/store/license/`** carries `[DATE]` ×2.

A refund policy governing real money with unreplaced square brackets is worse than none — it signals nobody has read the page since it was scaffolded. Both pages are reachable only from `/store/`, not the footer.

### C3. Brand is an unresolvable entity, with severe name collision
`Organization.sameAs` contains exactly one URL (Instagram). No Wikipedia, Wikidata, LinkedIn company page, Google Business Profile, Clutch, GoodFirms, DesignRush, Crunchbase, Reddit or YouTube presence was found.

Meanwhile at least seven entities contest the exact string "NextGen Fusion" — including **NextGen Fusion Inc** (Colorado employment agency, which holds `instagram.com/nextgenfusion`), **NextGen Fusion Network**, **HDS NextGen Fusion**, and a YouTube channel holding `@nextgenfusion`. The ambient meaning of the token sequence is nuclear fusion energy. A stale duplicate, `nextgenfusion.framer.website`, is still indexed and now 404s.

Retrieval without entity resolution produces hedged, unattributed answers. This is the single largest constraint on the site's AI visibility.

### C4. Malformed image URLs in structured data (code bug)
`Frontend/src/lib/seo.ts:33` documents that asset URLs "must NOT append a trailing slash," and line 173 uses `assetUrl()` correctly. Two call sites ignore it:

- `Frontend/src/app/about/page.tsx:90` → `https://www.nextgenfusion.in/member/ritesh-giri.png/` (all 4 team photos)
- `Frontend/src/app/work/[slug]/page.tsx:108` → all case-study `Article.image` entries, **plus `coverImage` duplicated** as `images[0]`

Every one 308-redirects. Validators commonly report redirecting structured-data images as unfetchable. **One-word fix per line:** `absoluteUrl` → `assetUrl`.

### C5. `Product` schema missing required `image` on ~30 store items
`/store/[slug]/` emits `Product` with `name`, `sku`, `category`, `brand`, `offers` but no `image` — Google lists it as required. Every store product is ineligible for a Product rich result. File: `Frontend/src/app/store/[slug]/page.tsx`.

---

## High Priority Issues

### H1. Homepage FAQ answers exist in no rendered DOM node
**Verified rigorously.** The string `"Most websites are delivered in 2-3 weeks"` appears exactly twice in the homepage HTML — once in the `application/ld+json` block, once in the Next.js RSC flight payload (`self.__next_f.push`). **Both are inside `<script>` tags.** With all scripts stripped, the FAQ section renders 8 questions and zero answers.

**Root cause:** `Frontend/src/components/faq-section.tsx:352` — `{activeIndex === index && (...)}` conditionally *mounts* the answer, so on server render none exist.

Google reads JSON-LD; Perplexity, ChatGPT search and Claude's fetcher work primarily from rendered text. The site's best commercial answers are hidden from three of the four engines that matter. **Fix:** always render the answer node, animate height/opacity via CSS instead of conditional mounting (or use native `<details>`).

### H2. Unattributed testimonials and portfolio cards on 8 service pages
**Verified counts across all 12 service pages:** 17 anonymous testimonials and 28 "Case Preview" cards.

The distribution matters:
- The **4 rewritten pages** (`website-development-services`, `ecommerce-web-development-services`, `web-design-services`, `seo-services`) carry **0 anonymous testimonials**, and their 12 Case Preview cards name **real clients** — TatVivah Trends, MariBiz.ai, HCB Engineering. These are legitimate; only the "Case Preview" label is poor.
- The **8 untouched pages** carry all **17 anonymous testimonials** ("— CTO, B2B SaaS Company", "— Engineering Lead, Product Startup") and **16 unattributed Case Preview cards** ("SaaS Platform Migration / B2B Software — ... reducing infrastructure costs 35%").

These describe capabilities — AWS/Kubernetes/Terraform/Datadog — appearing in none of the 18 case studies, and sit oddly beside a four-person Next.js/WordPress/Shopify shop. Whether they are invented or anonymized real work cannot be determined from outside; either way they are unverifiable social proof on a site whose entire positioning is verifiable honesty. `/about/` sets the standard itself: *"Written case studies: 18 — ... not logo walls."*

**Fix:** Remove or attribute. An empty section beats an unverifiable one.

### H3. The site contradicts itself on timelines and ecommerce price
| Source | Claim |
|---|---|
| Homepage FAQ (JSON-LD) | "Most websites are delivered in 2-3 weeks" |
| `/pricing/` Launch tier | "Typically 1–3 weeks from content sign-off" |
| `/pricing/` Store tier | "Typically 2–5 weeks" |
| Lucknow page FAQ | "three to five weeks"; ecommerce "six to ten weeks" |
| Blog post | Store build "six to ten weeks" |

Worse, on price: the blog says a WooCommerce store "is quoted in the ₹4,000–₹7,000 band... buys catalogue setup, the storefront, payment gateway integration and Shiprocket integration." `/pricing/` assigns ₹4,000–₹7,000 to the **brochure-site** Launch tier and puts gateway and Shiprocket under **Store (₹50,000–₹1,15,000)**.

An LLM finding both declines to quote either. Pick one set of numbers, propagate to all 12 city pages, and restate in `llms.txt`.

### H4. Zero external citations sitewide
Across all 50 pages diffed, the complete non-client outbound link list is `wa.me`, `googletagmanager.com`, and one LinkedIn profile. Yet the content makes sourceable claims constantly: "over 80% of that audience shops on a phone", "roughly 2% of every transaction", "reduce costs 20–40%". The blog even says *"Check their current India plan pricing yourself"* — and doesn't link it.

### H5. `/store/purchases/` is robots-disallowed but publicly indexable
**Verified:** returns **200**, `<meta name="robots" content="index, follow">`, **no canonical**, and inherits the root layout's homepage title. `/admin/` and `/portal/` both correctly emit `noindex, nofollow`; this page was missed. Because `robots.txt` disallows crawling, Google cannot read a `noindex` even if added — the URL can be indexed title-less.

**Fix:** give it real metadata + `noindex`, and remove it from the `robots.txt` Disallow so the directive is readable.

### H6. apex → www is a 307 (temporary)
**Verified:** `https://nextgenfusion.in/` → **307**; `http://nextgenfusion.in/` → 308 → 307 → 200 (two hops). A 307 tells crawlers the apex remains canonical, slowing signal consolidation. Correct canonicals limit the damage. Fix to 308/301 and collapse the `http://` chain to one hop.

### H7. Five security headers absent
Present: `strict-transport-security: max-age=63072000` (no `includeSubDomains`, no `preload`). Missing entirely: `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`. Also `access-control-allow-origin: *` on HTML documents. One `headers` block in `next.config.js`.

### H8. `/team/` has no `Person` schema and one internal inbound link
Four named people with public bios, photos and roles — and zero machine-readable markup on `/team/` or `/team/[slug]/`. `/team/*` pages are also **absent from sitemap.xml**, and `/team/` has just **1 internal inbound link** across the whole site. This is the largest untapped E-E-A-T surface.

### H9. Founder carries three different job titles
`/about/`: "Founder & Full Stack Developer". `/team/ritesh-giri/`: "Full Stack Developer". Blog byline — under the site's best content — reads **"Content Writer — Passionate about sharing insights on technology, design, and digital innovation"**, an unedited CMS default. The article's entire authority rests on the author having built the nine stores. One line, largest single authority gain available.

### H10. Orphaned, invalid `Offer` on `/pricing/`
`@type: Offer` is emitted standalone with **no `itemOffered`** — not a valid standalone entity, so Google discards it. It also uses **`priceRange`, which is not a valid property of `Offer`** (it belongs to `LocalBusiness`). Wrap in `Service` + `hasOfferCatalog`.

---

## Medium Priority Issues

- **M1. Case studies carry no outcomes.** Every hero "stat" is a scope descriptor: `3,000+ Products Listed`, `3 Service Verticals Covered`, `100% Mobile Optimized`. Not one of the 18 reports traffic, conversion, revenue, load time or enquiry volume; none carry dates or a client quote.
- **M2. Eight of twelve service pages are an unedited 11-section mad-lib** (`About {SERVICE}`, `How We Deliver Better {SERVICE}`, …), 767–833 words, versus 1,382–1,619 for the four rewritten. You have already run the right pass on four pages — finish the other eight.
- **M3. Two city-page pairs are near-duplicates.** `seo-services-in-lucknow` vs `-mumbai` = **72.6%** containment; `ecommerce-...-lucknow` vs `-mumbai` = **75.1%**. (The rest are excellent — see Content deep dive.)
- **M4. No `srcset` anywhere.** Every `<img>` is a single `src` at `w=3840`. Mobile downloads 89,765B where 19,415B would do — 4.6× waste. `/work/` carries 82 images.
- **M5. CLS/LCP risk on work templates.** Work index: 3 of 82 images have `width`; case studies: 2 of 11. `fetchpriority="high"` appears 4× on the homepage, **0×** on work and blog templates.
- **M6. Sitemap `lastmod` is bulk-stamped.** 43 of 57 URLs share `2026-09-16`, with one full-timestamp outlier. That is build date, not content-modification date — crawlers learn to discount it.
- **M7. No tables anywhere it matters.** `/pricing/` and the WooCommerce-vs-Shopify post (a 2,509-word comparison) both have **0** `<table>` elements. Tables are AI Overviews' preferred extraction unit for cost and comparison queries. (The homepage has 1.)
- **M8. Organization schema is thin.** No `description`, `legalName`, `foundingDate`, `address`, `email`, `numberOfEmployees`, `knowsAbout`, `areaServed`. `logo` is a bare string, not `ImageObject` with dimensions.
- **M9. Both `ProfessionalService` nodes share `url: <homepage>`** — the classic entity-collapse pattern; Google frequently reconciles two same-URL locations into one.
- **M10. Lucknow `PostalAddress` has no `streetAddress` and no `postalCode`**, while Mumbai has both. Not eligible for local rich results. Awkward given `/seo-services-in-lucknow/` lectures readers on NAP consistency.
- **M11. No `JobPosting` on `/careers/`** despite 8 live roles. One of the few rich results still fully supported.
- **M12. No visible dates or `datePublished`/`dateModified`** on `/pricing/`, any case study, any city page or any service page. Every published price is a dated claim; an undated pricing page is a trust liability.
- **M13. No IndexNow.** `/indexnow.txt` and `/BingSiteAuth.xml` both 404. On Vercel this is a near-free indexing win.
- **M14. `/llms.txt` omits the 12 city pages and 18 case studies** — the local-intent money pages and the highest-citability evidence assets. `/llms-full.txt` 404s.
- **M15. One blog post total.** `/blog/` shows "Showing 1 blog post". It is the strongest citability asset on the domain; one post is not a corpus.

---

## Low Priority Issues

- **L1. Glued words in extracted heading text (code bug).** Adjacent `<span>`s spaced by flex `gap` with no whitespace produce `"WhyPartnerwith Us?"`, `"What WeDo for You"`, `"Time to Stop Scrolling,Let'sBook a meetingand discuss it!"` — the last appearing on most pages sitewide. Visually correct, wrong in `textContent`. Sources: `Frontend/src/components/cta-banner.tsx:43`, `contact-section.tsx:246`, `services-section.tsx:217,230`, `comparison-section.tsx:186`. Fix: add a trailing space inside the preceding span (`<span>What We </span>`) — flex collapses edge whitespace, so no visual change.
- **L2. Homepage hero stat has no number:** renders `Real projects delivered · 0 clients ghosted`. `/about/` knows it is 18.
- **L3. "3,226+ Vendors powered"** is one client's platform count (MariBiz.ai) presented as an agency-wide metric; it is correctly attributed two cards later on the same page. Relabel.
- **L4. "100% Mobile-optimized builds"** is table stakes stated as an achievement. `/pricing/` already promises "Core Web Vitals checked on a throttled mobile connection" — publish that instead.
- **L5. Homepage readability is the site's worst** (Flesch 37.1, 1.83 syl/word) while `/about/` scores 64.1. The first page crawlers see is the least readable expression of the brand voice.
- **L6. 199KB render-blocking CSS** plus a 112KB legacy polyfills chunk; ~917KB JS across 16 chunks.
- **L7. Single-item homepage `BreadcrumbList`** ("Home") conveys nothing and will not render.
- **L8. `dateModified` on the blog post is 0.17 seconds after `datePublished`** — no freshness signal; omit if unrevised.
- **L9. `/team/[slug]/` bios are 157 words** of generic resume language, and claim "30+ production web applications" against `/about/`'s "18 case studies".
- **L10. Client backlinks point to the non-www apex** (`deetoo.in`, `vayue.in`, `nuaura.co`, `poshwave.co.in` all link `https://nextgenfusion.in/`), passing every real backlink through a 307.
- **L11. 223 homepage elements render at `style="opacity:0"`**, faded in by JS. Text is in the HTML so most fetchers get it; extractors respecting computed style may not. Homepage-only (deeper pages have 4–5 each).
- **L12. Stale indexed duplicate** `nextgenfusion.framer.website` — 404s, still surfacing in search, competing with the live entity.

---

## Category Deep Dives

### AI Citability (78/100)
The best agency content this format encounters, undermined by three fixable defects.

**Genuinely excellent passages:**
> "50% advance to start · 50% at payment-gateway integration. There is no separate design fee, no per-revision charge inside the agreed scope, and no charge for the pre-launch checks." — `/pricing/`

> "We have built nine WooCommerce stores... You can click any of those and read what we actually built. We have built zero Shopify stores." — `/blog/woocommerce-vs-shopify-india/`

> "On WooCommerce we quote roughly ₹2,500 per integration. On a custom build the same integration is ₹10,000, because on WooCommerce a large part of the work is configuration and on a custom build all of it is engineering."

> "Who owns the domain and hosting account? If the answer is the agency, walk away — that is leverage, not service." — Lucknow page

Counted claims, named entities, falsifiable, anti-marketing. Exactly what Perplexity and ChatGPT reward.

**Weak passages needing rewrite:**
> "Delivering impact, not just ideas. At our core, we believe great work should drive real results." — homepage, ~22/100. Contains no indexable noun.

> "Quality | High-quality designs via global talent and AI." — homepage comparison table. Directly contradicts `/about/`: *"We are a small in-house team, not a reseller."*

> "Our Website Development Services combine strategy, design, engineering, and optimization to build digital experiences that are not just beautiful but profitable." — interchangeable with 10,000 other agency pages.

Deductions: −4 invisible FAQ answers, −5 contradictory core facts, −2 generic service-page halves, −1 case studies without metrics or dates.

### Brand Authority (8/100)
| Platform | Status |
|---|---|
| Wikipedia / Wikidata | **Absent** — no article, no Q-item |
| LinkedIn | **Absent and squatted** — four other NextGen Fusions hold the namespace |
| Google Business Profile | **No evidence** — contact map embeds are raw coordinates at the Lucknow city centroid |
| Reddit / YouTube | **Absent**; `youtube.com/@nextgenfusion` belongs to an unrelated channel |
| Clutch / GoodFirms / DesignRush | **Absent** |
| G2 / Capterra / Trustpilot / Crunchbase | **Absent** |
| JustDial / Sulekha / IndiaMART | **Absent** |
| Instagram | **Present** — `@nextgenfusion.devs`, the only `sameAs` entry |
| Client backlinks | **Present, real** — verified dofollow credits on `deetoo.in`, `vayue.in`, `nuaura.co`, `poshwave.co.in` |
| GitHub | Present, weak — `github.com/ritesh5001/NextGen-Fusion` |

Arithmetic: Wikipedia 0/30 · Reddit 0/20 · YouTube 0/15 · LinkedIn 0/10 · third-party 8/25 = **8/100**.

### Content E-E-A-T (60/100)
Sub-scores: Experience 19/25 · Expertise 16/25 · Authoritativeness 9/25 · Trustworthiness 11/25.

**The duplication finding is the reverse of expectations.** Shingle analysis across 24 template pages:
- **City pages (12): median pairwise Jaccard 5.3%** — genuinely written per city. `website-development-...-lucknow` vs `-mumbai` shares only **9.0%**. Differing content is real local reasoning, not city-name swaps: *"Ethnic wear, chikankari, sarees, jewellery and food are the categories this city actually sells..."* **These do not read as doorway pages.** Only the two SEO/ecommerce pairs (72.6%, 75.1%) need work.
- **Service pages (12): median Jaccard 0.9%** — passes naive duplicate checks, but 8 share an identical 11-section skeleton with the service name substituted into every heading.

**Readability maps cleanly onto two content tiers** (syllables/word is the jargon proxy): `/pricing/` 64.6 (1.49), `/about/` 64.1 (1.47), blog 61.1 (1.50) — versus homepage 37.1 (1.83), `/work/tatvivahtrends/` 29.0 (1.91), `/services/cloud-solutions/` **18.6 (2.04)**.

### Technical GEO (84/100)
The highest-scoring category, and deservedly.

**Flawless:** SSR across every template type (home 1,448 visible words, city 1,929, blog 2,508, service 1,674 — all in raw HTML, no JS gating). 57/57 sitemap URLs return 200 — zero 4xx, 5xx, redirects or `X-Robots-Tag`. Every canonical self-referencing and sitemap-matching. **Zero third-party scripts** on any template (unusually good for INP). Fonts textbook: self-hosted woff2, `font-display: swap` on all 8 faces, 4 preloaded. URL structure near-perfect. TLS valid, brotli active (197KB → 24.9KB), custom 404 returns 404 + `noindex`.

**The cold-start lead, diagnosed:** the initial 30s apex timeout was reproduced once then failed to reproduce across 30 controlled requests. It is Vercel edge-cache cold paths, not a redirect or streaming bug — cached routes serve in 0.2–0.5s (`x-vercel-cache: HIT`), uncached in ~1s (`MISS`/`STALE`). Roughly 2 stall events in ~150 requests. Watch in Vercel observability; not a site defect.

### Schema & Structured Data (49/100)
**Better than the score suggests where it exists:** 100% JSON-LD, 100% server-rendered (recovered from plain `curl`, no JS), a clean global `@graph` with correct `@id` cross-linking. The Lucknow city page is the best template on the site — `Service` + `City areaServed` + `OfferCatalog` + 10-question `FAQPage`, with `Service.provider → #office-lucknow` (correct local attribution).

**Coverage gaps:** `/team/`, `/team/[slug]/`, `/store/`, `/careers/` carry **zero** page-level schema and no `BreadcrumbList` — breadcrumb coverage is 11/15 templates, not sitewide.

**No Google-penalizable misuse found.** No fake `AggregateRating`, no hidden marked-up content. Note: the site has no real on-page reviews — **do not add `Review`/`AggregateRating` until it does.** That is the one change here that would risk a manual action.

### Platform Optimization (58/100)
| Platform | Score |
|---|---|
| Google AI Overviews | 69/100 |
| ChatGPT Web Search | 62/100 |
| Perplexity | 57/100 |
| Bing Copilot | 57/100 |
| Google Gemini | 43/100 |

**Strongest — AI Overviews (69):** four `FAQPage` blocks with answers in the 20–55 word band AIO prefers, clean heading hierarchy, full SSR, 224ms TTFB off Vercel `bom1`. `/pricing/` emits real `PriceSpecification` nodes (`minPrice: 4000, maxPrice: 7000`) where competitors say "contact us."

**Weakest — Gemini (43):** Gemini scores the entity across Google's whole surface, and outside the domain the entity is invisible — no GBP, no video, no Knowledge Graph, one `sameAs`.

**Crawler access is a perfect 25/25** — GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended all explicitly allowed. `/llms.txt` is well-formed (H1, blockquote abstract, "Key facts for citation" block) and **all 25 of its links resolve 200**.

---

## Quick Wins (Implement This Week)

1. **Fix the blog author bio** — "Content Writer" → "Founder & Full Stack Developer". One line, largest single authority gain on the site.
2. **`absoluteUrl` → `assetUrl`** at `about/page.tsx:90` and `work/[slug]/page.tsx:108`; de-duplicate `coverImage`. Two-line fix, repairs images across 18 case studies and 4 team profiles.
3. **Render the homepage FAQ answers into the DOM** — `faq-section.tsx:352`, stop conditionally mounting. Unlocks the site's best commercial content for Perplexity, ChatGPT and Claude.
4. **Delete the 17 anonymous testimonials and 16 unattributed Case Preview cards** from the 8 untouched service pages.
5. **Fill the `[DATE]`/`[7]`/`[5]`/`[2]` placeholders** in `/store/refunds/` and `/store/license/`, and link both from the footer.
6. **Create the LinkedIn company page today** — name it "NextGen Fusion — Web Development Agency, Lucknow", never bare "NextGen Fusion". The namespace is a four-way collision you are currently losing.
7. **Add the five security headers** in `next.config.js`; switch apex→www from 307 to 308.

---

## 30-Day Action Plan

### Week 1: Trust, truth and the two-line bugs
- [ ] Publish privacy policy, terms of service, cookie policy; link from global footer
- [ ] Fill all placeholder brackets in `/store/refunds/` and `/store/license/`; link from footer
- [ ] Remove 17 anonymous testimonials + 16 unattributed Case Preview cards (8 untouched service pages)
- [ ] Fix blog author bio; reconcile founder's job title across `/about/`, `/team/`, blog
- [ ] `absoluteUrl` → `assetUrl` (2 call sites); de-duplicate `coverImage`
- [ ] Render FAQ answers in server HTML (`faq-section.tsx`)
- [ ] Publish GSTIN and legal entity name in the footer

### Week 2: Entity existence (off-site — this gates everything else)
- [ ] LinkedIn company page + 4 personal profiles, cross-linked
- [ ] Google Business Profile for Mumbai (full address already published, verifiable today) + Lucknow service-area profile
- [ ] Claim GoodFirms, Clutch, TechBehemoths listings; request reviews from 3 existing clients
- [ ] Register a YouTube handle (`@nextgenfusiondev`); 404 or 301 `nextgenfusion.framer.website`
- [ ] File a Wikidata item (founder, founding date, location, industry, official site)
- [ ] Expand `Organization.sameAs` to every profile that now exists — **only** ones that resolve
- [ ] Add a disambiguation line to `/about/` and `llms.txt` naming the entities you are *not*

### Week 3: Structured data and consistency
- [ ] `Person` schema with `sameAs` + `knowsAbout` on `/team/` and `/team/[slug]/`; add `/team/*` to sitemap
- [ ] Replace the orphaned `/pricing/` `Offer` with `Service` + `hasOfferCatalog`; drop invalid `priceRange`
- [ ] Add `image` to `Product` on ~30 store items
- [ ] `JobPosting` ×8 on `/careers/` with real `datePosted`/`validThrough`
- [ ] Complete Lucknow `PostalAddress`; give each `ProfessionalService` a distinct `url`
- [ ] Enrich `Organization` (`description`, `knowsAbout`, `foundingDate`, `numberOfEmployees`, `logo` as `ImageObject`)
- [ ] Add `BreadcrumbList` to `/team/`, `/store/`, `/careers/`
- [ ] **Resolve the timeline and ₹4,000–₹7,000 contradictions**; propagate one canonical set of numbers everywhere including `llms.txt`
- [ ] Fix `/store/purchases/` metadata + `noindex`; remove from robots.txt Disallow

### Week 4: Content and performance
- [ ] One real outcome metric per case study (start: Krushi Doctor, ClickNGreet, HCB); add `datePublished`
- [ ] Apply the rewrite already done on 4 service pages to the remaining 8; drop or honestly reframe cloud/API/PPC/social
- [ ] Differentiate the two 72–75% city pairs (pricing and market sections)
- [ ] Add external citations — Razorpay fees, Shopify India pricing, CWV docs, the 80%-mobile source
- [ ] Add comparison `<table>` to `/pricing/` and the WooCommerce post
- [ ] Add `sizes` to `next/image` for srcset; width/height on work templates; `fetchpriority` on work/blog LCP
- [ ] Fix glued heading spans (4 components); hard-code the missing "18" in the hero counter
- [ ] Add `/work/*` and city pages to `llms.txt`
- [ ] Real `lastmod` in sitemap; visible dates + `datePublished`/`dateModified` on commercial pages
- [ ] IndexNow key file + Vercel deploy-hook ping
- [ ] Draft 2 of the 4 proposed posts from data you already own

---

## Appendix: Pages Analyzed

All 57 sitemap URLs returned **200**. Every page carries a title, meta description, self-referencing canonical, exactly one `<h1>`, and structured data. **Zero images missing alt text sitewide.** No orphan pages — every page has at least one internal inbound link.

**Word count distribution:** min 256 · median 894 · mean 1,052 · max 2,509

| Segment | Count | Notes |
|---|---|---|
| Core (`/`, `/about/`, `/contact/`, `/pricing/`, `/services/`, `/work/`, `/blog/`, `/team/`, `/careers/`, `/store/`, `/support/`) | 11 | `/team/` thin (142 w) and weakly linked (1 inbound) |
| Store policy (`/store/license/`, `/store/refunds/`) | 2 | **Live `[DATE]` placeholders** |
| Service pages (`/services/*`) | 12 | 4 rewritten (1,382–1,619 w); 8 templated (767–833 w) |
| City/state landing pages | 12 | Strong — median Jaccard 5.3%; 2 pairs at 72–75% |
| Case studies (`/work/*`) | 18 | 573–660 w; no outcome metrics, no dates |
| Blog (`/blog/woocommerce-vs-shopify-india/`, category) | 2 | Post is the site's best asset; category page thin (256 w) |

**Slowest pages:** `/work/vashtaraheaven/` 1,598ms · `/work/maribiz-ai/` 1,464ms · `/services/web-design-services/` 1,385ms

**Fetch failures:** none. One transient 30s stall on an uncached apex request, not reproducible across 30 follow-ups (diagnosed as Vercel edge-cache cold path).

---

## Remediation Status (2026-09-18)

Everything below was implemented, built, type-checked and verified against
rendered HTML on branch `geo-audit-fixes` (commit `e79a69b`). 17 tests pass.

### Fixed in code

| ID | Finding | Verification |
|---|---|---|
| H1 | Homepage FAQ answers absent from DOM | Answers now present with scripts stripped |
| C4 | Trailing-slash schema image URLs | `…/ritesh-giri.png`, no redirect; coverImage deduped (3 images, was 4) |
| H2 | 24 unattributed testimonials + 16 unlinked portfolio cards | 0 remain on all 12 service pages |
| H8 | No `Person` schema on `/team/` | `Person` + `ProfilePage` + `CollectionPage` emitted |
| H9 | Founder had three job titles | Single source in `src/data/team.ts`; byline reads the real role |
| H10 | Orphaned, invalid `/pricing/` `Offer` | Now `Service` + `hasOfferCatalog`, `priceRange` dropped |
| H5 | `/store/purchases/` indexable + robots-disallowed | `noindex, follow`, own canonical, Disallow removed |
| H7 | Five security headers absent | All five present; HSTS + `includeSubDomains` |
| M6 | Case studies inherited the services `lastmod` | Own constant; `/team/*` added to sitemap |
| M8–M10 | Thin Organization, shared office URLs | Enriched; each office has its own city-page URL |
| M11 | No `JobPosting` on `/careers/` | `CollectionPage` + `ItemList` live; `JobPosting` gated on real dates |
| M13 | "No IndexNow" | Key file already existed and was live; submit script added, 57 URLs accepted (HTTP 202) |
| M14 | `llms.txt` omitted city pages and case studies | Now generated from site data — 59 links, plus a disambiguation paragraph |
| L1 | Glued words in extracted headings | 0 remain across 6 components |
| L2 | Hero counter missing its number | Derived from data — renders "18" |
| L7 | Single-item homepage breadcrumb | Removed; `WebPage` node added |
| L9 | "30+ production web applications" vs 18 case studies | Claim corrected |

### Found while fixing, not in the original audit

**All four `/team/<slug>/` pages declared `canonical: /team/`** — telling Google
every profile was a duplicate of the index. Combined with their absence from the
sitemap and their lack of `Person` markup, four pages of genuine expertise signal
were invisible. Fixed with a dedicated layout; each profile now has its own
canonical, title and Person node.

### Findings that proved false on verification

- **M4 — "No `srcset` anywhere."** Incorrect. React emits the attribute as
  `srcSet`; a case-sensitive grep for `srcset=` returned zero. 81 of 82 images on
  `/work/` carry a full 256w–3840w ladder with correct `sizes`, on the live site
  as well. There is no 4.6× mobile waste.
- **M5 — "CLS risk, 3 of 82 images have width."** Largely incorrect. 79 of those
  82 use `next/image` `fill`, which is absolutely positioned inside a
  fixed-aspect container and carries no width/height by design. It cannot shift
  layout.
- **C5 — "~30 store products ineligible for Product rich results."** Overstated.
  Products without a cover image are already `noindex` via
  `isStoreProductIndexable()`, so they cannot earn rich results regardless. The
  real defect was a relative `image` path, now absolute.

### Still open — needs facts only you have

1. **Privacy policy, terms of service, cookie policy (C1).** Still 404. Writing
   these needs your legal entity name, GSTIN, grievance-officer contact and
   data-retention practice.
2. **`/store/refunds/` and `/store/license/` placeholders (C2).** Still live.
   `[7]`, `[5]` and `[2]` are commitments about your refund window and response
   times — your numbers, not mine to invent.
3. **The timeline and ₹4,000–₹7,000 contradictions (H3).** Four pages give
   different answers. Decide the canonical set and it propagates.
4. **Off-site entity work (C3).** LinkedIn company page, Google Business Profiles,
   GoodFirms/Clutch listings. Nothing on-site moves Brand Authority off 8/100.
5. **The four team LinkedIn URLs.** Guessed slugs; LinkedIn blocks verification
   (HTTP 999). Confirm each, then move it into `verifiedProfiles` in
   `src/data/team.ts` and it flows into `sameAs` automatically.
6. **`datePosted` / `validThrough` for the 8 open roles (M11).** Fill them in
   `src/data/careers.ts` and `JobPosting` markup turns on by itself.
7. **Case-study outcome metrics (M1)** and the remaining 8 service-page rewrites
   (M2) — content work requiring client data and your voice.

---

## Methodology Note

Findings were produced by five parallel specialist analyses and independently re-verified by the orchestrator before inclusion. Three subagent claims were corrected during verification:

1. A claim that no `llms.txt` exists — **false**; it exists, is well-formed, and all 25 links resolve.
2. A claim that all 28 "Case Preview" cards are invented — **partly false**; 12 name real clients on the 4 rewritten pages. Only the 16 on untouched pages are unattributed.
3. Conflicting sitemap `lastmod` readings — resolved by direct count: 43 of 57 share `2026-09-16`.

A claim that the homepage has zero `<table>` elements was also corrected: it has one.

Three further subagent findings were disproved during remediation and are
documented under "Findings that proved false on verification" above: the
`srcset` claim (M4), the CLS/width claim (M5) and the store `Product` severity
(C5). Where this report states a fact, it was confirmed against the live site or
the repository.
