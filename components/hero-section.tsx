"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import dynamic from "next/dynamic"

const AuroraCanvas = dynamic(() => import("@/components/aurora-canvas").then(mod => mod.AuroraCanvas), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" /> 
})

type TimelineEntry = {
  logo: string
  alt: string
  name: string
  role: string
  year: string
  template?: boolean
  size?: number
  jobType?: string
  duration?: string
  startDate?: string
  /** Two dominant brand colors sampled from the logo, used to build the timeline connector gradient. */
  accentColors?: [string, string]
}

const workItems: TimelineEntry[] = [
  {
    logo: "/images/pegadaian-logo.webp",
    alt: "PT Pegadaian",
    name: "PT Pegadaian",
    role: "iOS Developer",
    year: "Jul 2026–Present",
    template: true,
    jobType: "Contract",
    startDate: "2026-07-01",
    accentColors: ["#BED72F", "#00AB4F"],
  },
  {
    logo: "/images/nusantara-beta-studio-logo.webp",
    alt: "Nusantara Beta Studio",
    name: "Nusantara Beta Studio",
    role: "iOS Developer",
    year: "May–Jul 2026",
    template: true,
    jobType: "Intern",
    duration: "3 months",
    accentColors: ["#580AC6", "#16C8C7"],
  },
  {
    logo: "/images/bullion-logo.webp",
    alt: "Bullion Ecosystem International",
    name: "Bullion Ecosystem International",
    role: "iOS Developer",
    year: "Jan–Apr 2026",
    template: true,
    jobType: "Contract",
    duration: "4 months",
    accentColors: ["#2E75B5", "#F05424"],
  },
]

const educationItems: TimelineEntry[] = [
  {
    logo: "/images/apple-developer-academy-binus.webp",
    alt: "Apple Developer Academy @ BINUS",
    name: "Apple Developer Academy @ BINUS",
    role: "Graduated",
    year: "2025",
    template: true,
    size: 44,
  },
  {
    logo: "/images/telkom-university-logo.webp",
    alt: "Telkom University",
    name: "Telkom University",
    role: "Software Engineering",
    year: "2026",
    template: true,
  },
]

const ICON_BOX = 44

function formatDurationSince(startDate: string): string {
  const start = new Date(startDate)
  const now = new Date()
  const months = Math.max(1, (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1)
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`
  const years = Math.floor(months / 12)
  const remainder = months % 12
  const yearsLabel = `${years} year${years === 1 ? "" : "s"}`
  return remainder === 0 ? yearsLabel : `${yearsLabel} ${remainder} month${remainder === 1 ? "" : "s"}`
}

function TimelineItem({ item, showConnector, nextAccentColors }: { item: TimelineEntry; showConnector?: boolean; nextAccentColors?: [string, string] }) {
  const size = item.size ?? 32
  const duration = item.startDate ? formatDurationSince(item.startDate) : item.duration
  const connectorLeft = ICON_BOX / 2 - 1

  let colorGradient: string | undefined
  if (showConnector && item.accentColors) {
    const [a1, a2] = item.accentColors
    const [b1, b2] = nextAccentColors ?? item.accentColors
    colorGradient = `linear-gradient(in oklch to bottom, ${a1} 0%, ${a2} 33%, ${b1} 66%, ${b2} 100%)`
  }

  return (
    <div className="group/item relative flex items-start gap-3 pb-7 last:pb-0">
      {showConnector && (
        <>
          {colorGradient && (
            <span
              className="absolute w-[2px] top-11 bottom-0 rounded-full opacity-45 dark:hidden animate-gradient-shift-vertical"
              style={{ left: connectorLeft, backgroundImage: colorGradient }}
              aria-hidden="true"
            />
          )}
          <span
            className={
              colorGradient
                ? "absolute w-[2px] top-11 bottom-0 rounded-full bg-white/40 hidden dark:block"
                : "absolute w-[2px] top-11 bottom-0 rounded-full bg-border"
            }
            style={{ left: connectorLeft }}
            aria-hidden="true"
          />
        </>
      )}
      <div
        className="relative z-10 flex-shrink-0 flex items-center justify-center"
        style={{ width: ICON_BOX, height: ICON_BOX }}
      >
        {item.template ? (
          <div className="relative" style={{ width: size, height: size }}>
            <Image
              src={item.logo}
              alt={item.alt}
              width={size}
              height={size}
              className="object-contain dark:hidden"
              style={{ width: size, height: size }}
            />
            <div
              role="img"
              aria-label={item.alt}
              className="hidden dark:block bg-white absolute inset-0"
              style={{
                width: size,
                height: size,
                maskImage: `url(${item.logo})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: `url(${item.logo})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
        ) : (
          <Image
            src={item.logo}
            alt={item.alt}
            width={size}
            height={size}
            className="object-contain"
            style={{ width: size, height: size }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0 pt-1.5">
        <p className="text-sm font-medium text-foreground leading-tight flex items-center gap-1.5 flex-wrap">
          <span>{item.name}</span>
          {item.jobType && (
            <span className="text-[10px] font-medium leading-none px-1.5 py-[3px] rounded-full bg-muted text-muted-foreground/80 border border-border">
              {item.jobType}
            </span>
          )}
        </p>
        <p className="text-[13px] text-muted-foreground mt-0.5">{item.role} &middot; {item.year}</p>
        {duration && (
          <p className="text-[11px] text-muted-foreground/60 mt-0.5">{duration}</p>
        )}
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
                  <TimelineItem
                    key={i}
                    item={item}
                    showConnector={i !== workItems.length - 1}
                    nextAccentColors={workItems[i + 1]?.accentColors}
                  />
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
