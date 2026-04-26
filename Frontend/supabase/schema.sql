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

drop trigger if exists trg_campaigns_updated_at on campaigns;
create trigger trg_campaigns_updated_at before update on campaigns
  for each row execute function set_updated_at();

drop trigger if exists trg_campaign_recipients_updated_at on campaign_recipients;
create trigger trg_campaign_recipients_updated_at before update on campaign_recipients
  for each row execute function set_updated_at();
