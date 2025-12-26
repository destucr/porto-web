import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
    basePath: "/api/auth",
    trustHost: true,
    providers: [
        GitHub({
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
                (session.user as any).isAdmin = session.user.email === "destucr@gmail.com";
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
