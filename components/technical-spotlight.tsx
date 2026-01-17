"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Globe, Cpu, Gamepad2, Layers, Code2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

export function TechnicalSpotlight({ projects }: TechnicalSpotlightProps) {
  const [activeTab, setActiveTab] = React.useState(CATEGORIES[0].id)

  const activeCategory = CATEGORIES.find(c => c.id === activeTab)
  
  // Find the most relevant project for this category
  const activeProject = React.useMemo(() => {
    return projects.find(p => {
      const lowerTags = p.tags.map(t => t.toLowerCase())
      return activeCategory?.filter(lowerTags)
    })
  }, [activeCategory, projects])

  // Determine if we should show an iframe demo or a video
  const showIframe = activeProject?.demoUrl && (activeProject.slug === 'gtfs-web' || activeProject.tags.some(t => t.toLowerCase() === 'web'))
  const showVideo = activeProject?.videoUrl && !showIframe

  // Aspect Ratio Logic:
  // Game Dev -> Landscape (16:9)
  // iOS / ML -> Vertical iPhone mockup
  // Web -> Landscape iframe
  const isGame = activeProject?.tags.some(t => ['game', 'spritekit'].includes(t.toLowerCase()))
  const isVerticalMobile = activeProject?.tags.some(t => ['ios', 'mobile', 'machine learning', 'create ml'].includes(t.toLowerCase())) && !isGame

  // Extract tech highlights
  const techHighlights = React.useMemo(() => {
    if (!activeProject?.details) return []
    return activeProject.details
      .split('\n')
      .filter(l => l.trim().startsWith('-'))
      .slice(0, 3)
      .map(line => line.replace('-', '').replace(/\*\*/g, '').trim())
  }, [activeProject?.details])

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Section Header & Tabs */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-foreground">Technical Spotlight</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Deep dives into specific engineering domains.
          </p>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="inline-flex p-1 bg-secondary/80 rounded-xl border border-border/50 backdrop-blur-sm">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "relative flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200",
                activeTab === category.id 
                  ? "bg-background text-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <category.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden sm:inline">{category.label}</span>
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-background rounded-lg -z-10 shadow-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Two Column Layout */}
      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-8 items-start",
              isVerticalMobile ? "lg:gap-10 max-w-4xl mx-auto" : "lg:gap-12"
            )}
          >
            {/* Left: Device Mockup / Media */}
            <div className={cn(
              "flex justify-center w-full",
              isVerticalMobile ? "lg:justify-end" : "lg:justify-start"
            )}>
              <div className={cn(
                "relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 w-full",
                // Dynamic sizing based on content type
                showIframe 
                  ? "aspect-[4/3] md:aspect-[16/10] lg:aspect-video rounded-2xl border border-border/50 shadow-sm" 
                  : isVerticalMobile 
                    ? "w-[240px] md:w-[280px]" // iPhone container width
                    : "aspect-video rounded-2xl border border-border/50 shadow-sm" // Landscape for games
              )}>
                
                {/* iPhone 15 Pro Mockup Frame for vertical mobile content */}
                {isVerticalMobile && !showIframe && (
                  <div className="relative bg-[#1a1a1a] rounded-[44px] md:rounded-[55px] p-[10px] md:p-[12px] shadow-xl mx-auto">
                    {/* Screen container with proper iPhone 15 Pro aspect ratio */}
                    <div className="relative bg-black rounded-[34px] md:rounded-[43px] overflow-hidden aspect-[393/852]">
                      
                      {/* Video/Image content */}
                      {showVideo ? (
                        <video 
                          src={activeProject.videoUrl} 
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={activeProject.image}
                        />
                      ) : activeProject.image ? (
                        <Image
                          src={activeProject.image}
                          alt={activeProject.title}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                      
                      {/* Clickable overlay */}
                      <Link href={`/projects/${activeProject.slug}`} className="absolute inset-0 z-20" aria-label={`View project ${activeProject.title}`} />
                    </div>
                  </div>
                )}
                
                {/* Web iframe */}
                {showIframe && (
                  <div className="w-full h-full flex flex-col bg-white">
                    {/* Browser Chrome */}
                    <div className="h-7 md:h-8 bg-secondary/40 border-b border-border/40 flex items-center px-3 md:px-4 gap-2 md:gap-3 shrink-0">
                      <div className="flex gap-1.5">
                        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-border" />
                        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-border" />
                        <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-border" />
                      </div>
                      <div className="flex-1 max-w-[200px] md:max-w-sm">
                        <div className="bg-background/50 border border-border/30 rounded-md px-2 md:px-3 py-0.5 md:py-1 text-[8px] md:text-[10px] text-muted-foreground truncate">
                          {activeProject.title.toLowerCase().replace(/\s+/g, '-')}.dev
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 relative overflow-hidden bg-white">
                       <iframe 
                        src={activeProject.demoUrl} 
                        className="absolute top-0 left-0 w-[180%] h-[180%] origin-top-left scale-[0.55] border-0"
                        title={`${activeProject.title} Demo`}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
                
                {/* Landscape video (games) */}
                {!isVerticalMobile && !showIframe && showVideo && (
                  <>
                    <video 
                      src={activeProject.videoUrl} 
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={activeProject.image}
                    />
                    <Link href={`/projects/${activeProject.slug}`} className="absolute inset-0 z-10" aria-label={`View project ${activeProject.title}`} />
                  </>
                )}
                
                {/* Fallback image for landscape */}
                {!isVerticalMobile && !showIframe && !showVideo && activeProject.image && (
                  <>
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                    <Link href={`/projects/${activeProject.slug}`} className="absolute inset-0 z-10" aria-label={`View project ${activeProject.title}`} />
                  </>
                )}
              </div>
            </div>

            {/* Right: Project Details */}
            <div className="space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {activeProject.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground/80 bg-secondary/50 px-2.5 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
                  {activeProject.title}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech Deep Dive Section */}
              {techHighlights.length > 0 && (
                <div className="bg-secondary/30 p-5 md:p-6 rounded-2xl border border-border/50">
                  <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-primary mb-4">
                    <Code2 className="h-3 w-3" /> Tech Deep Dive
                  </h4>
                  <ul className="space-y-3">
                    {techHighlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-foreground/80 flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild className="rounded-full h-10 md:h-11 px-6 md:px-8 text-sm">
                  <Link href={`/projects/${activeProject.slug}`}>
                    Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                {activeProject.demoUrl && (
                  <Button asChild variant="outline" className="rounded-full h-10 md:h-11 px-5 md:px-6 text-sm text-muted-foreground hover:text-foreground">
                    <Link href={activeProject.demoUrl} target="_blank">
                      {showIframe ? "Full Screen" : "Live Demo"} <Globe className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center p-12 bg-secondary/20 rounded-2xl border border-dashed border-border min-h-[300px]"
          >
            <Layers className="w-12 h-12 text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground">No featured projects found for {activeCategory?.label}.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
