import Pagination from "@/components/pagination";
import ProjectList from "@/components/project-list";
import type { ProjectResponse } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";
import { PROJECT_LIMITS } from "@/validations/project.validate";

export default async function SchoolPage() {
  const endpointUrl: string = `${await getBaseUrl()}/api/projects?type=school`;

  const response = await fetch(endpointUrl);
  let projects: ProjectResponse = {
    data: [],
    total: 0,
    totalPages: 0,
    previousPage: null,
    nextPage: null,
  };

  if (response.ok) {
    projects = (await response.json()) as ProjectResponse;
  }

  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 md:p-6">
      <h1 className="mb-4 text-3xl font-bold">School Projects</h1>
      <div className="flex w-full flex-col gap-4">
        <ProjectList projects={projects.data} />
        <Pagination
          perPage={PROJECT_LIMITS}
          previousPage={projects.previousPage}
          nextPage={projects.nextPage}
          totalItems={projects.data.length}
          totalRecords={projects.total}
        />
      </div>
    </div>
  );
}
