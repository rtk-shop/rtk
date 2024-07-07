import { ChangeEvent } from 'react'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'
import clsx from 'clsx'
import styles from './styles.module.scss'

interface CheckboxProps<T extends FieldValues> {
  name: Path<T>
  value: string
  label?: string
  register: UseFormRegister<T>
}

export function Checkbox<T extends FieldValues>({
  name,
  value,
  label,
  register
}: CheckboxProps<T>) {
  const { onChange, ...other } = register(name)

  // TODO: for self controlled mode
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <label className={styles.labelEL}>
      <input
        type="checkbox"
        className={clsx('hide', styles.input)}
        onChange={handleChange}
        value={value}
        {...other}
      />
      <span className={styles.uiEl}>
        <svg width="14px" height="12px" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
