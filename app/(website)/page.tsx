import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/content"
import { ProjectList } from "@/components/project-list"
import { TechnicalSpotlight } from "@/components/technical-spotlight"
import { ProfessionalCard } from "@/components/hero-professional-card"

export default async function Home() {
  const allProjects = await getProjects()

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 pt-6 md:pt-10 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-8 items-start animate-fade-in">
          
          <div className="lg:col-span-3 space-y-8 pt-2">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1]">
                Destu Cikal Ramdani
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                I’m an iOS developer at Bullion Ecosystem International. <br className="hidden md:block" />
                I build apps using Swift and SwiftUI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
               <Button asChild className="rounded-full h-11 px-8 text-sm shadow-sm w-full sm:w-auto">
                <Link href="/projects">
                  See my work
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-11 px-8 text-sm w-full sm:w-auto">
                <Link href="https://linkedin.com/in/destucikal" target="_blank">
                  LinkedIn
                </Link>
              </Button>
            </div>

            {/* Technical Focus - High-value specialties */}
            <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-border/40 max-w-2xl">
              {[
                { label: "Audio & Signals", desc: "Low-latency DSP and FFT signal processing." },
                { label: "On-Device ML", desc: "Edge Vision models for real-time interaction." },
                { label: "Geospatial", desc: "Complex MapKit systems and GTFS architectures." }
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-primary">{item.label}</div>
                  <div className="text-xs text-muted-foreground leading-snug font-medium">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <ProfessionalCard />

        </div>
      </section>

      {/* Technical Spotlight */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-secondary/20 border-y border-border/40">
        <div className="max-w-6xl mx-auto">
          <TechnicalSpotlight projects={allProjects} />
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-serif font-medium tracking-tight">Selected Works</h2>
            <p className="text-muted-foreground text-sm md:text-base">iOS apps, web projects, and ML experiments.</p>
          </div>
          
          <ProjectList projects={allProjects} limit={3} />
        </div>
      </section>

      {/* Blog / Writing */}
      <section className="py-12 md:py-16 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-medium tracking-tight">Writing</h2>
            <p className="text-sm md:text-base text-muted-foreground">Thoughts on iOS development and software craft.</p>
          </div>
          <Button asChild variant="outline" className="rounded-full h-9 px-5 text-sm">
            <Link href="/blog">
              Read the blog
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 px-4 md:px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          
        </div>
      </footer>

    </div>
  )
}
