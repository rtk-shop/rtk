import { OrderStatus } from '@/types/order'

export type Order = {
  id: string
  price: number
  cityName: string
  status: OrderStatus
  createdAt: string
}
