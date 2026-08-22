#!/usr/bin/env node
/**
 * Pull each tab of the content Google Sheet down to content/<tab>.csv.
 *
 * The Sheet must be shared as "Anyone with the link can view" — the export
 * endpoint used here needs no API key and no OAuth, which is what lets CI
 * refresh content without holding any credential.
 *
 * Usage:
 *   npm run sync:content                 # uses CONTENT_SHEET_ID below
 *   CONTENT_SHEET_ID=<id> npm run sync:content
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Set once the Sheet exists; env var always wins so CI can override.
const SHEET_ID = process.env.CONTENT_SHEET_ID ?? "";

/**
 * Tab name -> gid (the numeric id in the Sheet URL after `gid=`).
 *
 * This used to fetch by tab *name* through the gviz endpoint
 * (`/gviz/tq?tqx=out:csv&sheet=<name>`), which is more convenient to set up
 * but has a real server-side cache: on 2026-08-16 a Sheet edit that fixed a
 * corrupted `site` header row didn't show up over gviz for several minutes
 * even with cache-busting query params and headers, while
 * `/export?format=csv&gid=<gid>` returned the fresh content immediately,
 * every time. Fetching by gid trades a one-time setup cost (recording the
 * gid below) for not silently serving stale content after an edit.
 *
 * A gid is assigned once when a tab is created and does not change when the
 * tab is renamed or reordered — only deleting and recreating the tab changes
 * it. If a tab is ever deleted and recreated, update its gid here (visible in
 * the Sheet URL after `gid=` once that tab is open).
 */
const TABS = {
  departments: 0,
  projects: 61485455,
  roles: 1787450093,
  site: 455462947,
  // Set these once the tabs exist in the Sheet — open the tab, copy the gid
  // from the URL after `gid=`. Left as `null` (not 0) so a forgotten update
  // fails loudly instead of silently re-fetching the departments tab.
  committees: null,
  glossary: null,
};

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "content");

if (!SHEET_ID) {
  console.error(
    "No sheet configured.\n" +
      "  Set CONTENT_SHEET_ID, or edit SHEET_ID in scripts/sync-content.mjs.\n" +
      "  The id is the long string in the Sheet URL:\n" +
      "    docs.google.com/spreadsheets/d/<THIS PART>/edit"
  );
  process.exit(1);
}

function csvUrl(gid) {
  const u = new URL(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export`);
  u.searchParams.set("format", "csv");
  u.searchParams.set("gid", String(gid));
  return u.toString();
}

async function fetchTab(tab, gid) {
  const res = await fetch(csvUrl(gid), {
    redirect: "follow",
    // Belt-and-suspenders: this endpoint hasn't shown the gviz staleness
    // above, but ask intermediaries not to cache it anyway.
    headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
  });
  if (!res.ok) {
    throw new Error(`${tab}: HTTP ${res.status} ${res.statusText}`);
  }
  const body = await res.text();

  // A sheet that isn't link-shared returns a sign-in HTML page with status 200.
  if (/^\s*</.test(body)) {
    throw new Error(
      `${tab}: got HTML, not CSV. Make the Sheet viewable by "Anyone with ` +
        `the link".`
    );
  }
  if (body.trim() === "") {
    throw new Error(`${tab}: empty response — has gid ${gid} been deleted?`);
  }
  return body;
}

/** Count data rows, ignoring newlines that sit inside quoted cells. */
function countRows(csv) {
  let rows = 0;
  let quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (c === '"') {
      if (quoted && csv[i + 1] === '"') i++;
      else quoted = !quoted;
    } else if (c === "\n" && !quoted) {
      rows++;
    }
  }
  return Math.max(0, rows - 1); // drop the header
}

await fs.mkdir(OUT_DIR, { recursive: true });

let failed = false;
for (const [tab, gid] of Object.entries(TABS)) {
  try {
    const csv = await fetchTab(tab, gid);
    const file = path.join(OUT_DIR, `${tab}.csv`);
    await fs.writeFile(file, csv.endsWith("\n") ? csv : `${csv}\n`, "utf8");
    const rows = countRows(csv.endsWith("\n") ? csv : `${csv}\n`);
    console.log(`✓ content/${tab}.csv  (${rows} rows)`);
  } catch (err) {
    failed = true;
    console.error(`✗ ${err.message}`);
  }
}

if (failed) {
  console.error(
    "\nSome tabs failed. Existing CSVs were left untouched so the build " +
      "still works."
  );
  process.exit(1);
}
