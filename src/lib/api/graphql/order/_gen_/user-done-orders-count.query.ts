import * as Types from '../../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserDoneOrdersCountQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserDoneOrdersCountQuery = {
  __typename?: 'Query'
  userDoneOrdersCount: { __typename?: 'UserDoneOrdersCountPayload'; count: number }
}

export const UserDoneOrdersCountDocument = gql`
  query UserDoneOrdersCount {
    userDoneOrdersCount {
      count
    }
  }
`
