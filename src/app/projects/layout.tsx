import NavLink from "@/components/nav-link";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-1 flex-col">
      <div className="mx-auto my-3 flex w-full max-w-7xl flex-1 flex-col md:my-28 md:flex-row">
        <nav className="md:border-border w-full shrink-0 p-6 md:w-56 md:border-r">
          <ul className="flex gap-3 md:flex-col">
            <li>
              <NavLink
                href="/projects"
                activeStyle="font-bold"
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/projects/opensource"
                activeStyle="font-bold"
              >
                Open Source
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/projects/school"
                activeStyle="font-bold"
              >
                School
              </NavLink>
            </li>
          </ul>
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </section>
  );
}
