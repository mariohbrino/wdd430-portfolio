export default async function Footer() {
  "use cache";

  return (
    <footer className="border-border bg-background-accent border-t py-6 text-black dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="text-center">
          Copyright &copy; {new Date().getFullYear()} | Mario Brino | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
