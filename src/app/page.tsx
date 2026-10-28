import ProjectList from "@/components/project-list";

const projects = [
  {
    title: "Project 1",
    description: "Description for project 1",
    technologies: ["React", "TypeScript"],
    link: "https://example.com/project1",
  },
  {
    title: "Project 2",
    description: "Description for project 2",
    technologies: ["Next.js", "Tailwind CSS"],
    link: "https://example.com/project2",
  },
  {
    title: "Project 3",
    description: "Description for project 3",
    technologies: ["JavaScript", "CSS"],
    link: "https://example.com/project3",
  },
];

export default function Home() {
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
      <ProjectList projects={projects} />
    </main>
  );
}
