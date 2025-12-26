import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { getPosts, getProjects } from "@/lib/keystatic"

export default async function Home() {
  const allProjects = await getProjects()
  const featuredProjects = allProjects.slice(0, 3)
  
  const allPosts = await getPosts()
  const recentPosts = allPosts
    .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())
    .slice(0, 2)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero: Direct and High-Density */}
      <section className="pt-24 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              Destu Cikal Ramdani
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              iOS Developer & Product Manager. I build native mobile experiences 
              focused on technical rigor, specializing in Swift, AVFoundation, and CoreML.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-md px-6">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-md px-6">
                <Link href="/blog">Read Writing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities: Evidence-based grouping */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">iOS Engineering</h2>
              <p className="text-muted-foreground leading-relaxed">
                Native Swift development with a focus on performance and clean architecture. 
                Experience with complex domains including audio processing (AVFoundation) 
                and real-time tracking (MapKit/Core Location).
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Product Management</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bridging engineering and business. Leading cross-functional teams, 
                defining success metrics, and using impact-effort frameworks to drive 
                feature prioritization.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Machine Learning</h2>
              <p className="text-muted-foreground leading-relaxed">
                Applying on-device intelligence. Implementation of multiclass 
                classification and computer vision models for fraud prevention 
                and document liveness detection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work: Clean Grid */}
      <section className="py-20 border-t bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
            <Link href="/projects" className="text-sm font-semibold hover:underline flex items-center gap-1">
              All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Writing: Minimalist List */}
      <section className="py-20 border-t">
         <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight mb-12">Writing</h2>
          <div className="max-w-3xl space-y-10">
            {(recentPosts || []).map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="space-y-2">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <time>{new Date(post.date || "").toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="text-primary">{post.tags[0]}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold group-hover:underline decoration-primary underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}