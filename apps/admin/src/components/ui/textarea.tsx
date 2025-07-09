import { useId, type ReactNode } from 'react'
import { Textarea as TextareaRoot } from '@/components/ui/shadcn/textarea'
import { useFormContext, Controller } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { ErrorMessage, Label } from '@repo/ui'

export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'name'> & {
  name: string
  label: ReactNode
}

export function Textarea({ name, label, disabled, defaultValue, ...otherProps }: TextareaProps) {
  const t = useTranslations()
  const uniqueId = useId()

  const {
    control,
    formState: { errors }
  } = useFormContext()

  const isErr = !!(errors && errors[name])
  const message = isErr && t(errors[name]?.message as string)

  return (
    <>
      {label && <Label htmlFor={uniqueId}>{label}</Label>}
      <Controller
        name={name}
        control={control}
        disabled={disabled}
        defaultValue={defaultValue}
        render={({ field }) => <TextareaRoot {...otherProps} id={uniqueId} {...field} />}
      />
      <ErrorMessage show={isErr}>{message}</ErrorMessage>
    </>
  )
}
