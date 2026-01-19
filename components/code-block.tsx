"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
}

export function CodeBlock({ children, language = "text", filename }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")
  const [copied, setCopied] = useState(false)

  const code = typeof children === "string" ? children.trim() : ""

  useEffect(() => {
    async function highlight() {
      try {
        // Dynamically import shiki to avoid bundling it in the main chunk
        const { codeToHtml } = await import("shiki")
        const highlighted = await codeToHtml(code, {
          lang: language,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
        })
        setHtml(highlighted)
      } catch {
        // Fallback for unsupported languages
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
        setHtml(`<pre><code>${escaped}</code></pre>`)
      }
    }
    highlight()
  }, [code, language])

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6 rounded-xl overflow-hidden border border-border/60 bg-secondary/30">
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-secondary/50">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-xs font-medium text-foreground">{filename}</span>
          ) : (
            <span className="text-xs font-mono text-muted-foreground uppercase">{language}</span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-secondary"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      
      {/* Code content */}
      <div 
        className={cn(
          "overflow-x-auto p-4 text-sm leading-relaxed",
          "[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0",
          "[&_code]:!bg-transparent [&_code]:font-mono"
        )}
        dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }}
      />
    </div>
  )
}

// Inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-secondary text-secondary-foreground font-mono text-[0.9em] border border-border/40">
      {children}
    </code>
  )
}
