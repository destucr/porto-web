import Link from "next/link"
import { Metadata } from "next"
import { getPosts } from "@/lib/content"
import { EmptyState } from "@/components/empty-state"
import { PenLine } from "lucide-react"



export const metadata: Metadata = {
  title: "Blog | Software Engineering Portfolio",
  description: "Technical articles, tutorials, and thoughts on software engineering and mobile architecture.",
}

export default async function BlogPage() {
  const isAdmin = false

  const blogPosts = (await getPosts()) || []

  // Sort posts by date descending
  blogPosts.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-28">
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground">
              Blog
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed font-light">
              Thoughts, tutorials, and insights on Swift, mobile architecture, and engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section className="relative bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group flex flex-col h-full bg-card border border-border/60 rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full p-5 md:p-6 lg:p-8">
                  <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3 md:mb-4">
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}
                  </div>
                  <h2 className="text-xl md:text-2xl font-serif font-medium leading-snug mb-2 md:mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 flex-1 mb-4 md:mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-1.5 md:gap-2 flex-wrap mt-auto pt-3 md:pt-4 border-t border-border/40">
                    {(post.tags || []).map((tag: string) => (
                      <span key={tag} className="px-2 md:px-2.5 py-0.5 text-[9px] md:text-[10px] font-medium uppercase tracking-wider bg-secondary text-secondary-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </article>
            ))}
            {blogPosts.length === 0 && (
              <div className="col-span-full py-12">
                <EmptyState
                  icon={PenLine}
                  title="No posts yet"
                  description="Articles on mobile architecture and engineering will be published here."
                  actionLabel={isAdmin ? "Go to Admin" : undefined}
                  actionHref={isAdmin ? "/admin" : undefined}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
