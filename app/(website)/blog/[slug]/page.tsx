import React from "react"
import { notFound } from "next/navigation"
import { getPost, getPosts } from "@/lib/content"
import Link from "next/link"
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
    return { title: "Not found" }
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
    <article className="pb-28">
      <div className="pt-12 md:pt-16 pb-10">
        <Link href="/blog" className="essay-link meta">
          ← All writing
        </Link>
        <p className="meta mt-10">
          {post.entry.date
            ? new Date(post.entry.date || "").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : ""}
          {(post.entry.tags || []).length > 0 ? ` · ${(post.entry.tags || []).join(" · ")}` : ""}
        </p>
        <h1 className="mt-5 text-[clamp(2rem,5.5vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
          {post.entry.title || "Untitled"}
        </h1>
        <p className="lede mt-7 italic">{post.entry.excerpt}</p>
      </div>

      <hr className="essay-rule" />

      <div className="pt-10">
        <BlogContent content={serializedContent} />
      </div>
    </article>
  )
}
