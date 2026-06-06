-- =========================
-- WordPress plugin generator
-- Run this in the Supabase SQL editor, then create a PRIVATE Storage bucket
-- named "wp-plugins" (Storage → New bucket → name: wp-plugins, Public: off).
-- Zip objects are stored as "<generation_id>/<slug>-pages.zip" and
-- "<generation_id>/<slug>-hf.zip".
-- =========================

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
