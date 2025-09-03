import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type InitSoleProprietorPaymentMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID']['input']
}>

export type InitSoleProprietorPaymentMutation = {
  __typename?: 'Mutation'
  initSoleProprietorPayment: {
    __typename?: 'Payment'
    id: string
    price: number
    status: Types.PaymentStatus
    orderId: string
  }
}

export const InitSoleProprietorPaymentDocument = gql`
  mutation InitSoleProprietorPayment($orderId: ID!) {
    initSoleProprietorPayment(orderId: $orderId) {
      id
      price
      status
      orderId
    }
  }
`
