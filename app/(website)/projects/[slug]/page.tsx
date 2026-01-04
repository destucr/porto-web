import { getProject, getProjects } from "@/lib/keystatic"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Github, ExternalLink, Code2, Layers, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentRenderer } from "@keystatic/core/renderer"
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

  const { entry: project } = projectData

  interface ImageProps {
    src: string;
    alt?: string;
    title?: string;
  }

  const renderImage = (props: ImageProps) => (
    <div className="my-8 rounded-xl overflow-hidden border bg-muted/30">
      <Image
        src={props.src}
        alt={props.alt || ""}
        width={1200}
        height={800}
        className="w-full h-auto"
        unoptimized
      />
      {props.title && (
        <p className="text-center text-xs text-muted-foreground py-3 border-t bg-background/50">
          {props.title}
        </p>
      )}
    </div>
  );

  return (
    <article className="min-h-screen bg-background pb-24">
      {project.image && (
        <link rel="preload" as="image" href={project.image} fetchPriority="high" />
      )}
      <nav className="border-b sticky top-14 bg-background/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link href="/projects">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>
          <div className="flex gap-3">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> Code
                </Link>
              </Button>
            )}
            {project.appStoreUrl && (
              <Button asChild size="sm">
                <Link href={project.appStoreUrl} target="_blank">
                  <ExternalLink className="mr-2 h-4 w-4" /> App Store
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <header className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Project Story</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {project.title || 'Untitled Project'}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {Array.isArray(project.tags) && project.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-md bg-muted border text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Hero Image: Preserving natural aspect ratio */}
          <div className="rounded-2xl border bg-muted/30 overflow-hidden shadow-sm flex items-center justify-center min-h-[400px] relative">
            <Image
              src={project.image || ""}
              alt={project.title || 'Untitled Project'}
              width={1200}
              height={700}
              priority
              unoptimized
              className="max-w-full h-auto max-h-[700px] object-contain"
            />
          </div>

          {/* Video Demo Section */}
          {project.videoUrl && (
            <section className="space-y-8">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> Video Demo
              </h3>
              <div className="rounded-2xl border bg-black overflow-hidden shadow-xl aspect-video md:aspect-[16/9] flex items-center justify-center">
                <video 
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls 
                  className="w-full h-full"
                  poster={project.image || ""}
                >
                  <source src={project.videoUrl} type={project.videoUrl.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'} />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* App Screenshots Gallery */}
          {project.screenshots && project.screenshots.length > 0 && (
            <section className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Smartphone className="h-4 w-4" /> App Screens
                </h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Swipe to see more →</p>
              </div>
              <div className="relative -mx-4 px-4 md:-mx-8 md:px-8 overflow-x-auto pb-8 scrollbar-hide">
                <div className="flex gap-6 min-w-max">
                  {project.screenshots.map((screenshot: string, index: number) => (
                    <div key={index} className="relative h-[500px] aspect-[9/19.5] rounded-[2rem] border-[6px] border-muted shadow-lg overflow-hidden bg-background">
                      <Image
                        src={screenshot}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={230}
                        height={500}
                        className="object-cover h-full w-auto"
                        unoptimized
                      />
                      {/* Dynamic Island Mockup */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-10" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Case Study Body */}
          <div className="grid md:grid-cols-3 gap-16 pt-8">
            {/* Sidebar Metadata */}
            <aside className="md:col-span-1 space-y-8">
              <div className="space-y-4 pt-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> The Focus
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I built this as a native iOS app using clean code and a simple design.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-12">
              <section className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Layers className="h-4 w-4" /> What is it?
                </h3>
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed tracking-tight">
                  {project.description}
                </p>
              </section>

              <section className="space-y-8 prose dark:prose-invert max-w-none prose-h4:text-2xl prose-h4:font-bold prose-h4:tracking-tight prose-p:text-muted-foreground prose-p:text-[17px] prose-li:text-muted-foreground prose-li:text-[17px]">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary not-prose mb-6">How I built it</h3>
                {project.details && typeof project.details === 'string' ? (
                  /* Handle raw Markdoc string (Static mode) */
                  Markdoc.renderers.react(
                    Markdoc.transform(Markdoc.parse(project.details), {
                      nodes: {
                        image: {
                          render: 'Image',
                          attributes: {
                            src: { type: String },
                            alt: { type: String },
                            title: { type: String }
                          }
                        }
                      }
                    }), 
                    React, 
                    {
                      components: {
                        Image: renderImage
                      }
                    }
                  )
                ) : project.details && (typeof project.details === 'object' && 'content' in project.details && Array.isArray(project.details.content)) ? (
                  /* Handle Keystatic content object */
                  <DocumentRenderer 
                    document={project.details.content} 
                    renderers={{
                      block: {
                        image: renderImage,
                      },
                    }}
                  />
                ) : project.details && Array.isArray(project.details) ? (
                  /* Handle Keystatic nodes array */
                  <DocumentRenderer 
                    document={project.details}
                    renderers={{
                      block: {
                        image: renderImage,
                      },
                    }}
                  />
                ) : (
                  <p className="text-muted-foreground italic text-sm">No details provided.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}