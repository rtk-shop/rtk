import * as Types from '../../../../graphql/types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ProductsQueryVariables = Types.Exact<{
  gender?: Types.InputMaybe<Array<Types.Gender> | Types.Gender>
  instock?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
  tag?: Types.InputMaybe<Types.ProductTag>
  price?: Types.InputMaybe<Types.PriceRange>
  category?: Types.InputMaybe<Array<Types.CategoryType> | Types.CategoryType>
  page: Types.Scalars['Int']['input']
}>

export type ProductsQuery = {
  __typename?: 'Query'
  products: {
    __typename?: 'ProductsResponse'
    priceRange: { __typename?: 'PriceRangeType'; gt: number; lt: number }
    pagination: { __typename?: 'Pagination'; totalPages: number; currentPage: number }
    products: Array<{
      __typename?: 'Product'
      id: string
      slug: string
      title: string
      inStock: boolean
      currentPrice: number
      basePrice: number
      tag?: Types.ProductTag | null
      preview: string
    }>
  }
}

export const ProductsDocument = gql`
  query Products(
    $gender: [Gender!]
    $instock: Boolean
    $tag: ProductTag
    $price: PriceRange
    $category: [CategoryType!]
    $page: Int!
  ) {
    products(
      filter: {
        gender: $gender
        isHidden: false
        instock: $instock
        tag: $tag
        price: $price
        category: $category
        page: $page
      }
    ) {
      priceRange {
        gt
        lt
      }
      pagination {
        totalPages
        currentPage
      }
      products {
        id
        slug
        title
        inStock
        currentPrice
        basePrice
        tag
        preview
      }
    }
  }
`
