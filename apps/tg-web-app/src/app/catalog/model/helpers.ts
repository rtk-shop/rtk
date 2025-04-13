import { isInArray } from '@/lib/utils'
import type { FieldNamesMarkedBoolean, FieldValues } from 'react-hook-form'
import type { FormValues } from './types'

export type filtersFields = Readonly<Array<keyof Omit<FormValues, 'sortBy'>>>

export function countFiltersDirtyFields(
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<FieldValues>>>
): number {
  const dirtyfieldNames: filtersFields = ['gender', 'availability', 'tag', 'priceRange', 'category']

  return Object.keys(dirtyFields).reduce(
    (acc, e) => (isInArray(e, dirtyfieldNames) ? 1 + acc : acc),
    0
  )
}
