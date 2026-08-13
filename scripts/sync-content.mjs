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

const TABS = ["departments", "projects", "roles", "site"];

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

/** gviz honours sheet *names*, so tabs can be reordered without breaking this. */
function csvUrl(tab) {
  const u = new URL(
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq`
  );
  u.searchParams.set("tqx", "out:csv");
  u.searchParams.set("sheet", tab);
  return u.toString();
}

async function fetchTab(tab) {
  const res = await fetch(csvUrl(tab), { redirect: "follow" });
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
    throw new Error(`${tab}: empty response — does a tab named "${tab}" exist?`);
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
for (const tab of TABS) {
  try {
    const csv = await fetchTab(tab);
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
