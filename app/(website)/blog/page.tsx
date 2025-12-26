import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Metadata } from "next"
import { getServerSession } from "next-auth/next"
import { getPosts } from "@/lib/keystatic"
import { EmptyState } from "@/components/empty-state"
import { PenLine } from "lucide-react"

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog | iOS Developer Portfolio",
  description: "Technical articles, tutorials, and thoughts on iOS development.",
}

export default async function BlogPage() {
  const session = await getServerSession()
  const isAdmin = session?.user?.email === "destucr@gmail.com"

  const blogPosts = await getPosts()
  
  // Sort posts by date descending
  blogPosts.sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())

  return (
    <div className="container mx-auto py-12 md:py-24">
       <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-12">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights on Swift and iOS development.
          </p>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader>
               <div className="text-sm text-muted-foreground mb-2">{post.date}</div>
              <CardTitle className="line-clamp-2">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
            </CardContent>
            <CardFooter>
               <div className="flex gap-2 flex-wrap">
                  {post.tags.map(tag => (
                     <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
               </div>
            </CardFooter>
          </Card>
        ))}
        {blogPosts.length === 0 && (
            <div className="col-span-full">
                <EmptyState 
                  icon={PenLine}
                  title="No posts yet"
                  description="Articles on mobile architecture and engineering will be published here."
                  actionLabel={isAdmin ? "Go to Admin" : undefined}
                  actionHref={isAdmin ? "/admin" : undefined}
                />
            </div>
        )}
      </div>
    </div>
  )
}
