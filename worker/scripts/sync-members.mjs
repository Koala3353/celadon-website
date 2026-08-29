#!/usr/bin/env node
/**
 * Pull the `members` tab of the content Google Sheet and turn it into a
 * Cloudflare KV bulk-put file — the Worker checks this KV namespace to
 * decide whether a signed-in email belongs to an actual Celadon member
 * (~700-800 people), not just anyone with an Ateneo email.
 *
 * This only writes the JSON file; it does not touch Cloudflare itself. This
 * script has no Cloudflare credentials and shouldn't need any — pushing the
 * result to KV is a separate, explicit step printed at the end.
 *
 * Usage:
 *   CONTENT_SHEET_ID=<id> npm run sync:members
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SHEET_ID = process.env.CONTENT_SHEET_ID ?? "";

// Set once the `members` tab exists in the Sheet — open the tab, copy the
// gid from the URL after `gid=`. Left as `null` so a forgotten setup fails
// loudly instead of silently fetching the wrong tab.
const MEMBERS_GID = 2042396063;

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_FILE = path.join(ROOT, "members-kv.json");

if (!SHEET_ID) {
  console.error(
    "No sheet configured.\n" +
      "  Set CONTENT_SHEET_ID (same id used by the main site's sync:content).\n" +
      "  The id is the long string in the Sheet URL:\n" +
      "    docs.google.com/spreadsheets/d/<THIS PART>/edit"
  );
  process.exit(1);
}

if (MEMBERS_GID === null) {
  console.error(
    "No `members` tab gid configured.\n" +
      "  Create a `members` tab in the Sheet with an `email` column (one\n" +
      "  member per row), open it, copy the gid from the URL after `gid=`,\n" +
      "  and set MEMBERS_GID in this script."
  );
  process.exit(1);
}

/** Minimal RFC 4180 CSV parser — quoted fields, embedded commas/newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

function csvUrl(gid) {
  const u = new URL(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/export`);
  u.searchParams.set("format", "csv");
  u.searchParams.set("gid", String(gid));
  return u.toString();
}

const res = await fetch(csvUrl(MEMBERS_GID), {
  redirect: "follow",
  headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
});
if (!res.ok) {
  console.error(`members: HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}
const body = await res.text();

if (/^\s*</.test(body)) {
  console.error(
    'members: got HTML, not CSV. Make the Sheet viewable by "Anyone with the link".'
  );
  process.exit(1);
}

const rows = parseCsv(body);
const header = (rows[0] ?? []).map((h) => h.trim().toLowerCase());
const emailCol = header.indexOf("email");
if (emailCol === -1) {
  console.error(`members: no "email" column found in header row (${header.join(", ")}).`);
  process.exit(1);
}

const seen = new Set();
const skipped = [];
for (const row of rows.slice(1)) {
  const raw = (row[emailCol] ?? "").trim();
  if (!raw) continue;
  const email = raw.toLowerCase();
  if (!email.includes("@") || email.includes(" ")) {
    skipped.push(raw);
    continue;
  }
  seen.add(email);
}

const bulk = [...seen].sort().map((email) => ({ key: email, value: "1" }));
await fs.writeFile(OUT_FILE, JSON.stringify(bulk, null, 2), "utf8");

console.log(`✓ ${OUT_FILE}  (${bulk.length} members)`);
if (skipped.length > 0) {
  console.log(`  skipped ${skipped.length} row(s) that didn't look like an email:`);
  for (const s of skipped) console.log(`    "${s}"`);
}
console.log(
  "\nNext step — push this into the KV namespace bound as MEMBERS in wrangler.jsonc:\n" +
    "  npx wrangler kv bulk put members-kv.json --binding MEMBERS --remote\n" +
    "(drop --remote to write to the local dev KV used by `wrangler dev` instead)"
);
