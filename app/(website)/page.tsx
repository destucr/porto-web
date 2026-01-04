import Link from "next/link"
import { ArrowRight, LayoutGrid, PenLine, Smartphone, Layers, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { EmptyState } from "@/components/empty-state"
import { getPosts, getProjects } from "@/lib/keystatic"

export default async function Home() {
  const isAdmin = false // Admin features are now handled via /admin directly or client-side

  const allProjects = await getProjects()
  const featuredProjects = allProjects.slice(0, 3)

  const allPosts = await getPosts()
  const recentPosts = (allPosts || [])
    .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
    .slice(0, 2)

  return (
    <div className="container mx-auto px-4 md:px-6">
      {featuredProjects.slice(0, 2).map((project) => (
        <link key={project.id} rel="preload" as="image" href={project.image} fetchPriority="high" />
      ))}
      {/* Balanced Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 border-b">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                Destu Cikal <br /> Ramdani
              </h1>
              <p className="text-xl text-muted-foreground font-medium uppercase tracking-widest">
                I build iOS apps and manage products
              </p>
            </div>
            <div className="flex wrap gap-3">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/projects">See my work</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/blog">Read my blog</Link>
              </Button>
            </div>
          </div>

          <div className="lg:pt-4">
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium">
              I build iOS apps that are fast, easy to use, and actually helpful. 
              I love turning complex ideas into simple interfaces that anyone can understand.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t pt-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">Based in</p>
                <p className="text-sm font-semibold italic">South Tangerang, Indonesia</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">What I do</p>
                <p className="text-sm font-semibold italic">iOS • Product • AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Grid: More Visual Weight */}
      <section className="py-20 md:py-32 border-b">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6 group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight">iOS Apps</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I build high-quality apps for iPhone. I focus on making them fast, smooth, and reliable using the latest Apple technologies.
              </p>
            </div>
          </div>

          <div className="space-y-6 group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight">Building the Product</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I don&apos;t just write code. I help figure out what features users actually need and how to build them in the best way possible.
              </p>
            </div>
          </div>

          <div className="space-y-6 group">
            <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Cpu className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-bold tracking-tight">Smart Features (AI)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I use machine learning to make apps smarter, like recognizing hand signs or checking if an ID photo is real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects: Balanced with clear headings */}
      <section className="py-20 md:py-32 border-b">
        <div className="flex items-end justify-between mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Work</h2>
            <p className="text-muted-foreground max-w-md">Some of the projects I&apos;ve built, focusing on engineering and product design.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex items-center gap-2 group font-bold tracking-tight">
            <Link href="/projects">
              See all projects <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index < 2} />
            ))
          ) : (
            <div className="col-span-full py-10">
              <EmptyState
                icon={LayoutGrid}
                title="No projects yet"
                description="I&apos;m currently putting together the details for my latest work."
                actionLabel={isAdmin ? "Add Project" : undefined}
                actionHref={isAdmin ? "/admin" : undefined}
              />
            </div>
          )}
        </div>
      </section>

      {/* Writing Section */}
      <section className="py-20 md:py-32">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight italic font-serif">Writing</h2>
            <p className="text-muted-foreground leading-relaxed">
              I like to share what I learn about building apps, managing products, and using AI.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-16">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <article key={post.slug} className="group">
                  <Link href={`/blog/${post.slug}`} className="block space-y-4">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <time>{new Date(post.date || "").toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
                      {post.tags && post.tags.length > 0 && (
                        <>
                          <span className="opacity-30">•</span>
                          <span className="text-primary">{post.tags[0]}</span>
                        </>
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="text-sm font-bold flex items-center gap-2 text-primary/80 group-hover:text-primary transition-colors">
                      Read the full story <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </article>
              ))
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
    </div>
  )
}
