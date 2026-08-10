-- COnstruct initial schema (Section 4 of build brief)
-- Public read, service-role-only write. No Supabase Auth in this phase
-- (see Section 9) — /admin/metrics writes go through a server route
-- using the service_role key, gated by a shared-password check.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- departments
-- ---------------------------------------------------------------------------
create table departments (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  overview text,
  banner_image_url text,
  banner_image_alt text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------------
create table projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  department_id uuid references departments(id) on delete set null,
  year int not null,
  description text,
  cover_image_url text,
  cover_image_alt text,
  -- Gallery images: jsonb array of {"url": string, "alt": string}.
  gallery jsonb not null default '[]',
  status text not null default 'published' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index projects_department_id_idx on projects(department_id);
create index projects_year_idx on projects(year);
create index projects_status_idx on projects(status);

-- ---------------------------------------------------------------------------
-- project_metrics (manual entry, no live sync — see Section 4A)
-- ---------------------------------------------------------------------------
create table project_metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  metric_type text not null check (metric_type in (
    'impressions',
    'engagement_rate',
    'participant_count',
    'participant_yoy_change',
    'satisfaction_rating',
    'demographic_breakdown',
    'beneficiaries_reached'
  )),
  -- jsonb so numeric metrics can store a plain number and
  -- demographic_breakdown can store a chart-ready object.
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index project_metrics_project_id_idx on project_metrics(project_id);
create unique index project_metrics_project_id_metric_type_key
  on project_metrics(project_id, metric_type);

-- ---------------------------------------------------------------------------
-- roles (Recruitment Hub)
-- ---------------------------------------------------------------------------
create table roles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  department_id uuid references departments(id) on delete set null,
  status text not null default 'open' check (status in ('open', 'closed')),
  description_rich_text text,
  responsibilities text[] not null default '{}',
  -- jsonb array of {"url": string, "alt": string}.
  visual_examples jsonb not null default '[]',
  application_deadline date,
  application_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index roles_department_id_idx on roles(department_id);
create index roles_status_idx on roles(status);

-- ---------------------------------------------------------------------------
-- testimonials (reused across projects, departments, and roles)
-- ---------------------------------------------------------------------------
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references projects(id) on delete cascade,
  department_id uuid references departments(id) on delete cascade,
  role_id uuid references roles(id) on delete cascade,
  quote text not null,
  author_name text not null,
  author_role text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  constraint testimonials_one_parent_check check (
    (project_id is not null)::int
    + (department_id is not null)::int
    + (role_id is not null)::int = 1
  )
);

create index testimonials_project_id_idx on testimonials(project_id);
create index testimonials_department_id_idx on testimonials(department_id);
create index testimonials_role_id_idx on testimonials(role_id);

-- ---------------------------------------------------------------------------
-- credits
-- ---------------------------------------------------------------------------
create table credits (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  member_name text not null,
  role text,
  photo_url text,
  photo_alt text,
  created_at timestamptz not null default now()
);

create index credits_project_id_idx on credits(project_id);

-- ---------------------------------------------------------------------------
-- Row Level Security: public read, no anon writes.
-- Writes happen only via the service_role key from server-side routes
-- (currently just /admin/metrics), which bypasses RLS entirely.
-- ---------------------------------------------------------------------------
alter table departments enable row level security;
alter table projects enable row level security;
alter table project_metrics enable row level security;
alter table roles enable row level security;
alter table testimonials enable row level security;
alter table credits enable row level security;

create policy "public read departments" on departments for select using (true);
create policy "public read projects" on projects for select using (true);
create policy "public read project_metrics" on project_metrics for select using (true);
create policy "public read roles" on roles for select using (true);
create policy "public read testimonials" on testimonials for select using (true);
create policy "public read credits" on credits for select using (true);
