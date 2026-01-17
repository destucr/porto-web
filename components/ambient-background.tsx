"use client"

import { useEffect, useRef } from "react"

/**
 * Ambient Background - "Soft Paper" Edition
 * 
 * Creates a warm, organic, almost paper-like texture.
 * Moves away from "digital/tech" blue orbs to warm, earthen tones.
 */
export function AmbientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const translateY = scrollY * 0.05 
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
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#FAF9F6] dark:bg-[#1a1918]"
      aria-hidden="true"
    >
      {/* Warm Light Wash */}
      <div 
        className="absolute -top-[20%] -right-[10%] w-[90vw] h-[90vw] rounded-full opacity-40 blur-[120px] mix-blend-multiply dark:mix-blend-soft-light"
        style={{
          background: "radial-gradient(circle, rgba(230, 225, 215, 0.8) 0%, transparent 70%)",
          animation: "drift-slow 60s ease-in-out infinite alternate",
        }}
      />
      
      {/* Soft Shadow Wash */}
      <div 
        className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[80vw] rounded-full opacity-30 blur-[100px] mix-blend-multiply dark:mix-blend-soft-light"
        style={{
          background: "radial-gradient(circle, rgba(215, 210, 200, 0.6) 0%, transparent 70%)",
          animation: "drift-slow 75s ease-in-out infinite alternate-reverse",
        }}
      />

      {/* Grain Texture - Essential for "Paper" feel */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
