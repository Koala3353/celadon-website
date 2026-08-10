import { createClient } from "@/lib/supabase/client";
import type {
  Credit,
  Department,
  Project,
  ProjectMetric,
  Role,
  Testimonial,
} from "@/lib/supabase/types";

export type ProjectWithDepartment = Project & {
  department: Pick<Department, "id" | "slug" | "name"> | null;
};

export type ProjectDetail = ProjectWithDepartment & {
  metrics: ProjectMetric[];
  testimonials: Testimonial[];
  credits: Credit[];
};

export type RoleWithParent = Role & {
  department: Pick<Department, "id" | "slug" | "name"> | null;
  project: Pick<Project, "id" | "slug" | "title"> | null;
};

export async function getFeaturedProjects(limit = 3): Promise<ProjectWithDepartment[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*, department:departments(id, slug, name)")
    .eq("status", "published")
    .order("year", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as unknown as ProjectWithDepartment[];
}

export async function getAllProjects(filters?: {
  year?: number;
  departmentSlug?: string;
}): Promise<ProjectWithDepartment[]> {
  const supabase = createClient();
  let query = supabase
    .from("projects")
    .select("*, department:departments(id, slug, name)")
    .eq("status", "published")
    .order("year", { ascending: false });

  if (filters?.year) {
    query = query.eq("year", filters.year);
  }

  const { data, error } = await query;
  if (error) throw error;

  let projects = (data ?? []) as unknown as ProjectWithDepartment[];
  if (filters?.departmentSlug) {
    projects = projects.filter((p) => p.department?.slug === filters.departmentSlug);
  }
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const supabase = createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*, department:departments(id, slug, name)")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!project) return null;

  const [{ data: metrics }, { data: testimonials }, { data: credits }] = await Promise.all([
    supabase.from("project_metrics").select("*").eq("project_id", project.id),
    supabase.from("testimonials").select("*").eq("project_id", project.id),
    supabase.from("credits").select("*").eq("project_id", project.id),
  ]);

  return {
    ...(project as unknown as ProjectWithDepartment),
    metrics: (metrics ?? []) as ProjectMetric[],
    testimonials: (testimonials ?? []) as Testimonial[],
    credits: (credits ?? []) as Credit[],
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("projects").select("slug").eq("status", "published");
  if (error) throw error;
  return (data ?? []).map((p) => p.slug);
}

export async function getDepartments(): Promise<Department[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("departments").select("*").order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getDepartmentBySlug(slug: string): Promise<Department | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ?? null;
}

export async function getRoles(filters?: { status?: "open" | "closed" }): Promise<RoleWithParent[]> {
  const supabase = createClient();
  let query = supabase
    .from("roles")
    .select("*, department:departments(id, slug, name), project:projects(id, slug, title)")
    .order("application_deadline", { ascending: true, nullsFirst: false });

  if (filters?.status) {
    query = query.eq("status", filters.status);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as unknown as RoleWithParent[];
}

export async function getAllRoleSlugs(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase.from("roles").select("slug");
  if (error) throw error;
  return (data ?? []).map((r) => r.slug);
}

export async function getRoleBySlug(slug: string): Promise<RoleWithParent | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("roles")
    .select("*, department:departments(id, slug, name), project:projects(id, slug, title)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as unknown as RoleWithParent) ?? null;
}

export async function getRolesForProject(projectId: string): Promise<RoleWithParent[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("roles")
    .select("*, department:departments(id, slug, name), project:projects(id, slug, title)")
    .eq("project_id", projectId)
    .order("title");
  if (error) throw error;
  return (data ?? []) as unknown as RoleWithParent[];
}

export async function getAllProjectsForAdmin(): Promise<
  (ProjectWithDepartment & { metrics: ProjectMetric[] })[]
> {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*, department:departments(id, slug, name)")
    .order("year", { ascending: false });
  if (error) throw error;

  const { data: metrics, error: metricsError } = await supabase
    .from("project_metrics")
    .select("*");
  if (metricsError) throw metricsError;

  return (projects ?? []).map((project) => ({
    ...(project as unknown as ProjectWithDepartment),
    metrics: (metrics ?? []).filter((m) => m.project_id === project.id) as ProjectMetric[],
  }));
}

export interface DepartmentSpotlight extends Department {
  projects: ProjectWithDepartment[];
  openRoleCount: number;
}

export async function getDepartmentSpotlights(): Promise<DepartmentSpotlight[]> {
  const [departments, projects, roles] = await Promise.all([
    getDepartments(),
    getAllProjects(),
    getRoles({ status: "open" }),
  ]);

  return departments.map((department) => ({
    ...department,
    projects: projects.filter((p) => p.department?.id === department.id),
    openRoleCount: roles.filter((r) => r.department?.id === department.id).length,
  }));
}

export interface OrgStats {
  totalImpressions: number;
  totalParticipants: number;
  totalBeneficiaries: number;
  averageSatisfaction: number | null;
  projectCount: number;
  openRoleCount: number;
}

export async function getOrgStats(): Promise<OrgStats> {
  const supabase = createClient();
  const [{ data: projects }, { data: metrics }, { count: openRoleCount }] = await Promise.all([
    supabase.from("projects").select("id").eq("status", "published"),
    supabase.from("project_metrics").select("metric_type, value"),
    supabase.from("roles").select("id", { count: "exact", head: true }).eq("status", "open"),
  ]);

  let totalImpressions = 0;
  let totalParticipants = 0;
  let totalBeneficiaries = 0;
  let satisfactionSum = 0;
  let satisfactionCount = 0;

  for (const metric of metrics ?? []) {
    const value = metric.value as number;
    switch (metric.metric_type) {
      case "impressions":
        totalImpressions += value;
        break;
      case "participant_count":
        totalParticipants += value;
        break;
      case "beneficiaries_reached":
        totalBeneficiaries += value;
        break;
      case "satisfaction_rating":
        satisfactionSum += value;
        satisfactionCount += 1;
        break;
    }
  }

  return {
    totalImpressions,
    totalParticipants,
    totalBeneficiaries,
    averageSatisfaction: satisfactionCount > 0 ? satisfactionSum / satisfactionCount : null,
    projectCount: projects?.length ?? 0,
    openRoleCount: openRoleCount ?? 0,
  };
}
