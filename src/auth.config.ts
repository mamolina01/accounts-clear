import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import NextAuth from 'next-auth'
import prisma from './lib/prisma'
import bcryptjs from 'bcryptjs'
import GoogleProvider from 'next-auth/providers/google';
import { loginWithGoogle } from './actions/auth/login'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    async session({ session, token, user }) {
      session.user = token.data as any
      const { id, email, name } = session.user
      await loginWithGoogle(id, email)
      return session
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        })
        if (!user || !user.password) return null

        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null

        // Regresar el usuario sin el password
        const { password: _, ...rest } = user

        return rest
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
