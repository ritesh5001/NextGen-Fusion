import type { CalendarPost } from '../types'

export const post: CalendarPost = {
  day: 55,
  title: "Progressive web apps (PWA): an app-like experience without the app store",
  slug: "progressive-web-apps",
  excerpt: "Progressive web apps explained: an app-like experience without the app store, what PWAs can and can't do in 2026, and when to choose one over native.",
  category: "Mobile Apps",
  primaryKeyword: "what is a progressive web app",
  cover_image: "/projects/nextmentor/screenshot-1.png",
  introduction: `<p>A progressive web app (PWA) is a website built to behave like an app: it can be installed to a phone's home screen, open full-screen, work offline or on poor connections, and send notifications, all without going through an app store. For many businesses, a PWA gives most of the benefit of an app at a fraction of the cost, with one codebase and instant updates. It's less suitable when you need deep device features or the visibility of being in the app stores.</p>
<p>For a lot of businesses, a PWA turns out to be the sensible middle ground between a website and a full app.</p>`,
  content: `<h2>What makes a website a PWA</h2>
<ul>
<li><strong>A web app manifest:</strong> a file describing the app's name, icons and how it opens, so it can be installed.</li>
<li><strong>A service worker:</strong> a script that runs in the background, caching files and data so the app loads quickly and works offline, and handling push notifications.</li>
<li><strong>HTTPS:</strong> required for service workers.</li>
</ul>
<p>Google's <a href="https://web.dev/explore/progressive-web-apps" rel="noopener">web.dev guide to PWAs</a> covers the technical details.</p>
<h2>What PWAs can do in 2026</h2>
<ul>
<li><strong>Install to the home screen</strong> on Android and iPhone, with an icon and full-screen launch.</li>
<li><strong>Work offline</strong> or on weak connections, using cached pages and data.</li>
<li><strong>Send push notifications</strong>, on Android and, for installed web apps, on recent iOS versions.</li>
<li><strong>Use many device features:</strong> camera, location, file uploads, sharing, payments in the browser.</li>
<li><strong>Update instantly:</strong> users always get the latest version, with no store review.</li>
<li><strong>Be found in search:</strong> PWA pages can rank in Google like any website.</li>
</ul>
<h2>Where PWAs fall short</h2>
<ul>
<li><strong>App store presence:</strong> many users look for apps in stores. PWAs can be listed in some stores with extra work, but it isn't their natural home.</li>
<li><strong>iPhone limitations:</strong> Apple supports PWAs but with more restrictions than Android, and installation is less obvious to users.</li>
<li><strong>Deep device access:</strong> Bluetooth, background location, some sensors and advanced background tasks are limited or unavailable.</li>
<li><strong>Heavy performance needs:</strong> games and graphics-intensive apps are better native.</li>
<li><strong>User familiarity:</strong> "add to home screen" is less familiar than downloading from a store.</li>
</ul>
<h2>When a PWA is the better choice</h2>
<ul>
<li>You want an app-like experience for repeat customers without the cost of native apps.</li>
<li>Customers find you through search and links, not the app stores.</li>
<li>Offline or low-connectivity use matters: field staff, rural areas, events.</li>
<li>You need one product that works on every device and updates instantly.</li>
<li>You're testing whether customers will use an app at all before investing in native.</li>
</ul>
<h2>When a native app is still better</h2>
<ul>
<li>Deep device features are central.</li>
<li>App store visibility is a key acquisition channel.</li>
<li>Your audience is mostly on iPhone and notifications are essential.</li>
<li>The experience demands native performance.</li>
</ul>
<p>Our post on <a href="/blog/app-or-website/">whether you need an app or a website</a> covers the broader decision, and <a href="/blog/react-native-vs-flutter-2026/">React Native vs Flutter vs native</a> covers native options.</p>
<h2>Good PWA use cases</h2>
<ul>
<li>Ordering and booking for restaurants, salons and clinics.</li>
<li>Customer portals: invoices, orders, support tickets.</li>
<li>Internal tools for staff in the field.</li>
<li>Learning platforms and content libraries.</li>
<li>Event apps with schedules that must work offline.</li>
</ul>
<h2>Turning an existing site into a PWA</h2>
<p>Many modern websites can become PWAs by adding a manifest and service worker, then improving offline behaviour and performance. It works best on sites already built as web applications. A brochure site gains little from being installable unless customers return often.</p>
<h2>What a good PWA build involves</h2>
<ul>
<li><strong>A fast, responsive web app first.</strong> Installability doesn't fix a slow or clumsy site.</li>
<li><strong>A caching strategy:</strong> deciding which pages and data are available offline, and how stale data is refreshed.</li>
<li><strong>Offline behaviour designed on purpose:</strong> clear messages when something needs a connection, and queued actions that sync later where it makes sense.</li>
<li><strong>Install prompts at the right moment,</strong> after a visitor has used the site a few times, not on the first page view.</li>
<li><strong>Notification permission asked in context,</strong> when the visitor understands what they'll receive.</li>
<li><strong>Testing on real Android phones and iPhones,</strong> because behaviour differs between them.</li>
</ul>
<h2>PWA questions</h2>
<p><strong>Do PWAs work on iPhone?</strong> Yes, with more limits than on Android. Users install them from Safari's share menu, and notifications work for installed web apps on recent iOS versions.</p>
<p><strong>Can a PWA take payments?</strong> Yes, through normal web payment methods and gateways, the same way a website does.</p>
<p><strong>Is a PWA cheaper than a native app?</strong> Usually, because one codebase serves every device and there's no store release process. It still needs good design, testing and maintenance.</p>`,
  conclution: `<p>If your customers come back often and need something app-like, a PWA is worth considering before a native app. If you need deep device features or store visibility, go native.</p>
<p>Not sure which? Our <a href="/services/android-app-development-services/">app team</a> can help you decide.</p>`,
}
