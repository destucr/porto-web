import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/content"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Projects | Software Engineering Portfolio",
  description: "A showcase of native iOS applications, full-stack web platforms, and machine learning experiments.",
}

export default async function ProjectsPage() {
  const isAdmin = false

  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative border-b border-border/40">
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
              Selected Works
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
              Technical case studies spanning native iOS engineering, system architecture, and product design.
            </p>
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="relative">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectList projects={projects} isAdmin={isAdmin} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}