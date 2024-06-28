import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import NextAuth from 'next-auth'
import prisma from './lib/prisma'
import bcryptjs from 'bcryptjs'
import GoogleProvider from 'next-auth/providers/google'
import { getUserId, loginWithGoogle } from './actions/auth/login'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        if (user.provider && user.provider === 'Google') {
          const data = await getUserId(user.email!)
          if (data && data.id) {
            user.id = data.id
          }
        }
        token.data = user
      }
      return { ...token, ...user }
    },
    session({ session, token, user }) {
      session.user = token.data as any

      return session
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          await loginWithGoogle(user)

          return true
        } catch (error) {
          throw new Error('Error while creating user')
        }
      }

      if (account?.provider === 'credentials') {
        return true
      } else {
        return false
      }
    }
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
        const user = await prisma.user.findFirst({
          where: {
            email: email,
            provider: 'Credentials'
          }
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
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          provider: 'Google'
        }
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
