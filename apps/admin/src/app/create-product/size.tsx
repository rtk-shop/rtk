import { useWatch } from 'react-hook-form'
import { Select, type SelectOption } from '@/components/ui/select'
import { CategoryType } from '@/lib/api/graphql/types'

export const SIZE_VARIATIONS = {
  [CategoryType.Suitcase]: ['S', 'M', 'L'],
  [CategoryType.Backpack]: ['S', 'M'],
  [CategoryType.Bag]: ['S', 'M'],
  [CategoryType.Other]: ['none']
}

export function SelectSize() {
  const category: CategoryType = useWatch({
    name: 'category'
  })

  const options: SelectOption[] = SIZE_VARIATIONS[category || CategoryType.Other].map((size) => ({
    title: size,
    value: size
  }))

  return (
    <div className="w-[190px]">
      <Select
        name="sizeName"
        label="Размер"
        placeholder="Укажите размер"
        disabled={category === CategoryType.Other || !category}
        options={options}
      />
    </div>
  )
}
