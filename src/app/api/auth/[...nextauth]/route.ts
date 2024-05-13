// import NextAuth from 'next-auth/next'
// import GoogleProvider from 'next-auth/providers/google'

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
//     })
//   ]
// })

// export { handler as GET, handler as POST }

import { handlers } from '@/auth.config'

export const { GET, POST } = handlers
