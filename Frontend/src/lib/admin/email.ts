import { Resend } from 'resend'
import type { Campaign, Contact } from './supabase'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  resendClient = new Resend(key)
  return resendClient
}

/**
 * Replace {{name}}, {{email}}, {{company}} … tokens with contact fields.
 */
export function renderTemplate(template: string, contact: Contact): string {
  if (!template) return ''
  const map: Record<string, string> = {
    name: contact.name || 'there',
    first_name: (contact.name || '').split(' ')[0] || 'there',
    email: contact.email,
    company: contact.company || '',
    phone: contact.phone || '',
    website: contact.website || '',
    industry: contact.industry || '',
  }
  // Merge custom_fields (lower priority — only if not already defined)
  if (contact.custom_fields && typeof contact.custom_fields === 'object') {
    for (const [k, v] of Object.entries(contact.custom_fields)) {
      if (!(k in map) && v != null) map[k] = String(v)
    }
  }
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key) => {
    return map[key] ?? ''
  })
}

/**
 * Default professional HTML wrapper. Used when a campaign body is plain
 * (no <html> tag) to give it consistent styling.
 */
export function wrapHtmlEmail(innerHtml: string, opts?: { unsubscribeUrl?: string }) {
  if (innerHtml.trim().toLowerCase().startsWith('<!doctype') || innerHtml.includes('<html')) {
    return innerHtml
  }
  const unsub = opts?.unsubscribeUrl
    ? `<p style="margin-top:32px;font-size:12px;color:#94a3b8;text-align:center">Don't want these emails? <a href="${opts.unsubscribeUrl}" style="color:#94a3b8;text-decoration:underline">Unsubscribe</a>.</p>`
    : ''
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;box-shadow:0 1px 3px rgba(15,23,42,0.06);overflow:hidden">
            <tr>
              <td style="padding:32px 40px;font-size:15px;line-height:1.65;color:#0f172a">
                ${innerHtml}
              </td>
            </tr>
          </table>
          ${unsub}
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export type SendArgs = {
  campaign: Campaign
  contact: Contact
  type: 'initial' | `followup_${number}`
}

export type SendResult =
  | { ok: true; messageId: string | null; subject: string }
  | { ok: false; error: string; subject: string }

export async function sendCampaignEmail({ campaign, contact, type }: SendArgs): Promise<SendResult> {
  const isFollowup = type !== 'initial'
  const rawSubject = isFollowup
    ? campaign.followup_subject || `Re: ${campaign.subject}`
    : campaign.subject
  const rawBody = isFollowup
    ? campaign.followup_body_html || campaign.body_html
    : campaign.body_html

  const subject = renderTemplate(rawSubject, contact)
  const body = wrapHtmlEmail(renderTemplate(rawBody, contact))
  const fromName = campaign.from_name || process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const fromEmail = campaign.from_email || process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    return { ok: false, error: 'No from_email set on campaign or RESEND_FROM_EMAIL env', subject }
  }
  const replyTo = campaign.reply_to || process.env.RESEND_REPLY_TO || undefined

  try {
    const res = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: contact.email,
      subject,
      html: body,
      replyTo: replyTo,
    })
    if (res.error) {
      return { ok: false, error: res.error.message || 'Resend error', subject }
    }
    return { ok: true, messageId: res.data?.id ?? null, subject }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      subject,
    }
  }
}
