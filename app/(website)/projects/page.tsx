import { ProjectList } from "@/components/project-list"
import { getProjects } from "@/lib/content"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Work",
  description: "Everything I've made that survived contact with real users. iOS apps, systems, ML.",
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="pb-28">
      <section className="pt-16 md:pt-24 pb-12">
        <p className="caps mb-5">Work</p>
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          What I&apos;ve made.
        </h1>
        <p className="lede mt-7 max-w-[34rem]">
          No filler. Everything below taught me something I use every day.
        </p>
      </section>

      <section className="pb-4">
        <Suspense fallback={<p className="meta">Loading…</p>}>
          <ProjectList projects={projects} />
        </Suspense>
      </section>
    </div>
  )
}
