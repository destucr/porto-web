import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/content"
import { HeroSection } from "@/components/hero-section"
import { CopyEmail } from "@/components/copy-email"

export default async function Home() {
  const allPosts = await getPosts()
  const post = allPosts[0]

  return (
    <div className="pb-16">
      <HeroSection />

      <div className="mt-4 space-y-4 leading-[1.75] text-foreground/85 max-w-[38rem]">
        <p className="reveal" style={{ animationDelay: "120ms" }}>
          Outside that work, I also make my own apps.{" "}
          <Link href="/projects/tiny-app-baby-heartbeat-listener" className="essay-link text-foreground">
            Tiny
          </Link>{" "}
          lets parents-to-be listen to womb sounds through AirPods.{" "}
          <Link href="/projects/telly-bisindo-sign-language-learning" className="essay-link text-foreground">
            Telly
          </Link>{" "}
          teaches Indonesian Sign Language using the camera.{" "}
          <Link href="/projects/solari-running-companion" className="essay-link text-foreground">
            Solari
          </Link>{" "}
          tracks runs.{" "}
          <Link href="/projects/gtfs-web" className="essay-link text-foreground">
            GTFS-Web
          </Link>{" "}
          manages bus routes and timetables.{" "}
          <Link href="/projects" className="essay-link text-foreground whitespace-nowrap">
            Everything I&apos;ve made →
          </Link>
        </p>

        <p className="reveal" style={{ animationDelay: "160ms" }}>
          I completed the Apple Developer Academy @ BINUS, then worked at Bullion Ecosystem
          International (Nunomics, a gold trading app) and Nusantara Beta Studio before joining
          Tring!.
        </p>

        {post && (
          <p className="reveal" style={{ animationDelay: "200ms" }}>
            I wrote{" "}
            <Link href={`/blog/${post.slug}`} className="essay-link text-foreground">
              {post.title}
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
          . I read every message and answer within a few days.
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
