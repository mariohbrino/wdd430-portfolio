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
    <div className="row-span-2 grid grid-rows-subgrid gap-4">
      <article className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{description}</p>
        {link && (
          <p className="mt-auto">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-800 hover:underline"
            >
              View Project
            </a>
          </p>
        )}
      </article>
      <div className="px-6">
        <ul className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-3xl bg-indigo-100 px-3 py-1 text-sm text-indigo-800"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
