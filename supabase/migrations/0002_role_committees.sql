-- Extends `roles` so a role (committee) can belong to either a standing
-- department (e.g. COMMPUB's pools) or a project's core team (e.g.
-- TALAB x FAW's Programs committee) — never both, never neither.
-- Also adds the extra content sections real committee pages have
-- (common deliverables, relevant qualities) and separate Core/Head
-- application tracks, since committees recruit at both levels.

alter table roles
  add column project_id uuid references projects(id) on delete cascade,
  add column common_deliverables text[] not null default '{}',
  add column qualities text[] not null default '{}',
  add column core_application_link text,
  add column head_application_link text;

create index roles_project_id_idx on roles(project_id);

alter table roles
  add constraint roles_one_parent_check check (
    (department_id is not null)::int + (project_id is not null)::int = 1
  );
