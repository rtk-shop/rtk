export const routeNames = {
  root: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  order: '/order/',
  orders: '/orders',
  createProduct: '/create-product'
} as const

const protectedRoutes = [
  routeNames.root,
  routeNames.dashboard,
  routeNames.order,
  routeNames.orders,
  routeNames.createProduct
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
