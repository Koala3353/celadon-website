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

> **`site` is not currently synced.** On 2026-08-16 row 1 of the Sheet's `site`
> tab lost its `key`,`value` header — a direct edit merged it and the first 9
> data rows into one corrupted row. Since row 1 supplies the column names for
> every row below it, that broke every required key at once and failed the
> build. The team's other edits (Vision/Mission copy, real stats, recruitment
> dates, the corrected Facebook URL) were genuine and are preserved in
> [`content/site.csv`](content/site.csv) — only the corrupted header/9-row
> block was reconstructed, from values that were still fully recoverable.
> `departments`, `projects`, `roles` sync normally. See "Handing `site` back
> to the Sheet" below to restore full sync.

### Editing content

1. Open the content Sheet.
2. Edit any tab. **Don't rename tabs or header columns** — they're the schema.
3. Publish:

   ```bash
   gh workflow run deploy-pages.yml
   ```

   It also runs on every push to `main`, and daily at 20:17 UTC (4:17am PHT).

To pull Sheet edits into the repo locally:

```bash
CONTENT_SHEET_ID=<id> npm run sync:content
```

### Handing `site` back to the Sheet

1. Open the Sheet's `site` tab. Row 1 currently reads something like
   `"key org_name org_tagline org_phone org_address hero_line_1 hero_line_2
   hero_body hero_cta_label hero_cta_href"` in column A — one merged cell
   instead of a header plus 9 rows.
2. Delete that corrupted row 1 entirely (right-click the row number → Delete
   row).
3. Insert 10 clean rows above the current `est_year` row, in this exact
   order, one `key`/`value` pair per row:

   | key | value |
   | --- | --- |
   | `key` | `value` |
   | `org_name` | `Ateneo Celadon` |
   | `org_tagline` | `The premier Filipino-Chinese student-led organization of the Ateneo de Manila University.` |
   | `org_phone` | `0921 999 8882` |
   | `org_address` | `3/F Manuel V. Pangilinan Building, Ateneo de Manila University, Katipunan Avenue, Quezon City` |
   | `hero_line_1` | `Ateneo` |
   | `hero_line_2` | `Celadon` |
   | `hero_body` | `Six departments, one community. Celadon runs the projects, culture, and formation that carry Filipino-Chinese life on campus — and recruits the students who make them happen.` |
   | `hero_cta_label` | `Join Celadon` |
   | `hero_cta_href` | `/recruitment` |

4. Add `"site"` back to `TABS` in
   [`scripts/sync-content.mjs`](scripts/sync-content.mjs).

`src/lib/content.ts` asserts every key the templates use is present, so a
still-broken header fails the build loudly rather than shipping empty copy —
safe to attempt.

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
