import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type OrderByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
}>

export type OrderByIdQuery = {
  __typename?: 'Query'
  order:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Order'
        id: string
        price: number
        receiverName: string
        receiverSurname: string
        receiverPhone: string
        cityName: string
        postOfficeName: string
        parcelTrackId?: string | null
        status: Types.OrderStatus
        supplier: Types.SupplierService
        updatedAt: string
        createdAt: string
        products: Array<{
          __typename?: 'OrderProduct'
          id: string
          quantity: number
          priceAtOrder: number
          product: { __typename?: 'Product'; id: string; title: string; preview: string }
        }>
      }
}

export const OrderByIdDocument = gql`
  query OrderByID($id: ID!) {
    order(id: $id) {
      __typename
      ... on Order {
        id
        price
        receiverName
        receiverSurname
        receiverPhone
        cityName
        postOfficeName
        parcelTrackId
        status
        supplier
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
      ... on NotFound {
        message
      }
    }
  }
`
