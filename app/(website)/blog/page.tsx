import Link from "next/link"
import { Metadata } from "next"
import { getPosts } from "@/lib/content"

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on iOS, engineering judgment, and building software that lasts.",
}

export default async function BlogPage() {
  const blogPosts = (await getPosts()) || []

  blogPosts.sort(
    (a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime()
  )

  return (
    <div className="pb-28">
      <section className="pt-16 md:pt-24 pb-12">
        <p className="caps mb-5">Writing</p>
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Notes.
        </h1>
        <p className="lede mt-7 max-w-[34rem]">
          Written when I have something to say. Usually after something breaks and I finally
          understand why.
        </p>
      </section>

      <section className="pb-4">
        {blogPosts.length === 0 ? (
          <p className="text-foreground/75">Nothing here yet.</p>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {blogPosts.map((post) => (
              <li key={post.slug} className="py-7">
                <p className="meta mb-2.5">
                  {post.date
                    ? new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                  {(post.tags || []).length > 0 ? ` · ${(post.tags || []).join(" · ")}` : ""}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="index-link text-[1.375rem] font-medium tracking-tight text-foreground"
                >
                  {post.title}
                </Link>
                <p className="mt-2.5 text-foreground/70 leading-[1.75]">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
