import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type CreateOrderMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input']
  surname: Types.Scalars['String']['input']
  phone: Types.Scalars['String']['input']
  cityName: Types.Scalars['String']['input']
  postOfficeName: Types.Scalars['String']['input']
  supplier: Types.SupplierService
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
    $supplier: SupplierService!
  ) {
    createOrder(
      input: {
        name: $name
        surname: $surname
        phone: $phone
        cityName: $cityName
        postOfficeName: $postOfficeName
        supplier: $supplier
      }
    ) {
      id
      price
      createdAt
    }
  }
`
