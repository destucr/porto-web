"use client"

import { useEffect, useRef } from "react"

/**
 * Ambient Background
 * 
 * Creates a layered, slowly-moving gradient mesh that provides depth
 * without distraction. The motion is subliminal - you feel it more than see it.
 * 
 * Design principles:
 * - Cool neutral palette with subtle blue undertones
 * - Multiple gradient layers at different speeds create parallax depth
 * - Asymmetric blob positions create visual tension
 * - 60s+ animation cycles feel like breathing, not animation
 */
export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Subtle parallax on scroll - background moves slower than content
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const translateY = scrollY * 0.05 // Very subtle - 5% of scroll
          container.style.transform = `translateY(${translateY}px)`
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base layer - subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-50/20 dark:to-blue-950/10" />
      
      {/* Primary orb - top right, slow drift */}
      <div 
        className="absolute -top-[40%] -right-[20%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full opacity-[0.03] dark:opacity-[0.05]"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.1 240) 0%, transparent 70%)",
          animation: "drift-slow 80s ease-in-out infinite alternate",
        }}
      />
      
      {/* Secondary orb - bottom left, counter-drift */}
      <div 
        className="absolute -bottom-[30%] -left-[25%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-[0.02] dark:opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, oklch(0.6 0.08 220) 0%, transparent 70%)",
          animation: "drift-slow 90s ease-in-out infinite alternate-reverse",
        }}
      />
      
      {/* Tertiary orb - mid-page accent, creates depth */}
      <div 
        className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full opacity-[0.015] dark:opacity-[0.03]"
        style={{
          background: "radial-gradient(circle, oklch(0.75 0.05 200) 0%, transparent 60%)",
          animation: "drift-subtle 70s ease-in-out infinite alternate",
        }}
      />

      {/* Noise texture overlay - very subtle grain */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
