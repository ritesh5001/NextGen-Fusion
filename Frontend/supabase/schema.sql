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
-- Project estimator submissions
-- =========================
create table if not exists project_estimator_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company_name text,
  project_type text not null,
  features jsonb not null default '[]'::jsonb,
  timeline text not null,
  page_count text not null,
  design_level text not null,
  content_readiness text not null,
  maintenance text not null,
  integrations jsonb not null default '[]'::jsonb,
  goals text not null,
  notes text,
  estimate_summary text not null,
  estimated_cost_min int not null,
  estimated_cost_max int not null,
  estimated_timeline_min_weeks int not null,
  estimated_timeline_max_weeks int not null,
  confidence text not null,
  highlighted_features jsonb not null default '[]'::jsonb,
  scope_breakdown jsonb not null default '[]'::jsonb,
  assumptions jsonb not null default '[]'::jsonb,
  next_step text not null,
  estimate_provider text not null default 'fallback',
  estimate_model text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists project_estimator_submissions_created_at_idx on project_estimator_submissions (created_at desc);
create index if not exists project_estimator_submissions_email_idx on project_estimator_submissions (email);
create index if not exists project_estimator_submissions_company_idx on project_estimator_submissions (company_name);
create index if not exists project_estimator_submissions_project_type_idx on project_estimator_submissions (project_type);

