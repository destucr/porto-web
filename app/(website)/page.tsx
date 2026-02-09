import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjects, getPosts } from "@/lib/content"
import { ProjectList } from "@/components/project-list"
import { TechnicalSpotlight } from "@/components/technical-spotlight"
import { ProfessionalCard } from "@/components/hero-professional-card"
import { ArrowRight, BookOpen } from "lucide-react"

export default async function Home() {
  const allProjects = await getProjects()
  const allPosts = await getPosts()
  const latestPosts = allPosts.slice(0, 2)

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 pt-6 md:pt-10 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-8 items-start animate-fade-in">
          
          <div className="lg:col-span-3 space-y-10 pt-2">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-medium tracking-tight text-foreground leading-[1.05]">
                Destu Cikal
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                iOS Developer at Bullion Ecosystem International, building native apps with UIKit and SwiftUI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Button asChild className="rounded-full h-12 px-10 text-base shadow-sm w-full sm:w-auto">
                <Link href="/projects">
                  See my work
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-12 px-10 text-base w-full sm:w-auto">
                <Link href="https://linkedin.com/in/destucikal" target="_blank" rel="noopener noreferrer">
                  Connect on LinkedIn
                </Link>
              </Button>
            </div>
          </div>

          <ProfessionalCard />

        </div>
      </section>

      {/* Technical Spotlight */}
      <section className="py-10 md:py-14 px-4 md:px-6 border-y border-border/40">
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
      <section className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
        {/* Fluid Background Pattern - Neutral */}
        <div className="absolute inset-0 -z-10 opacity-[0.02] dark:opacity-[0.04] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="fluid-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M0 50 Q 25 0 50 50 T 100 50" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M0 70 Q 25 20 50 70 T 100 70" opacity="0.3" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fluid-pattern)" />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-foreground">Writing</h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                Deep dives into engineering challenges and software philosophy.
              </p>
            </div>
            <Button asChild variant="ghost" className="rounded-full group pr-2">
              <Link href="/blog">
                View all posts <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {latestPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col space-y-4 p-6 rounded-3xl transition-all hover:bg-secondary/50 border border-transparent hover:border-border/50"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    <BookOpen className="w-3 h-3" />
                    <span>Engineering Log</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="pt-2 flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  Read article <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
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

