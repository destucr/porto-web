"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, GraduationCap, Code2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProfessionalCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="lg:col-span-2 w-full">
      <div className="relative pl-6 md:pl-8 border-l-2 border-primary/20 space-y-10 py-2">
        
        {/* Current Role Node */}
        <div className="relative">
          {/* Node Indicator */}
          <div className="absolute -left-[31px] md:-left-[39px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm z-10" />
          
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" /> Now
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-6 group">
              <div className="relative w-20 h-20 rounded-3xl overflow-hidden bg-secondary/50 flex items-center justify-center border border-border/50 shadow-sm transition-all group-hover:scale-105 group-hover:border-primary/30 group-hover:shadow-md shrink-0">
                <Image 
                  src="/images/bullion-logo.png" 
                  alt="Bullion Ecosystem International" 
                  fill
                  className="object-contain p-3"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <h3 className="font-bold text-xl text-foreground leading-tight tracking-tight">iOS Developer</h3>
                <p className="text-sm text-muted-foreground font-medium">Bullion Ecosystem International</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary/5 text-primary border border-primary/10">UIKit</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/40">SwiftUI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View / Mobile Collapsible */}
        <div className="space-y-8">
          <div className="hidden lg:block h-px bg-gradient-to-r from-border/60 to-transparent" />
          
          {/* Mobile Toggle for Education/Tech */}
          <button 
            className="lg:hidden flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Education & Specialties"}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={cn(
            "space-y-10 transition-all duration-500 overflow-hidden lg:overflow-visible lg:max-h-none",
            isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
          )}>
            
            {/* Combined Education Node */}
            <div className="relative">
              <div className="absolute -left-[31px] md:-left-[39px] top-0 w-5 h-5 rounded-full bg-secondary border-4 border-background z-10" />
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Education & Training</span>
                </div>

                <div className="space-y-6">
                  {/* Academy */}
                  <div className="flex items-center gap-5 group">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center border border-border/40 shrink-0 group-hover:bg-secondary/50 transition-all">
                      <Image 
                        src="/images/apple-developer-academy-binus.png" 
                        alt="Apple Developer Academy @ BINUS" 
                        width={44} 
                        height={44}
                        className="opacity-90 grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm leading-tight">Apple Developer Academy @ BINUS</h4>
                      <p className="text-xs text-muted-foreground font-medium">Graduate Cohort 2025</p>
                    </div>
                  </div>

                  {/* University */}
                  <div className="flex items-center gap-5 group">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/30 flex items-center justify-center border border-border/40 shrink-0 group-hover:bg-secondary/50 transition-all">
                      <div className="relative w-11 h-11">
                        <Image 
                          src="/images/telkom-university-logo.png" 
                          alt="Telkom University" 
                          fill
                          className="opacity-90 grayscale group-hover:grayscale-0 transition-all object-contain"
                        />
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm leading-tight">Telkom University</h4>
                      <p className="text-xs text-muted-foreground font-medium">Software Engineering (Exp. 2026)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-border/60 to-transparent" />

            {/* Specialized Focus */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">Specialized Focus</span>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { title: "iOS Engineering", tech: ["UIKit", "SwiftUI"], desc: "High-performance interfaces & complex app lifecycles." },
                  { title: "Systems Architecture", tech: ["Go"], desc: "Concurrent services and transit-scale data processing." },
                  { title: "On-Device Intelligence", tech: ["Core ML"], desc: "Edge-computed vision and audio analysis models." }
                ].map((item, i) => (
                  <div key={i} className="group p-3.5 rounded-2xl bg-secondary/10 border border-border/40 hover:border-primary/20 hover:bg-secondary/20 transition-all">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-foreground">{item.title}</span>
                      <div className="flex gap-1">
                        {item.tech.map(t => (
                          <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-background/50 border border-border/40">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-normal">{item.desc}</p>
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