"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

type NavLinkProps = {
  href: string;
  activeStyle: string;
  className?: string;
  children: React.ReactNode;
};

function ActiveLink({ href, activeStyle, className, children }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(pathname === href && activeStyle, className)}
      aria-current={pathname === href ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function NavLink(props: NavLinkProps) {
  // usePathname suspends during prerendering of routes with fallback dynamic
  // params, so the pathname-dependent link needs a Suspense boundary.
  return (
    <Suspense
      fallback={
        <Link
          href={props.href}
          className={props.className}
        >
          {props.children}
        </Link>
      }
    >
      <ActiveLink {...props} />
    </Suspense>
  );
}
