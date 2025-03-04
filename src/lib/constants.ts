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

export const orderStatus: { [p in Lowercase<keyof typeof OrderStatus>]: Uppercase<p> } = {
  created: 'CREATED',
  processed: 'PROCESSED',
  accepted: 'ACCEPTED',
  sent: 'SENT',
  done: 'DONE',
  rejected: 'REJECTED',
  returned: 'RETURNED'
}
