"use client"

import * as React from "react"
import { Play, X, RefreshCw, ExternalLink } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  title: string
  image: string
  videoUrl?: string
  demoUrl?: string
  tags?: readonly string[]
}

interface ProjectShowcaseProps {
  project: Project
}

export function ProjectShowcase({ project }: ProjectShowcaseProps) {
  const [isInteractive, setIsInteractive] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = React.useState(0)

  const isMobileProject = project.tags?.some(t => t.toLowerCase() === "ios" || t.toLowerCase() === "mobile")
  const isGameProject = project.tags?.some(t => t.toLowerCase() === "spritekit")
  const isLandscapeFormat = isGameProject // Games use landscape format

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

  if (!project.demoUrl) {
    return (
      <div className={cn(
        "group relative transition-all duration-500 mx-auto bg-zinc-950 ring-1 ring-white/10 shadow-2xl overflow-hidden",
        isLandscapeFormat
          ? "aspect-video w-full rounded-2xl border border-zinc-800"
          : isMobileProject
            ? "aspect-[9/19.5] w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-zinc-800"
            : "aspect-video w-full rounded-2xl border border-zinc-800"
      )}>
        {isMobileProject && !isLandscapeFormat && (
          <div className="absolute top-0 inset-x-0 h-10 z-30 pointer-events-none flex justify-center">
            <div className="mt-3 w-24 h-6 bg-black rounded-full shadow-inner" />
          </div>
        )}
        {project.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={project.videoUrl}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        ref={containerRef}
        className={cn(
          "group relative transition-all duration-500 mx-auto bg-zinc-950 ring-1 ring-white/10 shadow-2xl overflow-hidden",
          isLandscapeFormat
            ? "aspect-video w-full rounded-2xl border border-zinc-800"
            : isMobileProject
              ? "aspect-[9/19.5] w-full max-w-[300px] rounded-[2.5rem] border-[6px] border-zinc-800"
              : "aspect-video w-full rounded-2xl border border-zinc-800"
        )}
      >
        {isMobileProject && !isLandscapeFormat && (
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
                {project.demoUrl.startsWith('/')
                  ? `${typeof window !== 'undefined' ? window.location.host : 'localhost:3000'}${project.demoUrl}`
                  : project.demoUrl.replace('https://', '')}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={project.demoUrl}
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
              {isInteractive && (
                <iframe
                  src={project.demoUrl}
                  className="w-full h-full border-0"
                  title={`${project.title} Demo`}
                />
              )}
            </div>
          </div>
        </div>

        {project.videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={project.videoUrl}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image available</span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={() => setIsInteractive(true)}
          className="w-full sm:w-fit rounded-full font-bold h-14 shadow-xl hover:shadow-2xl transition-all group bg-primary text-primary-foreground"
        >
          {isInteractive ? "Reload Interactive Preview" : "Launch Interactive Preview"}
          <Play className="ml-2 h-4 w-4 fill-current group-hover:scale-110 transition-transform" />
        </Button>
      </div>
    </div>
  )
}
