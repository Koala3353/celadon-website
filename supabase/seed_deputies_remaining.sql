-- Real Deputy-level content for the 4 remaining departments
-- (EXREL, FIN, HR, OSR), transcribed from
-- cldn-dept-apps-2526/departments/{exrel,fin,hr,osr}.
-- Run this AFTER seed_committees_and_deputies.sql.
--
-- Same caution as before: seeded as status = 'closed' since none of
-- this has a real application_link/deadline for the CURRENT cycle.
-- Flip to 'open' once you've attached this year's real link/deadline.

-- EXREL: single role, "EXREL Associate" (no named pools).
insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, qualities)
select
  'exrel-associate',
  'EXREL Associate',
  d.id,
  'closed',
  'EXREL Associates serve as the official liaison of Ateneo Celadon towards external organizations and corporations. They aim to provide value to both internal and external stakeholders of the organization through sustainable and mutually beneficial partnerships, and seek to generate, develop, and maintain the organization''s relationships and networks.',
  ARRAY[
    'Deployed and tasked with managing and handling the interdepartmental EXREL systems.',
    'Navigate and organize the Project Masterfile for different projects, including drafting Marketing Package (MP) prices and benefit inclusions.',
    'Draft Memorandum of Agreements (MOA) for signing.',
    'Assist in email blasts and negotiating with partners.',
    'Assist in sharing and accomplishing benefits and responsibilities under sponsorship agreements.',
    'Assist in accomplishing requirements from the Office of Food Safety and Quality Assurance (OFSQA) and similar bodies.'
  ],
  ARRAY[
    'Determined to accomplish tasks and goals',
    'Organized and has good time management',
    'Communicative and open',
    'Able to handle rejection well'
  ]
from departments d
where d.slug = 'exrel'
on conflict (slug) do nothing;

-- FIN: single role, "Manager-in-Training (MIT)" (FIN's name for its deputies).
insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, qualities)
select
  'fin-mit',
  'FIN Manager-in-Training (MIT)',
  d.id,
  'closed',
  'An MIT (Manager-in-Training) is what the Financial Affairs Department calls its deputies, since MITs are being trained and groomed to grow into future FIN managers. MITs are deployed to projects within and outside the department.',
  ARRAY[
    'Operations track - manage inventory and financial tracking through Google Sheets and Forms, sharpening organizational skills.',
    'Logistics track - handle venue reservations, procurement, and manpower, building skills in time management and supplier coordination.',
    'Sales track - market products, engage with customers, and record transactions, developing interpersonal skills.',
    'Fundraising track - lead small-scale fundraisers to provide the deployed project with an additional source of revenue.',
    'Track expenses and collect receipts as part of FIN''s systems responsibilities.'
  ],
  ARRAY[
    'Wants to manage various projects financially',
    'Wants to help raise funds for the organization',
    'Wants to learn more about business-related skills',
    'Wants to experience financial management',
    'Can thrive in high-pressure environments'
  ]
from departments d
where d.slug = 'fin'
on conflict (slug) do nothing;

-- HR: 2 named pools, Strategic Impact Deputy (SIMP) and Systems Deputy.
insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, qualities)
select v.slug, v.title, d.id, 'closed', v.description, v.responsibilities, v.qualities
from departments d
cross join (
  values
    (
      'hr-simp-deputy',
      'Strategic Impact Deputy (SIMP)',
      'Strategic Impact Deputies (SIMP) work directly with the HR SIMP Managers in executing several mini-projects throughout the academic year, including but not limited to hobby groups, mahjong mixers, and Celadon parties.',
      ARRAY[
        'Ideation of mini-project concepts.',
        'Handling logistics for mini-projects.',
        'Coordinating manpower for mini-projects.',
        'Marketing mini-projects to the org.'
      ],
      ARRAY[
        'People-oriented and genuinely enjoys connecting with others',
        'Proactive, flexible, and takes initiative',
        'Works well in a team and communicates clearly',
        'Willing to plan impactful HR initiatives that focus on membership development',
        'Skilled at empathizing and understanding people'
      ]
    ),
    (
      'hr-systems-deputy',
      'HR Systems Deputy',
      'HR Systems Deputies work directly with the HR Systems Managers in processing HR services and enforcing safe spaces within the organization, and are deployed to Celadon projects as HR representatives.',
      ARRAY[
        'Promoting the department''s services (LOA, resignation, and complaint filing).',
        'Monitoring committee welfare and rapport.',
        'Acting as liaisons for the HR Systems Managers.'
      ],
      ARRAY[
        'People-oriented and genuinely enjoys connecting with others',
        'Proactive, flexible, and takes initiative',
        'Works well in a team and communicates clearly',
        'Willing to plan impactful HR initiatives that focus on membership development',
        'Skilled at empathizing and understanding people'
      ]
    )
) as v(slug, title, description, responsibilities, qualities)
where d.slug = 'hr'
on conflict (slug) do nothing;

-- OSR: single deputy-level role, "Junior Analyst" (Consultant & Senior
-- Analyst is Manager level and out of scope this cycle).
insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, qualities)
select
  'osr-junior-analyst',
  'Junior Analyst',
  d.id,
  'closed',
  'Junior Analysts are OSR''s deputy-level role, deployed as Recruitment & Secretariat (RecSec) or Operations core team members to different Celadon projects.',
  ARRAY[
    'Deployed as RecSec/Operations core to different Celadon projects.',
    'Assist the OSR Consultant Managers with evaluations, data gathering, individual consultations (ICs), and completing the sustainability report.',
    'Participate in different OSR workshops and events.'
  ],
  ARRAY[
    'Driven individuals who are eager to learn and work in order to create change and help Celadon improve.',
    'Someone with bright, out-of-the-box ideas who enjoys technical work (especially Excel/Google Sheets) and communicates well with others.'
  ]
from departments d
where d.slug = 'osr'
on conflict (slug) do nothing;
