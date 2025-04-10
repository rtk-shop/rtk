import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RemoveFavouriteProductMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input']
}>

export type RemoveFavouriteProductMutation = {
  __typename?: 'Mutation'
  removeFavouriteProduct: { __typename?: 'RemoveFavouritePayload'; productId: string }
}

export const RemoveFavouriteProductDocument = gql`
  mutation RemoveFavouriteProduct($productId: ID!) {
    removeFavouriteProduct(productId: $productId) {
      productId
    }
  }
`
