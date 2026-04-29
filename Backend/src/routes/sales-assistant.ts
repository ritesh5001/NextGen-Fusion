import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { getSupabaseAdmin } from '../lib/supabase'
import { sendBookingConfirmedEmail } from '../lib/booking-email'

const router = Router()

type LeadPayload = {
  name?: string
  email?: string
  phone?: string
  companyName?: string
}

function trimString(value: unknown, max = 2000): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isMissingTableError(error: { code?: string; message?: string } | null | undefined): boolean {
  if (!error) return false
  return error.code === '42P01' || /schema cache|could not find the table/i.test(error.message || '')
}

function buildFallbackReply(message: string) {
  return {
    reply:
      `Thanks for reaching out. Based on what you shared, the best next step is to clarify your budget, desired launch timeline, and the main features you need.` +
      ` If you want, I can help scope the project and then move you straight to a booking request.`,
    leadStage: 'qualifying',
    shouldBookCall: /quote|price|cost|call|meeting|book/i.test(message),
    capturedBudget: null,
    capturedTimeline: null,
    capturedRequirements: message,
    summary: 'Visitor started a conversation and is looking for project guidance.',
  }
}

const BOOKING_TIMEZONE = 'Asia/Kolkata'
const SLOT_DURATION_MINUTES = 30
const BUSINESS_START_HOUR = 11
const BUSINESS_END_HOUR = 19

function formatSlotLabel(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timezone,
  }).format(date)
}

function buildUtcDateFromLocal(dateStr: string, hour: number, minute: number): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  const utc = Date.UTC(year, month - 1, day, hour - 5, minute - 30)
  return new Date(utc)
}

function getBookableSlots(dateStr: string): Array<{ startsAt: string; endsAt: string; label: string }> {
  const dayCheck = new Date(`${dateStr}T00:00:00+05:30`)
  if (dayCheck.getUTCDay() === 0) return []

  const slots: Array<{ startsAt: string; endsAt: string; label: string }> = []
  const now = Date.now()
  for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
    for (const minute of [0, 30]) {
      const start = buildUtcDateFromLocal(dateStr, hour, minute)
      const end = new Date(start.getTime() + SLOT_DURATION_MINUTES * 60 * 1000)
      if (start.getTime() <= now + 15 * 60 * 1000) continue
      slots.push({
        startsAt: start.toISOString(),
        endsAt: end.toISOString(),
        label: formatSlotLabel(start, BOOKING_TIMEZONE),
      })
    }
  }
  return slots
}

async function generateAssistantReply(args: {
  message: string
  history: Array<{ role: string; content: string }>
  lead: LeadPayload
}) {
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) return buildFallbackReply(args.message)

  const model = process.env.XAI_MODEL || 'grok-4-1-fast-non-reasoning'
  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.3,
      max_tokens: 900,
      messages: [
        {
          role: 'system',
          content:
            'You are the website sales assistant for NextGen Fusion, a web design and development agency. Your job is to answer pricing and process questions, qualify leads, ask for budget/timeline/requirements when missing, and push qualified leads toward booking a discovery call or requesting a callback. Return only valid JSON with these exact keys: reply, leadStage, shouldBookCall, capturedBudget, capturedTimeline, capturedRequirements, summary. reply should be concise, commercially sharp, and helpful. leadStage must be one of new, qualifying, qualified, booked. shouldBookCall must be boolean.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            lead: args.lead,
            latestMessage: args.message,
            conversationHistory: args.history.slice(-10),
            agencyContext: {
              services: [
                'Website development',
                'Web design',
                'eCommerce development',
                'SaaS/product builds',
                'AI automation',
                'SEO and growth systems',
              ],
              expectations: 'Ask follow-up questions when the brief is incomplete. Quote ranges, not fixed prices.',
            },
          }),
        },
      ],
    }),
  })

  if (!response.ok) throw new Error(`xAI request failed: ${response.status}`)
  const json = await response.json() as { choices?: Array<{ message?: { content?: string } }> }
  const content = json.choices?.[0]?.message?.content?.trim()
  if (!content) throw new Error('xAI returned empty content')
  return JSON.parse(content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''))
}

