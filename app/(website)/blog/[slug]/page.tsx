import React from 'react'
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Metadata } from "next"
import Markdoc from '@markdoc/markdoc'

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
    title: `${post.entry.title} | iOS Developer Blog`,
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
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
  }
  const renderable = Markdoc.transform(node);

  // Custom renderer for React elements
  // We need to use a client component for rendering if we want interactive components,
  // but for basic text server-side rendering is fine.
  // However, Markdoc.renderers.react returns React elements directly.

  return (
    <article className="container mx-auto max-w-3xl py-12 md:py-24">
      <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
        <Link href="/blog">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="space-y-4 text-center mb-12">
        <div className="flex justify-center gap-2 mb-4">
          {(post.entry.tags || []).map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {post.entry.title || 'Untitled Post'}
        </h1>
        <p className="text-muted-foreground italic">
          {new Date(post.entry.date || "").toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead text-xl">{post.entry.excerpt}</p>
        <hr className="my-8" />
        {/* Render Markdoc content */}
        {Markdoc.renderers.react(renderable, React)}
      </div>
    </article>
  )
}

