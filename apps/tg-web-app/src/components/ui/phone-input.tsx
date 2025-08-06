import { cva } from 'cva'
import { PatternFormat } from 'react-number-format'
import type { Path, FieldValues } from 'react-hook-form'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@repo/ui'
import { useTranslations } from 'next-intl'

interface PhoneInputProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  disabled?: boolean
}

const inpEl = cva(
  'mb-1 flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:border-gray-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60 md:text-sm',
  {
    variants: {
      error: {
        true: 'border-red-600'
      }
    }
  }
)

export function PhoneInput<T extends FieldValues>({
  name,
  label,
  ...restProps
}: PhoneInputProps<T>) {
  const t = useTranslations()

  const {
    control,
    formState: { errors }
  } = useFormContext()

  const isErr = !!(errors && errors[name])
  const message = isErr && t(errors[name]?.message as string)

  return (
    <div>
      {label && (
        <span className="mb-1 pl-1 text-[15px] font-medium text-gray-800 select-none">{label}</span>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { name, onChange, onBlur, value, ref } }) => (
          <PatternFormat
            type="text"
            getInputRef={ref}
            name={name}
            onBlur={onBlur}
            format="+380 (##) ###-####"
            mask="_"
            autoComplete="off"
            allowEmptyFormatting
            value={value}
            onValueChange={(values) => {
              onChange(values.value)
            }}
            className={inpEl({ error: isErr })}
            {...restProps}
          />
        )}
      />
      <ErrorMessage show={isErr}>{message}</ErrorMessage>
    </div>
  )
}
