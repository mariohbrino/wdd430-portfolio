"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("An uncaught error occurred:", error);
  }, [error]);

  return (
    <div className="border-border bg-background mx-auto mt-16 max-w-xl rounded-lg border p-6 text-center shadow-sm">
      <h1 className="text-foreground text-2xl font-bold">
        Something went wrong!
      </h1>
      <p className="text-foreground mt-3">
        An unexpected error occurred. Please try again later.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="bg-primary hover:bg-primary/80 text-secondary-foreground rounded-md px-4 py-2"
        >
          Try Again
        </button>
        <Link
          href="/projects"
          className="border-border text-foreground hover:bg-foreground hover:text-background rounded-md border px-4 py-2 font-semibold transition"
        >
          Go Back to Projects
        </Link>
      </div>
    </div>
  );
}
