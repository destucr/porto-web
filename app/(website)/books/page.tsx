import { getBooks } from "@/lib/content"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Books",
  description: "Books that shaped my engineering practice.",
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <span className="label-caps text-primary">Library</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Books
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technical texts that shaped my engineering practice.
            </p>
          </div>
        </div>
      </section>

      {/* Book grid */}
      <section>
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {books.map((book) => (
              <div key={book.title} className="group flex flex-col">
                {/* Book cover */}
                <div className="relative aspect-[2/3] flex items-center justify-center bg-muted border border-border overflow-hidden transition-colors duration-300 group-hover:bg-muted/80">
                  <div className="relative w-[90%] h-[90%] transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 280px"
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-1">
                  <h3 className="text-sm font-medium text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  {book.amazonUrl && (
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                    >
                      Amazon
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
