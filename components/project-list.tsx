import { ProjectCard } from "@/components/project-card"
import { EmptyState } from "@/components/empty-state"
import { LayoutGrid } from "lucide-react"

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
  isAdmin?: boolean
}

export function ProjectList({ projects, isAdmin }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <EmptyState 
        icon={LayoutGrid}
        title="No projects found"
        description="A showcase of native iOS applications and technical case studies is being prepared."
        actionLabel={isAdmin ? "Go to Admin" : undefined}
        actionHref={isAdmin ? "/admin" : undefined}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
