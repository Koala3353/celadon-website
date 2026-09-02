import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DepartmentPage } from "@/components/internal/department-page";
import { DEPARTMENTS, getDepartment } from "@/lib/deputy-departments";

export function generateStaticParams() {
  return DEPARTMENTS.map((dept) => ({ slug: dept.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartment(slug);
  return {
    title: dept ? `${dept.name} Deputy Pool Application` : "Deputy Pool Application",
    robots: { index: false, follow: false },
  };
}

export default async function DeptApplicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = getDepartment(slug);
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
