import { getBooks } from "@/lib/content"
import Image from "next/image"
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
            Books
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technical and philosophical texts that shaped my engineering practice.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16">
          {books.map((book) => (
            <div key={book.title} className="group flex flex-col">
              {/* Intentional Gallery Stage */}
              <div className="relative aspect-[2/3] flex items-center justify-center bg-secondary/5 rounded-sm border border-border/40 overflow-hidden transition-colors duration-500 group-hover:bg-secondary/10">
                {/* Perspective Shadow Layer */}
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* The "Artifact" - respetcs ratio, never clipped */}
                <div className="relative w-[92%] h-[92%] transition-transform duration-500 group-hover:-translate-y-1">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 280px"
                    className="object-contain shadow-[5px_10px_30px_rgba(0,0,0,0.15),0px_0px_1px_rgba(0,0,0,0.1)] dark:shadow-[5px_10px_40px_rgba(0,0,0,0.5)]"
                    unoptimized
                  />
                  {/* Material Depth Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-white/5 pointer-events-none" />
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-base font-medium text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {book.author}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  {book.amazonUrl && (
                    <a 
                      href={book.amazonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors border-b border-border hover:border-primary pb-0.5"
                    >
                      Amazon
                    </a>
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
