"use client";

import { Suspense } from "react";

const CurrentYear = () => {
  return new Date().getFullYear();
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-800 py-6 text-gray-200">
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="text-center">
          Copyright &copy;{" "}
          <Suspense fallback={null}>
            <CurrentYear />
          </Suspense>{" "}
          | Mario Brino | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
