import NavLink from "@/components/nav-link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 flex-col bg-gray-50 text-gray-800 selection:bg-indigo-600 selection:text-gray-200">
      <nav className="mx-6 flex flex-row gap-3 border-b pt-6 pb-3">
        <NavLink
          href="/projects"
          activeStyle="font-bold"
        >
          Overview
        </NavLink>
        <NavLink
          href="/projects/opensource"
          activeStyle="font-bold"
        >
          Open Source
        </NavLink>
        <NavLink
          href="/projects/school"
          activeStyle="font-bold"
        >
          School
        </NavLink>
        <NavLink
          href="/projects/settings"
          activeStyle="font-bold"
        >
          Settings
        </NavLink>
      </nav>
      {children}
    </section>
  );
}
