import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ProductsQueryVariables = Types.Exact<{
  category?: Types.InputMaybe<Array<Types.CategoryType> | Types.CategoryType>
  gender?: Types.InputMaybe<Array<Types.Gender> | Types.Gender>
  tag?: Types.InputMaybe<Types.ProductTag>
  instock?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
  price?: Types.InputMaybe<Types.PriceRange>
  isHidden?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
  limit: Types.Scalars['Int']['input']
  after?: Types.InputMaybe<Types.Scalars['String']['input']>
  before?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type ProductsQuery = {
  __typename?: 'Query'
  productsV2: {
    __typename?: 'ProductConnection'
    totalCount: number
    priceRange: { __typename?: 'PriceRangeType'; gt: number; lt: number }
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      startCursor?: string | null
      endCursor?: string | null
      hasPreviousPage: boolean
    }
    edges: Array<{
      __typename?: 'ProductEdge'
      cursor: string
      node: {
        __typename?: 'Product'
        id: string
        title: string
        inStock: boolean
        currentPrice: number
        basePrice: number
        tag?: Types.ProductTag | null
        preview: string
      }
    }>
  }
}

export const ProductsDocument = gql`
  query Products(
    $category: [CategoryType!]
    $gender: [Gender!]
    $tag: ProductTag
    $instock: Boolean
    $price: PriceRange
    $isHidden: Boolean = false
    $limit: Int!
    $after: String
    $before: String
  ) {
    productsV2(
      limit: $limit
      after: $after
      before: $before
      where: {
        category: $category
        gender: $gender
        tag: $tag
        instock: $instock
        isHidden: $isHidden
        price: $price
      }
    ) {
      totalCount
      priceRange {
        gt
        lt
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
        hasPreviousPage
      }
      edges {
        cursor
        node {
          id
          title
          inStock
          currentPrice
          basePrice
          tag
          preview
        }
      }
    }
  }
`
