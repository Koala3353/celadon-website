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

export type ProjectWithDepartment = Project & { department: Department | null };

export type RoleWithParent = Role & {
  department: Department | null;
  project: Project | null;
};
