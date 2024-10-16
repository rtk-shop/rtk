type RouteName = 'root' | 'product' | 'auth' | 'dashboard' | 'checkout' | 'profile'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  product: '/product/:id',
  auth: '/auth',
  dashboard: '/dashboard',
  checkout: '/checkout',
  profile: '/profile'
}

export const generateProductLink = (path: string, id: string, slug: string): string => {
  return path.replace(':id', id + 'i__' + slug)
}

export const productIdFromSlug = (slugURL: string): string => {
  const slug = slugURL.match(/i__(.*)/)

  if (slug === null) {
    throw new Error('no slug matched')
  }

  const slugSide = slug[0]

  return slugURL.substring(0, slugURL.length - slugSide.length)
}
