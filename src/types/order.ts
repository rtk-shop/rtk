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
  updatedAt: string
  createdAt: string
}
