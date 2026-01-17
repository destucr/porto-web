import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/content"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Projects | iOS Developer Portfolio",
  description: "A showcase of my iOS applications, side projects, and open source contributions.",
}

export default async function ProjectsPage() {
  const isAdmin = false

  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border/40">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-serif font-medium tracking-tight text-foreground">
              Selected Works
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed font-light">
              Technical case studies spanning native iOS engineering, system architecture, and product design.
            </p>
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="relative bg-secondary/20">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectList projects={projects} isAdmin={isAdmin} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}