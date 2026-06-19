-- Subscription / plan payments collected via Razorpay (Orders API).
create table if not exists public.subscription_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  plan_id text not null,
  plan_name text not null,
  period text not null check (period in ('year', 'month')),
  amount integer not null,            -- charged amount in paise
  currency text not null default 'INR',
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  razorpay_order_id text not null unique,
  razorpay_payment_id text,
  status text not null default 'created' check (status in ('created', 'paid', 'failed')),
  notes text
);

create index if not exists subscription_orders_email_idx on public.subscription_orders (customer_email);
create index if not exists subscription_orders_status_idx on public.subscription_orders (status);
create index if not exists subscription_orders_created_idx on public.subscription_orders (created_at desc);
