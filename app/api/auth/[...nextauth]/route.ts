import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ONLY allow your specific email to access the "success" state of the admin gateway
      // You can add your email here
      const allowedEmails = ["destucr@gmail.com"] 
      if (user.email && allowedEmails.includes(user.email)) {
        return true
      }
      // For others, we still let them "sign in" so they see the "Access Denied" message
      // but we return true here so the session is created, and we handle the UI in the page
      return true
    },
  },
  pages: {
    signIn: '/admin',
  }
})

export { handler as GET, handler as POST }
