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
  Performance-optimized halftone canvas.

  Key optimizations vs. previous version:
  1. Increased dot spacing (10px vs 7px) → ~50% fewer dots
  2. Single noise call per dot for color (removed 3rd noise)
  3. Direct arc() + fill() batched by color bucket
     instead of per-dot drawImage with offscreen sprites
  4. Renders every 2nd frame (30fps is smooth for slow drift)
  5. Pre-computed inverse dimensions to avoid per-dot division
──────────────────────────────────────────────────────────*/
interface AuroraCanvasProps {
  className?: string
}

function lerpColor(
  palette: number[][],
  t: number,
): [number, number, number] {
  const maxIdx = palette.length - 1
  const scaled = t * maxIdx
  const idx = Math.min(Math.floor(scaled), maxIdx - 1)
  const frac = scaled - idx
  const a = palette[idx]
  const b = palette[Math.min(idx + 1, maxIdx)]
  return [
    a[0] + (b[0] - a[0]) * frac,
    a[1] + (b[1] - a[1]) * frac,
    a[2] + (b[2] - a[2]) * frac,
  ]
}

export function AuroraCanvas({ className }: AuroraCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rafRef = React.useRef(0)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const DOT_SPACING = 10
    const MAX_RADIUS = DOT_SPACING * 0.48
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const TWO_PI = Math.PI * 2

    let cssW = 0
    let cssH = 0
    let frameCount = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      cssW = rect.width
      cssH = rect.height
      canvas!.width = Math.round(cssW * dpr)
      canvas!.height = Math.round(cssH * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      frameCount = 0 // force immediate redraw after resize
    }

    resize()
    window.addEventListener("resize", resize)

    function isDark() {
      return document.documentElement.classList.contains("dark")
    }

    // Color palettes — ordered for smooth gradient sampling
    const lightColors = [
      [230, 39, 22],    // #E62716
      [237, 64, 1],     // #ED4001
      [251, 159, 23],   // #FB9F17
      [246, 198, 83],   // #F6C653
      [237, 194, 82],   // #EDC252
      [236, 239, 213],  // #ECEFD5
      [222, 251, 241],  // #DEFBF1
      [200, 222, 225],  // #C8DEE1
      [190, 213, 219],  // #BED5DB
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

    // Bucket dots by quantized color, then batch-draw per bucket
    const COLOR_BUCKETS = 24

    function draw() {
      frameCount++
      // Render every 2nd frame (30fps) — animation is slow enough
      if (frameCount % 2 !== 0 && frameCount > 1) {
        rafRef.current = requestAnimationFrame(draw)
        return
      }

      if (!mq.matches) {
        // Advance by 2 frames worth since we skip every other
        timeRef.current += 0.006
      }
      const t = timeRef.current
      const dark = isDark()

      // Clear
      ctx!.fillStyle = dark ? "#141414" : "#FAFAF8"
      ctx!.fillRect(0, 0, cssW, cssH)

      const cols = Math.ceil(cssW / DOT_SPACING) + 1
      const rows = Math.ceil(cssH / DOT_SPACING) + 1
      const palette = dark ? darkColors : lightColors
      const invW = cssW > 0 ? 1 / cssW : 0
      const invH = cssH > 0 ? 1 / cssH : 0

      // Pre-allocate bucket arrays
      type Dot = { cx: number; cy: number; r: number }
      const buckets: { color: [number, number, number]; alpha: number; dots: Dot[] }[] = []
      for (let i = 0; i < COLOR_BUCKETS; i++) {
        const bT = i / (COLOR_BUCKETS - 1)
        const c = lerpColor(palette, bT)
        const baseAlpha = dark ? 0.45 : 0.40
        buckets.push({ color: c, alpha: baseAlpha, dots: [] })
      }

      for (let row = 0; row < rows; row++) {
        const cy = row * DOT_SPACING
        const ny = cy * invH
        for (let col = 0; col < cols; col++) {
          const cx = col * DOT_SPACING
          const nx = cx * invW

          // Single combined noise for size + color
          const n1 = noise2D(nx * 2.5 + t * 0.4, ny * 2.5 + t * 0.25)
          const n2 = noise2D(nx * 4 + t * 0.2 + 50, ny * 3 - t * 0.15 + 50)

          const raw = (n1 * 0.65 + n2 * 0.35 + 1) * 0.5
          const size = 0.35 + raw * 0.65

          const radius = size * MAX_RADIUS
          if (radius < 0.5) continue

          // Use n1 for color to avoid a 3rd noise call
          const colorT = (n1 + 1) * 0.5
          const bucketIdx = Math.min(
            Math.floor(colorT * COLOR_BUCKETS),
            COLOR_BUCKETS - 1
          )

          buckets[bucketIdx].dots.push({ cx, cy, r: radius })
        }
      }

      // Batch draw by color bucket — one fillStyle + beginPath per bucket
      for (let i = 0; i < COLOR_BUCKETS; i++) {
        const b = buckets[i]
        if (b.dots.length === 0) continue

        const [r, g, bl] = b.color
        ctx!.fillStyle = `rgba(${r | 0},${g | 0},${bl | 0},${b.alpha})`
        ctx!.beginPath()
        for (let j = 0; j < b.dots.length; j++) {
          const d = b.dots[j]
          ctx!.moveTo(d.cx + d.r, d.cy)
          ctx!.arc(d.cx, d.cy, d.r, 0, TWO_PI)
        }
        ctx!.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [])

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
