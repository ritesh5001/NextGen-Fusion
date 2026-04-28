-- Add daily send limit to campaigns
-- Run this once in Supabase SQL editor.

alter table campaigns
  add column if not exists daily_send_limit int;
