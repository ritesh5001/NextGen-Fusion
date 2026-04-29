import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  resendClient = new Resend(key)
  return resendClient
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

export async function sendBookingConfirmedEmail(args: {
  name: string
  email: string
  phone?: string | null
  companyName?: string | null
  projectSummary?: string | null
  budget?: string | null
  timeline?: string | null
  slotLabel: string
  timezone: string
}): Promise<{ messageId: string | null }> {
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) throw new Error('RESEND_FROM_EMAIL is not set')
  const replyTo = process.env.RESEND_REPLY_TO || undefined

  const to = process.env.BOOKING_ALERT_EMAIL || 'nextgenfusion.devs@gmail.com'
  const subject = `New booking confirmed: ${args.name} · ${args.slotLabel}`
  const html = wrapHtml(`
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">New booking confirmed</h2>
    <p style="margin:0 0 18px;font-size:16px;color:#334155">A visitor booked a call through the website.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      <tr><td style="padding:8px 0;font-weight:600;width:170px">Name</td><td style="padding:8px 0">${args.name}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Email</td><td style="padding:8px 0">${args.email}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Phone</td><td style="padding:8px 0">${args.phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Company</td><td style="padding:8px 0">${args.companyName || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Booked slot</td><td style="padding:8px 0">${args.slotLabel}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Timezone</td><td style="padding:8px 0">${args.timezone}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Budget</td><td style="padding:8px 0">${args.budget || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600">Timeline</td><td style="padding:8px 0">${args.timeline || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;vertical-align:top">Project summary</td><td style="padding:8px 0">${args.projectSummary || '—'}</td></tr>
    </table>
  `)

  const res = await getResend().emails.send({
    from: `${fromName} <${fromEmail}>`,
    to,
    subject,
    html,
    replyTo,
  })

  if (res.error) throw new Error(res.error.message || 'Resend error')
  return { messageId: res.data?.id ?? null }
}
