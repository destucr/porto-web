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
      <div className="relative pl-6 md:pl-8 border-l-2 border-primary/20 space-y-8 py-2">
        
        {/* Current Role Node */}
        <div className="relative">
          {/* Centered Indicator */}
          <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-sm z-10" />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest">
                <Sparkles className="w-2.5 h-2.5" /> Now
              </span>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <Image 
                  src="/images/bullion-logo.png" 
                  alt="Bullion Ecosystem International" 
                  fill
                  className="object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div className="space-y-1 pt-1">
                <h3 className="font-bold text-xl text-foreground leading-tight tracking-tight">iOS Developer</h3>
                <p className="text-sm text-muted-foreground font-medium">Bullion Ecosystem International</p>
                <div className="flex flex-wrap gap-1.5 pt-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">UIKit</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">SwiftUI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View / Mobile Collapsible */}
        <div className="space-y-8">
          <div className="hidden lg:block h-px bg-gradient-to-r from-border/60 to-transparent" />
          
          {/* Mobile Toggle */}
          <button 
            className="lg:hidden flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Education & Specialties"}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className={cn(
            "space-y-8 transition-all duration-500 overflow-hidden lg:overflow-visible lg:max-h-none",
            isExpanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0 lg:opacity-100"
          )}>
            
            {/* Combined Education Node */}
            <div className="relative">
              {/* Centered Indicator */}
              <div className="absolute -left-[31px] md:-left-[39px] top-0 w-4 h-4 rounded-full bg-neutral-200 border-4 border-background z-10" />
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Education & Training</span>
                </div>

                <div className="space-y-6">
                  {/* Academy */}
                  <div className="flex items-center gap-6 group">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <Image 
                        src="/images/apple-developer-academy-binus.png" 
                        alt="Apple Developer Academy @ BINUS" 
                        fill
                        className="object-contain opacity-90 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-sm leading-tight">Apple Developer Academy @ BINUS</h4>
                      <p className="text-xs text-muted-foreground font-medium">Graduate Cohort 2025</p>
                    </div>
                  </div>

                  {/* University */}
                  <div className="flex items-center gap-6 group">
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <Image 
                        src="/images/telkom-university-logo.png" 
                        alt="Telkom University" 
                        fill
                        className="object-contain opacity-90 grayscale group-hover:grayscale-0 transition-all group-hover:scale-110"
                      />
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
                <Code2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/80">Specialized Focus</span>
              </div>
              
              <div className="space-y-5 pl-1">
                {[
                  { title: "iOS Engineering", tech: ["UIKit", "SwiftUI"], desc: "Native interfaces & complex app lifecycles." },
                  { title: "Backend", tech: ["Go", "PostgreSQL"], desc: "Concurrent services & robust data systems." },
                  { title: "DevOps", tech: ["Docker", "Cloudflare"], desc: "Automated deployment & edge infrastructure." }
                ].map((item, i) => (
                  <div key={i} className="group space-y-1 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</span>
                      <div className="flex gap-1">
                        {item.tech.map(t => (
                          <span key={t} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">{t}</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug max-w-[240px]">{item.desc}</p>
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