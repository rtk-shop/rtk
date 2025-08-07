import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserOrdersQueryVariables = Types.Exact<{
  userId?: Types.InputMaybe<Types.Scalars['ID']['input']>
  first: Types.Scalars['Int']['input']
  after?: Types.InputMaybe<Types.Scalars['String']['input']>
  before?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type UserOrdersQuery = {
  __typename?: 'Query'
  userOrders: {
    __typename?: 'UserOrdersConnection'
    totalCount: number
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      startCursor?: string | null
      endCursor?: string | null
      hasPreviousPage: boolean
    }
    edges: Array<{
      __typename?: 'OrderEdge'
      node: {
        __typename?: 'Order'
        id: string
        status: Types.OrderStatus
        price: number
        receiverName: string
        receiverSurname: string
        receiverPhone: string
        supplier: Types.SupplierService
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
      }
    }>
  }
}

export const UserOrdersDocument = gql`
  query UserOrders($userId: ID, $first: Int!, $after: String, $before: String) {
    userOrders(userId: $userId, first: $first, after: $after, before: $before) {
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
      edges {
        node {
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
    }
  }
`
