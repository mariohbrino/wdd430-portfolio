import ProjectList from "@/components/project-list";
import type { ProjectResponse } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";

export default async function SchoolPage() {
  const endpointUrl: string = `${await getBaseUrl()}/api/projects?type=school`;

  const response = await fetch(endpointUrl);
  let projects: ProjectResponse = { data: [], total: 0, totalPages: 0 };

  if (response.ok) {
    projects = (await response.json()) as ProjectResponse;
  }

  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 md:p-6">
      <h1 className="mb-4 text-3xl font-bold">School Projects</h1>
      <ProjectList projects={projects.data} />
    </div>
  );
}
