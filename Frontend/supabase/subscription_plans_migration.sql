-- Admin-managed subscription plan catalog (prices controlled from the admin panel).
create table if not exists public.subscription_plans (
  id text primary key,                 -- slug, e.g. 'website-support'
  name text not null,
  amount integer not null,             -- price in INR rupees
  period text not null check (period in ('year', 'month')),
  tagline text,
  features jsonb not null default '[]'::jsonb,
  highlighted boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscription_plans_active_idx on public.subscription_plans (active, sort_order);

-- Seed with the current catalog (safe to re-run).
insert into public.subscription_plans (id, name, amount, period, tagline, features, highlighted, sort_order)
values
  ('website-support', 'Website Support', 2000, 'year', 'Keep your site healthy.',
    '["Uptime monitoring","Security & plugin updates","Bug fixes","Email support"]'::jsonb, false, 1),
  ('support-changes-wp', 'Support + Changes', 15000, 'year', 'For WordPress & Shopify sites.',
    '["Everything in Website Support","Content & design change requests","Product / page updates","Priority email support"]'::jsonb, true, 2),
  ('support-changes-custom', 'Support + Changes (Custom)', 5000, 'month', 'For custom-coded sites & apps.',
    '["Dedicated developer support","Ongoing changes & enhancements","Performance & SEO upkeep","Large changes quoted separately"]'::jsonb, false, 3),
  ('product-catalog', 'Product Catalog Access', 4999, 'year', 'Upload & manage your products.',
    '["Access the product upload tools in your portal","Add & manage products with variants","Bulk CSV import","WooCommerce / Shopify CSV export"]'::jsonb, false, 4)
on conflict (id) do nothing;
