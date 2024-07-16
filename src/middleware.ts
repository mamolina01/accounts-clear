// import { auth } from './auth.config'
// import { NextResponse, type NextRequest } from 'next/server'

// // Middleware function
// const middleware = async (req: NextRequest) => {
//   const session = await auth()
//   const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')

//   if ((!session && !isAuthRoute) || (session && isAuthRoute)) {
//     return NextResponse.redirect(new URL('/', req.nextUrl.origin))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/group/:path*', '/my-groups/:path*', '/cost/:path*', '/auth/:path*']
// }

// export default middleware

import createMiddleware from 'next-intl/middleware'

import { NextRequest, NextResponse } from 'next/server'
import { Routes } from './enums/routes'
import { AppLocaleConfig } from './config/locales'

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/']
}

// const isProtectedRoute = (pathname: Routes) => {
//   let transformedPathname = pathname
//   if (pathname.startsWith('/en')) {
//     transformedPathname = transformedPathname.substring(3) as Routes
//   }

//   return ProtectedRoutes.includes(transformedPathname)
// }

export default async function middleware(request: NextRequest) {
  const handleI18nRouting = createMiddleware({
    locales: AppLocaleConfig.locales,
    localePrefix: AppLocaleConfig.localePrefix,
    defaultLocale: AppLocaleConfig.defaultLocale,
    localeDetection: false
  })

  const response = handleI18nRouting(request)
  const url = new URL(request.url)
  const origin = url.origin
  const pathname = url.pathname

  // if (isProtectedRoute(pathname as Routes)) {
  //   let redirectUrl = HOMEPAGE
  //   if (!token || !token?.value) {
  //     return NextResponse.redirect(redirectUrl)
  //   }
  // } else {
  //   if (pathname === Routes.HOME) {
  //     return NextResponse.redirect(HOMEPAGE_HOT)
  //   }
  // }
  return response
}
