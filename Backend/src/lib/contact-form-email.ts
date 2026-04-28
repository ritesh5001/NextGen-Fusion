import { Resend } from 'resend'
import type { ContactFormSubmission } from './supabase'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  resendClient = new Resend(key)
  return resendClient
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function defaultAcknowledgementSubject(form: Pick<ContactFormSubmission, 'name'>): string {
  const name = form.name?.trim() || 'there'
  return `We got your message, ${name}`
}

export function defaultAcknowledgementBody(form: Pick<ContactFormSubmission, 'name' | 'message' | 'information_source'>): string {
  const name = escapeHtml(form.name?.trim() || 'there')
  const source = escapeHtml(form.information_source || 'your website form')
  const message = escapeHtml(form.message || '')

  return `
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">Thanks for reaching out, ${name}.</h2>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155">
      We received your message from ${source} and our team will review it shortly.
    </p>
    <div style="margin:24px 0;padding:16px;border-left:4px solid #111827;background:#f8fafc;border-radius:8px">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#64748b">Your message</p>
      <p style="margin:0;font-size:15px;line-height:1.7;color:#0f172a;white-space:pre-wrap">${message || 'No message provided.'}</p>
    </div>
    <p style="margin:0;font-size:16px;line-height:1.7;color:#334155">
      We will reach out soon. If you need anything urgent, just reply to this email.
    </p>
  `
}

export async function sendContactFormEmail(args: {
  to: string
  subject: string
  html: string
}): Promise<{ messageId: string | null }> {
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) {
    throw new Error('RESEND_FROM_EMAIL is not set')
  }
  const replyTo = process.env.RESEND_REPLY_TO || undefined

  const res = await getResend().emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: args.to,
    subject: args.subject,
    html: args.html,
    replyTo,
  })

  if (res.error) {
    throw new Error(res.error.message || 'Resend error')
  }

  return { messageId: res.data?.id ?? null }
}
