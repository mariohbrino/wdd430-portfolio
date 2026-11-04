"use client";

import NavLink from "@/components/nav-link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="border-border bg-background-accent sticky top-0 z-50 border-b">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-black dark:text-white">
          Mario Brino
        </div>
        <div className="flex items-center space-x-4">
          <nav className="space-x-4">
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  href="/"
                  activeStyle="font-bold"
                  className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/projects"
                  activeStyle="font-bold"
                  className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/about"
                  activeStyle="font-bold"
                  className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/contact"
                  activeStyle="font-bold"
                  className="text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-200"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
