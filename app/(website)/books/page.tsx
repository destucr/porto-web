import { getBooks } from "@/lib/content"
import Image from "next/image"
import { ExternalLink, BookOpen } from "lucide-react"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {books.map((book) => (
            <div key={book.title} className="group flex flex-col space-y-6">
              {/* Book Cover Container */}
              <div className="relative aspect-[3/4] rounded-r-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20 group-hover:shadow-3xl border-y border-r border-border/40">
                {/* Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/30 z-20 backdrop-blur-[1px] border-r border-white/5" />
                <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-white/10 z-20" />
                
                {/* Cover Image */}
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />

                {/* Lighting/Gloss Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 z-10 pointer-events-none" />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary/60">
                    <BookOpen className="w-3 h-3" />
                    <span>Highly Recommended</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground leading-tight">
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
                  {book.idBookstoreUrl && (
                    <Button asChild size="sm" variant="secondary" className="rounded-full h-9 px-4 text-xs font-bold">
                      <a href={book.idBookstoreUrl} target="_blank" rel="noopener noreferrer">
                        Tokopedia <ExternalLink className="ml-1.5 w-3 h-3" />
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
