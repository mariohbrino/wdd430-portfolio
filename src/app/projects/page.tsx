import { Suspense } from "react";

import ProjectList from "@/components/project-list";
import { ProjectSearch } from "@/components/project-search";
import type { ProjectResponse } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";
import { projectSchema } from "@/validations/project.validate";

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

const ListProjects = async ({ searchParams }: PageProps) => {
  const validated = projectSchema.safeParse(await searchParams);

  const endpointWithParams = new URL(`${await getBaseUrl()}/api/projects`);

  if (validated.success) {
    const { page, query } = validated.data;

    if (page) {
      endpointWithParams.searchParams.set("page", page.toString());
    }

    if (query) {
      endpointWithParams.searchParams.set("query", query);
    }
  }

  const response = await fetch(endpointWithParams);
  let projects: ProjectResponse = { data: [], total: 0, totalPages: 0 };

  if (response.ok) {
    projects = await response.json();
  }

  return <ProjectList projects={projects.data} />;
};

export default async function ProjectPage({ searchParams }: PageProps) {
  return (
    <main className="mx-auto w-full max-w-7xl grow p-6">
      <h1 className="mb-4 text-3xl font-bold">Projects Overview</h1>
      <ProjectSearch />
      <Suspense fallback={<div>Loading projects...</div>}>
        <ListProjects searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
