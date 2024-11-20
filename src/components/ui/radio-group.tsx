import { useFormContext } from 'react-hook-form'
import { cva } from 'cva'

const container = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      col: 'flex-col'
    }
  }
})

const row = cva('flex items-center py-1', {
  variants: {
    direction: {
      col: 'mb-1',
      row: ''
    }
  }
})

const pseudoLabelEl = cva(
  'before:absolute before:left-0.5 before:top-0 before:box-content before:size-5 before:rounded-full before:border-2 before:border-gray-300 before:bg-gray-300 before:transition-all before:duration-500 after:absolute after:left-1 after:top-[2px] after:box-content after:size-5 after:rounded-full after:bg-white after:transition-all after:duration-150'
)

const labelEl = cva(
  'relative cursor-pointer select-none whitespace-nowrap rounded-full pb-1 pl-9 pr-4 pt-1 text-base font-medium leading-none transition-all duration-500 peer-checked:before:border-black peer-checked:before:bg-black peer-checked:after:left-2 peer-checked:after:top-1.5 peer-checked:after:size-3 peer-enabled:hover:before:border-black peer-disabled:cursor-not-allowed peer-disabled:opacity-55'
)

export type RadioOption = {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  direction?: 'row' | 'col'
}

export function RadioGroup({ name, direction = 'col', options }: RadioGroupProps) {
  const { register } = useFormContext()

  return (
    <div className={container({ direction })}>
      {options.map(({ value, label, disabled = false }, ind) => {
        const inputId = ind + value

        return (
          <div key={value + ind} className={row({ direction })}>
            <input
              id={inputId}
              type="radio"
              value={value}
              disabled={disabled}
              className="peer hidden"
              {...register(name)}
            />
            <label htmlFor={inputId} className={labelEl({ class: pseudoLabelEl() })}>
              {label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
