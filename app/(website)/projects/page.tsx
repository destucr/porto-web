import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/keystatic"
import { getServerSession } from "next-auth/next"
import { Metadata } from "next"
import { Suspense } from "react"

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Projects | iOS Developer Portfolio",
  description: "A showcase of my iOS applications, side projects, and open source contributions.",
}

export default async function ProjectsPage() {
  const session = await getServerSession()
  const isAdmin = session?.user?.email === "destucr@gmail.com"
  
  const projects = await getProjects()

  return (
    <div className="container mx-auto py-24 lg:py-40">
      <div className="flex flex-col gap-6 mb-20 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Projects
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Technical case studies spanning native iOS engineering, product strategy, and computer vision.
        </p>
      </div>
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectList projects={projects} isAdmin={isAdmin} />
      </Suspense>
    </div>
  )
}
