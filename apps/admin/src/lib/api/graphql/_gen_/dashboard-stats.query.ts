import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type DashboardStatsQueryVariables = Types.Exact<{ [key: string]: never }>

export type DashboardStatsQuery = {
  __typename?: 'Query'
  dashboardStats: {
    __typename?: 'DashboardStats'
    users: { __typename?: 'UsersStats'; count: number }
    orders: { __typename?: 'OrdersStats'; count: number }
    products: { __typename?: 'ProductsStats'; count: number }
  }
}

export const DashboardStatsDocument = gql`
  query DashboardStats {
    dashboardStats {
      users {
        count
      }
      orders {
        count
      }
      products {
        count
      }
    }
  }
`
