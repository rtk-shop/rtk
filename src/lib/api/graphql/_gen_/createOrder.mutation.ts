import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateOrderMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input']
  surname: Types.Scalars['String']['input']
  phone: Types.Scalars['String']['input']
  cityName: Types.Scalars['String']['input']
  postOfficeName: Types.Scalars['String']['input']
  cartItems: Array<Types.CartItemInput> | Types.CartItemInput
  supplier: Types.Scalars['String']['input']
}>

export type CreateOrderMutation = {
  __typename?: 'Mutation'
  createOrder: { __typename?: 'NewOrderPayload'; id: number; price: number; createdAt: unknown }
}

export const CreateOrderDocument = gql`
  mutation CreateOrder(
    $name: String!
    $surname: String!
    $phone: String!
    $cityName: String!
    $postOfficeName: String!
    $cartItems: [CartItemInput!]!
    $supplier: String!
  ) {
    createOrder(
      input: {
        name: $name
        surname: $surname
        phone: $phone
        cityName: $cityName
        postOfficeName: $postOfficeName
        cartItems: $cartItems
        supplier: $supplier
      }
    ) {
      id
      price
      createdAt
    }
  }
`
