import { cva } from 'cva'
import { useFormContext } from 'react-hook-form'

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
  'before:absolute before:top-0 before:left-0.5 before:box-content before:size-5 before:rounded-full before:border-2 before:border-gray-300 before:bg-gray-300 before:transition-all before:duration-500 after:absolute after:top-[2px] after:left-1 after:box-content after:size-5 after:rounded-full after:bg-white after:transition-all after:duration-150'
)

const labelEl = cva(
  'relative cursor-pointer rounded-full pt-1 pr-4 pb-1 pl-9 text-base leading-none font-medium whitespace-nowrap transition-all duration-500 select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-55 peer-checked:before:border-black peer-checked:before:bg-black peer-checked:after:top-1.5 peer-checked:after:left-2 peer-checked:after:size-3 hover:peer-enabled:before:border-black'
)

export type RadioOption<T> = {
  value: T
  label: string
  disabled?: boolean
}

export interface RadioGroupProps<T> {
  name: string
  options: RadioOption<T>[]
  direction?: 'row' | 'col'
}

export function RadioGroup<T extends string>({
  name,
  direction = 'col',
  options
}: RadioGroupProps<T>) {
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
