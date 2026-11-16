import ProjectCard from "@/components/project-card";

import type { Project } from "@/types/project.type";

interface ProjectListProps {
  projects: Project[];
  actions?: boolean;
}

export default function ProjectList({
  projects,
  actions = false,
}: ProjectListProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          {...project}
          actions={actions}
        />
      ))}
    </section>
  );
}
