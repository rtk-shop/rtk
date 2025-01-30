import { OrderStatus } from '@/types/order'

export const isDevMode = process.env.NODE_ENV === 'development'

export const routeNames = {
  root: '/',
  catalog: '/catalog',
  product: '/product/',
  profile: '/profile',
  checkout: '/checkout',
  favourites: '/favourites'
} as const

export const orderStatus: { [p in Lowercase<keyof typeof OrderStatus>]: p } = {
  created: 'created',
  processed: 'processed',
  accepted: 'accepted',
  returned: 'returned',
  rejected: 'rejected',
  sent: 'sent',
  done: 'done'
}
