"use client";

import NavLink from "@/components/nav-link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-800">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-gray-200">Mario Brino</div>
        <nav className="space-x-4">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                href="/"
                activeStyle="font-bold"
                className="text-gray-200 hover:text-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/projects"
                activeStyle="font-bold"
                className="text-gray-200 hover:text-white"
              >
                Projects
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/about"
                activeStyle="font-bold"
                className="text-gray-200 hover:text-white"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                href="/contact"
                activeStyle="font-bold"
                className="text-gray-200 hover:text-white"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
