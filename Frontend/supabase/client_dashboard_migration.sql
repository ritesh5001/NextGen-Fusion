-- =====================================================================
-- Client dashboard migration (self-contained & idempotent).
-- Creates the Agency CRM tables if they don't exist yet, then links
-- projects to client portal accounts and adds a client phone field.
-- Safe to re-run. Paste into the Supabase SQL editor and Run.
-- =====================================================================

-- Shared updated_at trigger function (no-op if it already exists).
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------
-- Client portal accounts (created by admin). Usually already exists.
-- ---------------------------------------------------------------------
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

drop trigger if exists trg_client_users_updated_at on client_users;
create trigger trg_client_users_updated_at before update on client_users
  for each row execute function set_updated_at();

-- New: client phone (editable on the client profile).
alter table client_users add column if not exists phone text;

-- ---------------------------------------------------------------------
-- Agency CRM: team members
-- ---------------------------------------------------------------------
create table if not exists agency_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'partner' check (role in ('partner', 'admin_partner')),
  avatar_color text not null default '#3B82F6',
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists agency_members_email_idx on agency_members (email);
create index if not exists agency_members_is_active_idx on agency_members (is_active);

drop trigger if exists trg_agency_members_updated_at on agency_members;
create trigger trg_agency_members_updated_at before update on agency_members
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- Agency CRM: client projects
-- ---------------------------------------------------------------------
create table if not exists agency_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  client_name text not null,
  client_email text,
  client_phone text,
  client_company text,
  client_website text,
  status text not null default 'kickoff'
    check (status in ('kickoff', 'in_progress', 'client_review', 'revisions', 'delivered', 'on_hold', 'cancelled')),
  priority text not null default 'medium'
    check (priority in ('low', 'medium', 'high', 'urgent')),
  project_type text,
  start_date date,
  deadline date,
  delivered_date date,
  budget numeric,
  currency text not null default 'INR',
  description text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists agency_projects_status_idx on agency_projects (status);
create index if not exists agency_projects_created_at_idx on agency_projects (created_at desc);
create index if not exists agency_projects_deadline_idx on agency_projects (deadline);

drop trigger if exists trg_agency_projects_updated_at on agency_projects;
create trigger trg_agency_projects_updated_at before update on agency_projects
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- Agency CRM: member ↔ project assignments
-- ---------------------------------------------------------------------
create table if not exists project_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  member_id uuid not null references agency_members(id) on delete cascade,
  role text not null default 'contributor' check (role in ('lead', 'contributor', 'reviewer')),
  assigned_at timestamptz default now(),
  unique (project_id, member_id)
);
create index if not exists project_assignments_project_idx on project_assignments (project_id);
create index if not exists project_assignments_member_idx on project_assignments (member_id);

-- ---------------------------------------------------------------------
-- Agency CRM: references
-- ---------------------------------------------------------------------
create table if not exists project_references (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  type text not null check (type in ('drive', 'figma', 'github', 'url')),
  title text not null,
  url text not null,
  notes text,
  created_at timestamptz default now()
);
create index if not exists project_references_project_idx on project_references (project_id);

-- ---------------------------------------------------------------------
-- Agency CRM: milestones
-- ---------------------------------------------------------------------
create table if not exists project_milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  title text not null,
  description text,
  due_date date,
  is_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists project_milestones_project_idx on project_milestones (project_id);

drop trigger if exists trg_project_milestones_updated_at on project_milestones;
create trigger trg_project_milestones_updated_at before update on project_milestones
  for each row execute function set_updated_at();

-- ---------------------------------------------------------------------
-- Agency CRM: activity log
-- ---------------------------------------------------------------------
create table if not exists project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references agency_projects(id) on delete cascade,
  member_id uuid references agency_members(id) on delete set null,
  content text not null,
  update_type text not null default 'note'
    check (update_type in ('note', 'status_change', 'milestone', 'delivery', 'system')),
  created_at timestamptz default now()
);
create index if not exists project_updates_project_idx on project_updates (project_id, created_at desc);

-- ---------------------------------------------------------------------
-- NEW: link a project to a client portal account so the client can see it.
-- ---------------------------------------------------------------------
alter table agency_projects
  add column if not exists client_id uuid references client_users(id) on delete set null;
create index if not exists agency_projects_client_id_idx on agency_projects (client_id);
