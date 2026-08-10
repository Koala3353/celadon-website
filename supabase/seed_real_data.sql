-- Real Celadon content, replacing the placeholder rows from seed.sql.
-- Run this AFTER 0002_role_committees.sql.
--
-- Scope for this pass (per Kyle, 2026-08-07):
--   - 6 real departments with real names/descriptions (stable org info).
--   - 5 real projects for the current recruitment cycle, as EMPTY
--     placeholders (title/year only) — descriptions, committees, and
--     application links to be filled in later via Supabase or an
--     admin UI, since they're cycle-specific and not yet finalized.
--   - COMMPUB's 5 Deputy pools are NOT seeded yet — last year's page
--     had stale slot counts/links, so that's left for a follow-up
--     pass once this year's actual Deputy application details exist.

-- Remove placeholder content from the original seed.sql.
delete from projects where slug = 'sample-flagship-project';
delete from roles where slug = 'sample-core-member';
delete from departments where slug in ('external-affairs', 'projects-committee');

-- Real departments (source: Celadon Dept Apps site, "Meet the Departments").
insert into departments (slug, name, overview) values
  (
    'commpub',
    'COMMPUB',
    'The Communications and Publications Department produces creative media and documentation as well as promotional material and event design for Celadon. It also oversees the branding and public relations of the organization by managing the organization''s official social media channels.'
  ),
  (
    'cul',
    'CUL',
    'The Cultural Affairs Department spearheads the cultivation of the awareness, understanding, and appreciation of Chinese-Filipino culture to both Celadon and the greater Philippine community. It establishes connections and interactions to encourage a mutual acknowledgment of culture.'
  ),
  (
    'exrel',
    'EXREL',
    'The External Relations Department serves as the official liaison of Ateneo Celadon towards external organizations and corporations. It aims to provide value to both the internal and external stakeholders of the organization through sponsorships and partnerships.'
  ),
  (
    'fin',
    'FIN',
    'The Financial Affairs Department is responsible for all Celadon financial matters including major fundraising projects for the organization and other financial transactions. It is in charge of instilling financial responsibility as well as encouraging sustainable innovation.'
  ),
  (
    'hr',
    'HR',
    'The Human Resources Department centers on projects that provide membership development and leadership formation. It is responsible for fostering an internal organization culture that is embedded with modern Chinese-Filipino values through traditional and non-traditional media.'
  ),
  (
    'osr',
    'OSR',
    'The Organization Strategies & Research Department oversees Celadon''s overall welfare by spearheading various research and evaluations. It serves to provide recommendations for improvement of projects and systems through data assessment.'
  )
on conflict (slug) do update set
  name = excluded.name,
  overview = excluded.overview;

-- Real projects for the current recruitment cycle — placeholders only.
-- year uses the application cycle's starting year; adjust if needed.
insert into projects (slug, title, year, status) values
  ('jade-business-summit', 'Jade Business Summit', 2026, 'published'),
  ('leadership-development-program', 'Leadership Development Program', 2026, 'published'),
  ('rose-sale', 'Rose Sale', 2026, 'published'),
  ('spring-film-festival', 'Spring Film Festival', 2026, 'published'),
  ('chinese-new-year', 'Chinese New Year', 2026, 'published')
on conflict (slug) do nothing;
