import { CategoryType, Gender, ProductTag, ProductFilterSortBy } from '@/lib/api/graphql/types'

export type availability = 'inStock' | 'byOrder'

export type FormValues = {
  gender: Gender[]
  availability: availability[]
  tag: ProductTag | null
  priceRange: [number, number]
  category: CategoryType[]
  sortBy: ProductFilterSortBy | null
}

export type PriceRangeType = {
  gt: number
  lt: number
}
