import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type AddFavouriteProductMutationVariables = Types.Exact<{
  productId: Types.Scalars['ID']['input']
}>

export type AddFavouriteProductMutation = {
  __typename?: 'Mutation'
  addFavouriteProduct: {
    __typename?: 'AddFavouritePayload'
    productId: string
    productTitle: string
  }
}

export const AddFavouriteProductDocument = gql`
  mutation AddFavouriteProduct($productId: ID!) {
    addFavouriteProduct(productId: $productId) {
      productId
      productTitle
    }
  }
`
