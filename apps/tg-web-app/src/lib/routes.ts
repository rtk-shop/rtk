export const routeNames = {
  root: '/',
  catalog: '/catalog',
  product: '/product/',
  order: '/order/',
  profile: '/profile',
  checkout: '/checkout',
  favourites: '/favourites'
} as const

const protectedRoutes = [
  routeNames.catalog,
  routeNames.product,
  routeNames.profile,
  routeNames.order,
  routeNames.checkout,
  routeNames.favourites
]

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
