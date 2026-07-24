-- =====================================================================
-- FIX: /admin/clients returns 500 ("Failed to fetch/create client")
--
-- Cause: the `client_users` table in this database is missing one or more
-- columns the backend reads/writes (phone, account_type, subscription_*,
-- allowed_tools), because those columns live in separate migrations that
-- weren't all applied here. The client-users list SELECT and create INSERT
-- reference every column below, so any single missing one 500s both routes.
--
-- This script re-adds every required column + constraint idempotently.
-- Safe to re-run: uses "if not exists" and guarded constraint creation;
-- it only ADDS things and never drops or rewrites existing data.
--
-- Run once in the Supabase SQL editor (project → SQL Editor → New query).
-- =====================================================================

-- Keeps updated_at fresh (no-op if it already exists).
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Base table (no-op if it already exists).
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

-- Profile phone (client-editable).
alter table client_users add column if not exists phone text;

-- Subscription foundation.
alter table client_users add column if not exists subscription_plan text not null default 'starter';
alter table client_users add column if not exists subscription_status text not null default 'active';
alter table client_users add column if not exists subscription_current_period_end timestamptz;
alter table client_users add column if not exists allowed_tools text[] not null default array['product_catalog'];

-- Account type: 'client' = admin-created (free catalog), 'user' = self-signup (pays).
alter table client_users add column if not exists account_type text not null default 'user';

-- Guarded check constraints (add only if missing).
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'client_users_subscription_status_check') then
    alter table client_users
      add constraint client_users_subscription_status_check
      check (subscription_status in ('trialing', 'active', 'past_due', 'canceled', 'inactive'));
  end if;

  if not exists (select 1 from pg_constraint where conname = 'client_users_account_type_check') then
    alter table client_users
      add constraint client_users_account_type_check
      check (account_type in ('client', 'user'));
  end if;
end $$;

-- Indexes + updated_at trigger (idempotent).
create index if not exists client_users_email_idx on client_users (email);
create index if not exists client_users_is_active_idx on client_users (is_active);
create index if not exists client_users_subscription_status_idx on client_users (subscription_status);

drop trigger if exists trg_client_users_updated_at on client_users;
create trigger trg_client_users_updated_at before update on client_users
  for each row execute function set_updated_at();

-- Verify the shape the backend expects (columns should all be listed):
-- select column_name from information_schema.columns
--   where table_name = 'client_users' order by ordinal_position;
