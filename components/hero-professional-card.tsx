"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, GraduationCap, Code2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfessionalCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="lg:col-span-2 w-full lg:pl-12">
      <div className="relative pl-6 md:pl-8 border-l border-border/60 space-y-12 py-2">
        
        {/* Current Role Node */}
        <div className="relative">
          {/* Subtle Indicator */}
          <div className="absolute -left-[29px] md:-left-[37px] top-2 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background z-10" />
          
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                Current Focus
              </span>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <Image 
                  src="/images/bullion-logo.webp" 
                  alt="Bullion Ecosystem International" 
                  fill
                  priority
                  className="object-contain transition-opacity group-hover:opacity-80"
                />
              </div>
              <div className="space-y-1">
                <h2 className="font-bold text-lg text-foreground leading-tight tracking-tight">iOS Developer</h2>
                <p className="text-sm text-muted-foreground font-normal">Bullion Ecosystem International</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[9px] font-medium text-muted-foreground border-b border-border">UIKit</span>
                  <span className="text-[9px] font-medium text-muted-foreground border-b border-border">SwiftUI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education & specialties */}
        <div className="space-y-10">
          {/* Combined Education Node */}
          <div className="relative">
            {/* Subtle Indicator */}
            <div className="absolute -left-[29px] md:-left-[37px] top-1 w-3 h-3 rounded-full bg-border ring-4 ring-background z-10" />
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Professional Background</span>
              </div>

              <div className="space-y-8">
                {/* Academy */}
                <div className="flex items-center gap-6 group">
                  <div className="relative w-10 h-10 flex items-center justify-center shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    <Image 
                      src="/images/apple-developer-academy-binus.webp" 
                      alt="Apple Developer Academy @ BINUS" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm leading-tight text-foreground/90">Apple Developer Academy</h3>
                    <p className="text-[11px] text-muted-foreground">Cohort 2025 Graduate</p>
                  </div>
                </div>

                {/* University */}
                <div className="flex items-center gap-6 group">
                  <div className="relative w-10 h-10 flex items-center justify-center shrink-0 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                    <Image 
                      src="/images/telkom-university-logo.webp" 
                      alt="Telkom University" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm leading-tight text-foreground/90">Telkom University</h3>
                    <p className="text-[11px] text-muted-foreground">Software Engineering (2026)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Expertise</span>
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "iOS Engineering", tech: "UIKit • SwiftUI", desc: "Complex app lifecycles." },
                { title: "Full-Stack", tech: "Go • Next.js", desc: "Scalable data systems." }
              ].map((item, i) => (
                <div key={i} className="group space-y-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-bold text-foreground/90">{item.title}</span>
                    <span className="text-[10px] font-medium text-muted-foreground/60 whitespace-nowrap">{item.tech}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}