import { OrderStatus } from '@/lib/api/graphql/types'

export type Order = {
  id: string
  price: number
  cityName: string
  status: OrderStatus
  createdAt: string
}
