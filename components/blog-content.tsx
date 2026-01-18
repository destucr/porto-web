"use client"

import React from "react"
import Markdoc, { RenderableTreeNode } from "@markdoc/markdoc"
import { CodeBlock, InlineCode } from "@/components/code-block"
import Image from "next/image"

interface BlogContentProps {
  content: RenderableTreeNode
}

// Custom components for Markdoc
const components = {
  CodeBlock: ({ children, language, filename }: { children: string; language?: string; filename?: string }) => (
    <CodeBlock language={language} filename={filename}>
      {children}
    </CodeBlock>
  ),
  InlineCode: ({ children }: { children: React.ReactNode }) => (
    <InlineCode>{children}</InlineCode>
  ),
  Image: ({ src, alt, title }: { src: string; alt?: string; title?: string }) => (
    <figure className="my-8">
      <div className="rounded-xl overflow-hidden border border-border/40 bg-muted/30">
        <Image
          src={src}
          alt={alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto"
          unoptimized
        />
      </div>
      {title && (
        <figcaption className="text-center text-sm text-muted-foreground mt-3">
          {title}
        </figcaption>
      )}
    </figure>
  ),
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-sm md:prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-medium prose-p:leading-relaxed prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0">
      {Markdoc.renderers.react(content, React, { components })}
    </div>
  )
}
