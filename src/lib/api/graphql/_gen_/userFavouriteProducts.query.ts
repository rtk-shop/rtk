import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type UserFavouriteProductsQueryVariables = Types.Exact<{ [key: string]: never }>

export type UserFavouriteProductsQuery = {
  __typename?: 'Query'
  userFavouriteProducts: Array<{
    __typename: 'Product'
    id: string
    title: string
    inStock: boolean
    currentPrice: number
    basePrice: number
    tag?: Types.ProductTag | null
    preview: string
  }>
}

export const UserFavouriteProductsDocument = gql`
  query UserFavouriteProducts {
    userFavouriteProducts {
      __typename
      id
      title
      inStock
      currentPrice
      basePrice
      tag
      preview
    }
  }
`
