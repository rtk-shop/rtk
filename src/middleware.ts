import { NextRequest, NextResponse } from 'next/server'
import { decrypt, refreshSession, setSessionCookie } from '@/lib/session'
import { cookies } from 'next/headers'
import { routeNames } from '@/lib/constants'
import { parse } from 'cookie'

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

    const uglyCookie = parse(refreshAuthData.refreshCookie) as { rfr: string; 'Max-Age': string }

    if (!uglyCookie) {
      res.cookies.delete('rfr')
      return res
    }

    setSessionCookie(res, refreshAuthData.accessToken)
    res.cookies.set({
      name: 'rfr',
      value: uglyCookie.rfr,
      maxAge: +uglyCookie['Max-Age'],
      sameSite: 'lax',
      httpOnly: true,
      path: '/'
    })

    return res
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
