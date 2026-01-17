import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"
import { getPosts } from "@/lib/content"
import { EmptyState } from "@/components/empty-state"
import { PenLine } from "lucide-react"



export const metadata: Metadata = {
  title: "Blog | iOS Developer Portfolio",
  description: "Technical articles, tutorials, and thoughts on iOS development.",
}

export default async function BlogPage() {
  const isAdmin = false

  const blogPosts = (await getPosts()) || []

  // Sort posts by date descending
  blogPosts.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  return (
    <div className="min-h-screen">
      {/* Header with glow */}
      <section className="relative glow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thoughts, tutorials, and insights on Swift and iOS development.
            </p>
          </div>
        </div>
        <div className="divider-fade" />
      </section>

      {/* Blog posts with dot grid */}
      <section className="relative dot-grid">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="card-hover group flex flex-col h-full bg-background border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 flex flex-col h-full">
                  <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date'}
                  </div>
                  <h2 className="text-xl font-bold leading-snug mb-3 group-hover:text-foreground/70 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-4 pt-4 border-t">
                    {(post.tags || []).map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-muted rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
            {blogPosts.length === 0 && (
              <div className="col-span-full">
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
