export type MetricType =
  | "impressions"
  | "engagement_rate"
  | "participant_count"
  | "participant_yoy_change"
  | "satisfaction_rating"
  | "demographic_breakdown"
  | "beneficiaries_reached";

export interface ImageWithAlt {
  url: string;
  alt: string;
}

export interface Department {
  id: string;
  slug: string;
  name: string;
  overview: string | null;
  banner_image_url: string | null;
  banner_image_alt: string | null;
  created_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  department_id: string | null;
  year: number;
  description: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  gallery: ImageWithAlt[];
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
}

export interface ProjectMetric {
  id: string;
  project_id: string;
  metric_type: MetricType;
  value: number | Record<string, number>;
  updated_at: string;
}

export interface Role {
  id: string;
  slug: string;
  title: string;
  // Exactly one of department_id / project_id is set: department roles are
  // standing recruitment (e.g. COMMPUB's pools), project roles are a
  // project's core team committees (e.g. TALAB x FAW's Programs committee).
  department_id: string | null;
  project_id: string | null;
  status: "open" | "closed";
  description_rich_text: string | null;
  responsibilities: string[];
  common_deliverables: string[];
  qualities: string[];
  visual_examples: ImageWithAlt[];
  application_deadline: string | null;
  application_link: string | null;
  core_application_link: string | null;
  head_application_link: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  project_id: string | null;
  department_id: string | null;
  role_id: string | null;
  quote: string;
  author_name: string;
  author_role: string | null;
  featured: boolean;
  created_at: string;
}

export interface Credit {
  id: string;
  project_id: string;
  member_name: string;
  role: string | null;
  photo_url: string | null;
  photo_alt: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      departments: { Row: Department; Insert: Partial<Department>; Update: Partial<Department> };
      projects: { Row: Project; Insert: Partial<Project>; Update: Partial<Project> };
      project_metrics: { Row: ProjectMetric; Insert: Partial<ProjectMetric>; Update: Partial<ProjectMetric> };
      roles: { Row: Role; Insert: Partial<Role>; Update: Partial<Role> };
      testimonials: { Row: Testimonial; Insert: Partial<Testimonial>; Update: Partial<Testimonial> };
      credits: { Row: Credit; Insert: Partial<Credit>; Update: Partial<Credit> };
    };
  };
}
