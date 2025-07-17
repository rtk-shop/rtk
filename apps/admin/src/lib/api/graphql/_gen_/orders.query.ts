import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type OrdersQueryVariables = Types.Exact<{
  status?: Types.InputMaybe<Array<Types.OrderStatus> | Types.OrderStatus>
  first: Types.Scalars['Int']['input']
  after?: Types.InputMaybe<Types.Scalars['String']['input']>
  before?: Types.InputMaybe<Types.Scalars['String']['input']>
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
        cityName: string
        status: Types.OrderStatus
        createdAt: string
      }
    }>
  }
}

export const OrdersDocument = gql`
  query Orders($status: [OrderStatus!], $first: Int!, $after: String, $before: String) {
    orders(first: $first, after: $after, before: $before, where: { status: $status }) {
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
          cityName
          status
          createdAt
        }
      }
    }
  }
`
