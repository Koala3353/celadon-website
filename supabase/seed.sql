-- PLACEHOLDER seed data for local/dev preview only.
-- Replace with real Celadon project data and last year's actual
-- figures before launch (see "Open Items for Kyle" in the build brief).
-- Run this in the Supabase SQL Editor AFTER 0001_init.sql.

insert into departments (slug, name, overview, banner_image_url) values
  ('commpub', 'COMMPUB', 'Handles Celadon''s communications, publications, and brand presence across all initiatives.', null),
  ('external-affairs', 'External Affairs', 'Manages sponsor relations, partnerships, and outward-facing engagements.', null),
  ('projects-committee', 'Projects Committee', 'Plans and executes Celadon''s flagship year-round projects.', null);

insert into projects (slug, title, department_id, year, description, cover_image_url, status)
select 'sample-flagship-project', 'Sample Flagship Project (placeholder)', id, 2025,
  'Placeholder description — replace with real project copy before launch.', null, 'published'
from departments where slug = 'projects-committee';

insert into project_metrics (project_id, metric_type, value)
select id, 'impressions', '12000'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'engagement_rate', '0.34'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'participant_count', '450'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'participant_yoy_change', '0.12'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'satisfaction_rating', '4.6'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'beneficiaries_reached', '900'::jsonb from projects where slug = 'sample-flagship-project'
union all
select id, 'demographic_breakdown',
  '{"Freshman": 30, "Sophomore": 25, "Junior": 25, "Senior": 20}'::jsonb
  from projects where slug = 'sample-flagship-project';

insert into testimonials (project_id, quote, author_name, author_role, featured)
select id, 'Placeholder testimonial quote — replace with a real sponsor or participant quote.',
  'Jane Dela Cruz', 'Sponsor, Sample Partner Co.', true
from projects where slug = 'sample-flagship-project';

insert into credits (project_id, member_name, role, photo_url)
select id, 'Sample Member Name', 'Project Head', null
from projects where slug = 'sample-flagship-project';

insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, visual_examples, application_deadline, application_link)
select 'sample-core-member', 'Sample Core Member Role (placeholder)', id, 'open',
  'Placeholder role description — replace with the real responsibilities and expectations copy.',
  array['Attend weekly meetings', 'Support project execution', 'Coordinate with other departments'],
  '[]'::jsonb,
  '2026-09-30',
  null
from departments where slug = 'projects-committee';
