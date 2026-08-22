export interface Department {
  slug: string;
  name: string;
  overview: string;
}

export interface Project {
  slug: string;
  title: string;
  departmentSlug: string | null;
  year: number;
  status: "draft" | "published" | "archived";
  description: string;
  coverImageUrl: string | null;
  coverImageAlt: string;
}

export interface Role {
  slug: string;
  title: string;
  departmentSlug: string | null;
  projectSlug: string | null;
  status: "open" | "closed";
  description: string;
  responsibilities: string[];
  commonDeliverables: string[];
  qualities: string[];
  applicationDeadline: string | null;
  applicationLink: string | null;
  coreApplicationLink: string | null;
  headApplicationLink: string | null;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface CoreTeamCommittee {
  abbr: string;
  name: string;
  description: string;
  responsibilities: string[];
  deliverables: string[];
  qualities: string[];
  /** Overrides the default "+N more" cap on each list — set high enough to
   * show every item when a list is only barely over the default cap. */
  listCap?: number;
}

export type ProjectWithDepartment = Project & { department: Department | null };

export type RoleWithParent = Role & {
  department: Department | null;
  project: Project | null;
};
