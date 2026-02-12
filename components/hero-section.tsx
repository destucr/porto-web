"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { AuroraCanvas } from "@/components/aurora-canvas"

const workItems = [
  {
    logo: "/images/bullion-logo.webp",
    alt: "Bullion Ecosystem International",
    name: "Bullion Ecosystem International",
    role: "iOS Developer",
    year: "2026",
  },
]

const educationItems = [
  {
    logo: "/images/apple-developer-academy-binus.webp",
    alt: "Apple Developer Academy @ BINUS",
    name: "Apple Developer Academy @ BINUS",
    role: "Graduated",
    year: "2025",
  },
  {
    logo: "/images/telkom-university-logo.webp",
    alt: "Telkom University",
    name: "Telkom University",
    role: "Software Engineering",
    year: "2026",
  },
]

function TimelineItem({ item }: { item: typeof workItems[0] }) {
  return (
    <div className="group/item flex items-center gap-3 py-2">
      <div className="flex-shrink-0">
        <Image
          src={item.logo}
          alt={item.alt}
          width={32}
          height={32}
          className="size-8 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
        <p className="text-[13px] text-muted-foreground mt-0.5">{item.role} &middot; {item.year}</p>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <AuroraCanvas />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
          {/* Left — intro */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-6 -inset-y-6 md:-inset-x-8 md:-inset-y-8 rounded-3xl bg-background/90 dark:bg-background/85 blur-xl"
              aria-hidden="true"
            />
            <div className="space-y-4 relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground text-balance">
                Destu Cikal
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty max-w-md">
                iOS developer building native apps with Swift, UIKit, and SwiftUI.
              </p>
            <div className="pt-1">
              <Button asChild size="lg">
                <Link href="/projects">
                  See the work
                  <ArrowDown className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
            </div>
          </div>

          {/* Right — work & education */}
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-4 -inset-y-5 md:-inset-x-6 md:-inset-y-6 rounded-2xl bg-background/90 dark:bg-background/85 blur-xl"
              aria-hidden="true"
            />
            <div className="space-y-6 relative">
              <div>
                <p className="text-xs font-medium text-muted-foreground/60 tracking-wide mb-2">Work</p>
                {workItems.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground/60 tracking-wide mb-2">Education</p>
                {educationItems.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
