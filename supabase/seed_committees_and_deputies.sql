-- Real committee catalog applied to the 5 current projects, plus real
-- Deputy-level content for CUL (single "Trainee" role) and COMMPUB
-- (5 named pools). Run this AFTER seed_real_data.sql.
--
-- All rows are seeded as status = 'closed' on purpose: none of these
-- have a real application_link or deadline for the CURRENT cycle yet
-- (the department content was transcribed from last year's site as a
-- structural reference, and the project committees have no live site
-- at all). Flip a role to 'open' once you've attached the real link
-- and deadline for this cycle — otherwise the public Recruitment Hub
-- will correctly keep it hidden.

-- ---------------------------------------------------------------------------
-- 1. Generic committee catalog x 5 projects (Jade Business Summit, LDP,
--    Rose Sale, Spring Film Festival, Chinese New Year). Same 13
--    committees on every project for you to prune/customize later.
-- ---------------------------------------------------------------------------
with committees(code, title, description, responsibilities, common_deliverables, qualities) as (
  values
    (
      'prog',
      'Programs (PROG)',
      'The Programs committee makes up the core of most projects as their outputs typically manifest in the bulk of the project/event. Given this, the programs committee must always keep the project''s participants/attendees in mind when designing the program and working on their other tasks/deliverables.',
      ARRAY[
        'Responsible for conceptualizing and implementing the program of the project.',
        'Responsible for the smooth running of the program throughout the event, ensuring that the project starts and ends on time, and that the participants/attendees are engaged and having fun.',
        'Most of the work takes place before and during the project proper.'
      ],
      ARRAY[
        'Program Flow (typically details time, duration, and what''s going on at that time)',
        'Operation Schedule (OpSched) (goes into greater detail than the program flow and may include materials needed, people involved, point persons, notes, etc.)',
        'Invitation of Performers/Hosts/Speakers',
        'Hosts'' Script',
        'PPT presentations (alongside Digital Creatives)',
        'Modules consisting of activities such as icebreakers, games, etc.',
        'Content for promotions (i.e., gimmicks, raffles, etc.)',
        'Certificates & Tokens of Appreciation for Performers/Speakers/Hosts',
        'Score trackers',
        'Handling dry runs',
        'Module cheat sheet/guide'
      ],
      ARRAY[
        'Creative - able to think out of the box',
        'Culturally Knowledgeable - able to apply cultural aspects to outputs',
        'Quick-witted - able to adapt to changes quickly',
        'Communication skills - able to relay information to/from multiple parties clearly'
      ]
    ),
    (
      'log',
      'Logistics (LOG)',
      'The Logistics committee works behind the scenes to make the project happen.',
      ARRAY[
        'Responsible for securing the platform/venues for the project and all other required materials (e.g., prizes).',
        'Responsible for movement/mobilization of people and goods.',
        'Works closely with PROG to implement the program flow.'
      ],
      ARRAY[
        'Sourcing/purchasing materials needed by the project',
        'Securing the rooms (through forms), items, and other materials needed for the project proper.',
        'Delivering the items to the necessary places.',
        'Conceptualizing venue layout together with the Production Design Committee.',
        'Arriving early on the event day to set up the booth/room/hall and packing up all the items and materials afterwards.',
        'Ensuring that the movement of participants remains smooth.',
        'Purchasing and handling the delivery of prizes or tokens of appreciation to participants.'
      ],
      ARRAY[
        'Has the knowledge on how to secure rooms and purchase items or materials needed.',
        'Alert - aware of everything that''s going on and able to react quickly under pressure.'
      ]
    ),
    (
      'ops',
      'Operations (OPS)',
      'The Operations committee oversees money-related transactions between Celadon and 3rd parties and creates systems and processes to facilitate the smooth flow of operations.',
      ARRAY[
        'Oversee money-related transactions between Celadon and 3rd parties.',
        'Create systems and processes to facilitate the smooth flow of operations.'
      ],
      ARRAY[
        'Create and program spreadsheets that monitor and log actions taken for an event (online and onsite sales of a product, remaining inventory of resources, etc.)',
        'Create Google Forms for ordering processes',
        'Manage onsite inventory and the pick-ups of online orders'
      ],
      ARRAY[
        'Ability to design and program Excel spreadsheets',
        'Detail oriented'
      ]
    ),
    (
      'recsec',
      'Recruitment & Secretariat (RECSEC)',
      'The Recruitment and Secretariat committee works all throughout the project planning and execution phase to manage the recruitment, registration, and evaluation processes of the project. Also known as Recruitment & Strategy (RECSTRAT) when taking a more proactive, outreach-focused approach to recruitment.',
      ARRAY[
        'Responsible for handling the recruitment of participants, facilitators, etc., depending on the nature of the project.',
        'Responsible for the registration and post-project evaluation files.',
        'Responsible for recruiting ambassadors (within and outside Celadon) and managing them.'
      ],
      ARRAY[
        'Registration Forms/Sheets',
        'Early Departure, Tardiness, and Absence Forms (EDTAFs)',
        'Directory of participants'' information',
        'Sending invitations to participants (e.g., professors for TAW)',
        'Interviewing participants/facilitators',
        'Making groupings of participants',
        'Handling movement of participants to (breakout) rooms during the event (alongside LOG)',
        'Recruiting and managing project ambassadors',
        '(Onsite) First touchpoints of participants; responsible for the registration booths.',
        '(Onsite) Checking that participants have all the necessary documents needed to enter the event (Blue Pass, CAR Form, Health Kit, etc.).'
      ],
      ARRAY[
        'Organized',
        'Communication skills',
        'Familiarity with Google Sheets and Forms'
      ]
    ),
    (
      'dc',
      'Digital Creatives (DC)',
      'The Digital Creatives committee designs the visual identity of the project in the form of its promotions and other published materials. As such, much of their work is done prior to the project proper.',
      ARRAY[
        'Responsible for the conceptualization and execution of creative digital promotions through outputs such as posters, GIFs, etc.',
        'Responsible for conceptualizing content that will aid in the promotion of the event, such as DP shoots and posters (alongside DOCPUB and PROD).',
        'Responsible for ensuring that all visual materials used in the project will have a consistent style/branding.',
        'Must adhere to the branding of Celadon as presented in the official branding manual and project brand book.'
      ],
      ARRAY[
        'Branding guide for the project - includes color scheme, font families, elements used in publicity material',
        'Publicity Materials (PubMats) - DPs, Posters, GIFs, Primers, etc.',
        'PPT template (for PROG)',
        'Frame template for Photos (for DOCPUB)',
        'Skins for live streams (for LOG)'
      ],
      ARRAY[
        'Familiarity with Canva, Adobe Photoshop, Illustrator, etc., and basic graphic design principles.',
        'Creative - able to ideate new and unique promotions.',
        'Disciplined - able to keep up with deadlines and avoid cramming.',
        'Consistent - able to stick to the branding of the project and maintain good quality of work.'
      ]
    ),
    (
      'prod',
      'Production Design (PROD)',
      'The Production Design committee is in charge of planning and executing the physical promotions for projects (in collaboration with PROG or other core team committees). The team utilizes current trends to not only improve publicity for projects but also provide entertainment and increase engagement (e.g., a quick game with varying prizes done prior to the event).',
      ARRAY[
        'Responsible for ensuring that all kinds of promotional materials will not cause any detriment to anyone involved in the execution.',
        'Responsible for ideating and creating props and items that will be physically utilized in a given project.',
        'Responsible for the ideation and execution of the event design of a given onsite project.',
        'Outputs created by PROD must adhere to the project''s branding guidelines and Celadon''s official branding.'
      ],
      ARRAY[
        'Promotional plan - communicating with PROG to determine the specific onsite gimmicks to be executed.',
        'Creating props for the project (if applicable)',
        'Booth design/venue layout - plan the designs and physical props to be used on the booth or venue.',
        'Communicating with DOCPUB to arrange DP shoots, ideate set design, and execute the vision.'
      ],
      ARRAY[
        'Up-to-date - aware of marketing themes and gimmicks that can be applied to projects through onsite/physical craft/execution.',
        'Creative - able to think of unique ways to design a given layout given available resources.',
        'Resourceful - able to find ways to execute plans and gather materials in case of contingencies.',
        'Diligent - able to execute all deliverables on time.',
        'Sustainable - able to think of ways to reuse old materials and make designs reusable in the future.'
      ]
    ),
    (
      'docpub',
      'Documentation & Publications (DOCPUB)',
      'The Documentation and Publications committee handles the photo, video, and writing-related outputs of the project. Most of their work is done during and after the project proper, though some work (photoshoots/videoshoots, writing spiels for publicity materials) happens beforehand. Work is often delegated across the committee according to each member''s preference and capabilities.',
      ARRAY[
        'Responsible for conceptualizing content that will aid in the promotion of the event, usually but not limited to DPs, video content, and photo/video-related pubs.',
        'Responsible for writing copy to support promotional materials.',
        'Responsible for event documentation during the project proper and editing after the project proper.',
        'Outputs created by DOCPUB must adhere to the project''s branding guide as well as Celadon''s official branding.'
      ],
      ARRAY[
        'Photos: event photos, DP blast photoshoots, post-processing photos',
        'Videos: teaser videos, promotional reels, post-event recap',
        'Writing: captions or spiels for promotional posts, articles'
      ],
      ARRAY[
        'Familiarity with camera equipment and photo/video editing software.',
        'Familiarity with copywriting techniques.',
        'Open to criticism and feedback that may lead to revisions.',
        'A keen eye for identifying and executing suitable aesthetics for individual outputs.',
        'Disciplined - able to complete deliverables on time and stay focused on the job.'
      ]
    ),
    (
      'exrel',
      'External Relations (EXREL)',
      'The External Relations committee handles the project''s external stakeholders, more specifically, those whose agreements involve money. As such, the bulk of their work is done prior to the project proper.',
      ARRAY[
        'Responsible for contacting and negotiating with sponsors for the project.',
        'Responsible for ensuring that both sides of the agreement are met and that information relevant to specific individuals/groups in the project is relayed promptly and accurately.'
      ],
      ARRAY[
        'Drafting the Memorandum of Agreement (MOA) to suit the needs of the project',
        'Contacting potential sponsors for the project through email and other means',
        'Negotiating with potential sponsors to reach an agreement',
        'Processing files such as the Memorandum of Agreement (MOA), etc.',
        'Keeping track of requirements of the agreement (e.g., likes, shares, logo placement, etc.)',
        'Informing certain parties (e.g., Project Managers, PROG, etc.) about requirements relevant to them'
      ],
      ARRAY[
        'Communication and negotiation skills',
        'Persistence',
        'Familiarity with mail merge (e.g., Mail Meteor)',
        'Detail-oriented'
      ]
    ),
    (
      'fr',
      'Fundraising (FR)',
      'The Fundraising committee enables the project to happen by supplementing the project''s budget with the profits from fundraising initiatives.',
      ARRAY[
        'Responsible for brainstorming and planning different ways to raise money for the project and ideating new, innovative, and attractive fundraising concepts.',
        'Responsible for keeping track of cash flows for all fundraising activities and transferring the profits to where they are needed (typically to LOG).',
        'Responsible for manning the fundraising booth or online store in a manner that complies with proper business ethics.'
      ],
      ARRAY[
        'Fundraising initiatives',
        'Financial tracker for cash flows',
        'Buying and selling online (e.g., Ateneo Trade)',
        'Tracking expenses, revenues, and profits',
        'Creating promotional material for fundraising initiatives',
        'Team ideating and research',
        'Finding concessionaires for initiatives (depends on the project)'
      ],
      ARRAY[
        'Enterprising spirit - enjoys earning money',
        'Tenacity',
        'Familiarity with the online marketplace',
        'Keen eye for relevant trends and products in the market',
        'Proactivity',
        'Communication and persuasion skills'
      ]
    ),
    (
      'cons',
      'Concessionaires (CONS)',
      'The Concessionaires committee handles everything to do with concessionaires for the project.',
      ARRAY[
        'Responsible for looking for concessionaires, communicating with them, and addressing their questions and concerns.',
        'Responsible for ensuring that both sides of the agreement are met and that information relevant to specific individuals/groups in the project is relayed promptly and accurately.'
      ],
      ARRAY[
        'Making a database of potential concessionaires',
        'Contacting potential concessionaires through email and other means',
        'Detailing packages for concessionaires',
        'Processing certain files/contracts/documents',
        'Processing payments from concessionaires',
        'Coordinating with other committees (i.e., LOG) regarding concessionaires'' products, etc.'
      ],
      ARRAY[
        'Communication and negotiation skills',
        'Persistence',
        'Familiarity with mail merge'
      ]
    ),
    (
      'faci-vols',
      'Facilitators/Volunteers (FACI/VOLS)',
      'The Facilitators/Volunteers committee is in charge of handling facilitators or volunteers. Much of their work is done prior to the project and during the project proper. They work closely with Programs to communicate all relevant information to facilitators/volunteers.',
      ARRAY[
        '(FACI) Responsible for training facilitators, motivating them, and managing them during the project proper (with help from HR EBCB).',
        '(VOLS) Responsible for briefing volunteers on their tasks.',
        'Responsible for ensuring that facilitators/volunteers are sufficiently prepared and have all necessary materials.',
        'Responsible for communicating with REC&SEC regarding the recruitment of facilitators/volunteers.'
      ],
      ARRAY[
        'Faci cheat sheet/guide',
        'Volunteers'' general assembly',
        'Facilitator training sessions',
        'Participating in dry runs',
        'Keeping facilitators/volunteers updated',
        'Pre-event briefing',
        'Post-event debriefing'
      ],
      ARRAY[
        '(FACI) Experience being a facilitator',
        'Communication skills'
      ]
    ),
    (
      'sales',
      'Sales',
      'The Sales committee handles everything to do with on-site sales of the project.',
      ARRAY[
        'Responsible for logging down orders and tracking sales using the tracking system.',
        'Responsible for managing the on-site selling booth and marketing the products to customers during the on-site selling period.',
        'Responsible for monitoring and ensuring the respectful and proper conduct of on-site selling matters.',
        'Adapts to on-site selling circumstances to minimize losses and maximize sales.'
      ],
      ARRAY[
        'Ideate strategies to attract attention towards products or services and bring them to customers',
        'Layout of the assortment of products during onsite selling to maximize market reach and attention',
        'Sign up for shifts in managing onsite selling booths',
        'Roving with products to expand reach'
      ],
      ARRAY[
        'Strong understanding of products and their value to customers for selling',
        'Basic knowledge of starting and closing deals with customers',
        'Persistence to make sales',
        'Ability to adapt and improvise to customer needs',
        'Capability to handle finances responsibly and note down sales consistently',
        'Active onsite presence and ability to complete numerous shifts'
      ]
    ),
    (
      'deliveries',
      'Deliveries',
      'The Deliveries committee handles everything to do with on-site deliveries of the project.',
      ARRAY[
        'Responsible for tracking the delivery status of products and delivering them to customers.'
      ],
      ARRAY[
        'Ideate and create delivery spiels for customers',
        'Recruit volunteers to aid in the delivery of products',
        'Manage onsite deliveries and trackers in partnership with the Operations committee'
      ],
      ARRAY[
        'Upbeat demeanor and ability to make deliveries engaging for recipients',
        'Ability to adapt and improvise to customer needs',
        'Organized and able to note down delivery status consistently and accurately',
        'Active onsite presence and ability to complete numerous shifts'
      ]
    )
)
insert into roles (slug, title, project_id, status, description_rich_text, responsibilities, common_deliverables, qualities)
select
  p.slug || '-' || c.code,
  c.title,
  p.id,
  'closed',
  c.description,
  c.responsibilities,
  c.common_deliverables,
  c.qualities
