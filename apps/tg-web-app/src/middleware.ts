import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { routeNames, checkProtectedRoute } from '@/lib/routes'
import {
  parseSessionToken,
  parseRefreshToken,
  refreshSession,
  REFRESH_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  DIRECT_SESSION_HEADER
} from '@/lib/session'

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // 1. Check if the current route is protected or public
  const isProtectedRoute = checkProtectedRoute(path)

  const cookieStore = await cookies()

  // 2. Get the session from the cookies
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const refreshCookie = cookieStore.get(REFRESH_COOKIE_NAME)

  const session = parseSessionToken(sessionToken)

  // 3. If there is no session, refresh it
  if (!session) {
    // prevent to many redirects error on /refresh failed
    if (isProtectedRoute) {
      const sessionData = await refreshSession(refreshCookie)

      // if refresh token is invalid, delete it
      if (!sessionData) {
        const resp = NextResponse.redirect(new URL(routeNames.root, req.nextUrl))
        resp.cookies.delete(REFRESH_COOKIE_NAME)

        return resp
      }

      const resp = NextResponse.next()
      resp.headers.set('Set-Cookie', sessionData.setCookieHeader)
      resp.headers.set(DIRECT_SESSION_HEADER, sessionData.sessionToken)

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

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)']
}
