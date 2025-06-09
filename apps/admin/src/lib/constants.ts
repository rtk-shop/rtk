import { OrderStatus } from '@/types/order'

export const routeNames = {
  root: '/',
  auth: '/auth',
  dashboard: '/dashboard',
  order: '/order/'
} as const

export const orderStatus: { [p in Lowercase<OrderStatus>]: Uppercase<p> } = {
  created: 'CREATED',
  processed: 'PROCESSED',
  sent: 'SENT',
  done: 'DONE',
  rejected: 'REJECTED',
  returned: 'RETURNED'
}
