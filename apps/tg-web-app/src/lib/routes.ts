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

const noPannelRoutes = [routeNames.root]

function buildRegexRoutes(routes: string[]) {
  return routes.map((route) => {
    const base = route.replace(/\/$/, '') // cut end "/"
    if (base === '') return /^\/$/ // root "/"
    return new RegExp(`^${base}(?:/.*)?$`)
  })
}

const PROTECTED_PATH_REGEX = buildRegexRoutes(protectedRoutes)
const NO_PANNEL_PATH_REGEX = buildRegexRoutes(noPannelRoutes)

export const checkProtectedRoute = (path: string): boolean => {
  return PROTECTED_PATH_REGEX.some((regex) => regex.test(path))
}

export const checkNoPannelRoutes = (path: string): boolean => {
  return NO_PANNEL_PATH_REGEX.some((regex) => regex.test(path))
}
