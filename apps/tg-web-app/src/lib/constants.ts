import type { OrderStatus, Category } from '@/types'

export const isDevMode = process.env.NODE_ENV === 'development'

export const orderStatus: { [p in Lowercase<keyof typeof OrderStatus>]: Uppercase<p> } = {
  created: 'CREATED',
  processed: 'PROCESSED',
  accepted: 'ACCEPTED',
  sent: 'SENT',
  done: 'DONE',
  rejected: 'REJECTED',
  returned: 'RETURNED'
}

export const category: { [p in Lowercase<keyof typeof Category>]: Uppercase<p> } = {
  suitcase: 'SUITCASE',
  bag: 'BAG',
  backpack: 'BACKPACK',
  other: 'OTHER'
}

export const catalogSearchParamsNames = {
  category: 'ca'
} as const
