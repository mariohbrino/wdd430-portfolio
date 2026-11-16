import { notFound } from "next/navigation";

import ProjectEditForm from "@/components/project/edit-form";
import { getBaseUrl } from "@/utils/base-url.util";

type EditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const endpointUrl: string = `${await getBaseUrl()}/api/projects/${id}`;
  const response = await fetch(endpointUrl);

  if (!response.ok) {
    notFound();
  }

  const project = await response.json();

  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col items-center p-6">
      <h1 className="mb-2 text-3xl font-bold">Edit Project</h1>
      <p className="mb-6 opacity-80">
        Fill out the form below to update the project in the portfolio.
      </p>
      <ProjectEditForm project={project} />
    </div>
  );
}
