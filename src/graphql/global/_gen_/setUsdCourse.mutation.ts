import * as Types from '../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type SetUsdCourseMutationVariables = Types.Exact<{
  value: Types.Scalars['Float']['input']
}>

export type SetUsdCourseMutation = { __typename?: 'Mutation'; setUsdCourse: number }

export const SetUsdCourseDocument = gql`
  mutation SetUsdCourse($value: Float!) {
    setUsdCourse(input: $value)
  }
`
export type SetUsdCourseMutationFn = Apollo.MutationFunction<
  SetUsdCourseMutation,
  SetUsdCourseMutationVariables
>

/**
 * __useSetUsdCourseMutation__
 *
 * To run a mutation, you first call `useSetUsdCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUsdCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUsdCourseMutation, { data, loading, error }] = useSetUsdCourseMutation({
 *   variables: {
 *      value: // value for 'value'
 *   },
 * });
 */
export function useSetUsdCourseMutation(
  baseOptions?: Apollo.MutationHookOptions<SetUsdCourseMutation, SetUsdCourseMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SetUsdCourseMutation, SetUsdCourseMutationVariables>(
    SetUsdCourseDocument,
    options
  )
}
export type SetUsdCourseMutationHookResult = ReturnType<typeof useSetUsdCourseMutation>
export type SetUsdCourseMutationResult = Apollo.MutationResult<SetUsdCourseMutation>
export type SetUsdCourseMutationOptions = Apollo.BaseMutationOptions<
  SetUsdCourseMutation,
  SetUsdCourseMutationVariables
>
