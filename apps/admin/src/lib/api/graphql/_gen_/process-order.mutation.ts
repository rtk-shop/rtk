import * as Types from '../types'

import { gql } from 'urql'
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ProcessOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']['input']
}>

export type ProcessOrderMutation = {
  __typename?: 'Mutation'
  processOrder: {
    __typename?: 'ProcessOrderPayload'
    orderId: string
    status: Types.OrderStatus
    updatedAt: string
  }
}

export const ProcessOrderDocument = gql`
  mutation ProcessOrder($id: ID!) {
    processOrder(id: $id) {
      orderId
      status
      updatedAt
    }
  }
`
