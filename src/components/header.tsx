import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-gray-800">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-gray-200">Mario Brino</div>
        <nav className="space-x-4">
          <Link
            href="/"
            className="text-gray-200 hover:text-white"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-200 hover:text-white"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
