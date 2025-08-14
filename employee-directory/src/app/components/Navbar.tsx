"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-700">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-lg font-bold text-blue-600 hover:text-blue-800"
        >
          Employee Directory
        </Link>
        <div className="flex space-x-2 sm:space-x-4">
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`px-3 py-2 rounded text-sm font-medium ${
              pathname === "/"
                ? "bg-blue-100 dark:bg-neutral-800 text-blue-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
          >
            Home
          </Link>
          <Link
            href="/addEmployee"
            aria-current={pathname === "/addEmployee" ? "page" : undefined}
            className={`px-3 py-2 rounded text-sm font-medium ${
              pathname === "/addEmployee"
                ? "bg-blue-100 dark:bg-neutral-800 text-blue-700 dark:text-white"
                : "text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-neutral-800"
            }`}
          >
            Add Employee
          </Link>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  );
}
