import type { OrderStatus } from '@/types/order'
import { ProductGender } from '@/types/product'

export const orderStatus: { [p in Lowercase<OrderStatus>]: Uppercase<p> } = {
  created: 'CREATED',
  processed: 'PROCESSED',
  sent: 'SENT',
  done: 'DONE',
  rejected: 'REJECTED',
  returned: 'RETURNED'
}

export const productGender: { [p in Lowercase<ProductGender>]: Uppercase<p> } = {
  male: 'MALE',
  female: 'FEMALE',
  unisex: 'UNISEX'
}
