import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface Project {
  id: string
  slug: string
  title: string
  short?: string
  description: string
  tags: readonly string[]
  articleOnly?: boolean
  year?: string
}

// Quiet ledger, same voice as the homepage: hairlines, serif titles,
// one mono index number per row, a single platform tag. No boxes.
export function ProjectList({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return <p className="text-foreground/70">No projects yet.</p>
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {projects.map((project, i) => (
        <li key={project.id}>
          <Link
            href={`/projects/${project.slug}`}
            className="group flex items-baseline gap-4 py-6"
          >
            <span className="meta tnum shrink-0 tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline">
                <span className="index-link font-serif text-[1.25rem] tracking-tight text-foreground min-w-0 leading-snug">
                  {project.short || project.title}
                </span>
                <span className="leader" aria-hidden="true" />
                <span className="meta tnum shrink-0">
                  {project.tags[0]}
                  {project.year ? ` · ${project.year}` : ""}
                  {project.articleOnly ? " · Essay" : ""}
                </span>
              </span>
              <span className="mt-1.5 block text-[0.9375rem] leading-[1.65] text-muted-foreground">
                {project.description}
              </span>
            </span>
            <ChevronRight
              className="size-4 shrink-0 self-center text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-1 group-hover:text-foreground"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
