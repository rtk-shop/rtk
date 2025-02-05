import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddCartItemMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input']
  quantity: Types.Scalars['Int']['input']
}>

export type AddCartItemMutation = {
  __typename?: 'Mutation'
  addCartItem: { __typename?: 'CartItem'; productId: string; quantity: number }
}

export const AddCartItemDocument = gql`
  mutation AddCartItem($productId: ID!, $quantity: Int!) {
    addCartItem(input: { productId: $productId, quantity: $quantity }) {
      productId
      quantity
    }
  }
`
