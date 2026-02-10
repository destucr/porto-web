"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Globe, Cpu, Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
    filter: (tags: string[]) => tags.includes("ios")
  },
  {
    id: "systems",
    label: "Full-Stack",
    icon: Globe,
    filter: (tags: string[]) => tags.includes("web") || tags.includes("go") || tags.includes("react")
  },
  {
    id: "ai",
    label: "ML",
    icon: Cpu,
    filter: (tags: string[]) => tags.includes("machine learning") || tags.includes("create ml")
  },
  {
    id: "game",
    label: "Games",
    icon: Gamepad2,
    filter: (tags: string[]) => tags.includes("spritekit") || tags.includes("game")
  },
]

function SpotlightVideo({ src, isActive }: { src: string, isActive: boolean }) {
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
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
      {shouldLoad && (
        <video 
          ref={videoRef}
          src={src} 
          className={cn("w-full h-full object-cover object-top transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
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

function IframeWrapper({ url, title, isActive }: { url: string, title: string, isActive: boolean }) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
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

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
      {shouldLoad && (
        <iframe 
          src={url} 
          className={cn(
            "absolute top-0 left-0 w-[140%] h-[140%] origin-top-left scale-[0.714] border-0 transition-opacity duration-500",
            isActive && isLoaded ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          title={`${title} Demo`}
          loading="lazy"
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
  
  // High performance: track all projects for spotlight categories
  const spotlightContent = React.useMemo(() => {
    return CATEGORIES.map(cat => {
      const project = projects.find(p => {
        const lowerTags = p.tags.map(t => t.toLowerCase())
        return cat.filter(lowerTags)
      })
      return { categoryId: cat.id, project }
    })
  }, [projects])

  return (
    <div ref={containerRef} className="space-y-12 md:space-y-16">
      
      {/* Section Header & Tabs */}
      <div className="flex flex-col items-center text-center space-y-10">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">Technical Spotlight</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            Deep dives into specific engineering domains and architectural decisions.
          </p>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="inline-flex p-1 bg-secondary/40 rounded-full border border-border/40 backdrop-blur-sm">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              aria-label={`View ${category.label} projects`}
              className={cn(
                "relative flex items-center gap-2 px-6 md:px-8 py-2 rounded-full text-xs md:text-sm font-bold tracking-tight transition-all duration-300",
                activeTab === category.id 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground/80"
              )}
            >
              <category.icon className="w-3.5 h-3.5 md:w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTabSpotlight"
                  className="absolute inset-0 bg-background rounded-full -z-10 shadow-sm border border-border/20"
                  transition={{ type: "spring", bounce: 0.1, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Permanent Mounting for Instant Switching */}
      <div className="relative min-h-[600px] lg:min-h-[500px]">
        {spotlightContent.map(({ categoryId, project }) => {
          if (!project) return null
          
          const isActive = activeTab === categoryId
          const showIframe = project.demoUrl && (project.slug === 'gtfs-web' || project.tags.some(t => t.toLowerCase() === 'web'))
          const showVideo = project.videoUrl && !showIframe
          const isGame = project.tags.some(t => ['game', 'spritekit'].includes(t.toLowerCase()))
          const isVerticalMobile = project.tags.some(t => ['ios', 'mobile', 'machine learning', 'create ml'].includes(t.toLowerCase())) && !isGame

          const techHighlights = project.details
            ? project.details
                .split('\n')
                .filter(l => l.trim().startsWith('-'))
                .slice(0, 3)
                .map(line => line.replace('-', '').replace(/\*\*/g, '').trim())
            : []

          return (
            <div 
              key={project.id}
              className={cn(
                "transition-all duration-700 ease-[0.23,1,0.32,1]",
                isActive 
                  ? "opacity-100 translate-y-0 relative z-10 block" 
                  : "opacity-0 translate-y-4 absolute inset-0 z-0 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                {/* Left: Immersive Media Stage */}
                <div className={cn(
                  "flex justify-center w-full",
                  showIframe ? "lg:col-span-8" : "lg:col-span-7"
                )}>
                  <div className={cn(
                    "relative w-full rounded-2xl bg-secondary/5 border border-border/40 flex items-center justify-center p-4 md:p-10 overflow-hidden",
                    showIframe ? "aspect-[16/10]" : isVerticalMobile ? "aspect-[4/5] lg:aspect-square" : "aspect-[16/10] lg:aspect-[16/9]"
                  )}>
                    
                    <div className={cn(
                      "relative transition-transform duration-500",
                      showIframe ? "w-full h-full shadow-2xl rounded-xl overflow-hidden border border-border/60" : 
                      isVerticalMobile ? "h-full w-auto aspect-[393/852]" : "w-full aspect-video rounded-xl overflow-hidden border border-border/60 shadow-xl"
                    )}>
                      
                      {/* iPhone 15 Pro Mockup */}
                      {isVerticalMobile && !showIframe && (
                        <div className="relative bg-[#050505] rounded-[44px] md:rounded-[55px] p-[10px] md:p-[12px] shadow-2xl mx-auto border border-white/5">
                          <div className="relative bg-black rounded-[34px] md:rounded-[43px] overflow-hidden aspect-[393/852]">
                            {showVideo ? (
                              <SpotlightVideo 
                                src={project.videoUrl!}
                                isActive={isActive} 
                              />
                            ) : (
                              <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                            )}
                            <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} case study`} />
                          </div>
                        </div>
                      )}
                      
                      {/* Web iframe */}
                      {showIframe && (
                        <div className="w-full h-full flex flex-col bg-background">
                          <div className="h-10 bg-secondary/40 border-b border-border/60 flex items-center px-4 gap-3 shrink-0">
                            <div className="flex gap-1.5">
                              <div className="w-2 h-2 rounded-full bg-border" />
                              <div className="w-2 h-2 rounded-full bg-border" />
                              <div className="w-2 h-2 rounded-full bg-border" />
                            </div>
                            <div className="flex-1 flex justify-center font-mono text-[9px] text-muted-foreground/60">
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
                            <Image src={project.image} alt={project.title} fill className="object-cover object-top" />
                          )}
                          <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View ${project.title} case study`} />
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Detail Panel */}
                <div className={cn(
                  "space-y-12 lg:pt-2",
                  showIframe ? "lg:col-span-4" : "lg:col-span-5"
                )}>
                  <div className="space-y-8">
                    <div className="flex flex-wrap gap-3">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-3xl md:text-4xl text-foreground leading-tight tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Architectural Specs */}
                  {techHighlights.length > 0 && (
                    <div className="space-y-6">
                      <div className="text-[9px] font-bold tracking-[0.2em] text-muted-foreground/40">Technical Highlights</div>
                      <div className="space-y-6">
                        {techHighlights.map((highlight, i) => (
                          <div key={i} className="group/item flex items-start gap-4">
                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border group-hover/item:bg-primary transition-colors" />
                            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                              {highlight}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-6 pt-4">
                    <Button asChild className="rounded-none h-11 px-8 text-xs font-bold tracking-widest shadow-none border-b-2 border-primary hover:bg-transparent hover:text-primary transition-all">
                      <Link href={`/projects/${project.slug}`}>
                        Read Case Study
                      </Link>
                    </Button>
                    
                    {project.demoUrl && (
                      <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
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
