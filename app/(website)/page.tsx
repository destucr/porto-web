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
    <div className="container mx-auto px-4 md:px-6">
      {featuredProjects.slice(0, 2).map((project) => (
        project.image && <link key={project.id} rel="preload" as="image" href={project.image} fetchPriority="high" />
      ))}
      {/* Recruiter-Focused Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Destu Cikal <br /> Ramdani
              </h1>
              <p className="text-xl text-primary font-bold uppercase tracking-widest">
                iOS Engineer & Full-Stack Developer
              </p>
            </div>
            <div className="flex wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8 font-bold">
                <Link href="/projects">View Case Studies</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-bold">
                <Link href="/blog">Read Engineering Blog</Link>
              </Button>
            </div>
          </div>

          <div className="lg:pt-4">
            <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed font-medium">
              I build software that balances technical depth with intentional design. 
              Currently specializing in native iOS engineering, on-device machine learning, and scalable systems in Go.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t pt-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Availability</p>
                <p className="text-sm font-semibold text-primary">Open to New Opportunities</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Location</p>
                <p className="text-sm font-semibold italic">Tangerang, Indonesia (GMT+7)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Core: Streamlined Competencies */}
      <section className="py-20 md:py-32 border-b">
        <div className="flex flex-col md:flex-row justify-between gap-16">
          <div className="md:w-1/3 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-widest text-primary/80">Technical Core</h2>
            <p className="text-muted-foreground leading-relaxed">
              Core competencies developed through building high-performance mobile and web systems.
            </p>
          </div>
          
          <div className="md:w-2/3 space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">iOS Engineering</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  SwiftUI, UIKit, AudioKit, SwiftData, Core Location, AVFoundation, GCD/Concurrency.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Layers className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">Full-Stack Systems</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Go 1.24 (Gin, GORM), PostgreSQL, TypeScript, React, Next.js, Docker, RESTful APIs.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Cpu className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">On-Device AI/ML</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Create ML, Vision Framework, Accelerate (FFT), Gesture Recognition, Core ML optimization.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-lg">Technical Leadership</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Technical Roadmapping, UX Research, Metric Definition, Architectural Post-Mortems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Spotlight: Interactive Deep Dive */}
      <section className="py-20 md:py-32 border-b">
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Technical Spotlight</h2>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Interact with my core technical contributions. Choose a domain to see on-device execution, architectural summaries, and platform-specific implementations.
          </p>
        </div>
        
        <InteractiveShowcase projects={featuredProjects} />
      </section>

      {/* Project Directory: Full Catalog */}
      <section className="py-20 md:py-32 border-b">
        <div className="flex items-end justify-between mb-12 px-1">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight uppercase tracking-widest text-primary/80">Project Directory</h2>
            <p className="text-muted-foreground max-w-md">Comprehensive catalog of engineering projects and case studies.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex items-center gap-2 group font-bold tracking-tight">
            <Link href="/projects">
              Full Portfolio <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <ProjectList projects={featuredProjects} isAdmin={isAdmin} layout="scroll" />
      </section>

      {/* Engineering Insights Section: Scrollable */}
      <section className="py-20 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4 px-1">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight italic font-serif">Engineering Insights</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Technical post-mortems and deep dives into iOS architecture, concurrency, and performance optimization.
            </p>
          </div>

          <div className="relative">
             {recentPosts.length > 0 ? (
                <ScrollArea className="w-full whitespace-nowrap -mx-4 md:-mx-6">
                  <div className="flex w-max space-x-6 md:space-x-8 px-4 md:px-6 py-1">
                    {recentPosts.map((post) => (
                      <article key={post.slug} className="group w-[300px] md:w-[350px] shrink-0 whitespace-normal select-none">
                        <Link href={`/blog/${post.slug}`} className="flex flex-col gap-3 h-full">
                          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/60 uppercase tracking-wider">
                            <time>{new Date(post.date || "").toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                            {post.tags && post.tags.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-foreground/80">{post.tags[0]}</span>
                              </>
                            )}
                          </div>
                          
                          <div className="space-y-3">
                            <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>

                          <div className="pt-2">
                            <span className="text-sm font-semibold underline decoration-border underline-offset-4 group-hover:decoration-primary group-hover:text-primary transition-all">
                              Read story
                            </span>
                          </div>
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
                description="I'm working on some new articles about iOS development."
                actionLabel={isAdmin ? "New Post" : undefined}
                actionHref={isAdmin ? "/admin" : undefined}
              />
            )}
          </div>
        </div>
      </section>

      {/* Recruiter-Focused CTA */}
      <section className="py-20 md:py-32 mb-12 rounded-[2rem] bg-zinc-950 text-white p-12 overflow-hidden relative">
        <div className="relative z-10 space-y-8 max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
            Building something <br /> ambitious?
          </h2>
          <p className="text-xl text-zinc-400 font-medium">
            I’m looking for my next challenge in iOS engineering or technical product management. 
            If you value an engineer who thinks about the product as much as the code, I’d love to connect.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full px-8 font-bold bg-white text-black hover:bg-zinc-200 transition-colors">
              <a href="mailto:destucr@gmail.com">Contact Me</a>
            </Button>
            <Button asChild size="lg" className="rounded-full px-8 font-bold border border-white/20 bg-transparent text-white hover:bg-white hover:text-black transition-colors">
              <a href="https://linkedin.com/in/destucikal" target="_blank" rel="noreferrer">LinkedIn</a>
            </Button>
          </div>
        </div>
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-primary/20 to-transparent opacity-50 pointer-events-none" />
      </section>
    </div>
  )
}