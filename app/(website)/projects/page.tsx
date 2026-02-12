import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/content"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Projects",
  description: "Native iOS applications, full-stack web platforms, and machine learning implementations by Destu Cikal.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border">
        <div className="container mx-auto py-16 md:py-24">
          <div className="max-w-2xl space-y-4">
            <span className="label-caps text-primary">Selected Work</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Technical case studies spanning native iOS engineering, system architecture, and product design.
            </p>
          </div>
        </div>
      </section>

      {/* Project list */}
      <section>
        <div className="container mx-auto py-16 md:py-24">
          <Suspense fallback={<div className="text-muted-foreground">Loading projects...</div>}>
            <ProjectList projects={projects} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
