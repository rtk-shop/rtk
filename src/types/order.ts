import { OrderStatus } from '@/lib/api/graphql/types'

export type OrderType = {
  id: string
  status: OrderStatus
  price: number
  receiverName: string
  receiverSurname: string
  receiverPhone: string
  supplier: string
  cityName: string
  postOfficeName: string
  parcelTrackId?: string | null
  products: OrderProduct[]
  updatedAt: string
  createdAt: string
}

export type OrderProduct = {
  id: string
  quantity: number
  priceAtOrder: number
  product: {
    id: string
    title: string
    preview: string
  }
}
