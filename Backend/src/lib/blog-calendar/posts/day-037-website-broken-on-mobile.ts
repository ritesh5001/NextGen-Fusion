import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 37,
  title: "Why does my website look broken on mobile? Common causes and fixes",
  slug: "website-broken-on-mobile",
  excerpt: "Why does your website look broken on mobile? The common causes, from fixed-width layouts to oversized images and pop-ups, and how to find and fix each one.",
  category: "Website Redesign",
  primaryKeyword: "website broken on mobile",
  cover_image: "/projects/newsaraswatisareecentre/screenshot-1.png",
  introduction: `<p>A website looks broken on mobile when parts of it were built with only a desktop screen in mind: fixed widths that don't shrink, images or tables wider than the phone, text too small to read, buttons too close together, or pop-ups and menus that don't fit. Most fixes are in the theme's CSS or the content itself, and many sites only have a handful of problem pages.</p>
<p>Most sites only have a handful of problem pages, which makes this a smaller job than people fear.</p>`,
  content: `<h2>First, check it properly</h2>
<p>Resizing a desktop browser isn't enough. Test on real phones, ideally one Android and one iPhone, and on a smaller, cheaper phone as well as a new one. Also check:</p>
<ul>
<li>Your top ten pages by traffic, not just the homepage.</li>
<li>Forms, menus and checkout.</li>
<li>Pages with tables, embedded maps or videos.</li>
<li>Both portrait and landscape.</li>
</ul>
<p>Your browser's developer tools can simulate many phones. Google's Lighthouse, in Chrome's developer tools, flags several mobile issues too.</p>
<h2>Cause 1: No viewport tag</h2>
<p>Without the viewport meta tag, phones display a shrunken desktop page. The page needs <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code> in its head. Almost every modern theme includes it; very old or hand-built sites sometimes don't. Our <a href="/free-seo-checker/">free SEO checker</a> tests for it.</p>
<h2>Cause 2: Fixed widths</h2>
<p>Elements set to a fixed width in pixels (a 1000px container, a 600px image, a 900px table) stay that wide on a 390px phone, pushing content off the side and creating horizontal scrolling. Widths should be flexible: percentages or maximum widths, so elements shrink to fit.</p>
<h2>Cause 3: Wide content inside the page</h2>
<ul>
<li><strong>Images</strong> without a maximum width. Images should never be wider than their container.</li>
<li><strong>Tables</strong> with many columns. Let them scroll inside their own box, or restructure them for small screens.</li>
<li><strong>Embedded videos and maps</strong> with fixed sizes. Wrap them in a responsive container.</li>
<li><strong>Long words and URLs</strong> that don't break, such as long email addresses.</li>
</ul>
<h2>Cause 4: Text too small, or too long</h2>
<p>Body text below about 16px is hard to read on phones. Lines that run edge to edge with no padding are tiring. Headings sized for desktop can take up the whole screen on mobile; they need smaller sizes on small screens.</p>
<h2>Cause 5: Buttons and links too close together</h2>
<p>Fingers are less precise than a mouse. Links and buttons need enough size and space to tap accurately. Menus with tiny, tightly packed links are a common complaint.</p>
<h2>Cause 6: Menus that don't work</h2>
<p>A desktop menu squeezed onto a phone, or a mobile menu that opens behind other content, can't be closed, or doesn't scroll when it's long. Test opening, scrolling and closing the menu on several pages.</p>
<h2>Cause 7: Pop-ups and banners that cover the screen</h2>
<p>A pop-up that's fine on a laptop can cover the whole phone screen with a close button off the edge. Cookie banners, chat widgets, newsletter pop-ups and sticky bars stacked together can leave almost no room for content. Google also discourages intrusive interstitials that block content on mobile.</p>
<h2>Cause 8: Page builder settings</h2>
<p>Page builders let you set different layouts for desktop, tablet and mobile. Often only the desktop version was ever adjusted, or elements were hidden on mobile that were actually needed. Check each section's mobile settings.</p>
<h2>Cause 9: Third-party content</h2>
<p>Embedded forms, booking widgets, review carousels and ad scripts sometimes aren't responsive. If a widget breaks the layout, check its settings for a responsive option, or replace it.</p>
<h2>Fix or rebuild?</h2>
<p>If only a few pages or elements are broken, targeted CSS and content fixes are enough. If the whole layout was never built for mobile, a rebuild with a modern, mobile-first theme is usually quicker and cheaper than patching every page. Our post on <a href="/blog/signs-you-need-website-redesign/">signs you need a website redesign</a> helps you decide.</p>
<h2>Why it matters</h2>
<p>Most visitors to most business sites are on phones, and Google uses the mobile version of your pages for indexing and ranking. A site that breaks on mobile loses visitors and rankings at the same time.</p>
<h2>Mobile questions</h2>
<p><strong>It looks fine on my phone but customers complain. Why?</strong> Different screen sizes, browsers and settings such as larger system text show different problems. Test on several devices, including older and smaller ones.</p>
<p><strong>Do I need a separate mobile site?</strong> No. Separate mobile sites (m.example.com) are outdated. One responsive site that adapts to every screen is the standard.</p>
<p><strong>Can a plugin make my site mobile-friendly?</strong> Not reliably. Mobile layout comes from the theme and content, not an add-on.</p>`,
  conclution: `<p>Test on a real, cheap Android phone over mobile data. It shows problems no desktop browser will. Fix the pages that get the most traffic first, and only rebuild if the whole layout was never responsive.</p>`,
}
