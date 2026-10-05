"use client"

import * as React from "react"

interface CopyEmailProps {
  email: string
  className?: string
}

// Quiet copy interaction: underlined address, flips to "Copied" on click.
export function CopyEmail({ email, className }: CopyEmailProps) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
    } catch {
      window.location.href = `mailto:${email}`
      return
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`essay-link text-foreground underline transition-transform duration-150 active:scale-[0.97] inline-block ${className ?? ""}`}
    >
      {copied ? "Copied" : email}
    </button>
  )
}
