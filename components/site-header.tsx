"use client"

import Link from "next/link"
import Image from "next/image"
import { JakartaClock } from "@/components/jakarta-clock"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/blog", label: "Writing" },
  { href: "/books", label: "Reading" },
  { href: "/contact", label: "Contact" },
]

// The header strip: monogram, nav, place, toggle.
// Time renders client-side; nothing here fetches or can fail.

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="wrap h-14 flex items-center justify-between gap-4">
        <Link
          href="/"
          aria-label="Destu Cikal, home"
          className="shrink-0 rounded-md overflow-hidden transition-transform duration-200 hover:-rotate-6"
        >
          <Image
            src="/images/logo/mark.webp"
            alt=""
            width={28}
            height={28}
            className="size-7 object-cover dark:hidden"
            unoptimized
            priority
          />
          <Image
            src="/images/logo/mark-dark.webp"
            alt=""
            width={28}
            height={28}
            className="size-7 object-cover hidden dark:block"
            unoptimized
            priority
          />
        </Link>

        <nav className="flex items-center gap-3 sm:gap-5 font-sans text-[13px]" aria-label="Sections">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground nav-link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 shrink-0">
          <p className="meta tnum hidden sm:block">
            Jakarta <JakartaClock />
          </p>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
