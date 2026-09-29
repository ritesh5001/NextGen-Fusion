# GEO Technical SEO Audit — nextgenfusion.in

Date: 29 September 2026
Scope: technical readiness for India and for UAE searches (Dubai, Abu Dhabi, Sharjah), checked against the live site with `curl` and a headless browser.

## Technical Score: 92/100

| Category | Score | Status |
|---|---|---|
| Crawlability | 15/15 | Pass |
| Indexability | 11/12 | Pass |
| Security | 9/10 | Pass |
| URL Structure | 7/8 | Pass |
| Mobile Optimization | 10/10 | Pass |
| Core Web Vitals | 12/15 (estimated) | Pass |
| Server-Side Rendering | 15/15 | Pass |
| Page Speed & Server | 13/15 | Pass |

Core Web Vitals and page weight are estimated: there is no field (CrUX) data or Search Console export to read.

## The UAE findings that matter most

These are not technical defects; they are limits on how well a site in India can rank in the UAE, and how to work within them.

1. **The `.in` domain signals India.** Google treats a country-code domain as a strong sign the site targets that country, and Search Console does not let you change the target for a ccTLD. The UAE pages can still rank for searches like "website development company for Dubai businesses" and for cost and comparison questions, but they start behind `.ae` and `.com` competitors for bare "web design Dubai" searches. Options, cheapest first:
   - Keep `.in` and win on content and links (what has been built). No cost.
   - Serve the same site on a `.com` as well, with `.in` canonical to one of them. Only worth it if a suitable `.com` is available; `nextgenfusion.com`-style names are likely taken by the other companies trading under the name.
   - A `.ae` domain needs UAE eligibility (a UAE trade licence or trademark), so it is not an option without a UAE entity.
2. **No Google Maps pack without a UAE address.** "Near me" and map results need a Google Business Profile at a real address in the UAE. There is none, and the pages say so. Do not create a profile at a virtual office or a client's address; that is the fastest way to get a profile suspended.
3. **UAE backlinks are the lever.** The strongest single step is a credit link from Cleanship's footer ("Website by NextGen Fusion") to the Cleanship case study or the UAE page. It is a real UAE company linking to real work. After that: Clutch, GoodFirms and DesignRush profiles listing the UAE as a served market (with the Indian address), and LinkedIn.
4. **One language, so no hreflang yet.** Every page is English, so hreflang would add nothing. If Arabic pages are added later, give them their own URLs and pair them with `hreflang="ar-AE"` / `hreflang="en-AE"` and an `x-default`.
5. **`<html lang="en-IN">` on every page, UAE pages included.** A weak signal next to the ccTLD; not worth a per-route layout change now.

## What was added for the UAE (29 September 2026)

| Page | Primary keyword | URL |
|---|---|---|
| UAE hub | Website development company in UAE | `/website-development-company-in-uae/` |
| Dubai | Website development company in Dubai | `/website-development-company-in-dubai/` |
| Abu Dhabi | Website development company in Abu Dhabi | `/website-development-company-in-abu-dhabi/` |
| Sharjah | Website development company in Sharjah | `/website-development-company-in-sharjah/` |
| Cost guide | Website development cost in Dubai (AED) | `/website-development-cost-in-dubai/` |
| Case study | Cleanship (Ajman Free Zone marine company) | `/work/cleanship/` |
| Blog | Hiring a web development team in India from Dubai | `/blog/hire-web-development-team-india-from-dubai/` |
| Blog | Online store for the UAE: gateways, VAT, COD, Arabic | `/blog/ecommerce-website-uae-payment-gateways-vat-arabic/` |

- The city pages are marked in schema as `areaServed` Dubai / Abu Dhabi / Sharjah / UAE with `addressCountry: AE`, provided by the Lucknow office. No UAE address is claimed anywhere.
- Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain and Al Ain are sections of the UAE hub, not separate pages, to avoid near-identical doorway pages.
- AED figures are computed from the INR rate card (₹96 = US$1, AED 3.6725 = US$1; ECB rate, 29 September 2026) and labelled approximate.
- Organization schema lists the United Arab Emirates in `areaServed`; `llms.txt` states the UAE market and that there is no UAE office.
- All new URLs are in the sitemap with a 2026-09-29 `lastmod`.

## What was added for Singapore (29 September 2026)

| Page | Primary keyword | URL |
|---|---|---|
| Singapore | Website development company in Singapore | `/website-development-company-in-singapore/` |
| Cost guide | Website development cost in Singapore (SGD) | `/website-development-cost-in-singapore/` |
| Blog | Hiring a web development team in India from Singapore | `/blog/hire-web-development-team-india-from-singapore/` |
| Blog | Online store for Singapore: PayNow, GST, PDPA | `/blog/ecommerce-website-singapore-paynow-gst-pdpa/` |

