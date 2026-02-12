"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Smartphone, Globe, Cpu, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  tags: readonly string[]
  details?: string
  demoUrl?: string
  videoUrl?: string
}

interface TechnicalSpotlightProps {
  projects: Project[]
}

const CATEGORIES = [
  {
    id: "mobile",
    label: "iOS",
    icon: Smartphone,
    filter: (tags: string[]) => tags.includes("ios"),
  },
  {
    id: "systems",
    label: "Full-Stack",
    icon: Globe,
    filter: (tags: string[]) =>
      tags.includes("web") || tags.includes("go") || tags.includes("react"),
  },
  {
    id: "ai",
    label: "ML",
    icon: Cpu,
    filter: (tags: string[]) =>
      tags.includes("machine learning") || tags.includes("create ml"),
  },
  {
    id: "game",
    label: "Games",
    icon: Gamepad2,
    filter: (tags: string[]) =>
      tags.includes("spritekit") || tags.includes("game"),
  },
]

function SpotlightVideo({
  src,
  isActive,
}: {
  src: string
  isActive: boolean
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [shouldLoad, setShouldLoad] = React.useState(false)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !shouldLoad) return

    if (isActive) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isActive, shouldLoad])

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          className={cn(
            "w-full h-full object-cover object-top transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          onCanPlay={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

function IframeWrapper({
  url,
  title,
  isActive,
}: {
  url: string
  title: string
  isActive: boolean
}) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const [shouldLoad, setShouldLoad] = React.useState(false)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px" }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // When the tab becomes active, trigger a resize event inside the iframe
  // so Leaflet recalculates its map tile positions
  React.useEffect(() => {
    if (isActive && isLoaded && iframeRef.current?.contentWindow) {
      const timer = setTimeout(() => {
        try {
          iframeRef.current?.contentWindow?.dispatchEvent(
            new Event("resize")
          )
        } catch {
          // Cross-origin safety — ignore if sandbox blocks access
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isActive, isLoaded])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      {shouldLoad && (
        <iframe
          ref={iframeRef}
          src={url}
          className={cn(
            "absolute top-0 left-0 w-[140%] h-[140%] origin-top-left scale-[0.714] border-0 transition-opacity duration-500",
            isActive && isLoaded
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          )}
          title={`${title} Demo`}
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  )
}

export function TechnicalSpotlight({ projects }: TechnicalSpotlightProps) {
  const [activeTab, setActiveTab] = React.useState(CATEGORIES[0].id)
  const containerRef = React.useRef(null)

  const spotlightContent = React.useMemo(() => {
    return CATEGORIES.map((cat) => {
      const project = projects.find((p) => {
        const lowerTags = p.tags.map((t) => t.toLowerCase())
        return cat.filter(lowerTags)
      })
      return { categoryId: cat.id, project }
    })
  }, [projects])

  return (
    <div ref={containerRef} className="space-y-10">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
          Technical Spotlight
        </h2>
        <p className="text-muted-foreground text-pretty">
          A closer look at selected work across platforms.
        </p>
      </div>

      {/* Category Tabs — editorial underline style */}
      <div className="flex gap-6 border-b border-border pb-0">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            aria-label={`View ${category.label} projects`}
            className={cn(
              "relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === category.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <category.icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{category.label}</span>
            {activeTab === category.id && (
              <motion.div
                layoutId="spotlightTab"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative min-h-[560px] lg:min-h-[480px]">
        {spotlightContent.map(({ categoryId, project }) => {
          if (!project) return null

          const isActive = activeTab === categoryId
          const showIframe =
            project.demoUrl &&
            (project.slug === "gtfs-web" ||
              project.tags.some((t) => t.toLowerCase() === "web"))
          const showVideo = project.videoUrl && !showIframe
          const isGame = project.tags.some((t) =>
            ["game", "spritekit"].includes(t.toLowerCase())
          )
          const isVerticalMobile =
            project.tags.some((t) =>
              ["ios", "mobile", "machine learning", "create ml"].includes(
                t.toLowerCase()
              )
            ) && !isGame

          const techHighlights = project.details
            ? project.details
                .split("\n")
                .filter((l) => l.trim().startsWith("-"))
                .slice(0, 3)
                .map((line) => line.replace("-", "").replace(/\*\*/g, "").trim())
            : []

          return (
            <div
              key={project.id}
              className={cn(
                "transition-all duration-500 ease-out",
                isActive
                  ? "opacity-100 translate-y-0 relative z-10 block"
                  : "opacity-0 translate-y-4 absolute inset-0 z-0 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left: Media Stage */}
                <div
                  className={cn(
                    "flex justify-center w-full",
                    showIframe ? "lg:col-span-8" : "lg:col-span-7"
                  )}
                >
                  <div
                    className={cn(
                      "relative w-full bg-muted rounded-lg border border-border flex items-center justify-center p-6 md:p-10 overflow-hidden",
                      showIframe
                        ? "aspect-[16/10]"
                        : isVerticalMobile
                          ? "aspect-[4/5] lg:aspect-square"
                          : "aspect-[16/10] lg:aspect-[16/9]"
                    )}
                  >
                    <div
                      className={cn(
                        "relative transition-transform duration-500",
                        showIframe
                          ? "w-full h-full overflow-hidden border border-border"
                          : isVerticalMobile
                            ? "h-full w-auto aspect-[393/852]"
                            : "w-full aspect-video overflow-hidden border border-border"
                      )}
                    >
                      {/* iPhone Mockup for vertical mobile */}
                      {isVerticalMobile && !showIframe && (
                        <div className="relative bg-[#1a1a1a] rounded-[40px] md:rounded-[48px] p-[8px] md:p-[10px] shadow-lg mx-auto border border-neutral-700">
                          <div className="relative bg-black rounded-[32px] md:rounded-[38px] overflow-hidden aspect-[393/852]">
                            {showVideo ? (
                              <SpotlightVideo
                                src={project.videoUrl!}
                                isActive={isActive}
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover object-top"
                              />
                            )}
                            <Link
                              href={`/projects/${project.slug}`}
                              className="absolute inset-0 z-20"
                              aria-label={`View ${project.title} case study`}
                            />
                          </div>
                        </div>
                      )}

                      {/* Web iframe */}
                      {showIframe && (
                        <div className="w-full h-full flex flex-col bg-background">
                          <div className="h-9 bg-muted border-b border-border flex items-center px-4 gap-3 shrink-0">
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-border" />
                              <div className="w-2.5 h-2.5 rounded-full bg-border" />
                              <div className="w-2.5 h-2.5 rounded-full bg-border" />
                            </div>
                            <div className="flex-1 flex justify-center text-[10px] text-muted-foreground font-mono">
                              {project.slug}.dev
                            </div>
                          </div>
                          <div className="flex-1 relative overflow-hidden bg-background">
                            <IframeWrapper
                              url={project.demoUrl!}
                              title={project.title}
                              isActive={isActive}
                            />
                          </div>
                        </div>
                      )}

                      {/* Landscape Media */}
                      {!isVerticalMobile && !showIframe && (
                        <>
                          {showVideo ? (
                            <SpotlightVideo
                              src={project.videoUrl!}
                              isActive={isActive}
                            />
                          ) : (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover object-top"
                            />
                          )}
                          <Link
                            href={`/projects/${project.slug}`}
                            className="absolute inset-0 z-10"
                            aria-label={`View ${project.title} case study`}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Detail Panel */}
                <div
                  className={cn(
                    "space-y-8 lg:pt-2",
                    showIframe ? "lg:col-span-4" : "lg:col-span-5"
                  )}
                >
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="label-caps text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technical Highlights */}
                  {techHighlights.length > 0 && (
                    <div className="space-y-4">
                      <span className="label-caps text-muted-foreground">
                        Technical Highlights
                      </span>
                      <div className="space-y-3">
                        {techHighlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors link-underline"
                    >
                      Read Case Study
                    </Link>

                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Live Preview
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
