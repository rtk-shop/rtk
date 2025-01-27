import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { routeNames } from '@/lib/constants'
import {
  parseSessionToken,
  parseRefreshToken,
  refreshSession,
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_NAME
} from '@/lib/session'

// const publicRoutes = [routeNames.root]
const protectedRoutes = [
  routeNames.catalog,
  routeNames.product,
  routeNames.checkout,
  routeNames.profile
]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  if (process.env.NODE_ENV === 'production' && path === '/sandbox') {
    return NextResponse.redirect(new URL(routeNames.root, req.url))
  }

  // 1. Check if the current route is protected or public
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  // const isPublicRoute = publicRoutes.some((route) => {
  //   if (route === '/') {
  //     return path === '/'
  //   }
  //   return path.startsWith(route)
  // })

  // 2. Get the session from the cookies
  const sessionToken = cookies().get(SESSION_COOKIE_NAME)?.value
  const refreshCookie = cookies().get(REFRESH_COOKIE_NAME)

  const session = parseSessionToken(sessionToken)

  // 3. If there is no session, refresh it
  if (!session) {
    // prevent to many redirects error on /refresh failed
    if (isProtectedRoute) {
      const refreshedSessionData = await refreshSession(refreshCookie)

      // if refresh token is invalid, delete it
      if (!refreshedSessionData) {
        const resp = NextResponse.redirect(new URL(routeNames.root, req.nextUrl))
        resp.cookies.delete(REFRESH_COOKIE_NAME)

        return resp
      }

      const resp = NextResponse.next()
      resp.headers.set('Set-Cookie', refreshedSessionData.setCookieHeader)

      return resp
    }
  }

  // 4. Check session corruption
  if (isProtectedRoute) {
    const refreshToken = parseRefreshToken(refreshCookie?.value)

    if (session?.userId !== refreshToken?.userId) {
      const resp = NextResponse.redirect(new URL(routeNames.root, req.nextUrl))
      resp.cookies.delete(SESSION_COOKIE_NAME)
      resp.cookies.delete(REFRESH_COOKIE_NAME)

      return resp
    }
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)']
}
