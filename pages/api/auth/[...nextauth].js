import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

import { authenticateToBackend } from "@/hooks/use-http"

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET
		})
	],
	callbacks: {
		async jwt({ token, user, trigger }) {
			if (user) {
				const { id, name, email, image } = user
				token.token = await authenticateToBackend(trigger.toLowerCase(), { id, name, email, image })
			}
			return token
		},
		async session({ session, token }) {
			session.token = token.token
			return session
		}
	}
})