import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
    basePath: "/api/auth",
    trustHost: true,
    providers: [GitHub],
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
    },
    pages: {
        signIn: '/admin',
    }
})
