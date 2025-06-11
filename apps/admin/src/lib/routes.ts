export const routeNames = {
  root: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  order: '/order/'
} as const

const protectedRoutes = [routeNames.root, routeNames.dashboard, routeNames.order]

function buildRegexRoutes(routes: string[]) {
  return routes.map((route) => {
    const base = route.replace(/\/$/, '') // cut end "/"
    if (base === '') return /^\/$/ // root "/"
    return new RegExp(`^${base}(?:/.*)?$`)
  })
}

const PROTECTED_PATH_REGEX = buildRegexRoutes(protectedRoutes)

export const checkProtectedRoute = (path: string): boolean => {
  return PROTECTED_PATH_REGEX.some((regex) => regex.test(path))
}
