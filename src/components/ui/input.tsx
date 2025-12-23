'use client'

import { type ReactNode, useId } from 'react'
import { cva } from 'cva'
import { Label } from '@/components/ui/label'
import { ErrorMessage } from '@/components/ui/error-message'
import { useTranslations } from 'next-intl'
import { Path, FieldValues, useFormContext } from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  type?: 'text' | 'password' | 'file' | 'number'
  label?: ReactNode
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
}

const inpEl = cva(
  'mb-1 flex h-9 w-full rounded-md border border-gray-200 px-3 py-1 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:border-gray-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 md:text-sm',
  {
    variants: {
      error: {
        true: 'border-red-600'
      }
    }
  }
)

export function Input<T extends FieldValues>({
  name,
  label,
  type = 'text',
  autoComplete = 'off',
  ...restProps
}: InputProps<T>) {
  const uniqueId = useId()
  const t = useTranslations()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const isErr = !!(errors && errors[name])
  const message = isErr && t(errors[name]?.message as string)

  return (
    <div>
      {label && <Label htmlFor={uniqueId}>{label}</Label>}
      <input
        id={uniqueId}
        type={type}
        autoComplete={autoComplete}
        className={inpEl({ error: isErr })}
        {...register(name, {
          valueAsNumber: type === 'number'
        })}
        {...restProps}
      />
      <ErrorMessage show={isErr}>{message}</ErrorMessage>
    </div>
  )
}
