-- NextGen Fusion - contacts-only Supabase migration
-- Paste this into Supabase SQL Editor and run it once.

create extension if not exists "pgcrypto";

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
