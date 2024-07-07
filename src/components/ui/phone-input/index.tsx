import clsx from 'clsx'
import { NumberFormatValues } from 'react-number-format'
import { PatternFormat } from 'react-number-format'
import { Path, FieldValues, FieldErrors, UseFormSetValue, PathValue } from 'react-hook-form'

import styles from './styles.module.scss'

interface PhoneInputProps<T extends FieldValues> {
  name: Path<T>
  label?: string
  errors: FieldErrors
  setValue: UseFormSetValue<T>
}

export function PhoneInput<T extends FieldValues>({
  name,
  label,
  errors,
  setValue
}: PhoneInputProps<T>) {
  const isErr = errors && errors[name]
  const message = errors && errors[name] && (errors[name]?.message as string)

  const handleValueChange = (values: NumberFormatValues): void => {
    setValue(name, values.value as PathValue<T, Path<T>>)
  }

  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      <PatternFormat
        format="+38 (###) ###-####"
        mask="_"
        autoComplete="off"
        allowEmptyFormatting
        onValueChange={handleValueChange}
        className={clsx({
          [styles.base]: true,
          [styles.error]: isErr
        })}
      />
      <p
        className={clsx({
          [styles.message]: true,
          [styles.withError]: isErr
        })}
      >
        {message}
      </p>
    </div>
  )
}
