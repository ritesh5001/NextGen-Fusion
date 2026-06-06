-- =========================
-- Client brand profiles
-- A reusable per-client snapshot of all website/brand details (about, contact,
-- policy, logo, social links, product image URLs, …). Entered once when the
-- client is added, then used to prefill the WP Plugin Generator and the Banner
-- Generator so the same details never have to be retyped.
--
-- The whole profile (the WP-plugin field set + productImageUrls) is stored in
-- one jsonb column; the frontend owns the shape. Product images / logo live in
-- Cloudinary under "ngf/clients/<client_id>/brand"; only their URLs are kept here.
-- Run this in the Supabase SQL editor.
-- =========================

create table if not exists client_brand_profiles (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null unique references client_users(id) on delete cascade,
  profile jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists client_brand_profiles_client_idx
  on client_brand_profiles (client_id);

drop trigger if exists trg_client_brand_profiles_updated_at on client_brand_profiles;
create trigger trg_client_brand_profiles_updated_at before update on client_brand_profiles
  for each row execute function set_updated_at();
