import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/content"
import { HeroSection } from "@/components/hero-section"
import { CopyEmail } from "@/components/copy-email"
import { getKeypauseUpvotes } from "@/lib/producthunt"

export default async function Home() {
  const allPosts = await getPosts()
  const post = allPosts[0]
  const upvotes = await getKeypauseUpvotes()

  return (
    <div className="pb-16">
      <HeroSection />

      <div className="mt-4 space-y-4 leading-[1.75] text-foreground/85 max-w-[38rem]">
        <p className="reveal" style={{ animationDelay: "60ms" }}>
          Right now I&apos;m building{" "}
          <Image
            src="/images/urai-icon.png"
            alt=""
            width={20}
            height={20}
            className="inline-block size-5 rounded-[5px] border border-border align-[-3px] mr-1"
            unoptimized
          />
          <a href="https://urai.destucikal.site" className="essay-link text-foreground">
            Urai
          </a>
          , a place to share what you learn from programming books. The iPhone beta opens soon.
        </p>

        <p className="reveal" style={{ animationDelay: "100ms" }}>
          I also just released{" "}
          <Image
            src="/images/keypause-icon.png"
            alt=""
            width={20}
            height={20}
            className="inline-block size-5 rounded-[5px] border border-border align-[-3px] mr-1"
            unoptimized
          />
          <span className="text-foreground">Keypause</span>, a free Mac app that turns every key off while you clean the keyboard.{" "}
          <a href="https://destucr.github.io/Keypause/" className="essay-link text-foreground">
            Download it for Mac
          </a>
          , or read{" "}
          <Link href="/projects/keypause" className="essay-link text-foreground">
            how I built it
          </Link>
          .
          {upvotes !== null && (
            <>
              {" "}
              <a
                href="https://www.producthunt.com/products/keypause"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${upvotes} upvotes on Product Hunt`}
                title={`${upvotes} upvotes on Product Hunt`}
                className="inline-flex items-center gap-1 whitespace-nowrap align-[-1px] text-[0.875rem] text-muted-foreground tabular-nums transition-colors hover:text-[#ff6154]"
              >
                <svg viewBox="0 0 31 31" className="size-[14px]" aria-hidden="true" fill="currentColor">
                  <path d="M31 15.5C31 24.06 24.06 31 15.5 31S0 24.06 0 15.5 6.94 0 15.5 0 31 6.94 31 15.5" />
                  <path
                    fill="var(--background)"
                    d="M17.43 15.96h-4.34v-4.65h4.34a2.33 2.33 0 1 1 0 4.65m0-7.75h-7.4v15.5h3.06v-4.65h4.34c2.96 0 5.37-2.43 5.37-5.43s-2.4-5.42-5.37-5.42"
                  />
                </svg>
                {upvotes}
              </a>
            </>
          )}
        </p>

        <p className="reveal" style={{ animationDelay: "120ms" }}>
          Before these, I made{" "}
          <span className="text-foreground">Tiny</span>, which plays womb sounds through AirPods, and{" "}
          <span className="text-foreground">Telly</span>, which teaches Indonesian Sign Language.{" "}
          <Link href="/projects" className="essay-link text-foreground whitespace-nowrap">
            Everything I&apos;ve made →
          </Link>
        </p>

        <p className="reveal" style={{ animationDelay: "160ms" }}>
          Before Tring!, I was in the Apple Developer Academy @ BINUS (2025) and worked at Bullion
          Ecosystem International and Nusantara Beta Studio.
        </p>

        {post && (
          <p className="reveal" style={{ animationDelay: "200ms" }}>
            I wrote about{" "}
            <Link href={`/blog/${post.slug}`} className="essay-link text-foreground">
              why SwiftUI habits clash with UIKit
            </Link>
            .
          </p>
        )}

        <p id="contact" className="reveal scroll-mt-16" style={{ animationDelay: "240ms" }}>
          I&apos;m open to freelance work or a new full time role. Write to me at{" "}
          <CopyEmail email="destucr@gmail.com" />, or message me on{" "}
          <Link
            href="https://linkedin.com/in/destucikal"
            target="_blank"
            rel="noopener noreferrer"
            className="essay-link text-foreground"
          >
            LinkedIn
          </Link>
          .
        </p>
      </div>

      <div className="mt-10 md:mt-12 flex items-start justify-center gap-4 sm:gap-5">
        {[
          { slug: "tiny-app-baby-heartbeat-listener", name: "Tiny", src: "/images/tiny-livelisten-start.webp", alt: "Tiny app, live listening session" },
          { slug: "telly-bisindo-sign-language-learning", name: "Telly", src: "/images/telly-home-course.webp", alt: "Telly app, course home" },
          { slug: "solari-running-companion", name: "Solari", src: "/images/solari-runhome.webp", alt: "Solari app, home with stats" },
        ].map((app) => (
          <figure key={app.slug} className="w-40 sm:w-48 shrink">
            <Link
              href={`/projects/${app.slug}`}
              aria-label={`${app.name} case study`}
              className="block transition-transform duration-300 ease-out hover:scale-[1.03]"
            >
              <span className="relative block overflow-hidden rounded-[22px] sm:rounded-[27px] border-2 border-foreground bg-black">
                <span className="relative block aspect-[393/852]">
                  <Image
                    src={app.src}
                    alt={app.alt}
                    fill
                    sizes="192px"
                    className="object-cover object-top"
                    unoptimized
                  />
                </span>
              </span>
            </Link>
            <figcaption className="meta tnum mt-3 text-center">
              {app.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
