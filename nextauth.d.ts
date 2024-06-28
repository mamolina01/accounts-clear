import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified?: string
      image?: string
      groups: {
        id: string
      }[]
      provider: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    provider: string
  }
}
