import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type OrdersQueryVariables = Types.Exact<{
  first: Types.Scalars['Int']['input']
  status?: Types.InputMaybe<Types.OrderStatus>
}>

export type OrdersQuery = {
  __typename?: 'Query'
  orders: {
    __typename?: 'OrdersConnection'
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
      cursor: string
      node: {
        __typename?: 'Order'
        id: string
        price: number
        receiverName: string
        status: Types.OrderStatus
        createdAt: string
      }
    }>
  }
}

export const OrdersDocument = gql`
  query Orders($first: Int!, $status: OrderStatus) {
    orders(first: $first, where: { status: $status }) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
      totalCount
      edges {
        cursor
        node {
          id
          price
          receiverName
          status
          createdAt
        }
      }
    }
  }
`
