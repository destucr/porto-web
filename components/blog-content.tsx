"use client"

import React from "react"
import Markdoc from "@markdoc/markdoc"
import Image from "next/image"
import dynamic from "next/dynamic"

const CodeBlock = dynamic(() => import("@/components/code-block").then(mod => mod.CodeBlock), {
  ssr: false,
})

const InlineCode = dynamic(() => import("@/components/code-block").then(mod => mod.InlineCode), {
  ssr: false,
})

interface BlogContentProps {
  content: string // Serialized Markdoc content
}

// Custom components for Markdoc
const components = {
  CodeBlock: ({ children, language }: { children: string; language?: string }) => (
    <CodeBlock language={language}>
      {children}
    </CodeBlock>
  ),
  InlineCode: ({ children }: { children: React.ReactNode }) => (
    <InlineCode>{children}</InlineCode>
  ),
  Image: ({ src, alt, title }: { src: string; alt?: string; title?: string }) => (
    <figure className="my-8">
      <div className="overflow-hidden border border-border bg-muted/30">
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
  const parsedContent = React.useMemo(() => JSON.parse(content), [content])
  
  return (
    <div className="prose dark:prose-invert max-w-none
      prose-headings:font-semibold prose-headings:tracking-tight
      prose-p:text-[1rem] prose-p:leading-[1.8] prose-p:text-foreground/80
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-0
      prose-li:text-[1rem] prose-li:leading-[1.8] prose-li:text-foreground/80
      prose-strong:text-foreground prose-strong:font-semibold
      prose-code:text-foreground prose-code:font-normal">
      {Markdoc.renderers.react(parsedContent, React, { components })}
    </div>
  )
}