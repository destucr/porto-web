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
    <div className="group/item flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-foreground/[0.03]">
      <div className="flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
        <Image
          src={item.logo}
          alt={item.alt}
          width={36}
          height={36}
          className="size-9 object-contain"
        />
      </div>
      <div className="flex-1 min-w-0 transition-transform duration-300 group-hover/item:translate-x-1">
        <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
        <p className="text-[13px] text-muted-foreground mt-0.5">{item.role} &middot; {item.year}</p>
      </div>
    </div>
  )
}

export function HeroSection() {
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <AuroraCanvas excludeRef={contentRef} />

      <div className="container mx-auto relative z-10">
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-end"
        >
          {/* Left — intro */}
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-foreground text-balance">
              Destu Cikal
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty max-w-md">
              iOS developer building native apps with Swift, UIKit, and SwiftUI.
            </p>
            <div className="pt-2">
              <Button asChild size="lg">
                <Link href="/projects">
                  See the work
                  <ArrowDown className="size-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right — work & education */}
          <div className="space-y-8">
            <div>
              <p className="text-xs font-medium text-muted-foreground/60 tracking-wide mb-4">Work</p>
              <div className="space-y-1">
                {workItems.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-muted-foreground/60 tracking-wide mb-4">Education</p>
              <div className="space-y-1">
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
