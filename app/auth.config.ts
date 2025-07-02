import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { NextAuthConfig } from 'next-auth'
import { db } from './db'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  adapter: DrizzleAdapter(db),
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  session: { strategy: 'jwt' },
  trustHost: true, // Trust all hosts in development
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isLoginPage = nextUrl.pathname.startsWith('/login')
      const isRegisterPage = nextUrl.pathname.startsWith('/register')

      if (!isLoggedIn && !(isLoginPage || isRegisterPage)) {
        return false
      }
      return true
    },
    async signIn({ account, profile }) {
      // Optional: Restrict Google sign-ins to verified emails from specific domains
      if (account?.provider === "google") {
        // Uncomment and modify the domain restriction as needed
        // return profile?.email_verified && profile?.email?.endsWith("@yourcompany.com")
        return profile?.email_verified ?? true
      }
      return true // Allow other providers
    },
    async session({ session, token }) {
      session.user.image = token.picture
      session.user.id = token.sub ?? ''
      return session
    },
  },
} satisfies NextAuthConfig

declare module 'next-auth' {
  interface Session {
    accessToken?: string
  }
}
