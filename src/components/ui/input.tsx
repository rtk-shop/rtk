import { ChangeEvent } from 'react'
import { cva } from 'cva'
import { UseFormRegister, Path, FieldValues, FieldErrors } from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  type?: 'text' | 'password' | 'file' | 'number'
  label?: string
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
  withoutError?: boolean
  onChange?(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
  register: UseFormRegister<T>
  errors: FieldErrors
}

const inpEl = cva(
  'mb-1 flex h-11 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:border-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:file:text-gray-50 dark:placeholder:text-gray-400 md:text-sm',
  {
    variants: {
      error: {
        true: 'border-red-600'
      }
    }
  }
)

const errorMessage = cva('h-6 pl-2.5 text-[13px] font-medium leading-none text-red-600', {
  variants: {
    show: {
      true: 'duration-300 animate-in fade-in'
    }
  }
})

export function Input<T extends FieldValues>({
  name,
  type = 'text',
  autoComplete = 'off',
  withoutError = false,
  errors,
  label,
  register,
  ...restProps
}: InputProps<T>) {
  const isErr = errors && errors[name]
  const message = isErr && (errors[name]?.message as string)

  return (
    <div>
      {label && (
        <span className="mb-1 select-none pl-1 text-[15px] font-medium text-gray-800">{label}</span>
      )}
      <input
        type={type}
        autoComplete={autoComplete}
        className={inpEl({ error: !!isErr })}
        {...register(name)}
        {...restProps}
      />
      {!withoutError && <p className={errorMessage({ show: !!isErr })}>{message}</p>}
    </div>
  )
}
