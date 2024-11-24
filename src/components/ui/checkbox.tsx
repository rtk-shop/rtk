import { type ChangeEvent, useId } from 'react'
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

  const id = useId()

  // TODO: for self controlled mode
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <>
      <input
        id={id}
        type="checkbox"
        value={value}
        onChange={handleChange}
        className="peer hidden"
        {...other}
      />
      <label
        htmlFor={id}
        className="group inline-flex cursor-pointer select-none items-center overflow-hidden px-2 py-1"
      >
        <span className="relative block size-6 rounded-md border-2 border-gray-300 transition-all duration-200 group-hover:border-black peer-checked:group-[]:border-black peer-checked:group-[]:bg-black">
          <svg
            width="14px"
            height="12px"
            viewBox="0 0 12 10"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={16}
            strokeDashoffset={16}
            className="fill-4 absolute left-[3px] top-1 fill-none stroke-white transition-all delay-100 duration-300 peer-checked:group-[]:[stroke-dashoffset:0]"
          >
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </span>
        {label && <span className="pl-2.5 font-medium">{label}</span>}
      </label>
    </>
  )
}
