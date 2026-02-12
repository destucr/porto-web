"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*──────────────────────────────────────────────────────────
  Simplex-style 2D noise (self-contained, no dependencies)
──────────────────────────────────────────────────────────*/
const GRAD = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
]

function buildPerm() {
  const p = Array.from({ length: 256 }, (_, i) => i)
  let seed = 42
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807 + 0) % 2147483647
    const j = seed % (i + 1)
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  return [...p, ...p]
}

const perm = buildPerm()

function noise2D(x: number, y: number): number {
  const F2 = 0.5 * (Math.sqrt(3) - 1)
  const G2 = (3 - Math.sqrt(3)) / 6
  const s = (x + y) * F2
  const i = Math.floor(x + s)
  const j = Math.floor(y + s)
  const t = (i + j) * G2
  const X0 = i - t
  const Y0 = j - t
  const x0 = x - X0
  const y0 = y - Y0
  const i1 = x0 > y0 ? 1 : 0
  const j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + G2
  const y1 = y0 - j1 + G2
  const x2 = x0 - 1 + 2 * G2
  const y2 = y0 - 1 + 2 * G2
  const ii = i & 255
  const jj = j & 255

  let n0 = 0, n1 = 0, n2 = 0
  let t0 = 0.5 - x0 * x0 - y0 * y0
  if (t0 > 0) {
    t0 *= t0
    const g = GRAD[perm[ii + perm[jj]] % 8]
    n0 = t0 * t0 * (g[0] * x0 + g[1] * y0)
  }
  let t1 = 0.5 - x1 * x1 - y1 * y1
  if (t1 > 0) {
    t1 *= t1
    const g = GRAD[perm[ii + i1 + perm[jj + j1]] % 8]
    n1 = t1 * t1 * (g[0] * x1 + g[1] * y1)
  }
  let t2 = 0.5 - x2 * x2 - y2 * y2
  if (t2 > 0) {
    t2 *= t2
    const g = GRAD[perm[ii + 1 + perm[jj + 1]] % 8]
    n2 = t2 * t2 * (g[0] * x2 + g[1] * y2)
  }
  return 70 * (n0 + n1 + n2)
}

/*──────────────────────────────────────────────────────────
  Halftone Canvas — crisp dot grid with content-aware
  exclusion. Dots organically shrink to nothing around
  a referenced DOM element.
──────────────────────────────────────────────────────────*/
interface AuroraCanvasProps {
  className?: string
  /** Ref to a DOM element — dots will clear around it */
  excludeRef?: React.RefObject<HTMLElement | null>
}