from committees c
cross join projects p
where p.slug in (
  'jade-business-summit',
  'leadership-development-program',
  'rose-sale',
  'spring-film-festival',
  'chinese-new-year'
)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- 2. CUL Deputy: a single "Trainee" role (CUL does not use named pools
--    like COMMPUB — source: cldn-dept-apps-2526/departments/cul).
-- ---------------------------------------------------------------------------
insert into roles (slug, title, department_id, status, description_rich_text, responsibilities, qualities)
select
  'cul-trainee',
  'CUL Trainee',
  d.id,
  'closed',
  'CUL Trainees learn project management skills, foster cultural sensitivity, and develop a knack for cultural discourse. Down the line, trainees are given a path toward further leadership within the department.',
  ARRAY[
    'Spearhead the planning and execution of CUL Mini-events (e.g., workshops, talks).',
    'Contribute to CUL projects by heading core team committees.',
    'Spend time around Celadon projects outside the department to meet others and learn the ropes.'
  ],
  ARRAY[
    'Leaders with a love for the Chinese-Filipino culture who wish to share it with the wider community.',
    'Individuals who are passionate and want to enhance their project management skills.'
  ]
from departments d
where d.slug = 'cul'
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- 3. COMMPUB Deputy pools: 5 named pools, one role each
--    (source: cldn-dept-apps-2526/departments/commpub).
-- ---------------------------------------------------------------------------
insert into roles (slug, title, department_id, status, description_rich_text)
select v.slug, v.title, d.id, 'closed', v.description
from departments d
cross join (
  values
    ('commpub-digital-creatives', 'Digital Creatives Deputy', 'Digital designs, publicity materials (pubs), logos, and other digital creative outputs.'),
    ('commpub-production-design', 'Production Design Deputy', 'Physical designs, crafts, props, and event design/decor.'),
    ('commpub-photos', 'Photos Deputy', 'Event documentation, DP shoots, photo shoots, and photo albums.'),
    ('commpub-videos', 'Videos Deputy', 'Event documentation, video shoots, and video outputs (TikToks, reels, post-event videos, music videos).'),
    ('commpub-writing', 'Writing Deputy', 'Spiels, articles, and other written outputs.')
) as v(slug, title, description)
where d.slug = 'commpub'
on conflict (slug) do nothing;
