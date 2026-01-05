"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, Monitor, Cpu, Play, Layers, Code2, ArrowRight, X, RefreshCw, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  tags: readonly string[]
  videoUrl?: string
  screenshots: readonly string[]
  details: string
  demoUrl?: string
}

interface InteractiveShowcaseProps {
  projects: Project[]
}

const CATEGORIES = [
  { id: "mobile", label: "Mobile Engineering", icon: Smartphone, tag: "ios" },
  { id: "web", label: "Full-Stack Systems", icon: Monitor, tag: "web" },
  { id: "ai", label: "On-Device AI", icon: Cpu, tag: "machine learning" },
]

export function InteractiveShowcase({ projects }: InteractiveShowcaseProps) {
  const [activeTab, setActiveTab] = React.useState(CATEGORIES[0].id)
  const [isInteractive, setIsInteractive] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  // Reset interactive state when tab changes
  React.useEffect(() => {
    setIsInteractive(false)
  }, [activeTab])

  // Handle dynamic scaling
  React.useEffect(() => {
    if (!containerRef.current) return
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    const obs = new ResizeObserver(updateWidth)
    obs.observe(containerRef.current)
    updateWidth()
    return () => obs.disconnect()
  }, [])

  const activeProject = React.useMemo(() => {
    const category = CATEGORIES.find(c => c.id === activeTab)
    return projects.find(p => p.tags.some(t => t.toLowerCase() === category?.tag ||
      (category?.id === "web" && (t.toLowerCase() === "go" || t.toLowerCase() === "react")) ||
      (category?.id === "ai" && (t.toLowerCase() === "create ml" || t.toLowerCase() === "computer vision"))
    ))
  }, [activeTab, projects])

  if (!activeProject) return null

  const isMobileProject = activeProject.tags.some(t => t.toLowerCase() === "ios")

  // Process tech highlights outside JSX to avoid parser issues
  const techHighlights = activeProject.details
    .split('\n')
    .filter(l => l.trim().startsWith('-'))
    .slice(0, 3)
    .map(line => line.replace('-', '').replace(/\*\*/g, '').trim())

  return (
    <div className="space-y-8">
      {/* iOS Style Segmented Control */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-muted rounded-2xl border shadow-inner w-full max-w-2xl">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-all rounded-xl",
                activeTab === category.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
              )}
            >
              {activeTab === category.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-background rounded-xl shadow-sm border"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <category.icon className="h-4 w-4 relative z-10" />
              <span className="relative z-10 hidden sm:inline">{category.label}</span>
              <span className="relative z-10 sm:hidden">{category.label.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Feature Area */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Media Player */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              ref={containerRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={cn(
                "group relative transition-all duration-500 mx-auto bg-zinc-950 ring-1 ring-white/10 shadow-2xl overflow-hidden",
                isMobileProject
                  ? "aspect-[9/19.5] w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-zinc-800"
                  : "aspect-video w-full rounded-2xl border border-zinc-800"
              )}
            >
              {isMobileProject && (
                <div className="absolute top-0 inset-x-0 h-10 z-30 pointer-events-none flex justify-center">
                  <div className="mt-3 w-24 h-6 bg-black rounded-full shadow-inner" />
                </div>
              )}

              {/* Interactive Viewport Container */}
              <div
                className="absolute inset-0 z-40 bg-zinc-50 flex flex-col overflow-hidden transition-all duration-500 origin-center shadow-2xl"
                style={{
                  opacity: isInteractive ? 1 : 0,
                  pointerEvents: isInteractive ? 'auto' : 'none',
                  transform: isInteractive ? 'scale(1)' : 'scale(0.95)'
                }}
              >
                {/* Browser Header */}
                <div className="h-10 bg-zinc-900 border-b border-white/10 flex items-center px-4 justify-between gap-4 shrink-0 rounded-t-2xl">
                  <div className="flex gap-1.5 items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsInteractive(false);
                      }}
                      className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-[200px] sm:max-w-md h-6 bg-black/40 rounded-md border border-white/5 flex items-center px-3 gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-zinc-400 font-medium truncate">
                      {activeProject.demoUrl?.startsWith('/') ? `localhost:3000${activeProject.demoUrl}` : activeProject.demoUrl?.replace('https://', '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={activeProject.demoUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-white transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <RefreshCw className="h-3 w-3 text-zinc-500 hidden sm:block" />
                    <button onClick={(e) => {
                      e.stopPropagation();
                      setIsInteractive(false);
                    }}>
                      <X className="h-4 w-4 text-zinc-500 hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
                {/* Scaled Iframe Content */}
                <div className="flex-1 bg-white relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{
                      width: isMobileProject ? '375px' : '1440px',
                      height: isMobileProject ? '812px' : '900px',
                      transform: `scale(${isMobileProject ? (containerWidth / 375) : (containerWidth / 1440)})`,
                    }}
                  >
                    {isInteractive && activeProject.demoUrl && (
                      <iframe
                        src={activeProject.demoUrl}
                        className="w-full h-full border-0"
                        title={`${activeProject.title} Demo`}
                      />
                    )}
                  </div>
                </div>
              </div>

              {activeProject.videoUrl ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={cn(
                    "w-full h-full",
                    isMobileProject ? "object-cover" : "object-cover"
                  )}
                  src={activeProject.videoUrl}
                />
              ) : (
                <Image
                  src={activeProject.image}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
              )}

              {/* Overlay removed as requested to keep video clean */}
            </motion.div>
          </AnimatePresence>

          {/* Relocated Launch Button for better visibility and to keep thumbnail clean */}
          {activeProject.demoUrl && (
            <div className="mt-6 flex justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => setIsInteractive(true)}
                className="w-full sm:w-fit rounded-full font-bold h-14 shadow-xl hover:shadow-2xl transition-all group bg-primary text-primary-foreground"
              >
                Launch Interactive Preview <Play className="ml-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          )}
        </div>

        {/* Right Side: Technical Context */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <motion.div
              key={`${activeProject.id}-header`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Featured Project</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{activeProject.title}</h3>
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed line-clamp-3">
                {activeProject.description}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-2 pt-2">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-muted border text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Layers className="h-3 w-3" /> Stack
                </div>
                <p className="text-sm font-bold">
                  {isMobileProject ? "iOS / SwiftUI" : "Go / React"}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <Code2 className="h-3 w-3" /> Focus
                </div>
                <p className="text-sm font-bold truncate">
                  {activeProject.tags[1] || "Engineering"}
                </p>
              </div>
            </div>

            <div className="space-y-4 bg-muted/30 p-6 rounded-2xl border border-dashed">
              <h4 className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-primary">
                <Play className="h-3 w-3" /> Tech Deep Dive
              </h4>
              <ul className="space-y-3">
                {techHighlights.map((highlight, i) => (
                  <li key={i} className="text-sm text-foreground/80 flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" />
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild size="lg" variant="outline" className="w-full rounded-full font-bold h-14 shadow-sm hover:shadow-md transition-all group">
                <Link href={`/projects/${activeProject.slug}`}>
                  {activeProject.demoUrl ? "View Technical Report" : "View Full Technical Report"} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Screen Glance */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">App Flow Glance</h4>
          <div className="h-px flex-1 bg-muted mx-4" />
        </div>
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 p-1">
            {activeProject.screenshots.map((screen, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "relative overflow-hidden border bg-muted/30 shadow-sm transition-all hover:border-primary/30 hover:shadow-md",
                  isMobileProject ? "h-56 aspect-[9/19.5] rounded-2xl" : "h-40 aspect-video rounded-xl"
                )}
              >
                <Image
                  src={screen}
                  alt={`Screenshot ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}