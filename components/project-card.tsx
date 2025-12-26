import Image from "next/image"
import Link from "next/link"
import { Github, ExternalLink, ArrowRight } from "lucide-react"

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

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
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video w-full bg-muted border-b">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="p-5 flex-1">
        <div className="flex flex-wrap gap-2 mb-3">
          {(project.tags || []).slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/50">
              {tag}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl font-bold tracking-tight">
            {project.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t mt-4">
        <Link 
          href={`/projects/${project.slug}`}
          className="text-sm font-bold flex items-center gap-1 hover:text-primary transition-colors"
        >
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <div className="flex gap-4">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-4 w-4" />
            </Link>
          )}
          {project.appStoreUrl && (
            <Link href={project.appStoreUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <ExternalLink className="h-4 w-4" />
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}