import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://linkedin.com/in/destucr"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Destu Cikal
          </a>
          .
        </p>
        <div className="flex gap-4 items-center">
             <Link href="/admin" className="text-[10px] text-muted-foreground/30 hover:text-muted-foreground transition-colors mr-2">
               System
             </Link>
             <Link href="https://github.com/destucr" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                 <Github className="h-5 w-5" />
                 <span className="sr-only">GitHub</span>
             </Link>
             <Link href="https://linkedin.com/in/destucr" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                 <Linkedin className="h-5 w-5" />
                 <span className="sr-only">LinkedIn</span>
             </Link>
             <Link href="mailto:destucr@gmail.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                 <Mail className="h-5 w-5" />
                 <span className="sr-only">Email</span>
             </Link>
        </div>
      </div>
    </footer>
  )
}
