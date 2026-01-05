"use client"

import { useState } from "react"
import { ProjectCard } from "@/components/project-card"
import { EmptyState } from "@/components/empty-state"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
}

type FilterCategory = "All" | "iOS" | "Web" | "Backend" | "AI/ML"

export function ProjectList({ projects, isAdmin, layout = "grid" }: ProjectListProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All")

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true
    
    // Normalize tags for case-insensitive comparison
    const tags = project.tags.map(t => t.toLowerCase())
    
    if (selectedCategory === "iOS") return tags.includes("ios")
    if (selectedCategory === "Web") return tags.includes("web") || tags.includes("react") || tags.includes("next.js")
    if (selectedCategory === "Backend") return tags.includes("backend") || tags.includes("go") || tags.includes("postgresql")
    if (selectedCategory === "AI/ML") return tags.includes("machine learning") || tags.includes("create ml") || tags.includes("computer vision")
    
    return false
  })

  const categories: FilterCategory[] = ["All", "iOS", "Web", "Backend", "AI/ML"]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "rounded-full transition-all",
              selectedCategory === category && "shadow-md"
            )}
          >
            {category}
          </Button>
        ))}
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
        layout === "grid" ? (
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div key={project.id} className="animate-in fade-in zoom-in duration-500">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <ScrollArea className="w-full whitespace-nowrap -mx-4 md:-mx-6">
            <div className="flex w-max space-x-6 md:space-x-8 px-4 md:px-6 py-1">
              {filteredProjects.map((project) => (
                <div key={project.id} className="w-[280px] md:w-[400px] shrink-0 whitespace-normal animate-in fade-in zoom-in duration-500">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )
      )}
    </div>
  )
}
