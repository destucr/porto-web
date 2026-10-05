import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: string
  language?: string
}

// No header bar, no copy button — just readable code. Shiki loads lazily
// so pages without code pay nothing for it.
export function CodeBlock({ children, language = "text" }: CodeBlockProps) {
  const [html, setHtml] = useState<string>("")

  const code = typeof children === "string" ? children.trim() : ""

  useEffect(() => {
    async function highlight() {
      try {
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
        const escaped = code
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
        setHtml(`<pre><code>${escaped}</code></pre>`)
      }
    }
    highlight()
  }, [code, language])

  return (
    <div
      className={cn(
        "my-6 overflow-x-auto border border-border bg-secondary/40 px-4 py-3 text-sm leading-relaxed",
        "[&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0",
        "[&_code]:!bg-transparent [&_code]:font-mono"
      )}
      dangerouslySetInnerHTML={{ __html: html || `<pre><code>${code}</code></pre>` }}
    />
  )
}

// Inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1 py-0.5 rounded bg-secondary text-secondary-foreground font-mono text-[0.9em] border border-border/40">
      {children}
    </code>
  )
}
