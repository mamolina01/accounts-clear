import createMiddleware from 'next-intl/middleware'
import { auth } from './auth.config'
import { NextRequest, NextResponse } from 'next/server'
import { Routes } from './enums/routes'
import { AppLocaleConfig, Locales } from './config/locales'
import { ProtectedRoutes } from './config/protectedRoutes'

const getPathname = (pathname: Routes) => {
  let transformedPathname = pathname
  if (pathname.startsWith(`/${Locales.ES}`)) {
    transformedPathname = transformedPathname.substring(3) as Routes
  }
  return transformedPathname
}

const intlMiddleware = createMiddleware({
  locales: AppLocaleConfig.locales,
  localePrefix: AppLocaleConfig.localePrefix,
  defaultLocale: AppLocaleConfig.defaultLocale,
  localeDetection: false
})

export default async function middleware(request: NextRequest) {
  const pathname = getPathname(request.nextUrl.pathname as Routes)
  const session = await auth()
  const isAuthRoute = pathname.startsWith('/auth')

  if ((!session && ProtectedRoutes.includes(pathname)) || (session && isAuthRoute)) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  if (pathname.includes('/api')) {
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/']
}
