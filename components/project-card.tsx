import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    slug: string
    title: string
    description: string
    image: string
    tags: readonly string[]
    githubUrl?: string
    appStoreUrl?: string | null
    demoUrl?: string
    videoUrl?: string
  }
  priority?: boolean
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <div className="group flex flex-col space-y-5">
      {/* Image: Editorial Aspect Ratio, no border radius for sharpness */}
      <Link
        href={`/projects/${project.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-muted"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-[1.03]"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-xs uppercase tracking-widest">No Preview</span>
          </div>
        )}
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.02]" />
      </Link>

      {/* Info: Minimal typography */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {(project.tags || []).slice(0, 3).map((tag, i) => (
            <span key={tag} className="flex items-center">
              {tag}
              {i < (project.tags || []).slice(0, 3).length - 1 && (
                <span className="mx-2 opacity-30">/</span>
              )}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-semibold tracking-tight leading-tight">
            <Link href={`/projects/${project.slug}`} className="flex items-baseline gap-2 group-hover:opacity-70 transition-opacity">
              {project.title}
            </Link>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed line-clamp-2 max-w-md">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}
