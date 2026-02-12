import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"

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
    articleOnly?: boolean
  }
  priority?: boolean
}

export function ProjectCard({ project, priority }: ProjectCardProps) {
  const primaryTag = project.tags[0] || ""

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] hover:border-foreground/10 overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              priority={priority}
            />
            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.06)] pointer-events-none" />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-300" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
            <span className="text-xs uppercase tracking-widest font-medium">
              No preview
            </span>
          </div>
        )}

        {/* Article-only badge */}
        {project.articleOnly && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm text-foreground text-xs font-medium px-2.5 py-1 rounded-md border border-border">
            <FileText className="size-3" />
            Article
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Category tag */}
        {primaryTag && (
          <span className="inline-flex self-start text-[11px] font-medium text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-sm">
            {primaryTag}
          </span>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold leading-tight text-foreground group-hover:text-foreground/70 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 text-pretty">
          {project.description}
        </p>

        {/* Read more */}
        <div className="pt-2 flex items-center gap-1.5 text-xs font-medium tracking-wider text-muted-foreground group-hover:text-foreground transition-all duration-200">
          {project.articleOnly ? "Read article" : "Read case study"}
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  )
}
