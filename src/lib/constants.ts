import { OrderStatus } from '@/types/order'

export const routeNames = {
  root: '/',
  catalog: '/catalog',
  product: '/product/',
  profile: '/profile',
  dashboard: '/dashboard',
  auth: '/auth',
  checkout: '/checkout'
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
