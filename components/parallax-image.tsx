"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  /** Parallax intensity: pixels of vertical shift at full scroll. Default 40 */
  intensity?: number
  priority?: boolean
}

/**
 * Scroll-linked parallax image. The image shifts vertically
 * relative to its container as the user scrolls, creating depth.
 * Uses requestAnimationFrame for smooth 60fps.
 * Respects prefers-reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  intensity = 40,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [offset, setOffset] = React.useState(0)
  const rafRef = React.useRef<number>(0)

  React.useEffect(() => {
    // Respect reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const windowH = window.innerHeight
        // progress: 0 when element enters bottom, 1 when it exits top
        const progress = 1 - (rect.top + rect.height) / (windowH + rect.height)
        // Clamp to 0-1 and center at 0.5 for neutral position
        const clamped = Math.max(0, Math.min(1, progress))
        setOffset((clamped - 0.5) * intensity)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // initial position
    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [intensity])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${offset}px) scale(1.08)`,
          transition: "transform 0.1s linear",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  )
}