export function AuroraCanvas({ className, excludeRef }: AuroraCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rafRef = React.useRef(0)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const DOT_SPACING = 18
    const MAX_RADIUS = DOT_SPACING * 0.42
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const FADE_MARGIN = 60 // px — how far outside the box dots start reappearing

    let cssW = 0
    let cssH = 0

    // Exclusion zone (relative to canvas top-left)
    let exRect: { x: number; y: number; w: number; h: number } | null = null

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      cssW = rect.width
      cssH = rect.height
      canvas!.width = Math.round(cssW * dpr)
      canvas!.height = Math.round(cssH * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      updateExclusionRect()
    }

    function updateExclusionRect() {
      if (!excludeRef?.current || !canvas) {
        exRect = null
        return
      }
      const cr = canvas.getBoundingClientRect()
      const er = excludeRef.current.getBoundingClientRect()
      exRect = {
        x: er.left - cr.left,
        y: er.top - cr.top,
        w: er.width,
        h: er.height,
      }
    }

    resize()
    window.addEventListener("resize", resize)

    function isDark() {
      return document.documentElement.classList.contains("dark")
    }

    // How much a dot is suppressed by the exclusion zone (0 = full, 1 = none)
    function exclusionFactor(px: number, py: number): number {
      if (!exRect) return 1

      // Signed distance from the exclusion box edge (negative = inside)
      const dx = Math.max(exRect.x - px, 0, px - (exRect.x + exRect.w))
      const dy = Math.max(exRect.y - py, 0, py - (exRect.y + exRect.h))
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Inside the box?
      if (px >= exRect.x && px <= exRect.x + exRect.w &&
          py >= exRect.y && py <= exRect.y + exRect.h) {
        return 0
      }

      // Fade zone
      if (dist < FADE_MARGIN) {
        const t = dist / FADE_MARGIN
        return t * t // ease-in: dots grow slowly at edge, then pop
      }

      return 1
    }

    // Color palettes
    const lightColors = [
      [237, 92, 92],    // #ED5C5C
      [254, 166, 16],   // #FEA610
      [245, 201, 89],   // #F5C959
      [240, 237, 209],  // #F0EDD1
      [223, 255, 247],  // #DFFFF7
      [217, 242, 229],  // #D9F2E5
      [216, 239, 230],  // #D8EFE6
      [209, 223, 232],  // #D1DFE8
    ]
    const darkColors = [
      [0, 0, 0],        // #000000
      [10, 10, 20],     // #0A0A14
      [15, 15, 31],     // #0F0F1F
      [20, 20, 46],     // #14142E
      [26, 26, 61],     // #1A1A3D
      [31, 31, 71],     // #1F1F47
      [36, 36, 82],     // #242452
      [61, 61, 102],    // #3D3D66
      [92, 92, 143],    // #5C5C8F
    ]

    function draw() {
      if (!mq.matches) {
        timeRef.current += 0.003
      }
      const t = timeRef.current
      const dark = isDark()

      // Re-read exclusion rect each frame (handles scroll, layout shifts)
      updateExclusionRect()

      ctx!.fillStyle = dark ? "#141414" : "#FAFAF8"
      ctx!.fillRect(0, 0, cssW, cssH)

      const cols = Math.ceil(cssW / DOT_SPACING) + 1
      const rows = Math.ceil(cssH / DOT_SPACING) + 1
      const palette = dark ? darkColors : lightColors

      const batches: Map<string, Array<[number, number, number]>> = new Map()

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = col * DOT_SPACING
          const cy = row * DOT_SPACING

          // Content-aware exclusion
          const ef = exclusionFactor(cx, cy)
          if (ef < 0.01) continue

          const nx = cx / cssW
          const ny = cy / cssH

          const n1 = noise2D(nx * 2.5 + t * 0.4, ny * 2.5 + t * 0.25)
          const n2 = noise2D(nx * 4 + t * 0.2 + 50, ny * 3 - t * 0.15 + 50)

          const raw = (n1 * 0.65 + n2 * 0.35 + 1) * 0.5
          const size = raw * raw

          const radius = size * MAX_RADIUS * ef
          if (radius < 0.5) continue

          const nc = noise2D(nx * 1.5 + t * 0.15 + 200, ny * 1.5 - t * 0.1 + 200)
          const colorIdx = Math.floor(((nc + 1) * 0.5) * palette.length) % palette.length
          const c = palette[colorIdx]

          const alpha = dark
            ? (0.35 + size * 0.55) * ef
            : (0.30 + size * 0.50) * ef
          const key = `rgba(${c[0]},${c[1]},${c[2]},${alpha.toFixed(2)})`

          if (!batches.has(key)) batches.set(key, [])
          batches.get(key)!.push([cx, cy, radius])
        }
      }

      const TAU = Math.PI * 2
      for (const [color, dots] of batches) {
        ctx!.fillStyle = color
        ctx!.beginPath()
        for (const [x, y, r] of dots) {
          ctx!.moveTo(x + r, y)
          ctx!.arc(x, y, r, 0, TAU)
        }
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    if (mq.matches) {
      draw()
    } else {
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [excludeRef])

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full",
        className
      )}
      aria-hidden="true"
    />
  )
}
