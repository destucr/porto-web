"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/*──────────────────────────────────────────────────────────
  Simplex-style 2D noise (self-contained, no dependencies)
  Based on the open-source reference implementation.
──────────────────────────────────────────────────────────*/
const GRAD = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
]

function buildPerm() {
  const p = Array.from({ length: 256 }, (_, i) => i)
  // Fisher-Yates with a fixed seed for determinism
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
  return 70 * (n0 + n1 + n2) // range ≈ -1..1
}

/*──────────────────────────────────────────────────────────
  Aurora Canvas Component
──────────────────────────────────────────────────────────*/
interface AuroraCanvasProps {
  className?: string
}

export function AuroraCanvas({ className }: AuroraCanvasProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const rafRef = React.useRef(0)
  const timeRef = React.useRef(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Respect reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Render at reduced resolution for performance
    const SCALE = 3 // each "pixel" is 3x3 CSS pixels
    let w = 0
    let h = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      w = Math.ceil(rect.width / SCALE)
      h = Math.ceil(rect.height / SCALE)
      canvas!.width = w
      canvas!.height = h
    }

    resize()
    window.addEventListener("resize", resize)

    // Detect theme
    function isDark() {
      return document.documentElement.classList.contains("dark")
    }

    function draw() {
      timeRef.current += 0.003 // slow drift
      const t = timeRef.current
      const dark = isDark()

      const imageData = ctx!.createImageData(w, h)
      const data = imageData.data

      for (let y = 0; y < h; y++) {
        const ny = y / h
        for (let x = 0; x < w; x++) {
          const nx = x / w
          const idx = (y * w + x) * 4

          // Layer 1: large-scale flow
          const n1 = noise2D(nx * 2.5 + t * 0.4, ny * 1.8 + t * 0.25)
          // Layer 2: medium detail
          const n2 = noise2D(nx * 5 + t * 0.3 + 100, ny * 4 + t * 0.15 + 100)
          // Layer 3: fine shimmer
          const n3 = noise2D(nx * 10 - t * 0.5, ny * 8 - t * 0.2)

          // Combine layers
          const v = n1 * 0.55 + n2 * 0.3 + n3 * 0.15 // range ~-1..1
          const nv = (v + 1) * 0.5 // normalize to 0..1

          // Vertical fade: aurora concentrated in upper half
          const vertFade = 1 - ny * ny * 0.6

          // Final intensity
          const intensity = nv * vertFade

          if (dark) {
            // Dark mode: deep indigo / teal / faint emerald
            const r = Math.floor(20 + intensity * 35)
            const g = Math.floor(20 + intensity * 55)
            const b = Math.floor(25 + intensity * 70)
            data[idx] = r
            data[idx + 1] = g
            data[idx + 2] = b
          } else {
            // Light mode: warm off-white with faint peach / lavender veins
            const base = 250  // near-white base
            const r = Math.floor(base - intensity * 12)
            const g = Math.floor(base - intensity * 16)
            const b = Math.floor(base - intensity * 8)
            data[idx] = r
            data[idx + 1] = g
            data[idx + 2] = b
          }
          data[idx + 3] = 255
        }
      }

      ctx!.putImageData(imageData, 0, 0)
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
      style={{ imageRendering: "auto" }}
      aria-hidden="true"
    />
  )
}
