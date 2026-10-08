import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 72,
  title: "Elementor slowing your site down? When page builders become a problem",
  slug: "elementor-slow-site",
  excerpt: "Is Elementor slowing your site down? Why page builders add weight, the settings that help, and when a lighter theme or rebuild is the better answer.",
  category: "WordPress & WooCommerce",
  primaryKeyword: "elementor slow",
  cover_image: "/projects/samaraha/screenshot-1.png",
  introduction: `<p>Elementor and similar page builders make WordPress pages easy to design visually, but they add extra HTML, CSS and JavaScript compared with a lean theme, and sites built with many add-on packs, animations and nested sections can become heavy and slow on phones. Many Elementor sites can be made acceptably fast with good hosting, caching, Elementor's own performance settings and fewer add-ons. When pages are deeply nested, stuffed with widgets and still slow after that, a lighter build of the key templates is often the only way forward.</p>`,
  content: `<h2>Why page builders add weight</h2>
<ul>
<li><strong>More markup:</strong> sections, containers, columns and widget wrappers create deeper HTML than hand-built templates.</li>
<li><strong>Extra CSS and JavaScript:</strong> the builder's own files, plus files for each widget and add-on.</li>
<li><strong>Add-on packs:</strong> third-party widget collections can load assets for dozens of widgets even if you use two.</li>
<li><strong>Design habits:</strong> sliders, animations, background videos, many fonts and large images are easy to add, and each costs speed.</li>
</ul>
<h2>Measure before changing</h2>
<p>Run your main pages through <a href="https://pagespeed.web.dev/" rel="noopener">PageSpeed Insights</a> on mobile. Note server response time, Largest Contentful Paint and total blocking time. If the server is slow, start with hosting and caching, as covered in <a href="/blog/slow-wordpress-site/">why your WordPress site is slow</a>. If the server is quick but the page is heavy, the builder and its content are the focus.</p>
<h2>Fixes to try first</h2>
<h3>Use Elementor's performance features</h3>
<p>Recent Elementor versions include performance options, such as loading only the CSS and JavaScript needed for widgets on each page, optimised DOM output with flexbox containers instead of old sections and columns, and lazy loading. Check the Features and Performance settings, enable what applies, and test the site after each change.</p>
<h3>Convert old layouts to containers</h3>
<p>Pages built with the older section and column structure create deeper markup. Rebuilding key pages with containers reduces it.</p>
<h3>Cut add-on packs</h3>
<p>List which widgets you actually use from each add-on plugin. If it's one or two, replace them with core widgets or simple custom code and remove the pack.</p>
<h3>Reduce heavy design elements</h3>
<p>Replace sliders with a single strong image, remove entrance animations, avoid background videos on mobile, and limit fonts to one or two families with few weights.</p>
<h3>Optimise images</h3>
<p>Compress, convert to WebP or AVIF, size them for mobile, and make sure the hero image isn't lazy-loaded.</p>
<h3>Caching and asset optimisation</h3>
<p>Page caching, plus careful CSS and JavaScript optimisation in a caching plugin. Test thoroughly: aggressive minification and delayed scripts can break builder layouts.</p>
<h2>When to rebuild</h2>
<p>Consider rebuilding key templates without the page builder when:</p>
<ul>
<li>Mobile speed stays poor after hosting, caching, settings and clean-up.</li>
<li>Pages are deeply nested and hard to maintain.</li>
<li>The site depends on many add-on packs.</li>
<li>Your team rarely edits layouts and mostly changes text.</li>
</ul>
<p>A common middle ground: rebuild the homepage and the highest-traffic templates (service pages, product pages, blog posts) with a lightweight theme and the block editor, and keep the builder for occasional landing pages. Our post on <a href="/blog/too-many-wordpress-plugins/">trimming WordPress plugins</a> helps with the clean-up either way.</p>
<h2>Keep it fast afterwards</h2>
<p>Agree a few house rules for anyone editing pages: no new add-on packs without checking, one hero image per page instead of sliders, no animations on mobile, and a quick PageSpeed check after publishing a new landing page. Most Elementor sites get slow gradually, one well-meant addition at a time.</p>
<h2>Is Elementor bad?</h2>
<p>No. It lets non-developers build and edit pages, which is valuable. The trade-off is weight. With discipline (few add-ons, simple designs, good hosting), Elementor sites can perform reasonably well. Problems usually come from years of additions without anyone watching performance.</p>
<h2>Elementor questions</h2>
<h3>Will switching to another page builder fix it?</h3>
<p>Some builders output lighter code, but a site built with the same habits on a different builder often ends up similarly heavy.</p>
<h3>Can I keep Elementor and pass Core Web Vitals?</h3>
<p>Often, yes, with good hosting, caching, its performance settings and restrained design. It's harder on very complex pages.</p>
<h3>Does Elementor hurt SEO?</h3>
<p>Not directly. Slow pages and poor mobile experience hurt; the builder itself isn't penalised.</p>`,
  conclution: `<p>Elementor isn't the problem on its own. Years of add-ons, sliders and animations are. Clean those up first, and only rebuild the templates that are still slow afterwards.</p>`,
}
