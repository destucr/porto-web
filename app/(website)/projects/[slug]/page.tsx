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
    return { title: "Not found" }
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
import { SwipeNav } from "@/components/swipe-nav"
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

  const galleryScreenshots =
    project.screenshots?.filter((s: string) => s !== project.image) || []

  // Neighbors in the index order — case notes read like pages in a file.
  const allProjects = await getProjects()
  const position = allProjects.findIndex((p) => p.slug === slug)
  const prev = position > 0 ? allProjects[position - 1] : null
  const next = position >= 0 && position < allProjects.length - 1 ? allProjects[position + 1] : null

  interface ImageProps {
    src: string
    alt?: string
    title?: string
  }

  const renderImage = (props: ImageProps) =>
    props.src ? (
      <figure className="my-10">
        <Image
          src={props.src}
          alt={props.alt || ""}
          width={1200}
          height={800}
          className="w-full h-auto border border-border"
          unoptimized
        />
        {props.title && <figcaption className="meta text-center mt-3">{props.title}</figcaption>}
      </figure>
    ) : null

  return (
    <article className="pb-28">
      <SwipeNav
        prevHref={prev ? `/projects/${prev.slug}` : null}
        nextHref={next ? `/projects/${next.slug}` : null}
      >
      <div className="pt-12 md:pt-16 pb-10">
        <Link href="/projects" className="essay-link meta">
          ← All work
        </Link>
        <p className="caps mt-10 mb-5">Case note</p>
        <h1 className="text-[clamp(2rem,5.5vw,3rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
          {project.title || "Untitled"}
        </h1>
        <p className="lede mt-7">{project.description}</p>
        <p className="meta tnum mt-6">
          {Array.isArray(project.tags) ? project.tags.join(" · ") : ""}
        </p>
        {(project.githubUrl || project.appStoreUrl) && (
          <p className="meta tnum mt-6">
            {project.githubUrl && !project.articleOnly && (
              <>
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="essay-link"
                >
                  Code
                </Link>
                {project.appStoreUrl && "  ·  "}
              </>
            )}
            {project.appStoreUrl && (
              <Link
                href={project.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="essay-link"
              >
                Visit
              </Link>
            )}
          </p>
        )}
      </div>

      <hr className="essay-rule" />

      {project.image && (
        <figure className="py-10">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="w-full h-auto border border-border transition-transform duration-500 ease-out hover:scale-[1.015]"
            priority
            unoptimized
          />
        </figure>
      )}

      <section
        className="prose dark:prose-invert max-w-none pt-10
          prose-p:text-foreground/80 prose-p:text-[1rem] prose-p:leading-[1.8]
          prose-headings:font-semibold prose-headings:tracking-tight
          prose-h4:text-[1.25rem] prose-h4:mt-12 prose-h4:mb-4
          prose-li:text-foreground/80 prose-li:leading-[1.8]
          prose-strong:text-foreground prose-strong:font-semibold
          prose-a:underline prose-a:underline-offset-4"
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
          <p className="italic meta">No notes yet.</p>
        )}
      </section>

      {project.videoUrl && !project.demoUrl && (
        <figure className="py-10" data-noswipe>
          <p className="caps mb-4">Demo</p>
          <video
            src={project.videoUrl}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full h-auto border border-border bg-black"
            poster={project.image || undefined}
          >
            Your browser does not support the video tag.
          </video>
          <figcaption className="meta mt-3">Recorded on device.</figcaption>
        </figure>
      )}

      {galleryScreenshots.length > 0 && (
        <div className="pb-4" data-noswipe>
          <p className="caps mb-4">Screens</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryScreenshots.slice(0, 6).map((screenshot: string, index: number) => (
              <div key={index} className="border border-border overflow-hidden bg-muted/30">
                {screenshot && (
                  <Image
                    src={screenshot}
                    alt={`${project.title} ${index + 1}`}
                    width={600}
                    height={800}
                    className="w-full h-auto"
                    unoptimized
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <hr className="essay-rule mt-16" />
      <nav className="mt-8 flex items-start justify-between gap-6" aria-label="More work">        <span className="min-w-0">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="essay-link text-[0.9375rem]">
              ← {prev.title}
            </Link>
          ) : (
            <Link href="/projects" className="essay-link meta">
              ← All work
            </Link>
          )}
        </span>
        {next && (
          <Link
            href={`/projects/${next.slug}`}
            className="essay-link text-[0.9375rem] text-right shrink-0 max-w-[60%]"
          >
            {next.title} →
          </Link>
        )}
      </nav>
      </SwipeNav>
    </article>
  )
}
