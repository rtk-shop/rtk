import type { ChangeEvent } from 'react'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'

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
    <label className="inline-flex cursor-pointer items-center overflow-hidden px-2 py-1 select-none">
      <input
        type="checkbox"
        value={value}
        onChange={handleChange}
        className="peer hidden"
        {...other}
      />
      <span className="relative block size-6 rounded-md border-2 border-gray-300 stroke-white transition-all duration-200 [stroke-dashoffset:16] peer-checked:border-black peer-checked:bg-black peer-checked:[stroke-dashoffset:0] peer-hover:border-black">
        <svg
          width="14px"
          height="12px"
          viewBox="0 0 12 10"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={16}
          // strokeDashoffset={16}
          className="fill-4 absolute top-1 left-[3px] fill-none stroke-inherit duration-300"
        >
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>
      {label && <span className="pl-2.5 font-medium">{label}</span>}
    </label>
  )
}
