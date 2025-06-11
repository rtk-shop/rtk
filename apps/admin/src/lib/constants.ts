import { OrderStatus } from '@/types/order'

export const orderStatus: { [p in Lowercase<OrderStatus>]: Uppercase<p> } = {
  created: 'CREATED',
  processed: 'PROCESSED',
  sent: 'SENT',
  done: 'DONE',
  rejected: 'REJECTED',
  returned: 'RETURNED'
}
