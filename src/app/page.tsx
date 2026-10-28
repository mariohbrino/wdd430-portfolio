import ProjectList from "@/components/project-list";

const projects = [
  {
    title: "Python REST API",
    description: "Python REST API with FastAPI",
    technologies: ["Python", "FastAPI", "PostgreSQL"],
    link: "https://github.com/mariohbrino/python-fastapi",
  },
  {
    title: "Book Inventory",
    description: "A web application to manage book inventory",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Swagger UI"],
    link: "https://github.com/mariohbrino/book-inventory",
  },
  {
    title: "WDD330 Pokemon Trade Card Games",
    description: "A web-based implementation of the Pokemon Trade Card Game",
    technologies: ["JavaScript", "HTML", "CSS", "Rest API"],
    link: "https://github.com/mariohbrino/wdd330",
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
