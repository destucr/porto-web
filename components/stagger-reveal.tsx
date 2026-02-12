"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay between each child in ms. Default 80 */
  staggerMs?: number
  /** Base delay before the first child starts. Default 0 */
  baseDelay?: number
}

/**
 * Wraps each direct child with an individual staggered entrance animation.
 * Each child fades-up independently with increasing delay, creating a
 * cascade effect when the container enters the viewport.
 */
export function StaggerReveal({
  children,
  className,
  staggerMs = 80,
  baseDelay = 0,
}: StaggerRevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items = React.Children.toArray(children)

  return (
    <div ref={containerRef} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          className={cn(
            "transition-all duration-600 ease-out",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          )}
          style={{
            transitionDelay: isVisible
              ? `${baseDelay + i * staggerMs}ms`
              : "0ms",
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
