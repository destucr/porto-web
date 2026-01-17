import Image from "next/image"
import Link from "next/link"
import { ArrowRight, PenLine, Smartphone, Layers, Cpu, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/empty-state"
import { getPosts, getProjects } from "@/lib/content"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProjectList } from "@/components/project-list"
import { InteractiveShowcase } from "@/components/interactive-showcase"

export default async function Home() {
  const isAdmin = false // Admin features are now handled via /admin directly or client-side

  const allProjects = await getProjects()
  // Show all projects in scrollable view
  const featuredProjects = allProjects

  const allPosts = await getPosts()
  const recentPosts = (allPosts || [])
    .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  return (
    <div className="min-h-screen">
      {featuredProjects.slice(0, 2).map((project) => (
        project.image && <link key={project.id} rel="preload" as="image" href={project.image} fetchPriority="high" />
      ))}
      
      {/* Hero - Compact, dense, high-impact layout */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-16 md:gap-24">
            
            {/* Top: Introduction */}
            <div className="max-w-3xl">
              <p className="text-base font-medium text-muted-foreground mb-3">iOS Developer</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                Destu Cikal Ramdani
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal">
                Trained at <span className="text-foreground font-medium">Apple Developer Academy</span>, now building production iOS apps at <span className="text-foreground font-medium">Bullion Ecosystem International</span>.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <Button asChild className="rounded-full px-8 h-12 text-base font-medium">
                  <Link href="/projects">View Projects</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full px-8 h-12 text-base font-medium bg-transparent border-input hover:bg-secondary hover:text-foreground">
                  <a href="https://linkedin.com/in/destucikal" target="_blank" rel="noreferrer">LinkedIn</a>
                </Button>
              </div>
            </div>

            {/* Bottom: Credentials Grid - Dense & Visual */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Current Role */}
              <a 
                href="https://bullionecosystem.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-6 -ml-4 p-4 rounded-3xl transition-all hover:bg-secondary/30"
              >
                <div className="relative h-20 w-20 shrink-0 mt-1.5">
                  <Image
                    src="https://bullionecosystem.com/wp-content/uploads/2020/10/default-logo.png"
                    alt="Bullion Ecosystem International"
                    fill
                    className="object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">Bullion Ecosystem International</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">iOS Developer • Jan 2026 – Present</p>
                  <p className="text-base text-muted-foreground/80 mt-2 leading-relaxed">
                    Developing the core iOS application for a gold trading platform. Focusing on secure transactions, real-time data synchronization, and native UI implementation.
                  </p>
                </div>
              </a>

              {/* Education */}
              <a 
                href="https://developeracademy.apps.binus.ac.id/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-start gap-6 -ml-4 p-4 rounded-3xl transition-all hover:bg-secondary/30"
              >
                <div className="relative h-20 w-20 shrink-0 mt-1.5">
                  <Image
                    src="/images/apple-developer-academy-binus.png"
                    alt="Apple Developer Academy"
                    fill
                    className="object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">Apple Developer Academy</h3>
                  <p className="text-sm font-medium text-muted-foreground mt-0.5">Graduate • Cohort 2025</p>
                  <p className="text-base text-muted-foreground/80 mt-2 leading-relaxed">
                    Selected for the world-class 10-month program. Specialized in Swift, SwiftUI, and Challenge Based Learning (CBL) methodology to ship multiple apps.
                  </p>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Projects</h2>
            <Link href="/projects" className="link-underline text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              View All
            </Link>
          </div>
          <ProjectList projects={featuredProjects} isAdmin={isAdmin} layout="scroll" />
        </div>
        <div className="divider-fade" />
      </section>

      {/* Technical Spotlight */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28 relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Technical Spotlight</h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Mobile, full-stack, on-device AI, and game dev. Pick a category to explore.
            </p>
          </div>
          <InteractiveShowcase projects={featuredProjects} />
        </div>
        <div className="divider-fade" />
      </section>

      {/* Blog */}
      <section className="relative">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Blog</h2>
              <p className="text-muted-foreground mt-3">I write about what I learn. Mostly iOS, sometimes product.</p>
            </div>
          </div>
          {recentPosts.length > 0 ? (
            <ScrollArea className="w-full whitespace-nowrap -mx-4 md:-mx-6">
              <div className="flex w-max space-x-6 px-4 md:px-6 py-2">
                {recentPosts.map((post) => (
                  <article key={post.slug} className="card-hover group w-[320px] shrink-0 whitespace-normal glass rounded-2xl p-6 shadow-sm">
                    <Link href={`/blog/${post.slug}`} className="flex flex-col gap-3 h-full">
                      <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                        <time>{new Date(post.date || "").toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                        {post.tags?.[0] && <><span>·</span><span>{post.tags[0]}</span></>}
                      </div>
                      <h3 className="text-xl font-bold leading-snug group-hover:text-foreground/70 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          ) : (
            <EmptyState
              icon={PenLine}
              title="No posts yet"
              description="New articles coming soon."
              actionLabel={isAdmin ? "New Post" : undefined}
              actionHref={isAdmin ? "/admin" : undefined}
            />
          )}
        </div>
        <div className="divider-fade" />
      </section>

      {/* CTA - Strong contrast block */}
      <section className="container mx-auto px-4 md:px-6 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-foreground text-background px-8 md:px-16 py-16 md:py-20">
          <div className="relative z-10 max-w-xl space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Let's work together
            </h2>
            <p className="text-background/60 text-lg leading-relaxed">
              I'm an engineer who thinks about the product as much as the code. If that sounds like what you need, reach out.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full px-8 font-bold h-12 bg-background text-foreground hover:bg-background/90">
                <a href="mailto:destucr@gmail.com">Contact Me</a>
              </Button>
              <Button asChild size="lg" className="rounded-full px-8 font-bold h-12 border-2 border-background/20 bg-transparent text-background hover:bg-background hover:text-foreground transition-colors">
                <a href="https://linkedin.com/in/destucikal" target="_blank" rel="noreferrer">LinkedIn</a>
              </Button>
            </div>
          </div>
          {/* Abstract shape */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-background/5 blur-3xl" />
          <div className="absolute -right-10 bottom-0 w-60 h-60 rounded-full bg-background/10 blur-2xl" />
        </div>
      </section>
    </div>
  )
}