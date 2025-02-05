import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ReduceCartItemQuantityMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input']
}>

export type ReduceCartItemQuantityMutation = {
  __typename?: 'Mutation'
  reduceCartItemQuantity: { __typename?: 'CartItem'; productId: string; quantity: number }
}

export const ReduceCartItemQuantityDocument = gql`
  mutation ReduceCartItemQuantity($productId: ID!) {
    reduceCartItemQuantity(productId: $productId) {
      productId
      quantity
    }
  }
`
