-- =========================
-- Blog posts (/blog)
-- =========================
-- The frontend has always read /api/blog-posts, but no such endpoint or table
-- existed — which is why the blog rendered empty. Column names match the
-- BlogPost interface in Frontend/src/lib/api.ts exactly, including the
-- historical "conclution" spelling, so the frontend needs no type changes.
--
-- `id` is bigserial rather than uuid because the frontend types it as `number`.

create table if not exists blog_posts (
  id bigserial primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  introduction text,
  content text not null,
  conclution text,
  cover_image text,
  author text not null default 'NextGen Fusion',
  category text,
  read_duration int,
  published_at timestamptz not null default now(),
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists blog_posts_slug_idx on blog_posts (slug);
create index if not exists blog_posts_published_at_idx on blog_posts (published_at desc);
create index if not exists blog_posts_is_active_idx on blog_posts (is_active);
