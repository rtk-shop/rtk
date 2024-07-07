type RouteName =
  | 'root'
  | 'catalog'
  | 'product'
  | 'login'
  | 'discounts'
  | 'profile'
  | 'profileFavorite'
  | 'profileInfo'
  | 'checkout'
  | 'notFound'

export const routeNames: Record<RouteName, string> = {
  root: '/',
  catalog: '/catalog',
  product: '/product/:id',
  login: '/login',
  discounts: '/discounts',
  profile: '/profile',
  profileFavorite: '/profile/favorite',
  profileInfo: '/profile/info',
  checkout: '/checkout',
  notFound: '/404'
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
