-- =====================================================================
-- NextGen Fusion ProductFlow — product automation platform
--
-- Clients send product info as normal chat (Telegram first, WhatsApp later).
-- The platform logs every message, moves media to Cloudinary, lets AI extract
-- structured product data, holds it as a draft until the client approves, then
-- exports a per-project CSV.
--
-- Every table is prefixed `pf_` so it never collides with the existing
-- client_users / client_products / client_images portal tables.
--
-- Channel-agnostic by design: `source` + `external_*` columns mean a WhatsApp
-- adapter later writes into these same tables with no schema change.
--
-- Run this in the Supabase SQL editor.
-- =====================================================================

create extension if not exists "pgcrypto";

-- Already defined by schema.sql; repeated here so this file can be run on its
-- own without depending on load order.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================
-- Platform settings (single row)
-- Telegram credentials and the AI provider are configured from the admin panel
-- rather than env vars, so the bot can be connected without a redeploy.
-- The bot token is secret: API responses must mask it, never return it whole.
-- =========================
create table if not exists pf_settings (
  id boolean primary key default true,
  telegram_bot_token text,
  telegram_bot_username text,
  telegram_bot_name text,
  telegram_webhook_url text,
  telegram_webhook_secret text,
  telegram_connected_at timestamptz,
  ai_provider text not null default 'claude',
  auto_approve boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint pf_settings_singleton check (id)
);

drop trigger if exists trg_pf_settings_updated_at on pf_settings;
create trigger trg_pf_settings_updated_at before update on pf_settings
  for each row execute function set_updated_at();

-- =========================
-- Clients — one row per chat identity (Telegram user today)
-- `status` gates ingestion: a brand-new chatter lands as 'pending' and is
-- ignored by the product pipeline until an admin approves them, so strangers
-- messaging the public bot cannot create data.
-- =========================
create table if not exists pf_clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  source text not null default 'telegram',
  external_user_id text not null,
  external_chat_id text,
  external_username text,
  status text not null default 'pending',
  client_user_id uuid references client_users(id) on delete set null,
  active_project_id uuid,
  notes text,
  last_message_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists pf_clients_source_user_idx
  on pf_clients (source, external_user_id);
create index if not exists pf_clients_status_idx on pf_clients (status);

drop trigger if exists trg_pf_clients_updated_at on pf_clients;
create trigger trg_pf_clients_updated_at before update on pf_clients
  for each row execute function set_updated_at();

-- =========================
-- Projects — a client may run several websites, each with its own platform
-- and CSV shape. `required_fields` drives the "ask the client for what's
-- missing" behaviour in a later phase.
-- =========================
create table if not exists pf_projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references pf_clients(id) on delete cascade,
  name text not null,
  website_url text,
  platform text not null default 'woocommerce',
  csv_template_id uuid,
  required_fields jsonb not null default '["name","price","category","images"]'::jsonb,
  currency text not null default 'INR',
  status text not null default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists pf_projects_client_idx on pf_projects (client_id);

drop trigger if exists trg_pf_projects_updated_at on pf_projects;
create trigger trg_pf_projects_updated_at before update on pf_projects
  for each row execute function set_updated_at();

alter table pf_clients
  drop constraint if exists pf_clients_active_project_fk;
alter table pf_clients
  add constraint pf_clients_active_project_fk
  foreign key (active_project_id) references pf_projects(id) on delete set null;

-- =========================
-- Messages — the raw inbound log. Written before any AI runs, so a failed
-- extraction never loses what the client actually said.
-- `external_message_id` is unique per source to make webhook retries idempotent.
-- =========================
create table if not exists pf_messages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references pf_clients(id) on delete cascade,
  project_id uuid references pf_projects(id) on delete set null,
  source text not null default 'telegram',
  external_user_id text,
  external_chat_id text,
  external_message_id text,
  media_group_id text,
  message_type text not null default 'text',
  text text,
  classification text,
  raw_payload jsonb,
  created_at timestamptz default now()
);

-- Telegram message ids are unique per CHAT, not globally, so the chat id must
-- be part of the key or two clients could collide and drop each other's messages.
-- Why a message failed to process (AI provider down, model retired, quota).
-- Kept separate from `classification` so the badge stays clean and the admin
-- panel can raise a real notification instead of the failure being invisible.
alter table pf_messages add column if not exists error text;

create unique index if not exists pf_messages_external_idx
  on pf_messages (source, external_chat_id, external_message_id)
  where external_message_id is not null;
