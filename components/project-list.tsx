"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { EmptyState } from "@/components/empty-state"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
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
}

interface ProjectListProps {
  projects: Project[]
  isAdmin?: boolean
  layout?: "grid" | "scroll"
  limit?: number
}

type FilterCategory = "All" | "iOS" | "Systems" | "Machine Learning"

export function ProjectList({ projects, isAdmin, limit }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All")
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true
    
    // Normalize tags for case-insensitive comparison
    const tags = project.tags.map(t => t.toLowerCase())
    
    if (selectedCategory === "iOS") return tags.includes("ios")
    if (selectedCategory === "Systems") return tags.includes("web") || tags.includes("backend") || tags.includes("go")
    if (selectedCategory === "Machine Learning") return tags.includes("machine learning") || tags.includes("create ml")
    
    return false
  })

  const categories: FilterCategory[] = ["All", "iOS", "Systems", "Machine Learning"]

  const displayedProjects = limit && !isExpanded 
    ? filteredProjects.slice(0, limit) 
    : filteredProjects

  const hasMore = limit && filteredProjects.length > limit

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Filter tabs - horizontal scroll on mobile */}
      <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-4 md:gap-8 border-b border-border/40 pb-3 md:pb-4 min-w-max md:min-w-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "text-xs md:text-sm font-medium transition-colors hover:text-foreground relative pb-3 md:pb-4 -mb-3 md:-mb-4 whitespace-nowrap",
                selectedCategory === category 
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground" 
                  : "text-muted-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState 
          icon={LayoutGrid}
          title="No projects found"
          description={`No ${selectedCategory !== "All" ? selectedCategory : ""} projects found.`}
          actionLabel={isAdmin ? "Go to Admin" : undefined}
          actionHref={isAdmin ? "/admin" : undefined}
        />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedProjects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsExpanded(true)}
                className="rounded-full px-8"
              >
                See More Projects
              </Button>
            </div>
          )}

          {isExpanded && limit && (
            <div className="flex justify-center pt-4">
              <Button 
                variant="ghost" 
                onClick={() => setIsExpanded(false)}
                className="rounded-full px-8 text-muted-foreground hover:text-foreground"
              >
                See Less
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