router.post('/chatbot/message', async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const conversationId = trimString(req.body?.conversationId, 80)
    const message = trimString(req.body?.message, 2500)
    const lead: LeadPayload = {
      name: trimString(req.body?.lead?.name, 120),
      email: trimString(req.body?.lead?.email, 180).toLowerCase(),
      phone: trimString(req.body?.lead?.phone, 60),
      companyName: trimString(req.body?.lead?.companyName, 180),
    }

    if (!message) {
      res.status(400).json({ error: 'message is required' })
      return
    }

    let activeConversationId = conversationId || crypto.randomUUID()
    let historyRows: Array<{ role: string; content: string }> = []
    let canPersist = true

    if (!conversationId) {
      const { data, error } = await sb
        .from('chatbot_conversations')
        .insert({
          name: lead.name || null,
          email: lead.email || null,
          phone: lead.phone || null,
          company_name: lead.companyName || null,
          status: 'active',
          source: 'website_chat',
        })
        .select('id')
        .single()
      if (error) {
        if (!isMissingTableError(error)) {
          res.status(500).json({ error: error.message })
          return
        }
        canPersist = false
      } else if (data?.id) {
        activeConversationId = data.id
      }
    }

    if (canPersist) {
      const { error: userMsgError } = await sb.from('chatbot_messages').insert({
        conversation_id: activeConversationId,
        role: 'user',
        content: message,
      })
      if (userMsgError) {
        if (!isMissingTableError(userMsgError)) {
          res.status(500).json({ error: userMsgError.message })
          return
        }
        canPersist = false
      }
    }

    if (canPersist) {
      const { data: rows, error: historyError } = await sb
        .from('chatbot_messages')
        .select('role, content')
        .eq('conversation_id', activeConversationId)
        .order('created_at', { ascending: true })
        .limit(20)
      if (historyError) {
        if (!isMissingTableError(historyError)) {
          res.status(500).json({ error: historyError.message })
          return
        }
        canPersist = false
      } else {
        historyRows = rows || []
      }
    }

    let assistant
    try {
      assistant = await generateAssistantReply({
        message,
        history: historyRows || [],
        lead,
      })
    } catch (err) {
      assistant = buildFallbackReply(message)
    }

    const reply = trimString(assistant.reply, 4000)
    const leadStage = ['new', 'qualifying', 'qualified', 'booked'].includes(assistant.leadStage) ? assistant.leadStage : 'qualifying'
    const shouldBookCall = !!assistant.shouldBookCall
    const capturedBudget = trimString(assistant.capturedBudget, 200) || null
    const capturedTimeline = trimString(assistant.capturedTimeline, 200) || null
    const capturedRequirements = trimString(assistant.capturedRequirements, 2000) || null
    const summary = trimString(assistant.summary, 1000) || null

    if (canPersist) {
      const { error: assistantMsgError } = await sb.from('chatbot_messages').insert({
        conversation_id: activeConversationId,
        role: 'assistant',
        content: reply,
        metadata: {
          leadStage,
          shouldBookCall,
          capturedBudget,
          capturedTimeline,
          capturedRequirements,
        },
      })
      if (assistantMsgError) {
        if (!isMissingTableError(assistantMsgError)) {
          res.status(500).json({ error: assistantMsgError.message })
          return
        }
        canPersist = false
      }
    }

    if (canPersist) {
      const { error: updateError } = await sb
        .from('chatbot_conversations')
        .update({
          name: lead.name || undefined,
          email: lead.email || undefined,
          phone: lead.phone || undefined,
          company_name: lead.companyName || undefined,
          status: leadStage === 'booked' ? 'booked' : leadStage === 'qualified' ? 'qualified' : 'active',
          last_user_message: message,
          last_assistant_message: reply,
          captured_budget: capturedBudget,
          captured_timeline: capturedTimeline,
          captured_requirements: capturedRequirements,
          booking_interest: shouldBookCall,
          ai_summary: summary,
        })
        .eq('id', activeConversationId)
      if (updateError) {
        if (!isMissingTableError(updateError)) {
          res.status(500).json({ error: updateError.message })
          return
        }
      }
    }

    res.json({
      data: {
        conversationId: activeConversationId,
        reply,
        leadStage,
        shouldBookCall,
        capturedBudget,
        capturedTimeline,
        capturedRequirements,
        summary,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Chatbot failed' })
  }
})

router.get('/bookings/availability', async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const date = trimString(req.query.date, 20)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      res.status(400).json({ error: 'date must be YYYY-MM-DD' })
      return
    }

    const allSlots = getBookableSlots(date)
    const dayStart = allSlots[0]?.startsAt
    const dayEnd = allSlots[allSlots.length - 1]?.endsAt
    if (!dayStart || !dayEnd) {
      res.json({ data: [] })
      return
    }

    const { data: existing, error } = await sb
      .from('booking_requests')
      .select('scheduled_at')
      .eq('request_type', 'meeting')
      .in('status', ['scheduled', 'contacted'])
      .gte('scheduled_at', dayStart)
      .lt('scheduled_at', dayEnd)

    if (error) {
      if (isMissingTableError(error)) {
        res.status(503).json({ error: 'Booking storage is not provisioned yet. Apply the latest Supabase schema first.' })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    const booked = new Set((existing || []).map((row: any) => row.scheduled_at).filter(Boolean))
    const available = allSlots.filter((slot) => !booked.has(slot.startsAt))
    res.json({ data: available })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Availability lookup failed' })
  }
})

