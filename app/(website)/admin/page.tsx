"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Lock, Terminal, Cpu, ShieldAlert, CheckCircle2, Github, LogOut } from "lucide-react"

export default function AdminGateway() {
  const { data: session, status } = useSession()
  
  // Use the isAdmin flag from the session (populated securely on the server)
  const isAdmin = session?.user?.isAdmin === true

  if (status === "loading") {
    return (
      <div className="container mx-auto max-w-2xl py-20 px-4 flex justify-center">
        <div className="animate-pulse text-muted-foreground">Verifying credentials...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-2xl py-20 px-4">
      <Card className="border-dashed overflow-hidden">
        <CardHeader className="text-center bg-muted/30 pb-8">
          <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            {isAdmin ? (
              <CheckCircle2 className="h-6 w-6 text-green-500 animate-in zoom-in" />
            ) : (
              <Lock className="h-6 w-6 text-primary" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">Management Gateway</CardTitle>
          <CardDescription>
            Secure access to the portfolio content management system.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-8">
          {!session ? (
            <div className="space-y-4">
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="w-full py-6 flex items-center gap-2"
                  onClick={() => signIn("github")}
                >
                  <Github className="h-5 w-5" />
                  Sign in with GitHub
                </Button>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
                <div className="flex items-start gap-3 text-blue-600 dark:text-blue-400">
                  <Info className="h-5 w-5 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1">Public Access Mode</p>
                    <p>
                      Recruiters can explore the 
                      <Link href="https://github.com/destucikal" className="underline font-bold mx-1">
                        source code
                      </Link> 
                      to see the architecture of this portfolio.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : isAdmin ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Verified: {session.user?.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{session.user?.email}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => signOut({ redirectTo: "/admin" })} className="h-8">
                  <LogOut className="h-3 w-3 mr-2" /> Sign Out
                </Button>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 p-3 border rounded-md bg-background">
                  <Cpu className="h-5 w-5 text-purple-500" />
                  <div className="text-sm">
                    <p className="font-semibold">Keystatic</p>
                    <p className="text-muted-foreground text-xs">CMS Engine</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-md bg-background">
                  <Terminal className="h-5 w-5 text-green-500" />
                  <div className="text-sm">
                    <p className="font-semibold">OAuth 2.0</p>
                    <p className="text-muted-foreground text-xs">Auth Layer</p>
                  </div>
                </div>
              </div>

              <Button asChild className="w-full py-6 text-lg">
                <Link href={process.env.NODE_ENV === 'production' ? "/api/keystatic/github/login" : "/keystatic"}>
                  Launch Admin Dashboard
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-destructive">
                  <ShieldAlert className="h-5 w-5" />
                  <p className="font-bold">Access Denied</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your account ({session.user?.email}) is not authorized to manage this portfolio.
                </p>
              </div>
              <Button onClick={() => signOut({ redirectTo: "/admin" })} variant="outline" className="w-full">
                Sign in with different account
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-2 pt-4 border-t">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Back to Public Site</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
