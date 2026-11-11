import { Suspense } from "react";

import ProjectList from "@/components/project-list";
import type { ProjectResponse } from "@/types/project.type";
import { getBaseUrl } from "@/utils/base-url.util";

const ListProjects = async () => {
  const endpointUrl: string = `${await getBaseUrl()}/api/projects`;

  const response = await fetch(endpointUrl);
  let projects: ProjectResponse = { data: [], total: 0, totalPages: 0 };

  if (response.ok) {
    projects = await response.json();
  }

  return <ProjectList projects={projects.data} />;
};

export default async function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl grow p-6">
      <h1 className="mb-4 text-3xl font-bold">My Portfolio</h1>
      <section>
        <h2 className="mb-2 text-2xl font-semibold">My Projects</h2>
        <p className="mb-4">
          I&apos;m a software engineer specializing in building web applications
          using modern technologies.
        </p>
      </section>
      <Suspense fallback={<p>Loading projects...</p>}>
        <ListProjects />
      </Suspense>
    </main>
  );
}
