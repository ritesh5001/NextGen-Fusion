import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { sendContactFormEmail, defaultAcknowledgementBody, defaultAcknowledgementSubject } from '../lib/contact-form-email'
import { getSupabaseAdmin } from '../lib/supabase'

const router = Router()

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function trimString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function pickSubmission(body: any): Record<string, unknown> {
  return {
    name: trimString(body?.name),
    email: trimString(body?.email).toLowerCase(),
    phone: trimString(body?.phone),
    message: trimString(body?.message),
    information_source: trimString(body?.information_source),
  }
}

// Public endpoint used by the website contact form.
router.post('/contact-forms', async (req, res) => {
  try {
    const payload = pickSubmission(req.body)
    if (!payload.name || !payload.email || !payload.phone || !payload.message || !payload.information_source) {
      res.status(400).json({ error: 'name, email, phone, message, and information_source are required' })
      return
    }

    const sb = getSupabaseAdmin()
    const { data, error } = await sb
      .from('contact_forms')
      .insert(payload)
      .select()
      .single()

    if (error) {
      if (isMissingTableError(error)) {
        res.status(503).json({
          error: 'Contact form storage is not provisioned yet. Apply the contact_forms table schema first.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    res.status(201).json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

// Admin list view.
router.get('/admin/contact-forms', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = (req.query.q as string | undefined)?.trim() || ''
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)
    const status = (req.query.status as string | undefined)?.trim() || ''

    let query = sb
      .from('contact_forms')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`name.ilike.%${safe}%,email.ilike.%${safe}%,phone.ilike.%${safe}%,information_source.ilike.%${safe}%,message.ilike.%${safe}%`)
    }

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({
          data: [],
          count: 0,
          setupRequired: true,
          message: 'Contact form storage is not provisioned yet. Apply the contact_forms table schema to your Supabase project.',
        })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.get('/admin/contact-forms/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('contact_forms').select('*').eq('id', req.params.id).single()
    if (error) {
      res.status(404).json({ error: error.message })
      return
    }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.post('/admin/contact-forms/:id/email', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data: form, error } = await sb.from('contact_forms').select('*').eq('id', req.params.id).single()
    if (error || !form) {
      res.status(404).json({ error: error?.message || 'Form not found' })
      return
    }

    const subject = trimString(req.body?.subject) || defaultAcknowledgementSubject(form)
    const body = trimString(req.body?.body) || defaultAcknowledgementBody(form)
    if (!subject || !body) {
      res.status(400).json({ error: 'subject and body are required' })
      return
    }

    const html = body.trim().toLowerCase().startsWith('<!doctype') || body.includes('<html')
      ? body
      : `<!doctype html>
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
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const sendResult = await sendContactFormEmail({
      to: form.email,
      subject,
      html,
    })

    const nextCount = Number(form.email_count || 0) + 1
    const { data: updated, error: updateError } = await sb
      .from('contact_forms')
      .update({
        status: 'replied',
        admin_reply_subject: subject,
        admin_reply_body: body,
        last_emailed_at: new Date().toISOString(),
        email_count: nextCount,
        last_email_message_id: sendResult.messageId,
        last_email_error: null,
      })
      .eq('id', req.params.id)
      .select()
      .single()

    if (updateError) {
      res.status(500).json({ error: updateError.message })
      return
    }

    res.json({ data: updated })
  } catch (err) {
    try {
      const sb = getSupabaseAdmin()
      const message = err instanceof Error ? err.message : 'Internal error'
      await sb
        .from('contact_forms')
        .update({
          last_email_error: message,
        })
        .eq('id', req.params.id)
    } catch {
      // ignore secondary update failures
    }

    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
