import { ProjectEditButton } from "./edit-button";
import { ProjectRemoveButton } from "./remove-button";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  actions?: boolean;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  link,
  actions = false,
}: ProjectCardProps) {
  return (
    <div className="row-span-2 grid grid-rows-subgrid gap-4">
      <article className="border-border bg-card text-card-foreground flex flex-col gap-4 rounded-lg border p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="grow">{description}</p>
        <div className="flex flex-row items-center justify-between gap-4">
          {link && (
            <p className="mt-auto">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Project
              </a>
            </p>
          )}
          {actions && (
            <div className="flex flex-row items-center">
              <ProjectEditButton id={id} />
              <ProjectRemoveButton id={id} />
            </div>
          )}
        </div>
      </article>
      <div className="px-6">
        <ul className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <li
              key={index}
              className="bg-secondary text-secondary-foreground rounded-3xl px-3 py-1 text-sm"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
