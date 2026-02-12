import React from "react"
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/content"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Metadata } from "next"
import Markdoc from "@markdoc/markdoc"
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
    return { title: "Post Not Found" }
  }
  return {
    title: post.entry.title,
    description: post.entry.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { node } = await post.entry.content()
  const content = Markdoc.transform(node, markdocConfig)
  const serializedContent = JSON.stringify(content)

  return (
    <article className="min-h-screen">
      {/* Article Header */}
      <header className="border-b border-border">
        <div className="container mx-auto py-12 md:py-20 max-w-[680px]">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 mb-8 text-muted-foreground hover:text-foreground"
          >
            <Link href="/blog">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Writing
            </Link>
          </Button>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {(post.entry.tags || []).map((tag: string) => (
                <span key={tag} className="label-caps text-primary">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {post.entry.title || "Untitled Post"}
            </h1>

            <p className="text-sm text-muted-foreground">
              {new Date(post.entry.date || "").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto py-12 md:py-16 max-w-[680px]">
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-10">
          {post.entry.excerpt}
        </p>
        <hr className="border-border mb-10" />
        <BlogContent content={serializedContent} />
      </div>
    </article>
  )
}
