import Link from "next/link"
import { Metadata } from "next"
import { getPosts } from "@/lib/content"
import { EmptyState } from "@/components/empty-state"
import { PenLine, ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical articles on Swift, iOS architecture, and software engineering by Destu Cikal.",
}

export default async function BlogPage() {
  const blogPosts = (await getPosts()) || []

  blogPosts.sort(
    (a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <span className="label-caps text-primary">Journal</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Writing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technical articles on Swift, iOS architecture, and software engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Blog posts */}
      <section>
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-3xl space-y-0">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group border-b border-border"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {(post.tags || []).map((tag: string) => (
                        <span key={tag} className="label-caps text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold leading-snug text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {post.date
                        ? new Date(post.date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                </Link>
              </article>
            ))}
            {blogPosts.length === 0 && (
              <div className="py-12">
                <EmptyState
                  icon={PenLine}
                  title="No posts yet"
                  description="Articles on mobile architecture and engineering will be published here."
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
