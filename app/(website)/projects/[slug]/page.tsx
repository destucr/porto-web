import { getProject, getProjects } from "@/lib/content"
import { notFound } from "next/navigation"
import { Metadata } from "next"

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return { title: "Project Not Found" }
  }

  return {
    title: project.entry.title,
    description: project.entry.description,
    openGraph: {
      title: project.entry.title,
      description: project.entry.description,
      images: project.entry.image ? [project.entry.image] : [],
    },
  }
}

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Github, ExternalLink, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import Markdoc from "@markdoc/markdoc"
import React from "react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const projectData = await getProject(slug)

  if (!projectData) {
    notFound()
  }

  const { entry: projectEntry } = projectData
  const project = {
    ...projectEntry,
    id: slug,
    slug: slug,
  }

  const isMobile = project.tags?.some(
    (tag: string) => tag.toLowerCase() === "ios" || tag.toLowerCase() === "mobile"
  )

  const isLandscape = project.tags?.some(
    (tag: string) => tag.toLowerCase() === "spritekit" || tag.toLowerCase() === "game"
  )

  const galleryScreenshots =
    project.screenshots?.filter((s: string) => s !== project.image) || []

  interface ImageProps {
    src: string
    alt?: string
    title?: string
  }

  const renderImage = (props: ImageProps) =>
    props.src ? (
      <div className="my-8 overflow-hidden border border-border bg-muted/30">
        <Image
          src={props.src}
          alt={props.alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto"
          unoptimized
        />
        {props.title && (
          <p className="text-center text-xs text-muted-foreground py-3 border-t">
            {props.title}
          </p>
        )}
      </div>
    ) : null

  return (
    <article className="min-h-screen pb-24">
      {project.image && (
        <link rel="preload" as="image" href={project.image} fetchPriority="high" />
      )}

      {/* Sub-nav */}
      <nav className="border-b border-border">
        <div className="container mx-auto h-14 flex items-center justify-between">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/projects">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
          <div className="flex gap-3">
            {project.githubUrl && !project.articleOnly && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> Code
                </Link>
              </Button>
            )}
            {project.appStoreUrl && (
              <Button asChild size="sm">
                <Link href={project.appStoreUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit Website
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto py-12 md:py-20">
        <div className="max-w-[680px] mx-auto space-y-16">
          {/* Header */}
          <header className="space-y-6">
            <span className="label-caps text-primary">Case Study</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              {project.title || "Untitled Project"}
            </h1>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.tags) &&
                project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </header>

          {/* Hero Image */}
          {project.image && (
            <div className="overflow-hidden border border-border aspect-video relative bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1200px) 100vw, 680px"
                className="object-cover object-top"
                priority
              />
            </div>
          )}

          {/* Video Demo */}
          {project.videoUrl && !project.demoUrl && (
            <section className="space-y-4">
              <span className="label-caps text-muted-foreground">Video Demo</span>
              <div className="border border-border bg-black overflow-hidden aspect-video flex items-center justify-center">
                <video
                  src={project.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="w-full h-full"
                  poster={project.image || undefined}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* Screenshots Gallery */}
          {galleryScreenshots.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="label-caps text-muted-foreground flex items-center gap-2">
                  {isMobile ? (
                    <Smartphone className="h-3.5 w-3.5" />
                  ) : (
                    <Monitor className="h-3.5 w-3.5" />
                  )}
                  {isMobile ? "App Screens" : "Platform Gallery"}
                </span>
                <span className="text-xs text-muted-foreground">Swipe to see more</span>
              </div>
              <div className="relative -mx-4 px-4 md:-mx-8 md:px-8 overflow-x-auto pb-6 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                  {galleryScreenshots.map((screenshot: string, index: number) =>
                    isMobile && !isLandscape ? (
                      <div
                        key={index}
                        className="relative h-[440px] aspect-[9/19.5] border border-border overflow-hidden bg-background"
                      >
                        {screenshot && (
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot ${index + 1}`}
                            width={230}
                            height={500}
                            className="object-cover h-full w-auto"
                            unoptimized
                          />
                        )}
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="relative h-[280px] md:h-[360px] aspect-video border border-border overflow-hidden bg-background"
                      >
                        {screenshot && (
                          <Image
                            src={screenshot}
                            alt={`${project.title} screenshot ${index + 1}`}
                            width={800}
                            height={500}
                            className="object-cover h-full w-full"
                            unoptimized
                          />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Case Study Body */}
          <section
            className="prose dark:prose-invert max-w-none
              prose-headings:prose-headings:font-bold prose-headings:tracking-tight
              prose-h4:text-2xl prose-h4:mt-12 prose-h4:mb-6
              prose-p:text-muted-foreground prose-p:text-[17px] prose-p:leading-[1.8]
              prose-li:text-muted-foreground prose-li:text-[17px] prose-li:my-2
              prose-strong:text-foreground prose-strong:font-bold"
          >
            {project.details && typeof project.details === "string" ? (
              Markdoc.renderers.react(
                Markdoc.transform(Markdoc.parse(project.details), {
                  nodes: {
                    image: {
                      render: "Image",
                      attributes: {
                        src: { type: String },
                        alt: { type: String },
                        title: { type: String },
                      },
                    },
                  },
                }),
                React,
                {
                  components: {
                    Image: renderImage,
                  },
                }
              )
            ) : (
              <p className="text-muted-foreground italic text-sm">No details provided.</p>
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