router.post('/bookings/request', async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const requestType = trimString(req.body?.requestType, 40) === 'callback' ? 'callback' : 'meeting'
    const scheduledAt = trimString(req.body?.scheduledAt, 80) || null
    const endsAt = trimString(req.body?.endsAt, 80) || null
    const timezone = trimString(req.body?.timezone, 80) || BOOKING_TIMEZONE
    const slotLabel = trimString(req.body?.slotLabel, 180) || null
    const payload = {
      conversation_id: trimString(req.body?.conversationId, 80) || null,
      name: trimString(req.body?.name, 120),
      email: trimString(req.body?.email, 180).toLowerCase(),
      phone: trimString(req.body?.phone, 60) || null,
      company_name: trimString(req.body?.companyName, 180) || null,
      request_type: requestType,
      project_summary: trimString(req.body?.projectSummary, 2000) || null,
      budget: trimString(req.body?.budget, 200) || null,
      timeline: trimString(req.body?.timeline, 200) || null,
      preferred_contact_time: trimString(req.body?.preferredContactTime, 200) || null,
      timezone,
      scheduled_at: requestType === 'meeting' ? scheduledAt : null,
      ends_at: requestType === 'meeting' ? endsAt : null,
      slot_label: requestType === 'meeting' ? slotLabel : null,
      status: requestType === 'callback' ? 'callback_requested' : 'scheduled',
      source: 'website',
      ai_context: trimString(req.body?.aiContext, 4000) || null,
      email_notification_sent_at: null,
    }

    if (!payload.name || !payload.email) {
      res.status(400).json({ error: 'name and email are required' })
      return
    }
    if (requestType === 'meeting' && (!scheduledAt || !endsAt || !slotLabel)) {
      res.status(400).json({ error: 'scheduledAt, endsAt, and slotLabel are required for meeting bookings' })
      return
    }

    if (requestType === 'meeting') {
      const { data: clash, error: clashError } = await sb
        .from('booking_requests')
        .select('id')
        .eq('request_type', 'meeting')
        .eq('scheduled_at', scheduledAt)
        .in('status', ['scheduled', 'contacted'])
        .maybeSingle()
      if (clashError) {
        res.status(500).json({ error: clashError.message })
        return
      }
      if (clash) {
        res.status(409).json({ error: 'This slot was just booked. Please choose another time.' })
        return
      }
    }

    const { data, error } = await sb
      .from('booking_requests')
      .insert(payload)
      .select()
      .single()
    if (error) {
      if (isMissingTableError(error)) {
        res.status(503).json({ error: 'Booking storage is not provisioned yet. Apply the latest Supabase schema first.' })
        return
      }
      res.status(500).json({ error: error.message })
      return
    }

    if (requestType === 'meeting') {
      try {
        await sendBookingConfirmedEmail({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          companyName: payload.company_name,
          projectSummary: payload.project_summary,
          budget: payload.budget,
          timeline: payload.timeline,
          slotLabel: payload.slot_label || '',
          timezone: payload.timezone || BOOKING_TIMEZONE,
        })
        await sb
          .from('booking_requests')
          .update({ email_notification_sent_at: new Date().toISOString() })
          .eq('id', data.id)
      } catch (err) {
        console.error('[bookings] notification email failed:', err instanceof Error ? err.message : err)
      }
    }

    if (payload.conversation_id) {
      await sb
        .from('chatbot_conversations')
        .update({ status: payload.request_type === 'meeting' ? 'booked' : 'qualified', booking_interest: true })
        .eq('id', payload.conversation_id)
    }

    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Booking request failed' })
  }
})

