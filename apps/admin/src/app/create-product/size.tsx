import { useForm, useWatch } from 'react-hook-form'
import { Select, type SelectOption } from '@/components/ui/select'
import { productCategory } from '@/lib/constants'
import type { ProductCategory } from '@/types/product'

export const SIZE_VARIATIONS = {
  [productCategory.suitcase]: ['S', 'M', 'L'],
  [productCategory.backpack]: ['S', 'M'],
  [productCategory.bag]: ['S', 'M'],
  [productCategory.other]: ['none']
}

export function SelectSize() {
  const category: ProductCategory = useWatch({
    name: 'category'
  })

  const options: SelectOption[] = SIZE_VARIATIONS[category].map((size) => ({
    title: size,
    value: size
  }))

  return (
    <div className="w-[190px]">
      <Select
        name="sizeName"
        disabled={category === 'OTHER'}
        placeholder="Укажите размер"
        options={options}
      />
    </div>
  )
}
