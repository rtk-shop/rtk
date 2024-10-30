import * as Types from '../../../../graphql/types'

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
        parentId: string
        title: string
        slug: string
        sku: string
        gender: Types.Gender
        currentPrice: number
        basePrice: number
        amount: number
        tag?: Types.ProductTag | null
        preview: string
        category: Types.CategoryType
        inStock: boolean
        description?: string | null
        colorName: string
        sizeName: string
        brandName: string
        images: Array<string>
        isHidden: boolean
        defaultSizeID: number
        updatedAt: string
        createdAt: string
        availableColors?: Array<{
          __typename?: 'ProductColors'
          id: string
          title: string
          color: string
        }> | null
      }
}

export const GetProductDocument = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      __typename
      ... on Product {
        id
        parentId
        title
        slug
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
        updatedAt
        createdAt
        availableColors {
          id
          title
          color
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`