-- =========================
-- Website sales assistant conversations
-- =========================
create table if not exists chatbot_conversations (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  company_name text,
  status text not null default 'active', -- active | qualified | booked | closed
  source text not null default 'website_chat',
  last_user_message text,
  last_assistant_message text,
  captured_budget text,
  captured_timeline text,
  captured_requirements text,
  booking_interest boolean not null default false,
  ai_summary text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists chatbot_conversations_created_at_idx on chatbot_conversations (created_at desc);
create index if not exists chatbot_conversations_email_idx on chatbot_conversations (email);
create index if not exists chatbot_conversations_status_idx on chatbot_conversations (status);

create table if not exists chatbot_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references chatbot_conversations(id) on delete cascade,
  role text not null, -- user | assistant | system
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

create index if not exists chatbot_messages_conversation_idx on chatbot_messages (conversation_id, created_at asc);

-- =========================
-- Booking requests from website
-- =========================
create table if not exists booking_requests (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references chatbot_conversations(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  company_name text,
  request_type text not null default 'meeting', -- meeting | callback
  project_summary text,
  budget text,
  timeline text,
  preferred_contact_time text,
  timezone text default 'Asia/Kolkata',
  scheduled_at timestamptz,
  ends_at timestamptz,
  slot_label text,
  email_notification_sent_at timestamptz,
  status text not null default 'new', -- new | scheduled | callback_requested | contacted | closed
  source text not null default 'website',
  ai_context text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists booking_requests_created_at_idx on booking_requests (created_at desc);
create index if not exists booking_requests_email_idx on booking_requests (email);
create index if not exists booking_requests_status_idx on booking_requests (status);

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

drop trigger if exists trg_project_estimator_submissions_updated_at on project_estimator_submissions;
create trigger trg_project_estimator_submissions_updated_at before update on project_estimator_submissions
  for each row execute function set_updated_at();

drop trigger if exists trg_chatbot_conversations_updated_at on chatbot_conversations;
create trigger trg_chatbot_conversations_updated_at before update on chatbot_conversations
  for each row execute function set_updated_at();

drop trigger if exists trg_booking_requests_updated_at on booking_requests;
create trigger trg_booking_requests_updated_at before update on booking_requests
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

-- =====================================================================
-- Agency CRM
-- Tracks active client projects, partner assignments, references,
-- milestones, and activity across the 6-partner agency team.
-- =====================================================================

-- =========================
-- Agency team members (the 6 partners)
-- =========================
create table if not exists agency_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'partner' check (role in ('partner', 'admin_partner')),
  avatar_color text not null default '#3B82F6',
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists agency_members_email_idx on agency_members (email);
create index if not exists agency_members_is_active_idx on agency_members (is_active);

drop trigger if exists trg_agency_members_updated_at on agency_members;
create trigger trg_agency_members_updated_at before update on agency_members
  for each row execute function set_updated_at();

-- =========================
-- Agency client projects
-- =========================
create table if not exists agency_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_name text not null,
  client_email text,
  client_phone text,
  client_company text,
  client_website text,
  status text not null default 'kickoff'
    check (status in ('kickoff', 'in_progress', 'client_review', 'revisions', 'delivered', 'on_hold', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  project_type text,
  start_date date,
  deadline date,
  delivered_date date,
  budget numeric,
  currency text not null default 'INR',
  description text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists agency_projects_status_idx on agency_projects (status);
create index if not exists agency_projects_created_at_idx on agency_projects (created_at desc);
create index if not exists agency_projects_deadline_idx on agency_projects (deadline);

drop trigger if exists trg_agency_projects_updated_at on agency_projects;
create trigger trg_agency_projects_updated_at before update on agency_projects
  for each row execute function set_updated_at();

-- =========================
-- Member ↔ project assignments (many-to-many)
-- =========================
create table if not exists project_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  member_id uuid not null references agency_members(id) on delete cascade,
  role text not null default 'contributor' check (role in ('lead', 'contributor', 'reviewer')),
  assigned_at timestamptz default now(),
  unique (project_id, member_id)
);

create index if not exists project_assignments_project_idx on project_assignments (project_id);
create index if not exists project_assignments_member_idx on project_assignments (member_id);

-- =========================
-- Project references (Drive, Figma, GitHub, URL links)
-- =========================
create table if not exists project_references (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  type text not null check (type in ('drive', 'figma', 'github', 'url')),
  title text not null,
  url text not null,
  notes text,
  created_at timestamptz default now()
);

create index if not exists project_references_project_idx on project_references (project_id);

-- =========================
-- Project milestones / phases
-- =========================
create table if not exists project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists project_milestones_project_idx on project_milestones (project_id);

drop trigger if exists trg_project_milestones_updated_at on project_milestones;
create trigger trg_project_milestones_updated_at before update on project_milestones
  for each row execute function set_updated_at();

-- =========================
-- Project activity log / updates
-- =========================
create table if not exists project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  member_id uuid references agency_members(id) on delete set null,
  content text not null,
  update_type text not null default 'note'
    check (update_type in ('note', 'status_change', 'milestone', 'delivery', 'system')),
  created_at timestamptz default now()
);

create index if not exists project_updates_project_idx on project_updates (project_id, created_at desc);

-- =====================================================================
-- Client Product-CSV Generator
-- Clients (created by admin) log in to a separate portal, build product
-- catalogs (with variants), and export WooCommerce/Shopify import CSVs.
-- =====================================================================

-- =========================
-- Client portal accounts (created by admin)
-- =========================
create table if not exists client_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  email text not null unique,
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists client_users_email_idx on client_users (email);
create index if not exists client_users_is_active_idx on client_users (is_active);

drop trigger if exists trg_client_users_updated_at on client_users;
create trigger trg_client_users_updated_at before update on client_users
  for each row execute function set_updated_at();

-- =========================
-- Client product catalog (one row per product; variants stored as JSONB)
-- =========================
create table if not exists client_products (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_users(id) on delete cascade,
  title text not null,
  description text,
  vendor text,
  product_type text,
  category text,
  tags text,
  published boolean not null default true,
  -- option definitions: [{ "name": "Size", "values": ["S","M","L"] }, ...]
  options jsonb not null default '[]'::jsonb,
  -- one entry per variant: [{ "option_values": {"Size":"M","Color":"Red"},
  --   "sku":"", "price":"", "sale_price":"", "stock":"", "weight":"", "image_url":"" }]
  variants jsonb not null default '[]'::jsonb,
  -- product-level gallery image urls
  images jsonb not null default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists client_products_client_idx on client_products (client_id);

drop trigger if exists trg_client_products_updated_at on client_products;
create trigger trg_client_products_updated_at before update on client_products
  for each row execute function set_updated_at();

-- =========================
-- Client uploaded images (Cloudinary); auto-deleted after a retention window
-- =========================
create table if not exists client_images (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_users(id) on delete cascade,
  public_id text not null,
  format text,
  bytes integer,
  width integer,
  height integer,
  original_filename text,
  created_at timestamptz default now()
);

create index if not exists client_images_client_idx on client_images (client_id);
create index if not exists client_images_created_idx on client_images (created_at);

-- Client portal account phone (editable on the client profile).
alter table client_users add column if not exists phone text;

-- Link an agency project to a portal client account so the client can see it.
alter table agency_projects
  add column if not exists client_id uuid references client_users(id) on delete set null;
create index if not exists agency_projects_client_id_idx on agency_projects (client_id);

-- =====================================================================
-- WordPress plugin generator
-- AI-generated, downloadable WordPress plugins (Pages + Header/Footer).
-- Zip files live in a PRIVATE Storage bucket named "wp-plugins"
-- (objects: "<generation_id>/<slug>-pages.zip", "<generation_id>/<slug>-hf.zip").
-- =====================================================================
create table if not exists wp_plugin_generations (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'done', 'error')),
  business_name text,
  plugin_slug text,
  inputs jsonb not null default '{}'::jsonb,
  palette jsonb,
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists wp_plugin_generations_created_idx
  on wp_plugin_generations (created_at desc);

drop trigger if exists trg_wp_plugin_generations_updated_at on wp_plugin_generations;
create trigger trg_wp_plugin_generations_updated_at before update on wp_plugin_generations
  for each row execute function set_updated_at();
-- =========================
-- AI banner image generator
-- Run this in the Supabase SQL editor. No Storage bucket is needed — the
-- generated banners and uploaded product images live in Cloudinary
-- ("ngf/banners/outputs" and "ngf/banners/inputs"), and only the delivery
-- URLs / public_ids are persisted here.
-- =========================

create table if not exists banner_generations (
  id uuid primary key default gen_random_uuid(),
  status text not null default 'pending'
    check (status in ('pending', 'running', 'done', 'error')),
  banner_type text,                 -- 'ecommerce' | 'service'
  mode text,                        -- 'auto' | 'guided'
  ratio text,                       -- '16:9' | '7:3' | '1:1'
  quality text,                     -- 'low' | 'medium' | 'high'
  prompt text,                      -- final image prompt actually used
  inputs jsonb not null default '{}'::jsonb,
  product_image_urls jsonb,         -- input product Cloudinary URLs
  public_id text,                   -- generated banner Cloudinary public_id
  image_url text,                   -- cropped delivery URL for the chosen ratio
  error text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists banner_generations_created_idx
  on banner_generations (created_at desc);

drop trigger if exists trg_banner_generations_updated_at on banner_generations;
create trigger trg_banner_generations_updated_at before update on banner_generations
  for each row execute function set_updated_at();
