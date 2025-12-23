import { useDebouncedCallback } from 'use-debounce'
import { useCallback, useEffect, useState } from 'react'
import type { UseFormWatch, FieldValues, UseFormTrigger, Path } from 'react-hook-form'

export interface AutoSubmitProps<T extends FieldValues> {
  trigger: UseFormTrigger<T>
  watch: UseFormWatch<T>
  excludeFields?: Path<T>[]
  onSubmit: () => void
  onValidationFailed?: () => void
  debounceTime?: number
}

export const useAutoSubmit = <T extends FieldValues>({
  trigger,
  watch,
  onSubmit,
  debounceTime = 500,
  excludeFields,
  onValidationFailed
}: AutoSubmitProps<T>) => {
  const [isSubmiting, setIsSubmiting] = useState(false)

  const debounce = useDebouncedCallback((submitFn: () => void) => {
    submitFn()
  }, debounceTime)

  const debouncedSumbit = useCallback(debounce, [])

  useEffect(() => {
    const subscription = watch((_data, info) => {
      if (info?.type !== 'change') return
      if (info.name && excludeFields?.includes(info.name)) return
      setIsSubmiting(true)
      trigger()
        .then((valid) => {
          if (valid) debouncedSumbit(onSubmit)
          else onValidationFailed?.()
        })
        .finally(() => setIsSubmiting(false))
    })
    return () => subscription.unsubscribe()
  }, [watch, onSubmit])
  return { isSubmiting }
}
