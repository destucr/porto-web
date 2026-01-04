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
    videoUrl?: string
  }
  priority?: boolean
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  return (
    <div className="group flex flex-col space-y-4">
      {/* Image: Container with fixed aspect ratio and clean reveal */}
      <Link 
        href={`/projects/${project.slug}`} 
        className="block relative aspect-[16/10] overflow-hidden rounded-xl bg-muted border transition-colors group-hover:border-primary/20"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={priority}
        />
      </Link>

      {/* Info: Direct and well-spaced */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {(project.tags || []).slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-lg font-bold leading-none tracking-tight group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`} className="flex items-center gap-1">
              {project.title}
              <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </Link>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  )
}
