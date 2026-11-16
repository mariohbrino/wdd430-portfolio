import Link from "next/link";

import { ProjectRemoveButton } from "./remove-button";

interface ProjectEditButtonProps {
  id: number;
}

export function ProjectEditButton({ id }: ProjectEditButtonProps) {
  return (
    <Link
      aria-label="Edit project"
      href={`/projects/${id}/edit`}
      className="cursor-pointer rounded-l-2xl bg-gray-700 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700/80 disabled:cursor-not-allowed disabled:bg-gray-700/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-square-pen preview-icon"
      >
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
      </svg>
    </Link>
  );
}

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
        <h3 className="text-xl font-semibold">{title}</h3>
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
