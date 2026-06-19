-- Client auth + subscription foundation.
-- Adds self-service signup metadata, per-tool access, and password reset tokens.

alter table client_users add column if not exists subscription_plan text not null default 'starter';
alter table client_users add column if not exists subscription_status text not null default 'active';
alter table client_users add column if not exists subscription_current_period_end timestamptz;
alter table client_users add column if not exists allowed_tools text[] not null default array[
  'product_catalog'
];

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'client_users_subscription_status_check'
  ) then
    alter table client_users
      add constraint client_users_subscription_status_check
      check (subscription_status in ('trialing', 'active', 'past_due', 'canceled', 'inactive'));
  end if;
end $$;

create index if not exists client_users_subscription_status_idx
  on client_users (subscription_status);

create table if not exists client_password_reset_tokens (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client_users(id) on delete cascade,
  token_hash text not null unique,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists client_password_reset_tokens_client_idx
  on client_password_reset_tokens (client_id);
create index if not exists client_password_reset_tokens_expires_idx
  on client_password_reset_tokens (expires_at);
