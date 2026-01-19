"use client"

import * as React from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Smartphone, Globe, Cpu, Gamepad2, Layers } from "lucide-react"
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
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "200px" })

  const activeCategory = CATEGORIES.find(c => c.id === activeTab)
  
  const activeProject = React.useMemo(() => {
    return projects.find(p => {
      const lowerTags = p.tags.map(t => t.toLowerCase())
      return activeCategory?.filter(lowerTags)
    })
  }, [activeCategory, projects])

  const showIframe = activeProject?.demoUrl && (activeProject.slug === 'gtfs-web' || activeProject.tags.some(t => t.toLowerCase() === 'web'))
  const showVideo = activeProject?.videoUrl && !showIframe

  const isGame = activeProject?.tags.some(t => ['game', 'spritekit'].includes(t.toLowerCase()))
  const isVerticalMobile = activeProject?.tags.some(t => ['ios', 'mobile', 'machine learning', 'create ml'].includes(t.toLowerCase())) && !isGame

  const techHighlights = React.useMemo(() => {
    if (!activeProject?.details) return []
    return activeProject.details
      .split('\n')
      .filter(l => l.trim().startsWith('-'))
      .slice(0, 3)
      .map(line => line.replace('-', '').replace(/\*\*/g, '').trim())
  }, [activeProject?.details])

  return (
    <div ref={containerRef} className="space-y-12 md:space-y-16">
      {/* Section Header & Tabs */}
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-foreground">Technical Spotlight</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto font-medium">
            Deep dives into specific engineering domains.
          </p>
        </div>

        {/* iOS-style Segmented Control */}
        <div className="inline-flex p-1 bg-neutral-100 rounded-2xl border border-neutral-200/60 backdrop-blur-sm shadow-sm">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              aria-label={`View ${category.label} projects`}
              className={cn(
                "relative flex items-center gap-2 px-5 md:px-7 py-2.5 rounded-xl text-xs md:text-sm font-bold tracking-tight transition-all duration-300",
                activeTab === category.id 
                  ? "text-foreground" 
                  : "text-neutral-600 hover:text-neutral-600"
              )}
            >
              <category.icon className="w-3.5 h-3.5 md:w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
              {activeTab === category.id && (
                <motion.div
                  layoutId="activeTabSpotlight"
                  className="absolute inset-0 bg-white rounded-xl -z-10 shadow-sm border border-neutral-200/50"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - Immersive Layout */}
      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* Left: Immersive Media Stage (Column 1-7 or 1-8 for web) */}
            <div className={cn(
              "flex justify-center w-full",
              showIframe ? "lg:col-span-8" : "lg:col-span-7"
            )}>
              <div className={cn(
                "relative w-full rounded-[48px] bg-neutral-50/50 border border-neutral-100 flex items-center justify-center p-4 md:p-8 overflow-hidden shadow-[inset_0_2px_40px_rgba(0,0,0,0.02)]",
                showIframe ? "aspect-[16/10]" : isVerticalMobile ? "aspect-[4/5] lg:aspect-square" : "aspect-[16/10] lg:aspect-[16/9]"
              )}>
                
                {/* Structural Platform Accents */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden lg:block">
                  <div className="absolute top-1/2 left-0 w-full h-px bg-neutral-900" />
                  <div className="absolute top-0 left-1/2 w-px h-full bg-neutral-900" />
                </div>

                <div className={cn(
                  "relative transition-transform duration-500 hover:scale-[1.01]",
                  showIframe ? "w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-neutral-200" : 
                  isVerticalMobile ? "h-full w-auto aspect-[393/852]" : "w-full aspect-video rounded-2xl overflow-hidden border border-neutral-200 shadow-xl"
                )}>
                  
                  {/* iPhone 15 Pro Mockup */}
                  {isVerticalMobile && !showIframe && (
                    <div className="relative bg-[#050505] rounded-[44px] md:rounded-[55px] p-[10px] md:p-[12px] shadow-2xl mx-auto border border-white/10">
                      <div className="relative bg-black rounded-[34px] md:rounded-[43px] overflow-hidden aspect-[393/852]">
                        {showVideo ? (
                          isInView ? (
                            <video 
                              src={activeProject.videoUrl} 
                              className="w-full h-full object-cover object-top"
                              autoPlay muted loop playsInline poster={activeProject.image}
                              preload="none"
                            />
                          ) : (
                            <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover object-top" />
                          )
                        ) : (
                          <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover object-top" />
                        )}
                        <Link href={`/projects/${activeProject.slug}`} className="absolute inset-0 z-20" aria-label={`View ${activeProject.title} case study`} />
                      </div>
                    </div>
                  )}
                  
                  {/* Web iframe */}
                  {showIframe && (
                    <div className="w-full h-full flex flex-col bg-white">
                      <div className="h-10 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 gap-3 shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                          <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                        </div>
                        <div className="flex-1 flex justify-center">
                          <div className="bg-white border border-neutral-200 rounded-md px-4 py-1 text-[10px] text-neutral-600 truncate font-mono max-w-[200px]">
                            {activeProject.slug}.dev
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="hidden md:inline text-[10px] font-bold text-neutral-600 uppercase tracking-tight">Try it out</span>
                          <div className="flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-wider text-green-600">Live</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 relative overflow-hidden bg-white">
                         <iframe 
                          src={activeProject.demoUrl} 
                          className="absolute top-0 left-0 w-[140%] h-[140%] origin-top-left scale-[0.714] border-0"
                          title={`${activeProject.title} Demo`}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Landscape Media */}
                  {!isVerticalMobile && !showIframe && (
                    <>
                      {showVideo ? (
                        isInView ? (
                          <video 
                            src={activeProject.videoUrl} 
                            className="w-full h-full object-cover object-top"
                            autoPlay muted loop playsInline poster={activeProject.image}
                            preload="none"
                          />
                        ) : (
                          <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover object-top" />
                        )
                      ) : (
                        <Image src={activeProject.image} alt={activeProject.title} fill className="object-cover object-top" />
                      )}
                      <Link href={`/projects/${activeProject.slug}`} className="absolute inset-0 z-10" aria-label={`View ${activeProject.title} case study`} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Refined Detail Panel (Column 8-12 or 9-12 for web) */}
            <div className={cn(
              "space-y-10 lg:pt-4",
              showIframe ? "lg:col-span-4" : "lg:col-span-5"
            )}>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-neutral-600 border border-neutral-200 px-3 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-foreground leading-tight tracking-tight">
                    {activeProject.title}
                  </h3>
                  <p className="text-lg text-neutral-500 leading-relaxed font-medium">
                    {activeProject.description}
                  </p>
                  
                  {showIframe && (
                    <p className="text-sm font-medium text-primary bg-primary/5 border border-primary/10 rounded-2xl px-4 py-3 inline-block animate-fade-in">
                      ✨ Go ahead, give it a spin—it&apos;s a fully functional live demo!
                    </p>
                  )}
                </div>
              </div>

              {/* Architectural Specs */}
              {techHighlights.length > 0 && (
                <div className="space-y-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-300">Technical Architecture</div>
                  <div className="relative pl-6 border-l border-neutral-100 space-y-8 py-1">
                    {techHighlights.map((highlight, i) => (
                      <div key={i} className="relative group/item">
                        <div className="absolute -left-[29px] top-2 w-2 h-2 rounded-full bg-neutral-200 border-2 border-white group-hover/item:bg-primary transition-colors duration-300" />
                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed font-medium">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button asChild className="rounded-full h-12 px-10 text-sm font-bold shadow-md shadow-neutral-200/50">
                  <Link href={`/projects/${activeProject.slug}`}>
                    View Case Study <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                
                {activeProject.demoUrl && (
                  <Button asChild variant="ghost" className="rounded-full h-12 px-8 text-sm font-bold text-neutral-600 hover:text-foreground">
                    <Link href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer">
                      Live Preview <Globe className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-20 bg-neutral-50 rounded-[40px] border border-dashed border-neutral-200">
            <Layers className="w-12 h-12 text-neutral-200 mb-4" />
            <p className="text-neutral-600 font-medium">No featured projects found for {activeCategory?.label}.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}