import { auth } from './auth.config'
import { NextResponse, type NextRequest } from 'next/server'

// Middleware function
const middleware = async (req: NextRequest) => {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/group/:path*', '/my-groups', '/cost/:path*']
}

export default middleware