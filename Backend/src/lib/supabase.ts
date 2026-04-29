import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cached: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Missing Supabase env vars. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env')
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return cached
}

export type Contact = {
  id: string
  email: string
  name: string | null
  company: string | null
  phone: string | null
  website: string | null
  industry: string | null
  notes: string | null
  custom_fields: Record<string, unknown> | null
  unsubscribed: boolean
  created_at: string
  updated_at: string
}

export type ContactFormSubmission = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  information_source: string
  status: 'new' | 'replied'
  admin_reply_subject: string | null
  admin_reply_body: string | null
  last_emailed_at: string | null
  email_count: number
  last_email_message_id: string | null
  last_email_error: string | null
  created_at: string
  updated_at: string
}

export type ProjectEstimatorSubmission = {
  id: string
  name: string
  email: string
  phone: string | null
  company_name: string | null
  project_type: string
  features: string[]
  timeline: string
  page_count: string
  design_level: string
  content_readiness: string
  maintenance: string
  integrations: string[]
  goals: string
  notes: string | null
  estimate_summary: string
  estimated_cost_min: number
  estimated_cost_max: number
  estimated_timeline_min_weeks: number
  estimated_timeline_max_weeks: number
  confidence: 'low' | 'medium' | 'high'
  highlighted_features: string[]
  scope_breakdown: string[]
  assumptions: string[]
  next_step: string
  estimate_provider: 'grok' | 'fallback'
  estimate_model: string | null
  created_at: string
  updated_at: string
}

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export type Campaign = {
  id: string
  name: string
  description: string | null
  status: CampaignStatus
  from_name: string
  from_email: string
  reply_to: string | null
  subject: string
  body_html: string
  followup_enabled: boolean
  followup_days: number
  followup_subject: string | null
  followup_body_html: string | null
  max_followups: number
  send_interval_seconds: number
  daily_send_limit: number | null
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export type RecipientStatus =
  | 'pending'
  | 'sent'
  | 'followup_pending'
  | 'followup_sent'
  | 'completed'
  | 'failed'
  | 'unsubscribed'

export type CampaignRecipient = {
  id: string
  campaign_id: string
  contact_id: string
  status: RecipientStatus
  next_send_at: string | null
  initial_sent_at: string | null
  last_sent_at: string | null
  followup_count: number
  last_error: string | null
  created_at: string
  updated_at: string
}

export type EmailLog = {
  id: string
  campaign_id: string | null
  contact_id: string | null
  recipient_id: string | null
  email_type: string
  resend_message_id: string | null
  status: string
  subject: string | null
  to_email: string | null
  error: string | null
  created_at: string
}