router.get('/admin/chatbot-conversations', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = trimString(req.query.q, 120)
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)
    let query = sb
      .from('chatbot_conversations')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`name.ilike.%${safe}%,email.ilike.%${safe}%,company_name.ilike.%${safe}%,last_user_message.ilike.%${safe}%,ai_summary.ilike.%${safe}%`)
    }

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({ data: [], count: 0, setupRequired: true, message: 'Chat storage is not provisioned yet. Apply the latest Supabase schema.' })
        return
      }
      res.status(500).json({ error: error.message }); return
    }
    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.get('/admin/chatbot-conversations/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const [{ data: conversation, error: cErr }, { data: messages, error: mErr }] = await Promise.all([
      sb.from('chatbot_conversations').select('*').eq('id', req.params.id).single(),
      sb.from('chatbot_messages').select('*').eq('conversation_id', req.params.id).order('created_at', { ascending: true }),
    ])
    if (cErr) { res.status(404).json({ error: cErr.message }); return }
    if (mErr) { res.status(500).json({ error: mErr.message }); return }
    res.json({ data: { conversation, messages: messages || [] } })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.get('/admin/booking-requests', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const search = trimString(req.query.q, 120)
    const limit = Math.min(Number(req.query.limit || 100), 500)
    const offset = Number(req.query.offset || 0)
    let query = sb
      .from('booking_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (search) {
      const safe = search.replace(/[%,]/g, '')
      query = query.or(`name.ilike.%${safe}%,email.ilike.%${safe}%,company_name.ilike.%${safe}%,project_summary.ilike.%${safe}%`)
    }

    const { data, error, count } = await query
    if (error) {
      if (isMissingTableError(error)) {
        res.json({ data: [], count: 0, setupRequired: true, message: 'Booking storage is not provisioned yet. Apply the latest Supabase schema.' })
        return
      }
      res.status(500).json({ error: error.message }); return
    }
    res.json({ data, count: count || 0 })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

router.get('/admin/booking-requests/:id', requireAuth, async (req, res) => {
  try {
    const sb = getSupabaseAdmin()
    const { data, error } = await sb.from('booking_requests').select('*').eq('id', req.params.id).single()
    if (error) { res.status(404).json({ error: error.message }); return }
    res.json({ data })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' })
  }
})

export default router
