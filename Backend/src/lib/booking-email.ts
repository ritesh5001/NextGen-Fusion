import { Resend } from 'resend'

let resendClient: Resend | null = null

function getResend(): Resend {
  if (resendClient) return resendClient
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY is not set')
  resendClient = new Resend(key)
  return resendClient
}

function escapeHtml(value: string | null | undefined): string {
  if (!value) return ''
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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

/** A valid IANA zone, or India's when the browser sent something unusable. */
export function safeTimezone(timezone: string | null | undefined, fallback = 'Asia/Kolkata'): string {
  if (!timezone) return fallback
  try {
    new Intl.DateTimeFormat('en', { timeZone: timezone })
    return timezone
  } catch {
    return fallback
  }
}

/** "Tue, 6 Oct 2026, 4:30 pm" in the given zone. */
export function formatInZone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  }).format(date)
}

type BookingEmailArgs = {
  name: string
  email: string
  phone?: string | null
  companyName?: string | null
  projectSummary?: string | null
  budget?: string | null
  timeline?: string | null
  /** How the visitor wants to be called, e.g. "WhatsApp call". */
  callMethod?: string | null
  startsAt: string
  endsAt: string
  /** The visitor's own time zone, from their browser. */
  timezone: string
}

const STUDIO_TIMEZONE = 'Asia/Kolkata'

function fromAddress() {
  const fromName = process.env.RESEND_FROM_NAME || 'NextGen Fusion'
  const fromEmail = process.env.RESEND_FROM_EMAIL
  if (!fromEmail) throw new Error('RESEND_FROM_EMAIL is not set')
  return `${fromName} <${fromEmail}>`
}

/** Internal alert to the team. Reply goes straight to the visitor. */
export async function sendBookingConfirmedEmail(args: BookingEmailArgs): Promise<{ messageId: string | null }> {
  const start = new Date(args.startsAt)
  const studioTime = formatInZone(start, STUDIO_TIMEZONE)
  const visitorZone = safeTimezone(args.timezone)
  const visitorTime = visitorZone === STUDIO_TIMEZONE ? null : `${formatInZone(start, visitorZone)} (${visitorZone})`

  const to = process.env.BOOKING_ALERT_EMAIL || 'contact@nextgenfusion.in'
  const subject = `New booking: ${args.name} · ${studioTime} IST`
  const row = (label: string, value: string | null | undefined) =>
    `<tr><td style="padding:8px 0;font-weight:600;width:170px;vertical-align:top">${label}</td><td style="padding:8px 0">${escapeHtml(value) || '—'}</td></tr>`
  const html = wrapHtml(`
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">New discovery call booked</h2>
    <p style="margin:0 0 18px;font-size:16px;color:#334155">Reply to this email to reach ${escapeHtml(args.name)} directly.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
      ${row('When (IST)', studioTime)}
      ${visitorTime ? row('Their local time', visitorTime) : ''}
      ${row('Call by', args.callMethod)}
      ${row('Name', args.name)}
      ${row('Email', args.email)}
      ${row('Phone', args.phone)}
      ${row('Company', args.companyName)}
      ${row('Budget', args.budget)}
      ${row('Timeline', args.timeline)}
      ${row('What to discuss', args.projectSummary)}
    </table>
  `)

  const res = await getResend().emails.send({ from: fromAddress(), to, subject, html, replyTo: args.email })
  if (res.error) throw new Error(res.error.message || 'Resend error')
  return { messageId: res.data?.id ?? null }
}

function icsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function icsEscape(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1')
}

/** A calendar file the visitor can open to add the call to any calendar app. */
function buildIcs(args: BookingEmailArgs, uid: string): string {
  const description = [
    'Discovery call with NextGen Fusion.',
    args.callMethod ? `How we'll connect: ${args.callMethod}.` : '',
    'To change the time, reply to the confirmation email.',
  ]
    .filter(Boolean)
    .join('\n')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NextGen Fusion//Booking//EN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}@nextgenfusion.in`,
    `DTSTAMP:${icsDate(new Date())}`,
    `DTSTART:${icsDate(new Date(args.startsAt))}`,
    `DTEND:${icsDate(new Date(args.endsAt))}`,
    'SUMMARY:Discovery call with NextGen Fusion',
    `DESCRIPTION:${icsEscape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

/** Confirmation to the visitor, in their own time zone, with a calendar file. */
export async function sendBookingGuestConfirmation(
  args: BookingEmailArgs & { bookingId: string },
): Promise<{ messageId: string | null }> {
  const start = new Date(args.startsAt)
  const zone = safeTimezone(args.timezone)
  const localTime = formatInZone(start, zone)
  const firstName = args.name.split(/\s+/)[0] || args.name
  const replyTo = process.env.BOOKING_ALERT_EMAIL || process.env.RESEND_REPLY_TO || undefined

  const html = wrapHtml(`
    <h2 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#0f172a">Your call is booked</h2>
    <p style="margin:0 0 16px">Hi ${escapeHtml(firstName)}, thanks for booking a call with NextGen Fusion.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px;background:#f1f5f9;border-radius:10px">
      <tr><td style="padding:16px 18px">
        <div style="font-size:13px;color:#64748b">When</div>
        <div style="font-size:18px;font-weight:600">${escapeHtml(localTime)}</div>
        <div style="font-size:13px;color:#64748b">${escapeHtml(zone)} · 30 minutes</div>
        ${args.callMethod ? `<div style="margin-top:10px;font-size:13px;color:#64748b">How we'll connect</div><div style="font-weight:600">${escapeHtml(args.callMethod)}</div>` : ''}
      </td></tr>
    </table>
    <p style="margin:0 0 12px">We'll read what you sent before the call, so we can come with questions and ideas. After the call you'll get a written, fixed quote, usually within one working day.</p>
    <p style="margin:0 0 12px">The attached calendar file adds the call to your calendar. Need a different time? Just reply to this email.</p>
    <p style="margin:24px 0 0;font-size:14px;color:#64748b">— The NextGen Fusion team</p>
  `)

  const res = await getResend().emails.send({
    from: fromAddress(),
    to: args.email,
    subject: `Your call with NextGen Fusion: ${localTime}`,
    html,
    replyTo,
    attachments: [
      { filename: 'nextgen-fusion-call.ics', content: Buffer.from(buildIcs(args, args.bookingId)).toString('base64') },
    ],
  })
  if (res.error) throw new Error(res.error.message || 'Resend error')
  return { messageId: res.data?.id ?? null }
}
