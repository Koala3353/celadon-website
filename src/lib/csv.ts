/**
 * Minimal RFC 4180 CSV reader.
 *
 * Google Sheets' "publish to web" CSV export is well-formed: fields containing
 * commas, quotes, or newlines are double-quoted, and literal quotes are
 * doubled. That is the whole grammar, so a hand-rolled parser is cheaper than
 * a dependency and keeps the build offline.
 */
export function parseCsv(input: string): string[][] {
  // Strip a UTF-8 BOM, which Sheets emits, and normalise line endings.
  const text = input.replace(/^﻿/, "").replace(/\r\n?/g, "\n");

  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  // A trailing newline leaves nothing pending; anything else is a final row.
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

/** Parse a CSV with a header row into objects keyed by column name. */
export function parseCsvRecords(input: string): Record<string, string>[] {
  const rows = parseCsv(input);
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => h.trim());
  return rows
    .slice(1)
    // Sheets pads exports with blank rows; drop anything with no content.
    .filter((cells) => cells.some((c) => c.trim() !== ""))
    .map((cells) =>
      Object.fromEntries(header.map((key, i) => [key, (cells[i] ?? "").trim()]))
    );
}
