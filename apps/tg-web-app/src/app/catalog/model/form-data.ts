import { availability } from './types'
import { ProductFilterSortBy, Gender, CategoryType, ProductTag } from '@/lib/api/graphql/types'

export type Option<T> = {
  label: string
  value: T
  disabled?: boolean
}

export const genderOptionsData: Option<Gender>[] = [
  {
    label: 'actions.forFemale',
    value: Gender.Female
  },
  {
    label: 'actions.forMale',
    value: Gender.Male
  },
  {
    label: 'nouns.unisex',
    value: Gender.Unisex
  }
]

export const availabilityOptionsData: Option<availability>[] = [
  {
    label: 'nouns.inStock',
    value: 'inStock'
  },
  {
    label: 'nouns.outStock',
    value: 'byOrder'
  }
]

export const tagsOptionsData: Option<ProductTag>[] = [
  {
    label: 'nouns.top',
    value: ProductTag.Top,
    disabled: false
  },
  {
    label: 'nouns.new',
    value: ProductTag.New,
    disabled: false
  },
  {
    label: 'nouns.withDiscount',
    value: ProductTag.Stock,
    disabled: false
  }
]

export const categoriesOptionsData: Option<CategoryType>[] = [
  {
    label: 'categories.suitcases',
    value: CategoryType.Suitcase
  },
  {
    label: 'categories.bags',
    value: CategoryType.Bag
  },
  {
    label: 'categories.backpacks',
    value: CategoryType.Backpack
  },
  {
    label: 'categories.other',
    value: CategoryType.Other
  }
]

export const sortOptionsData: Option<ProductFilterSortBy>[] = [
  {
    label: 'adjectives.standard',
    value: ProductFilterSortBy.Default
  },
  {
    label: 'actions.priceASC',
    value: ProductFilterSortBy.PriceAsc
  },
  {
    label: 'actions.priceDESC',
    value: ProductFilterSortBy.PriceDesc
  }
]
