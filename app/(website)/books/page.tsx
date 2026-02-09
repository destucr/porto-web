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
              {/* Book Cover Container */}
              <div className="relative aspect-[2/3] rounded-r-lg overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/5 border-y border-r border-border/40">
                {/* Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40 z-20 backdrop-blur-[1px] border-r border-white/10" />
                <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/5 z-20" />
                
                {/* Cover Image */}
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover"
                  unoptimized
                />

                {/* Lighting/Gloss Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 z-10 pointer-events-none" />
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    by {book.author}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {book.amazonUrl && (
                    <Button asChild size="sm" variant="outline" className="rounded-full h-9 px-4 text-xs font-bold">
                      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        Amazon <ExternalLink className="ml-1.5 w-3 h-3" />
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
