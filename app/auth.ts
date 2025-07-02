import NextAuth, { CredentialsSignin, type User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { compare } from 'bcrypt-ts'
import Google from 'next-auth/providers/google'

import { authConfig } from 'app/auth.config'
import { getUser } from 'app/db'

class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password'
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials: Partial<Record<'email' | 'password', unknown>>) {
        const email = credentials.email as string
        const password = credentials.password as string

        if (!email || !password) throw new InvalidLoginError()

        const user = await getUser(email)
        if (user.length === 0 || !user[0].password) throw new InvalidLoginError()
        const passwordsMatch = await compare(password, user[0].password)
        if (passwordsMatch) return user[0] as User
        throw new InvalidLoginError()
      },
    }),
  ],
})
