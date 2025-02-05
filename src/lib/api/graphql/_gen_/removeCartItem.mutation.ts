import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveCartItemMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input']
}>

export type RemoveCartItemMutation = {
  __typename?: 'Mutation'
  removeCartItem: { __typename?: 'RemoveCartItemPayload'; productId: string }
}

export const RemoveCartItemDocument = gql`
  mutation RemoveCartItem($productId: ID!) {
    removeCartItem(productId: $productId) {
      productId
    }
  }
`
