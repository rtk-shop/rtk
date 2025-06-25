import { type ReactNode } from 'react'
import { ErrorMessage } from '@repo/ui'
import { useTranslations } from 'next-intl'
import { useFormContext, Controller } from 'react-hook-form'
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shadcn/select'

export type SelectOption = {
  value: string
  title: ReactNode
}

export interface SelectProps {
  name: string
  disabled?: boolean
  placeholder?: ReactNode
  options: SelectOption[]
  defaultValue?: string
}

export function Select({ name, placeholder, disabled, options, defaultValue }: SelectProps) {
  const t = useTranslations()

  const {
    control,
    formState: { errors }
  } = useFormContext()

  const isErr = !!(errors && errors[name])
  const message = isErr && t(errors[name]?.message as string)

  return (
    <>
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        defaultValue={defaultValue}
        render={({ field }) => (
          <SelectRoot
            onValueChange={field.onChange}
            disabled={field.disabled}
            defaultValue={field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ value, title }, index) => (
                <SelectItem key={value + index} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
      <ErrorMessage show={isErr}>{message}</ErrorMessage>
    </>
  )
}
