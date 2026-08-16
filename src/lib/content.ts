import fs from "node:fs";
import path from "node:path";
import { asset } from "@/lib/asset";
import { parseCsvRecords } from "@/lib/csv";
import type {
  Department,
  Project,
  ProjectWithDepartment,
  Role,
  RoleWithParent,
} from "@/lib/types";

/**
 * Content lives in a Google Sheet. `npm run sync:content` pulls each tab down
 * to content/*.csv; the build reads only those files. That keeps the build
 * offline, reproducible, and free of any credential — which is what makes a
 * static GitHub Pages deploy possible at all.
 */
const CONTENT_DIR = path.join(process.cwd(), "content");

function readTable(name: string): Record<string, string>[] {
  const file = path.join(CONTENT_DIR, `${name}.csv`);
  if (!fs.existsSync(file)) {
    throw new Error(
      `Missing content/${name}.csv. Run \`npm run sync:content\` to pull it ` +
        `from the Google Sheet.`
    );
  }
  return parseCsvRecords(fs.readFileSync(file, "utf8"));
}

/** Multi-value cells are one item per line inside a single cell. */
function list(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function orNull(value: string | undefined): string | null {
  const v = (value ?? "").trim();
  return v === "" ? null : v;
}

/**
 * Cover images are pasted straight from Google Drive's "Share" dialog, which
 * gives a viewer-page URL (`/file/d/<id>/view`) — that serves an HTML page,
 * not image bytes, so it's a broken `<img>` src as-is. Rewriting it to
 * Drive's CDN host here means anyone can just paste the normal share link
 * into the Sheet and it works, with no special "direct link" format to
 * remember.
 *
 * A cell can also hold a path into this repo's own /public/covers (for
 * photos that needed cropping before they could be used). Those are written
 * as a site-relative path, e.g. "/covers/mid-autumn-festival.jpg", not a full
 * domain — that way the same Sheet value resolves correctly both on
 * localhost and on whatever domain the site is actually deployed to.
 */
function resolveImageUrl(value: string | undefined): string | null {
  const url = orNull(value);
  if (!url) return null;

  if (url.startsWith("/")) return asset(url);

  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  const id = fileMatch?.[1] ?? openMatch?.[1];
  if (!id) return url;

  return `https://lh3.googleusercontent.com/d/${id}=w1600`;
}

// Read once per process. `next build` is a single pass, so this is the whole
// cache we need.
let cache: {
  departments: Department[];
  projects: Project[];
  roles: Role[];
  site: Record<string, string>;
} | null = null;

function load() {
  if (cache) return cache;

  const departments: Department[] = readTable("departments").map((r) => ({
    slug: r.slug,
    name: r.name,
    overview: r.overview ?? "",
  }));

  const projects: Project[] = readTable("projects").map((r) => ({
    slug: r.slug,
    title: r.title,
    departmentSlug: orNull(r.department_slug),
    year: Number(r.year) || new Date().getFullYear(),
    status: (r.status || "published") as Project["status"],
    description: r.description ?? "",
    coverImageUrl: resolveImageUrl(r.cover_image_url),
    coverImageAlt: r.cover_image_alt ?? "",
  }));

  const roles: Role[] = readTable("roles").map((r) => ({
    slug: r.slug,
    title: r.title,
    departmentSlug: orNull(r.department_slug),
    projectSlug: orNull(r.project_slug),
    status: (r.status || "closed") as Role["status"],
    description: r.description ?? "",
    responsibilities: list(r.responsibilities),
    commonDeliverables: list(r.common_deliverables),
    qualities: list(r.qualities),
    applicationDeadline: orNull(r.application_deadline),
    applicationLink: orNull(r.application_link),
    coreApplicationLink: orNull(r.core_application_link),
    headApplicationLink: orNull(r.head_application_link),
  }));

  const site = Object.fromEntries(
    readTable("site").map((r) => [r.key, r.value ?? ""])
  );

  assertCopyKeys(site);

  cache = { departments, projects, roles, site };
  return cache;
}

/**
 * Keys the templates call directly. If the `site` tab drifts out of sync with
 * the code — say a sync pulls down an older revision of the Sheet — the build
 * fails here rather than shipping pages with "hero_line_1" printed as copy.
 */
const REQUIRED_COPY_KEYS = [
  "org_name",
  "org_tagline",
  "org_address",
  "hero_line_1",
  "about_heading",
  "about_body",
  "departments_heading",
  "departments_body",
  "projects_heading",
  "projects_body",
  "recruitment_heading",
  "cta_heading",
  "cta_body",
  "org_instagram",
  "org_facebook",
] as const;

function assertCopyKeys(site: Record<string, string>) {
  const missing = REQUIRED_COPY_KEYS.filter((k) => !site[k]?.trim());
  if (missing.length > 0) {
    throw new Error(
      `content/site.csv is missing required keys: ${missing.join(", ")}.\n` +
        `The Google Sheet's "site" tab is probably out of date — update it, ` +
        `or run the build without CONTENT_SHEET_ID to use the committed CSVs.`
    );
  }
}

/** Editable copy from the `site` tab. */
export function copy(key: string): string {
  return load().site[key] ?? key;
}

/**
 * Like `copy`, but for keys that are optional — content the Sheet may or may
 * not carry (e.g. a stat pair, a section that hasn't been written yet).
 * Returns `null` instead of falling back to the key name, so callers can hide
 * a whole section rather than render "vision_heading" as if it were copy.
 */
function copyOrNull(key: string): string | null {
  const v = load().site[key];
  return v && v.trim() !== "" ? v : null;
}

export interface ImpactStat {
  value: string;
  label: string;
}

/**
 * Reads stat_1_value/stat_1_label through stat_6_value/stat_6_label. Values
 * are free text (e.g. "₱100,000+"), not necessarily plain integers, so they're
 * rendered as-is rather than run through the digit-counting animation used
 * elsewhere — a mixed currency/plus-sign string can't count up cleanly.
 */
export function getImpactStats(): ImpactStat[] {
  const stats: ImpactStat[] = [];
  for (let i = 1; i <= 6; i++) {
    const value = copyOrNull(`stat_${i}_value`);
    const label = copyOrNull(`stat_${i}_label`);
    if (value && label) stats.push({ value, label });
  }
  return stats;
}

export interface IdentityStatement {
  key: string;
  heading: string;
  body: string;
}

const IDENTITY_KEYS = ["vision", "mission", "core_competency", "core_advocacy"] as const;

/** Vision / Mission / Core Competency / Core Advocacy, only the ones present. */
export function getIdentityStatements(): IdentityStatement[] {
  const out: IdentityStatement[] = [];
  for (const key of IDENTITY_KEYS) {
    const heading = copyOrNull(`${key}_heading`);
    const body = copyOrNull(`${key}_body`);
    if (heading && body) out.push({ key, heading, body });
  }
  return out;
}

export interface Purposes {
  heading: string | null;
  items: string[];
}

export function getPurposes(): Purposes {
  const heading = copyOrNull("purposes_heading");
  const body = copyOrNull("purposes_body");
  return { heading, items: body ? list(body) : [] };
}

export interface RecruitmentTimeline {
  heading: string;
  body: string;
  deputyDate: string | null;
  coreDate: string | null;
}

/** The "applications aren't open yet, here's when" block. Null if unwritten. */
export function getRecruitmentTimeline(): RecruitmentTimeline | null {
  const heading = copyOrNull("recruitment_stay_tuned_heading");
  const body = copyOrNull("recruitment_stay_tuned_body");
  if (!heading || !body) return null;
  return {
    heading,
    body,
    deputyDate: copyOrNull("recruitment_deputy_date"),
    coreDate: copyOrNull("recruitment_core_date"),
  };
}

export function getEstYear(): string | null {
  return copyOrNull("est_year");
}

/** Same as `copy`, but for a multi-line `site` cell — one item per line. */
export function copyList(key: string): string[] {
  return list(load().site[key]);
}

/**
 * Splits a stat value like "₱100,000+" into its animatable numeric core
 * and the surrounding text, so `<Counter>` can count up the number while
 * "₱" and "+" render as plain static text around it.
 */
export function parseStat(raw: string): { prefix: string; value: number; suffix: string } {
  const match = raw.match(/^(\D*)([\d,]+)(\D*)$/);
  if (!match) return { prefix: "", value: 0, suffix: raw };
  const [, prefix, digits, suffix] = match;
  return { prefix, value: Number(digits.replace(/,/g, "")), suffix };
}

export function getDepartments(): Department[] {
  return [...load().departments].sort((a, b) => a.name.localeCompare(b.name));
}

export function getDepartmentBySlug(slug: string): Department | null {
  return load().departments.find((d) => d.slug === slug) ?? null;
}

function withDepartment(project: Project): ProjectWithDepartment {
  return {
    ...project,
    department: project.departmentSlug
      ? getDepartmentBySlug(project.departmentSlug)
      : null,
  };
}

export function getPublishedProjects(): ProjectWithDepartment[] {
  return load()
    .projects.filter((p) => p.status === "published")
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .map(withDepartment);
}

export function getFeaturedProjects(limit = 3): ProjectWithDepartment[] {
  return getPublishedProjects().slice(0, limit);
}

function withParents(role: Role): RoleWithParent {
  return {
    ...role,
    department: role.departmentSlug
      ? getDepartmentBySlug(role.departmentSlug)
      : null,
    project: role.projectSlug
      ? (load().projects.find((p) => p.slug === role.projectSlug) ?? null)
      : null,
  };
}

export function getRoles(filters?: { status?: Role["status"] }): RoleWithParent[] {
  return load()
    .roles.filter((r) => !filters?.status || r.status === filters.status)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map(withParents);
}

export function getRoleBySlug(slug: string): RoleWithParent | null {
  const role = load().roles.find((r) => r.slug === slug);
  return role ? withParents(role) : null;
}

export function getAllRoleSlugs(): string[] {
  return load().roles.map((r) => r.slug);
}

export function getRolesForDepartment(departmentSlug: string): RoleWithParent[] {
  return getRoles().filter((r) => r.departmentSlug === departmentSlug);
}

export interface DepartmentSpotlight extends Department {
  openRoleCount: number;
  totalRoleCount: number;
}

export function getDepartmentSpotlights(): DepartmentSpotlight[] {
  return getDepartments().map((d) => {
    const roles = getRolesForDepartment(d.slug);
    return {
      ...d,
      openRoleCount: roles.filter((r) => r.status === "open").length,
      totalRoleCount: roles.length,
    };
  });
}

export interface OrgStats {
  departmentCount: number;
  projectCount: number;
  roleCount: number;
  openRoleCount: number;
}

export function getOrgStats(): OrgStats {
  const { departments, projects, roles } = load();
  return {
    departmentCount: departments.length,
    projectCount: projects.filter((p) => p.status === "published").length,
    roleCount: roles.length,
    openRoleCount: roles.filter((r) => r.status === "open").length,
  };
}
