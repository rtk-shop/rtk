import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CartProductsQueryVariables = Types.Exact<{
  input: Array<Types.CartItem> | Types.CartItem
}>

export type CartProductsQuery = {
  __typename?: 'Query'
  cartProducts: Array<{
    __typename?: 'Product'
    id: string
    title: string
    currentPrice: number
    preview: string
  }>
}

export const CartProductsDocument = gql`
  query CartProducts($input: [CartItem!]!) {
    cartProducts(input: $input) {
      id
      title
      currentPrice
      preview
    }
  }
`
