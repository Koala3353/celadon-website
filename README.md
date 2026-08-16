# Ateneo Celadon

The premier Filipino-Chinese student-led organization of the Ateneo de Manila
University.

**Live:** https://ateneoceladon.com/

---

## How it works

A **Google Sheet is the only content source.** There is no database, no CMS,
and no server:

```
Google Sheet  ──npm run sync:content──▶  content/*.csv  ──next build──▶  out/
                                                                          │
                                                        GitHub Actions ───┘
                                                                          ▼
                                                                  GitHub Pages
```

Every page is prerendered to static HTML at build time — which is what makes a
GitHub Pages deploy possible at all, since Pages serves files and nothing else.

`sync-content.mjs` fetches each tab by **gid** (`/export?format=csv&gid=<id>`),
not by name through the gviz endpoint. gviz is more convenient to point at a
new tab, but it has a real server-side cache: a Sheet edit that fixed a
corrupted header row didn't show up over gviz for several minutes on
2026-08-16, even with cache-busting, while the gid endpoint served the fresh
content immediately. The tradeoff is that the four gids are hardcoded in the
script — a gid doesn't change when a tab is renamed or reordered, only if it's
deleted and recreated, in which case update it there.

### Editing content

1. Open the content Sheet.
2. Edit any tab. **Don't rename header columns** in a tab — they're the
   schema. Row 1 of every tab must stay a plain header row (e.g. `key,value`
   for `site`) — merging it with data rows (e.g. via a bad paste or an
   in-cell line break) breaks every row below it at once, since row 1 supplies
   the column names. `src/lib/content.ts` asserts the `site` tab's required
   keys at build time, so a broken header fails the build loudly rather than
   shipping empty copy.
3. Publish:

   ```bash
   gh workflow run deploy-pages.yml
   ```

   It also runs on every push to `main`, and daily at 20:17 UTC (4:17am PHT).

To pull Sheet edits into the repo locally:

```bash
CONTENT_SHEET_ID=<id> npm run sync:content
```

Where each `site` key renders:

| Keys | Page | Notes |
| --- | --- | --- |
| `est_year` | Home hero | `Est. {est_year} · Loyola Heights`; the eyebrow drops to just "Loyola Heights" if unset |
| `stat_1`–`stat_6` `_value`/`_label` | Home, "Celadon in numbers" | Any pair missing its value *or* label is skipped, not shown half-empty. Values are free text (`₱100,000+` is fine) — not run through digit-counting animation |
| `vision_heading`/`_body`, `mission_heading`/`_body`, `core_competency_heading`/`_body`, `core_advocacy_heading`/`_body` | About, "What we stand for" | Each rendered only if both its heading and body are present |
| `purposes_heading`, `purposes_body` | About, "Purposes & Functions" | `purposes_body` is a bulleted list — one item per line in the cell |
| `recruitment_stay_tuned_heading`/`_body`, `recruitment_deputy_date`, `recruitment_core_date` | Recruitment, "Stay tuned" | Shown only while no role is `open`; the two dates are each optional |

`org_tiktok` and `org_email` are stored but not yet linked anywhere — say the
word if they should join the footer's Instagram/Facebook links.

### Sheet schema

| Tab | Key columns |
| --- | --- |
| `departments` | `slug`, `name`, `overview` |
| `projects` | `slug`, `title`, `department_slug`, `year`, `status`, `description`, `cover_image_url`, `cover_image_alt` |
| `roles` | `slug`, `title`, `department_slug`, `project_slug`, `status`, `description`, `responsibilities`, `common_deliverables`, `qualities`, `application_deadline`, `application_link`, `core_application_link`, `head_application_link` |
| `site` | `key`, `value` — all headings and body copy |

Notes:

- `slug` is the URL segment: unique, lowercase-hyphenated.
- A role belongs to **either** a project (a Core Team committee) **or** a
  department (a standing pool) — fill one of `project_slug` / `department_slug`.
- Multi-value cells (`responsibilities`, `common_deliverables`, `qualities`)
  are **one item per line inside a single cell** (Alt+Enter in Sheets).
- A department slug also selects its Ayi mascot from `public/ayi/<slug>.png`.
- Only projects with `status: published` appear.
- Roles with `status: open` show apply buttons; `closed` roles stay browsable.

## Local development

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # static export to ./out
npm run sync:content   # refresh content/*.csv from the Sheet
npm run lint
```

### Why `--webpack`

`npm run build` passes `--webpack` deliberately. Turbopack, the Next 16 default,
currently fails to load the `lightningcss` native binding through the PostCSS
worker Tailwind v4 uses. Remove the flag once that's fixed upstream.

## Design

From the Celadon Website Brandbook.

| | |
| --- | --- |
| Primary | `#003078` navy · `#18182A` ink · `#FFFFFF` white |
| On navy | `#C7D2E1` body · `#7BA4FF` link |
| Accent | `#F09B43` orange, sparingly |
| Title | Gotham Black → **Montserrat 900**, all caps |
| Body | Gotham → **Montserrat** |

Two deliberate departures from the book, both for legibility:

- **`--link: #296BFF` and `--accent-ink: #B2620E`.** The book's `#7BA4FF` and
  `#F09B43` are tuned for a navy field; on white they measure 2.44:1 and 2.22:1,
  well under the 4.5:1 WCAG asks for body text. These keep the hue and
  saturation and only drop lightness until they clear AA at 4.52:1. The original
  values are still used verbatim on navy, where they pass.
- **Line spacing.** The book specifies 1.0. That's applied to display type
  (`.display`); paragraphs use 1.6, since 1.0 leading at paragraph length is
  below what WCAG 1.4.12 asks and is genuinely hard to read.

Montserrat substitutes for Gotham, which has no web-embedding licence here —
same geometric skeleton and wide caps, and one variable family covers 400–900.

Brand assets in `public/brand/` are extracted from the brandbook; the Ayi
mascots in `public/ayi/` come from the org's asset Drive.

### Motion

[anime.js v4](https://animejs.com) drives scroll reveals, the stat counters, the
hero line reveal, and the filter re-stagger. Everything else — the wordmark
marquee, hovers, press feedback — is CSS, so it runs off the main thread.

Rules the motion follows:

- Only `transform` and `opacity` animate; nothing triggers layout.
- Custom `cubic-bezier(0.23, 1, 0.32, 1)` easing; no `linear`/`ease-in-out`
  defaults, and never `ease-in` on entry.
- UI transitions stay under 300ms. Reveals run 620ms as scroll choreography.
- Hover effects are gated behind `@media (hover: hover) and (pointer: fine)`
  so a tap on touch hardware can't latch them.
- `prefers-reduced-motion: reduce` disables the marquee and every reveal, and
  content is shown rather than left in its hidden start state.
- Nav links don't animate — they're high-frequency targets.

## Deployment

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
builds and publishes to Pages. It needs **no secrets**. One optional repository
*variable*, `CONTENT_SHEET_ID`, turns on the Sheet refresh (see above).
