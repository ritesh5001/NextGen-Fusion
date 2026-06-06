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
