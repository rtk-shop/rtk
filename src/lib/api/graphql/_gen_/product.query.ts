import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetProductQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
  size?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetProductQuery = {
  __typename?: 'Query'
  product:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Product'
        id: string
        parentId: string
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
        description: unknown
        colorName: string
        sizeName: string
        brandName: string
        images: Array<string>
        isHidden: boolean
        defaultSizeID: number
        availableSizes: Array<string>
        updatedAt: string
        createdAt: string
      }
}

export const GetProductDocument = gql`
  query GetProduct($id: ID!, $size: String) {
    product(id: $id, size: $size) {
      __typename
      ... on Product {
        id
        parentId
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
        defaultSizeID
        availableSizes
        updatedAt
        createdAt
      }
      ... on NotFound {
        message
      }
    }
  }
`
