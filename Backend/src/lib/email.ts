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
  if (contact.custom_fields && typeof contact.custom_fields === 'object') {
    for (const [k, v] of Object.entries(contact.custom_fields)) {
      if (!(k in map) && v != null) map[k] = String(v)
    }
  }
  return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key) => map[key] ?? '')
}

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
      replyTo,
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Delivery email after a store purchase: license key + secure download link.
export async function sendProductDeliveryEmail(args: {
  to: string
  name?: string | null
  productTitle: string
  licenseKey: string
  downloadUrl: string
}): Promise<SendResult> {
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const subject = `Your download — ${args.productTitle}`
  if (!fromEmail) {
    return { ok: false, error: 'RESEND_FROM_EMAIL env is not set', subject }
  }
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const replyTo = process.env.RESEND_REPLY_TO || undefined
  const safeName = escapeHtml(args.name?.trim() || 'there')
  const safeTitle = escapeHtml(args.productTitle)
  const safeKey = escapeHtml(args.licenseKey)
  const safeUrl = escapeHtml(args.downloadUrl)

  try {
    const res = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: args.to,
      subject,
      html: wrapHtmlEmail(`
        <p style="margin:0 0 16px">Hi ${safeName},</p>
        <p style="margin:0 0 20px">Thanks for your purchase of <strong>${safeTitle}</strong>. Here's your download and license.</p>
        <p style="margin:0 0 8px;font-size:13px;color:#64748b">License key</p>
        <p style="margin:0 0 20px"><code style="display:inline-block;background:#f1f5f9;border-radius:6px;padding:8px 12px;font-family:monospace;font-size:14px">${safeKey}</code></p>
        <p style="margin:0 0 20px">
          <a href="${safeUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;padding:12px 20px;font-weight:600">Download your product</a>
        </p>
        <p style="margin:0;color:#64748b;font-size:13px">Keep this email — you can re-download from the link above. Need help? Just reply.</p>
      `),
      replyTo,
    })
    if (res.error) {
      return { ok: false, error: res.error.message || 'Resend error', subject }
    }
    return { ok: true, messageId: res.data?.id ?? null, subject }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err), subject }
  }
}

export async function sendPasswordResetEmail(args: {
  to: string
  name?: string | null
  resetUrl: string
}): Promise<SendResult> {
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    return { ok: false, error: 'RESEND_FROM_EMAIL env is not set', subject: 'Reset your NextGen Fusion password' }
  }
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const replyTo = process.env.RESEND_REPLY_TO || undefined
  const safeName = escapeHtml(args.name?.trim() || 'there')
  const safeResetUrl = escapeHtml(args.resetUrl)
  const subject = 'Reset your NextGen Fusion password'

  try {
    const res = await getResend().emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: args.to,
      subject,
      html: wrapHtmlEmail(`
        <p style="margin:0 0 16px">Hi ${safeName},</p>
        <p style="margin:0 0 20px">Use the button below to reset your NextGen Fusion portal password. This link expires in 1 hour.</p>
        <p style="margin:0 0 20px">
          <a href="${safeResetUrl}" style="display:inline-block;background:#0f172a;color:#ffffff;text-decoration:none;border-radius:8px;padding:10px 16px;font-weight:600">Reset password</a>
        </p>
        <p style="margin:0;color:#64748b;font-size:13px">If you did not request this, you can ignore this email.</p>
      `),
      replyTo,
    })
    if (res.error) {
      return { ok: false, error: res.error.message || 'Resend error', subject }
    }
    return { ok: true, messageId: res.data?.id ?? null, subject }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err), subject }
  }
}
