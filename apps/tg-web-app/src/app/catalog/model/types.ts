import { ProductTag } from '@/types'
import { CategoryType, Gender } from '@/lib/api/graphql/types'

export type FormValues = {
  gender: Gender[]
  availability: Array<'inStock' | 'byOrder'>
  tag: keyof typeof ProductTag | null
  priceRange: [number, number]
  category: CategoryType[]
  sortBy: 'DEFAULT' | 'PRICE_ASC' | 'PRICE_DESC'
}

export type PriceRangeType = {
  gt: number
  lt: number
}
