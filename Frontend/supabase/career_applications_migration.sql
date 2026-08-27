-- =========================
-- Career applications (/careers form)
-- =========================
-- Resume files live in a PRIVATE Supabase Storage bucket named "resumes";
-- this table stores only the object path. The backend mints short-lived signed
-- URLs for admins, so resumes are never publicly readable.
--
-- Create the bucket once before using the form:
--   insert into storage.buckets (id, name, public)
--   values ('resumes', 'resumes', false)
--   on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

create table if not exists career_applications (
  id uuid primary key default gen_random_uuid(),
  role_id text,
  role_title text not null,
  name text not null,
  email text not null,
  phone text not null,
  location text,
  experience text,
  portfolio_url text,
  cover_note text,
  resume_path text not null,
  resume_filename text,
  resume_size int,
  status text not null default 'new', -- new | shortlisted | interviewing | hired | rejected
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists career_applications_created_at_idx on career_applications (created_at desc);
create index if not exists career_applications_email_idx on career_applications (email);
create index if not exists career_applications_status_idx on career_applications (status);
create index if not exists career_applications_role_id_idx on career_applications (role_id);
