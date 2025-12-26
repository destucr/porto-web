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
import { ChevronLeft, Github, ExternalLink, Code2, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentRenderer } from "@keystatic/core/renderer"

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

  return (
    <article className="min-h-screen bg-background pb-24">
      {/* Sub-Nav: Focus on returning to work */}
      <nav className="border-b sticky top-14 bg-background/80 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="-ml-2 text-muted-foreground">
            <Link href="/projects">
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
          <div className="flex gap-3">
            {project.githubUrl && (
              <Button asChild variant="outline" size="sm">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="mr-2 h-4 w-4" /> Source
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
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Technical Case Study</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                {project.title}
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
              alt={project.title}
              width={1200}
              height={700}
              priority
              unoptimized
              className="max-w-full h-auto max-h-[700px] object-contain"
            />
          </div>

          {/* Case Study Body */}
          <div className="grid md:grid-cols-3 gap-16 pt-8">
            {/* Sidebar Metadata */}
            <aside className="md:col-span-1 space-y-8">
              <div className="space-y-4 pt-1">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> Role & Context
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Developed as a native iOS solution {Array.isArray(project.tags) && project.tags.length > 0 ? `with a focus on ${project.tags[0]} integration` : ""} and clean architecture.
                </p>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-12">
              <section className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <Layers className="h-4 w-4" /> Overview
                </h3>
                <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed tracking-tight">
                  {project.description}
                </p>
              </section>

              <section className="space-y-8 prose dark:prose-invert max-w-none prose-h4:text-2xl prose-h4:font-bold prose-h4:tracking-tight prose-p:text-muted-foreground prose-p:text-[17px] prose-li:text-muted-foreground prose-li:text-[17px]">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary not-prose mb-6">Implementation Details</h3>
                {project.details && (typeof project.details === 'object' && 'content' in project.details && Array.isArray(project.details.content)) ? (
                  <DocumentRenderer document={project.details.content} />
                ) : project.details && Array.isArray(project.details) ? (
                  <DocumentRenderer document={project.details} />
                ) : (
                  <p className="text-muted-foreground italic text-sm">No implementation details provided.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
