import { type ReactNode } from 'react'
import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shadcn/select'

export type SelectOption = {
  value: string
  title: ReactNode
}

export interface SelectProps {
  placeholder?: ReactNode
  options: SelectOption[]
  defaultValue?: string
  onValueChange?: (value: SelectOption['value']) => void
}

export function Select({ placeholder, options, defaultValue, onValueChange }: SelectProps) {
  return (
    <SelectRoot onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ value, title }) => (
          <SelectItem value={value}>{title}</SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
