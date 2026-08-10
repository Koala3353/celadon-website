import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { MetricsEditor } from "@/components/admin/metrics-editor";
import { getAllProjectsForAdmin } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminMetricsPage() {
  const projects = await getAllProjectsForAdmin().catch(() => []);

  return (
    <Container className="flex flex-col gap-8 py-16">
      <SectionHeading
        eyebrow="Admin"
        title="Project Metrics"
        description="Manually entered figures shown on each project's public Metric Dashboard. Expand a project to edit its numbers."
      />
      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects found.</p>
      ) : (
        <MetricsEditor projects={projects} />
      )}
    </Container>
  );
}
