"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

// Horizontal swipe navigates between case studies. Ignores mostly-vertical
// gestures (scrolling) and anything starting in a no-swipe zone
// (screenshot gallery, video player) so those keep their own touch.
export function SwipeNav({
  prevHref,
  nextHref,
  children,
}: {
  prevHref: string | null
  nextHref: string | null
  children: React.ReactNode
}) {
  const router = useRouter()
  const start = React.useRef<{ x: number; y: number } | null>(null)

  function onTouchStart(e: React.TouchEvent) {
    const t = e.touches[0]
    const el = e.target as HTMLElement
    if (el.closest("[data-noswipe]")) {
      start.current = null
      return
    }
    start.current = { x: t.clientX, y: t.clientY }
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (!start.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - start.current.x
    const dy = t.clientY - start.current.y
    start.current = null
    if (Math.abs(dx) < 72 || Math.abs(dx) < Math.abs(dy) * 1.5) return
    if (dx < 0 && nextHref) router.push(nextHref)
    else if (dx > 0 && prevHref) router.push(prevHref)
  }

  if (!prevHref && !nextHref) return <>{children}</>

  return (
    <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      {children}
    </div>
  )
}
