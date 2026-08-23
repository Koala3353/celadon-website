/**
 * Pure formatting helpers with no Node dependencies, safe to import from
 * client components. `content.ts` reads from the filesystem at module scope
 * (server-only) — anything a "use client" file needs must live here instead,
 * or the fs/path imports get dragged into the browser bundle and webpack
 * chokes on them.
 */

/** "2027-02" -> "February 2027". */
export function formatExecutionDate(yearMonth: string): string {
  const [year, month] = yearMonth.split("-").map(Number);
  if (!year || !month) return yearMonth;
  return new Date(year, month - 1, 1).toLocaleDateString("en", {
    month: "long",
    year: "numeric",
  });
}
