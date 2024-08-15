import { NextRequest, NextResponse } from 'next/server'
import { decrypt, refreshSession, setSessionCookie } from '@/utils/session'
import { cookies } from 'next/headers'
import cookieLib from 'cookie'
import { routeNames } from './utils/navigation'

const protectedRoutes = [routeNames.dashboard, routeNames.product]
const publicRoutes = [routeNames.auth, routeNames.root]

export default async function middleware(req: NextRequest) {
  // 1. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  // 2. Get the session from the cookie
  const cookie = cookies().get('session')?.value
  const refreshCookie = cookies().get('rfr')

  const session = decrypt(cookie)

  // 3. If there is no session, refresh it
  if (!session) {
    const refreshAuthData = await refreshSession(refreshCookie)

    // if refresh token is invalid, delete it
    if (isProtectedRoute || !refreshAuthData) {
      const res = NextResponse.next()
      res.cookies.delete('rfr')
      return res
    }

    const res = NextResponse.next()

    try {
      const uglyCookie = cookieLib.parse(refreshAuthData.refreshCookie)

      setSessionCookie(res, refreshAuthData.accessToken)
      res.cookies.set('rfr', uglyCookie.rfr, {
        maxAge: +uglyCookie['Max-Age'],
        path: uglyCookie['Path'],
        sameSite: 'lax',
        httpOnly: true
      })

      return res
    } catch (error) {
      res.cookies.delete('rfr')
      return res
    }
  }

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/auth', req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  // if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith('/dashboard')) {
  if (isPublicRoute && session?.userId) {
    // return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
