"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { EmptyState } from "@/components/empty-state"
import { LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"

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
  articleOnly?: boolean
}

interface ProjectListProps {
  projects: Project[]
  isAdmin?: boolean
  layout?: "grid" | "scroll"
  limit?: number
  showFilters?: boolean
}

type FilterCategory = "All" | "iOS" | "Systems" | "Machine Learning"

export function ProjectList({ projects, isAdmin, limit, showFilters = true }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All")

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true

    const tags = project.tags.map((t) => t.toLowerCase())

    if (selectedCategory === "iOS") return tags.includes("ios")
    if (selectedCategory === "Systems")
      return tags.includes("web") || tags.includes("backend") || tags.includes("go")
    if (selectedCategory === "Machine Learning")
      return tags.includes("machine learning") || tags.includes("create ml")

    return false
  })

  const displayedProjects = limit ? filteredProjects.slice(0, limit) : filteredProjects

  const categories: FilterCategory[] = ["All", "iOS", "Systems", "Machine Learning"]

  return (
    <div className="space-y-8">
      {/* Filter tabs */}
      {showFilters && (
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-6 border-b border-border pb-0 min-w-max md:min-w-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "text-sm font-medium transition-colors pb-3 relative whitespace-nowrap",
                  selectedCategory === category
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={LayoutGrid}
          title="No projects found"
          description={`No ${selectedCategory !== "All" ? selectedCategory : ""} projects found.`}
          actionLabel={isAdmin ? "Go to Admin" : undefined}
          actionHref={isAdmin ? "/admin" : undefined}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  )
}
