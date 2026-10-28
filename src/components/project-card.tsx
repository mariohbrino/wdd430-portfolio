interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  link,
}: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-gray-200 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mb-4">{description}</p>
      <ul className="mb-4 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <li
            key={tech}
            className="rounded bg-gray-100 px-2 py-1 text-sm"
          >
            {tech}
          </li>
        ))}
      </ul>
      {link && (
        <p className="mt-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline"
          >
            View Project
          </a>
        </p>
      )}
    </article>
  );
}
