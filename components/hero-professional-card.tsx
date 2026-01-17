"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Briefcase, GraduationCap, Code2, Sparkles, School } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfessionalCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="lg:col-span-2 w-full">
      <div className="relative pl-4 md:pl-5 border-l-2 border-primary/20 space-y-6 py-1">
        
        {/* Current Role Node */}
        <div className="relative">
          {/* Node Indicator */}
          <div className="absolute -left-[25px] md:-left-[32px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm z-10" />
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest">
                <Sparkles className="w-2.5 h-2.5" /> Now
              </span>
            </div>

            <div className="flex items-start gap-5 group">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-secondary/50 flex items-center justify-center border border-border/50 shadow-sm transition-all group-hover:shadow-md group-hover:border-primary/20">
                <Image 
                  src="/images/bullion-logo.png" 
                  alt="Bullion Ecosystem International" 
                  fill
                  className="object-contain p-2.5"
                />
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="font-semibold text-lg text-foreground leading-tight">iOS Developer</h3>
                <p className="text-sm text-muted-foreground">Bullion Ecosystem International</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View / Mobile Collapsible */}
        <div className="space-y-6">
          <div className="hidden lg:block h-px bg-gradient-to-r from-border/60 to-transparent" />
          
          {/* Mobile Toggle for Education/Tech */}
          <button 
            className="lg:hidden flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Education & Tech"}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={cn(
            "space-y-8 transition-all duration-500 overflow-hidden lg:overflow-visible lg:max-h-none",
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
          )}>
            
            {/* Combined Education Node */}
            <div className="relative">
              <div className="absolute -left-[25px] md:-left-[32px] top-0 w-4 h-4 rounded-full bg-secondary border-4 border-background z-10" />
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Education & Training</span>
                </div>

                <div className="space-y-5">
                  {/* Academy */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center border border-border/40 shrink-0 group-hover:bg-secondary/50 transition-colors">
                      <Image 
                        src="/images/apple-developer-academy-binus.png" 
                        alt="Apple Developer Academy @ BINUS" 
                        width={40} 
                        height={40}
                        className="opacity-90 grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm leading-tight">Apple Developer Academy @ BINUS</h4>
                      <p className="text-xs text-muted-foreground font-medium">Graduate Cohort 2025</p>
                    </div>
                  </div>

                  {/* University */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/30 flex items-center justify-center border border-border/40 shrink-0 group-hover:bg-secondary/50 transition-colors">
                      <div className="relative w-10 h-10">
                        <Image 
                          src="/images/telkom-university-logo.png" 
                          alt="Telkom University" 
                          fill
                          className="opacity-90 grayscale group-hover:grayscale-0 transition-all object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-semibold text-sm leading-tight">Telkom University</h4>
                      <p className="text-xs text-muted-foreground font-medium">Software Engineering (Exp. 2026)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-border/60 to-transparent" />

            {/* Specialized Focus */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-3 h-3 text-muted-foreground" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Specialized Focus</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  { title: "iOS", tech: ["Swift", "SwiftUI"], desc: "Fluid, high-performance declarative UI." },
                  { title: "Systems", tech: ["Go"], desc: "Concurrent services & system tools." },
                  { title: "Intelligence", tech: ["Core ML"], desc: "On-device CV & audio analysis." }
                ].map((item, i) => (
                  <div key={i} className="group p-2.5 rounded-xl bg-secondary/10 border border-border/40 hover:border-primary/30 transition-all">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[11px] font-bold text-foreground">{item.title}</span>
                      <div className="flex gap-1">
                        {item.tech.map(t => (
                          <span key={t} className="text-[8px] font-bold px-1.5 py-0.5 rounded-md bg-background/50 border border-border/40">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
