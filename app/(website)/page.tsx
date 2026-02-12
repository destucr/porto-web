import Link from "next/link"
import Image from "next/image"
import { getProjects, getPosts } from "@/lib/content"
import { TechnicalSpotlight } from "@/components/technical-spotlight"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { FloatingShapes } from "@/components/floating-shapes"
import { ParallaxImage } from "@/components/parallax-image"
import { StaggerReveal } from "@/components/stagger-reveal"
import { HeroDevices } from "@/components/hero-devices"

export default async function Home() {
  const allProjects = await getProjects()
  const allPosts = await getPosts()
  const featuredPost = allPosts[0]

  return (
    <div className="min-h-dvh">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 lg:pt-44 pb-8 md:pb-12 overflow-hidden">
        <FloatingShapes />
        <div className="container mx-auto relative">

          {/* Text — centered */}
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-16 md:mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.05] text-foreground text-balance">
              Destu Cikal
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-lg mx-auto opacity-0 animate-fade-in delay-100">
              iOS Developer crafting native apps with Swift, UIKit, and SwiftUI.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2 opacity-0 animate-fade-in delay-200">
              <Button asChild size="lg">
                <Link href="/projects">See my work</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">Get in touch</Link>
              </Button>
            </div>
          </div>

          {/* Device showcase */}
          <HeroDevices />

        </div>
      </section>

      {/* ── Experience & Education ────────────────────────── */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="container mx-auto">
          <ScrollReveal>
            <p className="label-caps mb-8">Experience &amp; Education</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  logo: "/images/bullion-logo.webp",
                  alt: "Bullion Ecosystem International",
                  name: "Bullion Ecosystem International",
                  role: "iOS Developer",
                  year: "2026",
                },
                {
                  logo: "/images/apple-developer-academy-binus.webp",
                  alt: "Apple Developer Academy @ BINUS",
                  name: "Apple Developer Academy @ BINUS",
                  role: "Graduated",
                  year: "2025",
                },
                {
                  logo: "/images/telkom-university-logo.webp",
                  alt: "Telkom University",
                  name: "Telkom University",
                  role: "Software Engineering",
                  year: "2026",
                },
              ].map((item, i) => (
                <div key={i} className="group/item flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-foreground/[0.03]">
                  <div className="flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110">
                    <Image
                      src={item.logo}
                      alt={item.alt}
                      width={40}
                      height={40}
                      className="size-10 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0 transition-transform duration-300 group-hover/item:translate-x-1">
                    <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                    <p className="text-[13px] text-muted-foreground mt-0.5">{item.role} &middot; {item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Technical Spotlight ──────────────────────────── */}
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container mx-auto">
          <ScrollReveal>
            <TechnicalSpotlight projects={allProjects} />
          </ScrollReveal>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────── */}
      <section id="projects" className="py-20 md:py-28">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                  Projects
                </h2>
                <p className="text-muted-foreground text-pretty">
                  A closer look at selected work across platforms.
                </p>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                View all
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Featured project — full-width hero */}
          {allProjects[0] && (
            <ScrollReveal>
              <Link
                href={`/projects/${allProjects[0].slug}`}
                className="group block rounded-xl border border-border overflow-hidden mb-10 transition-all duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] hover:border-foreground/10"
              >
                <div className="relative aspect-[2/1] md:aspect-[2.4/1] overflow-hidden bg-muted">
                  <ParallaxImage
                    src={allProjects[0].image}
                    alt={allProjects[0].title}
                    className="absolute inset-0 w-full h-full"
                    intensity={30}
                    priority
                  />
                </div>

                <div className="p-5 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      {allProjects[0].tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[11px] font-medium text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight group-hover:text-muted-foreground transition-colors">
                      {allProjects[0].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      {allProjects[0].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors shrink-0">
                    Read case study
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Supporting projects — compact grid */}
          <StaggerReveal staggerMs={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            {allProjects.slice(1).map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-muted mb-4 transition-shadow duration-300 group-hover:shadow-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  {project.articleOnly && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-md border border-border">
                      <FileText className="size-3" />
                      Article
                    </div>
                  )}
                  {/* Hover overlay with arrow */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 flex items-end justify-end p-4">
                    <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                      <ArrowUpRight className="size-5 text-foreground drop-shadow-sm" />
                    </div>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {project.tags[0]}
                </span>
                <h3 className="text-lg font-bold text-foreground mt-1 group-hover:text-muted-foreground transition-colors duration-200 leading-snug">
                  {project.title}
                </h3>
              </Link>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Writing ──────────────────────────────────────── */}
      {featuredPost && (
        <section id="writing" className="py-20 md:py-28 border-t border-border">
          <div className="container mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="label-caps mb-10">Writing</p>

              <blockquote className="text-2xl md:text-3xl lg:text-[2.125rem] italic leading-snug text-foreground/85 text-pretty">
                &ldquo;{featuredPost.excerpt}&rdquo;
              </blockquote>

              <hr className="my-8 border-border" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="text-lg font-bold text-foreground hover:text-muted-foreground transition-colors"
                  >
                    {featuredPost.title}
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(featuredPost.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
                >
                  All posts
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="py-24 md:py-36 bg-foreground text-background">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Let&apos;s work together
              </h2>
              {/* Animated gradient line beneath headline */}
              <div className="mx-auto h-[2px] w-24 rounded-full bg-gradient-to-r from-transparent via-background/50 to-transparent animate-gradient-shift" style={{ backgroundSize: "200% 100%" }} />
              <p className="text-background/60 text-lg">
                Available for iOS development, freelance projects, and collaborations.
              </p>
              <div>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-background/25 text-background shadow-none hover:bg-background hover:text-foreground hover:border-background dark:bg-transparent dark:border-background/25 dark:hover:bg-background dark:hover:text-foreground">
                  <a href="mailto:destucr@gmail.com">
                    destucr@gmail.com
                    <ArrowUpRight className="size-4 ml-2" />
                  </a>
                </Button>
              </div>
              <div className="flex items-center justify-center gap-8 text-sm text-background/40">
                <Link
                  href="https://linkedin.com/in/destucikal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-all duration-200 hover:-translate-y-0.5"
                >
                  LinkedIn
                </Link>
                <Link
                  href="https://github.com/destucr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-all duration-200 hover:-translate-y-0.5"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
