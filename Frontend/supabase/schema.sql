-- =====================================================================
-- NextGen Fusion — Email Campaign System Schema
-- Run this in your Supabase SQL editor.
-- =====================================================================

-- Required extensions
create extension if not exists "pgcrypto";

-- =========================
-- Main contacts database
-- =========================
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  company text,
  phone text,
  website text,
  industry text,
  notes text,
  custom_fields jsonb default '{}'::jsonb,
  unsubscribed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists contacts_email_idx on contacts (email);
create index if not exists contacts_company_idx on contacts (company);
create index if not exists contacts_created_at_idx on contacts (created_at desc);

-- =========================
-- Website form submissions
-- =========================
create table if not exists contact_forms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  information_source text not null,
  status text not null default 'new', -- new | replied
  admin_reply_subject text,
  admin_reply_body text,
  last_emailed_at timestamptz,
  email_count int not null default 0,
  last_email_message_id text,
  last_email_error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists contact_forms_created_at_idx on contact_forms (created_at desc);
create index if not exists contact_forms_email_idx on contact_forms (email);
create index if not exists contact_forms_status_idx on contact_forms (status);

-- =========================
-- Campaigns
-- =========================
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  status text not null default 'draft', -- draft | active | paused | completed
  from_name text not null,
  from_email text not null,
  reply_to text,

  -- Initial email
  subject text not null,
  body_html text not null,

  -- Follow-up email
  followup_enabled boolean default true,
  followup_days int default 3,
  followup_subject text,
  followup_body_html text,
  max_followups int default 1,

  -- Pacing
  send_interval_seconds int default 60, -- spacing between recipients
  daily_send_limit int,

  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists campaigns_status_idx on campaigns (status);
create index if not exists campaigns_created_at_idx on campaigns (created_at desc);

-- =========================
-- Campaign recipients (per-contact state inside a campaign)
-- =========================
create table if not exists campaign_recipients (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  contact_id uuid not null references contacts(id) on delete cascade,

  status text not null default 'pending',
  -- pending | sent | followup_pending | followup_sent | completed | failed | unsubscribed

  next_send_at timestamptz, -- when the next email for this recipient is due
  initial_sent_at timestamptz,
  last_sent_at timestamptz,
  followup_count int default 0,
  last_error text,

  created_at timestamptz default now(),
  updated_at timestamptz default now(),

  unique (campaign_id, contact_id)
);

create index if not exists campaign_recipients_campaign_idx on campaign_recipients (campaign_id);
create index if not exists campaign_recipients_status_idx on campaign_recipients (status);
create index if not exists campaign_recipients_due_idx on campaign_recipients (next_send_at)
  where status in ('pending', 'followup_pending');

-- =========================
-- Email log (audit trail of every send attempt)
-- =========================
create table if not exists email_logs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id) on delete cascade,
  contact_id uuid references contacts(id) on delete set null,
  recipient_id uuid references campaign_recipients(id) on delete cascade,
  email_type text not null, -- initial | followup_1, followup_2, ...
  resend_message_id text,
  status text not null,     -- sent | failed
  subject text,
  to_email text,
  error text,
  created_at timestamptz default now()
);

create index if not exists email_logs_campaign_idx on email_logs (campaign_id, created_at desc);
create index if not exists email_logs_contact_idx on email_logs (contact_id);

-- =========================
-- updated_at trigger helper
-- =========================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_contacts_updated_at on contacts;
create trigger trg_contacts_updated_at before update on contacts
  for each row execute function set_updated_at();

drop trigger if exists trg_contact_forms_updated_at on contact_forms;
create trigger trg_contact_forms_updated_at before update on contact_forms
  for each row execute function set_updated_at();

drop trigger if exists trg_campaigns_updated_at on campaigns;
create trigger trg_campaigns_updated_at before update on campaigns
  for each row execute function set_updated_at();

drop trigger if exists trg_campaign_recipients_updated_at on campaign_recipients;
create trigger trg_campaign_recipients_updated_at before update on campaign_recipients
  for each row execute function set_updated_at();

-- =====================================================================
-- B2B Lead Targeting Database
-- Stores prospect businesses that NextGen Fusion wants to pitch services to.
-- Separate from `contacts` which are email-campaign subscribers.
-- =====================================================================

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),

  -- Business identity
  company_name text not null,
  contact_name text,
  contact_title text,             -- e.g. "Founder", "Marketing Manager"
  email text,
  phone text,
  website text,

  -- Targeting metadata
  industry text,                  -- e.g. "E-commerce", "Real Estate", "Healthcare"
  company_size text,              -- e.g. "1-10", "11-50", "51-200", "200+"
  location text,                  -- city / country
  linkedin_url text,

  -- Which NextGen Fusion service to pitch
  target_service text,            -- matches service names from service-data.ts
  pain_point text,                -- what problem they likely have

  -- Lead lifecycle
  status text not null default 'new',
  -- new | contacted | replied | meeting_scheduled | proposal_sent | won | lost | not_interested

  -- Outreach tracking
  last_contacted_at timestamptz,
  next_followup_at timestamptz,
  source text,                    -- e.g. "manual", "csv_upload", "linkedin", "referral"
  assigned_to text,               -- team member name or email

  -- Free-form notes
  notes text,
  custom_fields jsonb default '{}'::jsonb,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists leads_company_name_idx on leads (company_name);
create index if not exists leads_status_idx on leads (status);
create index if not exists leads_target_service_idx on leads (target_service);
create index if not exists leads_industry_idx on leads (industry);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_next_followup_idx on leads (next_followup_at)
  where status not in ('won', 'lost', 'not_interested');

drop trigger if exists trg_leads_updated_at on leads;
create trigger trg_leads_updated_at before update on leads
  for each row execute function set_updated_at();

-- =========================
-- Lead interaction log
-- =========================
create table if not exists lead_interactions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  interaction_type text not null, -- email | call | linkedin | meeting | note
  summary text not null,
  outcome text,                   -- positive | neutral | negative
  next_action text,
  created_by text,
  created_at timestamptz default now()
);

create index if not exists lead_interactions_lead_idx on lead_interactions (lead_id, created_at desc);
