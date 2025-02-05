import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CartProductsQueryVariables = Types.Exact<{ [key: string]: never }>

export type CartProductsQuery = {
  __typename?: 'Query'
  cartProducts: Array<{
    __typename?: 'CartProduct'
    quantity: number
    product: {
      __typename?: 'Product'
      id: string
      title: string
      currentPrice: number
      preview: string
    }
  }>
}

export const CartProductsDocument = gql`
  query CartProducts {
    cartProducts {
      quantity
      product {
        id
        title
        currentPrice
        preview
      }
    }
  }
`