create index if not exists pf_messages_client_created_idx
  on pf_messages (client_id, created_at desc);
create index if not exists pf_messages_media_group_idx
  on pf_messages (media_group_id)
  where media_group_id is not null;

-- =========================
-- CSV templates — column list + field mapping per platform. One product
-- engine, many website formats.
-- =========================
create table if not exists pf_csv_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  platform text not null default 'woocommerce',
  columns jsonb not null default '[]'::jsonb,
  mapping jsonb not null default '{}'::jsonb,
  rules jsonb not null default '{}'::jsonb,
  is_default boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists trg_pf_csv_templates_updated_at on pf_csv_templates;
create trigger trg_pf_csv_templates_updated_at before update on pf_csv_templates
  for each row execute function set_updated_at();

alter table pf_projects
  drop constraint if exists pf_projects_csv_template_fk;
alter table pf_projects
  add constraint pf_projects_csv_template_fk
  foreign key (csv_template_id) references pf_csv_templates(id) on delete set null;

-- =========================
-- Product drafts — the in-progress product being assembled across several
-- messages. `product_data` is the AI's structured JSON; the app owns CSV.
-- =========================
create table if not exists pf_product_drafts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references pf_clients(id) on delete cascade,
  project_id uuid references pf_projects(id) on delete set null,
  status text not null default 'DRAFT',
  product_data jsonb not null default '{}'::jsonb,
  missing_fields jsonb not null default '[]'::jsonb,
  last_question text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists pf_product_drafts_client_status_idx
  on pf_product_drafts (client_id, status);

drop trigger if exists trg_pf_product_drafts_updated_at on pf_product_drafts;
create trigger trg_pf_product_drafts_updated_at before update on pf_product_drafts
  for each row execute function set_updated_at();

-- =========================
-- Products — approved, exportable records.
-- =========================
create table if not exists pf_products (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references pf_clients(id) on delete cascade,
  project_id uuid references pf_projects(id) on delete set null,
  draft_id uuid references pf_product_drafts(id) on delete set null,
  name text not null,
  sku text,
  description text,
  short_description text,
  regular_price numeric(12, 2),
  sale_price numeric(12, 2),
  category text,
  brand text,
  tags jsonb not null default '[]'::jsonb,
  attributes jsonb not null default '{}'::jsonb,
  status text not null default 'APPROVED',
  exported_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists pf_products_project_idx on pf_products (project_id, created_at desc);
create unique index if not exists pf_products_project_sku_idx
  on pf_products (project_id, sku)
  where sku is not null;

drop trigger if exists trg_pf_products_updated_at on pf_products;
create trigger trg_pf_products_updated_at before update on pf_products
  for each row execute function set_updated_at();

-- =========================
-- Product images — Cloudinary is the permanent home; the Telegram file id is
-- kept only for traceability (its download URL expires).
-- product_id / draft_id are nullable so an image can be captured the moment it
-- arrives and attached to a product later.
-- =========================
create table if not exists pf_product_images (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references pf_clients(id) on delete cascade,
  project_id uuid references pf_projects(id) on delete set null,
  message_id uuid references pf_messages(id) on delete set null,
  draft_id uuid references pf_product_drafts(id) on delete set null,
  product_id uuid references pf_products(id) on delete cascade,
  source text not null default 'telegram',
  source_file_id text,
  cloudinary_public_id text,
  url text,
  filename text,
  mime_type text,
  width integer,
  height integer,
  file_size integer,
  position integer not null default 0,
  status text not null default 'stored',
  error text,
  created_at timestamptz default now()
);

create index if not exists pf_product_images_draft_idx on pf_product_images (draft_id, position);
create index if not exists pf_product_images_product_idx on pf_product_images (product_id, position);
create index if not exists pf_product_images_message_idx on pf_product_images (message_id);
create unique index if not exists pf_product_images_source_file_idx
  on pf_product_images (source, source_file_id)
  where source_file_id is not null;

-- =========================
-- CSV exports — an audit trail of every generated file.
-- =========================
create table if not exists pf_csv_exports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references pf_projects(id) on delete cascade,
  template_id uuid references pf_csv_templates(id) on delete set null,
  filename text not null,
  file_url text,
  product_count integer not null default 0,
  created_at timestamptz default now()
);

create index if not exists pf_csv_exports_project_idx
  on pf_csv_exports (project_id, created_at desc);

-- Seed the settings row so the admin panel always has something to update.
insert into pf_settings (id) values (true) on conflict (id) do nothing;
