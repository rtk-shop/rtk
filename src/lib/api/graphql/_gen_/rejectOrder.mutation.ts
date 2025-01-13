import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type RejectOrdeMutationVariables = Types.Exact<{
  userId: Types.Scalars['ID']['input']
  orderId: Types.Scalars['ID']['input']
}>

export type RejectOrdeMutation = {
  __typename?: 'Mutation'
  rejectOrder: {
    __typename?: 'RejectOrderPayload'
    id: string
    status: Types.OrderStatus
    updatedAt: string
  }
}

export const RejectOrdeDocument = gql`
  mutation RejectOrde($userId: ID!, $orderId: ID!) {
    rejectOrder(userId: $userId, orderId: $orderId) {
      id
      status
      updatedAt
    }
  }
`
