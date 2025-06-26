import type { OrderStatus } from '@/types/order'
import type { ProductGender, ProductCategory, ProductTag } from '@/types/product'

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

export const productCategory: { [p in Lowercase<ProductCategory>]: Uppercase<p> } = {
  suitcase: 'SUITCASE',
  backpack: 'BACKPACK',
  bag: 'BAG',
  other: 'OTHER'
}

export const productTag: { [p in Lowercase<ProductTag>]: Uppercase<p> } = {
  new: 'NEW',
  top: 'TOP',
  stock: 'STOCK'
}
