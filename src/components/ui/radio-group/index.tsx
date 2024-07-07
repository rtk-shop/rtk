import React from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import styles from './styles.module.scss'

type option = {
  value: string
  label: string
  disabled?: boolean
}

interface RadioGroupProps {
  name: string
  options: option[]
  asRow?: boolean
}

export function RadioGroup({ name, asRow = false, options }: RadioGroupProps) {
  const { register } = useFormContext()

  return (
    <div className={clsx(styles.container, asRow && styles.asRow)}>
      {options.map(({ value, label, disabled = false }, ind) => {
        const inputId = ind + value

        return (
          <div key={value + ind} className={clsx(styles.inputWrapper, asRow && styles.rowWrapper)}>
            <input
              id={inputId}
              type="radio"
              value={value}
              disabled={disabled}
              className={styles.radioInput}
              {...register(name)}
            />
            <label
              htmlFor={inputId}
              className={clsx(styles.label, disabled && styles.labelDisabled)}
            >
              {label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
