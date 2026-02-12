"use client"

import { cn } from "@/lib/utils"

/**
 * Decorative ambient shapes that float gently in the background.
 * Pure CSS animations — no JS overhead.
 */
export function FloatingShapes({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Large blurred circle — slow drift */}
      <div
        className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-foreground/[0.02] animate-drift"
        style={{ animationDelay: "0s" }}
      />

      {/* Smaller circle — gentle float */}
      <div
        className="absolute top-1/3 -left-16 w-48 h-48 rounded-full bg-foreground/[0.018] animate-float"
        style={{ animationDelay: "2s" }}
      />

      {/* Subtle ring — slow drift with different timing */}
      <div
        className="absolute bottom-12 right-1/4 w-32 h-32 rounded-full border border-foreground/[0.04] animate-drift"
        style={{ animationDelay: "4s", animationDuration: "12s" }}
      />
    </div>
  )
}
