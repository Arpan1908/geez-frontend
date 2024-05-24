import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"

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
		async jwt({ token, user, account }) {
			if (account && user) {
				token.accessToken = account.access_token
			}
			return token
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken
			return session
		}
	},
	session: {
		strategy: 'jwt'
	}
})