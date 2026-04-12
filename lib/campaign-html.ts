import { signTrackingToken } from './campaign-tracking';

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function instrumentCampaignHtml({
  html,
  campaignId,
  recipientId,
}: {
  html: string;
  campaignId: string;
  recipientId: string;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.CAMPAIGN_PUBLIC_BASE_URL ||
    'http://localhost:3000';

  const clickReplaced = html.replace(
    /href\s*=\s*(["'])(https?:\/\/[^"']+)\1/gi,
    (_full, quote: string, rawUrl: string) => {
      const token = signTrackingToken({
        campaignId,
        recipientId,
        type: 'click',
        url: rawUrl,
      });
      const trackedUrl = `${baseUrl}/api/tracking/click?token=${encodeURIComponent(token)}`;

      return `href=${quote}${escapeHtmlAttribute(trackedUrl)}${quote}`;
    }
  );

  const openToken = signTrackingToken({
    campaignId,
    recipientId,
    type: 'open',
  });
  const pixelTag = `<img src="${escapeHtmlAttribute(
    `${baseUrl}/api/tracking/open?token=${encodeURIComponent(openToken)}`
  )}" alt="" width="1" height="1" style="display:none;" />`;

  if (clickReplaced.includes('</body>')) {
    return clickReplaced.replace('</body>', `${pixelTag}</body>`);
  }

  return `${clickReplaced}${pixelTag}`;
}
