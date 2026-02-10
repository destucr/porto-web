import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-8xl font-medium tracking-tighter text-foreground/10 select-none">
          404
        </h1>
        <h2 className="text-3xl font-medium tracking-tight">Page not found</h2>
        <p className="text-muted-foreground max-w-[500px] text-lg leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
        </p>
      </div>
      
      <Button asChild size="lg" className="rounded-full px-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
