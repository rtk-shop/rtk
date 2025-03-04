import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserOrdersQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['ID']['input']>
}>

export type UserOrdersQuery = {
  __typename?: 'Query'
  userOrders: Array<{
    __typename?: 'Order'
    id: string
    status: Types.OrderStatus
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
    products: Array<{
      __typename?: 'OrderProduct'
      id: string
      quantity: number
      priceAtOrder: number
      product: { __typename?: 'Product'; id: string; title: string; preview: string }
    }>
  }>
}

export const UserOrdersDocument = gql`
  query UserOrders($userId: ID) {
    userOrders(userId: $userId) {
      id
      status
      price
      receiverName
      receiverSurname
      receiverPhone
      supplier
      cityName
      postOfficeName
      parcelTrackId
      updatedAt
      createdAt
      products {
        id
        quantity
        priceAtOrder
        product {
          id
          title
          preview
        }
      }
    }
  }
`
