import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 61,
  title: "Headless WordPress explained: keeping WordPress behind a Next.js front end",
  slug: "headless-wordpress",
  excerpt: "Headless WordPress explained: keeping WordPress as the editor behind a Next.js front end, what you gain, what you give up, and when it's worth the extra work.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "headless wordpress",
  cover_image: "/projects/krushidoctor/screenshot-1.png",
  introduction: `<p>Headless WordPress means your team keeps editing content in the familiar WordPress dashboard, while the public website is a separate front end, often built with Next.js, that fetches that content through an API. You get a faster, more flexible front end and WordPress's editing experience. In exchange, you lose everything that relied on WordPress rendering the pages itself: themes, page builders, many plugins' front-end features and simple previews. It's worth it when performance, design freedom or combining content with application features matter enough to justify a more complex setup.</p>`,
  content: `<h2>How headless WordPress works</h2>
<ol>
<li>Editors write and manage content in WordPress as usual.</li>
<li>WordPress exposes that content through its built-in REST API, or a GraphQL API added with a plugin such as WPGraphQL.</li>
<li>A separate front end (for example a Next.js app) requests the content and renders the pages, usually at build time or on the server, with caching.</li>
<li>Visitors only ever see the front end. WordPress can sit on a private address.</li>
</ol>
<h2>What you gain</h2>
<ul>
<li><strong>Speed:</strong> pages can be pre-rendered and served from a CDN, without PHP and database work on each visit.</li>
<li><strong>Design freedom:</strong> the front end isn't limited by a theme or page builder.</li>
<li><strong>Security:</strong> the public site doesn't expose the WordPress admin or plugins directly, reducing the attack surface.</li>
<li><strong>Mixing content with features:</strong> one front end can combine WordPress content with accounts, dashboards, search or data from other systems.</li>
<li><strong>Multiple channels:</strong> the same content can feed a website, an app and other platforms.</li>
</ul>
<h2>What you give up</h2>
<ul>
<li><strong>Themes and page builders:</strong> they don't control the front end any more. Layouts are built in code; editors work with structured fields and blocks the front end knows how to display.</li>
<li><strong>Plugin front-end features:</strong> sliders, forms, popups and many SEO plugin outputs need equivalents in the front end, or careful integration.</li>
<li><strong>Easy previews:</strong> seeing a draft exactly as it will look needs extra setup.</li>
<li><strong>Simplicity:</strong> two systems to host, secure and maintain, and developers needed for layout changes.</li>
<li><strong>Some editor independence:</strong> marketing teams used to building pages visually may find it restrictive.</li>
</ul>
<h2>When headless WordPress is worth it</h2>
<ul>
<li>Speed and Core Web Vitals are critical and the current WordPress site can't get there.</li>
<li>The site combines content with application features, such as accounts, dashboards or complex search.</li>
<li>Editors know and like WordPress, and you don't want to retrain them on a new CMS.</li>
<li>You have, or will hire, developers to maintain the front end.</li>
</ul>
<p>We've used a version of this approach for <a href="/work/tatvivahtrends/">TatVivah Trends</a>, where a custom Next.js front end works with a WooCommerce back end.</p>
<h2>When to stay with traditional WordPress</h2>
<ul>
<li>A content site that a non-technical team edits visually and changes often.</li>
<li>Heavy reliance on plugins that output on the front end.</li>
<li>Limited budget for development and maintenance.</li>
<li>Performance problems that hosting, caching and a lighter theme would fix; see <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>.</li>
</ul>
<h2>SEO in a headless setup</h2>
<p>Search engines see only the front end, so it must handle titles, descriptions, canonical URLs, structured data, sitemaps, redirects and status codes. SEO plugin data can be fetched from WordPress and output by the front end, but it has to be wired in deliberately. Our <a href="/blog/nextjs-seo-checklist/">Next.js SEO checklist</a> covers the front-end side.</p>
<h2>Alternatives to consider</h2>
<ul>
<li><strong>A purpose-built headless CMS</strong> (several exist) if you're starting fresh and don't need WordPress's ecosystem.</li>
<li><strong>A fully Next.js site</strong> with content in files or a database, for small sites edited rarely.</li>
<li><strong>Traditional WordPress, done well,</strong> which is enough for most business sites.</li>
</ul>
<p>Our comparison of <a href="/blog/nextjs-vs-wordpress-business-website/">Next.js vs WordPress for a business website</a> covers the simpler either-or decision.</p>
<h2>Headless questions</h2>
<p><strong>Can editors still use the block editor?</strong> Yes. The front end needs to know how to render each block type you allow, so it's common to limit editors to a defined set of blocks.</p>
<p><strong>Is headless WordPress more secure?</strong> The public attack surface is smaller, but WordPress itself still needs updates and protection.</p>
<p><strong>Does it cost more to run?</strong> Usually somewhat more: two systems to host and maintain, and more developer involvement for changes.</p>`,
  conclution: `<p>Headless WordPress is a great answer to the right problem and an expensive answer to the wrong one. If your current site is slow because of hosting and plugins, fix that first.</p>
<p>If you do need it, our <a href="/services/nextjs-development-services/">Next.js team</a> can tell you whether it fits.</p>`,
}