- One page, not several: Singapore is a single city, and there is no Singapore client to build district pages on.
- The page states there is no Singapore office and no Singapore-registered client yet, and that the team is not a PSG pre-approved vendor. Its proof is maritime (MariBiz.ai, MariMail, Cleanship) and comparable builds.
- The same ccTLD and Maps-pack limits apply as for the UAE. Singapore adds one more: working hours cover Singapore afternoons (12:30–21:30 SGT), not mornings, and the page says so.
- SGD figures use ₹96 and S$1.28 to US$1 (ECB, 29 September 2026). The Singapore dollar floats, so re-check the rate in `estimator-pricing.ts` every few months.

## Currency correction (29 September 2026)

The rate card converted rupees at ₹85 to US$1, a figure marked "TODO: confirm" in the code. The ECB rate on 29 September 2026 was ₹95.98, so USD prices for overseas visitors and every AED figure were about 13% too high. The rate is now ₹96, and the two UAE blog posts were corrected in the database; their live pages switch to the corrected figures at the next hourly refresh or deploy.

## AI Crawler Access

| Crawler | User-Agent | Status |
|---|---|---|
| GPTBot / ChatGPT-User / OAI-SearchBot | OpenAI | Allowed (explicit) |
| Googlebot / Google-Extended | Google | Allowed (explicit) |
| Bingbot | Microsoft | Allowed (explicit) |
| PerplexityBot / Perplexity-User | Perplexity | Allowed (explicit) |
| ClaudeBot / Claude-User / Claude-SearchBot | Anthropic | Allowed (explicit) |
| Applebot-Extended, Amazonbot, meta-externalagent, DuckAssistBot | Various | Allowed (explicit) |
| CCBot, Bytespider | Common Crawl, ByteDance | Allowed (via `User-agent: *`) |

Only `/admin/`, `/api/` and `/portal/` are disallowed.

## Critical Issues

None.

## Warnings (fix this month)

1. **Apex domain redirect is two hops, and the second is temporary.** `http://nextgenfusion.in` → `https://nextgenfusion.in/` (308) → `https://www.nextgenfusion.in/` (**307**). Fix in Vercel → Project → Settings → Domains: set `nextgenfusion.in` to redirect to `www.nextgenfusion.in` with **308 Permanent**. That also collapses the chain to one hop.
2. **Run IndexNow after the next deploy.** `npm run indexnow` submits every sitemap URL to Bing (and so ChatGPT search and Copilot). The key file is live; nothing runs the script automatically.
3. **Blog posts appear up to an hour after publishing.** The post page reads a cached list that revalidates hourly, and a slug requested before it appears is served as 404 until then. The two UAE posts were confirmed in the production API at 15:38 UTC and will resolve on the next revalidation or deploy. An on-demand `revalidatePath('/blog')` call from the admin publish action would make new posts instant.

## Recommendations (this quarter)

1. Add a Content-Security-Policy header (the only missing security header).
2. Connect Google Search Console and Bing Webmaster Tools, submit the sitemap, and export positions monthly so keyword work can be measured.
3. Ask Cleanship for the footer credit link (see UAE finding 3).
4. Add a Mumbai-based UAE angle once there is demand: the Mumbai office is the natural contact for Gulf clients.

## Detailed Findings

- **Crawlability.** robots.txt is valid, references the sitemap and names every major AI crawler. Sitemap: 64 URLs live, all with real `lastmod` dates; a 12-URL sample returned 200. Every service, city page and guide is linked from the footer, so nothing sits deeper than two clicks.
- **Indexability.** Self-referencing canonicals on the www host with trailing slashes; `http`, apex and no-slash variants all redirect. No noindex on indexable pages.
- **Security.** HTTPS with HSTS (`max-age=63072000; includeSubDomains`), `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, and a Permissions-Policy. No CSP.
- **SSR.** Raw HTML (no JavaScript) of a city page contains the H1, 14 H2s, four JSON-LD blocks and the canonical tag. Pages are prerendered (`x-nextjs-prerender: 1`) and served from Vercel's edge cache.
- **Speed.** TTFB 0.25 s (homepage) to 0.69 s (cost guide), measured from India. UAE TTFB not measured; static pages are cached at the edge, so it should be similar.
- **Agent-readiness.** `Accept: text/markdown` returns HTML; Markdown negotiation is a Cloudflare feature and not relevant on Vercel. No `Link:` headers; not applicable to a business site.
