# Fonts

Every web font on the site, stored here instead of downloaded from Google
Fonts during the build.

`next/font/google` fetches each family during `next build`, and in a
production build a single failed download fails the whole build (the dev
server only falls back). With a dozen families across the project pages, one
flaky request was enough to break a GitHub Pages deploy. Loading the files
from here with `next/font/local` makes the build fully offline, the same as
the content CSVs.

Each file is the **latin** subset Google Fonts serves for that family. Most
are variable fonts, so a single file covers every weight a page uses.

## Where they're used

| Folder | Used by |
| --- | --- |
| `montserrat` | Whole site (`src/app/layout.tsx`) |
| `fraunces` | A-yi's Corner headings (`src/app/internal/layout.tsx`) |
| `nunito`, `dm-sans` | Wave 1 Chinese New Year |
| `kumbh-sans` | Wave 1 Jade Business Summit, Wave 2 Celadon Merch |
| `playfair-display`, `lato`, `dm-sans` | Rose Sale (both waves) |
| `lora`, `eb-garamond`, `dancing-script` | Wave 1 Spring Film Festival |
| `eb-garamond` | Wave 2 Celaball |
| `libre-baskerville` | Wave 2 Celadon Merch |
| `merriweather` | Wave 2 Mandopop |

## Adding a font for a new page

1. Download the family's latin `.woff2` file(s) from Google Fonts into a new
   folder here (for example via the CSS at
   `https://fonts.googleapis.com/css2?family=Family+Name:wght@400;700`,
   requested with a modern browser user agent, keeping the `/* latin */`
   blocks).
2. In the page, `import localFont from "next/font/local"` and declare it at
   the top of that page file, pointing `path` at the file here, relative to
   the page. Declare it in the page itself, not a shared module: Next.js only
   preloads fonts declared in a route's own files.
