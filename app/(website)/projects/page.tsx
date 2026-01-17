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
    <div className="min-h-screen">
      {/* Header with glow */}
      <section className="relative glow-subtle">
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-32">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Projects
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Technical case studies spanning native iOS engineering, product strategy, and computer vision.
            </p>
          </div>
        </div>
        <div className="divider-fade" />
      </section>

      {/* Project list with dot grid */}
      <section className="relative dot-grid">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectList projects={projects} isAdmin={isAdmin} />
          </Suspense>
        </div>
      </section>
    </div>
  )
}