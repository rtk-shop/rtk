import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RejectOrderMutationVariables = Types.Exact<{
  orderId: Types.Scalars['ID']['input']
}>

export type RejectOrderMutation = {
  __typename?: 'Mutation'
  rejectOrder: {
    __typename?: 'RejectOrderPayload'
    id: string
    status: Types.OrderStatus
    updatedAt: string
  }
}

export const RejectOrderDocument = gql`
  mutation RejectOrder($orderId: ID!) {
    rejectOrder(orderId: $orderId) {
      id
      status
      updatedAt
    }
  }
`
