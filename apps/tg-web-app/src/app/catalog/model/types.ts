import { Gender, ProductTag, Category } from '@/types'

export type FormValues = {
  gender: Array<keyof typeof Gender>
  availability: Array<'inStock' | 'byOrder'>
  tag: keyof typeof ProductTag | null
  priceRange: [number, number]
  category: Array<keyof typeof Category>
  sortBy: 'DEFAULT' | 'PRICE_ASC' | 'PRICE_DESC'
}

export type PriceRangeType = {
  gt: number
  lt: number
}
