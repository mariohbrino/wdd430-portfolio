import { Suspense } from "react";

import ProjectList from "@/components/project-list";
import type { Project } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";

const ListProjects = async () => {
  const endpointUrl: string = `${await getBaseUrl()}/api/projects`;

  const response = await fetch(endpointUrl);
  let projects: Project[] = [];

  if (response.ok) {
    projects = await response.json();
  }

  return <ProjectList projects={projects} />;
};

export default async function ProjectPage() {
  return (
    <main className="mx-auto w-full max-w-7xl grow p-6">
      <h1 className="mb-4 text-3xl font-bold">Projects Overview</h1>
      <Suspense fallback={<div>Loading projects...</div>}>
        <ListProjects />
      </Suspense>
    </main>
  );
}
