/**
 * Prefix a /public asset with the deployment's basePath.
 *
 * next/image normally applies basePath itself, but only through its loader —
 * and `images.unoptimized` (required on a static host) bypasses the loader, so
 * the src is emitted verbatim. On a project page that resolves to the domain
 * root and 404s. Everything under /public must go through this.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}
