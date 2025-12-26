import { ProjectCard } from "@/components/project-card"

interface Project {
  id: string
  slug: string
  title: string
  description: string
  image: string
  tags: readonly string[]
  githubUrl?: string
  appStoreUrl?: string | null
  details?: string
  videoUrl?: string
}

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
