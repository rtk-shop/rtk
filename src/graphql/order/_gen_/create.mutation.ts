import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type CreateOrderMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input']
  surname: Types.Scalars['String']['input']
  email: Types.Scalars['String']['input']
  phone: Types.Scalars['String']['input']
  cityName: Types.Scalars['String']['input']
  postOfficeName: Types.Scalars['String']['input']
  cartItems: Array<Types.CartItem> | Types.CartItem
  supplier: Types.Scalars['String']['input']
}>

export type CreateOrderMutation = {
  __typename?: 'Mutation'
  createOrder?: { __typename?: 'NewOrderResponse'; message: string } | null
}

export const CreateOrderDocument = gql`
  mutation CreateOrder(
    $name: String!
    $surname: String!
    $email: String!
    $phone: String!
    $cityName: String!
    $postOfficeName: String!
    $cartItems: [CartItem!]!
    $supplier: String!
  ) {
    createOrder(
      input: {
        name: $name
        surname: $surname
        email: $email
        phone: $phone
        cityName: $cityName
        postOfficeName: $postOfficeName
        cartItems: $cartItems
        supplier: $supplier
      }
    ) {
      message
    }
  }
`
export type CreateOrderMutationFn = Apollo.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      name: // value for 'name'
 *      surname: // value for 'surname'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      cityName: // value for 'cityName'
 *      postOfficeName: // value for 'postOfficeName'
 *      cartItems: // value for 'cartItems'
 *      supplier: // value for 'supplier'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(
    CreateOrderDocument,
    options
  )
}
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>
