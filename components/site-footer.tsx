import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container mx-auto py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[13px] text-muted-foreground">
          &copy; {new Date().getFullYear()} Destu Cikal
        </p>
        <div className="flex items-center gap-5 text-[13px] text-muted-foreground">
          <Link
            href="https://github.com/destucr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors link-underline"
          >
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/destucikal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors link-underline"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:destucr@gmail.com"
            className="hover:text-foreground transition-colors link-underline"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
