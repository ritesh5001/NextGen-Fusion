import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  resendClient = new Resend(key)
  return resendClient
}

/** Where new /careers applications are announced. Intentionally hardcoded. */
export const CAREERS_ALERT_EMAIL = 'contact@nextgenfusion.in'

/**
 * Applicant-supplied values land inside an HTML email that our own team opens,
 * so every interpolated field is escaped. Without this, a cover note containing
 * markup would render as live HTML in the admin's inbox.
 */
function escapeHtml(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function orDash(value: string | null | undefined): string {
  const escaped = escapeHtml(value)
  return escaped.trim() ? escaped : '—'
}

function wrapHtml(innerHtml: string) {
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
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.06)">
            <tr>
              <td style="padding:32px 36px;font-size:15px;line-height:1.65;color:#0f172a">
                ${innerHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function senderIdentity() {
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) throw new Error('RESEND_FROM_EMAIL is not set')
  return { from: `${fromName} <${fromEmail}>`, fromName }
}

export type CareerApplicationEmailArgs = {
  roleTitle: string
  name: string
  email: string
  phone: string
  location?: string | null
  experience?: string | null
  portfolioUrl?: string | null
  coverNote?: string | null
  resumeFilename?: string | null
  applicationId: string
}

/** Internal alert so the team sees a new application without opening the panel. */
export async function sendCareerAdminAlert(
  args: CareerApplicationEmailArgs,
): Promise<{ messageId: string | null }> {
  const { from } = senderIdentity()
  const to = CAREERS_ALERT_EMAIL

  const html = wrapHtml(`
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">New job application</h2>
    <p style="margin:0 0 18px;font-size:16px;color:#334155">
      <strong>${escapeHtml(args.name)}</strong> applied for
      <strong>${escapeHtml(args.roleTitle)}</strong>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tr><td style="padding:8px 0;font-weight:600;width:170px">Role</td><td style="padding:8px 0">${escapeHtml(args.roleTitle)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Name</td><td style="padding:8px 0">${escapeHtml(args.name)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Email</td><td style="padding:8px 0">${escapeHtml(args.email)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Phone</td><td style="padding:8px 0">${escapeHtml(args.phone)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Location</td><td style="padding:8px 0">${orDash(args.location)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Experience</td><td style="padding:8px 0">${orDash(args.experience)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Portfolio</td><td style="padding:8px 0">${orDash(args.portfolioUrl)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Resume</td><td style="padding:8px 0">${orDash(args.resumeFilename)}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Why a good fit</td><td style="padding:8px 0;white-space:pre-wrap">${orDash(args.coverNote)}</td></tr>
    </table>
    <p style="margin:24px 0 0;font-size:14px;color:#64748b">
      Download the resume from the Career Applications panel in the admin dashboard.
      Reply to this email to reach the candidate directly.
    </p>
  `)

  const res = await getResend().emails.send({
    from,
    to,
    subject: `New application: ${args.roleTitle} — ${args.name}`,
    html,
    // Replying to the alert should reach the candidate, not our own inbox.
    replyTo: args.email,
  })

  if (res.error) throw new Error(res.error.message || 'Resend error')
  return { messageId: res.data?.id ?? null }
}

/** Confirmation to the applicant so they know the upload actually landed. */
export async function sendCareerApplicantAck(
  args: CareerApplicationEmailArgs,
): Promise<{ messageId: string | null }> {
  const { from } = senderIdentity()
  // Candidate replies belong in the careers inbox, not the general reply-to.
  const replyTo = CAREERS_ALERT_EMAIL
  const firstName = (args.name || '').trim().split(/\s+/)[0] || 'there'

  const html = wrapHtml(`
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">We got your application</h2>
    <p style="margin:0 0 18px;font-size:16px;color:#334155">
      Hi ${escapeHtml(firstName)}, thanks for applying to NextGen Fusion. Your application for
      <strong>${escapeHtml(args.roleTitle)}</strong> is in, and your resume uploaded successfully.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#f8fafc;border-radius:8px">
      <tr><td style="padding:12px 16px;font-weight:600;width:140px">Role</td><td style="padding:12px 16px">${escapeHtml(args.roleTitle)}</td></tr>
      <tr><td style="padding:12px 16px;font-weight:600">Resume</td><td style="padding:12px 16px">${orDash(args.resumeFilename)}</td></tr>
      <tr><td style="padding:12px 16px;font-weight:600">Reference</td><td style="padding:12px 16px">${escapeHtml(args.applicationId)}</td></tr>
    </table>
    <h3 style="margin:28px 0 10px;font-size:17px;color:#0f172a">What happens next</h3>
    <p style="margin:0 0 18px;font-size:15px;color:#334155">
      We read every application and reply within a week, either way. If your background fits, the
      next step is a short intro call, then a small paid practical task close to the real work.
    </p>
    <p style="margin:0;font-size:15px;color:#334155">
      No need to reply to this email — but if you want to add anything, just respond and it reaches us.
    </p>
    <p style="margin:28px 0 0;font-size:14px;color:#64748b">— The NextGen Fusion team</p>
  `)

  const res = await getResend().emails.send({
    from,
    to: args.email,
    subject: `Application received: ${args.roleTitle}`,
    html,
    replyTo,
  })

  if (res.error) throw new Error(res.error.message || 'Resend error')
  return { messageId: res.data?.id ?? null }
}
