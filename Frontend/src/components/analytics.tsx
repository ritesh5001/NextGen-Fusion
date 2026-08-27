import Script from "next/script"

/**
 * GA4 measurement ID. Hardcoded on purpose: it is a public identifier that
 * ships in the page source anyway, so putting it in env only adds a way for
 * analytics to silently go missing in production.
 */
export const GA_MEASUREMENT_ID = "G-F54LGZJNLS"

/**
 * GA4 + Microsoft Clarity.
 *
 * Clarity stays env-gated and renders nothing until its project ID is set:
 *   NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
 *
 * Conversion events are fired via `trackEvent` in src/lib/analytics.ts.
 */
export function Analytics() {
  const gaId = GA_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID

  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {clarityId && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      )}
    </>
  )
}
