import ProjectList from "@/components/project-list";
import type { Project } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";

export default async function OpenSourcePage() {
  await new Promise((res) => setTimeout(res, 2000));

  const endpointUrl: string = `${await getBaseUrl()}/api/projects?type=opensource`;

  const response = await fetch(endpointUrl);
  let projects: Project[] = [];

  if (response.ok) {
    projects = await response.json();
  }

  return (
    <div className="mx-auto w-full max-w-7xl grow px-6 md:p-6">
      <h1 className="mb-4 text-3xl font-bold">Open Source Projects</h1>
      <ProjectList projects={projects} />
    </div>
  );
}
