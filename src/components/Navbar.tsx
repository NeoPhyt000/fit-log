
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png"

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className=" flex justify-between h-16 min-h-16 px-6 py-6">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo}
              alt="FitLog logo"
              width={28}
              height={28}
            />

            <span className="font-display text-lg font-bold tracking-wide">
              FITLOG
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden sm:flex">
          <div className="tabs tabs-box bg-base-200 p-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="tab rounded-full px-4 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="navbar-end gap-2">
          <Link
            href="/my-plan"
            className="btn btn-primary btn-sm rounded-full"
          >
            Plan
          </Link>

          <Link
            href="/my-plan"
            className="btn btn-outline btn-sm rounded-full border-base-300"
          >
            Saved
          </Link>
        </div>
      </div>

      <div className="sm:hidden flex items-center gap-1 border-t border-base-300 bg-base-200 px-3 py-1.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-3 py-1 text-xs font-medium transition-colors text-base-content/60 hover:text-base-content"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}