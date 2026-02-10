import React from "react"
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Metadata } from "next"
import Markdoc from '@markdoc/markdoc'
import { markdocConfig } from "@/lib/markdoc-config"
import { BlogContent } from "@/components/blog-content"

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  return {
    title: `${post.entry.title} | Engineering Blog`,
    description: post.entry.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { node } = await post.entry.content();
  const content = Markdoc.transform(node, markdocConfig);
  const serializedContent = JSON.stringify(content);

  return (
    <article className="min-h-screen bg-background">
      {/* Article Header */}
      <header className="border-b border-border/40 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-24 max-w-4xl text-center">
          <Button asChild variant="ghost" size="sm" className="mb-6 md:mb-8 text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Blog
            </Link>
          </Button>

          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
              {(post.entry.tags || []).map((tag: string) => (
                <span key={tag} className="px-2.5 md:px-3 py-0.5 md:py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] md:text-xs font-medium tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground leading-tight">
              {post.entry.title || 'Untitled Post'}
            </h1>
            
            <p className="text-[10px] md:text-sm font-medium tracking-widest text-muted-foreground uppercase">
              {new Date(post.entry.date || "").toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-3xl">
        <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none prose-headings:font-medium prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
          <p className="lead text-lg md:text-xl lg:text-2xl text-foreground/80 font-light mb-8 md:mb-12">
            {post.entry.excerpt}
          </p>
          <hr className="border-border/60 my-8 md:my-12" />
          {/* Render Markdoc content with Client Component to keep Shiki out of Server bundle */}
          <BlogContent content={serializedContent} />
        </div>
      </div>
    </article>
  )
}