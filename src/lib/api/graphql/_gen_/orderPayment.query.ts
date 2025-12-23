import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type GetOrderPaymentQueryVariables = Types.Exact<{
  orderId: Types.Scalars['ID']['input']
}>

export type GetOrderPaymentQuery = {
  __typename?: 'Query'
  orderPayment:
    | { __typename: 'NotFound'; message: string }
    | {
        __typename: 'Payment'
        id: string
        price: number
        status: Types.PaymentStatus
        orderId: string
        purpose: Types.PaymentPurpose
      }
}

export const GetOrderPaymentDocument = gql`
  query GetOrderPayment($orderId: ID!) {
    orderPayment(orderId: $orderId) {
      __typename
      ... on Payment {
        id
        price
        status
        orderId
        purpose
      }
      ... on NotFound {
        message
      }
    }
  }
`
