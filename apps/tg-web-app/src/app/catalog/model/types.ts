import { CategoryType, Gender, ProductTag, ProductFilterSortBy } from '@/lib/api/graphql/types'

export type FormValues = {
  gender: Gender[]
  availability: Array<'inStock' | 'byOrder'>
  tag: ProductTag | null
  priceRange: [number, number]
  category: CategoryType[]
  sortBy: ProductFilterSortBy | null
}

export type PriceRangeType = {
  gt: number
  lt: number
}
