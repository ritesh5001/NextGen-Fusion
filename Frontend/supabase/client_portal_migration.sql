-- =====================================================================
-- Client Portal — Product-CSV Generator
-- Run this once in the Supabase SQL editor.
-- Creates the two tables the client portal needs:
--   client_users     — admin-created client logins (bcrypt passwords)
--   client_products  — each client's product catalog (variants as JSONB)
-- Safe to re-run: uses "if not exists" / "create or replace".
-- =====================================================================

-- Shared trigger function to keep updated_at fresh (no-op if it already exists).
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

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
