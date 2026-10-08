import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 57,
  title: "Too many Shopify apps? How app bloat hurts speed, monthly costs and conversion",
  slug: "shopify-app-bloat",
  excerpt: "Too many Shopify apps? How app bloat hurts speed, monthly costs and conversion, how to audit your apps, and how to remove them without leaving code behind.",
  category: "E-commerce",
  primaryKeyword: "too many shopify apps",
  cover_image: "/projects/vashtaraheaven/screenshot-1.png",
  introduction: `<p>Every Shopify app you install can add scripts to your storefront, a monthly charge to your bill, and another moving part that can break. A handful of well-chosen apps is normal. Twenty, half of them forgotten, usually means a slower store, a bigger monthly bill and pages cluttered with pop-ups and badges that make the store look less trustworthy. An audit every few months keeps it under control.</p>`,
  content: `<h2>How app bloat happens</h2>
<ul>
<li>An app is installed to try a feature and never removed.</li>
<li>Two apps end up doing the same job (two review apps, two upsell apps).</li>
<li>A newer theme now does what an app was installed for.</li>
<li>A campaign ends but its countdown timer or pop-up app stays.</li>
<li>An app is uninstalled but leaves code in the theme.</li>
</ul>
<h2>What it costs you</h2>
<h3>Speed</h3>
<p>Apps that change the storefront often load their own JavaScript and CSS on every page, sometimes from their own servers. Each one adds weight and work for the browser, especially on mobile. Our <a href="/blog/shopify-speed-optimisation/">Shopify speed guide</a> explains how this shows up in the measurements.</p>
<h3>Money</h3>
<p>Monthly app charges add up quietly, and many are billed in dollars, so the cost moves with the exchange rate. Some charge by order volume, so they get more expensive as you grow.</p>
<h3>Conversion</h3>
<p>Pop-ups, spin wheels, sticky bars, chat bubbles, trust badges, "someone just bought" notifications and countdown timers stacked on one page make a store feel pushy and cheap, and cover the content buyers need. See <a href="/blog/shopify-visitors-no-sales/">visitors but no sales</a> for the conversion side.</p>
<h3>Reliability</h3>
<p>More apps mean more conflicts, especially in the cart and product pages, and more things to check after every theme update.</p>
<h2>How to audit your apps</h2>
<ol>
<li><strong>List every installed app</strong> from the Apps page: what it does, monthly cost, who installed it and when.</li>
<li><strong>Ask "what would break if we removed it?"</strong> for each. If nobody knows, that's a candidate.</li>
<li><strong>Check for overlaps:</strong> two apps doing one job, or an app doing what your theme now does natively (filters, swatches, product tabs, mega menus).</li>
<li><strong>Check what each adds to the storefront:</strong> app embeds in the theme editor, and scripts visible in your browser's developer tools.</li>
<li><strong>Measure impact:</strong> test key pages' speed with an app's embed switched off in a duplicate theme.</li>
<li><strong>Look at results:</strong> does the upsell app actually produce upsells? Does the pop-up collect emails that convert?</li>
</ol>
<h2>Keep, replace or remove</h2>
<ul>
<li><strong>Keep:</strong> apps tied to revenue or operations (reviews, subscriptions, shipping, accounting, key integrations), if they perform.</li>
<li><strong>Replace:</strong> heavy apps used for something your theme or a lighter app can do.</li>
<li><strong>Remove:</strong> unused apps, duplicate apps, expired campaign apps, and anything with no measurable benefit.</li>
</ul>
<h2>How to remove an app cleanly</h2>
<ol>
<li>Duplicate your live theme as a backup.</li>
<li>Turn off the app's embeds and remove its blocks in the theme editor.</li>
<li>Uninstall the app.</li>
<li>Check the theme code for leftover snippets older apps may have added directly, and remove them carefully, or ask a developer.</li>
<li>Test product pages, cart and checkout on mobile.</li>
<li>Cancel any separate subscription the app billed outside Shopify.</li>
</ol>
<p>Apps built on Shopify's newer app embed system usually remove their storefront code automatically when uninstalled. Older apps that edited theme files directly often don't.</p>
<h2>Apps that usually earn their place</h2>
<p>Not every app is bloat. In most stores we work on, a review app, the shipping or logistics integration, an accounting or invoicing connection and, for some brands, subscriptions or wholesale tools pay for themselves clearly. The ones to question hardest are the storefront decorations: pop-ups, timers, badges, social proof notifications and "frequently bought together" widgets that nobody has measured. Measure one for a month; if it can't show its effect on orders, it goes.</p>
<h2>Prevent it coming back</h2>
<ul>
<li>Agree who can install apps.</li>
<li>Before installing, check whether the theme already does it, and read recent reviews.</li>
<li>Trial apps on a duplicate theme where possible.</li>
<li>Review the app list every quarter.</li>
</ul>
<h2>App questions store owners ask</h2>
<p><strong>How many apps is too many?</strong> There's no fixed number. Judge each app by what it adds to the storefront, what it costs and what it earns.</p>
<p><strong>Do backend-only apps slow the store?</strong> Apps that work only in the admin (accounting, inventory, reports) usually don't affect storefront speed.</p>
<p><strong>Can a developer replace several apps with custom code?</strong> Often, yes, for simple features. It removes monthly fees and scripts, though the code then needs maintaining.</p>`,
  conclution: `<p>Put a quarterly reminder in the calendar to go through the app list. Anything nobody can explain, anything that duplicates another app, and anything with no measurable effect on orders can usually go.</p>`,
}
