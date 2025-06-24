import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateProductMutationVariables = Types.Exact<{
  title: Types.Scalars['String']['input']
  sku: Types.Scalars['String']['input']
  basePrice: Types.Scalars['Float']['input']
  amount: Types.Scalars['Int']['input']
  gender: Types.Gender
  category: Types.CategoryType
  preview: Types.Scalars['Upload']['input']
  images: Array<Types.ProductImageInput> | Types.ProductImageInput
  description: Types.Scalars['HTML']['input']
  sizeName: Types.Scalars['String']['input']
  brandName: Types.Scalars['String']['input']
  defaultSizeID: Types.Scalars['Int']['input']
  tag?: Types.InputMaybe<Types.ProductTag>
}>

export type CreateProductMutation = {
  __typename?: 'Mutation'
  createProduct: {
    __typename?: 'NewProductPayload'
    id: string
    title: string
    currentPrice: number
    basePrice: number
  }
}

export const CreateProductDocument = gql`
  mutation CreateProduct(
    $title: String!
    $sku: String!
    $basePrice: Float!
    $amount: Int!
    $gender: Gender!
    $category: CategoryType!
    $preview: Upload!
    $images: [ProductImageInput!]!
    $description: HTML!
    $sizeName: String!
    $brandName: String!
    $defaultSizeID: Int!
    $tag: ProductTag
  ) {
    createProduct(
      input: {
        title: $title
        sku: $sku
        basePrice: $basePrice
        amount: $amount
        gender: $gender
        category: $category
        preview: $preview
        images: $images
        description: $description
        sizeName: $sizeName
        brandName: $brandName
        defaultSizeID: $defaultSizeID
        tag: $tag
      }
    ) {
      id
      title
      currentPrice
      basePrice
    }
  }
`
