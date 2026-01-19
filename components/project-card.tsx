import Image from "next/image"
import Link from "next/link"

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
    <div className="group flex flex-col space-y-3">
      {/* Image: Smaller, cleaner */}
      <Link
        href={`/projects/${project.slug}`}
        className="block relative aspect-[16/9] overflow-hidden rounded-lg bg-muted border border-border/40"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top transition-all duration-500 ease-out group-hover:scale-[1.02]"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 text-muted-foreground/40">
            <div className="w-full h-full opacity-[0.05] bg-[linear-gradient(45deg,currentColor_25%,transparent_25%,transparent_50%,currentColor_50%,currentColor_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />
            <span className="absolute text-xs uppercase tracking-widest font-medium border border-border/50 px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm">
              No Preview
            </span>
          </div>
        )}
      </Link>

      {/* Info: Compact */}
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-medium tracking-wide uppercase text-muted-foreground">
          {(project.tags || []).slice(0, 2).map((tag, i) => (
            <span key={tag} className="flex items-center">
              {tag}
              {i < (project.tags || []).slice(0, 2).length - 1 && (
                <span className="mx-1.5 opacity-30">•</span>
              )}
            </span>
          ))}
        </div>

        <h3 className="text-base md:text-lg font-medium leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  )
}
