"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function AdminShortcut() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Shortcut: Command + Shift + A (for Admin) or Control + Shift + A
      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault()
        router.push("/keystatic")
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [router])

  return null
}