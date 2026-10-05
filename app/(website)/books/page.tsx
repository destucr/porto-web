import { getBooks } from "@/lib/content"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reading",
  description: "Books that changed how I build software.",
}

export default async function BooksPage() {
  const books = await getBooks()

  return (
    <div className="pb-28">
      <section className="pt-16 md:pt-24 pb-12">
        <p className="caps mb-5">Reading</p>
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          What I&apos;m reading.
        </h1>
        <p className="lede mt-7 max-w-[34rem]">
          A short shelf. I re-read more than I buy. These are the ones with margin notes.
        </p>
      </section>

      <section className="pb-4">
        <ul className="divide-y divide-border border-y border-border">
          {books.map((book) => (
            <li key={book.title} className="py-6">
              <p className="text-[1.125rem] tracking-tight">{book.title}</p>
              <p className="meta mt-1.5">
                {book.author}
                {book.amazonUrl && (
                  <>
                    {"  ·  "}
                    <a
                      href={book.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="essay-link"
                    >
                      Find it
                    </a>
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
