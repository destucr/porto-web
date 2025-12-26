import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
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
    },
    pages: {
        signIn: '/admin',
    }
})
