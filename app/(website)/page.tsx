import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getProjects, getPosts, getBooks } from "@/lib/content"
import { ProjectList } from "@/components/project-list"
import { TechnicalSpotlight } from "@/components/technical-spotlight"
import { ProfessionalCard } from "@/components/hero-professional-card"
import { ArrowRight, BookOpen } from "lucide-react"

export default async function Home() {
  const allProjects = await getProjects()
  const allPosts = await getPosts()
  const allBooks = await getBooks()
  const latestPosts = allPosts.slice(0, 2)
  const featuredBooks = allBooks.slice(0, 4)

  return (
    <div className="min-h-screen relative font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 pt-6 md:pt-10 pb-8 md:pb-12">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-8 items-start animate-fade-in">
          
          <div className="lg:col-span-3 space-y-12 pt-4">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl font-medium tracking-tight text-foreground leading-[0.95]">
                Destu Cikal
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl leading-relaxed font-light">
                iOS Developer building high-performance native applications with UIKit and SwiftUI.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
               <Button asChild className="rounded-none h-11 px-8 text-sm font-bold shadow-none border-b-2 border-primary hover:bg-transparent hover:text-primary transition-all">
                <Link href="/projects">
                  Explore Projects
                </Link>
              </Button>
              <Button asChild variant="ghost" className="rounded-none h-11 px-0 text-sm font-bold border-b-2 border-transparent hover:border-muted-foreground hover:bg-transparent transition-all">
                <Link href="https://linkedin.com/in/destucikal" target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
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
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">Selected Works</h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              A collection of iOS apps, full-stack systems, and engineering experiments.
            </p>
          </div>
          
          <ProjectList projects={allProjects} limit={3} />
        </div>
      </section>

      {/* Blog / Writing */}
      <section className="relative py-20 md:py-32 px-4 md:px-6 overflow-hidden border-t border-border/40">
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

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">Writing</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                Deep dives into engineering challenges, software philosophy, and the craft of building.
              </p>
            </div>
            <Button asChild variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary hover:bg-transparent px-0 h-auto pb-1 text-sm font-bold uppercase tracking-widest">
              <Link href="/blog">
                View All Posts
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {latestPosts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group flex flex-col space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary/40 group-hover:text-primary transition-colors">
                    <BookOpen className="w-3 h-3" />
                    <span>Engineering Log</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
                    {post.title}
                  </h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed line-clamp-2 font-light">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reading List */}
      <section className="py-20 md:py-32 px-4 md:px-6 border-t border-border/40">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground">Reading List</h2>
              <p className="text-lg text-muted-foreground font-light leading-relaxed">
                A selection of technical and philosophical texts that shaped my engineering practice.
              </p>
            </div>
            <Button asChild variant="ghost" className="rounded-none border-b-2 border-transparent hover:border-primary hover:bg-transparent px-0 h-auto pb-1 text-sm font-bold uppercase tracking-widest">
              <Link href="/books">
                View All Books
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {featuredBooks.map((book) => (
              <div key={book.title} className="flex flex-col group">
                {/* Intentional Gallery Stage */}
                <div className="relative aspect-[2/3] flex items-center justify-center bg-secondary/5 rounded-sm border border-border/40 overflow-hidden transition-colors duration-500 group-hover:bg-secondary/10">
                  {/* Perspective Shadow Layer */}
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* The "Artifact" - respetcs ratio, never clipped */}
                  <div className="relative w-[92%] h-[92%] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 260px"
                      className="object-contain shadow-[5px_10px_30px_rgba(0,0,0,0.15),0px_0px_1px_rgba(0,0,0,0.1)] dark:shadow-[5px_10px_40px_rgba(0,0,0,0.5)]"
                      unoptimized
                    />
                    {/* Material Depth Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-white/5 pointer-events-none" />
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="text-base font-medium text-foreground leading-snug group-hover:text-primary transition-colors tracking-tight">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {book.author}
                  </p>
                  <div className="pt-2">
                    {book.amazonUrl && (
                      <a 
                        href={book.amazonUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors border-b border-border hover:border-primary pb-0.5"
                      >
                        Amazon
                      </a>
                    )}
                  </div>
                </div>
              </div>
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

