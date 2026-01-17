import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getProjects } from "@/lib/content"
import { ProjectList } from "@/components/project-list"
import { TechnicalSpotlight } from "@/components/technical-spotlight"

export default async function Home() {
  const allProjects = await getProjects()

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[65vh] flex flex-col justify-center px-4 md:px-6 pt-16 md:pt-20 pb-6 md:pb-8">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-6 lg:gap-10 items-center animate-fade-in">
          
          <div className="space-y-5 md:space-y-6 text-left">
            <div className="space-y-2 md:space-y-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary/50 text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Open to work
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-[1.1]">
                Destu Cikal Ramdani
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                I build iOS apps with Swift and SwiftUI.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-1.5">
              <div className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground/60">Tech I use</div>
              <div className="flex flex-wrap gap-1.5">
                {["Swift", "SwiftUI", "Go", "React", "Core ML"].map(tech => (
                  <span key={tech} className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
               <Button asChild className="rounded-full h-10 px-6 text-sm shadow-sm w-full sm:w-auto">
                <Link href="/projects">
                  See my work
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full h-10 px-6 text-sm w-full sm:w-auto">
                <Link href="https://linkedin.com/in/destucikal" target="_blank">
                  LinkedIn
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Decorative */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-secondary/50 to-secondary/20 border border-border/30" />
          </div>

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
          
          <ProjectList projects={allProjects} />
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
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Destu Cikal Ramdani. Built with Next.js.
          </div>
        </div>
      </footer>

    </div>
  )
}
