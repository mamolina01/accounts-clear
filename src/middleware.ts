import { auth } from './auth.config'
import { NextResponse, type NextRequest } from 'next/server'

// Middleware function
const middleware = async (req: NextRequest) => {
  const session = await auth()
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')

  if ((!session && !isAuthRoute) || (session && isAuthRoute)) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/group/:path*', '/my-groups/:path*', '/cost/:path*', '/auth/:path*']
}

export default middleware
