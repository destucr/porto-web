import { getBooks } from "@/lib/content"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recommended Books | Destu Cikal",
  description: "A curated list of books I recommend for iOS development, engineering, and personal growth.",
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen bg-background py-12 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="space-y-4 text-center md:text-left max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
            Reading List
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A curated collection of books that have significantly influenced my engineering practice and technical philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {books.map((book) => (
            <div key={book.title} className="group flex flex-col max-w-[280px] mx-auto md:mx-0">
              {/* Intentional Gallery Stage */}
              <div className="relative aspect-[2/3] flex items-center justify-center bg-secondary/10 rounded-sm border border-border/50 overflow-hidden transition-colors duration-500 group-hover:bg-secondary/20">
                {/* Perspective Shadow Layer */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* The "Artifact" - respetcs ratio, never clipped */}
                <div className="relative w-[85%] h-[85%] transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-contain shadow-[5px_10px_30px_rgba(0,0,0,0.2),0px_0px_1px_rgba(0,0,0,0.1)] dark:shadow-[5px_10px_40px_rgba(0,0,0,0.6)]"
                    unoptimized
                  />
                  {/* Material Depth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-white/5 pointer-events-none" />
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {book.author}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {book.amazonUrl && (
                    <Button asChild size="sm" variant="ghost" className="rounded-none border-b border-border hover:bg-transparent hover:border-primary px-0 h-auto pb-1 text-xs font-bold uppercase tracking-widest">
                      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        Purchase <ExternalLink className="ml-2 w-3.5 h-3.5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
