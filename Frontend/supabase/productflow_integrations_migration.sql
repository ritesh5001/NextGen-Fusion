-- =====================================================================
-- ProductFlow — integrations registry
--
-- Every external service (AI providers, Telegram, Cloudinary) becomes a row
-- that an admin can edit from the panel: swap a key, point at a different
-- model, disable it, or add a brand-new provider — without a redeploy.
--
-- Credentials stored here OVERRIDE the matching environment variable. A row
-- with no credential falls back to env, so existing deployments keep working
-- untouched after this migration.
--
-- SECURITY: `credentials` holds live API keys. The API masks them on read and
-- never returns a full value to the browser. Keep Supabase service-role access
-- restricted accordingly.
--
-- Run this in the Supabase SQL editor (safe to re-run).
-- =====================================================================

create extension if not exists "pgcrypto";

create table if not exists pf_integrations (
  id uuid primary key default gen_random_uuid(),
  -- Stable identifier referenced by pf_settings.ai_provider.
  slug text not null unique,
  label text not null,
  -- What the integration is for: 'ai' | 'messaging' | 'storage'.
  kind text not null default 'ai',
  -- Which adapter runs it. Custom AI providers use 'openai_compatible',
  -- which covers OpenRouter, Together, DeepSeek, Mistral, xAI, Ollama, …
  driver text not null,
  credentials jsonb not null default '{}'::jsonb,
  config jsonb not null default '{}'::jsonb,
  enabled boolean not null default true,
  -- True for the rows shipped with the app; they cannot be deleted.
  is_builtin boolean not null default false,
  supports_vision boolean not null default true,
  last_tested_at timestamptz,
  last_test_ok boolean,
  last_test_error text,
  sort_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists pf_integrations_kind_idx on pf_integrations (kind, sort_order);

drop trigger if exists trg_pf_integrations_updated_at on pf_integrations;
create trigger trg_pf_integrations_updated_at before update on pf_integrations
  for each row execute function set_updated_at();

-- Seed the built-ins. `on conflict do nothing` keeps admin edits intact when
-- this migration is re-run.
insert into pf_integrations (slug, label, kind, driver, config, is_builtin, supports_vision, sort_order)
values
  ('claude', 'Claude (Anthropic)', 'ai', 'anthropic',
   '{"envKey":"ANTHROPIC_API_KEY","textModel":"","visionModel":""}'::jsonb, true, true, 10),
  ('groq', 'Groq (Llama)', 'ai', 'groq',
   '{"envKey":"GROQ_API_KEY","textModel":"","visionModel":""}'::jsonb, true, false, 20),
  ('gemini', 'Google Gemini', 'ai', 'gemini',
   '{"envKey":"GEMINI_API_KEY","textModel":"","visionModel":""}'::jsonb, true, true, 30),
  ('openai', 'OpenAI', 'ai', 'openai',
   '{"envKey":"OPENAI_API_KEY","textModel":"","visionModel":""}'::jsonb, true, true, 40),
  ('telegram', 'Telegram Bot', 'messaging', 'telegram', '{}'::jsonb, true, false, 50),
  ('cloudinary', 'Cloudinary', 'storage', 'cloudinary',
   '{"envKey":"CLOUDINARY_API_KEY"}'::jsonb, true, false, 60)
on conflict (slug) do nothing;
