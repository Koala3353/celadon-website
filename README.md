# Celaville — Ateneo Celadon Recweek 2026–2027

下一课！Start the next chapter with Celadon.

Celadon's Recweek site: departments, projects, and a discovery hub covering
every Core Team committee and department role.

**Live:** https://koala3353.github.io/celadon-website/

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

Every page is prerendered to static HTML at build time. That is what makes a
GitHub Pages deploy possible — Pages serves files and nothing else.

### Editing content

1. Open the content Sheet (see `CONTENT_SHEET_ID` in the repo variables).
2. Edit any tab. **Don't rename tabs or header columns** — they're the schema.
3. Publish the change by running the workflow:

   ```bash
   gh workflow run deploy-pages.yml
   ```

   It also runs automatically on every push to `main`, and once a day at
   20:17 UTC (4:17am PHT).

To pull Sheet edits into the repo locally instead:

```bash
CONTENT_SHEET_ID=<id> npm run sync:content
```

### Sheet schema

| Tab | Key columns |
| --- | --- |
| `departments` | `slug`, `name`, `overview` |
| `projects` | `slug`, `title`, `department_slug`, `year`, `status`, `description`, `cover_image_url`, `cover_image_alt` |
| `roles` | `slug`, `title`, `department_slug`, `project_slug`, `status`, `description`, `responsibilities`, `common_deliverables`, `qualities`, `application_deadline`, `application_link`, `core_application_link`, `head_application_link` |
| `site` | `key`, `value` — all headings and body copy on the site |

Notes:

- `slug` is the URL segment and must be unique and lowercase-hyphenated.
- A role belongs to **either** a project (a Core Team committee) **or** a
  department (a standing pool) — fill one of `project_slug` / `department_slug`.
- Multi-value cells (`responsibilities`, `common_deliverables`, `qualities`)
  are **one item per line inside a single cell** (Alt+Enter in Sheets).
- Only projects with `status: published` appear on the site.
- Roles with `status: open` show apply buttons; `closed` roles stay browsable
  so people can read up before applications open.

## Local development

```bash
npm install
npm run dev
```

Then http://localhost:3000.

```bash
npm run build          # static export to ./out
npm run sync:content   # refresh content/*.csv from the Sheet
npm run lint
```

### Why `--webpack`

`npm run build` passes `--webpack` deliberately. Turbopack, the Next 16
default, currently fails to load the `lightningcss` native binding through the
PostCSS worker Tailwind v4 uses:

```
Error evaluating Node.js code
Error: Cannot find module '../lightningcss.darwin-arm64.node'
```

Remove the flag once that's fixed upstream.

## Design

Palette, type, and motifs come from the Recweek 2026–2027 brand book.

| | |
| --- | --- |
| Primary | `#FFFCF7` cream · `#5E8F6B` green · `#D94F40` red |
| Accents | `#E4B64A` gold · `#9FD0EB` sky · `#A8C59A` sage · `#F3BF8D` peach · `#4F4036` ink |
| Display | Grandstander |
| Poster | Bevan (first word of a Grandstander lockup) |
| Body | Jost — stand-in for Glacial Indifference, which isn't web-licensed |
| Chinese | Noto Serif SC — stand-in for 字由点字云霆楷体 |

The logo files in `public/brand/` are extracted from the brand book and used
unmodified, per its usage rules. The village furniture (hills, fence, paper
grid, rooflines) is drawn in CSS from the palette in `globals.css` rather than
shipping the book's watercolour artwork.

Two deeper tints, `--green-ink` and `--red-ink`, exist because the brand green
and red only reach ~3.2:1 on cream — below AA for body text. Use them for small
text; the pure brand hues are for fills and large display type.

## Deployment

[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
builds and publishes to Pages. It needs **no secrets**. One optional repository
*variable*:

- `CONTENT_SHEET_ID` — the id in the Sheet URL
  (`docs.google.com/spreadsheets/d/<THIS>/edit`). Set it and every build pulls
  fresh content; leave it unset and the committed CSVs are used.
