-- =====================================================================
-- Digital-product store (sell CRM/ERP source as downloadable products)
-- Run once in the Supabase SQL editor. Safe to re-run.
--   store_products  — sellable products (metadata + the R2 file key)
--   store_purchases — one row per checkout (payment + entitlement/license)
-- =====================================================================

-- Shared updated_at trigger (no-op if it already exists).
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================
-- Sellable products
-- =========================
create table if not exists store_products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,                              -- short one-liner for cards
  description text,                          -- long copy (plain text / markdown)
  category text,
  price_inr integer not null default 0,      -- whole rupees (Razorpay charges paise = ×100)
  price_usd numeric(10,2),                   -- optional display price for global buyers
  cover_image text,                          -- hero/card image URL
  gallery jsonb not null default '[]'::jsonb,     -- ["https://...", ...] screenshots
  features jsonb not null default '[]'::jsonb,    -- ["Role-based auth", "Invoicing", ...]
  tech_stack jsonb not null default '[]'::jsonb,  -- ["Next.js", "PostgreSQL", ...]
  demo_url text,                             -- live demo link
  -- Delivery: object key of the product zip in the PRIVATE R2 bucket
  -- (wired for download in Phase 3; left null until the file is uploaded).
  r2_key text,
  file_size_bytes bigint,
  version text,
  is_active boolean not null default true,   -- false = hidden from storefront
  is_featured boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists store_products_active_idx on store_products (is_active);
create index if not exists store_products_slug_idx on store_products (slug);

drop trigger if exists trg_store_products_updated_at on store_products;
create trigger trg_store_products_updated_at before update on store_products
  for each row execute function set_updated_at();

-- =========================
-- Purchases / entitlements (used from Phase 2 onward)
-- =========================
create table if not exists store_purchases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references store_products(id) on delete restrict,
  customer_email text not null,
  customer_name text,
  amount integer not null default 0,         -- charged amount in the currency's major unit
  currency text not null default 'INR',
  provider text not null default 'razorpay',
  razorpay_order_id text,
  razorpay_payment_id text,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  license_key text,
  download_count integer not null default 0,
  download_limit integer not null default 5,
  link_expires_at timestamptz,
  -- Optional link to a logged-in portal account so they can re-download.
  client_id uuid references client_users(id) on delete set null,
  created_at timestamptz default now(),
  paid_at timestamptz
);

create index if not exists store_purchases_product_idx on store_purchases (product_id);
create index if not exists store_purchases_email_idx on store_purchases (customer_email);
create index if not exists store_purchases_status_idx on store_purchases (status);
create index if not exists store_purchases_rzp_order_idx on store_purchases (razorpay_order_id);
