import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Plus, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPosts, getProjects } from "@/lib/content"
import { ProjectList } from "@/components/project-list"

export default async function Home() {
  const isAdmin = false 

  const allProjects = await getProjects()
  const featuredProjects = allProjects.slice(0, 4) // Show more projects for grid impact

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-mono selection:bg-primary selection:text-black">
      {/* Background Grid - Digital Brutalism */}
      <div className="fixed inset-0 bg-grid-lines opacity-[0.15] pointer-events-none z-0" />
      
      {/* Hero - Stark, Bold, Brutalist */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 z-10 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-[90vw]">
            {/* Super Massive Headline */}
            <h1 className="text-[12vw] leading-[0.8] font-black tracking-tighter uppercase mb-8 mix-blend-difference text-foreground">
              <span className="block hover-glitch" data-text="DESTU">DESTU</span>
              <span className="block text-primary hover-glitch" data-text="CIKAL">CIKAL</span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-border pt-8">
              <div className="max-w-xl space-y-6">
                <p className="text-xl md:text-2xl font-bold uppercase tracking-wide leading-relaxed">
                  <span className="text-primary">/// SYSTEM STATUS: ONLINE</span><br/>
                  iOS Engineer & Digital Architect building high-performance native experiences.
                </p>
                <div className="flex gap-4">
                  <Button asChild className="btn-brutalist rounded-none h-14 px-8 text-lg font-bold uppercase tracking-widest border-2">
                    <Link href="/projects">
                      Initialize <Terminal className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Raw Data Credentials */}
              <div className="grid grid-cols-1 gap-px bg-border border border-border">
                <a href="https://bullionecosystem.com" target="_blank" className="bg-background p-6 hover:bg-primary hover:text-black transition-colors group">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">CURRENT_NODE</div>
                  <div className="text-2xl font-black uppercase">BULLION ECOSYSTEM</div>
                  <div className="text-sm font-bold mt-2 font-mono group-hover:translate-x-2 transition-transform">iOS ENGINEER [ACTIVE]</div>
                </a>
                <a href="https://developeracademy.apps.binus.ac.id" target="_blank" className="bg-background p-6 hover:bg-primary hover:text-black transition-colors group">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-60">ORIGIN_NODE</div>
                  <div className="text-2xl font-black uppercase">APPLE ACADEMY</div>
                  <div className="text-sm font-bold mt-2 font-mono group-hover:translate-x-2 transition-transform">COHORT 2025 [COMPLETE]</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Separator */}
      <div className="border-b border-border py-4 overflow-hidden bg-primary text-black">
        <div className="animate-marquee font-black text-4xl uppercase tracking-tighter">
          NATIVE PERFORMANCE /// SWIFTUI ARCHITECTURE /// METAL RENDERER /// CORE ML INTEGRATION /// NATIVE PERFORMANCE /// SWIFTUI ARCHITECTURE /// METAL RENDERER /// CORE ML INTEGRATION ///
        </div>
      </div>

      {/* Projects - Grid of Raw Power */}
      <section className="relative py-24 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-baseline justify-between mb-16 border-b border-border pb-4">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
              Projects
            </h2>
            <Link href="/projects" className="text-xl font-bold uppercase hover:text-primary hover:underline decoration-4 underline-offset-4">
              View Database_ALL <ArrowUpRight className="inline h-6 w-6" />
            </Link>
          </div>
          
          <ProjectList projects={featuredProjects} isAdmin={isAdmin} layout="grid" />
        </div>
      </section>

      {/* Footer / CTA - Massive Block */}
      <section className="border-t border-border bg-foreground text-background py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-[90vw]">
            <h2 className="text-[8vw] leading-[0.85] font-black uppercase tracking-tighter mb-12">
              READY TO<br/>
              <span className="text-primary">DEPLOY?</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                 <p className="text-2xl font-bold uppercase max-w-md">
                  Available for select contract work and technical consultation.
                </p>
                <div className="flex flex-col gap-4 items-start">
                  <a href="mailto:destucr@gmail.com" className="text-4xl md:text-6xl font-black uppercase hover:text-primary transition-colors underline decoration-4 underline-offset-8">
                    destucr@gmail.com
                  </a>
                  <div className="flex gap-6 mt-8">
                    <a href="https://linkedin.com/in/destucikal" className="px-6 py-3 border-2 border-background font-bold uppercase hover:bg-primary hover:border-primary hover:text-black transition-all">
                      LinkedIn
                    </a>
                    <a href="https://github.com/destucikal" className="px-6 py-3 border-2 border-background font-bold uppercase hover:bg-primary hover:border-primary hover:text-black transition-all">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}