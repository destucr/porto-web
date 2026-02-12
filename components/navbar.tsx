"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Handle hash links on the homepage
    if (href.startsWith("/#")) {
      const hash = href.slice(1) // e.g. "#about"
      if (pathname === "/") {
        e.preventDefault()
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    setMobileOpen(false)
  }

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 bg-background/80 backdrop-blur-xl transition-[border-color] duration-500",
          scrolled
            ? "border-b border-border"
            : "border-b border-transparent"
        )}
      >
        <div className="container mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative shrink-0 transition-opacity hover:opacity-70">
            <Image
              src={mounted && resolvedTheme === "dark" ? "/images/logo/logo-dark.webp" : "/images/logo/logo-light.webp"}
              alt="Destu Cikal"
              width={48}
              height={48}
              className="size-12 object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200",
                  isActive(item.href)
                    ? "text-foreground bg-foreground/[0.05]"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="w-px h-4 bg-border mx-2" />
            <ModeToggle />
          </nav>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative w-9 h-9 flex items-center justify-center text-foreground"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                  mobileOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                  mobileOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute w-5 h-[1.5px] bg-current transition-all duration-300",
                  mobileOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/98 backdrop-blur-md transition-all duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-start justify-center h-full container mx-auto gap-8">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "text-4xl font-bold tracking-tight transition-all duration-300",
                mobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
              style={{
                transitionDelay: mobileOpen ? `${100 + i * 75}ms` : "0ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer to account for fixed header */}
      <div className="h-16" />
    </>
  )
}
