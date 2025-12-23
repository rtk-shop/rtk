import { type ReactNode, useState, useEffect, useRef } from 'react'
import { cva } from 'cva'
import { ExpandIcon } from './expand-icon'

export type Option<T> = {
  value: T
  title: string | ReactNode
}

export interface DropdownProps<T> {
  options: Option<T>[]
  placeholder?: string | ReactNode
  selected?: Option<T>
  onClose?: () => void
  onChange?: (value: Option<T>['value']) => void
  anchor?: 'left' | 'right'
  defaultValue?: string
}

const withValue = cva('mr-1.5 select-none font-medium', {
  variants: {
    withDefault: {
      true: 'text-gray-400',
      false: ''
    }
  }
})

const list = cva(
  'absolute top-[115%] z-50 min-w-36 rounded-lg bg-white px-2 py-2 shadow-md animate-in fade-in zoom-in',
  {
    variants: {
      anchor: {
        left: 'left-0',
        right: 'right-0'
      }
    }
  }
)

const optionStyles = cva('select-none rounded-md py-1.5 pl-2 font-medium', {
  variants: {
    selected: {
      true: 'bg-gray-100',
      false: ''
    }
  }
})

export function Dropdown<T>({
  selected,
  placeholder,
  options,
  onClose,
  onChange,
  defaultValue,
  anchor = 'left'
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Option<T> | undefined>(selected)

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

  const handleSelect = (option: Option<T>) => {
    setCurrent({ ...option })
    onChange && onChange(option.value)
  }

  return (
    <div
      ref={rootRef}
      onClick={() => setOpen((v) => !v)}
      className="relative z-40 flex items-center justify-between rounded-lg bg-gray-100 py-1 pl-3 pr-2"
    >
      <div
        className={withValue({
          withDefault: current?.value === defaultValue
        })}
      >
        {current?.title || <span className="text-gray-400">{placeholder}</span>}
      </div>
      {open && (
        // rootRef.current?.offsetWidth
        <ul className={list({ anchor })}>
          {options.map((option, ind) => (
            <li
              key={ind}
              className={optionStyles({ selected: option.value === current?.value })}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
      <ExpandIcon expanded={open} />
    </div>
  )
}
