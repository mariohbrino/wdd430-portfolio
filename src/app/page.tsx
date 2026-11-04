import ProjectList from "@/components/project-list";
import { projects } from "@/data/projects.data";

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
