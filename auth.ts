import NextAuth, { type DefaultSession } from "next-auth"
import GitHub from "next-auth/providers/github"

declare module "next-auth" {
  interface Session {
    user: {
      isAdmin?: boolean
    } & DefaultSession["user"]
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    basePath: "/api/auth",
    trustHost: true,
    providers: [
        GitHub({
            clientId: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET,
            // Disable PKCE if you encounter pkceCodeVerifier errors in local dev
            checks: ["none"], 
        })
    ],
    callbacks: {
        async signIn({ user }) {
            // ONLY allow your specific email to access the admin gateway
            const allowedEmails = ["destucr@gmail.com"]
            if (user.email && allowedEmails.includes(user.email)) {
                return true
            }
            // For others, we still let them "sign in" so they see the "Access Denied" message
            return true
        },
        async session({ session, token }) {
            // Minimize what's exposed in the session on the client side
            if (session.user) {
                // Check admin status before clearing email
                session.user.isAdmin = session.user.email === "destucr@gmail.com";
                session.user.email = ""; 
                session.user.image = undefined;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin',
    }
})
