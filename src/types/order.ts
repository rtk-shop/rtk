export const enum OrderStatus {
  CREATED,
  PROCESSED,
  ACCEPTED,
  SENT,
  DONE,
  REJECTED,
  RETURNED
}

export type OrderType = {
  id: string
  status: keyof typeof OrderStatus
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
