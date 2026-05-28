-- =====================================================================
-- Client Portal — Uploaded Images (Cloudinary)
-- Run this once in the Supabase SQL editor.
-- Tracks each client's uploaded product images and the 30-day clock.
-- The Cloudinary asset itself is deleted by the cleanup job; the
-- "delete-by" date is derived as created_at + retention window.
-- Safe to re-run: uses "if not exists".
-- =====================================================================

create table if not exists client_images (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_users(id) on delete cascade,
  public_id text not null,            -- Cloudinary public_id (used for delete)
  format text,                        -- jpg / png / webp ...
  bytes integer,                      -- stored size
  width integer,
  height integer,
  original_filename text,
  created_at timestamptz default now()
);

create index if not exists client_images_client_idx on client_images (client_id);
create index if not exists client_images_created_idx on client_images (created_at);
