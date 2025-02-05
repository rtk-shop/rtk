import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ClearCartMutationVariables = Types.Exact<{ [key: string]: never }>

export type ClearCartMutation = {
  __typename?: 'Mutation'
  clearCart: { __typename?: 'ClearCartPayload'; cartId: string }
}

export const ClearCartDocument = gql`
  mutation ClearCart {
    clearCart {
      cartId
    }
  }
`
