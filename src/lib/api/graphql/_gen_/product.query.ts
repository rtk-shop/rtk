import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
}>

export type GetProductQuery = {
  __typename?: 'Query'
  product:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Product'
        id: string
        title: string
        sku: string
        gender: Types.Gender
        currentPrice: number
        basePrice: number
        amount: number
        tag?: Types.ProductTag | null
        preview: string
        category: Types.CategoryType
        inStock: boolean
        description: string
        colorName: string
        sizeName: string
        brandName: string
        images: Array<string>
        isHidden: boolean
        updatedAt: string
        createdAt: string
        availableSizes: Array<{ __typename?: 'SizeVariation'; size: string; productId: string }>
      }
}

export const GetProductDocument = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      __typename
      ... on Product {
        id
        title
        sku
        gender
        currentPrice
        basePrice
        amount
        tag
        preview
        category
        inStock
        description
        colorName
        sizeName
        brandName
        images
        isHidden
        updatedAt
        createdAt
        availableSizes {
          size
          productId
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`
