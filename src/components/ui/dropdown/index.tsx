import { type ReactNode, useState, useEffect, useRef } from 'react'
import { Icon } from '../icon'
import clsx from 'clsx'

import styles from './styles.module.css'

export type Option = {
  value: string
  title: string | ReactNode
}

export interface DropdownProps {
  options: Option[]
  placeholder?: string | ReactNode
  selected?: Option
  onClose?: () => void
  onChange?: (value: Option['value']) => void
  rootStyles?: string
  defaultValue?: string
}

export function Dropdown({
  selected,
  placeholder,
  options,
  onClose,
  onChange,
  rootStyles,
  defaultValue
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Option | undefined>(selected)

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        open && onClose?.()
        setOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [open, onClose])

  const handleSelect = (option: Option) => {
    setCurrent({ ...option })
    onChange && onChange(option.value)
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.dropdown, rootStyles)}
      onClick={() => setOpen((v) => !v)}
    >
      <div
        className={clsx({
          [styles.show]: true,
          [styles.default]: current?.value === defaultValue
        })}
      >
        {current?.title || <span className={styles.placeholder}>{placeholder}</span>}
      </div>
      {open && (
        <ul className={styles.list} style={{ width: rootRef.current?.offsetWidth }}>
          {options.map((option, ind) => (
            <li
              key={ind}
              className={clsx({
                [styles.option]: true,
                [styles.selected]: option.value === current?.value
              })}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
      <Icon
        name="common/arrow"
        className={clsx({
          [styles.expandIcon]: true,
          [styles.collapsed]: open
        })}
      />
    </div>
  )
}
