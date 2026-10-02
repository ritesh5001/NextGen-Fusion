import Script from "next/script"

/**
 * GA4 measurement ID. Hardcoded on purpose: it is a public identifier that
 * ships in the page source anyway, so putting it in env only adds a way for
 * analytics to silently go missing in production.
 */
export const GA_MEASUREMENT_ID = "G-F54LGZJNLS"

/**
 * GA4 + Microsoft Clarity, loaded after the page is usable.
 *
 * gtag.js is ~180 KB and was the largest script on every page, parsed during
 * load on phones. Now the `gtag()` queue exists immediately (so trackEvent and
 * the page_view config are recorded from the start), but the library itself is
 * fetched on the first interaction — tap, scroll, key — or 8s after load,
 * whichever comes first. Queued calls are sent when it arrives. A visitor who
 * leaves within 8s without touching the page is not counted.
 *
 * Clarity stays env-gated: NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
 *
 * Conversion events are fired via `trackEvent` in src/lib/analytics.ts.
 */
export function Analytics() {
  const gaId = GA_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  const loader = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', '${gaId}');
    (function () {
      var done = false;
      var events = ['pointerdown', 'keydown', 'scroll', 'touchstart'];
      function inject(src) {
        var s = document.createElement('script');
        s.async = true;
        s.src = src;
        document.head.appendChild(s);
      }
      function load() {
        if (done) return;
        done = true;
        events.forEach(function (e) { window.removeEventListener(e, load); });
        inject('https://www.googletagmanager.com/gtag/js?id=${gaId}');
        ${
          clarityId
            ? `(function(c,l,a,r,i){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};inject('https://www.clarity.ms/tag/'+i);})(window,document,'clarity','script','${clarityId}');`
            : ""
        }
      }
      events.forEach(function (e) { window.addEventListener(e, load, { once: true, passive: true }); });
      function later() { setTimeout(load, 8000); }
      if (document.readyState === 'complete') later();
      else window.addEventListener('load', later, { once: true });
    })();
  `

  return (
    <Script id="analytics-loader" strategy="afterInteractive">
      {loader}
    </Script>
  )
}
