/**
 * Ayi is Celadon's panda mascot; each department has its own costumed variant.
 * Files live in /public/ayi and are named by department slug.
 */
const DEPARTMENT_AYI = new Set([
  "commpub",
  "cul",
  "exrel",
  "fin",
  "hr",
  "osr",
]);

export function ayiFor(departmentSlug: string): string | null {
  return DEPARTMENT_AYI.has(departmentSlug) ? `/ayi/${departmentSlug}.png` : null;
}
