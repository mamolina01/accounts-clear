import createMiddleware from 'next-intl/middleware'
import { auth } from './auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { Routes } from './enums/routes'
import { AppLocaleConfig } from './config/locales'
import { ProtectedRoutes } from './config/protectedRoutes'

const isProtectedRoute = (pathname: Routes) => {
  let transformedPathname = pathname
  if (pathname.startsWith('/en')) {
    transformedPathname = transformedPathname.substring(3) as Routes
  }

  return ProtectedRoutes.includes(transformedPathname)
}

const intlMiddleware = createMiddleware({
  locales: AppLocaleConfig.locales,
  localePrefix: AppLocaleConfig.localePrefix,
  defaultLocale: AppLocaleConfig.defaultLocale,
  localeDetection: false
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const session = await auth()
  const isAuthRoute = pathname.startsWith('/auth')

  if ((!session && isProtectedRoute(pathname as Routes)) || (session && isAuthRoute)) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/']
}
